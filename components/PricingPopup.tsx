// "use client"

// export default function PricingPage() {
//   return (
  
//     <div>
//        <div className="p-2">
//           <h1 className="text-[35px] font-bold">Pricing</h1>
//           <p>Plans built for creators and business of all sizes</p>
//         </div>
//       <div className="flex justify-center gap-5 content-center mt-5 mb-6">
//         <div className="rounded-2xl h-auto w-[300px] bg-white p-1 shadow-xl transform transition-transform duration-300 hover:scale-105">
//           <h1 className="text-[30px] font-bold">Free</h1>
//           <p className="text-gray-400">For individuals who want to try out the most advanced AI audio</p> <br />

//           <p className="font-bold">10k credits/month</p> <br />

//           <p className="text-[40px]">$0<span className="text-[20px] text-gray-400">per month</span> </p><br />
          
//           <button className="rounded-3xl p-1 w-full font-bold bg-zinc-100 hover:bg-zinc-200 cursor-pointer">GET STARTED</button> <br />

//           <ul className="mt-5">
//             <li className="font-bold ml-5">Text to Speech</li>
//             <li className="font-bold ml-5">Speech to Text</li>   
//             <li className="font-bold ml-5">Conversational AI</li>
//             <li className="font-bold ml-5">Studio</li> 
//             <li className="font-bold ml-5">Automated Dubbing</li> 
//             <li className="font-bold ml-5">API access</li>
//           </ul>

//           <br />

//           <div className="border-t border-dashed w-full"></div>

//           <p className="mt-5">Credits usable for either:</p>

//           <ul className="mb-5 ml-5">
//             <li className="font-bold">10 minutes of high-quality Text to Speech</li>
//             <li className="font-bold">15 minutes of Conversational AI</li>
//           </ul>
          
//         </div>

//         <div className="rounded-2xl h-auto w-[300px] bg-white p-1 shadow-xl transform transition-transform duration-300 hover:scale-105">
//           <h1 className="text-[30px] font-bold">Starter</h1>
//           <p className="text-gray-400">For hobbyists creating projects with AI audio</p> <br />

//           <p className="font-bold">30k credits/month</p> <br />

//           <p className="text-[40px]">$1<span className="text-[20px] text-gray-400">per month</span> </p><br />
          
//           <button className="rounded-3xl p-1 w-full font-bold bg-zinc-100 hover:bg-zinc-200 cursor-pointer">GET STARTED</button> <br />

        
//           <ul className="mt-5"> <p>Everything in free, plus</p>
//             <li className="font-bold ml-5">Commercial license</li>
//             <li className="font-bold ml-5">Instant Voice Cloning</li>   
//             <li className="font-bold ml-5">20 projects in Studio</li>
//             <li className="font-bold ml-5">Dubbing Studio</li> 
//           </ul>

//           <br />

//           <div className="border-t border-dashed w-full mt-6"></div>

//           <p className="mt-5">Credits usable for either:</p>

//           <ul className="mb-5 ml-5">
//             <li className="font-bold">30 minutes of high-quality Text to Speech</li>
//             <li className="font-bold">50 minutes of Conversational AI</li>
//           </ul>
          
//         </div>

//         <div className="rounded-2xl h-auto w-[300px] bg-white p-1 shadow-xl transform transition-transform duration-300 hover:scale-105">
//           <h1 className="text-[30px] font-bold">Creator</h1>
//           <p className="text-gray-400">For creators making premium content for global audiences</p> <br />

//           <p className="font-bold">100k credits/month</p> <br />

//           <p className="text-[40px]">$11<span className="text-[20px] text-gray-400">per month</span> </p><br />
          
//           <button className="rounded-3xl p-1 w-full font-bold bg-zinc-100 hover:bg-zinc-200 cursor-pointer">GET STARTED</button> <br />

          
//           <ul className="mt-5"> <p>Everything in Starter, plus</p>
//             <li className="font-bold ml-5">Professional Voice Cloning</li>
//             <li className="font-bold ml-5">Usage based billing for additional credits</li>   
//             <li className="font-bold ml-5">Higher quality audio 192 kbps</li>
//           </ul>

//           <br />

//           <div className="border-t border-dashed w-full mt-6"></div>

//           <p className="mt-5">Credits usable for either:</p>

//           <ul className="mb-5 ml-5">
//             <li className="font-bold">100 minutes of high-quality Text to Speech</li>
//             <li className="font-bold">250 minutes of Conversational AI</li>
//           </ul>
          
//         </div>

//         <div className="rounded-2xl h-auto w-[300px] bg-white p-1 shadow-xl transform transition-transform duration-300 hover:scale-105">
//           <h1 className="text-[30px] font-bold">Pro</h1>
//           <p className="text-gray-400">For creators ramping up their content production</p> <br />

//           <p className="font-bold">500k credits/month</p> <br />

//           <p className="text-[40px]">$99<span className="text-[20px] text-gray-400">per month</span> </p><br />
          
//           <button className="rounded-3xl p-1 w-full font-bold bg-zinc-100 hover:bg-zinc-200 cursor-pointer">GET STARTED</button> <br />

//           <ul className="mt-5"> <p>Everything in Creator, plus</p>
//             <li className="font-bold ml-5">44.1kHz PCM audio output via API</li>
//           </ul>

//           <br />

//           <div className="border-t border-dashed w-full mt-25"></div>

//           <p className="mt-5">Credits usable for either:</p>

//           <ul className="mb-5 ml-5">
//             <li className="font-bold">500 minutes of high-quality Text to Speech</li>
//             <li className="font-bold">1,100 minutes of Conversational AI</li>
//           </ul>
          
//         </div>
//       </div>

//     </div>
    
// )
// }


"use client"

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { X } from "lucide-react";

export default function PricingPopup({ onClose }: { onClose: () => void }) {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setShowModal(true); // Show popup on mount
  }, []);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      router.push("/agents"); // Redirect after modal closes
    }, 300); // give it time to animate out if needed
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white bg-opacity-40 overflow-y-auto">
      <div className="min-h-screen flex items-center justify-center px-4 py-10">
        <div className="relative bg-[#f5f1e8] rounded-2xl p-6 max-w-[95vw]  w-full overflow-hidden">
          {/* Close button */}
          <button
            className="absolute top-4 right-4 text-gray-500 hover:text-black transition cursor-pointer"
            onClick={handleClose}
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="text-center">
            <h1 className="text-[35px] font-bold">Pricing</h1>
            <p>Plans built for creators and business of all sizes</p>
          </div>

          {/* Pricing cards layout */}
          <div className="flex flex-nowrap gap-5 mt-6 px-2 pb-4">
            {[
                {
                  title: "Free",
                  credits: "10k credits/month",
                  price: "$0",
                  per: "per month",
                  desc: "For individuals who want to try out the most advanced AI audio",
                  bonus: [
                    "Text to Speech",
                    "Speech to Text",
                    "Conversational AI",
                    "Studio",
                    "Automated Dubbing",
                    "API access",
                  ],
                  usage: [
                    "10 minutes of high-quality Text to Speech",
                    "15 minutes of Conversational AI",
                  ],
                },
                {
                  title: "Starter",
                  credits: "30k credits/month",
                  price: "$1",
                  per: "per month",
                  desc: "For hobbyists creating projects with AI audio",
                  bonus: [
                    "Commercial license",
                    "Instant Voice Cloning",
                    "20 projects in Studio",
                    "Dubbing Studio",
                  ],
                  usage: [
                    "30 minutes of high-quality Text to Speech",
                    "50 minutes of Conversational AI",
                  ],
                  note: "Everything in Free, plus",
                },
                {
                  title: "Creator",
                  credits: "100k credits/month",
                  price: "$11",
                  per: "per month",
                  desc: "For creators making premium content for global audiences",
                  bonus: [
                    "Professional Voice Cloning",
                    "Usage based billing for additional credits",
                    "Higher quality audio 192 kbps",
                  ],
                  usage: [
                    "100 minutes of high-quality Text to Speech",
                    "250 minutes of Conversational AI",
                  ],
                  note: "Everything in Starter, plus",
                },
                {
                  title: "Pro",
                  credits: "500k credits/month",
                  price: "$99",
                  per: "per month",
                  desc: "For creators ramping up their content production",
                  bonus: ["44.1kHz PCM audio output via API"],
                  usage: [
                    "500 minutes of high-quality Text to Speech",
                    "1,100 minutes of Conversational AI",
                  ],
                  note: "Everything in Creator, plus",
                },
              ].map((plan, idx) => (
                <div
                  key={idx}
                  className="rounded-2xl h-auto w-[300px] bg-white p-4 shadow-xl transform transition-transform duration-300 hover:scale-105"
                >
                  <h1 className="text-[30px] font-bold">{plan.title}</h1>
                  <p className="text-gray-400">{plan.desc}</p> <br />
                  <p className="font-bold">{plan.credits}</p> <br />
                  <p className="text-[40px]">
                    {plan.price}
                    <span className="text-[20px] text-gray-400"> {plan.per}</span>
                  </p>
                  <br />
                  <button className="rounded-3xl p-1 w-full font-bold bg-zinc-100 hover:bg-zinc-200 cursor-pointer">
                    GET STARTED
                  </button>
                  <br />
                  <ul className="mt-5">
                    {plan.note && <p>{plan.note}</p>}
                    {plan.bonus.map((item, i) => (
                      <li key={i} className="font-bold ml-5">
                        {item}
                      </li>
                    ))}
                  </ul>
                  <br />
                  <div className="border-t border-dashed w-full"></div>
                  <p className="mt-5">Credits usable for either:</p>
                  <ul className="mb-5 ml-5">
                    {plan.usage.map((item, i) => (
                      <li key={i} className="font-bold">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>

  );
}


