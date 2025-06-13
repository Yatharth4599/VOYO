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
import { Menu, X } from 'lucide-react';

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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return router.push('/');

    fetch('http://3.83.195.172:3000/users/agents', {
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

    const res = await fetch(`http://10.12.26.215:3000/users/agents/${agentId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (res.ok) {
      setAgents((prev) => prev.filter((a) => a.agent_id !== agentId));
    }
  };

  if (loading) return <div className="text-white text-center mt-20">Loading...</div>;
  if (error) return <div className="text-red-500 text-center mt-20">{error}</div>;

  return (
    <div className="min-h-screen bg-black text-white font-sans px-8 py-12 relative overflow-hidden">

      {/* Backdrop */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-black bg-opacity-50"
          onClick={() => setIsMenuOpen(false)}
        />
      )}

      {/* Sidebar */}
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: isMenuOpen ? 0 : -250 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="fixed top-0 left-0 w-64 h-full bg-[#121212] z-50 shadow-lg p-6 pt-8"
      >
         <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Menu</h2>
          <button onClick={() => setIsMenuOpen(false)}>
            <X size={24} className="text-white cursor-pointer" />
          </button>
        </div>
        <nav className="flex flex-col gap-6 mt-8">
          <button
            onClick={() => {
              router.push('/dashboard');
              setIsMenuOpen(false);
            }}
            className="text-lg hover:text-orange-400 text-left cursor-pointer"
          >
            Agents
          </button>
          <button
            onClick={() => {
              router.push('/knowledge-base');
              setIsMenuOpen(false);
            }}
            className="text-lg hover:text-orange-400 text-left cursor-pointer"
          >
            Knowledge Base
          </button>
        </nav>
      </motion.div>

      {/* Top Navbar */}
      <div className="flex items-center gap-4 mb-10 relative z-40">
        <button
          onClick={() => setIsMenuOpen(true)}
          className="text-white focus:outline-none cursor-pointer hover:bg-orange-500"
        >
          <Menu size={28} />
        </button>
        <Image src="/Voyo Black Logo.png" alt="Voyo Logo" width={60} height={60} />
        <h1 className="text-3xl font-bold">Your Agents</h1>
        <button
          onClick={() => router.push('/create-agent')}
          className="ml-auto bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg text-lg font-semibold cursor-pointer"
        >
          Create New Agent
        </button>
      </div>

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
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg text-lg font-semibold"
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
              className="bg-[#1a1a1a] rounded-xl p-6 flex justify-between items-center shadow-md hover:shadow-orange-400/20 transition-all"
              whileHover={{ scale: 1.01 }}
            >
              <div>
                <h3 className="text-xl font-semibold">{agent.name}</h3>
                <p className="text-sm text-gray-400">
                  Created: {new Date(agent.created_at_unix_secs * 1000).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(agent.agent_id)}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg cursor-pointer"
              >
                Delete
              </button>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
}
