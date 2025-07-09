// 'use client'

// import Image from 'next/image'
// import { useState, useEffect } from 'react';
// import SpotlightCard from './SpotlightCard';
// import DecryptedText from './DecryptedText';
// import { useTheme } from 'next-themes'

// export default function CaseStudies() {
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => setMounted(true), []);
//   const { resolvedTheme } = useTheme()

// if (!mounted) return null; // prevents render mismatch

//   return (
//     <section className="relative bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white py-20 overflow-hidden">
//       <div className="mt-10">
//         <DecryptedText
//           text="Case Studies"
//           animateOn="view"
//           revealDirection="center"
//           parentClassName="relative mx-auto px-10 bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[50px] mt-15 font-bold mb-6"
//         />
//       </div>

//       <div className="w-full flex justify-center">
//         <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
//           {/* Card 1 */}
//           <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 132, 0, 0.66)">
//             <div className="bg-gradient-to-b from-[#ffffff] to-orange-500 dark:from-[#16162c] dark:to-pink-950 rounded-lg p-6 text-black dark:text-white">
//             <h3 className="mb-1 text-[20px] text-orange-600 dark:text-purple-200">
//               Case Study 1: <span className="text-black dark:text-white">TigerPay (Fintech)</span>
//             </h3>

//             <div className="border-b mt-12 border-gray-400 dark:border-gray-700"></div>

//             <p className="text-lg mb-4 mt-10">
//               {/* &quot;We have seen drastic efficiency improvements since we started using VOYO for user management. 
//               It&apos;s incredibly powerful, but also simple to use.&quot; */}
//               <p className="text-orange-600 dark:text-purple-200">Challenge:</p>
//               TigerPay was scaling fast but struggled with onboarding new merchants and handling support tickets around the clock. <br />
//               <br />
//               <p className="text-orange-600 dark:text-purple-200">Solution:</p>
//               Using VOYO Marketplace, TigerPay deployed a sales onboarding agent and a multilingual support agent—no code, no extra hires. <br />
//               <br />
//               <p className="text-orange-600 dark:text-purple-200">Result:</p>
//               Onboarding time dropped by 60%.
//               Support response time went from hours to seconds.
//               TigerPay’s team now focuses on growth, not repetitive tasks.
//             </p>
//             <div className="flex gap-4 items-center mt-18">
//               <Image
//                 src={`/account-circle-${resolvedTheme === 'dark' ? 'dark' : 'light'}.svg`}
//                 alt='account-circle'
//                 width={40}
//                 height={40}
//                 className="transition duration-300"
//               />
//               <div>
//                 <p>Prabh Singh</p>
//                 <p className="text-sm">CEO</p>
//               </div>
//             </div>
//             <button className="bg-gradient-to-r from-amber-500 to-red-500 dark:from-blue-500 dark:to-violet-900 px-4 py-2 rounded font-bold transition mt-17 text-white hover:opacity-90 cursor-pointer">
//               Read Case Study
//             </button>
//             </div>
//           </SpotlightCard>
          
          

//           {/* Card 2 */}
//           <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 132, 0, 0.66)">
//             <div className="bg-gradient-to-b from-[#ffffff] to-yellow-300 dark:from-[#16162c] dark:to-blue-950 rounded-lg p-6 text-black dark:text-white">
//             <h3 className="mb-1 text-[20px] text-orange-600 dark:text-purple-200">
//               Case Study 2: <span className="text-black dark:text-white">FreshCart (Ecommerce)</span>
//             </h3>

//             <div className="border-b mt-12 border-gray-400 dark:border-gray-700"></div>

//             <p className="text-lg mb-4 mt-10">
//               <p className="text-orange-600 dark:text-purple-200">Challenge:</p>
//               FreshCart’s small team was bogged down with order queries and payment follow-ups during peak sale periods. <br />
//               <br />
//               <p className="text-orange-600 dark:text-purple-200">Solution:</p>
//               FreshCart launched an order tracking agent and a payment reminder agent via VOYO Marketplace—both integrated into their WhatsApp and Shopify. <br />
//               <br />
//               <p className="text-orange-600 dark:text-purple-200">Result:</p>
//               80% fewer missed customer messages.
//               Late payment reminders handled automatically.
//               FreshCart scaled to 3x more orders—without increasing headcount.
//             </p>
//             <div className="flex gap-4 items-center mt-18">
//               <Image
//                 src={`/account-circle-${resolvedTheme === 'dark' ? 'dark' : 'light'}.svg`}
//                 alt='account-circle'
//                 width={40}
//                 height={40}
//                 className="transition duration-300"
//               />
//               <div>
//                 <p>Sarah Mitchell</p>
//                 <p className="text-sm">VP of Operations</p>
//               </div>
//             </div>
//             <button className="bg-gradient-to-r from-amber-500 to-red-500 dark:from-blue-500 dark:to-violet-900 px-4 py-2 rounded font-bold transition mt-17 text-white hover:opacity-90 cursor-pointer">
//               Read Case Study
//             </button>
//           </div>
//           </SpotlightCard>
          
//         </div>
//       </div>
//     </section>
//   )
// }


'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';
import SpotlightCard from './SpotlightCard';
import DecryptedText from './DecryptedText';
import { useTheme } from 'next-themes';
import { motion, Easing } from 'framer-motion';

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1] as Easing, 
    },
  },
};

const containerVariants = {
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function CaseStudies() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const { resolvedTheme } = useTheme();

  if (!mounted) return null; // prevents render mismatch

  return (
    <section className="relative bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white py-20 overflow-hidden">
      <div className="mt-10">
        <DecryptedText
          text="Case Studies"
          animateOn="view"
          revealDirection="center"
          parentClassName="relative mx-auto px-10 bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[50px] mt-15 font-bold mb-6"
        />
      </div>

      <motion.div
        className="w-full flex justify-center"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl w-full">
          {/* Card 1 */}
          <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.03, rotate: -0.2 }} transition={{ type: 'spring', stiffness: 300 }} className="rounded-lg">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 132, 0, 0.66)">
              <div className="bg-gradient-to-b from-[#ffffff] to-orange-500 dark:from-[#16162c] dark:to-pink-950 rounded-lg p-6 text-black dark:text-white">
                <h3 className="mb-1 text-[20px] text-orange-600 dark:text-purple-200">
                  Case Study 1: <span className="text-black dark:text-white">TigerPay (Fintech)</span>
                </h3>

                <div className="border-b mt-12 border-gray-400 dark:border-gray-700"></div>

                <p className="text-lg mb-4 mt-10">
                  <p className="text-orange-600 dark:text-purple-200">Challenge:</p>
                  TigerPay was scaling fast but struggled with onboarding new merchants and handling support tickets around the clock. <br />
                  <br />
                  <p className="text-orange-600 dark:text-purple-200">Solution:</p>
                  Using VOYO Marketplace, TigerPay deployed a sales onboarding agent and a multilingual support agent—no code, no extra hires. <br />
                  <br />
                  <p className="text-orange-600 dark:text-purple-200">Result:</p>
                  Onboarding time dropped by 60%.
                  Support response time went from hours to seconds.
                  TigerPay’s team now focuses on growth, not repetitive tasks.
                </p>
                <div className="flex gap-4 items-center mt-18">
                  <Image
                    src={`/account-circle-${resolvedTheme === 'dark' ? 'dark' : 'light'}.svg`}
                    alt='account-circle'
                    width={40}
                    height={40}
                    className="transition duration-300"
                  />
                  <div>
                    <p>Prabh Singh</p>
                    <p className="text-sm">CEO</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="bg-gradient-to-r from-amber-500 to-red-500 dark:from-blue-500 dark:to-violet-900 px-4 py-2 rounded font-bold transition mt-17 text-white hover:opacity-90 cursor-pointer"
                >
                  Read Case Study
                </motion.button>
              </div>
            </SpotlightCard>
          </motion.div>

          {/* Card 2 */}
          <motion.div variants={fadeUpVariant} whileHover={{ scale: 1.03, rotate: -0.2 }} transition={{ type: 'spring', stiffness: 300 }} className="rounded-lg">
            <SpotlightCard className="custom-spotlight-card" spotlightColor="rgba(255, 132, 0, 0.66)">
              <div className="bg-gradient-to-b from-[#ffffff] to-yellow-300 dark:from-[#16162c] dark:to-blue-950 rounded-lg p-6 text-black dark:text-white">
                <h3 className="mb-1 text-[20px] text-orange-600 dark:text-purple-200">
                  Case Study 2: <span className="text-black dark:text-white">FreshCart (Ecommerce)</span>
                </h3>

                <div className="border-b mt-12 border-gray-400 dark:border-gray-700"></div>

                <p className="text-lg mb-4 mt-10">
                  <p className="text-orange-600 dark:text-purple-200">Challenge:</p>
                  FreshCart’s small team was bogged down with order queries and payment follow-ups during peak sale periods. <br />
                  <br />
                  <p className="text-orange-600 dark:text-purple-200">Solution:</p>
                  FreshCart launched an order tracking agent and a payment reminder agent via VOYO Marketplace—both integrated into their WhatsApp and Shopify. <br />
                  <br />
                  <p className="text-orange-600 dark:text-purple-200">Result:</p>
                  80% fewer missed customer messages.
                  Late payment reminders handled automatically.
                  FreshCart scaled to 3x more orders—without increasing headcount.
                </p>
                <div className="flex gap-4 items-center mt-18">
                  <Image
                    src={`/account-circle-${resolvedTheme === 'dark' ? 'dark' : 'light'}.svg`}
                    alt='account-circle'
                    width={40}
                    height={40}
                    className="transition duration-300"
                  />
                  <div>
                    <p>Sarah Mitchell</p>
                    <p className="text-sm">VP of Operations</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: 'spring', stiffness: 400 }}
                  className="bg-gradient-to-r from-amber-500 to-red-500 dark:from-blue-500 dark:to-violet-900 px-4 py-2 rounded font-bold transition mt-17 text-white hover:opacity-90 cursor-pointer"
                >
                  Read Case Study
                </motion.button>
              </div>
            </SpotlightCard>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
