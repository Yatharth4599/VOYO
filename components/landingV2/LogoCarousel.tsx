'use client';

import { useEffect, useState } from 'react';

interface AgentLogo {
  "Agent Logo": string;
}

export default function Logo3DRing() {
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
    <div className="py-12 flex justify-center items-center bg-transparent overflow-hidden">
      <div className="ring-container w-[400px] h-[400px] max-w-full">
        <div className="ring">
          {logos.slice(0, 12).map((logo, index) => (
            <img
              key={index}
              src={logo["Agent Logo"]}
              alt={`Logo ${index}`}
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'; // hide broken logos
              }}
              style={{
                transform: `rotateY(${index * (360 / 12)}deg) translateZ(180px)`,
              }}
              className="rounded-full object-contain"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }
        .ring-container {
          perspective: 1200px;
        }
        .ring {
          width: 100%;
          height: 100%;
          position: relative;
          transform-style: preserve-3d;
          animation: spin 20s linear infinite;
        }
        .ring img {
          position: absolute;
          width: 64px;
          height: 64px;
          top: 50%;
          left: 50%;
          transform-origin: center center -180px;
          backface-visibility: hidden; /* ✨ THIS FIXES THE BLACK FLASHES */
        }

      `}</style>
    </div>
  );
}
