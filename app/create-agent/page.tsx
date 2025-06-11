// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FaMicrophone, FaUpload, FaPaperPlane, FaCheckCircle, FaUserAlt } from 'react-icons/fa';
// import Image from 'next/image';

// export default function CreateAgentPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: '',
//     language: 'hi',
//     firstMessage: '',
//     speed: 0.8,
//     promptText: '',
//     knowledgeUrl: '',
//     knowledgeFile: null as File | null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showFileModal, setShowFileModal] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const target = e.target;
//     const { name } = target;

//     if (target instanceof HTMLInputElement && target.type === 'file') {
//       setForm((prev) => ({ ...prev, [name]: target.files?.[0] ?? null }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: target.value }));
//     }
//   };

//   const handleCreate = async () => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return alert('Not authorized');

//     const payload = {
//       name: form.name,
//       conversation_config: {
//         asr: {
//           quality: 'high',
//           provider: 'elevenlabs',
//           user_input_audio_format: 'pcm_16000',
//           keywords: [],
//         },
//         turn: {
//           turn_timeout: 7,
//           silence_end_call_timeout: -1,
//           mode: 'turn',
//         },
//         tts: {
//           model_id: 'eleven_flash_v2_5',
//           voice_id: 'vghiSqG5ezdhd8F3tKAD',
//           supported_voices: [],
//           agent_output_audio_format: 'pcm_16000',
//           optimize_streaming_latency: 3,
//           stability: 0.5,
//           speed: parseFloat(form.speed.toString()),
//           similarity_boost: 0.8,
//           pronunciation_dictionary_locators: [],
//         },
//         conversation: {
//           text_only: false,
//           max_duration_seconds: 300,
//           client_events: ['audio', 'interruption', 'user_transcript', 'agent_response', 'agent_response_correction'],
//         },
//         language_presets: {},
//         agent: {
//           first_message: form.firstMessage,
//           language: form.language,
//           dynamic_variables: { dynamic_variable_placeholders: {} },
//           prompt: { prompt: form.promptText },
//           llm: 'gpt-4o',
//           temperature: 0.5,
//           max_tokens: -1,
//           tools: [],
//           tool_ids: ['pGa1HnYGPglmSrnbSnUa', '6NaWCAa9jwrECZJISecs'],
//           mcp_server_ids: [],
//           native_mcp_server_ids: [],
//           knowledge_base: [],
//           custom_llm: null,
//           ignore_default_personality: false,
//           rag: {
//             enabled: true,
//             embedding_model: 'multilingual_e5_large_instruct',
//             max_vector_distance: 0.6,
//             max_documents_length: 50000,
//             max_retrieved_rag_chunks_count: 20,
//           },
//         },
//       },
//       platform_settings: {
//         auth: { enable_auth: false, allowlist: [], shareable_token: null },
//         evaluation: { criteria: [] },
//         widget: {
//           variant: 'compact',
//           placement: 'bottom-right',
//           avatar: { type: 'orb', color_1: '#2792DC', color_2: '#9CE6E6' },
//         },
//         data_collection: {},
//         overrides: {
//           conversation_config_override: {
//             tts: { voice_id: false },
//             agent: { language: true },
//           },
//         },
//         call_limits: { agent_concurrency_limit: -1, daily_limit: 100000 },
//         privacy: {
//           record_voice: true,
//           retention_days: 730,
//           delete_transcript_and_pii: true,
//           delete_audio: true,
//         },
//         workspace_overrides: {
//           conversation_initiation_client_data_webhook: null,
//           webhooks: { post_call_webhook_id: null },
//         },
//         safety: { is_blocked_ivc: false, is_blocked_non_ivc: false },
//       },
//       tags: [],
//     };

//     setLoading(true);
//     try {
//       const res = await fetch('http://10.12.26.69:3000/agents', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error('Failed to create agent');
//       router.push('/dashboard');
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('Unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div className="min-h-screen bg-gradient-to-tr from-[#0F1117] to-[#070A0F] text-white px-8 py-12 max-w-7xl mx-auto flex gap-12 relative overflow-hidden">
//       <Image src="/stars-bg.svg" alt="background" fill className="absolute opacity-10 object-cover" />

//       <div className="flex-1 space-y-10 z-10">
//         <h1 className="text-4xl font-bold text-lime-400 tracking-tight flex items-center gap-2">
//           <FaUserAlt className="text-lime-400" /> Create Your AI Agent
//         </h1>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Agent Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Urvashi Clone" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Language</label>
//             <input name="language" value={form.language} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">First Message</label>
//             <input name="firstMessage" value={form.firstMessage} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Voice Speed</label>
//             <input name="speed" value={form.speed} onChange={handleChange} type="number" step="0.1" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>
//         </div>

//         <div>
//           <label className="text-sm text-gray-400 block mb-1">System Prompt</label>
//           <textarea name="promptText" value={form.promptText} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Knowledge Base URL</label>
//             <input name="knowledgeUrl" value={form.knowledgeUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>
//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Upload Knowledge File</label>
//             <button onClick={() => setShowFileModal(true)} className="flex items-center gap-2 w-full px-4 py-3 bg-lime-500 hover:bg-lime-600 rounded-xl font-medium text-black">
//               <FaUpload /> Upload File
//             </button>
//           </div>
//         </div>
        
//         {error && <p className="text-red-400 mt-4">{error}</p>}

//         <div className="flex justify-end mt-8">
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handleCreate}
//             disabled={loading}
//             className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-xl text-lg font-semibold"
//           >
//             <FaPaperPlane /> {loading ? 'Creating...' : 'Create Agent'}
//           </motion.button>
//         </div>
//       </div>
//       <div className="hidden md:flex flex-col justify-between w-72 p-6 rounded-xl bg-[#121720] border border-[#2A2F45] shadow-xl z-10">
//         <div>
//           <h2 className="text-xl font-bold text-lime-300 mb-4">Agent Preview</h2>
//           <div className="w-full h-40 bg-[#181D2B] rounded-lg flex items-center justify-center text-5xl text-gray-500 animate-pulse">
//             <FaMicrophone />
//           </div>
//           <p className="text-sm text-gray-400 mt-4">Configure language, voice, prompt and knowledge base to give your AI agent a personality.</p>
//         </div>

//         <div className="space-y-2 mt-10 text-sm">
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Identity
//           </div>
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Behavior
//           </div>
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Knowledge
//           </div>
//         </div>
//       </div>

//       {showFileModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-[#111] p-6 rounded-xl w-96" onClick={(e) => e.stopPropagation()}>
//             <h3 className="text-white text-lg font-semibold mb-4">Upload Knowledge Base File</h3>
//             <input type="file" name="knowledgeFile" onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white" />
//             <div className="flex justify-end gap-4 mt-4">
//               <button onClick={() => setShowFileModal(false)} className="bg-gray-700 px-4 py-2 rounded">Cancel</button>
//               <button onClick={() => setShowFileModal(false)} className="bg-lime-500 px-4 py-2 rounded text-black">Done</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }







// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FaMicrophone, FaUpload, FaPaperPlane, FaCheckCircle, FaUserAlt } from 'react-icons/fa';
// import Image from 'next/image';

// export default function CreateAgentPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: '',
//     language: 'hi',
//     firstMessage: '',
//     speed: 0.8,
//     promptText: '',
//     knowledgeUrl: '',
//     knowledgeFile: null as File | null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showFileModal, setShowFileModal] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const target = e.target;
//     const { name } = target;

//     if (target instanceof HTMLInputElement && target.type === 'file') {
//       setForm((prev) => ({ ...prev, [name]: target.files?.[0] ?? null }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: target.value }));
//     }
//   };

//   const handleCreate = async () => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return alert('Not authorized');

//     const payload = {
//       name: form.name,
//       conversation_config: {
//         asr: {
//           quality: 'high',
//           provider: 'elevenlabs',
//           user_input_audio_format: 'pcm_16000',
//           keywords: [],
//         },
//         turn: {
//           turn_timeout: 7,
//           silence_end_call_timeout: -1,
//           mode: 'turn',
//         },
//         tts: {
//           model_id: 'eleven_flash_v2_5',
//           voice_id: 'vghiSqG5ezdhd8F3tKAD',
//           supported_voices: [],
//           agent_output_audio_format: 'pcm_16000',
//           optimize_streaming_latency: 3,
//           stability: 0.5,
//           speed: parseFloat(form.speed.toString()),
//           similarity_boost: 0.8,
//           pronunciation_dictionary_locators: [],
//         },
//         conversation: {
//           text_only: false,
//           max_duration_seconds: 300,
//           client_events: ['audio', 'interruption', 'user_transcript', 'agent_response', 'agent_response_correction'],
//         },
//         language_presets: {},
//         agent: {
//           first_message: form.firstMessage,
//           language: form.language,
//           dynamic_variables: { dynamic_variable_placeholders: {} },
//           prompt: { prompt: form.promptText },
//           llm: 'gpt-4o',
//           temperature: 0.5,
//           max_tokens: -1,
//           tools: [],
//           tool_ids: ['pGa1HnYGPglmSrnbSnUa', '6NaWCAa9jwrECZJISecs'],
//           mcp_server_ids: [],
//           native_mcp_server_ids: [],
//           knowledge_base: [],
//           custom_llm: null,
//           ignore_default_personality: false,
//           rag: {
//             enabled: true,
//             embedding_model: 'multilingual_e5_large_instruct',
//             max_vector_distance: 0.6,
//             max_documents_length: 50000,
//             max_retrieved_rag_chunks_count: 20,
//           },
//         },
//       },
//       platform_settings: {
//         auth: { enable_auth: false, allowlist: [], shareable_token: null },
//         evaluation: { criteria: [] },
//         widget: {
//           variant: 'compact',
//           placement: 'bottom-right',
//           avatar: { type: 'orb', color_1: '#2792DC', color_2: '#9CE6E6' },
//         },
//         data_collection: {},
//         overrides: {
//           conversation_config_override: {
//             tts: { voice_id: false },
//             agent: { language: true },
//           },
//         },
//         call_limits: { agent_concurrency_limit: -1, daily_limit: 100000 },
//         privacy: {
//           record_voice: true,
//           retention_days: 730,
//           delete_transcript_and_pii: true,
//           delete_audio: true,
//         },
//         workspace_overrides: {
//           conversation_initiation_client_data_webhook: null,
//           webhooks: { post_call_webhook_id: null },
//         },
//         safety: { is_blocked_ivc: false, is_blocked_non_ivc: false },
//       },
//       tags: [],
//     };

//     setLoading(true);
//     try {
//       const res = await fetch('http://10.12.26.215:3000/agents', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error('Failed to create agent');
//       router.push('/dashboard');
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('Unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div className="min-h-screen bg-gradient-to-tr from-[#0F1117] to-[#070A0F] text-white px-8 py-12 max-w-7xl mx-auto flex gap-12 relative overflow-hidden">
//       <Image src="/stars-bg.svg" alt="background" fill className="absolute opacity-10 object-cover" />

//       <div className="flex-1 space-y-10 z-10">
//         <h1 className="text-4xl font-bold text-lime-400 tracking-tight flex items-center gap-2">
//           <FaUserAlt className="text-lime-400" /> Create Your AI Agent
//         </h1>
//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Agent Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Urvashi Clone" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Language</label>
//             <input name="language" value={form.language} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">First Message</label>
//             <input name="firstMessage" value={form.firstMessage} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Voice Speed</label>
//             <input name="speed" value={form.speed} onChange={handleChange} type="number" step="0.1" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>
//         </div>

//         <div>
//           <label className="text-sm text-gray-400 block mb-1">System Prompt</label>
//           <textarea name="promptText" value={form.promptText} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Knowledge Base URL</label>
//             <input name="knowledgeUrl" value={form.knowledgeUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>
//           <div className="flex flex-col gap-3">
//             <div>
//               <label className="text-sm text-gray-400 block mb-1">Upload Knowledge File</label>
//               <button onClick={() => setShowFileModal(true)} className="flex items-center gap-2 w-full px-4 py-3 bg-lime-500 hover:bg-lime-600 rounded-xl font-medium text-black">
//                 <FaUpload /> Upload File
//               </button>
//             </div>

//             <div>
//               <label className="text-sm text-gray-400 block mb-1">Or Select a File</label>
//               <select
//                 className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
//                 onChange={(e) => {
//                   const selectedFile = e.target.value;
//                   setForm((prev) => ({
//                     ...prev,
//                     knowledgeUrl: `http://your-server.com/files/${selectedFile}`,
//                   }));
//                 }}
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   -- Choose a file --
//                 </option>
//                 <option value="faq.txt">faq.txt</option>
//                 <option value="welcome.txt">welcome.txt</option>
//                 <option value="intro.txt">intro.txt</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {error && <p className="text-red-400 mt-4">{error}</p>}

//         <div className="flex justify-end mt-8">
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handleCreate}
//             disabled={loading}
//             className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-xl text-lg font-semibold"
//           >
//             <FaPaperPlane /> {loading ? 'Creating...' : 'Create Agent'}
//           </motion.button>
//         </div>
//       </div>

//       <div className="hidden md:flex flex-col justify-between w-72 p-6 rounded-xl bg-[#121720] border border-[#2A2F45] shadow-xl z-10">
//         <div>
//           <h2 className="text-xl font-bold text-lime-300 mb-4">Agent Preview</h2>
//           <div className="w-full h-40 bg-[#181D2B] rounded-lg flex items-center justify-center text-5xl text-gray-500 animate-pulse">
//             <FaMicrophone />
//           </div>
//           <p className="text-sm text-gray-400 mt-4">Configure language, voice, prompt and knowledge base to give your AI agent a personality.</p>
//         </div>

//         <div className="space-y-2 mt-10 text-sm">
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Identity
//           </div>
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Behavior
//           </div>
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Knowledge
//           </div>
//         </div>
//       </div>

//       {showFileModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-[#111] p-6 rounded-xl w-96" onClick={(e) => e.stopPropagation()}>
//             <h3 className="text-white text-lg font-semibold mb-4">Upload Knowledge Base File</h3>
//             <input type="file" name="knowledgeFile" onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white" />
//             <div className="flex justify-end gap-4 mt-4">
//               <button onClick={() => setShowFileModal(false)} className="bg-gray-700 px-4 py-2 rounded">Cancel</button>
//               <button onClick={() => setShowFileModal(false)} className="bg-lime-500 px-4 py-2 rounded text-black">Done</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }


// 'use client';

// import { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { FaMicrophone, FaUpload, FaPaperPlane, FaCheckCircle, FaUserAlt } from 'react-icons/fa';
// import Image from 'next/image';

// export default function CreateAgentPage() {
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: '',
//     language: 'hi',
//     firstMessage: '',
//     speed: 0.8,
//     promptText: '',
//     knowledgeUrl: '',
//     knowledgeFile: null as File | null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [showFileModal, setShowFileModal] = useState(false);

//   const handleChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
//   ) => {
//     const target = e.target;
//     const { name } = target;

//     if (target instanceof HTMLInputElement && target.type === 'file') {
//       setForm((prev) => ({ ...prev, [name]: target.files?.[0] ?? null }));
//     } else {
//       setForm((prev) => ({ ...prev, [name]: target.value }));
//     }
//   };

//   const handleCreate = async () => {
//     const token = localStorage.getItem('jwtToken');
//     if (!token) return alert('Not authorized');

//     const payload = {
//       name: form.name,
//       conversation_config: {
//         asr: {
//           quality: 'high',
//           provider: 'elevenlabs',
//           user_input_audio_format: 'pcm_16000',
//           keywords: [],
//         },
//         turn: {
//           turn_timeout: 7,
//           silence_end_call_timeout: -1,
//           mode: 'turn',
//         },
//         tts: {
//           model_id: 'eleven_flash_v2_5',
//           voice_id: 'vghiSqG5ezdhd8F3tKAD',
//           supported_voices: [],
//           agent_output_audio_format: 'pcm_16000',
//           optimize_streaming_latency: 3,
//           stability: 0.5,
//           speed: parseFloat(form.speed.toString()),
//           similarity_boost: 0.8,
//           pronunciation_dictionary_locators: [],
//         },
//         conversation: {
//           text_only: false,
//           max_duration_seconds: 300,
//           client_events: ['audio', 'interruption', 'user_transcript', 'agent_response', 'agent_response_correction'],
//         },
//         language_presets: {},
//         agent: {
//           first_message: form.firstMessage,
//           language: form.language,
//           dynamic_variables: { dynamic_variable_placeholders: {} },
//           prompt: { prompt: form.promptText },
//           llm: 'gpt-4o',
//           temperature: 0.5,
//           max_tokens: -1,
//           tools: [],
//           tool_ids: ['pGa1HnYGPglmSrnbSnUa', '6NaWCAa9jwrECZJISecs'],
//           mcp_server_ids: [],
//           native_mcp_server_ids: [],
//           knowledge_base: [],
//           custom_llm: null,
//           ignore_default_personality: false,
//           rag: {
//             enabled: true,
//             embedding_model: 'multilingual_e5_large_instruct',
//             max_vector_distance: 0.6,
//             max_documents_length: 50000,
//             max_retrieved_rag_chunks_count: 20,
//           },
//         },
//       },
//       platform_settings: {
//         auth: { enable_auth: false, allowlist: [], shareable_token: null },
//         evaluation: { criteria: [] },
//         widget: {
//           variant: 'compact',
//           placement: 'bottom-right',
//           avatar: { type: 'orb', color_1: '#2792DC', color_2: '#9CE6E6' },
//         },
//         data_collection: {},
//         overrides: {
//           conversation_config_override: {
//             tts: { voice_id: false },
//             agent: { language: true },
//           },
//         },
//         call_limits: { agent_concurrency_limit: -1, daily_limit: 100000 },
//         privacy: {
//           record_voice: true,
//           retention_days: 730,
//           delete_transcript_and_pii: true,
//           delete_audio: true,
//         },
//         workspace_overrides: {
//           conversation_initiation_client_data_webhook: null,
//           webhooks: { post_call_webhook_id: null },
//         },
//         safety: { is_blocked_ivc: false, is_blocked_non_ivc: false },
//       },
//       tags: [],
//     };

//     setLoading(true);
//     try {
//       const res = await fetch('http://10.12.26.215:3000/agents', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(payload),
//       });

//       if (!res.ok) throw new Error('Failed to create agent');
//       router.push('/dashboard');
//     } catch (err: unknown) {
//       if (err instanceof Error) {
//         setError(err.message);
//       } else {
//         setError('Unknown error occurred');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <motion.div className="min-h-screen bg-gradient-to-tr from-[#0F1117] to-[#070A0F] text-white px-16 py-12 w-full flex gap-12 relative overflow-hidden">
//       <Image src="/stars-bg.svg" alt="background" fill className="absolute opacity-10 object-cover" />

//       <div className="flex-1 space-y-10 z-10">
//         <h1 className="text-4xl font-bold text-lime-400 tracking-tight flex items-center gap-2">
//           <FaUserAlt className="text-lime-400" /> Create Your AI Agent
//         </h1>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Agent Name</label>
//             <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Urvashi Clone" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Language</label>
//             <input name="language" value={form.language} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">First Message</label>
//             <input name="firstMessage" value={form.firstMessage} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>

//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Voice Speed</label>
//             <input name="speed" value={form.speed} onChange={handleChange} type="number" step="0.1" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>
//         </div>

//         <div>
//           <label className="text-sm text-gray-400 block mb-1">System Prompt</label>
//           <textarea name="promptText" value={form.promptText} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//         </div>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div>
//             <label className="text-sm text-gray-400 block mb-1">Knowledge Base URL</label>
//             <input name="knowledgeUrl" value={form.knowledgeUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
//           </div>
//           <div className="flex flex-col gap-3">
//             <div>
//               <label className="text-sm text-gray-400 block mb-1">Upload Knowledge File</label>
//               <button onClick={() => setShowFileModal(true)} className="flex items-center gap-2 w-full px-4 py-3 bg-lime-500 hover:bg-lime-600 rounded-xl font-medium text-black">
//                 <FaUpload /> Upload File
//               </button>
//             </div>

//             <div>
//               <label className="text-sm text-gray-400 block mb-1">Or Select a File</label>
//               <select
//                 className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
//                 onChange={(e) => {
//                   const selectedFile = e.target.value;
//                   setForm((prev) => ({
//                     ...prev,
//                     knowledgeUrl: `http://your-server.com/files/${selectedFile}`,
//                   }));
//                 }}
//                 defaultValue=""
//               >
//                 <option value="" disabled>
//                   -- Choose a file --
//                 </option>
//                 <option value="faq.txt">faq.txt</option>
//                 <option value="welcome.txt">welcome.txt</option>
//                 <option value="intro.txt">intro.txt</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {error && <p className="text-red-400 mt-4">{error}</p>}

//         <div className="flex justify-end mt-8">
//           <motion.button
//             whileHover={{ scale: 1.03 }}
//             whileTap={{ scale: 0.97 }}
//             onClick={handleCreate}
//             disabled={loading}
//             className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-xl text-lg font-semibold"
//           >
//             <FaPaperPlane /> {loading ? 'Creating...' : 'Create Agent'}
//           </motion.button>
//         </div>
//       </div>

//       <div className="hidden md:flex flex-col justify-between w-72 p-6 rounded-xl bg-[#121720] border border-[#2A2F45] shadow-xl z-10">
//         <div>
//           <h2 className="text-xl font-bold text-lime-300 mb-4">Agent Preview</h2>
//           <div className="w-full h-40 bg-[#181D2B] rounded-lg flex items-center justify-center text-5xl text-gray-500 animate-pulse">
//             <FaMicrophone />
//           </div>
//           <p className="text-sm text-gray-400 mt-4">Configure language, voice, prompt and knowledge base to give your AI agent a personality.</p>
//         </div>

//         <div className="space-y-2 mt-10 text-sm">
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Identity
//           </div>
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Behavior
//           </div>
//           <div className="flex items-center gap-2 text-lime-400">
//             <FaCheckCircle /> Knowledge
//           </div>
//         </div>
//       </div>

//       {showFileModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
//           <div className="bg-[#111] p-6 rounded-xl w-96" onClick={(e) => e.stopPropagation()}>
//             <h3 className="text-white text-lg font-semibold mb-4">Upload Knowledge Base File</h3>
//             <input type="file" name="knowledgeFile" onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white" />
//             <div className="flex justify-end gap-4 mt-4">
//               <button onClick={() => setShowFileModal(false)} className="bg-gray-700 px-4 py-2 rounded">Cancel</button>
//               <button onClick={() => setShowFileModal(false)} className="bg-lime-500 px-4 py-2 rounded text-black">Done</button>
//             </div>
//           </div>
//         </div>
//       )}
//     </motion.div>
//   );
// }




'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { FaBars, FaMicrophone, FaUpload, FaPaperPlane, FaCheckCircle, FaUserAlt, FaTimes } from 'react-icons/fa';
import Image from 'next/image';

export default function CreateAgentPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    language: 'hi',
    firstMessage: '',
    speed: 0.8,
    promptText: '',
    knowledgeUrl: '',
    knowledgeFile: null as File | null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showFileModal, setShowFileModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const target = e.target;
    const { name } = target;

    if (target instanceof HTMLInputElement && target.type === 'file') {
      setForm((prev) => ({ ...prev, [name]: target.files?.[0] ?? null }));
    } else {
      setForm((prev) => ({ ...prev, [name]: target.value }));
    }
  };

  const handleCreate = async () => {
    const token = localStorage.getItem('jwtToken');
    if (!token) return alert('Not authorized');

    const payload = {
      name: form.name,
      conversation_config: {
        asr: {
          quality: 'high',
          provider: 'elevenlabs',
          user_input_audio_format: 'pcm_16000',
          keywords: [],
        },
        turn: {
          turn_timeout: 7,
          silence_end_call_timeout: -1,
          mode: 'turn',
        },
        tts: {
          model_id: 'eleven_flash_v2_5',
          voice_id: 'vghiSqG5ezdhd8F3tKAD',
          supported_voices: [],
          agent_output_audio_format: 'pcm_16000',
          optimize_streaming_latency: 3,
          stability: 0.5,
          speed: parseFloat(form.speed.toString()),
          similarity_boost: 0.8,
          pronunciation_dictionary_locators: [],
        },
        conversation: {
          text_only: false,
          max_duration_seconds: 300,
          client_events: ['audio', 'interruption', 'user_transcript', 'agent_response', 'agent_response_correction'],
        },
        language_presets: {},
        agent: {
          first_message: form.firstMessage,
          language: form.language,
          dynamic_variables: { dynamic_variable_placeholders: {} },
          prompt: { prompt: form.promptText },
          llm: 'gpt-4o',
          temperature: 0.5,
          max_tokens: -1,
          tools: [],
          tool_ids: ['pGa1HnYGPglmSrnbSnUa', '6NaWCAa9jwrECZJISecs'],
          mcp_server_ids: [],
          native_mcp_server_ids: [],
          knowledge_base: [],
          custom_llm: null,
          ignore_default_personality: false,
          rag: {
            enabled: true,
            embedding_model: 'multilingual_e5_large_instruct',
            max_vector_distance: 0.6,
            max_documents_length: 50000,
            max_retrieved_rag_chunks_count: 20,
          },
        },
      },
      platform_settings: {
        auth: { enable_auth: false, allowlist: [], shareable_token: null },
        evaluation: { criteria: [] },
        widget: {
          variant: 'compact',
          placement: 'bottom-right',
          avatar: { type: 'orb', color_1: '#2792DC', color_2: '#9CE6E6' },
        },
        data_collection: {},
        overrides: {
          conversation_config_override: {
            tts: { voice_id: false },
            agent: { language: true },
          },
        },
        call_limits: { agent_concurrency_limit: -1, daily_limit: 100000 },
        privacy: {
          record_voice: true,
          retention_days: 730,
          delete_transcript_and_pii: true,
          delete_audio: true,
        },
        workspace_overrides: {
          conversation_initiation_client_data_webhook: null,
          webhooks: { post_call_webhook_id: null },
        },
        safety: { is_blocked_ivc: false, is_blocked_non_ivc: false },
      },
      tags: [],
    };

    setLoading(true);
    try {
      const res = await fetch('http://10.12.26.215:3000/agents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error('Failed to create agent');
      router.push('/dashboard');
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Unknown error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div className="min-h-screen bg-gradient-to-tr from-[#0F1117] to-[#070A0F] text-white px-6 md:px-16 py-12 w-full flex gap-12 relative overflow-hidden">
      {/* Background Stars */}
      <Image src="/stars-bg.svg" alt="background" fill className="absolute opacity-10 object-cover" />

      {/* Hamburger Menu */}
      {/* <button
        className="absolute top-6 left-6 z-50 text-white cursor-pointer hover:text-lime-400"
        onClick={() => setMenuOpen(true)}
      >
        <FaBars size={24} />
      </button> */}

      {/* Collapsible Menu */}
      {menuOpen && (
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: 0 }}
          exit={{ x: '-100%' }}
          className="fixed top-0 left-0 h-full w-64 bg-[#11151C] z-50 p-6 shadow-2xl space-y-6"
        >
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-lime-400">Menu</h2>
            <button onClick={() => setMenuOpen(false)} className="text-white cursor-pointer">
              <FaTimes size={20} />
            </button>
          </div>
          <ul className="space-y-4">
            <li><a href="/dashboard" className="block text-lg hover:text-lime-300">Dashboard</a></li>
            <li><a href="/agents" className="block text-lg hover:text-lime-300">Agents</a></li>
            <li><a href="/knowledge-base" className="block text-lg hover:text-lime-300">Knowledge Base</a></li>
          </ul>
        </motion.div>
      )}

      {/* Main Content */}
      <div className="flex-1 space-y-10 z-10">
        {/* <h1 className="text-4xl font-bold text-lime-400 tracking-tight flex items-center gap-2">
          <FaUserAlt className="text-lime-400" /> Create Your AI Agent
        </h1> */}
        <div className="flex items-center gap-3">
          <button className="text-white hover:text-lime-400 cursor-pointer" onClick={() => setMenuOpen(true)}>
            <FaBars size={24} />
          </button>
          <h1 className="text-4xl font-bold text-lime-400 tracking-tight flex items-center gap-2">
            <FaUserAlt className="text-lime-400" /> Create Your AI Agent
          </h1>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Agent Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="e.g. Urvashi Clone" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Language</label>
            <input name="language" value={form.language} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">First Message</label>
            <input name="firstMessage" value={form.firstMessage} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>

          <div>
            <label className="text-sm text-gray-400 block mb-1">Voice Speed</label>
            <input name="speed" value={form.speed} onChange={handleChange} type="number" step="0.1" className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-400 block mb-1">System Prompt</label>
          <textarea name="promptText" value={form.promptText} onChange={handleChange} rows={6} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm text-gray-400 block mb-1">Knowledge Base URL</label>
            <input name="knowledgeUrl" value={form.knowledgeUrl} onChange={handleChange} className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400" />
          </div>
          <div className="flex flex-col gap-3">
            <div>
              <label className="text-sm text-gray-400 block mb-1">Upload Knowledge File</label>
              <button onClick={() => setShowFileModal(true)} className="flex items-center gap-2 w-full px-4 py-3 bg-lime-500 hover:bg-lime-600 rounded-xl font-medium text-black cursor-pointer">
                <FaUpload /> Upload File
              </button>
            </div>

            <div>
              <label className="text-sm text-gray-400 block mb-1">Or Select a File</label>
              <select
                className="w-full px-4 py-3 rounded-xl bg-[#181C29] text-white focus:outline-none focus:ring-2 focus:ring-lime-400"
                onChange={(e) => {
                  const selectedFile = e.target.value;
                  setForm((prev) => ({
                    ...prev,
                    knowledgeUrl: `http://your-server.com/files/${selectedFile}`,
                  }));
                }}
                defaultValue=""
              >
                <option value="" disabled>
                  -- Choose a file --
                </option>
                <option value="faq.txt">faq.txt</option>
                <option value="welcome.txt">welcome.txt</option>
                <option value="intro.txt">intro.txt</option>
              </select>
            </div>
          </div>
        </div>

        {error && <p className="text-red-400 mt-4">{error}</p>}

        <div className="flex justify-end mt-8">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={handleCreate}
            disabled={loading}
            className="flex items-center gap-2 bg-lime-400 hover:bg-lime-500 text-black px-6 py-3 rounded-xl text-lg font-semibold cursor-pointer"
          >
            <FaPaperPlane /> {loading ? 'Creating...' : 'Create Agent'}
          </motion.button>
        </div>
      </div>

      {/* Right-side Preview Panel */}
      <div className="hidden md:flex flex-col justify-between w-72 p-6 rounded-xl bg-[#121720] border border-[#2A2F45] shadow-xl z-10">
        <div>
          <h2 className="text-xl font-bold text-lime-300 mb-4">Agent Preview</h2>
          <div className="w-full h-40 bg-[#181D2B] rounded-lg flex items-center justify-center text-5xl text-gray-500 animate-pulse">
            <FaMicrophone />
          </div>
          <p className="text-sm text-gray-400 mt-4">Configure language, voice, prompt and knowledge base to give your AI agent a personality.</p>
        </div>
        <div className="space-y-2 mt-10 text-sm">
          <div className="flex items-center gap-2 text-lime-400"><FaCheckCircle /> Identity</div>
          <div className="flex items-center gap-2 text-lime-400"><FaCheckCircle /> Behavior</div>
          <div className="flex items-center gap-2 text-lime-400"><FaCheckCircle /> Knowledge</div>
        </div>
      </div>

      {/* File Upload Modal */}
      {showFileModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50">
          <div className="bg-[#111] p-6 rounded-xl w-96" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-white text-lg font-semibold mb-4">Upload Knowledge Base File</h3>
            <input type="file" name="knowledgeFile" onChange={handleChange} className="w-full p-3 rounded bg-gray-800 text-white" />
            <div className="flex justify-end gap-4 mt-4">
              <button onClick={() => setShowFileModal(false)} className="bg-gray-700 px-4 py-2 rounded">Cancel</button>
              <button onClick={() => setShowFileModal(false)} className="bg-lime-500 px-4 py-2 rounded text-black">Done</button>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}


