import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import OpenAI from 'openai';

// Initialize OpenAI client only when needed
function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required');
  }
  return new OpenAI({ apiKey });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { agentId: string } }
) {
  try {
    const { agentId } = params;
    const { user_id, input } = await request.json();

    // Validate input
    if (!user_id || !input) {
      return NextResponse.json(
        { error: 'Missing required fields: user_id and input' },
        { status: 400 }
      );
    }

    // Fetch agent from database
    const agent = await prisma.agent.findUnique({
      where: { id: agentId },
      include: { owner: true }
    });

    if (!agent) {
      return NextResponse.json(
        { error: 'Agent not found' },
        { status: 404 }
      );
    }

    // Check if agent is published or user has access
    if (agent.visibility === 'PRIVATE' && agent.ownerId !== user_id) {
      return NextResponse.json(
        { error: 'Access denied' },
        { status: 403 }
      );
    }

    const startTime = Date.now();
    let output = '';
    let error = null;

    try {
      // Parse agent logic
      const logic = agent.logicJson as any;
      
      // Execute agent workflow
      output = await executeAgentWorkflow(logic, input);
      
    } catch (execError) {
      error = execError instanceof Error ? execError.message : 'Unknown error';
    }

    const duration = Date.now() - startTime;

    // Log the agent run
    await prisma.agentRun.create({
      data: {
        agentId,
        userId: user_id,
        input,
        output,
        error,
        duration
      }
    });

    // Update usage stats
    const currentStats = agent.usageStats as any || { totalRuns: 0, totalDuration: 0 };
    await prisma.agent.update({
      where: { id: agentId },
      data: {
        usageStats: {
          totalRuns: currentStats.totalRuns + 1,
          totalDuration: currentStats.totalDuration + duration,
          lastRun: new Date()
        }
      }
    });

    if (error) {
      return NextResponse.json(
        { error, output: null },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      output,
      duration,
      agent: {
        id: agent.id,
        name: agent.name,
        description: agent.description
      }
    });

  } catch (error) {
    console.error('Agent run error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

async function executeAgentWorkflow(logic: any, userInput: string): Promise<string> {
  const { nodes, edges } = logic;
  
  // Find the input node
  const inputNode = nodes.find((node: any) => node.type === 'input');
  if (!inputNode) {
    throw new Error('No input node found in agent workflow');
  }

  // Create a map of node outputs
  const nodeOutputs = new Map();
  nodeOutputs.set(inputNode.id, userInput);

  // Execute nodes in topological order (simplified)
  for (const node of nodes) {
    if (node.type === 'input') continue;

    const input = nodeOutputs.get(node.id) || userInput;
    let output = '';

    switch (node.type) {
      case 'llm':
        output = await executeLLMNode(node, input);
        break;
      case 'api':
        output = await executeAPINode(node, input);
        break;
      case 'memory':
        output = await executeMemoryNode(node, input);
        break;
      case 'condition':
        output = await executeConditionNode(node, input);
        break;
      case 'output':
        output = input; // Pass through
        break;
      default:
        output = input;
    }

    nodeOutputs.set(node.id, output);
  }

  // Find the output node and return its result
  const outputNode = nodes.find((node: any) => node.type === 'output');
  return nodeOutputs.get(outputNode?.id) || 'No output generated';
}

async function executeLLMNode(node: any, input: string): Promise<string> {
  try {
    const config = node.config || {};
    const model = config.model || 'gpt-3.5-turbo';
    const systemPrompt = config.systemPrompt || 'You are a helpful AI assistant.';
    const temperature = config.temperature || 0.7;

    const openai = getOpenAIClient();
    const completion = await openai.chat.completions.create({
      model,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: input }
      ],
      temperature,
      max_tokens: 1000
    });

    return completion.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('LLM execution error:', error);
    throw new Error('Failed to execute LLM node');
  }
}

async function executeAPINode(node: any, input: string): Promise<string> {
  try {
    const config = node.config || {};
    const url = config.url;
    const method = config.method || 'GET';
    const headers = config.headers ? JSON.parse(config.headers) : {};

    if (!url) {
      throw new Error('API URL not configured');
    }

    const response = await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      },
      body: method !== 'GET' ? JSON.stringify({ input }) : undefined
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    return JSON.stringify(data);
  } catch (error) {
    console.error('API execution error:', error);
    throw new Error('Failed to execute API node');
  }
}

async function executeMemoryNode(node: any, input: string): Promise<string> {
  // Simple memory implementation - in production, use a proper vector database
  const config = node.config || {};
  const operation = config.operation || 'store';
  
  if (operation === 'store') {
    // Store the input (in production, save to vector DB)
    return `Stored: ${input}`;
  } else if (operation === 'retrieve') {
    // Retrieve similar content (in production, query vector DB)
    return `Retrieved: ${input}`;
  }
  
  return input;
}

async function executeConditionNode(node: any, input: string): Promise<string> {
  const config = node.config || {};
  const condition = config.condition || '';
  
  // Simple condition evaluation
  if (condition.includes('contains') && input.includes(condition.split('contains')[1]?.trim())) {
    return config.trueOutput || 'Condition met';
  }
  
  return config.falseOutput || 'Condition not met';
} 