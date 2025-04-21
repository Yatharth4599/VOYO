"use client";

import React, { useState } from "react";
import { createPortal } from "react-dom";
import VoiceRecorderModal from "../components/VoiceRecorderModal";
import Image from "next/image";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [showVoiceModal, setShowVoiceModal] = useState(false);
  const [view, setView] = useState("b2c");
  const router = useRouter();

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const handleToggle = () => {
    const newView = view === "b2c" ? "b2b" : "b2c";
    setView(newView);
    router.push(newView === "b2b" ? "/b2b" : "/");
  };


  return (
    <>
      {/* Main Page Content */}
      <main className="bg-white font-sans text-gray-900 overflow-x-hidden min-h-screen relative">
        
        {/* ✅ Fixed Background Blobs */}
  <div className="absolute top-0 left-0 w-full h-0 overflow-hidden -z-10 pointer-events-none">
    <div className="absolute top-[-250px] left-[-200px] w-[500px] h-[500px] rounded-full bg-[#F59F24]/20 blur-3xl" />
    <div className="absolute bottom-[-250px] right-[-200px] w-[500px] h-[500px] rounded-full bg-[#1A3A6C]/10 blur-3xl" />
  </div>
        {/* Header */}
        <header className="px-4 py-4 lg:px-6 flex flex-col md:flex-row items-center justify-between border-b border-gray-200">
          <div className="flex items-center justify-between w-full md:w-auto gap-4">
            <Image src="/logo-voyo.png" alt="Voyo Logo" width={180} height={50} className="relative drop-shadow-lg logo-shimmer" />
            <div className="w-40 h-10 bg-gray-100 border border-gray-300 rounded-full relative flex items-center cursor-pointer" onClick={handleToggle}>
              <div className={`absolute w-1/2 h-full rounded-full transition-all duration-300 ${view === "b2c" ? "left-0 bg-[#F59F24]" : "left-1/2 bg-[#1A3A6C]"}`} />
              <div className={`w-1/2 text-center z-10 text-sm font-medium ${view === "b2c" ? "text-white" : "text-black"}`}>Business</div>
              <div className={`w-1/2 text-center z-10 text-sm font-medium ${view === "b2b" ? "text-white" : "text-black"}`}>Personal</div>
            </div>
          </div>
          <button
            className="mt-4 md:mt-0 px-4 py-2 text-sm rounded-full border border-black hover:bg-black hover:text-white transition"
            onClick={() => setShowModal(true)}
          >
            Join Waitlist
          </button>
        </header>

        {/* Hero Section */}
        <section className="relative px-6 pt-20 pb-24 lg:px-20 lg:pt-28 text-center bg-gradient-to-br from-[#fff8f0] via-[#fff6ea] to-[#fefcf8]">
          <div className="max-w-4xl mx-auto relative z-10">
            <p className="text-md text-[#1A3A6C] font-medium mb-2">Meet VOYO — Your AI Partner for Everything</p>
            <h1 className="text-3xl md:text-5xl font-bold text-[#1A3A6C] leading-tight mb-4">
              Build with India's Voice-Native AI Stack
            </h1>
            <p className="text-base md:text-lg leading-relaxed text-[#1A3A6C]/80 mb-8">
              VOYO gives you the tools to launch multilingual, emotion-aware voice experiences — for customer support, sales, and automation.
            </p>
            <button
              className="inline-block bg-[#F59F24] text-white px-8 py-3 rounded-full text-base font-semibold hover:bg-[#e08a00] transition"
              onClick={() => setShowVoiceModal(true)}
            >
              Try VOYO AI Now
            </button>
            <p className="text-xs text-[#1A3A6C]/60 mt-6 mb-2">Trusted by 100+ founders across industries</p>

            {/* Horizontal Scroll Industries */}
            <div className="w-full overflow-x-auto">
              <div className="flex whitespace-nowrap gap-4">
                {[
                  "Fintech", "Healthcare", "Logistics", "BFSI", "Edtech", "Ecommerce", "Customer Support", "Retail", "Real Estate",
                ].map((industry, i) => (
                  <span key={i} className="px-4 py-2 text-xs font-medium rounded-full border border-[#F59F24] text-[#1A3A6C] bg-[#fff8f0] shadow-sm">
                    {industry}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>


 {/* Features Section */}
      <section className="relative px-6 py-28 lg:px-20 bg-gradient-to-br from-[#fffdf5] via-[#fff4e5] to-[#ffffff] border-t border-gray-100">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F59F24] rounded-full mb-12"></div>
        <motion.div 
          initial="hidden" 
          whileInView="visible" 
          viewport={{ once: true }} 
          transition={{ staggerChildren: 0.2 }} 
          className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto"
        >
          {[
            {
              title: "Multilingual & Inclusive",
              desc: "Fluent in Hindi, Hinglish and other Indian languages — with native emotional tones."
            },
            {
              title: "Real-Time Voice Intelligence",
              desc: "Conversational agents that speak and respond like humans, powered by our LLMs."
            },
            {
              title: "Built for Bharat",
              desc: "Designed for Tier 2 & 3 cities, VOYO understands local accents, emotions, and intent."
            }
          ].map((item, idx) => (
            <motion.div 
              key={idx} 
              variants={fadeInUp} 
              className="p-6 bg-white shadow-md border border-gray-200 rounded-2xl"
            >
              <h3 className="text-xl font-medium mb-3">{item.title}</h3>
              <p className="text-gray-600 text-base leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Testimonials */}
      <section className="relative bg-gradient-to-r from-[#fff9f3] via-[#fdf2e9] to-[#ffffff] py-24 px-6 lg:px-20">
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F59F24] rounded-full mb-12"></div>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-12">What People Are Saying</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              {
                name: "Amit R.",
                quote: "VOYO sounds like I’m speaking to a real person. It’s magical.",
                stars: 5
              },
              {
                name: "Sneha T.",
                quote: "Finally, an AI that understands Hinglish perfectly!",
                stars: 4
              },
              {
                name: "Rajeev B.",
                quote: "The emotional tone recognition is unmatched. Truly Indian tech!",
                stars: 5
              }
            ].map((t, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-md border border-gray-200 text-left flex flex-col justify-between h-full transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-center mb-3">
                  {[...Array(t.stars)].map((_, idx) => (
                    <svg
                      key={idx}
                      className="w-4 h-4 text-yellow-400 mr-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.21 3.72a1 1 0 00.95.69h3.905c.969 0 1.371 1.24.588 1.81l-3.158 2.294a1 1 0 00-.364 1.118l1.21 3.72c.3.921-.755 1.688-1.54 1.118l-3.158-2.294a1 1 0 00-1.176 0l-3.158 2.294c-.784.57-1.838-.197-1.539-1.118l1.21-3.72a1 1 0 00-.364-1.118L2.298 9.147c-.783-.57-.38-1.81.588-1.81h3.905a1 1 0 00.95-.69l1.21-3.72z" />
                    </svg>
                  ))}
                </div>
                <p className="text-gray-800 text-base mb-4 leading-relaxed">“{t.quote}”</p>
                <span className="block text-sm font-medium text-gray-600 mt-auto">— {t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>




      {/* ROI Section */}
      <section className="relative bg-gradient-to-br from-[#fef9f5] via-[#fff3e0] to-[#ffffff] px-6 py-28 lg:px-20 border-t border-gray-100">
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F59F24] rounded-full mb-12"></div>
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-4xl font-semibold mb-4">Drive ROI on Autopilot</h2>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto mb-12">
            VOYO isn’t just smart — it’s profitable. Boost your conversions, cut support costs, and delight customers across India’s diverse markets.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "40% Increase in Lead Conversion",
                desc: "Voice-based lead qualification helps your sales team focus on hot leads."
              },
              {
                title: "30% Reduction in Call Center Load",
                desc: "Automated responses reduce dependency on human agents for FAQs and routing."
              },
              {
                title: "4x Engagement in Tier 2 & 3 Cities",
                desc: "Local language support and emotional nuance boost user trust and retention."
              }
            ].map((stat, i) => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h3 className="text-xl font-semibold mb-2">{stat.title}</h3>
                <p className="text-gray-600 text-base">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="relative bg-gradient-to-br from-[#fef9f5] via-[#fff3e0] to-[#ffffff] px-6 py-28 lg:px-20 border-t border-gray-100">
  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-[#F59F24] rounded-full mb-12"></div>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">FAQs</h2>
          <div className="space-y-6">
            {[
              {
                q: "What is VOYO?",
                a: "VOYO is India’s first voice-native LLM platform built for real-time, multilingual, emotional AI conversations."
              },
              {
                q: "Can VOYO integrate with my app or call center?",
                a: "Yes, we offer APIs to connect VOYO with your existing tools — from IVRs to custom apps."
              },
              {
                q: "Which languages does VOYO support?",
                a: "Currently Hindi, Hinglish, Marathi, Gujarati, Kannada, and more regional dialects."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-gray-200">
                <h4 className="font-medium text-lg mb-2">{faq.q}</h4>
                <p className="text-gray-600 text-base">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-32 lg:px-20 text-center bg-gradient-to-b from-[#fffaf3] via-[#fef3e0] to-[#ffffff]">
        <h2 className="text-4xl font-semibold mb-6">Launching India’s Voice LLM</h2>
        <p className="text-lg max-w-xl mx-auto text-gray-700 mb-10">
          Be part of the revolution in natural conversations. Our voice-native LLM understands India — better than any chatbot.
        </p>
        <button
          onClick={() => setShowModal(true)}
          className="inline-block bg-black text-white text-sm px-8 py-3 rounded-full hover:bg-gray-900"
        >
          Join the Waitlist
        </button>
      </section>

      {/* Footer */}
      <footer className="text-sm text-center text-gray-500 py-10 bg-white border-t border-gray-100">
        © 2025 VOYO. India’s Voice Infrastructure.
      </footer>
    </main>

      {/* Portaled Modals */}
      {showModal && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-2xl max-w-md w-full text-center">
            <h3 className="text-2xl font-semibold mb-6">Join the Waitlist</h3>
            <form 
  onSubmit={async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
    };
    
    try {
      const res = await fetch('https://script.google.com/macros/s/AKfycbx2T8HpaBNgNKXH3asaWYk5J6i6xJLG1OXfncikDE1BMByEN0ALwo3QG-4qc4sfgkon/exec', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        alert('🎉 Successfully added to the waitlist!');
        e.target.reset(); // Clear the form
      } else {
        alert('❌ Failed to join. Please try again later.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('❌ An unexpected error occurred.');
    }
  }}
  className="space-y-4"
>
  <input 
    type="text" 
    name="name" 
    placeholder="Your Name" 
    className="w-full px-4 py-2 border rounded-lg" 
    required 
  />
  <input 
    type="email" 
    name="email" 
    placeholder="Email" 
    className="w-full px-4 py-2 border rounded-lg" 
    required 
  />
  <input 
    type="tel" 
    name="phone" 
    placeholder="Phone Number" 
    className="w-full px-4 py-2 border rounded-lg" 
    required 
  />
  <button 
    type="submit" 
    className="bg-black text-white px-6 py-2 rounded-full w-full hover:bg-gray-900"
  >
    Submit
  </button>
</form>

            <button onClick={() => setShowModal(false)} className="mt-4 text-sm text-gray-600 underline">
              Close
            </button>
          </div>
        </div>,
        document.body
      )}

      {showVoiceModal && createPortal(
        <VoiceRecorderModal onClose={() => setShowVoiceModal(false)} />,
        document.body
      )}
    </>
  );
}
