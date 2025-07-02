'use client'

import Image from 'next/image'

export default function Reviews() {
  return (
    <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="border border-gray-800 p-10 rounded-xl bg-black/30 backdrop-blur">
          <div className="flex justify-center">
          <div className="mt-7 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 p-[1px] rounded-2xl w-fit shadow-lg">
            <div className="bg-[#16162c] w-[200px] flex justify-center border border-gray-800 rounded-2xl text-white py-2">
              n8n embed
            </div>
          </div>
        </div>
          <div className="flex justify-center text-[50px] font-bold">Automation for <br /> your customers</div>
          <p className="mt-6 flex justify-center text-center">
            Wow your customers with access to 500+ app integrations to automate their own <br /> workflows. 
            Your branding. Our white-labelled tech.
          </p>
          <button className="bg-gradient-to-r from-blue-500 to-violet-900 px-4 py-2 rounded font-bold transition mt-10 mx-auto block">
            Explore n8n embed
          </button>
        </div>

        <div className="mt-20"></div>

        <div className="border border-gray-800 p-10 rounded-xl bg-black/30 backdrop-blur">
          <div className="flex justify-center text-[50px] font-bold text-center">There’s nothing you <br /> can’t automate with n8n.</div>
          <p className="mt-6 flex justify-center text-center">
            Our customer’s words, not ours. <br />
            Skeptical? Try it out, and see for yourself.
          </p>
          <button className="bg-gradient-to-r from-orange-500 to-red-500 px-4 py-2 rounded font-bold transition mt-10 mx-auto block">
            Start Building
          </button>
        </div>
      </div>

      <div className="overflow-hidden mt-20 relative">
        {/* Marquee Container */}
        <div className="animate-marquee flex whitespace-nowrap hover:[animation-play-state:paused] gap-8 px-6">
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              className="h-[350px] max-w-fit border border-white rounded-2xl p-6 bg-black/30 text-white"
            >
              <p className="text-lg leading-relaxed mb-6">
                <span className="font-bold">Lorem ipsum dolor sit</span> amet consectetur, adipisicing elit. <br />
                Fuga non consectetur sunt illum iste ipsa odio enim, quidem minus porro amet. <br />
                Sit doloribus velit eveniet, accusamus repellat placeat accusantium asperiores.
              </p>
              <div className="flex items-center gap-4 mt-auto">
                <Image
                  src="/account_circle.svg"
                  alt="account icon"
                  width={35}
                  height={35}
                />
                <div>
                  <p className="font-semibold">Name</p>
                  <p className="text-sm text-gray-300">@Account</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Inline style for marquee animation */}
        <style jsx>{`
          @keyframes marquee {
            0% {
              transform: translateX(100%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
          .animate-marquee {
            animation: marquee 40s linear infinite;
          }
        `}</style>
      </div>
  
    </section>

    
  )
}


