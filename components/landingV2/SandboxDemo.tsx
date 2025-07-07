// import React, { useState } from 'react';

// const WORKFLOW_LIBRARY = {
//   restaurant: [
//     {
//       id: 1,
//       title: 'Take Online Orders',
//       description: 'Let customers order food directly from your website or WhatsApp.',
//       agents: ['WhatsApp Bot', 'VOYO AI'],
//       icon: '🍕',
//       preview: {
//         type: 'whatsapp',
//         message: 'Hi! I would like to order a Margherita Pizza and a Coke. Can you confirm my order?'
//       }
//     },
//     {
//       id: 2,
//       title: 'Send Reservation Confirmation',
//       description: 'Automatically send a WhatsApp or SMS confirmation when someone books a table.',
//       agents: ['Twilio', 'VOYO AI'],
//       icon: '📅',
//       preview: {
//         type: 'sms',
//         message: 'Your table at Bella Italia is confirmed for 7:00 PM. See you soon!'
//       }
//     },
//     {
//       id: 3,
//       title: 'Collect Feedback After Meal',
//       description: 'Ask guests for feedback via WhatsApp or email after their visit.',
//       agents: ['WhatsApp Bot', 'Mailchimp', 'VOYO AI'],
//       icon: '📝',
//       preview: {
//         type: 'email',
//         message: 'Thank you for dining with us! Please let us know how we did by replying to this email.'
//       }
//     },
//     {
//       id: 4,
//       title: 'Share Today’s Menu',
//       description: 'Send your daily specials to regulars with one click.',
//       agents: ['WhatsApp Bot', 'VOYO AI'],
//       icon: '📋',
//       preview: {
//         type: 'whatsapp',
//         message: 'Today’s Specials: Spaghetti Carbonara, Caesar Salad, Tiramisu.'
//       }
//     },
//     {
//       id: 5,
//       title: 'Remind About Reservations',
//       description: 'Send a friendly reminder before a guest’s reservation time.',
//       agents: ['Twilio', 'VOYO AI'],
//       icon: '⏰',
//       preview: {
//         type: 'sms',
//         message: 'Reminder: Your reservation at Bella Italia is in 1 hour.'
//       }
//     }
//   ],
//   ecommerce: [
//     {
//       id: 6,
//       title: 'Abandoned Cart Reminder',
//       description: 'Send a reminder to customers who left items in their cart.',
//       agents: ['Shopify Bot', 'Mailchimp', 'VOYO AI'],
//       icon: '🛒',
//       preview: {
//         type: 'email',
//         message: 'You left something in your cart! Complete your purchase now and enjoy free shipping.'
//       }
//     },
//     {
//       id: 7,
//       title: 'Order Tracking Updates',
//       description: 'Automatically notify customers about their order status.',
//       agents: ['VOYO AI', 'Twilio'],
//       icon: '🚚',
//       preview: {
//         type: 'sms',
//         message: 'Your order #1234 has shipped! Track it here: example.com/track/1234'
//       }
//     },
//     {
//       id: 8,
//       title: 'Product Review Request',
//       description: 'Ask customers to review their recent purchase.',
//       agents: ['Mailchimp', 'VOYO AI'],
//       icon: '⭐',
//       preview: {
//         type: 'email',
//         message: 'How did you like your new headphones? Leave a review and get 10% off your next order!'
//       }
//     }
//   ],
//   saas: [
//     {
//       id: 9,
//       title: 'Onboard New Users',
//       description: 'Send a welcome email and onboarding guide to new signups.',
//       agents: ['Mailchimp', 'VOYO AI'],
//       icon: '👋',
//       preview: {
//         type: 'email',
//         message: 'Welcome to SaaSify! Here’s your quick start guide to get the most out of your account.'
//       }
//     },
//     {
//       id: 10,
//       title: 'Automated Support Bot',
//       description: 'Answer common questions instantly with an AI chatbot.',
//       agents: ['VOYO AI'],
//       icon: '🤖',
//       preview: {
//         type: 'dashboard',
//         message: 'User: How do I reset my password?\nBot: Click “Forgot Password” on the login page and follow the instructions.'
//       }
//     },
//     {
//       id: 11,
//       title: 'Churn Risk Alerts',
//       description: 'Get notified when a user is likely to churn.',
//       agents: ['VOYO AI'],
//       icon: '⚠️',
//       preview: {
//         type: 'dashboard',
//         message: 'Alert: User John Doe (john@email.com) is at high risk of churning. Consider reaching out.'
//       }
//     }
//   ],
//   generic: [
//     {
//       id: 12,
//       title: 'Send Newsletters',
//       description: 'Keep your customers updated with regular emails.',
//       agents: ['Mailchimp', 'VOYO AI'],
//       icon: '📧',
//       preview: {
//         type: 'email',
//         message: 'Check out our latest updates and offers in this month’s newsletter!'
//       }
//     },
//     {
//       id: 13,
//       title: 'Book Appointments',
//       description: 'Let customers book appointments online easily.',
//       agents: ['Calendly', 'VOYO AI'],
//       icon: '📆',
//       preview: {
//         type: 'dashboard',
//         message: 'New appointment booked: Jane Doe, 2:00 PM, 12th June.'
//       }
//     },
//     {
//       id: 14,
//       title: 'Customer Feedback Collection',
//       description: 'Collect feedback from your customers automatically.',
//       agents: ['Google Forms', 'VOYO AI'],
//       icon: '💬',
//       preview: {
//         type: 'email',
//         message: 'We value your feedback! Please fill out this quick survey.'
//       }
//     }
//   ]
// };

// function detectType(input: string) {
//   const val = input.toLowerCase();
//   if (val.includes('restaurant') || val.includes('cafe') || val.includes('pizza') || val.includes('bar')) return 'restaurant';
//   if (val.includes('shop') || val.includes('store') || val.includes('ecommerce') || val.includes('cart')) return 'ecommerce';
//   if (val.includes('saas') || val.includes('app') || val.includes('software')) return 'saas';
//   return 'generic';
// }

// const PreviewModal = ({ open, onClose, workflow }: { open: boolean, onClose: () => void, workflow: any }) => {
//   if (!open || !workflow) return null;
//   let icon, title, bg;
//   switch (workflow.preview.type) {
//     case 'whatsapp':
//       icon = '🟢';
//       title = 'WhatsApp Message';
//       bg = 'bg-green-50';
//       break;
//     case 'sms':
//       icon = '📱';
//       title = 'SMS Message';
//       bg = 'bg-blue-50';
//       break;
//     case 'email':
//       icon = '✉️';
//       title = 'Email Preview';
//       bg = 'bg-yellow-50';
//       break;
//     case 'dashboard':
//       icon = '📊';
//       title = 'Dashboard Notification';
//       bg = 'bg-purple-50';
//       break;
//     default:
//       icon = '🤖';
//       title = 'AI Preview';
//       bg = 'bg-gray-100';
//   }
//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
//       <div className={`rounded-xl shadow-xl p-8 max-w-md w-full ${bg} relative`}>
//         <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
//         <div className="flex items-center gap-3 mb-4">
//           <span className="text-3xl">{icon}</span>
//           <span className="font-bold text-lg">{title}</span>
//         </div>
//         <div className="text-gray-700 whitespace-pre-line text-base mb-2">{workflow.preview.message}</div>
//         <div className="text-xs text-gray-400 mt-4">This is a simulated preview of what your customer or team would see.</div>
//       </div>
//     </div>
//   );
// };

// export default function SandboxDemo() {
//   const [input, setInput] = useState('');
//   const [showSuggestions, setShowSuggestions] = useState(false);
//   const [myWorkflows, setMyWorkflows] = useState<any[]>([]);
//   const [dragged, setDragged] = useState<any>(null);
//   const [type, setType] = useState<'restaurant'|'ecommerce'|'saas'|'generic'>('generic');
//   const [preview, setPreview] = useState<any>(null);

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const detected = detectType(input);
//     setType(detected as any);
//     setShowSuggestions(true);
//     setMyWorkflows([]);
//   };

//   const handleDragStart = (workflow: any) => {
//     setDragged(workflow);
//   };

//   const handleDrop = (e: React.DragEvent) => {
//     e.preventDefault();
//     if (dragged && !myWorkflows.find(w => w.id === dragged.id)) {
//       setMyWorkflows([...myWorkflows, dragged]);
//     }
//     setDragged(null);
//   };

//   return (
//     <div className="w-full flex flex-col items-center">
//       <PreviewModal open={!!preview} onClose={() => setPreview(null)} workflow={preview} />
//       <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-8 w-full max-w-2xl">
//         <input
//           type="text"
//           value={input}
//           onChange={e => setInput(e.target.value)}
//           placeholder="Type your business name or website (e.g. Bella Italia, www.mystore.com)"
//           className="flex-1 px-4 py-3 rounded-l border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none bg-white dark:bg-[#23182B] text-black dark:text-white text-lg"
//           required
//         />
//         <button
//           type="submit"
//           className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-r text-lg"
//         >
//           Show Workflows
//         </button>
//       </form>
//       {/* Header section reverted to previous simple version */}
//       <div className="flex items-center gap-2 text-lg font-semibold mb-6">
//         <span role="img" aria-label="cart">🛒</span>
//         <span role="img" aria-label="robot">🤖</span>
//         <span>Browse AI Agents</span>
//         <span className="text-gray-500 text-base font-normal ml-2">For restaurants, retail, and more</span>
//       </div>
//       <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-start">
//         {/* Suggestions */}
//         <div className="flex-1">
//           {showSuggestions && (
//             <div>
//               <div className="font-semibold mb-2 text-gray-800 dark:text-gray-100 text-lg">Suggested Workflows for your business:</div>
//               <div className="flex flex-wrap gap-6">
//                 {WORKFLOW_LIBRARY[type].map(wf => (
//                   <div
//                     key={wf.id}
//                     className="bg-white/80 dark:bg-[#2A1E4D] border-2 border-orange-200 dark:border-orange-400 rounded-2xl p-6 shadow-xl cursor-grab w-72 relative flex flex-col items-center transition-transform hover:scale-105"
//                     draggable
//                     onDragStart={() => handleDragStart(wf)}
//                     style={{ boxShadow: '0 4px 24px 0 rgba(255, 140, 0, 0.10)' }}
//                   >
//                     <div className="text-4xl mb-2">{wf.icon}</div>
//                     <div className="font-bold text-orange-600 dark:text-orange-300 mb-1 text-lg text-center">{wf.title}</div>
//                     <div className="text-gray-600 dark:text-gray-200 text-base mb-2 text-center">{wf.description}</div>
//                     <div className="flex flex-wrap gap-2 mt-2 justify-center">
//                       {wf.agents.map((agent: string, idx: number) => (
//                         <span key={idx} className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-1 rounded text-xs font-semibold">{agent}</span>
//                       ))}
//                     </div>
//                     <div className="mt-2 text-xs text-gray-400">Drag to Sandbox below</div>
//                     <button
//                       className="absolute top-2 right-2 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded shadow"
//                       onClick={e => { e.stopPropagation(); setPreview(wf); }}
//                       type="button"
//                     >
//                       Preview
//                     </button>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//         {/* Sandbox Area */}
//         <div className="flex-1 flex flex-col items-center">
//           <div
//             className="w-full min-h-[420px] bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-[#23182B] dark:via-[#1B142F] dark:to-[#2A1E4D] border-4 border-dashed border-orange-300 dark:border-orange-500 rounded-3xl p-12 flex flex-col items-center relative shadow-2xl overflow-hidden"
//             onDragOver={e => e.preventDefault()}
//             onDrop={handleDrop}
//             style={{ position: 'relative', backgroundImage: 'repeating-linear-gradient(135deg, #f8fafc 0 2px, transparent 2px 40px)' }}
//           >
//             {/* Subtle grid pattern overlay */}
//             <div className="absolute inset-0 pointer-events-none" style={{background: 'repeating-linear-gradient(135deg, #f3f4f6 0 2px, transparent 2px 40px)'}} />
//             <div className="font-bold text-orange-700 dark:text-orange-300 mb-4 text-2xl z-10">My Sandbox</div>
//             {myWorkflows.length === 0 ? (
//               <div className="text-gray-400 text-lg mt-12 z-10">Drag workflows here to build your own automation!<br/>It’s as easy as stacking building blocks.</div>
//             ) : (
//               <div className="flex flex-col items-center w-full relative z-10">
//                 {myWorkflows.map((wf, idx) => (
//                   <div key={wf.id} className="relative w-full flex flex-col items-center">
//                     <div className="bg-white/90 dark:bg-[#2A1E4D] border-2 border-orange-200 dark:border-orange-400 rounded-2xl p-6 shadow-xl w-3/4 mb-8 z-10 flex flex-col items-center transition-transform hover:scale-105" style={{ boxShadow: '0 4px 24px 0 rgba(255, 140, 0, 0.10)' }}>
//                       <div className="text-4xl mb-2">{wf.icon}</div>
//                       <div className="font-bold text-orange-600 dark:text-orange-300 text-lg text-center">{wf.title}</div>
//                       <div className="text-gray-600 dark:text-gray-200 text-base mb-2 text-center">{wf.description}</div>
//                       <div className="flex flex-wrap gap-2 mt-2 justify-center">
//                         {wf.agents.map((agent: string, idx: number) => (
//                           <span key={idx} className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-1 rounded text-xs font-semibold">{agent}</span>
//                         ))}
//                       </div>
//                       <button
//                         className="absolute top-2 right-2 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded shadow"
//                         onClick={e => { e.stopPropagation(); setPreview(wf); }}
//                         type="button"
//                       >
//                         Preview
//                       </button>
//                     </div>
//                     {/* Draw arrow to next card */}
//                     {idx < myWorkflows.length - 1 && (
//                       <svg height="40" width="40" className="absolute left-1/2 -translate-x-1/2 top-full z-0" style={{ marginTop: '-8px' }}>
//                         <defs>
//                           <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
//                             <polygon points="0 0, 10 3.5, 0 7" fill="#fb923c" />
//                           </marker>
//                         </defs>
//                         <line x1="20" y1="0" x2="20" y2="40" stroke="#fb923c" strokeWidth="4" markerEnd="url(#arrowhead)" />
//                       </svg>
//                     )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//       <style jsx>{`
//         .sandbox-canvas::-webkit-scrollbar {
//           height: 8px;
//         }
//         .sandbox-canvas::-webkit-scrollbar-thumb {
//           background: #fbbf24;
//           border-radius: 4px;
//         }
//         .sandbox-canvas::-webkit-scrollbar-track {
//           background: #fff7ed;
//         }
//       `}</style>
//     </div>
//   );
// } 


'use client';

import React, { useState, useEffect } from 'react';
import { createApiUrl } from '@/lib/api'; // adjust path if your file lives elsewhere
import Link from 'next/link';

const PreviewModal = ({ open, onClose, workflow }: { open: boolean, onClose: () => void, workflow: any }) => {
  if (!open || !workflow) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
      <div className={`rounded-xl shadow-xl p-8 max-w-md w-full bg-gray-50 dark:bg-[#1f1f1f] relative`}>
        <button onClick={onClose} className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-2xl">&times;</button>
        <div className="flex items-center gap-3 mb-4">
          <span className="text-3xl">{workflow.icon || '🤖'}</span>
          <span className="font-bold text-lg">{workflow.title}</span>
        </div>
        <div className="text-gray-700 whitespace-pre-line text-base mb-2">{workflow.category}</div>
        <div className="text-xs text-gray-400 mt-4">This is a simulated preview.</div>
      </div>
    </div>
  );
};

export default function SandboxDemo() {
  const [input, setInput] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [myWorkflows, setMyWorkflows] = useState<any[]>([]);
  const [dragged, setDragged] = useState<any>(null);
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [filteredWorkflows, setFilteredWorkflows] = useState<any[]>([]);
  const [preview, setPreview] = useState<any>(null);
  const [search, setSearch] = useState('');


  // 🔥 Fetch workflows on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(createApiUrl('/workflows'));
        const data = await response.json();
        setWorkflows(data.workflows);
        setFilteredWorkflows(data.workflows);
      } catch (error) {
        console.error('Failed to fetch workflows:', error);
      }
    };
    fetchData();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowSuggestions(true);
    setMyWorkflows([]);
  };

  const handleDragStart = (workflow: any) => {
    setDragged(workflow);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    if (dragged && !myWorkflows.find(w => w.id === dragged.id)) {
      setMyWorkflows([...myWorkflows, dragged]);
    }
    setDragged(null);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
  const query = e.target.value;
  setSearch(query);

  const filtered = workflows.filter(
    (wf) =>
      wf.title.toLowerCase().includes(query.toLowerCase()) ||
      wf.category.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredWorkflows(filtered);
};


  return (
    <div className="w-full flex flex-col items-center">
      <PreviewModal open={!!preview} onClose={() => setPreview(null)} workflow={preview} />

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 mb-8 w-full max-w-2xl">
        <input
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="Search workflows by title or category..."
        className="flex-1 px-4 py-3 rounded-l border border-gray-300 focus:ring-2 focus:ring-orange-400 outline-none bg-white dark:bg-[#23182B] text-black dark:text-white text-lg"
      />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-r text-lg"
        >
          Show Workflows
        </button>
      </form>

      <div className="flex items-center gap-2 text-lg font-semibold mb-6">
        <span role="img" aria-label="cart">🛒</span>
        <span role="img" aria-label="robot">🤖</span>
        <Link href="/agentsV2" className="hover:underline dark:hover:underline">
          Browse AI Agents
        </Link>
        <span className="text-gray-500 text-base font-normal ml-2">For restaurants, retail, and more</span>
      </div>

      <div className="w-full flex flex-col md:flex-row gap-8 justify-center items-start">
        {/* Suggestions */}
        <div className="flex-1">
          {showSuggestions && (
            <div>
              <div className="font-semibold mb-2 text-gray-800 dark:text-gray-100 text-lg">Suggested Workflows:</div>
              <div className="flex flex-wrap gap-6">
                {filteredWorkflows.map(wf => (
                  <div
                    key={wf.id}
                    className="bg-white/80 dark:bg-[#2A1E4D] border-2 border-orange-200 dark:border-orange-400 rounded-2xl p-6 shadow-xl cursor-grab w-72 relative flex flex-col items-center transition-transform hover:scale-105"
                    draggable
                    onDragStart={() => handleDragStart({ ...wf, agents: ['VOYO AI'] })} // 🔥 keep only VOYO AI
                    style={{ boxShadow: '0 4px 24px 0 rgba(255, 140, 0, 0.10)' }}
                  >
                    <div className="text-4xl mb-2">{wf.icon}</div>
                    <div className="font-bold text-orange-600 dark:text-orange-300 mb-1 text-lg text-center">{wf.category}</div>
                    <div className="text-black dark:text-white text-base mb-2 text-center">{wf.title}</div>
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                      <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-1 rounded text-xs font-semibold">VOYO AI</span>
                    </div>
                    <div className="mt-2 text-xs text-gray-400">Drag to Sandbox below</div>
                    <button
                      className="absolute top-2 right-2 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded shadow"
                      onClick={e => { e.stopPropagation(); setPreview(wf); }}
                      type="button"
                    >
                      Preview
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sandbox Area */}
        <div className="flex flex-col items-center overflow-visible">
          <div
            className="w-full min-h-[420px] bg-gradient-to-br from-orange-50 via-white to-orange-100 dark:from-[#23182B] dark:via-[#1B142F] dark:to-[#2A1E4D] border-4 border-dashed border-orange-300 dark:border-orange-500 rounded-3xl p-12 flex flex-col items-center relative shadow-2xl overflow-hidden"
            onDragOver={e => e.preventDefault()}
            onDrop={handleDrop}
          >
            <div className="font-bold text-orange-700 dark:text-orange-300 mb-4 text-2xl z-10">My Sandbox</div>
            {myWorkflows.length === 0 ? (
              <div className="text-gray-400 text-lg mt-12 z-10">Drag workflows here to build your own automation!<br />It’s as easy as stacking building blocks.</div>
            ) : (
              <div className="flex gap-y-11 flex-col items-center w-full relative z-10">
                {myWorkflows.map((wf, idx) => (
                  <div key={wf.id} className="relative w-full flex flex-col items-center">
                    <div className="bg-white/90 dark:bg-[#2A1E4D] border-2 border-orange-200 dark:border-orange-400 rounded-2xl p-6 shadow-xl w-3/4 mb-8 z-10 flex flex-col items-center transition-transform ">
                      <div className="text-4xl mb-2">{wf.icon}</div>
                      <div className="font-bold text-orange-600 dark:text-orange-300 text-lg text-center">{wf.category}</div>
                      <div className="text-black dark:text-white text-base mb-2 text-center">{wf.title}</div>
                      <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        <span className="bg-orange-100 dark:bg-orange-900 text-orange-700 dark:text-orange-200 px-2 py-1 rounded text-xs font-semibold">VOYO AI</span>
                      </div>
                      <button
                        className="absolute top-2 right-20 bg-orange-100 hover:bg-orange-200 text-orange-700 text-xs px-2 py-1 rounded shadow"
                        onClick={e => { e.stopPropagation(); setPreview(wf); }}
                        type="button"
                      >
                        Preview
                      </button>
                    </div>
                    {idx < myWorkflows.length - 1 && (
                      <svg height="70" width="40" className="absolute left-1/2 -translate-x-1/2 top-full z-0" style={{ marginTop: '-28px' }}>
                        <defs>
                          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                            <polygon points="0 0, 10 3.5, 0 7" fill="#fb923c" />
                          </marker>
                        </defs>
                        <line x1="20" y1="0" x2="20" y2="30" stroke="#fb923c" strokeWidth="4" markerEnd="url(#arrowhead)" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
