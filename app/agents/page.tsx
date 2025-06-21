// // pages/dashboard.tsx
// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';

// interface Agent {
//   agent_id: string;
//   name: string;
//   created_at_unix_secs: number;
//   access_info: {
//     creator_name: string;
//     creator_email: string;
//     role: string;
//     is_creator: boolean;
//   };
// }

// export default function Dashboard() {
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return router.push('/');

//     fetch('http://10.12.26.69:3000/users/agents', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setAgents(data.agents);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching agents:', err);
//         setError('Failed to fetch agents');
//         setLoading(false);
//       });
//   }, [router]);

//   const handleDelete = async (agentId: string) => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return;

//     const res = await fetch(`http://10.12.26.66:3000/users/agents/${agentId}`, {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.ok) {
//       setAgents((prev) => prev.filter((a) => a.agent_id !== agentId));
//     }
//   };

//   if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
//   if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

//   return (
//     <div className="min-h-screen bg-black text-white font-sans px-8 py-12">
//       <div className="flex items-center gap-4 mb-10">
//         <Image src="/Voyo Black Logo.png" alt="Voyo Logo" width={60} height={60} />
//         <h1 className="text-3xl font-bold">Your Agents</h1>
//       </div>

//       {agents.length === 0 ? (
//         <motion.div
//           className="text-center mt-32"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <p className="text-lg mb-6">No agents found. Start by creating one!</p>
//           <button
//             onClick={() =>  router.push('/create-agent')}
//             className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
//           >
//             Create New Agent
//           </button>
//         </motion.div>
//       ) : (
//         <motion.div
//           className="space-y-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           {agents.map((agent) => (
//             <motion.div
//               key={agent.agent_id}
//               className="bg-[#1a1a1a] rounded-xl p-6 flex justify-between items-center shadow-md hover:shadow-orange-400/20 transition-all"
//               whileHover={{ scale: 1.01 }}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold">{agent.name}</h3>
//                 <p className="text-sm text-gray-400">Created: {new Date(agent.created_at_unix_secs * 1000).toLocaleString()}</p>
//               </div>
//               <button
//                 onClick={() => handleDelete(agent.agent_id)}
//                 className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
//               >
//                 Delete
//               </button>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </div>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Edit, Trash2 } from 'lucide-react';
// import { createApiUrl } from '@/lib/config';
// import NavigationLayout from '@/components/NavigationLayout';

// interface Agent {
//   agent_id: string;
//   name: string;
//   created_at_unix_secs: number;
//   access_info: {
//     creator_name: string;
//     creator_email: string;
//     role: string;
//     is_creator: boolean;
//   };
// }

// export default function Dashboard() {
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const router = useRouter();

//   useEffect(() => {
//     if (typeof window === 'undefined') return;
    
//     const token = localStorage.getItem('jwtToken');
//     if (!token) {
//       router.push('/');
//       return;
//     }

//     fetch(createApiUrl('/users/agents'), {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setAgents(data.agents);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching agents:', err);
//         setError('Failed to fetch agents');
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = async (agentId: string) => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return;

//     const res = await fetch(createApiUrl(`/users/agents/${agentId}`), {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.ok) {
//       setAgents((prev) => prev.filter((a) => a.agent_id !== agentId));
//     }
//   };

//   if (loading) return <div className="text-gray-800 text-center mt-20">Loading...</div>;
//   if (error) return <div className="text-red-600 text-center mt-20">{error}</div>;

//   return (
//     <NavigationLayout 
//       title="Your Agents" 
//       currentPage="/agents"
//       showCreateButton={true}
//       onCreateClick={() => router.push('/create-agent')}
//       createButtonText="Create New Agent"
//     >

//       {/* Agent Content */}
//       {agents.length === 0 ? (
//         <motion.div
//           className="text-center mt-32"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <p className="text-lg mb-6">No agents found. Start by creating one!</p>
//           <button
//             onClick={() => router.push('/create-agent')}
//             className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all"
//           >
//             Create New Agent
//           </button>
//         </motion.div>
//       ) : (
//         <motion.div
//           className="space-y-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           {agents.map((agent) => (
//             <motion.div
//               key={agent.agent_id}
//               className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-md hover:shadow-amber-400/20 transition-all"
//               whileHover={{ scale: 1.01 }}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">{agent.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Created: {new Date(agent.created_at_unix_secs * 1000).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => handleDelete(agent.agent_id)}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
//                 >
//                   Deploy
//                 </button>
//                 <button
//                   onClick={() => router.push(`/create-agent?id=${agent.agent_id}`)}
//                   className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
//                 >
//                   <Edit size={16} /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(agent.agent_id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
//                 >
//                   <Trash2 size={16} /> Delete
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}
//     </NavigationLayout>
//   );
// }


// 'use client';

// import { useEffect, useState } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import { useRouter } from 'next/navigation';
// import { Edit, Trash2, X } from 'lucide-react';
// import { createApiUrl } from '@/lib/config';
// import NavigationLayout from '@/components/NavigationLayout';

// interface Agent {
//   agent_id: string;
//   name: string;
//   created_at_unix_secs: number;
//   access_info: {
//     creator_name: string;
//     creator_email: string;
//     role: string;
//     is_creator: boolean;
//   };
// }

// export default function Agents() {
//   const [agents, setAgents] = useState<Agent[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [modalStep, setModalStep] = useState<'initial' | 'phone' | 'addPhone' | 'connectPhone' | 'web'>('initial');
//   const [phoneInput, setPhoneInput] = useState(false);
//   const [selectedPhone, setSelectedPhone] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [newPhoneNumber, setNewPhoneNumber] = useState('');
//   const [phoneNumberError, setPhoneNumberError] = useState('');



//   const router = useRouter();

//   const phoneNumbers = ['+1 234-567-8901', '+91 9988776655', '+44 7123 456789'];

//   useEffect(() => {
//     if (typeof window === 'undefined') return;

//     const token = localStorage.getItem('jwtToken');
//     if (!token) {
//       router.push('/');
//       return;
//     }

//     fetch(createApiUrl('/users/agents'), {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setAgents(data.agents);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error('Error fetching agents:', err);
//         setError('Failed to fetch agents');
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = async (agentId: string) => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return;

//     const res = await fetch(createApiUrl(`/users/agents/${agentId}`), {
//       method: 'DELETE',
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     if (res.ok) {
//       setAgents((prev) => prev.filter((a) => a.agent_id !== agentId));
//     }
//   };

//   const handleDeployClick = () => {
//     setShowModal(true);
//     setModalStep('initial');
//   };

//   const handleAddPhone = () => {
//     console.log('Phone added:', phoneInput);
//     setPhoneInput(false);
//     setShowModal(false);
//   };

//   if (loading) return <div className="text-gray-800 text-center mt-20">Loading...</div>;
//   if (error) return <div className="text-red-600 text-center mt-20">{error}</div>;

//   return (
//     <NavigationLayout
//       title="Your Agents"
//       currentPage="/agents"
//       showCreateButton={true}
//       onCreateClick={() => router.push('/create-agent')}
//       createButtonText="Create New Agent"
//     >
//       {agents.length === 0 ? (
//         <motion.div
//           className="text-center mt-32"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           <p className="text-lg mb-6">No agents found. Start by creating one!</p>
//           <button
//             onClick={() => router.push('/create-agent')}
//             className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all"
//           >
//             Create New Agent
//           </button>
//         </motion.div>
//       ) : (
//         <motion.div
//           className="space-y-6"
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.4 }}
//         >
//           {agents.map((agent) => (
//             <motion.div
//               key={agent.agent_id}
//               className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-md hover:shadow-amber-400/20 transition-all"
//               whileHover={{ scale: 1.01 }}
//             >
//               <div>
//                 <h3 className="text-xl font-semibold text-gray-800">{agent.name}</h3>
//                 <p className="text-sm text-gray-600">
//                   Created: {new Date(agent.created_at_unix_secs * 1000).toLocaleString()}
//                 </p>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={handleDeployClick}
//                   className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
//                 >
//                   Deploy
//                 </button>
//                 <button
//                   onClick={() => router.push(`/create-agent?id=${agent.agent_id}`)}
//                   className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
//                 >
//                   <Edit size={16} /> Edit
//                 </button>
//                 <button
//                   onClick={() => handleDelete(agent.agent_id)}
//                   className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
//                 >
//                   <Trash2 size={16} /> Delete
//                 </button>
//               </div>
//             </motion.div>
//           ))}
//         </motion.div>
//       )}

//       {/* Modal Section */}
//       <AnimatePresence>
//         {showModal && (
//           <motion.div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             exit={{ opacity: 0 }}
//           >
//             <motion.div
//               className="bg-white rounded-2xl p-8 shadow-lg max-w-lg w-full text-center relative"
//               initial={{ scale: 0.9, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.9, opacity: 0 }}
//               transition={{ type: 'spring', stiffness: 300, damping: 25 }}
//             >
//               <button
//                 onClick={() => setShowModal(false)}
//                 className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition cursor-pointer"
//               >
//                 <X size={24} />
//               </button>

//               {/* Initial Modal */}
//               {modalStep === 'initial' && (
//                 <>
//                   <h2 className="text-2xl font-bold mb-6 text-gray-800">Deploy Options</h2>
//                   <div className="flex flex-col gap-4">
//                     <button
//                       onClick={() => setModalStep('phone')}
//                       className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
//                     >
//                       Phone Number
//                     </button>
//                     <button
//                       onClick={() => setModalStep('web')}
//                       className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
//                     >
//                       Web
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* Phone Number Menu */}
//               {modalStep === 'phone' && (
//                 <>
//                   <h2 className="text-2xl font-bold mb-6 text-gray-800">Phone Number Deployment</h2>
//                   <div className="flex flex-col gap-4">
//                     <button
//                       onClick={() => setModalStep('addPhone')}
//                       className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
//                     >
//                       Add Phone
//                     </button>
//                     <button
//                       onClick={() => setModalStep('connectPhone')}
//                       className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
//                     >
//                       Connect Existing Phone Number
//                     </button>
//                   </div>
//                 </>
//               )}

//               {/* Add Phone */}
//               {modalStep === 'addPhone' && (
//                 <>
//                   <h2 className="text-2xl font-bold mb-4 text-gray-800">Get Phone Number</h2>

//                   {phoneNumberError && (
//                     <p className="text-red-600 text-sm mb-2">{phoneNumberError}</p>
//                   )}
//                   <button
//                     onClick={() => {
//                       if (!newPhoneNumber.trim()) {
//                         setPhoneNumberError('Please enter a phone number');

//                         // Auto-clear error message after 3 seconds
//                         setTimeout(() => setPhoneNumberError(''), 3000);
//                         return;
//                       }

//                       // Success logic
//                       setPhoneNumberError('');
//                       console.log('Phone number added:', newPhoneNumber);
//                       setNewPhoneNumber('');
//                       setModalStep('phone');
//                     }}

//                     className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition cursor-pointer"
//                   >
//                     Get Number
//                   </button>
//                 </>
//               )}

//               {/* Connect Phone */}
//  {modalStep === 'connectPhone' && (
//   <>
//     <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Phone Number</h2>
//     <select
//       value={selectedPhone}
//       onChange={(e) => setSelectedPhone(e.target.value)}
//       className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-700"
//     >
//       <option value="">-- Choose a phone number --</option>
//       {phoneNumbers.map((phone) => (
//         <option key={phone} value={phone}>
//           {phone}
//         </option>
//       ))}
//     </select>
//     <button
//       onClick={() => {
//         console.log('Phone number selected:', selectedPhone);
//         setShowModal(false);
//       }}
//       className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition cursor-pointer mr-4"
//     >
//       Connect
//     </button>

//     {/* Orange Add New Button reveals input */}
//     {!phoneInput && (
//       <button
//         onClick={() => setPhoneInput(true)}
//         className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-xl font-semibold transition cursor-pointer"
//       >
//         + Add a new number
//       </button>
//     )}

//     {/* Show input when phoneInput is triggered */}
//     {phoneInput && (
//       <div className="mt-4 text-left">
//         <input
//           type="text"
//           placeholder="Enter new phone number"
//           value={newPhoneNumber}
//           onChange={(e) => setNewPhoneNumber(e.target.value)}
//           className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 mb-2"
//         />
//         {phoneNumberError && (
//           <p className="text-red-600 text-sm mb-2">{phoneNumberError}</p>
//         )}
//         <button
//           onClick={() => {
//             if (!newPhoneNumber.trim()) {
//               setPhoneNumberError('Please enter a phone number');
//               setTimeout(() => setPhoneNumberError(''), 3000);
//               return;
//             }

//             console.log('New number added:', newPhoneNumber);
//             setPhoneNumbers((prev) => [...prev, newPhoneNumber]);
//             setNewPhoneNumber('');
//             setPhoneInput(false);
//             setPhoneNumberError('');
//           }}
//           className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition cursor-pointer"
//         >
//           Add
//         </button>
//       </div>
//     )}
//   </>
// )}


//               {/* Web Integration Code View */}
//               {modalStep === 'web' && (
//                 <>
//                   <h2 className="text-2xl font-bold mb-6 text-gray-800">Integrate</h2>
//                   <pre className="bg-gray-100 text-left text-sm rounded-xl p-4 overflow-auto text-gray-800 font-mono mb-4">
//               {`<script src="https://your-awesome-agent.com/widget.js"></script>
//               <script>
//                 AgentWidget.init({ apiKey: 'YOUR_API_KEY' });
//               </script>`}
//                   </pre>
//                   <button
//                     onClick={() => {
//                         navigator.clipboard.writeText(`<script src="https://your-awesome-agent.com/widget.js"></script>
//               <script>
//                 AgentWidget.init({ apiKey: 'YOUR_API_KEY' });
//               </script>`);
//                       setCopied(true);
//                       setTimeout(() => setCopied(false), 2000);
//                     }}
//                     className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition cursor-pointer"
//                   >
//                     {copied ? 'Copied!' : 'Copy Code'}
//                   </button>
//                 </>
//               )}
//             </motion.div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </NavigationLayout>
//   );
// }


'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Edit, Trash2, X } from 'lucide-react';
import { createApiUrl } from '@/lib/config';
import NavigationLayout from '@/components/NavigationLayout';

interface Agent {
  agent_id: string;
  name: string;
  created_at_unix_secs: number;
  access_info: {
    creator_name: string;
    creator_email: string;
    role: string;
    is_creator: boolean;
  };
}

export default function Agents() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'initial' | 'phone' | 'getPhone' | 'connectPhone' | 'manualAdd' | 'web' | 'webCustomize'>('initial');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [copied, setCopied] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  
  // Widget customization options
  const [widgetColor, setWidgetColor] = useState('#d97706');
  const [widgetIcon, setWidgetIcon] = useState('🤖');
  const [waveColor, setWaveColor] = useState('#d97706');

  const router = useRouter();

  const phoneNumbers = ['+1 234-567-8901', '+91 9988776655', '+44 7123 456789'];

  // Color options
  const colorOptions = [
    { name: 'Orange', value: '#d97706' },
    { name: 'Blue', value: '#2563eb' },
    { name: 'Green', value: '#059669' },
    { name: 'Purple', value: '#7c3aed' },
    { name: 'Red', value: '#dc2626' },
    { name: 'Pink', value: '#ec4899' },
  ];

  // Icon options
  const iconOptions = [
    '🤖', '💬', '🎧', '👨‍💼', '👩‍💼', '📞', '🔮', '⚡', '🌟', '🚀'
  ];

  // Generate customized widget code
  const generateWidgetCode = () => {
    if (!selectedAgent) return '';
    
    return `<!-- AI Agent Widget - Copy and paste this entire code block into your website -->
<div id="ai-agent-widget">
<style>
/* AI Agent Widget Styles */
.ai-widget-container{position:fixed;bottom:20px;right:20px;z-index:9999;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif}.ai-widget-button{width:60px;height:60px;border-radius:50%;background:linear-gradient(135deg,${widgetColor},${lightenColor(widgetColor, 20)});border:none;box-shadow:0 4px 20px rgba(0,0,0,0.15);cursor:pointer;transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;color:white;font-size:24px}.ai-widget-button:hover{transform:scale(1.1);box-shadow:0 6px 25px rgba(0,0,0,0.2)}.ai-widget-modal{position:fixed;top:0;left:0;width:100%;height:100%;background:rgba(0,0,0,0.6);backdrop-filter:blur(4px);display:flex;align-items:center;justify-content:center;z-index:10000}.ai-widget-modal.hidden{display:none}.ai-widget-content{background:white;border:1px solid #e5e7eb;border-radius:16px;box-shadow:0 20px 25px -5px rgba(0,0,0,0.1);padding:32px;max-width:400px;width:90%;text-align:center}.ai-widget-title{font-size:24px;font-weight:bold;color:${widgetColor};margin-bottom:16px}.ai-widget-canvas{width:300px;height:100px;background:linear-gradient(135deg,${lightenColor(widgetColor, 50)},${lightenColor(widgetColor, 30)});border:1px solid ${lightenColor(widgetColor, 30)};border-radius:8px;margin:0 auto 16px;display:block}.ai-widget-button-primary{background:${widgetColor};color:white;font-weight:600;padding:8px 24px;border-radius:9999px;border:none;cursor:pointer;transition:all 0.3s ease;box-shadow:0 2px 4px rgba(0,0,0,0.1)}.ai-widget-button-primary:hover{background:${darkenColor(widgetColor, 20)}}.ai-widget-button-primary:disabled{background:#d1d5db;color:#6b7280;cursor:not-allowed}.ai-widget-status{font-size:12px;color:#6b7280;margin-top:12px}.ai-widget-close{margin-top:16px;font-size:14px;color:${widgetColor};text-decoration:underline;background:none;border:none;cursor:pointer}.ai-widget-close:hover{color:${darkenColor(widgetColor, 20)}}
</style>

<div class="ai-widget-container">
    <button class="ai-widget-button" onclick="AIWidget.open()">${widgetIcon}</button>
    <div id="ai-widget-modal" class="ai-widget-modal hidden">
        <div class="ai-widget-content">
            <h3 class="ai-widget-title" id="ai-widget-title">Talk to Your AI Agent</h3>
            <canvas id="ai-widget-canvas" class="ai-widget-canvas" width="300" height="100"></canvas>
            <button id="ai-widget-talk-btn" class="ai-widget-button-primary" onclick="AIWidget.toggleRecording()">Start Talking</button>
            <p class="ai-widget-status">You're chatting live with ${selectedAgent.name}</p>
            <button class="ai-widget-close" onclick="AIWidget.close()">Close</button>
        </div>
    </div>
</div>

<script>
window.AIWidget = (function() {
    const AGENT_ID = '${selectedAgent.agent_id}';
    
    let isRecording = false;
    let audioContext = null;
    let analyser = null;
    let dataArray = null;
    let source = null;
    let animationFrame = null;
    let processor = null;
    let audioQueue = [];
    let isPlaying = false;
    let currentSource = null;
    let socket = null;

    function open() {
        document.getElementById('ai-widget-modal').classList.remove('hidden');
    }

    function close() {
        document.getElementById('ai-widget-modal').classList.add('hidden');
        if (isRecording) stop();
    }

    function toggleRecording() {
        isRecording ? stop() : start();
    }

    async function start() {
        isRecording = true;
        document.getElementById('ai-widget-title').textContent = 'Talking to ${selectedAgent.name}...';
        document.getElementById('ai-widget-talk-btn').textContent = 'Stop';

        try {
            await startAudio();
            startWebSocket();
        } catch (error) {
            console.error('Error starting recording:', error);
            alert('Could not access microphone. Please check permissions.');
            stop();
        }
    }

    function stop() {
        isRecording = false;
        document.getElementById('ai-widget-title').textContent = 'Talk to Your AI Agent';
        document.getElementById('ai-widget-talk-btn').textContent = 'Start Talking';
        stopAudio();
        stopWebSocket();
    }

    async function startAudio() {
        audioContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate: 16000 });
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        source = audioContext.createMediaStreamSource(stream);
        analyser = audioContext.createAnalyser();
        source.connect(analyser);
        analyser.fftSize = 256;
        dataArray = new Uint8Array(analyser.frequencyBinCount);

        const canvas = document.getElementById('ai-widget-canvas');
        const ctx = canvas.getContext('2d');

        function draw() {
            if (!isRecording) return;
            animationFrame = setTimeout(() => requestAnimationFrame(draw), 60);
            analyser.getByteTimeDomainData(dataArray);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const width = canvas.width, height = canvas.height, middle = height / 2;
            const sliceWidth = width / dataArray.length;
            let x = 0, maxAmplitude = 0;

            ctx.beginPath();
            for (let i = 0; i < dataArray.length; i++) {
                const v = dataArray[i] / 128.0;
                const y = middle + (v - 1.0) * middle * 0.75;
                if (Math.abs(v - 1.0) > maxAmplitude) maxAmplitude = Math.abs(v - 1.0);
                i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
                x += sliceWidth;
            }

            const gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
            gradient.addColorStop(0, '${waveColor}');
            gradient.addColorStop(0.5, '${lightenColor(waveColor, 20)}');
            gradient.addColorStop(1, '${lightenColor(waveColor, 40)}');
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 4;
            ctx.lineJoin = 'round';
            ctx.lineCap = 'round';
            ctx.stroke();

            if (maxAmplitude > 0.15 && isPlaying) {
                audioQueue = [];
                if (currentSource) {
                    currentSource.stop();
                    currentSource.disconnect();
                    currentSource = null;
                }
                isPlaying = false;
            }
        }
        draw();

        processor = audioContext.createScriptProcessor(4096, 1, 1);
        source.connect(processor);
        processor.connect(audioContext.destination);
        processor.onaudioprocess = (e) => {
            const input = e.inputBuffer.getChannelData(0);
            const pcm = new Int16Array(input.length);
            for (let i = 0; i < input.length; i++) {
                pcm[i] = Math.max(-1, Math.min(1, input[i])) * 0x7fff;
            }
            const base64 = btoa(String.fromCharCode(...new Uint8Array(pcm.buffer)));
            if (socket?.readyState === WebSocket.OPEN) {
                socket.send(JSON.stringify({ user_audio_chunk: base64 }));
            }
        };
    }

    function stopAudio() {
        if (animationFrame) cancelAnimationFrame(animationFrame);
        if (processor) processor.disconnect();
        if (audioContext) audioContext.close();
    }

    function startWebSocket() {
        socket = new WebSocket(\`wss://api.elevenlabs.io/v1/convai/conversation?agent_id=\${AGENT_ID}\`);
        socket.onopen = () => socket.send(JSON.stringify({
            type: "conversation_initiation_client_data",
            conversation_config_override: { agent: { agent_id: AGENT_ID } }
        }));
        socket.onmessage = async (message) => {
            const data = JSON.parse(message.data);
            if (data.type === "audio" && data.audio_event?.audio_base_64) {
                try {
                    const raw = atob(data.audio_event.audio_base_64);
                    const buffer = new ArrayBuffer(raw.length);
                    const view = new Uint8Array(buffer);
                    for (let i = 0; i < raw.length; i++) view[i] = raw.charCodeAt(i);
                    const dataView = new DataView(buffer);
                    const pcm = new Float32Array(buffer.byteLength / 2);
                    for (let i = 0; i < pcm.length; i++) {
                        pcm[i] = dataView.getInt16(i * 2, true) / 32768;
                    }
                    const audioBuffer = audioContext.createBuffer(1, pcm.length, 16000);
                    audioBuffer.copyToChannel(pcm, 0);
                    audioQueue.push(audioBuffer);
                    playNext();
                } catch (err) {
                    console.error('Audio decode error:', err);
                }
            }
        };
    }

    function stopWebSocket() {
        if (socket) socket.close();
    }

    function playNext() {
        if (isPlaying || !audioQueue.length) return;
        const buffer = audioQueue.shift();
        currentSource = audioContext.createBufferSource();
        currentSource.buffer = buffer;
        currentSource.connect(audioContext.destination);
        isPlaying = true;
        currentSource.onended = () => {
            isPlaying = false;
            currentSource = null;
            playNext();
        };
        currentSource.start();
    }

    document.addEventListener('click', (e) => {
        if (e.target.id === 'ai-widget-modal') close();
    });

    return { open, close, toggleRecording };
})();
</script>
</div>`;
  };

  // Helper functions for color manipulation
  const lightenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) + amt;
    const G = (num >> 8 & 0x00FF) + amt;
    const B = (num & 0x0000FF) + amt;
    return '#' + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
      (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
      (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
  };

  const darkenColor = (color: string, percent: number) => {
    const num = parseInt(color.replace('#', ''), 16);
    const amt = Math.round(2.55 * percent);
    const R = (num >> 16) - amt;
    const G = (num >> 8 & 0x00FF) - amt;
    const B = (num & 0x0000FF) - amt;
    return '#' + (0x1000000 + (R > 255 ? 255 : R < 0 ? 0 : R) * 0x10000 +
      (G > 255 ? 255 : G < 0 ? 0 : G) * 0x100 +
      (B > 255 ? 255 : B < 0 ? 0 : B)).toString(16).slice(1);
  };

  // Download widget code as file
  const downloadWidgetCode = () => {
    const code = generateWidgetCode();
    const blob = new Blob([code], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${selectedAgent?.name || 'agent'}-widget.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const token = localStorage.getItem('jwtToken');
    if (!token) {
      router.push('/');
      return;
    }

    fetch(createApiUrl('/users/agents'), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAgents(data.agents);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching agents:', err);
        setError('Failed to fetch agents');
        setLoading(false);
      });
  }, [router]);

  const handleDelete = async (agentId: string) => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return;

    const res = await fetch(createApiUrl(`/users/agents/${agentId}`), {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setAgents((prev) => prev.filter((a) => a.agent_id !== agentId));
    }
  };

  const handleDeployClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setShowModal(true);
    setModalStep('initial');
  };

  if (loading) return <div className="text-gray-800 text-center mt-20">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-20">{error}</div>;

  return (
    <NavigationLayout
      title="Your Agents"
      currentPage="/agents"
      showCreateButton={true}
      onCreateClick={() => router.push('/create-agent')}
      createButtonText="Create New Agent"
    >
      {agents.length === 0 ? (
        <motion.div
          className="text-center mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-lg mb-6">No agents found. Start by creating one!</p>
          <button
            onClick={() => router.push('/create-agent')}
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg text-lg font-semibold shadow-md transition-all"
          >
            Create New Agent
          </button>
        </motion.div>
      ) : (
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {agents.map((agent) => (
            <motion.div
              key={agent.agent_id}
              className="bg-white/90 backdrop-blur-sm border border-gray-200 rounded-xl p-6 flex justify-between items-center shadow-md hover:shadow-amber-400/20 transition-all"
              whileHover={{ scale: 1.01 }}
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-800">{agent.name}</h3>
                <p className="text-sm text-gray-600">
                  Created: {new Date(agent.created_at_unix_secs * 1000).toLocaleString()}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleDeployClick(agent)}
                  className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
                >
                  Deploy
                </button>
                <button
                  onClick={() => router.push(`/create-agent?id=${agent.agent_id}`)}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
                >
                  <Edit size={16} /> Edit
                </button>
                <button
                  onClick={() => handleDelete(agent.agent_id)}
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg cursor-pointer flex items-center gap-2 shadow-sm transition-all"
                >
                  <Trash2 size={16} /> Delete
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-8 shadow-lg max-w-lg w-full text-center relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 transition cursor-pointer"
              >
                <X size={24} />
              </button>

              {modalStep === 'initial' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Deploy Options</h2>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setModalStep('phone')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Deploy Phone Number
                    </button>
                    <button
                      onClick={() => setModalStep('webCustomize')}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Deploy to Web
                    </button>
                  </div>
                </>
              )}

              {modalStep === 'phone' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Phone Number Deployment</h2>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setModalStep('getPhone')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Get Phone Number
                    </button>
                    <button
                      onClick={() => setModalStep('connectPhone')}
                      className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Connect Existing Phone Number
                    </button>
                  </div>
                </>
              )}

              {modalStep === 'getPhone' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Get Phone Number</h2>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => window.open('https://www.du.ae/siptrunk', '_blank')}
                      className="bg-orange-600 hover:bg-orange-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Get Number
                    </button>
                  </div>
                </>
              )}


              {modalStep === 'connectPhone' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Select Phone Number</h2>
                  <select
                    value={selectedPhone}
                    onChange={(e) => setSelectedPhone(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 text-gray-700"
                  >
                    <option value="">-- Choose a phone number --</option>
                    {phoneNumbers.map((phone) => (
                      <option key={phone} value={phone}>
                        {phone}
                      </option>
                    ))}
                  </select>
                  <button
                    onClick={() => {
                      console.log('Phone number selected:', selectedPhone);
                      setShowModal(false);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition cursor-pointer mr-4"
                  >
                    Connect
                  </button>
                  <button
                    onClick={() => setModalStep('manualAdd')}
                    className="bg-orange-600 hover:bg-orange-700 text-white py-2 px-6 rounded-xl font-semibold transition cursor-pointer"
                  >
                    + Add a new number
                  </button>
                </>
              )}

              {modalStep === 'manualAdd' && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Add New Phone Number</h2>
                  {phoneNumberError && (
                    <p className="text-red-600 text-sm mb-2">{phoneNumberError}</p>
                  )}
                  <input
                    type="text"
                    placeholder="Enter new phone number"
                    value={newPhoneNumber}
                    onChange={(e) => setNewPhoneNumber(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg px-4 py-2 text-gray-700 mb-2"
                  />
                  <button
                    onClick={() => {
                      if (!newPhoneNumber.trim()) {
                        setPhoneNumberError('Please enter a phone number');
                        setTimeout(() => setPhoneNumberError(''), 3000);
                        return;
                      }
                      console.log('New number added:', newPhoneNumber);
                      setNewPhoneNumber('');
                      setModalStep('phone');
                      setPhoneNumberError('');
                    }}
                    className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-semibold transition cursor-pointer"
                  >
                    Add
                  </button>
                </>
              )}

              {modalStep === 'webCustomize' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Customize Your Widget</h2>
                  
                  {/* Widget Color Selection */}
                  <div className="mb-6 text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Widget Color</label>
                    <div className="flex gap-2 flex-wrap">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setWidgetColor(color.value)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            widgetColor === color.value ? 'border-gray-800' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Wave Color Selection */}
                  <div className="mb-6 text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Wave Color</label>
                    <div className="flex gap-2 flex-wrap">
                      {colorOptions.map((color) => (
                        <button
                          key={color.value}
                          onClick={() => setWaveColor(color.value)}
                          className={`w-8 h-8 rounded-full border-2 ${
                            waveColor === color.value ? 'border-gray-800' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: color.value }}
                          title={color.name}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Icon Selection */}
                  <div className="mb-6 text-left">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Widget Icon</label>
                    <div className="flex gap-2 flex-wrap">
                      {iconOptions.map((icon) => (
                        <button
                          key={icon}
                          onClick={() => setWidgetIcon(icon)}
                          className={`w-10 h-10 rounded-lg border-2 flex items-center justify-center text-lg ${
                            widgetIcon === icon ? 'border-gray-800 bg-gray-100' : 'border-gray-300 hover:bg-gray-50'
                          }`}
                        >
                          {icon}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                    <p className="text-sm text-gray-600 mb-2">Preview:</p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg"
                        style={{ 
                          background: `linear-gradient(135deg, ${widgetColor}, ${lightenColor(widgetColor, 20)})` 
                        }}
                      >
                        {widgetIcon}
                      </div>
                      <div className="text-sm">
                        <div className="font-medium" style={{ color: widgetColor }}>
                          Talk to {selectedAgent?.name}
                        </div>
                        <div className="text-gray-500">Widget for your website</div>
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalStep('web')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
                    >
                      View Code
                    </button>
                    <button
                      onClick={downloadWidgetCode}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                </>
              )}

              {modalStep === 'web' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Widget Code</h2>
                  <div className="text-left mb-4">
                    <div className="bg-gray-100 rounded-xl p-4 max-h-64 overflow-auto">
                      <pre className="text-xs text-gray-800 font-mono whitespace-pre-wrap">
                        {generateWidgetCode()}
                      </pre>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={() => setModalStep('webCustomize')}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
                    >
                      ← Customize
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(generateWidgetCode());
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
                    >
                      {copied ? 'Copied!' : 'Copy Code'}
                    </button>
                    <button
                      onClick={downloadWidgetCode}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Download
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavigationLayout>
  );
}