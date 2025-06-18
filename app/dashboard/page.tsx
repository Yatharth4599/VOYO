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
//       currentPage="/dashboard"
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

// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Line } from 'react-chartjs-2';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

// export default function Dashboard() {
//   const agents = [
//     { name: 'New agent', calls: 41, minutes: 56, llmCost: '$0.97', credits: '24,964' },
//     { name: 'Kurumba', calls: 38, minutes: 35, llmCost: '$0.25', credits: '15,811' },
//     { name: 'Tupac the great', calls: 14, minutes: 4, llmCost: '$0.051', credits: '1,737' },
//   ];

//   const lineData = {
//     labels: ['May 18', 'May 20', 'May 22', 'May 24', 'May 26', 'May 28', 'May 30', 'Jun 01', 'Jun 03', 'Jun 05', 'Jun 07', 'Jun 09', 'Jun 11', 'Jun 13', 'Jun 15'],
//     datasets: [
//       {
//         label: 'Number of Calls',
//         data: [5, 18, 4, 7, 19, 5, 2, 1, 3, 4, 7, 6, 9, 17, 0],
//         fill: false,
//         borderColor: '#000',
//         tension: 0.1,
//       },
//     ],
//   };

//   const areaData = {
//     labels: lineData.labels,
//     datasets: [
//       {
//         label: 'Success Rate',
//         data: [1, 1, 0.95, 1, 0.8, 1, 1, 0.6, 0.9, 1, 1, 0.7, 1, 1, 0.2],
//         backgroundColor: 'rgba(34,197,94,0.6)',
//         fill: true,
//         borderColor: 'rgba(34,197,94,1)',
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="p-8 text-sm font-sans">
//       <div className="flex gap-4 items-center">
//         <span className="px-2 py-1 rounded-full text-xs flex items-center gap-2 border rounded-xl">
//           <span className="relative flex size-3">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
//             <span className="relative inline-flex size-3 rounded-full bg-black"></span>
//           </span>
//           Active calls: 0
//         </span>
//       </div>

//       <header>
//         <h5 className="text-gray-500">My Workspace</h5>
//         <h2 className="text-3xl font-semibold mt-4">Good morning, User</h2>
//       </header>
      

//       <div className="grid grid-cols-6 gap-4 mt-4 cursor-pointer">
//         <Card title="Number of calls" value="121"/>
//         <Card title="Average duration" value="0:56" />
//         <Card title="Total cost" value="50,475 credits" />
//         <Card title="Average cost" value="417 credits/call" />
//         <Card title="Total LLM cost" value="$1.40" />
//         <Card title="Average LLM cost" value="$0.012/min" />
//       </div>

//       <div className="mt-8">
//         <div className="h-[500px] w-full ml-[200px]">
//           <Line data={lineData} options={{ responsive: true }} />
//         </div>
//       </div>

//       <div className="mt-8">
//         <h3 className="text-xl font-semibold mb-2">Overall Success Rate</h3>
//         <div className="h-[500px] w-full ml-[200px]">
//           <Line data={areaData} options={{ responsive: true }} />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 mt-8 gap-8">
//         <div>
//           <h3 className="font-semibold">Most called agents</h3>
//           <table className="w-full text-left mt-2">
//             <thead>
//               <tr className="text-gray-500">
//                 <th>Agent name</th>
//                 <th>Calls</th>
//                 <th>Minutes</th>
//                 <th>LLM Cost</th>
//                 <th>Credits</th>
//               </tr>
//             </thead>
//             <tbody>
//               {agents.map((a, i) => (
//                 <tr key={i} className="border-t">
//                   <td>{a.name}</td>
//                   <td>{a.calls}</td>
//                   <td>{a.minutes}</td>
//                   <td>{a.llmCost}</td>
//                   <td>{a.credits}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <h3 className="font-semibold">Language</h3>
//           <div className="mt-2">
//             <div className="mb-2">
//               <div className="flex justify-between">
//                 <span>Hindi</span>
//                 <span>57.9%</span>
//               </div>
//               <div className="bg-gray-200 h-2 rounded-full">
//                 <div className="bg-black h-2 rounded-full" style={{ width: '58%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between">
//                 <span>English</span>
//                 <span>42.1%</span>
//               </div>
//               <div className="bg-gray-200 h-2 rounded-full">
//                 <div className="bg-black h-2 rounded-full" style={{ width: '42%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Card({ title, value }: { title: string; value: string }) {
//   return (
//     <div className="border p-4 rounded-xl">
//       <p className="text-gray-500 text-xs">{title}</p>
//       <p className="text-lg font-semibold mt-1">{value}</p>
//     </div>
//   );
// }

// 'use client';

// import { useState } from 'react';
// import { Line } from 'react-chartjs-2';
// import { motion } from 'framer-motion';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   Title,
//   Tooltip,
// } from 'chart.js';

// ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

// type ChartKey = 'calls' | 'duration' | 'totalCost' | 'avgCost' | 'llmCost' | 'avgLlmCost';

// export default function Dashboard() {
//   const [selectedChart, setSelectedChart] = useState<ChartKey>('calls');

//   const chartData: Record<ChartKey, { label: string; data: number[]; color: string }> = {
//     calls: {
//       label: 'Number of Calls',
//       data: [5, 18, 4, 7, 19, 5, 2, 1, 3, 4, 7, 6, 9, 17, 0],
//       color: '#000',
//     },
//     duration: {
//       label: 'Average Duration (mins)',
//       data: [1.2, 1.5, 0.8, 1.1, 2.4, 0.6, 1.8, 0.7, 2.1, 1.3, 1.6, 0.5, 0.9, 2.3, 1.0],
//       color: '#7c3aed',
//     },
//     totalCost: {
//       label: 'Total Cost (credits)',
//       data: [5000, 8040, 2000, 9000, 7000, 4500, 3200, 3800, 6100, 7800, 8800, 9900, 10500, 6800, 7400],
//       color: '#f59e0b',
//     },
//     avgCost: {
//       label: 'Average Cost',
//       data: [120, 140, 110, 130, 150, 160, 90, 100, 180, 200, 170, 145, 155, 165, 135],
//       color: '#0ea5e9',
//     },
//     llmCost: {
//       label: 'Total LLM Cost ($)',
//       data: [0.25, 0.35, 0.22, 0.30, 0.27, 0.20, 0.18, 0.21, 0.29, 0.31, 0.26, 0.24, 0.19, 0.33, 0.28],
//       color: '#dc2626',
//     },
//     avgLlmCost: {
//       label: 'Avg LLM Cost ($/min)',
//       data: [0.012, 0.011, 0.013, 0.015, 0.010, 0.009, 0.012, 0.011, 0.013, 0.012, 0.010, 0.014, 0.015, 0.011, 0.012],
//       color: '#10b981',
//     },
//   };

//   const agents = [
//     { name: 'New agent', calls: 41, minutes: 56, llmCost: '$0.97', credits: '24,964' },
//     { name: 'Kurumba', calls: 38, minutes: 35, llmCost: '$0.25', credits: '15,811' },
//     { name: 'Tupac the great', calls: 14, minutes: 4, llmCost: '$0.051', credits: '1,737' },
//   ];

//   const lineData = {
//     labels: ['May 18', 'May 20', 'May 22', 'May 24', 'May 26', 'May 28', 'May 30', 'Jun 01', 'Jun 03', 'Jun 05', 'Jun 07', 'Jun 09', 'Jun 11', 'Jun 13', 'Jun 15'],
//     datasets: [
//       {
//         label: chartData[selectedChart].label,
//         data: chartData[selectedChart].data,
//         fill: false,
//         borderColor: chartData[selectedChart].color,
//         tension: 0.1,
//       },
//     ],
//   };

//   const areaData = {
//     labels: lineData.labels,
//     datasets: [
//       {
//         label: 'Success Rate',
//         data: [1, 1, 0.95, 1, 0.8, 1, 1, 0.6, 0.9, 1, 1, 0.7, 1, 1, 0.2],
//         backgroundColor: 'rgba(34,197,94,0.6)',
//         fill: true,
//         borderColor: 'rgba(34,197,94,1)',
//         tension: 0.3,
//       },
//     ],
//   };

//   return (
//     <div className="p-8 text-sm font-sans">
//       <div className="flex gap-4 items-center">
//         <span className="px-2 py-1 rounded-full text-xs flex items-center gap-2 border rounded-xl">
//           <span className="relative flex size-3">
//             <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
//             <span className="relative inline-flex size-3 rounded-full bg-black"></span>
//           </span>
//           Active calls: 0
//         </span>
//       </div>
      
//       <header className="mt-8 flex items-center justify-between">
//         <div>
//           <h5 className="text-gray-500">My Workspace</h5>
//           <h2 className="text-3xl font-semibold">Good morning, User</h2>
//         </div>
//         <div className="flex gap-4">
//           <button className="border border-gray-300 rounded-lg px-4 py-2">All Agents</button>
//           <button className="border border-gray-300 rounded-lg px-4 py-2">Last Month</button>
//         </div>
//       </header>

//       <div className="flex gap-4 mt-8 ml-50 overflow-x-auto no-scrollbar">
//         {Object.entries(chartData).map(([key, value]) => (
//           <button
//             key={key}
//             className={` cursor-pointer border border-gray-400 rounded-xl p-3 min-w-[150px] whitespace-nowrap ${
//               selectedChart === key ? 'bg-black text-white' : 'bg-white'
//             }`}
//             onClick={() => setSelectedChart(key as ChartKey)}
//           >
//             <p className="text-gray-500 text-sm">{value.label}</p>
//             <p className="font-semibold text-lg">
//               {
//                 // Show formatted first number with context
//                 key === 'totalCost'
//                   ? `50,475 credits`
//                   : key === 'avgCost'
//                   ? `417 credits/call`
//                   : key === 'llmCost'
//                   ? `$1.40`
//                   : key === 'avgLlmCost'
//                   ? `$0.012/min`
//                   : key === 'duration'
//                   ? `0:56`
//                   : key === 'calls'
//                   ? `121`
//                   : chartData[key as ChartKey].data[0] // fallback
//               }
//             </p>
//           </button>
//         ))}
//       </div>


//       <div className="mt-8 ml-50">
//         <div className="h-[500px] w-full">
//           <Line data={lineData} options={{ responsive: true }} />
//         </div>
//       </div>

//       <div className="mt-8 ml-50">
//         <h3 className="text-xl font-semibold mb-2">Overall Success Rate</h3>
//         <div className="h-[500px] w-full">
//           <Line data={areaData} options={{ responsive: true }} />
//         </div>
//       </div>

//       <div className="grid grid-cols-2 mt-8 gap-8">
//         <div>
//           <h3 className="font-semibold">Most called agents</h3>
//           <table className="w-full text-left mt-2">
//             <thead>
//               <tr className="text-gray-500">
//                 <th>Agent name</th>
//                 <th>Calls</th>
//                 <th>Minutes</th>
//                 <th>LLM Cost</th>
//                 <th>Credits</th>
//               </tr>
//             </thead>
//             <tbody>
//               {agents.map((a, i) => (
//                 <tr key={i} className="border-t">
//                   <td>{a.name}</td>
//                   <td>{a.calls}</td>
//                   <td>{a.minutes}</td>
//                   <td>{a.llmCost}</td>
//                   <td>{a.credits}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         <div>
//           <h3 className="font-semibold">Language</h3>
//           <div className="mt-2">
//             <div className="mb-2">
//               <div className="flex justify-between">
//                 <span>Hindi</span>
//                 <span>57.9%</span>
//               </div>
//               <div className="bg-gray-200 h-2 rounded-full">
//                 <div className="bg-black h-2 rounded-full" style={{ width: '58%' }}></div>
//               </div>
//             </div>
//             <div>
//               <div className="flex justify-between">
//                 <span>English</span>
//                 <span>42.1%</span>
//               </div>
//               <div className="bg-gray-200 h-2 rounded-full">
//                 <div className="bg-black h-2 rounded-full" style={{ width: '42%' }}></div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

export default function Dashboard() {
  const agents = [
    { name: 'New agent', calls: 41, minutes: 56, llmCost: 0.97, credits: 24964 },
    { name: 'Kurumba', calls: 38, minutes: 35, llmCost: 0.25, credits: 15811 },
    { name: 'Tupac the great', calls: 14, minutes: 4, llmCost: 0.051, credits: 1737 },
  ];

  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [activeStat, setActiveStat] = useState<string | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredAgents = selectedAgent
    ? agents.filter(agent => agent.name === selectedAgent)
    : agents;

  const labels = [
    'May 18', 'May 20', 'May 22', 'May 24', 'May 26', 'May 28', 'May 30',
    'Jun 01', 'Jun 03', 'Jun 05', 'Jun 07', 'Jun 09', 'Jun 11', 'Jun 13', 'Jun 15'
  ];

  const defaultCallsData = [5, 18, 4, 7, 19, 5, 2, 1, 3, 4, 7, 6, 9, 17, 0];

  const generateStatData = () => {
    if (!activeStat) return defaultCallsData;

    switch (activeStat) {
      case 'calls':
        return filteredAgents.length
          ? labels.map((_, i) => Math.round(filteredAgents.reduce((sum, a) => sum + a.calls, 0) * (i / (labels.length / 2))))
          : defaultCallsData;
      case 'minutes':
        return filteredAgents.length
          ? labels.map((_, i) => Math.round(filteredAgents.reduce((sum, a) => sum + a.minutes, 0) * (i / (labels.length / 2))))
          : defaultCallsData;
      case 'credits':
        return filteredAgents.length
          ? labels.map((_, i) => Math.round(filteredAgents.reduce((sum, a) => sum + a.credits, 0) * (i / (labels.length / 2))))
          : defaultCallsData;
      case 'llmCost':
        return filteredAgents.length
          ? labels.map((_, i) => Number(((filteredAgents.reduce((sum, a) => sum + a.llmCost, 0)) * (i / (labels.length / 2))).toFixed(2)))
          : defaultCallsData;
      case 'averageCost': {
        const totalCalls = filteredAgents.reduce((sum, a) => sum + a.calls, 0);
        const totalCredits = filteredAgents.reduce((sum, a) => sum + a.credits, 0);
        const avgCost = totalCalls === 0 ? 0 : totalCredits / totalCalls;
        return labels.map((_, i) => Number((avgCost * (i / (labels.length / 2))).toFixed(2)));
      }
      case 'averageLlmCost': {
        const totalMinutes = filteredAgents.reduce((sum, a) => sum + a.minutes, 0);
        const totalLlmCost = filteredAgents.reduce((sum, a) => sum + a.llmCost, 0);
        const avgLlm = totalMinutes === 0 ? 0 : totalLlmCost / totalMinutes;
        return labels.map((_, i) => Number((avgLlm * (i / (labels.length / 2))).toFixed(3)));
      }
      default:
        return defaultCallsData;
    }
  };

  const lineData = {
    labels,
    datasets: [
      {
        label: activeStat
          ? {
              calls: 'Number of Calls',
              minutes: 'Average Duration (min)',
              credits: 'Total Credits',
              llmCost: 'Total LLM Cost ($)',
              averageCost: 'Average Cost (credits/call)',
              averageLlmCost: 'Average LLM Cost ($/min)',
            }[activeStat] || ''
          : 'Number of Calls',
        data: generateStatData(),
        fill: false,
        borderColor: '#000',
        tension: 0.3,
      },
    ],
  };

  const areaData = {
    labels,
    datasets: [
      {
        label: 'Success Rate',
        data: [1, 1, 0.95, 1, 0.8, 1, 1, 0.6, 0.9, 1, 1, 0.7, 1, 1, 0.2],
        backgroundColor: 'rgba(34,197,94,0.6)',
        fill: true,
        borderColor: 'rgba(34,197,94,1)',
        tension: 0.3,
      },
    ],
  };

  const handleStatClick = (stat: string) => {
    if (activeStat === stat) {
      setActiveStat(null);
    } else {
      setActiveStat(stat);
    }
  };

  return (
    <div className="p-8 text-sm font-sans">
      <div className="flex gap-4 items-center">
        <span className="px-2 py-1 rounded-full text-xs flex items-center gap-2 border rounded-xl">
          <span className="relative flex size-3">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-black opacity-75"></span>
            <span className="relative inline-flex size-3 rounded-full bg-black"></span>
          </span>
          Active calls: 0
        </span>
      </div>

      <header className="mt-8 flex justify-between items-center">
        <div>
          <h5 className="text-gray-500">My Workspace</h5>
          <h2 className="text-3xl font-semibold">Good morning, User</h2>
        </div>
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="border rounded-lg px-4 py-2 flex items-center gap-2 bg-white"
          >
            {selectedAgent || 'All Agents'}
            <svg
              className={`w-4 h-4 transition-transform duration-200 ${
                dropdownOpen ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="absolute right-0 mt-1 w-48 bg-white border border-gray-300 rounded-md shadow-lg z-10"
            >
              <li
                key="all"
                className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                  selectedAgent === null ? 'font-semibold bg-gray-200' : ''
                }`}
                onClick={() => {
                  setSelectedAgent(null);
                  setDropdownOpen(false);
                  setActiveStat(null);
                }}
              >
                All Agents
              </li>
              {agents.map(agent => (
                <li
                  key={agent.name}
                  className={`cursor-pointer px-4 py-2 hover:bg-gray-100 ${
                    selectedAgent === agent.name ? 'font-semibold bg-gray-200' : ''
                  }`}
                  onClick={() => {
                    setSelectedAgent(agent.name);
                    setDropdownOpen(false);
                    setActiveStat(null);
                  }}
                >
                  {agent.name}
                </li>
              ))}
            </motion.ul>
          )}
        </div>
      </header>

      <div className="flex flex-nowrap gap-2 mt-8 ml-30 overflow-x-auto">
        <div
          onClick={() => handleStatClick('calls')}
          className={`border border-gray-400 rounded-xl p-3 w-[150px] cursor-pointer select-none ${
            activeStat === 'calls' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <p className="text-gray-500">Number of calls</p>
          <p className="font-semibold text-3xl">
            {filteredAgents.reduce((sum, a) => sum + a.calls, 0)}
          </p>
        </div>

        <div
          onClick={() => handleStatClick('minutes')}
          className={`border border-gray-400 rounded-xl p-3 w-[150px] cursor-pointer select-none ${
            activeStat === 'minutes' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <p className="text-gray-500">Average duration</p>
          <p className="font-semibold text-3xl">
            {filteredAgents.length === 0
              ? 0
              : Math.floor(filteredAgents.reduce((sum, a) => sum + a.minutes, 0) / filteredAgents.length)}
            :00
          </p>
        </div>

        <div
          onClick={() => handleStatClick('credits')}
          className={`border border-gray-400 rounded-xl p-3 w-[230px] cursor-pointer select-none ${
            activeStat === 'credits' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <p className="text-gray-500">Total cost</p>
          <p className="font-semibold text-3xl">
            {filteredAgents.reduce((sum, a) => sum + a.credits, 0).toLocaleString()}{' '}
            <span className="text-base font-normal">credits</span>
          </p>
        </div>

        <div
          onClick={() => handleStatClick('averageCost')}
          className={`border border-gray-400 rounded-xl p-3 w-[234px] cursor-pointer select-none ${
            activeStat === 'averageCost' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <p className="text-gray-500">Average cost</p>
          <p className="font-semibold text-3xl">
            {filteredAgents.reduce((sum, a) => sum + a.calls, 0) === 0
              ? 0
              : Math.floor(
                  filteredAgents.reduce((sum, a) => sum + a.credits, 0) /
                    filteredAgents.reduce((sum, a) => sum + a.calls, 0)
                ).toLocaleString()}{' '}
            <span className="text-base font-normal">credits/call</span>
          </p>
        </div>

        <div
          onClick={() => handleStatClick('llmCost')}
          className={`border border-gray-400 rounded-xl p-3 w-[210px] cursor-pointer select-none ${
            activeStat === 'llmCost' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <p className="text-gray-500">Total LLM cost</p>
          <p className="font-semibold text-3xl">
            $
            {filteredAgents
              .reduce((sum, a) => sum + a.llmCost, 0)
              .toFixed(2)}{' '}
            <span className="text-base font-normal">USD</span>
          </p>
        </div>

        <div
          onClick={() => handleStatClick('averageLlmCost')}
          className={`border border-gray-400 rounded-xl p-3 w-[200px] cursor-pointer select-none ${
            activeStat === 'averageLlmCost' ? 'bg-gray-200 font-semibold' : ''
          }`}
        >
          <p className="text-gray-500">Average LLM cost</p>
          <p className="font-semibold text-3xl">
            $
            {filteredAgents.reduce((sum, a) => sum + a.minutes, 0) === 0
              ? 0
              : (
                  filteredAgents.reduce((sum, a) => sum + a.llmCost, 0) /
                  filteredAgents.reduce((sum, a) => sum + a.minutes, 0)
                ).toFixed(3)}{' '}
            <span className="text-base font-normal">/min</span>
          </p>
        </div>
      </div>

      <div className="mt-8">
        <div className="h-[500px] w-full ml-[200px]">
          <Line data={lineData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-2">Overall Success Rate</h3>
        <div className="h-[500px] w-full ml-[200px]">
          <Line data={areaData} options={{ responsive: true }} />
        </div>
      </div>

      <div className="grid grid-cols-2 mt-8 gap-8">
        <div>
          <h3 className="font-semibold">Most called agents</h3>
          <table className="w-full text-left mt-2">
            <thead>
              <tr className="text-gray-500">
                <th>Agent name</th>
                <th>Calls</th>
                <th>Minutes</th>
                <th>LLM Cost</th>
                <th>Credits</th>
              </tr>
            </thead>
            <tbody>
              {filteredAgents.map((a, i) => (
                <tr key={i} className="border-t">
                  <td>{a.name}</td>
                  <td>{a.calls}</td>
                  <td>{a.minutes}</td>
                  <td>${a.llmCost.toFixed(3)}</td>
                  <td>{a.credits.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <h3 className="font-semibold">Language</h3>
          <div className="mt-2">
            <div className="mb-2">
              <div className="flex justify-between">
                <span>Hindi</span>
                <span>57.9%</span>
              </div>
              <div className="bg-gray-200 h-2 rounded-full">
                <div className="bg-black h-2 rounded-full" style={{ width: '58%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between">
                <span>English</span>
                <span>42.1%</span>
              </div>
              <div className="bg-gray-200 h-2 rounded-full">
                <div className="bg-black h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


