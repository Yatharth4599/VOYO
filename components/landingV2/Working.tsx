// 'use client'

// import Image from 'next/image'

// export default function Working() {
//   return (
//     <section className="relative bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white py-20 overflow-hidden">
//       <div>
//         <h1 className="relative mx-auto px-10 bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[50px] mt-15 font-bold mb-6">
//           How It Works
//         </h1>

//         <div className="flex flex-col lg:flex-row justify-evenly">
//           <div className="flex flex-col space-y-6 mb-12 lg:mb-0">
//             {[
//               { icon: "/arrow-top-light.svg", text: "Browse the marketplace" },
//               { icon: "/all-out-light.svg", text: "Test agents in a sandbox" },
//               { icon: "/deployed-code-light.svg", text: "Deploy instantly with no code" },
//             ].map(({ icon, text }, idx) => (
//               <div key={idx} className="flex items-center gap-x-4 w-[200px]">
//                 <div className="border border-gray-300 dark:border-gray-700 h-fit w-fit">
//                   <Image src={icon} alt={text} width={40} height={40} />
//                 </div>
//                 <p className="text-[25px]">{text.split(' ').slice(0, 2).join(' ')}<br />{text.split(' ').slice(2).join(' ')}</p>
//               </div>
//             ))}
//           </div>

//           <div className="flex gap-6 flex-wrap justify-center">
//             {[1, 2, 3].map((num) => (
//               <div key={num} className="border border-gray-300 dark:border-gray-700 p-5 w-[250px] flex flex-col items-center rounded-md shadow-md bg-gradient-to-b from-transparent to-orange-100 dark:to-violet-950 rounded-lg p-6">
//                 <div className="bg-gray-200 dark:bg-white h-[80px] w-[80px] flex items-center justify-center rounded-full overflow-hidden">
//                   {/* <img src={`agent${num}.png`} alt={`Agent ${num}`} className="h-full w-full object-cover" /> */}
//                 </div>
//                 <p className="text-center font-semibold mt-2">Agent Name {num}</p>
//                 <p className="text-center text-sm mt-1">Lorem ipsum dolor sit amet...</p>
//                 <p className="text-center text-sm mt-1">Praesentium laborum dignissimos...</p>
//                 <p className="text-center text-sm mt-1">Aliquid quidem, placeat nihil...</p>
//                 <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
//                   <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-400">★</span>
//                 </div>
//                 <button className="bg-orange-300 border border-gray-300 dark:border-gray-800 py-1 px-4 mt-4 hover:bg-orange-500 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition cursor-pointer">
//                   Deploy
//                 </button>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


'use client'

import Image from 'next/image'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { createApiUrl } from '@/lib/config'

interface Agent {
  "Agent Name": string
  "Agent URL": string
  "Agent Logo": string
  "Description": string
  "Pricing Model": string
  "Category": string
  "Official Website URL": string
}

export default function Working() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [agents, setAgents] = useState<Agent[]>([])

  useEffect(() => {
    setMounted(true)
    fetchAgents()
  }, [])

  const fetchAgents = async () => {
    try {
      const response = await fetch(createApiUrl('/api/agents-directory/category/Customer%20Service'))
      const data = await response.json()
      if (data.success && data.data.length >= 3) {
        // Get first 3 agents from Customer Service category
        setAgents(data.data.slice(0, 3))
      } else if (data.success && data.data.length > 0) {
        // If less than 3 agents, show all available
        setAgents(data.data)
      }
    } catch (error) {
      console.error('Error fetching Customer Service agents:', error)
    }
  }

  if (!mounted) return null

  return (
    <section className="relative bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white py-20 overflow-hidden">
      <div>
        <h1 className="relative mx-auto px-10 bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[50px] mt-15 font-bold mb-6">
          How It Works
        </h1>

        <div className="flex flex-col lg:flex-row justify-evenly">
          <div className="flex flex-col space-y-6 mb-12 lg:mb-0">
            {[
              { icon: "arrow-top", text: "Browse the marketplace" },
              { icon: "all-out", text: "Test agents in a sandbox" },
              { icon: "deployed-code", text: "Deploy instantly with no code" },
            ].map(({ icon, text }, idx) => (
              <div key={idx} className="flex items-center gap-x-4 w-[200px]">
                <div className="border border-gray-300 dark:border-gray-700 h-fit w-fit">
                  <Image
                    src={`/${icon}-${resolvedTheme === 'dark' ? 'dark' : 'light'}.svg`}
                    alt={text}
                    width={40}
                    height={40}
                    className="transition duration-300"
                  />

                </div>
                <p className="text-[25px]">
                  {text.split(' ').slice(0, 2).join(' ')}
                  <br />
                  {text.split(' ').slice(2).join(' ')}
                </p>
              </div>
            ))}
          </div>

          <div className="flex gap-6 flex-wrap justify-center">
            {agents.length > 0 ? (
              agents.map((agent, index) => (
                <div key={index} className="border border-gray-300 dark:border-gray-700 p-5 w-[250px] flex flex-col items-center rounded-md shadow-md bg-gradient-to-b from-transparent to-orange-100 dark:to-violet-950 rounded-lg p-6">
                  <div className="bg-gray-200 dark:bg-gray-500 h-[80px] w-[80px] flex items-center justify-center rounded-full overflow-hidden">
                    {agent['Agent Logo'] ? (
                      <img 
                        src={agent['Agent Logo']} 
                        alt={agent['Agent Name']} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                          e.currentTarget.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">${agent['Agent Name'].substring(0, 2).toUpperCase()}</div>`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500 text-sm font-medium">
                        {agent['Agent Name'].substring(0, 2).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <p className="text-center font-semibold mt-2">{agent['Agent Name']}</p>
                  <p className="text-center text-sm mt-1 line-clamp-3">{agent.Description}</p>
                  <div className="flex items-center justify-center mt-3">
                    <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                      {agent['Pricing Model']}
                    </span>
                  </div>
                  <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-400">★</span>
                  </div>
                  <button 
                    onClick={() => window.open(agent['Official Website URL'], '_blank')}
                    className="bg-orange-300 dark:bg-purple-600 border border-gray-300 dark:border-gray-800 py-1 px-4 mt-4 hover:bg-orange-500 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition cursor-pointer"
                  >
                    Visit Website
                  </button>
                </div>
              ))
            ) : (
              // Loading skeleton
              [1, 2, 3].map((num) => (
                <div key={num} className="border border-gray-300 dark:border-gray-700 p-5 w-[250px] flex flex-col items-center rounded-md shadow-md bg-gradient-to-b from-transparent to-orange-100 dark:to-violet-950 rounded-lg p-6">
                  <div className="bg-gray-200 dark:bg-gray-500 h-[80px] w-[80px] flex items-center justify-center rounded-full overflow-hidden animate-pulse">
                  </div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded mt-2 w-3/4 animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded mt-1 w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded mt-1 w-full animate-pulse"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-500 rounded mt-1 w-2/3 animate-pulse"></div>
                  <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-400">★</span>
                  </div>
                  <div className="h-8 bg-gray-200 dark:bg-gray-500 rounded mt-4 w-20 animate-pulse"></div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
