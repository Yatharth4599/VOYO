'use client';

import Image from 'next/image'
import { useState, useEffect } from 'react';
import SignupForm from '../SignupForm';
import LoginForm from '../LoginForm';
import { createApiUrl } from '@/lib/config';
import SandboxDemo from './SandboxDemo';
import LogoCarousel from './LogoCarousel';

interface Agent {
  "Agent Name": string
  "Agent URL": string
  "Agent Logo": string
  "Description": string
  "Pricing Model": string
  "Category": string
  "Official Website URL": string
}

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [agents, setAgents] = useState<Agent[]>([]);
  
  useEffect(() => {
    setMounted(true);
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      const response = await fetch(createApiUrl('/api/agents-directory/category/Customer%20Service'));
      const data = await response.json();
      if (data.success && data.data.length >= 9) {
        // Get first 9 agents from Customer Service category
        setAgents(data.data.slice(0, 9));
      } else if (data.success && data.data.length > 0) {
        // If less than 9 agents, show all available
        setAgents(data.data);
      }
    } catch (error) {
      console.error('Error fetching Customer Service agents:', error);
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const openModal = () => setShowModal(true);
  // const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  const openLoginModal = () => {
  setShowModal(false); // Close signup
  setShowLoginModal(true); // Open login
};

  const openSignupModal = () => {
    setShowLoginModal(false); // Close login
    setShowModal(true); // Open signup
  };


if (!mounted) return null; // prevents render mismatch



  return (
    <section className="bg-[#FFFBF3] relative dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white pt-30 pb-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left: Text + CTAs */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight text-black dark:text-white">
            Welcome to the <span className="text-orange-500">AI Agent Marketplace</span>
          </h1>

          <p className="text-lg text-black dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
            Discover, test, and use ready-made AI workflows for your business. No coding, no complicated setup—just pick what you need and get started instantly. One simple subscription, all the AI power you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={openModal} className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
              Get started for free
            </button>
            <button className="border border-gray-400 dark:border-gray-600 text-black dark:text-gray-300 font-semibold px-6 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer" onClick={() => {
              window.scrollTo({ top: document.getElementById('sandbox-section')?.offsetTop || 0, behavior: 'smooth' });
            }}>
              Try the Sandbox
            </button>
          </div>
        </div>

        {/* Right: Friendly Marketplace Visual */}
        <div className="mt-12 lg:mt-0 lg:ml-8 flex flex-col items-center">
          {/* <div className="rounded-xl bg-white dark:bg-[#23182B] shadow-lg p-6 flex flex-col items-center">
            <span className="text-5xl mb-2">🛒🤖</span>
            <div className="text-lg font-semibold text-gray-700 dark:text-gray-200 mb-1">Browse AI Agents</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">For restaurants, retail, and more</div>
          </div> */}
          <LogoCarousel/>
        </div>
      </div>

      {/* Sandbox Section: Drag-and-drop workflow builder for restaurants */}
      <section id="sandbox-section" className="relative z-10 max-w-5xl mx-auto mt-16 bg-[#faf6e8f6] dark:bg-[#1B142F] border border-gray-300 dark:border-gray-600 p-6 rounded-xl">
        <h2 className="text-2xl font-bold mb-4 text-center text-black dark:text-white">Try the AI Workflow Sandbox</h2>
        <p className="text-center text-gray-700 dark:text-gray-300 mb-6">Enter your restaurant name or website and see what AI can do for you. Drag workflows you like into your own sandbox!</p>
        <SandboxDemo />
      </section>

      <div className="text-center text-gray-600 dark:text-gray-400 p-3 text-lg mt-12">
        The world's most popular workflow automation platform for technical teams including
        <div className="flex flex-wrap justify-center gap-25 mt-3">
          <div className="text-3xl">Pearson</div>
          <div className="text-3xl">Unlabel</div>
          <div className="text-3xl">Cisco</div>
          <div className="text-3xl">Paddle</div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-evenly mx-6 my-12 gap-4">
        <div className="bg-gradient-to-r from-yellow-300 to-orange-300 dark:from-black dark:to-rose-950 text-black dark:text-white text-lg px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
          <span className="font-bold">Top 150 Github.</span> Our 113.4k stars place us among the most popular projects.
        </div>
        <div className="bg-gradient-to-r from-orange-300 to-amber-500 dark:from-rose-950 dark:to-purple-950 text-black dark:text-white text-lg px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
          <span className="font-bold">4.9/5 stars on G2.</span> To quote "A solid automation tool that just works."
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-yellow-300 dark:from-purple-950 dark:to-black text-black dark:text-white text-lg px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
          <span className="font-bold">200k+ community members.</span> This wouldn't be possible without you.
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-start pt-12 pb-12 overflow-y-auto z-50">
          <div
            className="modern-card p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SignupForm 
              onClose={() => setShowModal(false)} 
              switchToLogin={openLoginModal}
            />
          </div>
        </div>
      )}
      {showLoginModal && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50">
          <div
            className="modern-card p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginForm 
              onClose={closeLoginModal} 
              switchToSignup={openSignupModal}
            />
          </div>
        </div>
      )}
    </section>
  )
}
