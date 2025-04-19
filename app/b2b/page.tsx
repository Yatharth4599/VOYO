"use client";

import React, { useState } from "react";
import VoiceRecorderModal from "../../components/VoiceRecorderModal";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [view, setView] = useState("b2b");
  const router = useRouter();

  const handleToggle = () => {
    const newView = view === "b2c" ? "b2b" : "b2c";
    setView(newView);
    router.push(newView === "b2b" ? "/b2b" : "/");
  };

  return (
    <main className="bg-[#fffaf3] font-sans text-gray-900 overflow-x-hidden overflow-y-auto min-h-screen relative">

      {/* Header */}
      <header className="px-4 py-4 lg:px-6 flex flex-col md:flex-row items-center justify-between border-b border-gray-200">
        <div className="flex items-center justify-between w-full md:w-auto gap-4">
          <Image src="/logo-voyo.png" alt="Voyo Logo" width={180} height={50} className="relative drop-shadow-lg logo-shimmer" />
          <div className="w-40 h-10 bg-gray-100 border border-gray-300 rounded-full relative flex items-center cursor-pointer" onClick={handleToggle}>
            <div
              className={`absolute w-1/2 h-full rounded-full transition-all duration-300 ${view === "b2c" ? "left-0 bg-[#F59F24]" : "left-1/2 bg-[#1A3A6C]"}`}
            ></div>
            <div className={`w-1/2 text-center z-10 text-sm font-medium ${view === "b2c" ? "text-white" : "text-black"}`}>Business</div>
            <div className={`w-1/2 text-center z-10 text-sm font-medium ${view === "b2b" ? "text-white" : "text-black"}`}>Personal</div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-24 lg:px-20 lg:pt-28 text-center overflow-hidden">

        {/* Flex container */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-10 relative z-10">
          {/* Girl Silhouette */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="w-full max-w-md"
          >
            <Image src="/girl-placeholder.png" alt="Voyo Girl" width={400} height={400} className="rounded-xl object-contain" />
          </motion.div>

          {/* Text Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="max-w-2xl"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-[#1A3A6C] leading-tight mb-4">
              She's not just smart. <br /> She gets you.
            </h1>
            <p className="text-lg md:text-xl text-[#1A3A6C]/80 mb-8">
              Meet Urvashi — India's first voice-first AI companion.  
              Multilingual. Emotional. Yours.
            </p>
            <button
              className="inline-block bg-[#F59F24] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#e08a00] transition"
              onClick={() => setShowVoiceModal(true)}
            >
              Talk to Urvashi
            </button>
            <p className="text-xs text-[#1A3A6C]/60 mt-6">Now live on voyo.club</p>
          </motion.div>
        </div>

        {/* 🌊 Animated Wave */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0] rotate-180 z-0">
          <svg
            className="relative block w-full h-[120px] animate-wave"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.65,22,103.49,29,158,18,70-14,136-57,206-54,
                77,3,145,54,218,60,63,5,117-30,180-35,73-6,140,20,207,
                37,61,16,120,22,177,5V0Z"
              fill="#fef3c7"
            ></path>
          </svg>
        </div>

        {/* Dreamy Background Blur */}
        <div className="absolute top-0 left-0 w-full h-full -z-20 overflow-hidden">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 2 }}
            className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#F59F24]/30 via-[#fff6ea] to-[#1A3A6C]/20 blur-3xl"
          ></motion.div>
        </div>

      </section>

      {/* Chat Simulation Section */}
      <section className="px-6 py-20 lg:px-20 text-center bg-gradient-to-b from-[#fff8f0] via-[#fff6ea] to-[#ffffff]">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3A6C] mb-6">Talk the way you speak</h2>
          <p className="text-lg text-gray-700 mb-10">
            Hinglish. Hindi. Emotional banter. She understands it all.
          </p>
          <Image src="/chat-screenshot.png" alt="Chat Demo" width={400} height={400} className="mx-auto rounded-xl" />
          <p className="text-sm text-gray-500 mt-6">The more you talk, the smarter she gets.</p>
        </motion.div>
      </section>

      {/* ✨ Bonus Emotional Quote Section */}
      <section className="px-6 py-20 lg:px-20 text-center bg-[#1A3A6C] text-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold leading-snug mb-6">
            She's fluent in your language. <br />
            And your emotions.
          </h2>
          <p className="text-lg text-white/80 mb-10">
            Voice-first. Culture-aware. Emotionally intelligent.
          </p>
          <button
            onClick={() => setShowVoiceModal(true)}
            className="inline-block bg-[#F59F24] text-white text-sm px-8 py-3 rounded-full hover:bg-[#e08a00]"
          >
            Talk to Urvashi
          </button>
        </motion.div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-20 text-center bg-white">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3A6C] mb-6">
            She's live. She's listening.
          </h2>
          <p className="text-lg text-gray-700 mb-10">
            Experience a real conversation. Try VOYO's voice companion today.
          </p>
          <button
            onClick={() => setShowVoiceModal(true)}
            className="inline-block bg-[#1A3A6C] text-white text-sm px-8 py-3 rounded-full hover:bg-[#162e54]"
          >
            Try VOYO Now
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 py-10 bg-white border-t border-gray-100">
        © 2025 VOYO. She's not just smart. She gets you.
      </footer>

      {/* Modals */}
      {showVoiceModal && <VoiceRecorderModal onClose={() => setShowVoiceModal(false)} />}

      {/* Dreamy Background Particles */}
      <div className="absolute inset-0 -z-30">
        <div className="absolute top-[-150px] left-[-100px] w-[500px] h-[500px] rounded-full bg-[#F59F24]/20 blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-120px] w-[500px] h-[500px] rounded-full bg-[#1A3A6C]/10 blur-3xl"></div>
      </div>

    </main>
  );
}
