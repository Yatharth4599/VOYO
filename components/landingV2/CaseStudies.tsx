'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react';

export default function CaseStudies() {
  const [mounted, setMounted] = useState(false);
useEffect(() => setMounted(true), []);

if (!mounted) return null; // prevents render mismatch

  return (
    <section className="relative bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white py-20 overflow-hidden">
      <h2 className="relative w-fit mx-auto px-10 bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[50px] mt-15 text-center font-bold mb-6">
        Case Studies
      </h2>

      <div className="w-full flex justify-center">
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
          {/* Card 1 */}
          <div className="bg-gradient-to-b from-[#ffffff] to-orange-500 dark:from-[#16162c] dark:to-pink-950 rounded-lg p-6 text-black dark:text-white">
            <h3 className="mb-1 text-[20px] dark:text-purple-200">
              How Delivery Hero saved <span className="font-bold text-amber-500 dark:text-white">200 hours each <br /> month</span> with a single ITOps workflow
            </h3>

            <div className="border-b mt-12 border-gray-400 dark:border-gray-700"></div>

            <p className="text-lg mb-4 mt-10">
              &quot;We have seen drastic efficiency improvements since we started using VOYO for user management. 
              It&apos;s incredibly powerful, but also simple to use.&quot;
            </p>
            <div className="flex gap-4 items-center mt-18">
              <Image
                src="/account_circle.svg"
                alt="account icon"
                width={35}
                height={35}
              />
              <div>
                <p>Name</p>
                <p className="text-sm">Position</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-red-500 dark:from-blue-500 dark:to-violet-900 px-4 py-2 rounded font-bold transition mt-17 text-white hover:opacity-90 cursor-pointer">
              Read Case Study
            </button>
          </div>

          {/* Card 2 */}
          <div className="bg-gradient-to-b from-[#ffffff] to-yellow-300 dark:from-[#16162c] dark:to-blue-950 rounded-lg p-6 text-black dark:text-white">
            <h3 className="mb-1 text-[20px] dark:text-purple-200">
              How StepStone finishes <span className="font-bold text-amber-500 dark:text-white">2 weeks’ work in <br /> only 2 hours</span> with VOYO workflows
            </h3>

            <div className="border-b mt-12 border-gray-400 dark:border-gray-700"></div>

            <p className="text-lg mb-4 mt-10">
              “We’ve sped up our integration of marketplace data sources by 25X. 
              It takes me 2 hours max to connect up APIs and transform the data we need. 
              You can’t do this that fast in code.”
            </p>
            <div className="flex gap-4 items-center mt-11">
              <Image
                src="/account_circle.svg"
                alt="account icon"
                width={35}
                height={35}
              />
              <div>
                <p>Name</p>
                <p className="text-sm">Position</p>
              </div>
            </div>
            <button className="bg-gradient-to-r from-amber-500 to-red-500 dark:from-blue-500 dark:to-violet-900 px-4 py-2 rounded font-bold transition mt-17 text-white hover:opacity-90 cursor-pointer">
              Read Case Study
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
