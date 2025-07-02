'use client'

import Image from 'next/image'

export default function Working() {
  return (
    <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white py-20 overflow-hidden">
      <div>
        <h1 className="relative  mx-auto px-10 bg-gradient-to-r from-gray-200 to-violet-800 bg-clip-text text-transparent text-[50px] mt-15 font-bold mb-6">
          How It Works
        </h1>

        <div className="flex justify-evenly">
          <div className="flex flex-col space-y-6">
            <div className="flex items-center gap-x-4 w-[200px]">
              <div className="border border-gray-700 h-fit w-fit">
                <Image 
                  src="/arrow-top.svg" 
                  alt="arrow-top" 
                  width={40} 
                  height={40}
                />
              </div>
              <p className="text-[25px]">Browse the <br /> marketplace</p>
            </div>

            <div className="flex items-center gap-x-4 w-[200px]">
              <div className="border border-gray-700 h-fit w-fit">
                <Image 
                  src="/all-out.svg" 
                  alt="all-out" 
                  width={40} 
                  height={40}
                />
              </div>
              <p className="text-[25px]">Test agents <br /> in a sandbox</p>
            </div>

            <div className="flex items-center gap-x-4 w-[200px]">
              <div className="border border-gray-700 h-fit w-fit">
                <Image 
                  src="/deployed-code.svg" 
                  alt="deployed-code" 
                  width={40} 
                  height={40}
                />
              </div> 
              <p className="text-[25px]">Deploy instantly <br /> with no code</p>
            </div>
          </div>


          <div className="flex gap-6 flex-wrap">
            {/* Agent Card 1  */}
            <div className="border border-gray-700 p-5 w-fit flex flex-col items-center rounded-md shadow-md bg-gradient-to-b from-transparent to-violet-950 rounded-lg p-6">
              <div className="bg-white h-[80px] w-[80px] flex items-center justify-center rounded-full overflow-hidden">
                {/* <img src="agent1.png" alt="Agent 1" className="h-full w-full object-cover" /> */}
              </div>
              <p className="text-center font-semibold mt-2">Agent Name 1</p>
              <p className="text-center text-sm mt-1">Lorem ipsum dolor sit amet...</p>
              <p className="text-center text-sm mt-1">Praesentium laborum dignissimos...</p>
              <p className="text-center text-sm mt-1">Aliquid quidem, placeat nihil...</p>
              <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-400">★</span>
              </div>
              <button className="bg-purple-500 border border-gray-800 py-1 px-4 mt-4 hover:bg-gray-800 hover:text-white transition">
                Deploy
              </button>
            </div>

            {/* Agent Card 2  */}
            <div className="border border-gray-700 p-5 w-fit flex flex-col items-center rounded-md shadow-md bg-gradient-to-b from-transparent to-violet-950 rounded-lg p-6">
              <div className="bg-white h-[80px] w-[80px] flex items-center justify-center rounded-full overflow-hidden">
                {/* <img src="agent2.png" alt="Agent 2" className="h-full w-full object-cover" /> */}
              </div>
              <p className="text-center font-semibold mt-2">Agent Name 2</p>
              <p className="text-center text-sm mt-1">Lorem ipsum dolor sit amet...</p>
              <p className="text-center text-sm mt-1">Praesentium laborum dignissimos...</p>
              <p className="text-center text-sm mt-1">Aliquid quidem, placeat nihil...</p>
              <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-400">★</span>
              </div>
              <button className="bg-purple-500 border border-gray-800 py-1 px-4 mt-4 hover:bg-gray-800 hover:text-white transition">
                Deploy
              </button>
            </div>

            {/* Agent Card 3  */}
            <div className="border border-gray-700 p-5 w-fit flex flex-col items-center rounded-md shadow-md bg-gradient-to-b from-transparent to-violet-950 rounded-lg p-6">
              <div className="bg-white h-[80px] w-[80px] flex items-center justify-center rounded-full overflow-hidden">
                {/* <img src="agent3.png" alt="Agent 3" className="h-full w-full object-cover" /> */}
              </div>
              <p className="text-center font-semibold mt-2">Agent Name 3</p>
              <p className="text-center text-sm mt-1">Lorem ipsum dolor sit amet...</p>
              <p className="text-center text-sm mt-1">Praesentium laborum dignissimos...</p>
              <p className="text-center text-sm mt-1">Aliquid quidem, placeat nihil...</p>
              <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
                <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-400">★</span>
              </div>
              <button className="bg-purple-500 border border-gray-800 py-1 px-4 mt-4 hover:bg-gray-800 hover:text-white transition">
                Deploy
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 