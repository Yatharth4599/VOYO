'use client'

import Image from 'next/image'

export default function Features() {
  const Toplogos = [
    { src: "/discord.png", alt: "Discord Logo" },
    { src: "/excel.png", alt: "Excel Logo" },
    { src: "/calendar.png", alt: "Google Calendar Logo" },
    { src: "/mysql.png", alt: "MySQL Logo" },
    { src: "/openai.png", alt: "OpenAI Logo" },
    { src: "/outlook.png", alt: "Outlook Logo" },
    { src: "/slack.png", alt: "Slack Logo" },
  ];

  const Bottomlogos = [
    { src: "/airtable.png", alt: "Airtable Logo" },
    { src: "/google-cloud.png", alt: "Cloud Logo" },
    { src: "/huggingface.jpg", alt: "HuggingFace Logo" },
    { src: "/MC.png", alt: "MC Logo" },
    { src: "/Notion.png", alt: "Notion Logo" },
    { src: "/Postgresql.png", alt: "PostgreSQL Logo" },
    { src: "/postmark.png", alt: "Postmark Logo" },
    { src: "/teams.png", alt: "Teams Logo" },
  ];


  return (
    <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white py-20 overflow-hidden">
      <div className="text-center text-4xl md:text-5xl font-bold mb-16">
        Plug AI into your own data &<br />
        <span className="text-orange-400">over 500 integrations</span>
      </div>

      <div className="relative overflow-hidden max-w-4xl mx-auto">
        {/* Black shadows on the sides, inside the narrower container */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        {/* Top Marquee */}
      <div className="relative overflow-hidden max-w-4xl mx-auto mb-24"> {/* Increased mb-24 for more gap */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div className="flex whitespace-nowrap animate-scroll-left gap-8">
          {[...Toplogos, ...Toplogos].map((logo, index) => (
            <div key={`top-${index}`} className="bg-white p-4 rounded-xl w-28 h-28 flex items-center justify-center shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Marquee */}
      <div className="relative overflow-hidden max-w-4xl mx-auto">
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none"></div>

        <div className="flex whitespace-nowrap animate-scroll-right gap-8">
          {[...Bottomlogos, ...Bottomlogos].map((logo, index) => (
            <div key={`bottom-${index}`} className="bg-white p-4 rounded-xl w-28 h-28 flex items-center justify-center shrink-0">
              <Image
                src={logo.src}
                alt={logo.alt}
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      </div>

      <style jsx>{`
        @keyframes scroll-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes scroll-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        .animate-scroll-left {
          animation: scroll-left 20s linear infinite;
        }
        .animate-scroll-right {
          animation: scroll-right 20s linear infinite;
        }
      `}</style>
      
      <div className="flex justify-center">
        <button className="mt-10 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded font-bold cursor-pointer">
          Browse all integrations
      </button>
      </div>

      <section className="text-center py-12">
        <h1 className="text-3xl font-bold">
          The fast way to actually{' '}
          <span className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
            get AI working in your business
          </span>
        </h1>
      </section>

      {/* Features */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto px-6 py-12">
        <div className="bg-[#16162c] rounded-lg p-6 row-span-13 col-span-2">
          <h2 className="font-bold mb-2">Build multi-step agents calling custom tools</h2>
          <p className="text-sm mb-4">Create agentic systems on a single screen. Integrate any LLM into your workflows as fast as you can drag-n-drop.</p>
          <button className="px-4 py-2 bg-purple-700 rounded font-bold hover:bg-purple-800 transition">
            Explore AI
          </button>
        </div>




        <div className="bg-[#16162c] rounded-lg p-6 row-span-26 ">
          <h2 className="font-bold mb-2">Chat with your own data</h2>
          <p className="text-sm">Use Slack, Teams, SMS, voice, or our embedded chat interface to get accurate answers from your data, create tasks, and complete workflows.</p>


          <div className="mt-10    text-sm border border-gray-100 rounded-2xl w-50 p-2">Who held meetings with SpaceX last week?</div>
          <div className="mt-5 text-sm border border-gray-100 rounded-2xl w-50 p-2 float-right">On Wednesday, Joe updated the status to "won" in Salesforce after a Zoom call.</div>
          <div className="mt-5 text-sm border border-gray-100 rounded-2xl w-50 p-2 float-right">On Thursday, Sue provided on-site setup and closed the ServiceNow ticket.</div>
          <div className="mt-5 text-sm border border-gray-100 rounded-2xl w-50 p-2 float-left">Create a task in Asana...</div>
        </div>




        <div className="bg-[#16162c] rounded-lg p-6 row-span-13 col-span-2">
          <h2 className="font-bold mb-2">Self-host everything – including AI models</h2>
          <p className="text-sm mb-4">Protect your data by deploying on-prem.</p>
          <ul>
            <li>Deploy with Docker</li>
            <li>Access the entire source code on Github</li>
            <li>Hosted version also available</li>
          </ul>
        </div>
      </section>


      {/* Case Studies */}
      <section className="py-12 px-6 max-w-6xl mx-auto">
        <h2 className="text-center font-bold text-2xl mb-6">Case Studies</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-[#16162c] rounded-lg p-6">
            <h3 className="font-bold mb-1">How Delivery Hero saved 200 hours each month</h3>
            <p className="text-sm mb-4">“We have seen drastic efficiency improvements...”</p>
            <button className="px-4 py-2 bg-blue-700 rounded font-bold hover:bg-blue-800 transition">
              Read Case Study
            </button>
          </div>
          <div className="bg-[#16162c] rounded-lg p-6">
            <h3 className="font-bold mb-1">How StepStone finishes 2 weeks’ work in 2 hours</h3>
            <p className="text-sm mb-4">“We sped up our integration of marketplace data sources...”</p>
            <button className="px-4 py-2 bg-blue-700 rounded font-bold hover:bg-blue-800 transition">
              Read Case Study
            </button>
          </div>
        </div>
      </section>
      
    </section>
  );
}
