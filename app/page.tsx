// pages/index.tsx
'use client';
import LoginForm from '../components/LoginForm';
import Head from 'next/head';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import SignupForm from '../components/SignupForm';


const AnimatedSphere = dynamic(() => import('../components/AnimatedSphere'), { ssr: false });

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);
  const openLoginModal = () => setShowLoginModal(true);
  const closeLoginModal = () => setShowLoginModal(false);

  return (
    <div className="bg-black text-white min-h-screen font-sans">
      <Head>
        <title>Voyo | AI Agent Solutions</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>



      <header className="flex justify-between items-center px-12 py-6">
  <img src="/Voyo Black Logo.png" className="w-40 h-40" alt="Voyo Logo" />
  
  <nav className="space-x-8">
    <a href="#features" className="text-gray-400 hover:text-white">Features</a>
    <a href="#ecosystem" className="text-gray-400 hover:text-white">Ecosystem</a>
    <a href="#contact" className="text-gray-400 hover:text-white">Contact</a>
  </nav>

  <div className="flex gap-4">
    <button
      onClick={openModal}
      className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer"
    >
      Join
    </button>

    <a
      href="https://calendly.com/YOUR-CALENDLY-LINK"
      target="_blank"
      rel="noopener noreferrer"
      className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg cursor-pointer"
    >
      Schedule a Call
    </a>
  </div>
</header>


      <section className="relative flex flex-col md:flex-row justify-between items-center px-12 py-24 bg-gradient-to-b from-black to-gray-900 overflow-hidden">
        <motion.div 
          className="md:w-1/2 z-10"
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold leading-tight mb-6">
            AI <span className="text-purple-400">Agents</span>, built for speed, scale, and quality
          </h2>
          <p className="text-gray-300 text-lg mb-8">
            Handling complex queries, boosting efficiency, and streamlining support so your business scales faster with precision.
          </p>
           <button
            onClick={openModal}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold cursor-pointer"
          >
            Join 
          </button>
          <button
  onClick={openLoginModal}
  className="bg-orange-600 hover:bg-orange-700 text-white px-6 py-3 rounded-lg text-lg font-semibold cursor-pointer ml-4"
>
  Login
</button>

        </motion.div>
        <div className="absolute right-0 top-0 bottom-0 w-full md:w-1/2 flex justify-end items-center pointer-events-none z-0">
          <AnimatedSphere />
        </div>
      </section>

      <section id="ecosystem" className="py-16 bg-black text-center">
        <h3 className="text-2xl font-semibold mb-4">Trusted by the Voyo Ecosystem</h3>
        <p className="text-gray-400 mb-6">We efficiently manage millions of AI-powered interactions monthly, at near-perfect uptime.</p>
        <div className="flex flex-wrap justify-center gap-12 py-6">
          <img src="/TigerPay.png" alt="TigerPay" className="w-24 h-auto" />
          <span className="text-white text-xl font-bold">Blinkit</span>
          <span className="text-white text-xl font-bold">Hyperpure</span>
        </div>
      </section>

      <section className="text-center py-24 px-8 bg-gradient-to-b from-gray-900 to-black">
        <h3 className="text-4xl font-bold mb-6">The only <span className="text-orange-400">AI toolbox</span> you'll ever need</h3>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          From conversational AI agents to co-pilots, unlock endless possibilities to transform your business.
        </p>
        <div className="flex flex-wrap justify-center gap-6">
          <span className="bg-gray-800 text-sm px-4 py-2 rounded-full">🚫 No-Code</span>
          <span className="bg-gray-800 text-sm px-4 py-2 rounded-full">💰 Cost-Effective</span>
          <span className="bg-gray-800 text-sm px-4 py-2 rounded-full">📊 Powerful Analytics</span>
        </div>
      </section>

      <section id="features" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-12 py-20 bg-[#111]">
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
          <h4 className="text-white text-xl font-semibold mb-2">Accurate Image Classification</h4>
          <p className="text-gray-400 text-sm mb-4">Enhance support by precisely categorizing images for faster resolutions.</p>
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
          <h4 className="text-white text-xl font-semibold mb-2">Automated Quality Audits</h4>
          <ul className="text-gray-400 text-sm list-disc list-inside">
            <li>Greeting & Introduction</li>
            <li>Customer Sentiment</li>
            <li>Action</li>
            <li>Closure</li>
          </ul>
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
          <h4 className="text-white text-xl font-semibold mb-2">Intelligent Conversations</h4>
          <p className="text-gray-400 text-sm">Seamlessly integrate data sources and SOPs to generate accurate responses and actions.</p>
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
          <h4 className="text-white text-xl font-semibold mb-2">Voice AI Agents</h4>
          <p className="text-gray-400 text-sm">Build and deploy low cost voice AI agents that talk and take actions like humans.</p>
        </div>
        <div className="bg-[#1c1c1c] p-6 rounded-xl shadow-md">
          <h4 className="text-white text-xl font-semibold mb-2">AI Powered Analytics</h4>
          <p className="text-gray-400 text-sm">Identify issues, ask questions and unlock valuable insights from your interactions.</p>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-12 px-12 py-24 bg-[#0d0d0d] border-t border-gray-800">
        <div>
          <h3 className="text-3xl font-bold mb-2">Agent Co-pilot</h3>
          <p className="text-gray-400 mb-6">Assist your team with real-time personalized customer insights and actions</p>
          <div className="space-y-4">
            <div className="bg-[#1a1a1a] p-4 rounded-lg">
              <p className="text-purple-300 font-semibold">💬 Chat Summarization</p>
              <p className="text-sm text-gray-400">Summarizes conversations to keep agents focused</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg">
              <p className="text-orange-300 font-semibold">🌟 Smart Suggestions</p>
              <p className="text-sm text-gray-400">Accurate and policy driven response suggestions</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg">
              <p className="text-green-300 font-semibold">🟢 Contextual Actions</p>
              <p className="text-sm text-gray-400">Recommends optimal actions for quicker resolution</p>
            </div>
            <div className="bg-[#1a1a1a] p-4 rounded-lg">
              <p className="text-blue-300 font-semibold">🔁 Real-Time Assistance</p>
              <p className="text-sm text-gray-400">Smartly engages with data sources to provide updated information</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-center text-center">
  <h3 className="text-2xl font-semibold mb-2">Fluid Integrations</h3>
  <p className="text-gray-400 mb-6">Integrate seamlessly with tools like Freshdesk, Zendesk, and more</p>

  <div className="relative w-[320px] h-[320px] mt-10">
    {/* Center pulse */}
    <motion.div
      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-500 text-2xl font-bold"
      animate={{ scale: [1, 1.1, 1] }}
      transition={{ duration: 2, repeat: Infinity }}
    >
      voyo
    </motion.div>

    {/* Orbiting icons */}
    {[
      { src: "/whatsapp.png", className: "top-0 left-1/2 -translate-x-1/2" },
      { src: "/zendesk.png", className: "top-1/2 left-0 -translate-y-1/2" },
      { src: "/salesforce.png", className: "bottom-0 left-1/2 -translate-x-1/2" },
      { src: "/slack.png", className: "top-1/2 right-0 -translate-y-1/2" },
      { src: "/freshdesk.png", className: "top-[15%] right-[15%]" },
    ].map(({ src, className }, i) => (
      <motion.div
        key={i}
        className={`absolute ${className} w-16 h-16 border border-gray-300 rounded-lg flex items-center justify-center bg-[#111]`}
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 2 + i * 0.2, repeat: Infinity, ease: "easeInOut" }}
      >
        <img src={src} className="w-10 h-10" alt="Integration" />
      </motion.div>
    ))}
  </div>
</div>

      </section>


      <section className="text-center py-20 px-10 bg-black border-t border-gray-800">
        <h3 className="text-3xl font-bold mb-4">Maximize Efficiency</h3>
        <p className="text-gray-400 mb-10">Optimize workflows, drive faster issue resolutions, and achieve measurable cost reductions.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-gray-900 p-6 rounded-xl">
            <h4 className="text-white font-semibold mb-2">80% Queries resolved by AI agents</h4>
            <p className="text-gray-400 text-sm">Increase bot resolution rates, minimizing customer frustration and repeat interactions.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <h4 className="text-white font-semibold mb-2">25% Increase in compliance</h4>
            <p className="text-gray-400 text-sm">Improve compliance with agent co-pilot, ensuring agents follow best practices.</p>
          </div>
          <div className="bg-gray-900 p-6 rounded-xl">
            <h4 className="text-white font-semibold mb-2">20% Reduction in resolution time</h4>
            <p className="text-gray-400 text-sm">Enhance team efficiency allowing for greater focus on high-value or complex queries.</p>
          </div>
        </div>
      </section>

      <section className="text-center py-24 px-12 bg-gradient-to-t from-gray-900 to-black">
        <h3 className="text-3xl font-bold mb-6">Ready to transform your business?</h3>
        <p className="text-gray-400 mb-6">Get started and see how AI can transform your customer interactions—faster, smarter, better.</p>
        <button
          onClick={openModal}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg text-lg font-semibold cursor-pointer"
        >
          Join 
        </button>
      </section>

      {/* Modal */}
      {showModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-[#111] p-6 rounded relative"
            onClick={(e) => e.stopPropagation()}
          >
            <SignupForm onClose={() => setShowModal(false)} />
          </div>
        </div>
      )}
      {showLoginModal && (
  <div
    className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50"
    onClick={closeLoginModal}
  >
    <div
      className="bg-[#111] p-6 rounded relative"
      onClick={(e) => e.stopPropagation()}
    >
      <LoginForm onClose={closeLoginModal} />
    </div>
  </div>
)}
      {/* Footer */}
      <footer className="text-center py-6 text-gray-500 text-sm bg-black border-t border-gray-800">
        &copy; 2025 Voyo AI. All rights reserved.
      </footer>
    </div>
  );
}












