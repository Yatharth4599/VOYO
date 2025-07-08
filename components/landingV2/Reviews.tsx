// 'use client'

// import React, { useRef } from 'react';
// import Image from 'next/image';

// export default function Reviews() {
//   const testimonials = [
//     {
//       quote: "I set up my restaurant's order notifications in 10 minutes—no tech skills needed! Now my staff gets WhatsApp alerts for every new order.",
//       name: "Priya S.",
//       handle: "@priyarestaurant",
//       img: "/account_circle.svg"
//     },
//     {
//       quote: "I run a small online shop and Voyo's workflows helped me send abandoned cart reminders automatically. My sales went up without hiring a developer!",
//       name: "James T.",
//       handle: "@jamesshop",
//       img: "/account_circle.svg"
//     },
//     {
//       quote: "I’m not a techie, but I built a feedback collection system for my yoga studio in minutes. My customers love the follow-up emails!",
//       name: "Anita R.",
//       handle: "@anitayoga",
//       img: "/account_circle.svg"
//     },
//     {
//       quote: "I used to spend hours sending appointment reminders. Now it’s all automated and my clients never miss a session.",
//       name: "Carlos M.",
//       handle: "@carlostherapy",
//       img: "/account_circle.svg"
//     },
//     {
//       quote: "I was worried about setup, but Voyo’s sandbox made it so easy. I just dragged what I needed and it worked!",
//       name: "Fatima L.",
//       handle: "@fatimaboutique",
//       img: "/account_circle.svg"
//     }
//   ];

//   const carouselRef = useRef<HTMLDivElement>(null);

//   const scroll = (direction: 'left' | 'right') => {
//     if (carouselRef.current) {
//       const width = carouselRef.current.offsetWidth;
//       carouselRef.current.scrollBy({
//         left: direction === 'left' ? -width : width,
//         behavior: 'smooth',
//       });
//     }
//   };

//   return (
//     <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white py-20 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-6">
//         <h2 className="text-3xl font-bold text-center mb-12">What our users say</h2>
//         <div className="relative">
//           {/* Navigation arrows (desktop only) */}
//           <button
//             className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 items-center justify-center shadow-lg"
//             onClick={() => scroll('left')}
//             aria-label="Scroll left"
//             style={{ left: '-20px' }}
//           >
//             &#8592;
//           </button>
//           <button
//             className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 items-center justify-center shadow-lg"
//             onClick={() => scroll('right')}
//             aria-label="Scroll right"
//             style={{ right: '-20px' }}
//           >
//             &#8594;
//           </button>
//           <div
//             ref={carouselRef}
//             className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 snap-x snap-mandatory"
//             style={{ scrollSnapType: 'x mandatory' }}
//           >
//             {testimonials.map((t, i) => (
//               <div
//                 key={i}
//                 className="min-w-[320px] max-w-[350px] h-[320px] flex-shrink-0 bg-black/60 border border-white/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl snap-center"
//               >
//                 <p className="text-lg leading-relaxed mb-6 line-clamp-6">
//                   <span className="font-bold">“{t.quote}”</span>
//                 </p>
//                 <div className="flex items-center gap-4 mt-auto">
//                   <Image
//                     src={t.img}
//                     alt="account icon"
//                     width={35}
//                     height={35}
//                   />
//                   <div>
//                     <p className="font-semibold">{t.name}</p>
//                     <p className="text-sm text-gray-300">{t.handle}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .scrollbar-thin::-webkit-scrollbar {
//           height: 8px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-thumb {
//           background: #444;
//           border-radius: 4px;
//         }
//         .scrollbar-thin::-webkit-scrollbar-track {
//           background: #18111A;
//         }
//       `}</style>
//     </section>
//   );
// }


'use client'

import React, { useRef } from 'react';
import Image from 'next/image';
import SpotlightCard from './SpotlightCard';
import DecryptedText from './DecryptedText';

export default function Reviews() {
  const testimonials = [
    {
      quote: "I set up my restaurant's order notifications in 10 minutes—no tech skills needed! Now my staff gets WhatsApp alerts for every new order.",
      name: "Priya S.",
      handle: "@priyarestaurant",
      img: "/account_circle.svg"
    },
    {
      quote: "I run a small online shop and Voyo's workflows helped me send abandoned cart reminders automatically. My sales went up without hiring a developer!",
      name: "James T.",
      handle: "@jamesshop",
      img: "/account_circle.svg"
    },
    {
      quote: "I’m not a techie, but I built a feedback collection system for my yoga studio in minutes. My customers love the follow-up emails!",
      name: "Anita R.",
      handle: "@anitayoga",
      img: "/account_circle.svg"
    },
    {
      quote: "I used to spend hours sending appointment reminders. Now it’s all automated and my clients never miss a session.",
      name: "Carlos M.",
      handle: "@carlostherapy",
      img: "/account_circle.svg"
    },
    {
      quote: "I was worried about setup, but Voyo’s sandbox made it so easy. I just dragged what I needed and it worked!",
      name: "Fatima L.",
      handle: "@fatimaboutique",
      img: "/account_circle.svg"
    }
  ];

  const carouselRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const width = carouselRef.current.offsetWidth;
      carouselRef.current.scrollBy({
        left: direction === 'left' ? -width : width,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-[#120B27] to-black text-white py-20 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
      <div className="mt-10">
                      <DecryptedText
                        text="What our users say"
                        animateOn="view"
                        revealDirection="center"
                        parentClassName="text-3xl font-bold text-center mb-12"
                      />
                    </div>
        
        <div className="relative">
          {/* Navigation arrows (desktop only) */}
          <button
            className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 items-center justify-center shadow-lg"
            onClick={() => scroll('left')}
            aria-label="Scroll left"
            style={{ left: '-20px' }}
          >
            &#8592;
          </button>
          <button
            className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-black/60 hover:bg-black/80 text-white rounded-full w-10 h-10 items-center justify-center shadow-lg"
            onClick={() => scroll('right')}
            aria-label="Scroll right"
            style={{ right: '-20px' }}
          >
            &#8594;
          </button>
          <div
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900 snap-x snap-mandatory"
            style={{ scrollSnapType: 'x mandatory' }}
          >
            {testimonials.map((t, i) => (
              <SpotlightCard
                key={i}
                className="min-w-[320px] max-w-[350px] h-[320px] flex-shrink-0 snap-center custom-spotlight-card"
                spotlightColor="rgba(255, 132, 0, 0.66)"
              >
                <div className="bg-black/60 border border-white/20 rounded-2xl p-6 flex flex-col justify-between shadow-xl h-full">
                  <p className="text-lg leading-relaxed mb-6 line-clamp-6">
                    <span className="font-bold">“{t.quote}”</span>
                  </p>
                  <div className="flex items-center gap-4 mt-auto">
                    <Image
                      src={t.img}
                      alt="account icon"
                      width={35}
                      height={35}
                    />
                    <div>
                      <p className="font-semibold">{t.name}</p>
                      <p className="text-sm text-gray-300">{t.handle}</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            ))}
          </div>
        </div>
      </div>
      <style jsx>{`
        .scrollbar-thin::-webkit-scrollbar {
          height: 8px;
        }
        .scrollbar-thin::-webkit-scrollbar-thumb {
          background: #444;
          border-radius: 4px;
        }
        .scrollbar-thin::-webkit-scrollbar-track {
          background: #18111A;
        }
      `}</style>
    </section>
  );
}
