'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white pt-30 pb-32 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-16 flex flex-col lg:flex-row items-center justify-between">
        {/* Left: Text + CTAs */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
            AI <span className="text-highlight font-medium">Agents</span> that work
          </h1>
          <p className="text-lg text-purple-300 mb-8 max-w-xl mx-auto lg:mx-0">
            Transform your business with intelligent AI agents that handle complex queries, 
                boost efficiency, and deliver precision at scale.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
              Get started for free
            </button>
            <button className="border border-gray-400 text-gray-300 font-semibold px-6 py-3 rounded hover:bg-gray-800 transition">
              Talk to sales
            </button>
          </div>
        </div>

        {/* Right: Lightning Bolt */}
        <div className="flex-1 mt-12 lg:mt-0 lg:ml-8 flex justify-center">
          <Image
            src="/assets/lightning.png"  // Replace with your own lightning image
            alt="Lightning"
            width={300}
            height={300}
            className="object-contain"
          />
        </div>
      </div>

      {/* Bottom: Tabs + Diagram */}
      <div className="relative z-10 max-w-5xl mx-auto mt-16 bg-[#1B142F] border border-gray-600 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center mb-6">
          <div className="bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-[#3C2D6D] transition cursor-pointer">
            IT Ops can<br /><span className="font-medium text-white">On-board new employees</span>
          </div>
          <div className="bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-[#3C2D6D] transition cursor-pointer">
            Sec Ops can<br /><span className="font-medium text-white">Enrich security tickets</span>
          </div>
          <div className="bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-[#3C2D6D] transition cursor-pointer">
            Dev Ops can<br /><span className="font-medium text-white">Convert natural language</span>
          </div>
          <div className="bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-[#3C2D6D] transition cursor-pointer">
            Sales can<br /><span className="font-medium text-white">Generate insights</span>
          </div>
          <div className="bg-[#2A1E4D] rounded-lg py-4 px-2 text-sm hover:bg-[#3C2D6D] transition cursor-pointer">
            You can<br /><span className="font-medium text-white">Watch this video</span>
          </div>
        </div>

        <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-gray-700">
          <Image
            src="/assets/workflow-diagram.png"  // Replace with your own diagram
            alt="Workflow Diagram"
            fill
            className="object-cover"
          />
        </div>
      </div>

      <div className="text-center text-gray-400 text-lg mt-12">
        The world's most popular workflow automation platform for technical teams including
        <div className="flex justify-center gap-25 mt-3">
          <div className="text-3xl">Pearson</div>
          <div className="text-3xl">Unlabel</div>
          <div className="text-3xl">Cisco</div>
          <div className="text-3xl">Paddle</div>
        </div>
      </div>

      <div className="flex justify-evenly mx-6 my-12 gap-4">
        <div className="bg-gradient-to-r from-black to-rose-950 text-white text-lg px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
          <span className="font-bold">Top 150 Github.</span> Our 113.4k stars place us among the most popular projects.
        </div>
        <div className="bg-gradient-to-r from-rose-950 to-purple-950 text-white text-lg px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
          <span className="font-bold">4.9/5 stars on G2.</span> To quote "A solid automation tool that just works."
        </div>
        <div className="bg-gradient-to-r from-purple-950 to-black text-white text-lg px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
          <span className="font-bold">200k+ community members.</span> This wouldn't be possible without you.
        </div>
      </div>

    </section>
  )
}
