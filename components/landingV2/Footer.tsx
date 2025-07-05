// 'use client'

// import { useState, useEffect } from 'react'
// import { useTheme } from 'next-themes'
// import Image from 'next/image'
// import Logo from '@/components/landingV2/Logo'

// export default function Footer() {
//   const { resolvedTheme } = useTheme()
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => setMounted(true), [])

//   if (!mounted) return null
//   return (
//     <section className="bg-[#f5f1e8] dark:bg-black text-black dark:text-white py-20 overflow-hidden border-t border-gray-300 dark:border-gray-800">
//       <div className="max-w-7xl mx-auto px-4">
//         {/* First Section */}
//         <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 border-b border-gray-300 dark:border-gray-800 p-8">
//           {/* Logo and tagline */}
//           <div className="flex flex-col justify-between">
//             {/* <Image
//               src={`/${resolvedTheme === 'dark' ? 'Voyo Black Logo' : 'logo-voyo-removebg-preview'}.png`}
//               alt="voyo"
//               width={120}
//               height={120}
//               className="object-contain h-full transition duration-300"
//             /> */}

//             <Logo />

//             <p className="mt-4 text-black dark:text-white">Automate without limits</p>
//           </div>

//           {/* Links Section */}
//           <div className="flex flex-1 justify-evenly items-stretch flex-wrap gap-8 md:gap-0">
//             <ul className="list-none flex flex-col justify-between">
//               {["Careers", "Contact", "Merch", "Press", "Security"].map(item => (
//                 <li key={item} className="text-amber-600 dark:text-purple-200 hover:text-black dark:hover:text-white cursor-pointer">{item}</li>
//               ))}
//             </ul>

//             <ul className="list-none flex flex-col justify-between">
//               {["Case Studies", "Zapier vs n8n", "Make vs n8n", "Tools", "AI agent report"].map(item => (
//                 <li key={item} className="text-amber-600 dark:text-purple-200 hover:text-black dark:hover:text-white cursor-pointer">{item}</li>
//               ))}
//             </ul>

//             <ul className="list-none flex flex-col justify-between">
//               {["Affiliate Program", "Expert partners", "Join user tests, get a gift", "Events"].map(item => (
//                 <li key={item} className="text-amber-600 dark:text-purple-200 hover:text-black dark:hover:text-white cursor-pointer">{item}</li>
//               ))}
//             </ul>
//           </div>
//         </div>

//         {/* Second Section */}
//         <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 border-b border-gray-300 dark:border-gray-800 p-8">
//           {[
//             { title: "Popular integrations", items: ["Google Sheets", "Telegram", "MySQL", "Slack", "Discord", "Postgres"] },
//             { title: "Trending combinations", items: ["HubSpot and Salesforce", "Twilio and WhatsApp", "GitHub and Jira", "Asana and Slack", "Asana and Salesforce", "Jira and Slack"] },
//             { title: "Top integration categories", items: ["Communication", "Development", "Cybersecurity", "AI", "Data & Storage", "Marketing"] },
//             { title: "Trending templates", items: ["Creating an API endpoint", "AI agent chat", "Scrape and summarize webpages with AI", "Joining different datasets", "Back Up Your n8n Workflows To Github", "Very quick quickstart"] },
//             { title: "Top guides", items: ["Telegram bots", "Open-source chatbot", "Open-source LLM", "Open-source low-code platforms", "Zapier alternatives", "Make vs Zapier"] },
//           ].map(({ title, items }) => (
//             <div key={title} className="list-none">
//               <h1 className="font-bold mb-5 text-black dark:text-white">{title}</h1>
//               {items.map((item) => (
//                 <li key={item} className="text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white cursor-pointer">{item}</li>
//               ))}
//             </div>
//           ))}
//         </div>

//         {/* Third Section */}
//         <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
//           <div>
//             Impressum | Legal | Privacy | Report a vulnerability
//           </div>

//           <div>
//             &copy; 2025 VOYO | All rights reserved. 
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }


"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import Logo from "@/components/landingV2/Logo";

export default function Footer() {
  useTheme(); // Keep for hydration
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // block SSR/client hydration mismatch

  return (
    <section className="bg-[#f5f1e8] dark:bg-black text-black dark:text-white py-20 overflow-hidden border-t border-gray-300 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* First Section */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 border-b border-gray-300 dark:border-gray-800 p-8">
          {/* Logo and tagline */}
          <div className="flex flex-col justify-between">
            <Logo />
            <p className="mt-4 text-black dark:text-white">Automate without limits</p>
          </div>

          {/* Links Section */}
          <div className="flex flex-1 justify-evenly items-stretch flex-wrap gap-8 md:gap-0">
            <ul className="list-none flex flex-col justify-between">
              {["Careers", "Contact", "Merch", "Press", "Security"].map((item) => (
                <li
                  key={item}
                  className="text-amber-600 dark:text-purple-200 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>

            <ul className="list-none flex flex-col justify-between">
              {["Case Studies", "Zapier vs n8n", "Make vs n8n", "Tools", "AI agent report"].map((item) => (
                <li
                  key={item}
                  className="text-amber-600 dark:text-purple-200 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>

            <ul className="list-none flex flex-col justify-between">
              {["Affiliate Program", "Expert partners", "Join user tests, get a gift", "Events"].map((item) => (
                <li
                  key={item}
                  className="text-amber-600 dark:text-purple-200 hover:text-black dark:hover:text-white cursor-pointer"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>


        {/* Third Section */}
        <div className="mt-8 flex flex-col md:flex-row justify-between gap-4 text-sm text-gray-600 dark:text-gray-400">
          <div>Impressum | Legal | Privacy | Report a vulnerability</div>
          <div>&copy; 2025 VOYO | All rights reserved.</div>
        </div>
      </div>
    </section>
  );
}
