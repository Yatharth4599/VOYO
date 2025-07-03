// import React from 'react';
// import Image from 'next/image';

// const customerLogos = [
//   '/public/splunk.png',
//   '/public/twilio.png',
//   '/public/zendesk.png',
//   '/public/salesforce.png',
//   '/public/slack.png',
//   '/public/vercel.svg',
//   // Add more as needed
// ];

// const integrationIcons = [
//   '/slack.png', '/zendesk.png', '/vercel.svg', '/as-logo.png', '/TigerPay.png', '/whatsapp.png', '/globe.svg', '/window.svg', '/file.svg', '/next.svg',
//   // Add more as needed
// ];

// export default function LandingV2() {
//   return (
//     <div className="min-h-screen bg-gradient-to-b from-[#18111A] via-[#1A1320] to-[#18111A] text-white">
//       {/* Navigation Bar */}
//       <nav className="w-full flex items-center justify-between px-8 py-4 bg-black/80 backdrop-blur-md border-b border-[#2A2233] sticky top-0 z-50">
//         <div className="flex items-center gap-8">
//           <Image src="/logo-voyo-removebg-preview.png" alt="Logo" width={120} height={40} />
//           <ul className="hidden md:flex gap-6 text-sm text-gray-200">
//             <li className="hover:text-white cursor-pointer">Product</li>
//             <li className="hover:text-white cursor-pointer">Use cases</li>
//             <li className="hover:text-white cursor-pointer">Docs</li>
//             <li className="hover:text-white cursor-pointer">Community</li>
//             <li className="hover:text-white cursor-pointer">Enterprise</li>
//             <li className="hover:text-white cursor-pointer">Pricing</li>
//           </ul>
//         </div>
//         <div className="flex items-center gap-4">
//           <button className="text-gray-200 text-xs">Sign in</button>
//           <button className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-xs font-semibold ml-2">Get Started</button>
//         </div>
//       </nav>

//       {/* Hero Section */}
//       <section className="relative flex flex-col md:flex-row items-center justify-between px-8 pt-16 pb-8 max-w-7xl mx-auto">
//         <div className="flex-1 z-10">
//           <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
//             Flexible AI workflow automation <br />
//             <span className="text-orange-400">for technical teams</span>
//           </h1>
//           <p className="text-lg text-gray-200 mb-6 max-w-xl">
//             Build with the precision of code or the speed of drag-n-drop. Host with on-prem control or in-the-cloud convenience. n8n gives you more freedom to implement multi-step AI agents and integrate apps than any other tool.
//           </p>
//           <div className="flex gap-4 mb-8">
//             <button className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded font-semibold text-base shadow">Get started for free</button>
//             <button className="bg-[#23182B] border border-orange-500 text-orange-400 px-6 py-3 rounded font-semibold text-base hover:bg-orange-500 hover:text-white transition">Talk to sales</button>
//           </div>
//           <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-[#23182B] bg-opacity-80 rounded-xl p-4 w-full max-w-2xl mb-8">
//             <div className="text-xs md:text-sm text-left">
//               <span className="font-bold text-white">IT Ops</span> can<br />
//               <span className="text-gray-300">⚡ On-board new employees</span>
//             </div>
//             <div className="text-xs md:text-sm text-left">
//               <span className="font-bold text-white">Sec Ops</span> can<br />
//               <span className="text-gray-300">⚡ Enrich security incident tickets</span>
//             </div>
//             <div className="text-xs md:text-sm text-left">
//               <span className="font-bold text-white">Dev Ops</span> can<br />
//               <span className="text-gray-300">⚡ Convert natural language into API calls</span>
//             </div>
//             <div className="text-xs md:text-sm text-left">
//               <span className="font-bold text-white">Sales</span> can<br />
//               <span className="text-gray-300">⚡ Generate customer insights from reviews</span>
//             </div>
//             <div className="text-xs md:text-sm text-left">
//               <span className="font-bold text-white">You</span> can<br />
//               <span className="text-gray-300">▶️ Watch this video to hear our pitch</span>
//             </div>
//           </div>
//         </div>
//         {/* Lightning Image */}
//         <div className="flex-1 flex justify-center items-center relative mt-8 md:mt-0 md:ml-8">
//           <div className="relative w-[260px] h-[360px] md:w-[320px] md:h-[440px]">
//             <Image src="/file.svg" alt="Lightning" fill className="object-contain drop-shadow-[0_0_40px_rgba(255,140,0,0.5)]" />
//           </div>
//         </div>
//       </section>

//       {/* Workflow Diagram Section */}
//       <section className="flex justify-center items-center py-8 px-4">
//         <div className="bg-[#23182B] border border-[#3A2A4D] rounded-2xl shadow-lg p-4 w-full max-w-4xl">
//           <div className="relative w-full h-[260px] md:h-[320px]">
//             <Image src="/window.svg" alt="Workflow Diagram" fill className="object-contain" />
//           </div>
//         </div>
//       </section>

//       {/* Plug AI Section */}
//       <section className="text-center py-12">
//         <h2 className="text-2xl md:text-3xl font-bold text-gray-200">
//           Plug AI into your own data & <span className="text-orange-400">over 500 integrations</span>
//         </h2>
//       </section>

//       {/* Integrations Icon Row */}
//       <section className="w-full overflow-x-auto py-6 bg-gradient-to-r from-[#1A1320] to-[#23182B] flex items-center justify-center">
//         <div className="flex gap-6 min-w-max px-8">
//           {integrationIcons.map((icon, idx) => (
//             <div key={idx} className="bg-[#23182B] rounded-xl p-2 shadow-md flex items-center justify-center">
//               <Image src={icon} alt="Integration Icon" width={36} height={36} />
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Fast AI Section */}
//       <section className="text-center py-16 px-4">
//         <h2 className="text-2xl md:text-3xl font-bold mb-2">
//           The fast way to actually <span className="text-orange-400">get AI working in your business</span>
//         </h2>
//       </section>

//       {/* Feature Cards Section */}
//       <section className="flex flex-col md:flex-row gap-8 justify-center items-stretch px-4 max-w-5xl mx-auto mb-16">
//         <div className="flex-1 bg-[#23182B] rounded-2xl p-8 shadow-lg flex flex-col justify-between mb-4 md:mb-0">
//           <h3 className="text-lg font-bold mb-2">Build multi-step agents calling custom tools</h3>
//           <p className="text-gray-300 mb-4">Create agentic systems on a single screen. Integrate any LLM into your workflows as fast as you can drag-n-drop.</p>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold text-sm self-start">Explore AI →</button>
//         </div>
//         <div className="flex-1 bg-[#23182B] rounded-2xl p-8 shadow-lg flex flex-col justify-between mb-4 md:mb-0">
//           <h3 className="text-lg font-bold mb-2">Chat with your own data</h3>
//           <p className="text-gray-300 mb-4">Use Slack, Teams, SMS, voice, or our embedded chat interface to get accurate answers from your data, create tasks, and complete workflows.</p>
//         </div>
//         <div className="flex-1 bg-[#23182B] rounded-2xl p-8 shadow-lg flex flex-col justify-between">
//           <h3 className="text-lg font-bold mb-2">Self-host everything – including AI models</h3>
//           <p className="text-gray-300 mb-4">Protect your data by deploying on-prem. Deploy with Docker, access the entire source code on Github, or use the hosted version.</p>
//         </div>
//       </section>

//       {/* Run. Tweak. Repeat. Section */}
//       <section className="bg-[#18111A] py-16 px-4 flex flex-col md:flex-row gap-8 justify-center items-center max-w-5xl mx-auto rounded-2xl mb-16 border border-[#2A2233]">
//         <div className="flex-1">
//           <h2 className="text-2xl md:text-3xl font-bold mb-4">Run. Tweak. <span className="text-gray-400">Repeat</span></h2>
//           <ul className="text-gray-300 mb-6 list-disc list-inside space-y-1">
//             <li>Re-run single steps without re-running the whole workflow</li>
//             <li>Replay or mock data to avoid waiting for external systems</li>
//             <li>Debug fast, with logs in line with your code</li>
//             <li>Use 1700+ templates to jump-start your project</li>
//           </ul>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold text-sm">See full product overview</button>
//         </div>
//         <div className="flex-1 flex justify-center items-center">
//           <div className="relative w-[120px] h-[120px] bg-[#23182B] rounded-full flex items-center justify-center shadow-lg">
//             <Image src="/globe.svg" alt="Repeat Icon" width={60} height={60} />
//           </div>
//         </div>
//       </section>

//       {/* Case Studies Section */}
//       <section className="py-16 px-4 max-w-5xl mx-auto">
//         <h2 className="text-center text-3xl font-bold mb-10">Case Studies</h2>
//         <div className="grid md:grid-cols-2 gap-8">
//           <div className="bg-[#23182B] rounded-2xl p-8 shadow-lg flex flex-col justify-between">
//             <h3 className="text-lg font-bold mb-2">How Delivery Hero saved <span className='text-white'>200 hours each month</span> with a single ITOps workflow</h3>
//             <p className="text-gray-300 mb-4">"We have seen drastic efficiency improvements since we started using n8n for user management. It's incredibly powerful, but also simple to use."</p>
//             <div className="flex items-center gap-3 mt-auto">
//               <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">DZ</div>
//               <div>
//                 <div className="font-semibold">Dennis Zahrt</div>
//                 <div className="text-sm text-gray-400">Director of Global IT Service Delivery</div>
//               </div>
//             </div>
//             <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold text-sm mt-4 self-start">Read Case Study</button>
//           </div>
//           <div className="bg-[#23182B] rounded-2xl p-8 shadow-lg flex flex-col justify-between">
//             <h3 className="text-lg font-bold mb-2">How StepStone finishes <span className='text-white'>2 weeks' work in only 2 hours</span> with n8n workflows</h3>
//             <p className="text-gray-300 mb-4">"We've sped up our integration of marketplace data sources by 25X. It takes me 2 hours max to connect up APIs and transform the data we need. You can't do this that fast in code."</p>
//             <div className="flex items-center gap-3 mt-auto">
//               <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">LP</div>
//               <div>
//                 <div className="font-semibold">Luka Pilic</div>
//                 <div className="text-sm text-gray-400">Marketplace Tech Lead</div>
//               </div>
//             </div>
//             <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold text-sm mt-4 self-start">Read Case Study</button>
//           </div>
//         </div>
//       </section>

//       {/* Secure. Reliable. Collaborative. Section */}
//       <section className="py-16 px-4 max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
//         <div className="flex-1">
//           <span className="inline-block bg-purple-900 text-purple-300 text-xs px-3 py-1 rounded-full mb-4">Enterprise-ready</span>
//           <h2 className="text-3xl font-bold mb-4">Secure. Reliable. Collaborative.</h2>
//           <p className="text-gray-300 mb-6">Remove inefficiencies across your org by rolling out automation as reliably as you deploy code. Run n8n air-gapped on your servers or on our secure cloud-based solution.</p>
//           <div className="flex gap-4">
//             <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold text-sm">Explore n8n for enterprise</button>
//             <button className="bg-[#23182B] border border-purple-600 text-purple-400 px-4 py-2 rounded font-semibold text-sm hover:bg-purple-600 hover:text-white transition">Talk to sales</button>
//           </div>
//         </div>
//         <div className="flex-1 flex justify-center items-center">
//           <div className="relative w-[260px] h-[180px] bg-[#23182B] rounded-2xl flex items-center justify-center shadow-lg">
//             <Image src="/window.svg" alt="Secure Visual" fill className="object-contain" />
//           </div>
//         </div>
//       </section>

//       {/* Automation for your customers Section */}
//       <section className="py-16 px-4 max-w-5xl mx-auto">
//         <div className="bg-[#23182B] rounded-2xl shadow-lg p-8 flex flex-col items-center">
//           <div className="relative w-full h-[180px] mb-8 flex items-center justify-center">
//             <Image src="/file.svg" alt="Automation Visual" width={320} height={180} className="object-contain mx-auto" />
//           </div>
//           <span className="inline-block bg-orange-600 text-white text-xs px-3 py-1 rounded-full mb-4">n8n embed</span>
//           <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Automation for your customers</h2>
//           <p className="text-gray-300 mb-6 text-center max-w-2xl mx-auto">Wow your customers with access to 500+ app integrations to automate their own workflows. Your branding. Our white-labelled tech.</p>
//           <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded font-semibold text-sm">Explore n8n embed</button>
//         </div>
//       </section>

//       {/* Final Call to Action Section */}
//       <section className="py-16 px-4 text-center">
//         <h2 className="text-3xl font-bold mb-6">There's nothing you can't automate with n8n.</h2>
//         <p className="mb-8 max-w-xl mx-auto text-gray-300">Our customer's words, not ours. Skeptical? Try it out, and see for yourself.</p>
//         <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold text-lg">Start building</button>
//       </section>

//       {/* Testimonials Carousel/Row */}
//       <section className="py-12 px-4 bg-gradient-to-b from-[#23182B] to-[#18111A]">
//         <div className="max-w-5xl mx-auto flex flex-col md:flex-row gap-6 overflow-x-auto">
//           <div className="bg-[#18111A] rounded-2xl p-6 min-w-[320px] shadow-lg">
//             <p className="text-gray-200 mb-4">Thank you to the n8n community. I did the beginners course and promptly took an automation WAY beyond my skill level.</p>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">RT</div>
//               <div>
//                 <div className="font-semibold">Robin Tindall</div>
//                 <div className="text-sm text-gray-400">@robm</div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#18111A] rounded-2xl p-6 min-w-[320px] shadow-lg">
//             <p className="text-gray-200 mb-4">n8n is a beast for automation. self-hosting and low-code make it a dev's dream. if you're not automating yet, you're working too hard.</p>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">A</div>
//               <div>
//                 <div className="font-semibold">Anderoov</div>
//                 <div className="text-sm text-gray-400">@Anderoov</div>
//               </div>
//             </div>
//           </div>
//           <div className="bg-[#18111A] rounded-2xl p-6 min-w-[320px] shadow-lg">
//             <p className="text-gray-200 mb-4">I've said it many times. But I'll say it again. n8n is the GOAT. Anything is possible with n8n. You just need some technical knowledge + imagination.</p>
//             <div className="flex items-center gap-3">
//               <div className="w-10 h-10 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">MP</div>
//               <div>
//                 <div className="font-semibold">Maxim Poulsen</div>
//                 <div className="text-sm text-gray-400">@maximpoulsen</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Footer */}
//       <footer className="bg-[#18111A] border-t border-[#2A2233] py-12 px-4 text-gray-400 text-sm mt-8">
//         <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8 mb-8">
//           <div>
//             <Image src="/logo-voyo-removebg-preview.png" alt="Logo" width={120} height={40} />
//             <div className="flex gap-3 mt-4">
//               <span className="text-xl">🌐</span>
//               <span className="text-xl">🐦</span>
//               <span className="text-xl">💼</span>
//               <span className="text-xl">📘</span>
//             </div>
//           </div>
//           <div>
//             <div className="font-bold text-white mb-2">Popular integrations</div>
//             <ul className="space-y-1">
//               <li>Google Sheets</li>
//               <li>Telegram</li>
//               <li>MySQL</li>
//               <li>Slack</li>
//               <li>Discord</li>
//               <li>Postgres</li>
//               <li>Show more</li>
//             </ul>
//           </div>
//           <div>
//             <div className="font-bold text-white mb-2">Trending combinations</div>
//             <ul className="space-y-1">
//               <li>HubSpot and Salesforce</li>
//               <li>Trello and WhatsApp</li>
//               <li>GitHub and Jira</li>
//               <li>Asana and Slack</li>
//               <li>Jira and Salesforce</li>
//               <li>Show more</li>
//             </ul>
//           </div>
//           <div>
//             <div className="font-bold text-white mb-2">Top integration categories</div>
//             <ul className="space-y-1">
//               <li>Communication</li>
//               <li>Development</li>
//               <li>Cybersecurity</li>
//               <li>AI</li>
//               <li>Data & Storage</li>
//               <li>Show more</li>
//             </ul>
//           </div>
//           <div>
//             <div className="font-bold text-white mb-2">Top guides</div>
//             <ul className="space-y-1">
//               <li>Telegram bots</li>
//               <li>Open-source chatbot</li>
//               <li>Open-source LLM</li>
//               <li>Open-source low-code platforms</li>
//               <li>Zapier alternatives</li>
//               <li>Show more</li>
//             </ul>
//           </div>
//         </div>
//         <div className="flex flex-col md:flex-row justify-between items-center border-t border-[#2A2233] pt-6">
//           <div className="mb-2 md:mb-0">© 2025 n8n | All rights reserved.</div>
//           <div className="flex gap-4">
//             <span>Impressum</span>
//             <span>|</span>
//             <span>Legal</span>
//             <span>|</span>
//             <span>Privacy</span>
//             <span>|</span>
//             <span>Report a vulnerability</span>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// } 


// pages/index.tsx



// import Navbar from "@/components/landingV2/Navbar"
// import Hero from "@/components/landingV2/Hero"
// import Features from "@/components/landingV2/Features"
// import CaseStudies from "@/components/landingV2/CaseStudies"
// import Performance from "@/components/landingV2/Performance"
// import Working from "@/components/landingV2/Working"
// // import Reviews from "@/components/landingV2/Reviews"
// import Footer from "@/components/landingV2/Footer"

// export default function home() {
//   return (
//     <div>
//       <Navbar />
//       <Hero />
//       <Working />
//       <Features />
//       <CaseStudies />
//       <Performance />
//       <Footer />
//     </div>
//   )
// }



import { ThemeProvider } from 'next-themes'
import Navbar from "@/components/landingV2/Navbar"
import Hero from "@/components/landingV2/Hero"
import Features from "@/components/landingV2/Features"
import CaseStudies from "@/components/landingV2/CaseStudies"
import Performance from "@/components/landingV2/Performance"
import Working from "@/components/landingV2/Working"
import Footer from "@/components/landingV2/Footer"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div>
        <Navbar />
        <Hero />
        <Working />
        <Features />
        <CaseStudies />
        <Performance />
        <Footer />
      </div>
    </ThemeProvider>
  )
}
