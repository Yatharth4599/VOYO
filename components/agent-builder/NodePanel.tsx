'use client';

import { motion } from 'framer-motion';
import { MessageSquare, Brain, Globe, Database, GitBranch, Send } from 'lucide-react';

interface NodePanelProps {
  onAddNode: (node: any) => void;
}

const nodeTypes = [
  {
    type: 'input',
    label: 'User Input',
    icon: MessageSquare,
    description: 'Collect user input or questions',
    color: 'bg-blue-500'
  },
  {
    type: 'llm',
    label: 'AI Processing',
    icon: Brain,
    description: 'Process with AI language model',
    color: 'bg-purple-500'
  },
  {
    type: 'api',
    label: 'API Call',
    icon: Globe,
    description: 'Make external API requests',
    color: 'bg-green-500'
  },
  {
    type: 'memory',
    label: 'Memory',
    icon: Database,
    description: 'Store and retrieve data',
    color: 'bg-yellow-500'
  },
  {
    type: 'condition',
    label: 'Condition',
    icon: GitBranch,
    description: 'Add conditional logic',
    color: 'bg-red-500'
  },
  {
    type: 'output',
    label: 'Response',
    icon: Send,
    description: 'Send final response',
    color: 'bg-indigo-500'
  }
];

export default function NodePanel({ onAddNode }: NodePanelProps) {
  const handleDragStart = (event: React.DragEvent, nodeType: any) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleAddNode = (nodeType: any) => {
    const newNode = {
      id: `${nodeType.type}-${Date.now()}`,
      type: 'default',
      position: { x: 100, y: 100 },
      data: {
        label: nodeType.label,
        type: nodeType.type,
        config: {}
      }
    };
    onAddNode(newNode);
  };

  return (
    <div className="h-full">
      <h2 className="text-xl font-semibold text-white mb-4">Components</h2>
      <div className="space-y-3">
        {nodeTypes.map((nodeType) => (
          <motion.div
            key={nodeType.type}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            draggable
            onDragStart={(e) => handleDragStart(e, nodeType)}
            onClick={() => handleAddNode(nodeType)}
            className="bg-gray-700 hover:bg-gray-600 rounded-lg p-3 cursor-pointer transition-colors border border-gray-600"
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${nodeType.color}`}>
                <nodeType.icon className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{nodeType.label}</h3>
                <p className="text-sm text-gray-400">{nodeType.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
} 