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


'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
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

export default function Dashboard() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [modalStep, setModalStep] = useState<'initial' | 'phone' | 'addPhone' | 'connectPhone' | 'web'>('initial');
  const [phoneInput, setPhoneInput] = useState('');
  const [selectedPhone, setSelectedPhone] = useState('');
  const [copied, setCopied] = useState(false);
  const [newPhoneNumber, setNewPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState('');



  const router = useRouter();

  const phoneNumbers = ['+1 234-567-8901', '+91 9988776655', '+44 7123 456789'];

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

  const handleDeployClick = () => {
    setShowModal(true);
    setModalStep('initial');
  };

  const handleAddPhone = () => {
    console.log('Phone added:', phoneInput);
    setPhoneInput('');
    setShowModal(false);
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
                  onClick={handleDeployClick}
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

      {/* Modal Section */}
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

              {/* Initial Modal */}
              {modalStep === 'initial' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Deploy Options</h2>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setModalStep('phone')}
                      className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Phone Number
                    </button>
                    <button
                      onClick={() => setModalStep('web')}
                      className="bg-purple-600 hover:bg-purple-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Web
                    </button>
                  </div>
                </>
              )}

              {/* Phone Number Menu */}
              {modalStep === 'phone' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Phone Number Deployment</h2>
                  <div className="flex flex-col gap-4">
                    <button
                      onClick={() => setModalStep('addPhone')}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Add Phone
                    </button>
                    <button
                      onClick={() => setModalStep('connectPhone')}
                      className="bg-teal-600 hover:bg-teal-700 text-white py-3 px-6 rounded-xl font-semibold transition cursor-pointer"
                    >
                      Connect Phone Number
                    </button>
                  </div>
                </>
              )}

              {/* Add Phone */}
              {modalStep === 'addPhone' && (
                <>
                  <h2 className="text-2xl font-bold mb-4 text-gray-800">Add</h2>
                  <input
                    type="text"
                    placeholder="Enter phone number"
                    value={newPhoneNumber}
                    onChange={(e) => {
                      setNewPhoneNumber(e.target.value);
                      setPhoneNumberError('');
                    }}
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 mb-2"
                  />
                  {phoneNumberError && (
                    <p className="text-red-600 text-sm mb-2">{phoneNumberError}</p>
                  )}
                  <button
                    onClick={() => {
                      if (!newPhoneNumber.trim()) {
                        setPhoneNumberError('Please enter a phone number');

                        // Auto-clear error message after 3 seconds
                        setTimeout(() => setPhoneNumberError(''), 3000);
                        return;
                      }

                      // Success logic
                      setPhoneNumberError('');
                      console.log('Phone number added:', newPhoneNumber);
                      setNewPhoneNumber('');
                      setModalStep('phone');
                    }}

                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-lg font-semibold transition cursor-pointer"
                  >
                    Add
                  </button>
                </>
              )}

              {/* Connect Phone */}
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
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition cursor-pointer"
                  >
                    Connect
                  </button>
                </>
              )}

              {/* Web Integration Code View */}
              {modalStep === 'web' && (
                <>
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">Integrate</h2>
                  <pre className="bg-gray-100 text-left text-sm rounded-xl p-4 overflow-auto text-gray-800 font-mono mb-4">
              {`<script src="https://your-awesome-agent.com/widget.js"></script>
              <script>
                AgentWidget.init({ apiKey: 'YOUR_API_KEY' });
              </script>`}
                  </pre>
                  <button
                    onClick={() => {
                        navigator.clipboard.writeText(`<script src="https://your-awesome-agent.com/widget.js"></script>
              <script>
                AgentWidget.init({ apiKey: 'YOUR_API_KEY' });
              </script>`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-xl font-semibold transition cursor-pointer"
                  >
                    {copied ? 'Copied!' : 'Copy Code'}
                  </button>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </NavigationLayout>
  );
}
