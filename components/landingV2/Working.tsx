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

export default function Working() {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

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
            {[1, 2, 3].map((num) => (
              <div key={num} className="border border-gray-300 dark:border-gray-700 p-5 w-[250px] flex flex-col items-center rounded-md shadow-md bg-gradient-to-b from-transparent to-orange-100 dark:to-violet-950 rounded-lg p-6">
                <div className="bg-gray-200 dark:bg-white h-[80px] w-[80px] flex items-center justify-center rounded-full overflow-hidden">
                  {/* Example: <Image src={`/agent${num}.png`} alt={`Agent ${num}`} fill className="object-cover"/> */}
                </div>
                <p className="text-center font-semibold mt-2">Agent Name {num}</p>
                <p className="text-center text-sm mt-1">Lorem ipsum dolor sit amet...</p>
                <p className="text-center text-sm mt-1">Praesentium laborum dignissimos...</p>
                <p className="text-center text-sm mt-1">Aliquid quidem, placeat nihil...</p>
                <div className="flex items-center justify-center mt-3 text-yellow-400 text-lg">
                  <span>★</span><span>★</span><span>★</span><span>★</span><span className="text-gray-400">★</span>
                </div>
                <button className="bg-orange-300 dark:bg-purple-600 border border-gray-300 dark:border-gray-800 py-1 px-4 mt-4 hover:bg-orange-500 dark:hover:bg-gray-800 hover:text-black dark:hover:text-white transition cursor-pointer">
                  Deploy
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
