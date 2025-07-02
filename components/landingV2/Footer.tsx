'use client'

import Image from 'next/image'

export default function Footer() {
  return (
    <section className="bg-black text-white py-20 overflow-hidden border-t">
      <div className="max-w-7xl mx-auto px-4">
        {/* First Section */}
        <div className="flex flex-row items-stretch justify-between gap-12 border-b border-gray-800 p-8">
          {/* Logo and tagline */}
          <div className="flex flex-col justify-between">
            <Image
              src="/Voyo Black Logo.png"
              alt="voyo"
              width={100}
              height={100}
              className="object-contain h-full"
            />
            <p className="mt-4">Automate without limits</p>
          </div>

          {/* Links Section */}
          <div className="flex flex-1 justify-evenly items-stretch">
            <ul className="list-none flex flex-col justify-between">
              <li className="text-purple-200 hover:text-white cursor-pointer">Careers</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Contact</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Merch</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Press</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Security</li>
            </ul>

            <ul className="list-none flex flex-col justify-between">
              <li className="text-purple-200 hover:text-white cursor-pointer">Case Studies</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Zapier vs n8n</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Make vs n8n</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Tools</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">AI agent report</li>
            </ul>

            <ul className="list-none flex flex-col justify-between">
              <li className="text-purple-200 hover:text-white cursor-pointer">Affiliate Program</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Expert partners</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Join user tests, get a gift</li>
              <li className="text-purple-200 hover:text-white cursor-pointer">Events</li>
            </ul>
          </div>
        </div>
        {/* Second Section */}
        <div className="flex flex-row items-stretch justify-between gap-12 border-b border-gray-800 p-8">

          <div className="list-none">
            <h1 className="font-bold mb-5">Popular integrations</h1>
            <li className="text-gray-400 hover:text-white cursor-pointer">Google Sheets</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Telegram</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">MySQL</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Slack</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Discord</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Postgres</li>
          </div>

          <div className="list-none">
            <h1 className="font-bold mb-5">Trending combinations</h1>
            <li className="text-gray-400 hover:text-white cursor-pointer">HubSpot and Salesforce </li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Twilio and WhatsApp</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">GitHub and Jira</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Asana and Slack</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Asana and Salesforce</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Jira and Slack</li>
          </div>

          <div className="list-none">
            <h1 className="font-bold mb-5">Top integration categories</h1>
            <li className="text-gray-400 hover:text-white cursor-pointer">Communication</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Development</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Cybersecurity</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">AI</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Data & Storage</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Marketing</li>
          </div>


          <div className="list-none">
            <h1 className="font-bold mb-5">Trending <br /> templates</h1>
            <li className="text-gray-400 hover:text-white cursor-pointer">Creating an API endpoint</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">AI agent chat</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Scrape and summarize webpages with AI</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Joining different datasets</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Back Up Your n8n Workflows To Github</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Very quick quickstart</li>
          </div>

          <div className="list-none">
            <h1 className="font-bold mb-5">Top <br /> guides</h1>
            <li className="text-gray-400 hover:text-white cursor-pointer">Telegram bots</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Open-source chatbot</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Open-source LLM</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Open-source low-code platforms</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Zapier alternatives</li>
            <li className="text-gray-400 hover:text-white cursor-pointer">Make vs Zapier</li>
          </div>

        </div>
        {/* Third Section */}
        <div className="mt-8 flex justify-between">
          <div>
            Impressum | Legal | Privacy | Report a vulnerability
          </div>

          <div>
            &copy; 2025 VOYO | All rights reserved. 
          </div>
        </div>
      </div>
    </section>
  )
}
