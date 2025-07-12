'use client';

import { useState } from 'react';
import { X, Settings } from 'lucide-react';
import { Node } from 'reactflow';

interface NodeConfigPanelProps {
  node: Node;
  onUpdate: (config: any) => void;
  onClose: () => void;
}

export default function NodeConfigPanel({ node, onUpdate, onClose }: NodeConfigPanelProps) {
  const [config, setConfig] = useState(node.data?.config || {});

  const handleSave = () => {
    onUpdate(config);
  };

  const renderConfigFields = () => {
    const nodeType = node.data?.type;

    switch (nodeType) {
      case 'input':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Input Type
              </label>
              <select
                value={config.inputType || 'text'}
                onChange={(e) => setConfig({ ...config, inputType: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="text">Text</option>
                <option value="number">Number</option>
                <option value="email">Email</option>
                <option value="phone">Phone</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Placeholder
              </label>
              <input
                type="text"
                value={config.placeholder || ''}
                onChange={(e) => setConfig({ ...config, placeholder: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                placeholder="Enter placeholder text..."
              />
            </div>
          </div>
        );

      case 'llm':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Model
              </label>
              <select
                value={config.model || 'gpt-4'}
                onChange={(e) => setConfig({ ...config, model: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="gpt-4">GPT-4</option>
                <option value="gpt-3.5-turbo">GPT-3.5 Turbo</option>
                <option value="claude-3">Claude-3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                System Prompt
              </label>
              <textarea
                value={config.systemPrompt || ''}
                onChange={(e) => setConfig({ ...config, systemPrompt: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white h-24 resize-none"
                placeholder="Enter system prompt..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Temperature
              </label>
              <input
                type="range"
                min="0"
                max="2"
                step="0.1"
                value={config.temperature || 0.7}
                onChange={(e) => setConfig({ ...config, temperature: parseFloat(e.target.value) })}
                className="w-full"
              />
              <span className="text-sm text-gray-400">{config.temperature || 0.7}</span>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                API URL
              </label>
              <input
                type="url"
                value={config.url || ''}
                onChange={(e) => setConfig({ ...config, url: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
                placeholder="https://api.example.com/endpoint"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Method
              </label>
              <select
                value={config.method || 'GET'}
                onChange={(e) => setConfig({ ...config, method: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="PUT">PUT</option>
                <option value="DELETE">DELETE</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Headers (JSON)
              </label>
              <textarea
                value={config.headers || '{}'}
                onChange={(e) => setConfig({ ...config, headers: e.target.value })}
                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white h-20 resize-none"
                placeholder='{"Content-Type": "application/json"}'
              />
            </div>
          </div>
        );

      default:
        return (
          <div className="text-gray-400 text-center py-8">
            <Settings className="w-8 h-8 mx-auto mb-2" />
            <p>Configuration options for this node type are coming soon.</p>
          </div>
        );
    }
  };

  return (
    <div className="h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Configure Node</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-medium text-white mb-2">{node.data?.label}</h3>
        <p className="text-sm text-gray-400">Node ID: {node.id}</p>
      </div>

      <div className="space-y-6">
        {renderConfigFields()}
      </div>

      <div className="absolute bottom-4 left-4 right-4">
        <button
          onClick={handleSave}
          className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-md transition-colors"
        >
          Save Configuration
        </button>
      </div>
    </div>
  );
} 