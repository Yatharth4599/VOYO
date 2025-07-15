'use client';

import { useState, useCallback } from 'react';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  MiniMap,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { motion } from 'framer-motion';
import { Plus, Save, Play, Settings } from 'lucide-react';

import { useAgentBuilderStore } from '@/lib/stores/agentBuilderStore';
import NodePanel from './NodePanel';
import NodeConfigPanel from './NodeConfigPanel';

export default function AgentBuilder() {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [showConfig, setShowConfig] = useState(false);

  const {
    addNode,
    updateNode,
    removeNode,
    addEdge,
    removeEdge,
    getWorkflowLogic,
    setDirty
  } = useAgentBuilderStore();

  const onConnect = useCallback(
    (params: Connection) => {
      setEdges((eds) => addEdge(params, eds));
      setDirty(true);
    },
    [setEdges, setDirty]
  );

  const onNodeClick = useCallback((event: any, node: Node) => {
    setSelectedNode(node);
    setShowConfig(true);
  }, []);

  const onNodeDragStop = useCallback((event: any, node: Node) => {
    setNodes((nds) =>
      nds.map((n) => (n.id === node.id ? node : n))
    );
    setDirty(true);
  }, [setNodes, setDirty]);

  const handleSave = async () => {
    const workflowLogic = getWorkflowLogic();
    console.log('Saving workflow:', workflowLogic);
    // TODO: Save to database
    setDirty(false);
  };

  const handleTest = () => {
    console.log('Testing agent...');
    // TODO: Open test modal
  };

  return (
    <div className="h-screen bg-[#f5f1e8] dark:bg-gray-900 flex">
      {/* Left Panel - Node Library */}
      <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 p-4">
        <NodePanel onAddNode={addNode} />
      </div>

      {/* Main Canvas */}
      <div className="flex-1 relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onNodeClick={onNodeClick}
          onNodeDragStop={onNodeDragStop}
          fitView
          className="bg-[#f5f1e8] dark:bg-gray-900"
        >
          <Controls />
          <Background />
          <MiniMap />
        </ReactFlow>

        {/* Top Toolbar */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-2 flex gap-2 border border-gray-200 dark:border-gray-700">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 hover:opacity-90 text-white rounded-md flex items-center gap-2 transition-opacity"
            >
              <Save className="w-4 h-4" />
              Save
            </button>
            <button
              onClick={handleTest}
              className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md flex items-center gap-2 transition-colors"
            >
              <Play className="w-4 h-4" />
              Test
            </button>
          </div>
        </div>
      </div>

      {/* Right Panel - Node Configuration */}
      {showConfig && selectedNode && (
        <motion.div
          initial={{ x: 400 }}
          animate={{ x: 0 }}
          exit={{ x: 400 }}
          className="w-96 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 p-4"
        >
          <NodeConfigPanel
            node={selectedNode}
            onUpdate={(config) => {
              updateNode(selectedNode.id, config);
              setShowConfig(false);
            }}
            onClose={() => setShowConfig(false)}
          />
        </motion.div>
      )}
    </div>
  );
} 