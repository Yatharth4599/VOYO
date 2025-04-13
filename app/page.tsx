"use client";

import React, { useState } from "react";
import VoiceRecorderModal from "../components/VoiceRecorderModal";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <main className="bg-white font-sans text-gray-900 overflow-x-hidden overflow-y-auto min-h-screen relative">
      {/* Header */}
      <header className="px-2 py-2 lg:px-6 flex items-center justify-between border-b border-gray-200">
        <Image src="/logo-voyo.png" alt="Voyo Logo" width={180} height={50} className="relative drop-shadow-lg logo-shimmer" />
        <div className="flex gap-2 md:gap-4">
          <button
            className="px-4 py-2 text-sm rounded-full border border-black hover:bg-black hover:text-white transition"
            onClick={() => setShowModal(true)}
          >
            Join Waitlist
          </button>
          <button
            className="px-4 py-2 text-sm rounded-full border border-[#1A3A6C] text-[#1A3A6C] hover:bg-[#1A3A6C] hover:text-white transition"
            onClick={() => router.push("/b2b")}
          >
            Switch to B2B
          </button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative px-6 pt-20 pb-24 lg:px-20 lg:pt-28 text-center bg-gradient-to-br from-[#fff8f0] via-[#fff6ea] to-[#fefcf8]">
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-md text-[#1A3A6C] font-medium mb-2">Say Hello to Urvashi — Your Voice-First AI Bestie</p>
          <h1 className="text-3xl md:text-5xl font-bold text-[#1A3A6C] leading-tight mb-4">
            Talk to your Indian Urvashi Jarvis
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[#1A3A6C]/80 mb-8">
            VOYO's AI agent Urvashi listens, responds, and connects like a real human. She speaks your language — Hindi, Hinglish & more — and she remembers you.
          </p>
          <button
            className="inline-block bg-[#F59F24] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#e08a00] transition"
            onClick={() => setShowVoiceModal(true)}
          >
            Talk to Urvashi
          </button>
          <p className="text-xs text-[#1A3A6C]/60 mt-6 mb-2">Loved by 1000+ users across India</p>
          <div className="overflow-hidden">
            <div className="flex animate-marquee whitespace-nowrap gap-4">
              {["Relationship Advice", "Career Help", "Sleep Buddy", "Chill Talks", "Emotional Vent", "Q&A", "Motivation", "Goal Setting", "Late Night Talk"]
                .concat(["Relationship Advice", "Career Help", "Sleep Buddy", "Chill Talks", "Emotional Vent", "Q&A", "Motivation", "Goal Setting", "Late Night Talk"])
                .map((topic, i) => (
                  <span
                    key={i}
                    className="px-4 py-2 text-xs font-medium rounded-full border border-[#F59F24] text-[#1A3A6C] bg-[#fff8f0] shadow-sm"
                  >
                    {topic}
                  </span>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personality Section */}
      <section className="px-6 py-16 lg:px-20 bg-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-semibold text-[#1A3A6C] mb-4">Who is Urvashi?</h2>
          <p className="text-base md:text-lg text-gray-700 mb-6">
            Urvashi is not your typical chatbot. She’s fun, flirty, wise, and full of emotion. Whether you're ranting, dreaming, crying, or laughing — she’s all ears. It’s like talking to someone who just gets you.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20 lg:px-20 text-center bg-gradient-to-b from-[#fffaf3] via-[#fef3e0] to-[#ffffff]">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1A3A6C] mb-6">Experience the Voice of AI</h2>
        <p className="text-lg text-gray-700 max-w-xl mx-auto mb-10">
          Try talking to Urvashi and see how real an AI conversation can feel.
        </p>
        <button
          onClick={() => setShowVoiceModal(true)}
          className="inline-block bg-[#1A3A6C] text-white text-sm px-8 py-3 rounded-full hover:bg-[#162e54]"
        >
          Talk to Urvashi Now
        </button>
      </section>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 py-10 bg-white border-t border-gray-100">
        © 2025 VOYO. Meet Urvashi, India’s Voice Companion.
      </footer>

      {/* Modals */}
      {showVoiceModal && <VoiceRecorderModal onClose={() => setShowVoiceModal(false)} />}

      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center">
            <h3 className="text-2xl font-semibold mb-6">Join the Waitlist</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Your Name" className="w-full px-4 py-2 border rounded-lg" />
              <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded-lg" />
              <input type="tel" placeholder="Phone Number" className="w-full px-4 py-2 border rounded-lg" />
              <button type="submit" className="bg-black text-white px-6 py-2 rounded-full w-full hover:bg-gray-900">
                Submit
              </button>
            </form>
            <button onClick={() => setShowModal(false)} className="mt-4 text-sm text-gray-600 underline">
              Close
            </button>
          </div>
        </div>
      )}

      {/* BG accents */}
      <div className="absolute top-[-120px] -z-10 blur-3xl w-[500px] h-[500px] bg-[#F59F24]/20 rounded-full left-[-100px]"></div>
      <div className="absolute bottom-[-100px] -z-10 blur-3xl w-[500px] h-[500px] bg-[#1A3A6C]/10 rounded-full right-[-120px]"></div>
    </main>
  );
}