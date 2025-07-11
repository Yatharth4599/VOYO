// 'use client'

// import { useState } from 'react';
// import { UserCircle, PlusCircle, Share, Clock } from 'lucide-react';
// import { motion } from 'framer-motion';
// import Image from 'next/image';


// export default function Sandbox() {
//   const buttons = [
//     'Describe an Image',
//     'Combine ideas',
//     'Make a video from an image',
//     'Explore Flows',
//   ];

//   const sidebarImages = [
//     '/category-dark.svg',
//     '/history-dark.svg',
//     '/stack-dark.svg',
//     '/brush-dark.svg',
//     '/help-dark.svg',
//   ];


//   return (
//     <div>
//       <section>
//        <div className="relative min-h-screen bg-black text-white overflow-hidden">
//       {/* Background dots */}
//       <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0" />

//       {/* Top bar */}
//       <div className="relative z-10 flex items-center justify-between px-6 py-4">
//         <div className="flex items-center gap-2 ml-1">
//           <div className="w-6 h-6 bg-white rounded-sm" />
//           <span className="text-sm">Untitled</span>
//         </div>
//         <button className="flex items-center text-white border border-white hover:bg-white/10 px-3 py-1 rounded">
//           <Share className="w-4 h-4 mr-2" /> Share
//         </button>
//       </div>

//       {/* Sidebar */}
//       <div className="absolute left-2 top-16 flex flex-col items-center gap-4 z-10 bg-zinc-700 py-4 px-1 rounded-[50px] h-[calc(100vh-4rem] ml-2">

//         <button className="w-10 h-10 flex items-center justify-center bg-zinc-800 text-white rounded-full">
//           <PlusCircle className="w-5 h-5" />
//         </button>

//         {sidebarImages.map((src, i) => (
//           <div
//             key={i}
//             className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center p-1"
//           >
//             <Image
//               src={src}
//               alt={`Sidebar Image ${i + 1}`}
//               width={24}
//               height={24}
//               className="w-full h-full object-contain"
//             />
//           </div>
//         ))}


//         <div className="mt-auto mb-4">
//           <UserCircle className="w-10 h-10 text-green-500 bg-zinc-800 rounded-full p-1" />
//         </div>
//       </div>

//       {/* Center message and buttons */}
//       <div className="relative z-10 flex flex-col items-center justify-center text-center h-[calc(100vh-100px)]">
//         <motion.div
//           className="text-sm text-zinc-300"
//           initial={{ opacity: 0, y: -10 }}
//           animate={{ opacity: 1, y: 0 }}
//         >
//           ✨ <span className="font-medium text-white">Double-click</span> anywhere to create a new Block, or start with...
//         </motion.div>

//         <div className="mt-6 flex flex-wrap justify-center gap-4">
//           {buttons.map((label, i) => (
//             <button
//               key={i}
//               className="rounded-full border border-white/20 bg-zinc-800 hover:bg-white/10 px-5 py-2 text-sm"
//             >
//               {label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Bottom Queue Bar */}
//       <div className="absolute bottom-4 right-4 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm z-10">
//         <Clock className="w-4 h-4" /> Queue <span className="opacity-50">0 active</span>
//       </div>

//       {/* Floating number in bottom-left */}
//         <div className="absolute bottom-4 left-4 text-xs bg-zinc-800 rounded-full px-3 py-1 z-10">
//           666
//         </div>
//       </div>
//       </section>
//     </div>
    
//   )
// }


// 'use client';

// import { useState } from 'react';
// import { UserCircle, PlusCircle, Share, Clock } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';

// interface Workflow {
//   id: string;
//   icon: string;
//   category: string;
//   title: string;
// }

// interface AgentBlock {
//   id: string;
//   x: number;
//   y: number;
//   title: string;
// }

// export default function Sandbox() {
//   const buttons = [
//     'Describe an Image',
//     'Combine ideas',
//     'Make a video from an image',
//     'Explore Flows',
//   ];

//   const sidebarImages = [
//     '/category-dark.svg',
//     '/history-dark.svg',
//     '/stack-dark.svg',
//     '/brush-dark.svg',
//     '/help-dark.svg',
//   ];

//   const availableAgents = ['Claude', 'GPT-4', 'Gemini', 'Llama 3', 'Your Mom'];
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [preview, setPreview] = useState<Workflow | null>(null);
//   const [blocks, setBlocks] = useState<AgentBlock[]>([]);
//   const [connectingFrom, setConnectingFrom] = useState<string | null>(null);
//   const [connections, setConnections] = useState<{ from: string; to: string }[]>([]);

//   // Mock workflows for now
//   const myWorkflows: Workflow[] = [
//     { id: '1', icon: '🧠', category: 'Research', title: 'Summarize 10 PDFs in 5 mins' },
//     { id: '2', icon: '🎨', category: 'Creative', title: 'Generate product ideas w/ GPT-4' },
//     { id: '3', icon: '📈', category: 'Data', title: 'Analyze CSV & auto-chart it' },
//   ];

//   const handleAddAgent = (agent: string) => {
//     const newBlock: AgentBlock = {
//       id: `${Date.now()}-${agent}`,
//       x: 200 + Math.random() * 400,
//       y: 200 + Math.random() * 200,
//       title: agent,
//     };
//     setBlocks(prev => [...prev, newBlock]);
//     setDropdownOpen(false);
//   };

//   return (
//     <div>
//       <section>
//         <div className="relative min-h-screen bg-black text-white overflow-hidden">
//           {/* Background */}
//           <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0" />

//           {/* Top bar */}
//           <div className="relative z-10 flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-2 ml-1">
//               <div className="w-6 h-6 bg-white rounded-sm" />
//               <span className="text-sm">Untitled</span>
//             </div>
//             <button className="flex items-center text-white border border-white hover:bg-white/10 px-3 py-1 rounded">
//               <Share className="w-4 h-4 mr-2" /> Share
//             </button>
//           </div>

//           {/* Sidebar */}
//           <div className="absolute left-2 top-16 flex flex-col items-center gap-4 z-20 bg-zinc-700 py-4 px-1 rounded-[50px] h-[calc(100vh-4rem)] ml-2">
//             <div className="relative">
//               <button
//                 className="w-10 h-10 flex items-center justify-center bg-zinc-800 text-white rounded-full"
//                 onClick={() => setDropdownOpen(prev => !prev)}
//               >
//                 <PlusCircle className="w-5 h-5" />
//               </button>

//               <AnimatePresence>
//                 {dropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-12 top-0 w-40 bg-zinc-900 border border-white/10 rounded-md shadow-lg p-2 z-50"
//                   >
//                     {availableAgents.map((agent, i) => (
//                       <button
//                         key={i}
//                         onClick={() => handleAddAgent(agent)}
//                         className="block w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded"
//                       >
//                         {agent}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {sidebarImages.map((src, i) => (
//               <div
//                 key={i}
//                 className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center p-1"
//               >
//                 <Image
//                   src={src}
//                   alt={`Sidebar Image ${i + 1}`}
//                   width={24}
//                   height={24}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             ))}

//             <div className="mt-auto mb-4">
//               <UserCircle className="w-10 h-10 text-green-500 bg-zinc-800 rounded-full p-1" />
//             </div>
//           </div>

//           {/* Center content – only show if no blocks */}
//           {blocks.length === 0 && (
//             <div className="relative z-10 flex flex-col items-center justify-center text-center h-[calc(100vh-100px)]">
//               <motion.div
//                 className="text-sm text-zinc-300"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 ✨ <span className="font-medium text-white">Double-click</span> anywhere to create a new Block, or start with...
//               </motion.div>

//               <div className="mt-6 flex flex-wrap justify-center gap-4">
//                 {buttons.map((label, i) => (
//                   <button
//                     key={i}
//                     className="rounded-full border border-white/20 bg-zinc-800 hover:bg-white/10 px-5 py-2 text-sm"
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* Connections lines */}
//           <svg className="absolute inset-0 w-full h-full z-0 pointer-events-none">
//             {connections.map((conn, i) => {
//               const from = blocks.find(b => b.id === conn.from);
//               const to = blocks.find(b => b.id === conn.to);
//               if (!from || !to) return null;

//               return (
//                 <line
//                   key={i}
//                   x1={from.x + 144}
//                   y1={from.y + 72}
//                   x2={to.x + 144}
//                   y2={to.y + 72}
//                   stroke="white"
//                   strokeWidth={2}
//                   strokeLinecap="round"
//                 />
//               );
//             })}
//           </svg>

//           {/* Agent Blocks */}
//           {blocks.map((block) => (
//             <motion.div
//               key={block.id}
//               drag
//               dragMomentum={false}
//               style={{
//                 position: 'absolute',
//                 top: block.y,
//                 left: block.x,
//               }}
//               onDragEnd={(event, info) => {
//                 const newX = info.point.x;
//                 const newY = info.point.y;
//                 setBlocks(prev =>
//                   prev.map(b => (b.id === block.id ? { ...b, x: newX, y: newY } : b))
//                 );
//               }}
//               onClick={() => {
//                 if (connectingFrom && connectingFrom !== block.id) {
//                   setConnections(prev => [...prev, { from: connectingFrom, to: block.id }]);
//                   setConnectingFrom(null);
//                 }
//               }}
//               className="group w-72 p-4 bg-white/80 dark:bg-[#2A1E4D] rounded-2xl border-2 border-orange-200 dark:border-purple-400 shadow-xl cursor-grab transition-transform hover:scale-105 z-10"
//             >
//               <div className="text-2xl mb-2">🤖 {block.title}</div>

//               {/* Hover-controlled + button */}
//               {connectingFrom !== block.id && (
//                 <div className="absolute bottom-[-10px] right-[-10px] opacity-0 group-hover:opacity-100 transition-opacity duration-200">
//                   <button
//                     className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-sm border shadow"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       setConnectingFrom(block.id);
//                     }}
//                   >
//                     +
//                   </button>
//                 </div>
//               )}
//             </motion.div>
//           ))}

//           {/* Bottom Queue Bar */}
//           <div className="absolute bottom-4 right-4 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm z-10">
//             <Clock className="w-4 h-4" /> Queue <span className="opacity-50">0 active</span>
//           </div>

//           {/* Floating number */}
//           <div className="absolute bottom-4 left-4 text-xs bg-zinc-800 rounded-full px-3 py-1 z-10">
//             666
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }



// 'use client';

// import React, { useState } from 'react';
// import ReactFlow, {
//   addEdge,
//   Background,
//   Controls,
//   MiniMap,
//   Node,
//   Edge,
//   useNodesState,
//   useEdgesState,
//   Handle,
//   Position,
//   Connection,
//   ConnectionLineType,
//   MarkerType,
//   ConnectionMode
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// import { UserCircle, PlusCircle, Share, Clock } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import ThemeToggle from '@/components/landingV2/ThemeToggle';

// export default function Sandbox() {
//   const buttons = [
//     'Describe an Image',
//     'Combine ideas',
//     'Make a video from an image',
//     'Explore Flows',
//   ];

//   const sidebarImages = [
//     '/category-dark.svg',
//     '/history-dark.svg',
//     '/stack-dark.svg',
//     '/brush-dark.svg',
//     '/help-dark.svg',
//   ];

//   const availableAgents = ['Claude', 'GPT-4', 'Gemini', 'Llama 3'];
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

//   // Use React Flow's onConnect to handle connections properly
//   const onConnect = (connection: Connection) => {
//     if (!connection.source || !connection.target) return; // safety check

//     const newEdge: Edge = {
//       id: `e${connection.source}-${connection.target}`, // unique id for the edge
//       source: connection.source,
//       target: connection.target,
//       sourceHandle: connection.sourceHandle ?? undefined,
//       targetHandle: connection.targetHandle ?? undefined,
//       animated: true,
//       style: { stroke: 'white', strokeWidth: 2 },
//       markerEnd: {
//         type: MarkerType.ArrowClosed,
//         color: 'white',
//       },
//     };
//     setEdges((eds) => addEdge(newEdge, eds));
//   };


//   // Add new node when user picks an agent from dropdown
//   const handleAddAgent = (agent: string) => {
//     const id = `${Date.now()}-${agent}`;

//     const newNode: Node = {
//       id,
//       position: {
//         x: 200 + Math.random() * 400,
//         y: 200 + Math.random() * 200,
//       },
//       data: {
//         label: (
//           <div
//             className="bg-zinc-700 border-2 border-orange-600 dark:border-purple-600 rounded-2xl p-6 ml-2 mr-2 shadow-xl cursor-grab w-72 relative flex flex-col items-center transition-transform select-none"
//             style={{ boxShadow: '0 4px 24px 0 rgba(255, 140, 0, 0.10)' }}
//             draggable={false} // React Flow handles drag, so prevent native drag on the div
//             onDragStart={e => e.preventDefault()}
//           >
//             <div className="font-bold text-orange-600 dark:text-blue-400 mb-1 text-lg text-center">{agent}</div>
//             <div className="text-black dark:text-white text-base mb-2 text-center">Agent Description or Title</div>

          
//             {/* Outgoing Handle */}
//             <Handle
//               type="source"
//               position={Position.Right}
//               id={`source-${id}`}
//               className="absolute rounded-full w-[12px] h-[12px] right-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
//               style={{ top: '50%', transform: 'translateY(-50%)' }}
//             />

//             <Handle
//               type="target"
//               position={Position.Left}
//               id={`target-${id}`}
//               className="absolute rounded-full w-[12px] h-[12px] left-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
//               style={{ top: '50%', transform: 'translateY(-50%)' }}
//             />

//           </div>
//         ),
//       },
//       style: {
//         width: 288, // 72 * 4 (w-72 is 18rem = 288px)
//         padding: 0, // padding inside the div
//         background: 'transparent', // background inside label div handles the color
//         boxShadow: 'none', // no extra shadow here, done inside label div
//         cursor: 'grab',
//         border: 'none',
//       },
//       draggable: true,
//       selectable: true,
//     };

//     setNodes((nds) => [...nds, newNode]);
//     setDropdownOpen(false);
//   };

//   // Add this handler to remove an edge on click
//   const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
//     event.preventDefault();
//     setEdges((eds) => eds.filter((e) => e.id !== edge.id));
//   };



//   return (
//     <div>
//       <section>
//         <div className="relative min-h-screen bg-black text-white overflow-hidden">
//           {/* Background */}
//           <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0" />

//           {/* Top bar */}
//           <div className="relative z-10 flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-2 ml-1">
//               <div className="w-6 h-6 bg-white rounded-sm" />
//               <span className="text-sm">Untitled</span>
//             </div>
//             <button className="flex items-center text-white border border-white hover:bg-white/10 px-3 py-1 rounded">
//               <Share className="w-4 h-4 mr-2" /> Share
//             </button>
//           </div>

//           {/* Sidebar */}
//           <div className="absolute left-2 top-16 flex flex-col items-center gap-4 z-20 bg-zinc-700 py-4 px-1 rounded-[50px] h-[calc(100vh-4rem)] ml-2">
//             <div className="relative">
//               <button
//                 className="w-10 h-10 flex items-center justify-center bg-zinc-800 text-white rounded-full cursor-pointer"
//                 onClick={() => setDropdownOpen((prev) => !prev)}
//               >
//                 <PlusCircle className="w-5 h-5" />
//               </button>

//               <AnimatePresence>
//                 {dropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-12 top-0 w-40 bg-zinc-900 border border-white/10 rounded-md shadow-lg p-2 z-50"
//                   >
//                     {availableAgents.map((agent, i) => (
//                       <button
//                         key={i}
//                         onClick={() => handleAddAgent(agent)}
//                         className="block w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded cursor-pointer"
//                       >
//                         {agent}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>

//             {sidebarImages.map((src, i) => (
//               <div
//                 key={i}
//                 className="w-9 h-9 rounded-full bg-zinc-800 border border-white/10 flex items-center justify-center p-1"
//               >
//                 <Image
//                   src={src}
//                   alt={`Sidebar Image ${i + 1}`}
//                   width={24}
//                   height={24}
//                   className="w-full h-full object-contain"
//                 />
//               </div>
//             ))}

//             <ThemeToggle/>

//             <div className="mt-auto mb-4">
//               <UserCircle className="w-10 h-10 text-green-500 bg-zinc-800 rounded-full p-1" />
//             </div>
//           </div>

//           {/* Center content – only show if no nodes */}
//           {nodes.length === 0 && (
//             <div className="relative z-10 flex flex-col items-center justify-center text-center h-[calc(100vh-100px)]">
//               <motion.div
//                 className="text-sm text-zinc-300"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                 ✨ <span className="font-medium text-white">Double-click</span> anywhere to create a new Block, or start with...
//               </motion.div>

//               <div className="mt-6 flex flex-wrap justify-center gap-4">
//                 {buttons.map((label, i) => (
//                   <button
//                     key={i}
//                     className="rounded-full border border-white/20 bg-zinc-800 hover:bg-white/10 px-5 py-2 text-sm"
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* React Flow Canvas */}
//           <div
//             style={{ width: '100%', height: 'calc(100vh - 64px)' }}
//             className="z-0"
//           >
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               onEdgeClick={onEdgeClick} // <-- here you go
//               fitView
//               connectionLineStyle={{ stroke: 'white', strokeWidth: 2 }}
//               snapToGrid={true}
//               snapGrid={[20, 20]}
//               zoomOnScroll={true}
//               zoomOnPinch={true}
//               panOnDrag={true}
//               connectionMode={ConnectionMode.Loose}
//             />

//           </div>

//           {/* Bottom Queue Bar */}
//           <div className="absolute bottom-4 right-4 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm z-10">
//             <Clock className="w-4 h-4" /> Queue <span className="opacity-50">0 active</span>
//           </div>

//           {/* Floating number */}
//           <div className="absolute bottom-4 left-4 text-xs bg-zinc-800 rounded-full px-3 py-1 z-10">
//             666
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// 'use client';

// import React, { useState } from 'react';
// import ReactFlow, {
//   addEdge,
//   Node,
//   Edge,
//   useNodesState,
//   useEdgesState,
//   Handle,
//   Position,
//   Connection,
//   MarkerType,
//   ConnectionMode
// } from 'reactflow';
// import 'reactflow/dist/style.css';

// import { UserCircle, PlusCircle, Share, Clock } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import Image from 'next/image';
// import ThemeToggle from '@/components/landingV2/ThemeToggle';
// import { useTheme } from 'next-themes';
// import LoginForm from '@/components/LoginForm';
// import SignupForm from '@/components/SignupForm';


// export default function Sandbox() {
//   const buttons = [
//     'Describe an Image',
//     'Combine ideas',
//     'Make a video from an image',
//     'Explore Flows',
//   ];

//   const sidebarIcons = [
//     'category',
//     'history',
//     'stack',
//     'brush',
//     'help',
//   ];

//   const { resolvedTheme } = useTheme();

//   const availableAgents = ['Claude', 'GPT-4', 'Gemini', 'Llama 3'];
//   const [dropdownOpen, setDropdownOpen] = useState(false);

//   const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
//   const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

//   const [showModal, setShowModal] = useState(false);
//   const [showLoginModal, setShowLoginModal] = useState(false);
//   const openModal = () => setShowModal(true);
//   // const openLoginModal = () => setShowLoginModal(true);
//   const closeLoginModal = () => setShowLoginModal(false);
  
//   const openLoginModal = () => {
//     setShowModal(false); // Close signup
//     setShowLoginModal(true); // Open login
//   };
  
//   const openSignupModal = () => {
//     setShowLoginModal(false); // Close login
//     setShowModal(true); // Open signup
//   };

//   const onConnect = (connection: Connection) => {
//     if (!connection.source || !connection.target) return;
//     if (connection.source === connection.target) return;

//     const alreadyExists = edges.some(
//       (e) =>
//         e.source === connection.source &&
//         e.target === connection.target &&
//         e.sourceHandle === connection.sourceHandle &&
//         e.targetHandle === connection.targetHandle
//     );

//     if (alreadyExists) return;

//     const newEdge: Edge = {
//       id: `e${connection.source}-${connection.target}-${Date.now()}`,
//       source: connection.source,
//       target: connection.target,
//       sourceHandle: connection.sourceHandle ?? undefined,
//       targetHandle: connection.targetHandle ?? undefined,
//       animated: true,
//       style: { stroke: 'white', strokeWidth: 2 },
//       markerEnd: {
//         type: MarkerType.ArrowClosed,
//         color: 'white',
//       },
//     };
//     setEdges((eds) => addEdge(newEdge, eds));
//   };

//   const handleAddAgent = (agent: string) => {
//     const id = `${Date.now()}-${agent}`;
//     const newNode: Node = {
//       id,
//       position: {
//         x: 200 + Math.random() * 400,
//         y: 200 + Math.random() * 200,
//       },
//       data: {
//         label: (
//           <div
//             className="bg-white dark:bg-zinc-700 border-2 border-orange-600 dark:border-purple-600 rounded-2xl p-6 ml-2 mr-2 shadow-xl cursor-grab w-72 relative flex flex-col items-center transition-transform select-none"
//             style={{ boxShadow: '0 4px 24px 0 rgba(255, 140, 0, 0.10)' }}
//             draggable={false}
//             onDragStart={e => e.preventDefault()}
//           >
//             <div className="font-bold text-orange-600 dark:text-blue-400 mb-1 text-lg text-center">{agent}</div>
//             <div className="text-black dark:text-white text-base mb-2 text-center">Agent Description or Title</div>
//             {/* Bidirectional Handles */}
//             <Handle
//               type="source"
//               position={Position.Right}
//               id={`source-${id}-right`}
//               className="absolute rounded-full w-[12px] h-[12px] right-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
//               style={{ top: '50%', transform: 'translateY(-50%)' }}
//             />
//             <Handle
//               type="target"
//               position={Position.Right}
//               id={`target-${id}-right`}
//               className="absolute rounded-full w-[12px] h-[12px] right-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
//               style={{ top: '50%', transform: 'translateY(-50%)' }}
//             />
//             <Handle
//               type="source"
//               position={Position.Left}
//               id={`source-${id}-left`}
//               className="absolute rounded-full w-[12px] h-[12px] left-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
//               style={{ top: '50%', transform: 'translateY(-50%)' }}
//             />
//             <Handle
//               type="target"
//               position={Position.Left}
//               id={`target-${id}-left`}
//               className="absolute rounded-full w-[12px] h-[12px] left-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
//               style={{ top: '50%', transform: 'translateY(-50%)' }}
//             />
//           </div>
//         ),
//       },
//       style: {
//         width: 288,
//         padding: 0,
//         background: 'transparent',
//         boxShadow: 'none',
//         cursor: 'grab',
//         border: 'none',
//       },
//       draggable: true,
//       selectable: true,
//     };

//     setNodes((nds) => [...nds, newNode]);
//     setDropdownOpen(false);
//   };

//   const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
//     event.preventDefault();
//     setEdges((eds) => eds.filter((e) => e.id !== edge.id));
//   };

//   return (
//     <div>
//       <section>
//         <div className="relative min-h-screen bg-[#e8dcc6] dark:bg-black text-white overflow-hidden">
//          <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0" />
//           <div className="relative z-10 flex items-center justify-between px-6 py-4">
//             <div className="flex items-center gap-2 ml-1">
//               <div className="w-6 h-6 bg-white rounded-sm" />
//               <span className="text-sm">Untitled</span>
//             </div>
//             <button className="flex items-center text-white border border-white hover:bg-white/10 px-3 py-1 rounded">
//               <Share className="w-4 h-4 mr-2" /> Share
//             </button>
//           </div>
//           <div className="absolute left-2 top-16 flex flex-col items-center gap-4 z-20 bg-[#f97316] dark:bg-purple-700 py-4 px-1 rounded-[50px] h-[calc(100vh-4rem)] ml-2">
//             <div className="relative">
//               <button
//                 className="w-10 h-10 flex items-center justify-center dark:bg-zinc-800 text-white rounded-full cursor-pointer"
//                 onClick={() => setDropdownOpen((prev) => !prev)}
//               >
//                 <PlusCircle className="w-5 h-5" />
//               </button>
//               <AnimatePresence>
//                 {dropdownOpen && (
//                   <motion.div
//                     initial={{ opacity: 0, y: -10 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     exit={{ opacity: 0, y: -10 }}
//                     className="absolute left-12 top-0 w-40 bg-zinc-900 border border-white/10 rounded-md shadow-lg p-2 z-50"
//                   >
//                     {availableAgents.map((agent, i) => (
//                       <button
//                         key={i}
//                         onClick={() => handleAddAgent(agent)}
//                         className="block w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded cursor-pointer"
//                       >
//                         {agent}
//                       </button>
//                     ))}
//                   </motion.div>
//                 )}
//               </AnimatePresence>
//             </div>
//             {sidebarIcons.map((icon, i) => (
//               <div
//                 key={i}
//                 className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-white/10 flex items-center justify-center p-1"
//               >
//                 <Image
//                   src={`/${icon}-${resolvedTheme === 'dark' ? 'dark' : 'light'}.svg`}
//                   alt={`Sidebar Image ${i + 1}`}
//                   width={40}
//                   height={40}
//                   className="transition duration-300 object-contain"
//                 />
//               </div>
//             ))}
//             <ThemeToggle />
//             <div className="mt-auto mb-4">
//               <UserCircle className="w-10 h-10 bg-white text-black dark:text-white dark:bg-zinc-800 rounded-full p-1" />
//             </div>
//           </div>

//           {nodes.length === 0 && (
//             <div className="relative z-10 flex flex-col items-center justify-center text-center h-[calc(100vh-100px)]">
//               <motion.div
//                 className="text-sm text-zinc-300"
//                 initial={{ opacity: 0, y: -10 }}
//                 animate={{ opacity: 1, y: 0 }}
//               >
//                <p className="text-black dark:text-white">  <span className="font-medium text-black dark:text-white">Double-click</span> anywhere to create a new Block, or start with...</p> 
//               </motion.div>

//               <div className="mt-6 flex flex-wrap justify-center gap-4">
//                 {buttons.map((label, i) => (
//                   <button
//                     key={i}
//                     className="rounded-full border border-white/20 bg-orange-400 dark:bg-purple-800 dark:hover:bg-purple-900 hover:bg-orange-500 px-5 py-2 text-sm"
//                   >
//                     {label}
//                   </button>
//                 ))}
//               </div>
//             </div>
//           )}
//           <div style={{ width: '100%', height: 'calc(100vh - 64px)' }} className="z-0">
//             <ReactFlow
//               nodes={nodes}
//               edges={edges}
//               onNodesChange={onNodesChange}
//               onEdgesChange={onEdgesChange}
//               onConnect={onConnect}
//               onEdgeClick={onEdgeClick}
//               fitView
//               connectionLineStyle={{ stroke: 'white', strokeWidth: 2 }}
//               snapToGrid={true}
//               snapGrid={[20, 20]}
//               zoomOnScroll={true}
//               zoomOnPinch={true}
//               panOnDrag={true}
//               connectionMode={ConnectionMode.Loose}
//             />
//           </div>
//           <div className="absolute bottom-4 right-4 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm z-10">
//             <Clock className="w-4 h-4" /> Queue <span className="opacity-50">0 active</span>
//           </div>
//           <div className="absolute bottom-4 left-4 text-xs bg-zinc-800 rounded-full px-3 py-1 z-10">
//             666
//           </div>
//         </div>
//       </section>

//         {showModal && (
//           <div
//             className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-start pt-12 pb-12 overflow-y-auto z-50"
//           >
//           <div
//             className="modern-card p-8 max-w-md w-full mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//           {/* <SignupForm onClose={() => setShowModal(false)} /> */}
//           <SignupForm 
//             onClose={() => setShowModal(false)} 
//             switchToLogin={openLoginModal}
//           />
//           </div>
//           </div>
//         )}

//       {showLoginModal && (
//         <div
//           className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50"
//         >
//           <div
//             className="modern-card p-8 max-w-md w-full mx-4"
//             onClick={(e) => e.stopPropagation()}
//           >
//             {/* <LoginForm onClose={closeLoginModal} /> */}
//             <LoginForm 
//               onClose={closeLoginModal} 
//               switchToSignup={openSignupModal}
//             />

//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

'use client';

import React, { useState } from 'react';
import ReactFlow, {
  addEdge,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  Handle,
  Position,
  Connection,
  MarkerType,
  ConnectionMode
} from 'reactflow';
import 'reactflow/dist/style.css';

import { UserCircle, PlusCircle, Share, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import ThemeToggle from '@/components/landingV2/ThemeToggle';
import { useTheme } from 'next-themes';
import SandboxLogin from '@/components/sandbox/SandboxLogin'; 
import SandboxSignup from '@/components/sandbox/SandboxSignup';



export default function Sandbox() {
  const buttons = [
    'Describe an Image',
    'Combine ideas',
    'Make a video from an image',
    'Explore Flows',
  ];

  const sidebarIcons = [
    'category',
    'history',
    'stack',
    'brush',
    'help',
  ];

  const { resolvedTheme } = useTheme();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const availableAgents = ['Claude', 'GPT-4', 'Gemini', 'Llama 3'];
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const [nodes, setNodes, onNodesChange] = useNodesState<Node[]>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  const openLoginModal = () => {
    setShowModal(false); // Close signup
    setShowLoginModal(true); // Open login
  };
  
  const openSignupModal = () => {
    setShowLoginModal(false); // Close login
    setShowModal(true); // Open signup
  };

  const onConnect = (connection: Connection) => {
    if (!connection.source || !connection.target) return;
    if (connection.source === connection.target) return;

    const alreadyExists = edges.some(
      (e) =>
        e.source === connection.source &&
        e.target === connection.target &&
        e.sourceHandle === connection.sourceHandle &&
        e.targetHandle === connection.targetHandle
    );

    if (alreadyExists) return;

    const newEdge: Edge = {
      id: `e${connection.source}-${connection.target}-${Date.now()}`,
      source: connection.source,
      target: connection.target,
      sourceHandle: connection.sourceHandle ?? undefined,
      targetHandle: connection.targetHandle ?? undefined,
      animated: true,
      style: { stroke: 'white', strokeWidth: 2 },
      markerEnd: {
        type: MarkerType.ArrowClosed,
        color: 'white',
      },
    };
    setEdges((eds) => addEdge(newEdge, eds));
  };

  const handleAddAgent = (agent: string) => {
    const id = `${Date.now()}-${agent}`;
    const newNode: Node = {
      id,
      position: {
        x: 200 + Math.random() * 400,
        y: 200 + Math.random() * 200,
      },
      data: {
        label: (
          <div
            className="bg-white dark:bg-zinc-700 border-2 border-orange-600 dark:border-purple-600 rounded-2xl p-6 ml-2 mr-2 shadow-xl cursor-grab w-72 relative flex flex-col items-center transition-transform select-none"
            style={{ boxShadow: '0 4px 24px 0 rgba(255, 140, 0, 0.10)' }}
            draggable={false}
            onDragStart={e => e.preventDefault()}
          >
            <div className="font-bold text-orange-600 dark:text-blue-400 mb-1 text-lg text-center">{agent}</div>
            <div className="text-black dark:text-white text-base mb-2 text-center">Agent Description or Title</div>
            {/* Bidirectional Handles */}
            <Handle
              type="source"
              position={Position.Right}
              id={`source-${id}-right`}
              className="absolute rounded-full w-[12px] h-[12px] right-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
            <Handle
              type="target"
              position={Position.Right}
              id={`target-${id}-right`}
              className="absolute rounded-full w-[12px] h-[12px] right-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
            <Handle
              type="source"
              position={Position.Left}
              id={`source-${id}-left`}
              className="absolute rounded-full w-[12px] h-[12px] left-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
            <Handle
              type="target"
              position={Position.Left}
              id={`target-${id}-left`}
              className="absolute rounded-full w-[12px] h-[12px] left-[-6px] z-10 bg-orange-500 dark:bg-purple-400"
              style={{ top: '50%', transform: 'translateY(-50%)' }}
            />
          </div>
        ),
      },
      style: {
        width: 288,
        padding: 0,
        background: 'transparent',
        boxShadow: 'none',
        cursor: 'grab',
        border: 'none',
      },
      draggable: true,
      selectable: true,
    };

    setNodes((nds) => [...nds, newNode]);
    setDropdownOpen(false);
  };

  const onEdgeClick = (event: React.MouseEvent, edge: Edge) => {
    event.preventDefault();
    setEdges((eds) => eds.filter((e) => e.id !== edge.id));
  };

  return (
    <div>
      {!isAuthenticated && (
        <div className="fixed inset-0 z-50 bg-black/90 flex flex-col items-center justify-center text-white text-center px-6">
          <h2 className="text-2xl font-semibold mb-4">Please sign in to use the sandbox</h2>
          <button
            onClick={() => setShowLoginModal(true)}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full transition"
          >
            Sign In
          </button>
        </div>
      )}

      <section>
        <div className="relative min-h-screen bg-[#e8dcc6] dark:bg-black text-white overflow-hidden">
         <div className="absolute inset-0 bg-[radial-gradient(#333_1px,transparent_1px)] [background-size:20px_20px] opacity-30 z-0" />
          <div className="relative z-10 flex items-center justify-between px-6 py-4">
            <div className="flex items-center gap-2 ml-1">
              <div className="w-6 h-6 bg-white rounded-sm" />
              <span className="text-sm">Untitled</span>
            </div>
            <button className="flex items-center text-white border border-white hover:bg-white/10 px-3 py-1 rounded">
              <Share className="w-4 h-4 mr-2" /> Share
            </button>
          </div>
          <div className="absolute left-2 top-16 flex flex-col items-center gap-4 z-20 bg-[#f97316] dark:bg-purple-700 py-4 px-1 rounded-[50px] h-[calc(100vh-4rem)] ml-2">
            <div className="relative">
              <button
                className="w-10 h-10 flex items-center justify-center dark:bg-zinc-800 text-white rounded-full cursor-pointer"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <PlusCircle className="w-5 h-5" />
              </button>
              <AnimatePresence>
                {dropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-12 top-0 w-40 bg-zinc-900 border border-white/10 rounded-md shadow-lg p-2 z-50"
                  >
                    {availableAgents.map((agent, i) => (
                      <button
                        key={i}
                        onClick={() => handleAddAgent(agent)}
                        className="block w-full text-left px-3 py-2 text-sm hover:bg-white/10 rounded cursor-pointer"
                      >
                        {agent}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {sidebarIcons.map((icon, i) => (
              <div
                key={i}
                className="w-9 h-9 rounded-full bg-white dark:bg-zinc-800 border border-white/10 flex items-center justify-center p-1"
              >
                <Image
                  src={`/${icon}-${resolvedTheme === 'dark' ? 'dark' : 'light'}.svg`}
                  alt={`Sidebar Image ${i + 1}`}
                  width={40}
                  height={40}
                  className="transition duration-300 object-contain"
                />
              </div>
            ))}
            <ThemeToggle />
            <div className="mt-auto mb-4">
              <UserCircle className="w-10 h-10 bg-white text-black dark:text-white dark:bg-zinc-800 rounded-full p-1" />
            </div>
          </div>

          {nodes.length === 0 && (
            <div className="relative z-10 flex flex-col items-center justify-center text-center h-[calc(100vh-100px)]">
              <motion.div
                className="text-sm text-zinc-300"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
               <p className="text-black dark:text-white">  <span className="font-medium text-black dark:text-white">Double-click</span> anywhere to create a new Block, or start with...</p> 
              </motion.div>

              <div className="mt-6 flex flex-wrap justify-center gap-4">
                {buttons.map((label, i) => (
                  <button
                    key={i}
                    className="rounded-full border border-white/20 bg-orange-400 dark:bg-purple-800 dark:hover:bg-purple-900 hover:bg-orange-500 px-5 py-2 text-sm"
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>
          )}
          <div style={{ width: '100%', height: 'calc(100vh - 64px)' }} className="z-0">
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onEdgeClick={onEdgeClick}
              fitView
              connectionLineStyle={{ stroke: 'white', strokeWidth: 2 }}
              snapToGrid={true}
              snapGrid={[20, 20]}
              zoomOnScroll={true}
              zoomOnPinch={true}
              panOnDrag={true}
              connectionMode={ConnectionMode.Loose}
            />
          </div>
          <div className="absolute bottom-4 right-4 bg-zinc-900 border border-white/10 rounded-lg px-4 py-2 flex items-center gap-2 text-sm z-10">
            <Clock className="w-4 h-4" /> Queue <span className="opacity-50">0 active</span>
          </div>
          <div className="absolute bottom-4 left-4 text-xs bg-zinc-800 rounded-full px-3 py-1 z-10">
            666
          </div>
        </div>
      </section>

        {showModal && (
          <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50">
            <div className="modern-card p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <SandboxSignup
                onClose={() => setShowModal(false)}
                switchToLogin={openLoginModal}
                onSignupSuccess={() => {
                  setIsAuthenticated(true);
                  setShowModal(false);
                }}
              />
            </div>
          </div>
        )}


      {showLoginModal && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50">
          <div className="modern-card p-8 max-w-md w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <SandboxLogin
              onClose={() => setShowLoginModal(false)}
              switchToSignup={openSignupModal}
              onLoginSuccess={() => {
                setIsAuthenticated(true);
                setShowLoginModal(false);
              }}
            />
          </div>
        </div>
      )}

    </div>
  );
}

