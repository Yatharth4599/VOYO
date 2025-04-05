"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import VoiceRecorderModal from "../components/VoiceRecorderModal";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);

  return (
    <div className="bg-[#F5F5EB] text-[#1A3A6C] font-[Satoshi]">
      {/* Hero Section */}
      <header className="bg-gradient-to-br from-[#F5F5EB] to-[#FFF] px-6 pt-24 pb-32 text-center relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute top-[-60px] right-[-60px] w-[200px] h-[200px] bg-[#F59F24] rounded-full blur-3xl opacity-40 z-0"
        />
        <motion.div
          className="max-w-6xl mx-auto relative z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          >
            <Image
              src="/logo-voyo.png"
              alt="Voyo Logo"
              width={220}
              height={220}
              className="mx-auto mb-10 mix-blend-multiply opacity-90 drop-shadow-[0_0_60px_#f59f24]"
            />
          </motion.div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Building India's voice-first operating system
          </h1>
          <p className="text-lg md:text-xl max-w-xl mx-auto text-[#1A3A6C]/80">
            VOYO is building the infrastructure for AI-native voice apps — trained on Indian languages, accents, and emotions.
          </p>
          <div className="mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowVoiceModal(true)}
              className="inline-block bg-[#F59F24] text-[#1A3A6C] px-6 py-3 rounded-full font-semibold hover:bg-[#e08a00] transition shadow-lg"
            >
              Try VOYO AI
            </motion.button>
          </div>
        </motion.div>
      </header>

      {/* Features Section */}
      <motion.section
        className="bg-[#1A3A6C] text-white py-20 px-6"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {["🎙️ Real Conversations", "🌐 10+ Indian Languages", "📈 Always Learning"].map((title, i) => (
            <motion.div
              key={i}
              className="bg-white text-[#1A3A6C] rounded-2xl shadow-xl p-8"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.2 }}
            >
              <h3 className="text-xl font-bold mb-2">{title}</h3>
              <p className="text-[#1A3A6C]/80">
                {i === 0
                  ? "Voyo listens like a human, speaks like a friend. Bilingual, expressive, and desi."
                  : i === 1
                  ? "Fluent in Hindi, Hinglish, and more — understands accents, emotions, and real India."
                  : "Model adapts to every conversation — better results, smarter responses over time."}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call To Action with Modal */}
      <section className="bg-[#F59F24] text-[#1A3A6C] py-24 px-6 text-center">
        <h2 className="text-4xl font-bold mb-4">We’re building India’s first Voice LLM</h2>
        <p className="text-lg max-w-2xl mx-auto mb-10">
          An emotionally intelligent, culturally fluent voice layer — powering the future of conversations in Bharat.
        </p>
        <motion.button
          onClick={() => setShowModal(true)}
          whileHover={{ scale: 1.05 }}
          className="bg-white text-[#1A3A6C] px-8 py-3 rounded-full font-semibold hover:bg-[#f7f7f7] transition"
        >
          Get Access
        </motion.button>
      </section>

      {/* Modal Popup */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
            <h3 className="text-2xl font-bold text-[#1A3A6C] mb-6">Get Access</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              <input type="email" placeholder="Email Address" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              <input type="tel" placeholder="Phone Number" className="w-full border border-gray-300 rounded-lg px-4 py-2" />
              <button type="submit" className="bg-[#F59F24] text-[#1A3A6C] font-semibold px-6 py-2 rounded-full w-full hover:bg-[#e08a00] transition">
                Submit
              </button>
            </form>
            <button onClick={() => setShowModal(false)} className="mt-4 text-sm text-[#1A3A6C] underline">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Voice Recorder Modal */}
      {showVoiceModal && <VoiceRecorderModal onClose={() => setShowVoiceModal(false)} />}

      {/* Footer */}
      <footer className="bg-[#1A3A6C] text-white text-center text-sm py-12 px-6">
        © 2025 VOYO · India’s Voice LLM · Built for Bharat
      </footer>
    </div>
  );
}
