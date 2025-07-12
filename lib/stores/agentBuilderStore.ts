import { create } from 'zustand';
import { Node, Edge } from 'reactflow';

export interface AgentNode extends Node {
  data: {
    label: string;
    type: 'input' | 'llm' | 'api' | 'memory' | 'condition' | 'output';
    config: any;
  };
}

export interface AgentEdge extends Edge {
  data?: {
    condition?: string;
  };
}

interface AgentBuilderState {
  nodes: AgentNode[];
  edges: AgentEdge[];
  selectedNode: AgentNode | null;
  isDirty: boolean;
  
  // Actions
  setNodes: (nodes: AgentNode[]) => void;
  setEdges: (edges: AgentEdge[]) => void;
  addNode: (node: AgentNode) => void;
  updateNode: (id: string, data: Partial<AgentNode['data']>) => void;
  removeNode: (id: string) => void;
  addEdge: (edge: AgentEdge) => void;
  removeEdge: (id: string) => void;
  setSelectedNode: (node: AgentNode | null) => void;
  setDirty: (dirty: boolean) => void;
  clearBuilder: () => void;
  
  // Workflow logic
  getWorkflowLogic: () => any;
  loadWorkflowLogic: (logic: any) => void;
}

export const useAgentBuilderStore = create<AgentBuilderState>((set, get) => ({
  nodes: [],
  edges: [],
  selectedNode: null,
  isDirty: false,

  setNodes: (nodes) => set({ nodes, isDirty: true }),
  setEdges: (edges) => set({ edges, isDirty: true }),
  
  addNode: (node) => set((state) => ({
    nodes: [...state.nodes, node],
    isDirty: true
  })),
  
  updateNode: (id, data) => set((state) => ({
    nodes: state.nodes.map((node) =>
      node.id === id ? { ...node, data: { ...node.data, ...data } } : node
    ),
    isDirty: true
  })),
  
  removeNode: (id) => set((state) => ({
    nodes: state.nodes.filter((node) => node.id !== id),
    edges: state.edges.filter((edge) => edge.source !== id && edge.target !== id),
    isDirty: true
  })),
  
  addEdge: (edge) => set((state) => ({
    edges: [...state.edges, edge],
    isDirty: true
  })),
  
  removeEdge: (id) => set((state) => ({
    edges: state.edges.filter((edge) => edge.id !== id),
    isDirty: true
  })),
  
  setSelectedNode: (node) => set({ selectedNode: node }),
  setDirty: (dirty) => set({ isDirty: dirty }),
  
  clearBuilder: () => set({
    nodes: [],
    edges: [],
    selectedNode: null,
    isDirty: false
  }),

  getWorkflowLogic: () => {
    const { nodes, edges } = get();
    return {
      nodes: nodes.map((node) => ({
        id: node.id,
        type: node.data.type,
        position: node.position,
        config: node.data.config
      })),
      edges: edges.map((edge) => ({
        id: edge.id,
        source: edge.source,
        target: edge.target,
        condition: edge.data?.condition
      }))
    };
  },

  loadWorkflowLogic: (logic) => {
    const nodes: AgentNode[] = logic.nodes.map((node: any) => ({
      id: node.id,
      type: 'default',
      position: node.position,
      data: {
        label: getNodeLabel(node.type),
        type: node.type,
        config: node.config
      }
    }));

    const edges: AgentEdge[] = logic.edges.map((edge: any) => ({
      id: edge.id,
      source: edge.source,
      target: edge.target,
      data: {
        condition: edge.condition
      }
    }));

    set({ nodes, edges, isDirty: false });
  }
}));

function getNodeLabel(type: string): string {
  const labels: Record<string, string> = {
    input: 'User Input',
    llm: 'AI Processing',
    api: 'API Call',
    memory: 'Memory',
    condition: 'Condition',
    output: 'Response'
  };
  return labels[type] || type;
} 