'use client'

import { useState } from 'react';
import { UserCircle, PlusCircle, Share, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import Image from 'next/image';


export default function Sandbox() {
  const buttons = [
    'Describe an Image',
    'Combine ideas',
    'Make a video from an image',
    'Explore Flows',
  ];

  const sidebarImages = [
    '/category-dark.svg',
    '/history-dark.svg',
    '/stack-dark.svg',
    '/brush-dark.svg',
    '/help-dark.svg',
  ];


  return (
    <div>
      <section>
       <div className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Background dots */}
      <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0" />

      {/* Top bar */}
      <div className="relative z-10 flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-2 ml-1">
          <div className="w-6 h-6 bg-white rounded-sm" />
          <span className="text-sm">Untitled</span>
        </div>
        <button className="flex items-center text-white border border-white hover:bg-white/10 px-3 py-1 rounded">
          <Share className="w-4 h-4 mr-2" /> Share
        </button>
      </div>

      {/* Sidebar */}
      <div className="absolute left-2 top-16 flex flex-col items-center gap-4 z-10">
        <button className="w-10 h-10 flex items-center justify-center bg-zinc-800 text-white rounded-full ml-3">
          <PlusCircle className="w-5 h-5" />
        </button>

        {sidebarImages.map((src, i) => (
          <div
            key={i}
            className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center p-1 ml-3"
          >
            <Image
              src={src}
              alt={`Sidebar Image ${i + 1}`}
              width={24}
              height={24}
              className="w-full h-full object-contain"
            />
          </div>
        ))}


        <div className="mt-auto mb-4">
          <UserCircle className="w-10 h-10 text-green-500 bg-zinc-800 rounded-full p-1 ml-3" />
        </div>
      </div>

      {/* Center message and buttons */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center h-[calc(100vh-100px)]">
        <motion.div
          className="text-sm text-zinc-300"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          ✨ <span className="font-medium text-white">Double-click</span> anywhere to create a new Block, or start with...
        </motion.div>

        <div className="mt-6 flex flex-wrap justify-center gap-4">
          {buttons.map((label, i) => (
            <button
              key={i}
              className="rounded-full border border-white/20 bg-zinc-800 hover:bg-white/10 px-5 py-2 text-sm"
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Bottom Queue Bar */}
      <div className="absolute bottom-4 right-4 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm z-10">
        <Clock className="w-4 h-4" /> Queue <span className="opacity-50">0 active</span>
      </div>

      {/* Floating number in bottom-left */}
        <div className="absolute bottom-4 left-4 text-xs bg-zinc-800 rounded-full px-3 py-1 z-10">
          666
        </div>
      </div>
      </section>
    </div>
    
  )
}