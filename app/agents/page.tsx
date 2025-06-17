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


'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Edit, Trash2 } from 'lucide-react';
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

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

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
  }, []);

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

  if (loading) return <div className="text-gray-800 text-center mt-20">Loading...</div>;
  if (error) return <div className="text-red-600 text-center mt-20">{error}</div>;

  return (
    <NavigationLayout 
      title="Your Agents" 
      currentPage="/dashboard"
      showCreateButton={true}
      onCreateClick={() => router.push('/create-agent')}
      createButtonText="Create New Agent"
    >

      {/* Agent Content */}
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
    </NavigationLayout>
  );
}
