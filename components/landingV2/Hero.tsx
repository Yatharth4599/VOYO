'use client';

import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

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
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
              Get started for free
            </button>
            <button className="border border-gray-400 dark:border-gray-600 text-black dark:text-gray-300 font-semibold px-6 py-3 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
              Talk to sales
            </button>
          </div>
        </div>

        {/* Right: Lightning Bolt */}
        <div className="mt-12 lg:mt-0 lg:ml-8 grid grid-cols-3 gap-4 grid-rows-3">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="border border-gray-300 dark:border-gray-700 p-3">
              <div className="bg-gray-200 dark:bg-white h-[100px] w-[100px]"></div>
            </div>
          ))}
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
    </section>
  )
}
