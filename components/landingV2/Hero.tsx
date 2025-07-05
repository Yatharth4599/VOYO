'use client';

import Image from 'next/image'
import { useState, useEffect } from 'react';
import SignupForm from '../SignupForm';
import LoginForm from '../LoginForm';
import { createApiUrl } from '@/lib/config';

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
            AI <span className="text-highlight font-medium">Agents</span> that work
          </h1>

          <p className="text-lg text-black dark:text-gray-300 mb-8 max-w-xl mx-auto lg:mx-0">
            Transform your business with intelligent AI agents that handle complex queries, 
            boost efficiency, and deliver precision at scale.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button onClick={openModal} className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
              Get started for free
            </button>
            <button className="border border-gray-400 dark:border-gray-600 text-black dark:text-gray-300 font-semibold px-6 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer">
              Talk to sales
            </button>
          </div>
        </div>

        {/* Right: Agent Images Grid */}
        <div className="mt-12 lg:mt-0 lg:ml-8 grid grid-cols-3 gap-4 grid-rows-3">
          {agents.length > 0 ? (
            agents.map((agent, i) => (
              <div key={i} className="border border-gray-300 dark:border-gray-700 p-3 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="h-[100px] w-[100px] bg-gray-200 dark:bg-gray-500 rounded-lg overflow-hidden">
                  {agent['Agent Logo'] ? (
                    <img 
                      src={agent['Agent Logo']} 
                      alt={agent['Agent Name']} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">${agent['Agent Name'].substring(0, 2).toUpperCase()}</div>`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                      {agent['Agent Name'].substring(0, 2).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            // Loading skeleton
            [...Array(9)].map((_, i) => (
              <div key={i} className="border border-gray-300 dark:border-gray-700 p-3">
                <div className="bg-gray-200 dark:bg-gray-500 h-[100px] w-[100px] animate-pulse rounded-lg"></div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Bottom: Tabs + Diagram */}
      <div className="relative z-10 max-w-5xl mx-auto mt-16 bg-[#faf6e8f6] dark:bg-[#1B142F] border border-gray-300 dark:border-gray-600 p-6 rounded-xl">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mb-6">
          <div className="bg-orange-200 dark:bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-orange-300 dark:hover:bg-[#3C2D6D] transition cursor-pointer">
            IT Ops can<br /><span className="font-medium text-black dark:text-white">On-board new employees</span>
          </div>
          <div className="bg-orange-200 dark:bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-orange-300 dark:hover:bg-[#3C2D6D] transition cursor-pointer">
            Sec Ops can<br /><span className="font-medium text-black dark:text-white">Enrich security tickets</span>
          </div>
          <div className="bg-orange-200 dark:bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-orange-300 dark:hover:bg-[#3C2D6D] transition cursor-pointer">
            Dev Ops can<br /><span className="font-medium text-black dark:text-white">Convert natural language</span>
          </div>
          <div className="bg-orange-200 dark:bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-orange-300 dark:hover:bg-[#3C2D6D] transition cursor-pointer">
            Sales can<br /><span className="font-medium text-black dark:text-white">Generate insights</span>
          </div>
          <div className="bg-orange-200 dark:bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-orange-300 dark:hover:bg-[#3C2D6D] transition cursor-pointer">
            You can<br /><span className="font-medium text-black dark:text-white">Watch this video</span>
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-300 dark:border-gray-700 p-3">
          <Image
            src="/assets/workflow-diagram.png"  // Replace with your own diagram
            alt="Workflow Diagram"
            fill
            className="object-cover"
          />
        </div>
      </div>

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
            {/* <SignupForm onClose={() => setShowModal(false)} /> */}
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
            {/* <LoginForm onClose={closeLoginModal} /> */}
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
