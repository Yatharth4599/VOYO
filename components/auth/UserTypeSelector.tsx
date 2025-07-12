'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Building2, UserPlus, ArrowRight } from 'lucide-react';

interface UserTypeSelectorProps {
  onSelect: (userType: 'COMPANY' | 'AGENT_CREATOR') => void;
}

export default function UserTypeSelector({ onSelect }: UserTypeSelectorProps) {
  const [selectedType, setSelectedType] = useState<'COMPANY' | 'AGENT_CREATOR' | null>(null);

  const handleSelect = (type: 'COMPANY' | 'AGENT_CREATOR') => {
    setSelectedType(type);
    setTimeout(() => onSelect(type), 300);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-white mb-4">
            Welcome to VOYO
          </h1>
          <p className="text-xl text-gray-300">
            Build your AI team. Plug & play.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-center mb-8"
        >
          <h2 className="text-2xl font-semibold text-white mb-4">
            How will you use VOYO?
          </h2>
          <p className="text-gray-400">
            Choose your role to get started with the right experience
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Company Option */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              selectedType === 'COMPANY'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
            onClick={() => handleSelect('COMPANY')}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-4 ${
                selectedType === 'COMPANY' ? 'bg-purple-500' : 'bg-gray-700'
              }`}>
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                I'm a Company
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I want to use AI agents to automate my business processes, 
                improve customer service, and boost productivity.
              </p>
              {selectedType === 'COMPANY' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <ArrowRight className="w-6 h-6 text-purple-400" />
                </motion.div>
              )}
            </div>
          </motion.div>

          {/* Agent Creator Option */}
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`relative p-8 rounded-2xl border-2 cursor-pointer transition-all duration-300 ${
              selectedType === 'AGENT_CREATOR'
                ? 'border-purple-500 bg-purple-500/10'
                : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
            }`}
            onClick={() => handleSelect('AGENT_CREATOR')}
          >
            <div className="flex flex-col items-center text-center">
              <div className={`p-4 rounded-full mb-4 ${
                selectedType === 'AGENT_CREATOR' ? 'bg-purple-500' : 'bg-gray-700'
              }`}>
                <UserPlus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                I'm an Agent Creator
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                I want to build and sell AI agents on the marketplace, 
                monetize my expertise, and help other businesses.
              </p>
              {selectedType === 'AGENT_CREATOR' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="absolute top-4 right-4"
                >
                  <ArrowRight className="w-6 h-6 text-purple-400" />
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 