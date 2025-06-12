// 'use client'

// import { useState } from 'react'

// const callData = [
//   { date: 'Jun 10, 2025 at 2:36 PM', agent: 'New agent', duration: '1:04', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 5:17 PM', agent: 'New agent', duration: '0:16', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 4:23 PM', agent: 'New agent', duration: '0:08', messages: 2, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:17 AM', agent: 'Urvashi Clone 5', duration: '0:07', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:04', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:03', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:06', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:15 AM', agent: 'Urvashi Clone 5', duration: '0:05', messages: 1, status: 'Successful' },
// ]

// const filters = ['Date After', 'Date Before', 'Evaluation', 'Agent']

// export default function CallHistoryPage() {
//   return (
//     <div className="flex min-h-screen bg-black text-black font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-lime-400 p-5 text-sm space-y-6 bg-[#181C29]">
//         <div>
//           <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
//         </div>
//         <nav className="space-y-2 text-white cursor-pointer">
//           <div className="hover:text-lime-400">📊 Dashboard</div>
//           <div className="hover:text-lime-400">👥 Agents</div>
//           <div className="hover:text-lime-400">📞 Call History</div>
//           <div className="hover:text-lime-400">📚 Knowledge Base</div>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8">
//         <h1 className="text-2xl font-bold mb-6 text-lime-400">Call history</h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {filters.map(f => (
//             <button
//               key={f}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 text-white hover:bg-gray-800 cursor-pointer"
//             >
//               + {f}
//             </button>
//           ))}
//         </div>

//         {/* Table Head */}
//         <div className="grid grid-cols-5 text-sm text-gray-500 font-semibold border-b pb-2">
//           <span>Date</span>
//           <span>Agent</span>
//           <span>Duration</span>
//           <span>Messages</span>
//           <span>Evaluation result</span>
//         </div>

//         {/* Table Rows */}
//         <div className="divide-y">
//           {callData.map((call, i) => (
//             <div key={i} className="grid grid-cols-5 text-sm py-3 items-center text-lime-400 hover:bg-gray-800 cursor-pointer">
//               <span>{call.date}</span>
//               <span>{call.agent}</span>
//               <span>{call.duration}</span>
//               <span>{call.messages}</span>
//               <div className="flex justify-center">
//               <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
//                 {call.status}
//               </span>
//             </div>

//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   )
// }



// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// type Call = {
//   date: string
//   agent: string
//   duration: string
//   messages: number
//   status: string
// }

// const callData: Call[] = [
//   { date: 'Jun 10, 2025 at 2:36 PM', agent: 'New agent', duration: '1:04', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 5:17 PM', agent: 'New agent', duration: '0:16', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 4:23 PM', agent: 'New agent', duration: '0:08', messages: 2, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:17 AM', agent: 'Urvashi Clone 5', duration: '0:07', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:04', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:03', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:06', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:15 AM', agent: 'Urvashi Clone 5', duration: '0:05', messages: 1, status: 'Successful' },
// ]

// const filters = ['Date After', 'Date Before', 'Evaluation', 'Agent']

// export default function CallHistoryPage() {
//   const [selected, setSelected] = useState<Call | null>(null)
//   const detailRef = useRef<HTMLDivElement>(null)

//   // Handle click outside detail panel
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
//         setSelected(null)
//       }
//     }

//     if (selected) {
//       document.addEventListener('mousedown', handleClickOutside)
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [selected])

//   return (
//     <div className="flex min-h-screen bg-black text-black font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-lime-400 p-5 text-sm space-y-6 bg-[#181C29]">
//         <div>
//           <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
//         </div>
//         <nav className="space-y-2 text-white cursor-pointer">
//           <div className="hover:text-lime-400">📊 Dashboard</div>
//           <div className="hover:text-lime-400">👥 Agents</div>
//           <div className="hover:text-lime-400">📞 Call History</div>
//           <div className="hover:text-lime-400">📚 Knowledge Base</div>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8 relative">
//         <h1 className="text-2xl font-bold mb-6 text-lime-400">Call history</h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {filters.map(f => (
//             <button
//               key={f}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 text-white hover:bg-gray-800 cursor-pointer"
//             >
//               + {f}
//             </button>
//           ))}
//         </div>

//         {/* Table Head */}
//         <div className="grid grid-cols-5 text-sm text-gray-500 font-semibold border-b pb-2">
//           <span>Date</span>
//           <span>Agent</span>
//           <span>Duration</span>
//           <span>Messages</span>
//           <span>Evaluation result</span>
//         </div>

//         {/* Table Rows */}
//         <div className="divide-y">
//           {callData.map((call, i) => (
//             <div
//               key={i}
//               className="grid grid-cols-5 text-sm py-3 items-center text-lime-400 hover:bg-gray-800 cursor-pointer"
//               onClick={() => setSelected(call)}
//             >
//               <span>{call.date}</span>
//               <span>{call.agent}</span>
//               <span>{call.duration}</span>
//               <span>{call.messages}</span>
//               <div className="flex justify-center">
//                 <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
//                   {call.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Slide-in Detail View */}
//         <AnimatePresence>
//           {selected && (
//             <motion.div
//               key="detail"
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '100%', opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               ref={detailRef}
//               className="fixed top-0 right-0 h-full w-3/4 bg-gray-900 text-white p-6 z-50 shadow-xl overflow-y-auto"
//             >
//               {/* Close button */}
//               <div className="mb-4">
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="border px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition cursor-pointer float-right"
//                 >
//                   Close
//                 </button>
//               </div>

//               {/* White vertical line - DO NOT MOVE */}
//               <div className="h-full border-r border-white absolute top-0 right-0 mr-80"></div>

//               {/* Flex wrapper for both headings */}
//               <div className="flex items-start">
//                 {/* Left side: Conversation */}
//                 <div className="flex-1">
//                   <p className="text-lg mt-2">Conversation with New agent</p>

//                   {/* Buttons wrapper with relative positioning */}
//                   <div className="mt-50 relative">
//                     <button className="cursor-pointer">Overview</button>
//                     <button className="ml-10 cursor-pointer">Transcription</button>
//                     <button className="ml-10 cursor-pointer">Client Data</button>

//                     {/* Horizontal line right below buttons */}
//                     <div className="border-t border-gray-500 absolute left-0 right-12 top-full mt-2">
//                       <p className="mt-10 text-lg font-bold">Summary</p>
//                       <br />
//                       <p>
//                         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
//                         recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
//                         dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
//                         ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
//                         aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
//                       </p>

//                       <div className="mt-10 relative">
//                         <div className="border-t border-gray-500 absolute left-0 right-12 top-full mt-2">
//                           <div className="flex items-center justify-between">
//                             <p className="mt-3 mb-3 text-lg font-bold">Call Status</p>
//                             <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-r leading-none">
//                               Successful
//                             </span>
//                           </div>
                          
//                           <div className="border-t border-gray-500 absolute left-0 right-0 top-full mt-2"></div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Right side: Meta Data */}
//                 <div className="mr-[7rem] mt-2">
//                   <p className="text-lg">Meta Data</p>
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>



//       </main>
//     </div>
//   )
// }




// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'

// type Call = {
//   date: string
//   agent: string
//   duration: string
//   messages: number
//   status: string
// }

// const callData: Call[] = [
//   { date: 'Jun 10, 2025 at 2:36 PM', agent: 'New agent', duration: '1:04', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 5:17 PM', agent: 'New agent', duration: '0:16', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 4:23 PM', agent: 'New agent', duration: '0:08', messages: 2, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:17 AM', agent: 'Urvashi Clone 5', duration: '0:07', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:04', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:03', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:06', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:15 AM', agent: 'Urvashi Clone 5', duration: '0:05', messages: 1, status: 'Successful' },
// ]

// const filters = ['Date After', 'Date Before', 'Evaluation', 'Agent']

// export default function CallHistoryPage() {
//   const [selected, setSelected] = useState<Call | null>(null)
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription' | 'client'>('overview')
//   const detailRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
//         setSelected(null)
//       }
//     }

//     if (selected) {
//       document.addEventListener('mousedown', handleClickOutside)
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [selected])

//   return (
//     <div className="flex min-h-screen bg-black text-black font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-lime-400 p-5 text-sm space-y-6 bg-[#181C29]">
//         <div>
//           <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
//         </div>
//         <nav className="space-y-2 text-white cursor-pointer">
//           <div className="hover:text-lime-400">📊 Dashboard</div>
//           <div className="hover:text-lime-400">👥 Agents</div>
//           <div className="hover:text-lime-400">📞 Call History</div>
//           <div className="hover:text-lime-400">📚 Knowledge Base</div>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8 relative">
//         <h1 className="text-2xl font-bold mb-6 text-lime-400">Call history</h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-2 mb-6">
//           {filters.map(f => (
//             <button
//               key={f}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 text-white hover:bg-gray-800 cursor-pointer"
//             >
//               + {f}
//             </button>
//           ))}
//         </div>

//         {/* Table Head */}
//         <div className="grid grid-cols-5 text-sm text-gray-500 font-semibold border-b pb-2">
//           <span>Date</span>
//           <span>Agent</span>
//           <span>Duration</span>
//           <span>Messages</span>
//           <span>Evaluation result</span>
//         </div>

//         {/* Table Rows */}
//         <div className="divide-y">
//           {callData.map((call, i) => (
//             <div
//               key={i}
//               className="grid grid-cols-5 text-sm py-3 items-center text-lime-400 hover:bg-gray-800 cursor-pointer"
//               onClick={() => {
//                 setSelected(call)
//                 setActiveTab('overview') // Reset to overview each time
//               }}
//             >
//               <span>{call.date}</span>
//               <span>{call.agent}</span>
//               <span>{call.duration}</span>
//               <span>{call.messages}</span>
//               <div className="flex justify-center">
//                 <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
//                   {call.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Slide-in Detail View */}
        // <AnimatePresence>
        //   {selected && (
        //     <motion.div
        //     key="detail"
        //     initial={{ x: '100%', opacity: 0 }}
        //     animate={{ x: 0, opacity: 1 }}
        //     exit={{ x: '100%', opacity: 0 }}
        //     transition={{ duration: 0.3 }}
        //     ref={detailRef}
        //     className="fixed top-0 right-0 h-full w-3/4 bg-gray-900 text-white p-6 z-50 shadow-xl overflow-y-auto"
        //   >
        //   {/* Close button */}
        //   <div className="mb-4">
        //     <button
        //       onClick={() => setSelected(null)}
        //       className="border px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition cursor-pointer float-right"
        //     >
        //       Close
        //     </button>
        //   </div>

        //   {/* Right Divider (Main one) */}
        //   <div className="h-full border-r border-lime-400 absolute top-0 right-0 mr-100"></div>

        //   <div className="flex items-start h-full">
        //     {/* LEFT SIDE: Conversation Content (limited width so it doesn’t spill past divider) */}
        //     <div className="flex-1 max-w-[calc(100%-12rem)] pr-10">
        //       <p className="text-lg mt-2">Conversation with {selected.agent}</p>

        //       {/* Tab buttons */}
        //       <div className="mt-50 mb-6 flex space-x-10">
        //         <button
        //           className={`cursor-pointer ${activeTab === 'overview' ? 'text-lime-400' : ''}`}
        //           onClick={() => setActiveTab('overview')}
        //         >
        //           Overview
        //         </button>
        //         <button
        //           className={`cursor-pointer ${activeTab === 'transcription' ? 'text-lime-400' : ''}`}
        //           onClick={() => setActiveTab('transcription')}
        //         >
        //           Transcription
        //         </button>
        //         <button
        //           className={`cursor-pointer ${activeTab === 'client' ? 'text-lime-400' : ''}`}
        //           onClick={() => setActiveTab('client')}
        //         >
        //           Client Data
        //         </button>
        //       </div>

        //       {/* Tabs Content */}
        //       <div className="mt-8">
        //         {activeTab === 'overview' && (
        //           <>
        //             {/* Summary */}
        //             <div className="border-t border-lime-400 pt-6">
        //               <p className="text-lg font-bold">Summary</p>
        //               <br />
        //               <p>
        //                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
        //                 recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
        //                 dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
        //                 ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
        //                 aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
        //               </p>
        //             </div>

        //             {/* Call Status */}
        //             <div className="border-t border-lime-400 mt-10 mb-5 pt-6">
        //               <div className="flex items-center justify-between">
        //                 <p className="text-lg font-bold">Call Status</p>
        //                 <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-sm leading-none">
        //                   {selected.status}
        //                 </span>
        //               </div>
        //             </div>

        //             {/* SECOND vertical line below Call Status */}
        //             <div className="border-t border-lime-400 pt-6"></div>
        //           </>
        //         )}

        //         {activeTab === 'transcription' && (
        //           <div className="border-t border-lime-400 mt-4 pt-6">
        //             <p className="text-lg font-bold mb-2">Full Transcription</p>
        //           </div>
        //         )}

        //         {activeTab === 'client' && (
        //           <div className="border-t border-lime-400 mt-4 pt-6">
        //             <p className="text-lg font-bold mb-2">Client Data</p>
        //           </div>
        //         )}
        //       </div>
        //     </div>

        //     {/* RIGHT SIDE: Meta Data Panel */}
        //     <div className="mr-[1rem] mt-2 min-w-[10rem]">
        //       <p className="text-lg">Meta Data</p>
        //       <p className="text-sm text-gray-400 mt-2">Date: Today, 9:09 AM</p>
        //       <p className="text-sm text-gray-400">Connection duration: 0:54</p>
        //       <p className="text-sm text-gray-400">Cost (credits): 415</p>
        //       <p className="text-sm text-gray-400">LLM Price Preview: $0.019/min, Total: $0.017</p>
        //     </div>
        //   </div>
        // </motion.div>

        //   )}
        // </AnimatePresence>


//       </main>
//     </div>
//   )
// }



// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'

// type Call = {
//   date: string
//   agent: string
//   duration: string
//   messages: number
//   status: string
// }

// const callData: Call[] = [
//   { date: 'Jun 10, 2025 at 2:36 PM', agent: 'New agent', duration: '1:04', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 5:17 PM', agent: 'New agent', duration: '0:16', messages: 6, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 4:23 PM', agent: 'New agent', duration: '0:08', messages: 2, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:17 AM', agent: 'Urvashi Clone 5', duration: '0:07', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:04', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:03', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:06', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:15 AM', agent: 'Urvashi Clone 5', duration: '0:05', messages: 1, status: 'Successful' },
// ]

// // Helper to parse 'Jun 10, 2025 at 2:36 PM'
// function parseCallDate(dateStr: string): Date | null {
//   const parsed = Date.parse(dateStr.replace(' at', ''))
//   return isNaN(parsed) ? null : new Date(parsed)
// }

// export default function CallHistoryPage() {
//   const [selected, setSelected] = useState<Call | null>(null)
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription' | 'client'>('overview')
//   const detailRef = useRef<HTMLDivElement>(null)

//   const [showDateAfter, setShowDateAfter] = useState(false)
//   const [showDateBefore, setShowDateBefore] = useState(false)
//   const [dateAfter, setDateAfter] = useState<Date | null>(null)
//   const [dateBefore, setDateBefore] = useState<Date | null>(null)

//   // Filter calls by selected dates
//   const filteredData = callData.filter((call) => {
//     const callDate = parseCallDate(call.date)
//     if (!callDate) return false

//     const afterOK = dateAfter ? callDate >= dateAfter : true
//     const beforeOK = dateBefore ? callDate <= dateBefore : true

//     return afterOK && beforeOK
//   })

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
//         setSelected(null)
//       }
//     }

//     if (selected) {
//       document.addEventListener('mousedown', handleClickOutside)
//     } else {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [selected])

//   return (
//     <div className="flex min-h-screen bg-black text-black font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-lime-400 p-5 text-sm space-y-6 bg-[#181C29]">
//         <div>
//           <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
//         </div>
//         <nav className="space-y-2 text-white cursor-pointer">
//           <div className="hover:text-lime-400">📊 Dashboard</div>
//           <div className="hover:text-lime-400">👥 Agents</div>
//           <div className="hover:text-lime-400">📞 Call History</div>
//           <div className="hover:text-lime-400">📚 Knowledge Base</div>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8 relative text-white">
//         <h1 className="text-2xl font-bold mb-6 text-lime-400">Call history</h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6 relative z-10">
//           <div className="relative">
//             <button
//               onClick={() => {
//                 setShowDateAfter(prev => {
//                   if (!prev) setShowDateBefore(false) // Close the other one
//                   return !prev
//                 })
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Date After{dateAfter ? ` | ${dateAfter.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
//             </button>
//             {showDateAfter && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
//                 <DatePicker
//                   selected={dateAfter}
//                   onChange={(date) => {
//                     setDateAfter(date)
//                     setShowDateAfter(false)
//                   }}
//                   inline
//                 />
//               </div>
//             )}
//           </div>

//           <div className="relative">
//             <button
//               onClick={() => {
//                 setShowDateBefore(prev => {
//                   if (!prev) setShowDateAfter(false) // Close the other one
//                   return !prev
//                 })
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Date Before{dateBefore ? ` | ${dateBefore.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}` : ''}
//             </button>
//             {showDateBefore && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
//                 <DatePicker
//                   selected={dateBefore}
//                   onChange={(date) => {
//                     setDateBefore(date)
//                     setShowDateBefore(false)
//                   }}
//                   inline
//                 />
//               </div>
//             )}
//           </div>

//           <div className="relative">
//             <button className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer">
//               + Evaluation
//             </button>
//           </div>

//           <div className="relative">
//             <button className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer">
//               + Agent
//             </button>
//           </div>
//         </div>

//         {/* Table Head */}
//         <div className="grid grid-cols-5 text-sm text-gray-500 font-semibold border-b pb-2">
//           <span>Date</span>
//           <span>Agent</span>
//           <span>Duration</span>
//           <span>Messages</span>
//           <span>Evaluation result</span>
//         </div>

//         {/* Table Rows */}
//         <div className="divide-y">
//           {filteredData.map((call, i) => (
//             <div
//               key={i}
//               className="grid grid-cols-5 text-sm py-3 items-center text-lime-400 hover:bg-gray-800 cursor-pointer"
//               onClick={() => {
//                 setSelected(call)
//                 setActiveTab('overview')
//               }}
//             >
//               <span>{call.date}</span>
//               <span>{call.agent}</span>
//               <span>{call.duration}</span>
//               <span>{call.messages}</span>
//               <div className="flex justify-center">
//                 <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
//                   {call.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Slide-in Detail View */}
        // <AnimatePresence>
        //   {selected && (
        //     <motion.div
        //     key="detail"
        //     initial={{ x: '100%', opacity: 0 }}
        //     animate={{ x: 0, opacity: 1 }}
        //     exit={{ x: '100%', opacity: 0 }}
        //     transition={{ duration: 0.3 }}
        //     ref={detailRef}
        //     className="fixed top-0 right-0 h-full w-3/4 bg-[#181C29] text-white p-6 z-50 shadow-xl overflow-y-auto"
        //   >
        //   {/* Close button */}
        //   <div className="mb-4">
        //     <button
        //       onClick={() => setSelected(null)}
        //       className="border border-lime-400 px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition cursor-pointer float-right"
        //     >
        //       Close
        //     </button>
        //   </div>

        //   {/* Right Divider (Main one) */}
        //   <div className="h-full border-r border-lime-400 absolute top-0 right-0 mr-100"></div>

        //   <div className="flex items-start h-full">
        //     {/* LEFT SIDE: Conversation Content (limited width so it doesn’t spill past divider) */}
        //     <div className="flex-1 max-w-[calc(100%-12rem)] pr-10">
        //       <p className="text-lg mt-2">Conversation with {selected.agent}</p>

        //       {/* Tab buttons */}
        //       <div className="mt-50 mb-6 flex space-x-10">
        //         <button
        //           className={`cursor-pointer ${activeTab === 'overview' ? 'text-lime-400' : ''}`}
        //           onClick={() => setActiveTab('overview')}
        //         >
        //           Overview
        //         </button>
        //         <button
        //           className={`cursor-pointer ${activeTab === 'transcription' ? 'text-lime-400' : ''}`}
        //           onClick={() => setActiveTab('transcription')}
        //         >
        //           Transcription
        //         </button>
        //         <button
        //           className={`cursor-pointer ${activeTab === 'client' ? 'text-lime-400' : ''}`}
        //           onClick={() => setActiveTab('client')}
        //         >
        //           Client Data
        //         </button>
        //       </div>

        //       {/* Tabs Content */}
        //       <div className="mt-8">
        //         {activeTab === 'overview' && (
        //           <>
        //             {/* Summary */}
        //             <div className="border-t border-lime-400 pt-6">
        //               <p className="text-lg font-bold">Summary</p>
        //               <br />
        //               <p>
        //                 Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
        //                 recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
        //                 dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
        //                 ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
        //                 aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
        //               </p>
        //             </div>

        //             {/* Call Status */}
        //             <div className="border-t border-lime-400 mt-10 mb-5 pt-6">
        //               <div className="flex items-center justify-between">
        //                 <p className="text-lg font-bold">Call Status</p>
        //                 <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-sm leading-none">
        //                   {selected.status}
        //                 </span>
        //               </div>
        //             </div>

        //             {/* SECOND vertical line below Call Status */}
        //             <div className="border-t border-lime-400 pt-6"></div>
        //           </>
        //         )}

        //         {activeTab === 'transcription' && (
        //           <div className="border-t border-lime-400 mt-4 pt-6">
        //             <p className="text-lg font-bold mb-2">Full Transcription</p>
        //           </div>
        //         )}

        //         {activeTab === 'client' && (
        //           <div className="border-t border-lime-400 mt-4 pt-6">
        //             <p className="text-lg font-bold mb-2">Client Data</p>
        //           </div>
        //         )}
        //       </div>
        //     </div>

        //     {/* RIGHT SIDE: Meta Data Panel */}
        //     <div className="mr-[1rem] mt-2 min-w-[10rem]">
        //       <p className="text-lg">Meta Data</p>
        //       <p className="text-sm text-gray-400 mt-2">Date: Today, 9:09 AM</p>
        //       <p className="text-sm text-gray-400">Connection duration: 0:54</p>
        //       <p className="text-sm text-gray-400">Cost (credits): 415</p>
        //       <p className="text-sm text-gray-400">LLM Price Preview: $0.019/min, Total: $0.017</p>
        //     </div>
        //   </div>
        // </motion.div>

        //   )}
        // </AnimatePresence>
//       </main>
//     </div>
//   )
// }


'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

type Call = {
  date: string
  agent: string
  duration: string
  messages: number
  status: string
}

const callData: Call[] = [
  { date: 'Jun 10, 2025 at 2:36 PM', agent: 'New agent', duration: '1:04', messages: 6, status: 'Successful' },
  { date: 'Jun 9, 2025 at 5:17 PM', agent: 'New agent', duration: '0:16', messages: 6, status: 'Error' },
  { date: 'Jun 9, 2025 at 4:23 PM', agent: 'New agent', duration: '0:08', messages: 2, status: 'Successful' },
  { date: 'Jun 9, 2025 at 10:17 AM', agent: 'Urvashi Clone 5', duration: '0:07', messages: 1, status: 'Unknown' },
  { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:04', messages: 1, status: 'Successful' },
  { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:03', messages: 1, status: 'Error' },
  { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:06', messages: 1, status: 'Unknown' },
  { date: 'Jun 9, 2025 at 10:15 AM', agent: 'Urvashi Clone 5', duration: '0:05', messages: 1, status: 'Successful' },
]

function parseCallDate(dateStr: string): Date | null {
  const parsed = Date.parse(dateStr.replace(' at', ''))
  return isNaN(parsed) ? null : new Date(parsed)
}

export default function CallHistoryPage() {
  const [selected, setSelected] = useState<Call | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'transcription' | 'client'>('overview')
  const detailRef = useRef<HTMLDivElement>(null)

  const [showDateAfter, setShowDateAfter] = useState(false)
  const [showDateBefore, setShowDateBefore] = useState(false)
  const [dateAfter, setDateAfter] = useState<Date | null>(null)
  const [dateBefore, setDateBefore] = useState<Date | null>(null)

  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  const filteredData = callData.filter((call) => {
    const callDate = parseCallDate(call.date)
    if (!callDate) return false

    const afterOK = dateAfter ? callDate >= dateAfter : true
    const beforeOK = dateBefore ? callDate <= dateBefore : true
    const statusOK = statusFilter ? call.status.toLowerCase() === statusFilter.toLowerCase() : true

    return afterOK && beforeOK && statusOK
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
        setSelected(null)
      }
    }

    if (selected) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selected])

  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'successful':
        return 'bg-green-100 text-green-700'
      case 'error':
        return 'bg-red-100 text-red-700'
      case 'unknown':
        return 'bg-gray-300 text-gray-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  return (
    <div className="flex min-h-screen bg-black text-black font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-lime-400 p-5 text-sm space-y-6 bg-[#181C29]">
        <div>
          <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
        </div>
        <nav className="space-y-2 text-white cursor-pointer">
          <div className="hover:text-lime-400">📊 Dashboard</div>
          <div className="hover:text-lime-400">👥 Agents</div>
          <div className="hover:text-lime-400">📞 Call History</div>
          <div className="hover:text-lime-400">📚 Knowledge Base</div>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-8 relative text-white">
        <h1 className="text-2xl font-bold mb-6 text-lime-400">Call history</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mb-6 relative z-10">
          <div className="relative">
            <button
              onClick={() => {
                setShowDateAfter(prev => {
                  if (!prev) setShowDateBefore(false)
                  return !prev
                })
              }}
              className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
            >
              + Date After{dateAfter ? ` | ${dateAfter.toLocaleDateString('en-US')}` : ''}
            </button>
            {showDateAfter && (
              <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
                <DatePicker selected={dateAfter} onChange={date => { setDateAfter(date); setShowDateAfter(false) }} inline />
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => {
                setShowDateBefore(prev => {
                  if (!prev) setShowDateAfter(false)
                  return !prev
                })
              }}
              className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
            >
              + Date Before{dateBefore ? ` | ${dateBefore.toLocaleDateString('en-US')}` : ''}
            </button>
            {showDateBefore && (
              <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
                <DatePicker selected={dateBefore} onChange={date => { setDateBefore(date); setShowDateBefore(false) }} inline />
              </div>
            )}
          </div>

          <div className="relative">
            <button onClick={() => setShowStatusDropdown(prev => !prev)} className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer">
              + Evaluation{statusFilter ? ` | ${statusFilter}` : ''}
            </button>
            {showStatusDropdown && (
              <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50 w-40">
                {['Successful', 'Error', 'Unknown', 'Clear'].map(option => (
                  <div
                    key={option}
                    onClick={() => { setStatusFilter(option === 'Clear' ? null : option); setShowStatusDropdown(false) }}
                    className="cursor-pointer text-sm text-white hover:bg-gray-800 px-2 py-1 rounded"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="relative">
            <div className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer">
              + Agent
            </div>
          </div>
        </div>

        {/* Table Head */}
        <div className="grid grid-cols-5 text-sm text-gray-500 font-semibold border-b pb-2">
          <span>Date</span>
          <span>Agent</span>
          <span>Duration</span>
          <span>Messages</span>
          <span>Evaluation result</span>
        </div>

        {/* Table Rows */}
        <div className="divide-y">
          {filteredData.map((call, i) => (
            <div
              key={i}
              className="grid grid-cols-5 text-sm py-3 items-center text-lime-400 hover:bg-gray-800 cursor-pointer"
              onClick={() => {
                setSelected(call)
                setActiveTab('overview')
              }}
            >
              <span>{call.date}</span>
              <span>{call.agent}</span>
              <span>{call.duration}</span>
              <span>{call.messages}</span>
              <div className="flex justify-center">
                <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClasses(call.status)}`}>
                  {call.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Slide-in detail view */}
        <AnimatePresence>
          {selected && (
            <motion.div
            key="detail"
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '100%', opacity: 0 }}
            transition={{ duration: 0.3 }}
            ref={detailRef}
            className="fixed top-0 right-0 h-full w-3/4 bg-[#181C29] text-white p-6 z-50 shadow-xl overflow-y-auto"
          >
          {/* Close button */}
          <div className="mb-4">
            <button
              onClick={() => setSelected(null)}
              className="border border-lime-400 px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition cursor-pointer float-right"
            >
              Close
            </button>
          </div>

          {/* Right Divider (Main one) */}
          <div className="h-full border-r border-lime-400 absolute top-0 right-0 mr-100"></div>

          <div className="flex items-start h-full">
            {/* LEFT SIDE: Conversation Content (limited width so it doesn’t spill past divider) */}
            <div className="flex-1 max-w-[calc(100%-12rem)] pr-10">
              <p className="text-lg mt-2">Conversation with {selected.agent}</p>

              {/* Tab buttons */}
              <div className="mt-50 mb-6 flex space-x-10">
                <button
                  className={`cursor-pointer ${activeTab === 'overview' ? 'text-lime-400' : ''}`}
                  onClick={() => setActiveTab('overview')}
                >
                  Overview
                </button>
                <button
                  className={`cursor-pointer ${activeTab === 'transcription' ? 'text-lime-400' : ''}`}
                  onClick={() => setActiveTab('transcription')}
                >
                  Transcription
                </button>
                <button
                  className={`cursor-pointer ${activeTab === 'client' ? 'text-lime-400' : ''}`}
                  onClick={() => setActiveTab('client')}
                >
                  Client Data
                </button>
              </div>

              {/* Tabs Content */}
              <div className="mt-8">
                {activeTab === 'overview' && (
                  <>
                    {/* Summary */}
                    <div className="border-t border-lime-400 pt-6">
                      <p className="text-lg font-bold">Summary</p>
                      <br />
                      <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
                        recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
                        dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
                        ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
                        aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
                      </p>
                    </div>

                    {/* Call Status */}
                    <div className="border-t border-lime-400 mt-10 mb-5 pt-6">
                      <div className="flex items-center justify-between">
                        <p className="text-lg font-bold">Call Status</p>
                        <span className={`px-3 py-[3px] rounded-full text-sm leading-none ${getStatusBadgeClasses(selected.status)}`}>
                          {selected.status}
                        </span>
                      </div>
                    </div>

                    {/* SECOND vertical line below Call Status */}
                    <div className="border-t border-lime-400 pt-6"></div>
                  </>
                )}

                {activeTab === 'transcription' && (
                  <div className="border-t border-lime-400 mt-4 pt-6">
                    <p className="text-lg font-bold mb-2">Full Transcription</p>
                  </div>
                )}

                {activeTab === 'client' && (
                  <div className="border-t border-lime-400 mt-4 pt-6">
                    <p className="text-lg font-bold mb-2">Client Data</p>
                  </div>
                )}
              </div>
            </div>

            {/* RIGHT SIDE: Meta Data Panel */}
            <div className="mr-[1rem] mt-2 min-w-[10rem]">
              <p className="text-lg">Meta Data</p>
              <p className="text-sm text-gray-400 mt-2">Date: Today, 9:09 AM</p>
              <p className="text-sm text-gray-400">Connection duration: 0:54</p>
              <p className="text-sm text-gray-400">Cost (credits): 415</p>
              <p className="text-sm text-gray-400">LLM Price Preview: $0.019/min, Total: $0.017</p>
            </div>
          </div>
        </motion.div>

      )}
        </AnimatePresence>
      </main>
    </div>
  )
}
