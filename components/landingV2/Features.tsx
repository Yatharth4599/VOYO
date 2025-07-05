'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';


export default function Features() {
  useTheme(); // Keep for hydration
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // Prevent hydration mismatch

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
    { src: "/google-cloud.jpg", alt: "Cloud Logo" },
    { src: "/huggingface.jpg", alt: "HuggingFace Logo" },
    { src: "/MC.png", alt: "MC Logo" },
    { src: "/Notion.png", alt: "Notion Logo" },
    { src: "/Postgresql.png", alt: "PostgreSQL Logo" },
    { src: "/postmark.png", alt: "Postmark Logo" },
    { src: "/teams.png", alt: "Teams Logo" },
  ];

  return (
    <section className="relative bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-black text-black dark:text-white py-20 overflow-hidden">
      <div className="text-center text-4xl md:text-5xl font-bold mb-16">
        Plug AI into your own data &<br />
        <span className="text-orange-400">over 500 integrations</span>
      </div>

      <div className="relative overflow-hidden max-w-4xl mx-auto">
        {/* Shadows */}
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-[#f5f1e8] dark:from-black to-transparent z-10 pointer-events-none"></div>
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-[#f5f1e8] dark:from-black to-transparent z-10 pointer-events-none"></div>

        {/* Top Marquee */}
        <div className="relative overflow-hidden max-w-4xl mx-auto mb-24">
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
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .animate-scroll-left { animation: scroll-left 20s linear infinite; }
        .animate-scroll-right { animation: scroll-right 20s linear infinite; }
      `}</style>

      <div className="flex justify-center">
        <button
          onClick={() => router.push('/agentsV2')}
          className="mt-10 px-4 py-2 bg-gradient-to-r from-yellow-300 to-orange-500 dark:from-purple-600 dark:to-pink-600 rounded font-bold hover:opacity-90 cursor-pointer"
        >
          Browse all integrations
        </button>
      </div>
    </section>
  );
}
