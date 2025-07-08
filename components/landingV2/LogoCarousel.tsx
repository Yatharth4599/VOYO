'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface AgentLogo {
  "Agent Logo": string;
}

export default function LogoGridStaggeredFade() {
  const [logos, setLogos] = useState<AgentLogo[]>([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const response = await fetch('https://gateway.voyo.club/api/agents-directory/category/Images');
        const data = await response.json();
        if (data.success && Array.isArray(data.data)) {
          setLogos(data.data);
        } else {
          console.error('Logo fetch: API returned unexpected data', data);
        }
      } catch (err) {
        console.error('Logo fetch: error fetching logos', err);
      }
    };

    fetchLogos();
  }, []);

  if (!logos.length) return null;

  return (
    <div className="py-12 bg-transparent">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 place-items-center">
        {logos.map((logo, i) => (
          <div
            key={i}
            className="w-24 h-24 relative animate-fade-loop"
            style={{
              animationDelay: `${i * 0.2}s`, // stagger delay
            }}
          >
            <Image
              src={logo["Agent Logo"]}
              alt={`Logo ${i}`}
              fill
              className="object-contain"
            />
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes fadeLoop {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 1; }
        }
        .animate-fade-loop {
          animation: fadeLoop 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}
