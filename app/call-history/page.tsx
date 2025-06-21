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
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
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
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
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
          // {/* Close button */}
          // <div className="mb-4">
          //   <button
          //     onClick={() => setSelected(null)}
          //     className="border border-lime-400 px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition cursor-pointer float-right"
          //   >
          //     Close
          //   </button>
          // </div>

          // {/* Right Divider (Main one) */}
          // <div className="h-full border-r border-lime-400 absolute top-0 right-0 mr-100"></div>

          // <div className="flex items-start h-full">
          //   {/* LEFT SIDE: Conversation Content (limited width so it doesn’t spill past divider) */}
          //   <div className="flex-1 max-w-[calc(100%-12rem)] pr-10">
          //     <p className="text-lg mt-2">Conversation with {selected.agent}</p>

          //     {/* Tab buttons */}
          //     <div className="mt-50 mb-6 flex space-x-10">
          //       <button
          //         className={`cursor-pointer ${activeTab === 'overview' ? 'text-lime-400' : ''}`}
          //         onClick={() => setActiveTab('overview')}
          //       >
          //         Overview
          //       </button>
          //       <button
          //         className={`cursor-pointer ${activeTab === 'transcription' ? 'text-lime-400' : ''}`}
          //         onClick={() => setActiveTab('transcription')}
          //       >
          //         Transcription
          //       </button>
          //       <button
          //         className={`cursor-pointer ${activeTab === 'client' ? 'text-lime-400' : ''}`}
          //         onClick={() => setActiveTab('client')}
          //       >
          //         Client Data
          //       </button>
          //     </div>

          //     {/* Tabs Content */}
          //     <div className="mt-8">
          //       {activeTab === 'overview' && (
          //         <>
          //           {/* Summary */}
          //           <div className="border-t border-lime-400 pt-6">
          //             <p className="text-lg font-bold">Summary</p>
          //             <br />
          //             <p>
          //               Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
          //               recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
          //               dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
          //               ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
          //               aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
          //             </p>
          //           </div>

          //           {/* Call Status */}
          //           <div className="border-t border-lime-400 mt-10 mb-5 pt-6">
          //             <div className="flex items-center justify-between">
          //               <p className="text-lg font-bold">Call Status</p>
          //               <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-sm leading-none">
          //                 {selected.status}
          //               </span>
          //             </div>
          //           </div>

          //           {/* SECOND vertical line below Call Status */}
          //           <div className="border-t border-lime-400 pt-6"></div>
          //         </>
          //       )}

          //       {activeTab === 'transcription' && (
          //         <div className="border-t border-lime-400 mt-4 pt-6">
          //           <p className="text-lg font-bold mb-2">Full Transcription</p>
          //         </div>
          //       )}

          //       {activeTab === 'client' && (
          //         <div className="border-t border-lime-400 mt-4 pt-6">
          //           <p className="text-lg font-bold mb-2">Client Data</p>
          //         </div>
          //       )}
          //     </div>
          //   </div>

          //   {/* RIGHT SIDE: Meta Data Panel */}
          //   <div className="mr-[1rem] mt-2 min-w-[10rem]">
          //     <p className="text-lg">Meta Data</p>
          //     <p className="text-sm text-gray-400 mt-2">Date: Today, 9:09 AM</p>
          //     <p className="text-sm text-gray-400">Connection duration: 0:54</p>
          //     <p className="text-sm text-gray-400">Cost (credits): 415</p>
          //     <p className="text-sm text-gray-400">LLM Price Preview: $0.019/min, Total: $0.017</p>
          //   </div>
          // </div>
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
//   { date: 'Jun 9, 2025 at 5:17 PM', agent: 'New agent', duration: '0:16', messages: 6, status: 'Error' },
//   { date: 'Jun 9, 2025 at 4:23 PM', agent: 'New agent', duration: '0:08', messages: 2, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:17 AM', agent: 'Urvashi Clone 5', duration: '0:07', messages: 1, status: 'Unknown' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:04', messages: 1, status: 'Successful' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:03', messages: 1, status: 'Error' },
//   { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:06', messages: 1, status: 'Unknown' },
//   { date: 'Jun 9, 2025 at 10:15 AM', agent: 'Urvashi Clone 5', duration: '0:05', messages: 1, status: 'Successful' },
// ]

// function parseCallDate(dateStr: string): Date | null {
//   const parsed = Date.parse(dateStr.replace(' at', ''))
//   return isNaN(parsed) ? null : new Date(parsed)
// }

// export default function CallHistoryPage() {
//   const [selected, setSelected] = useState<Call | null>(null)
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
//   const detailRef = useRef<HTMLDivElement>(null)

//   const [showDateAfter, setShowDateAfter] = useState(false)
//   const [showDateBefore, setShowDateBefore] = useState(false)
//   const [showStatusDropdown, setShowStatusDropdown] = useState(false)
//   const [showAgentDropdown, setShowAgentDropdown] = useState(false)

//   const [dateAfter, setDateAfter] = useState<Date | null>(null)
//   const [dateBefore, setDateBefore] = useState<Date | null>(null)
//   const [statusFilter, setStatusFilter] = useState<string | null>(null)
//   const [agentFilter, setAgentFilter] = useState<string | null>(null)

//   const uniqueAgents = Array.from(new Set(callData.map(call => call.agent)))

//   const filteredData = callData.filter(call => {
//     const callDate = parseCallDate(call.date)
//     if (!callDate) return false

//     const afterOK = dateAfter ? callDate >= dateAfter : true
//     const beforeOK = dateBefore ? callDate <= dateBefore : true
//     const statusOK = statusFilter ? call.status.toLowerCase() === statusFilter.toLowerCase() : true
//     const agentOK = agentFilter ? call.agent === agentFilter : true

//     return afterOK && beforeOK && statusOK && agentOK
//   })

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
//         setSelected(null)
//       }
//     }

//     if (selected) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [selected])

//   const closeAllDropdowns = () => {
//     setShowDateAfter(false)
//     setShowDateBefore(false)
//     setShowStatusDropdown(false)
//     setShowAgentDropdown(false)
//   }

//   const getStatusBadgeClasses = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'successful':
//         return 'bg-green-100 text-green-700'
//       case 'error':
//         return 'bg-red-100 text-red-700'
//       case 'unknown':
//         return 'bg-gray-300 text-gray-800'
//       default:
//         return 'bg-gray-200 text-gray-800'
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-black text-black font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-lime-400 p-5 text-sm space-y-6 bg-[#181C29]">
//         <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
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
//           {/* Date After */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowDateAfter(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Date After{dateAfter ? ` | ${dateAfter.toLocaleDateString('en-US')}` : ''}
//             </button>
//             {showDateAfter && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
//                 <DatePicker selected={dateAfter} onChange={date => { setDateAfter(date); setShowDateAfter(false) }} inline />
//               </div>
//             )}
//           </div>

//           {/* Date Before */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowDateBefore(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Date Before{dateBefore ? ` | ${dateBefore.toLocaleDateString('en-US')}` : ''}
//             </button>
//             {showDateBefore && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
//                 <DatePicker selected={dateBefore} onChange={date => { setDateBefore(date); setShowDateBefore(false) }} inline />
//               </div>
//             )}
//           </div>

//           {/* Evaluation Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowStatusDropdown(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Evaluation{statusFilter ? ` | ${statusFilter}` : ''}
//             </button>
//             {showStatusDropdown && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50 w-40">
//                 {['Successful', 'Error', 'Unknown', 'Clear'].map(option => (
//                   <div
//                     key={option}
//                     onClick={() => {
//                       setStatusFilter(option === 'Clear' ? null : option)
//                       setShowStatusDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-white hover:bg-gray-800 px-2 py-1 rounded"
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Agent Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowAgentDropdown(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Agent{agentFilter ? ` | ${agentFilter}` : ''}
//             </button>
//             {showAgentDropdown && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50 w-40">
//                 {uniqueAgents.map(agent => (
//                   <div
//                     key={agent}
//                     onClick={() => {
//                       setAgentFilter(agent)
//                       setShowAgentDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-white hover:bg-gray-800 px-2 py-1 rounded"
//                   >
//                     {agent}
//                   </div>
//                 ))}
//                 <div
//                   onClick={() => {
//                     setAgentFilter(null)
//                     setShowAgentDropdown(false)
//                   }}
//                   className="cursor-pointer text-sm text-white hover:bg-gray-800 px-2 py-1 rounded"
//                 >
//                   Clear
//                 </div>
//               </div>
//             )}
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
//                 <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClasses(call.status)}`}>
//                   {call.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Slide-in detail view */}
//         <AnimatePresence>
//           {selected && (
//             <motion.div
//               key="detail"
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '100%', opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               ref={detailRef}
//               className="fixed top-0 right-0 h-full w-3/4 bg-[#181C29] text-white p-6 z-50 shadow-xl overflow-y-auto"
//             >
//                  {/* Close button */}
//           <div className="mb-4">
//             <button
//               onClick={() => setSelected(null)}
//               className="border border-lime-400 px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition cursor-pointer float-right"
//             >
//               Close
//             </button>
//           </div>

//           {/* Right Divider (Main one) */}
//           <div className="h-full border-r border-lime-400 absolute top-0 right-0 mr-100"></div>

//           <div className="flex items-start h-full">
//             {/* LEFT SIDE: Conversation Content (limited width so it doesn’t spill past divider) */}
//             <div className="flex-1 max-w-[calc(100%-12rem)] pr-10">
//               <p className="text-lg mt-2">Conversation with {selected.agent}</p>

//               {/* Tab buttons */}
//               <div className="mt-50 mb-6 flex space-x-10">
//                 <button
//                   className={`cursor-pointer ${activeTab === 'overview' ? 'text-lime-400' : ''}`}
//                   onClick={() => setActiveTab('overview')}
//                 >
//                   Overview
//                 </button>
//                 <button
//                   className={`cursor-pointer ${activeTab === 'transcription' ? 'text-lime-400' : ''}`}
//                   onClick={() => setActiveTab('transcription')}
//                 >
//                   Transcription
//                 </button>
//                 <button
//                   className={`cursor-pointer ${activeTab === 'client' ? 'text-lime-400' : ''}`}
//                   onClick={() => setActiveTab('client')}
//                 >
//                   Client Data
//                 </button>
//               </div>

//               {/* Tabs Content */}
//               <div className="mt-8">
//                 {activeTab === 'overview' && (
//                   <>
//                     {/* Summary */}
//                     <div className="border-t border-lime-400 pt-6">
//                       <p className="text-lg font-bold">Summary</p>
//                       <br />
//                       <p>
//                         Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
//                         recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
//                         dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
//                         ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
//                         aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
//                       </p>
//                     </div>

//                     {/* Call Status */}
//                     <div className="border-t border-lime-400 mt-10 mb-5 pt-6">
//                       <div className="flex items-center justify-between">
//                         <p className="text-lg font-bold">Call Status</p>
//                         <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-sm leading-none">
//                           {selected.status}
//                         </span>
//                       </div>
//                     </div>

//                     {/* SECOND vertical line below Call Status */}
//                     <div className="border-t border-lime-400 pt-6"></div>
//                   </>
//                 )}

//                 {activeTab === 'transcription' && (
//                   <div className="border-t border-lime-400 mt-4 pt-6">
//                     <p className="text-lg font-bold mb-2">Full Transcription</p>
//                   </div>
//                 )}

//                 {activeTab === 'client' && (
//                   <div className="border-t border-lime-400 mt-4 pt-6">
//                     <p className="text-lg font-bold mb-2">Client Data</p>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* RIGHT SIDE: Meta Data Panel */}
//             <div className="mr-[1rem] mt-2 min-w-[10rem]">
//               <p className="text-lg">Meta Data</p>
//               <p className="text-sm text-gray-400 mt-2">Date: Today, 9:09 AM</p>
//               <p className="text-sm text-gray-400">Connection duration: 0:54</p>
//               <p className="text-sm text-gray-400">Cost (credits): 415</p>
//               <p className="text-sm text-gray-400">LLM Price Preview: $0.019/min, Total: $0.017</p>
//             </div>
//           </div>
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
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import Link from 'next/link'

// type TranscriptionLine = {
//   speaker: string
//   text: string
// }

// type Call = {
//   date: string
//   agent: string
//   duration: string
//   messages: number
//   status: string
//   convoId?: string
//   transcription?: TranscriptionLine[] // ← added this bad boy
// }

// const callData: Call[] = [
//   {
//     date: 'Jun 10, 2025 at 2:36 PM',
//     agent: 'New agent',
//     duration: '1:04',
//     messages: 6,
//     status: 'Successful',
//     convoId: 'abc-123-xyz',
//     transcription: [
//       { speaker: 'User', text: 'Hey there!' },
//       { speaker: 'Agent', text: 'Hello! How can I help you?' },
//     ],
//   },
//   {
//     date: 'Jun 9, 2025 at 5:17 PM',
//     agent: 'New agent',
//     duration: '0:16',
//     messages: 6,
//     status: 'Error',
//     convoId: 'def-456-hij',
//     transcription: [
//       { speaker: 'User', text: 'Something went wrong.' },
//       { speaker: 'Agent', text: 'Oops, let me check.' },
//     ],
//   },
//   {
//     date: 'Jun 9, 2025 at 4:23 PM',
//     agent: 'New agent',
//     duration: '0:08',
//     messages: 2,
//     status: 'Successful',
//     convoId: 'abc-123-xyz',
//   },
//   {
//     date: 'Jun 9, 2025 at 10:17 AM',
//     agent: 'Urvashi Clone 5',
//     duration: '0:07',
//     messages: 1,
//     status: 'Unknown',
//     convoId: 'def-456-hij',
//   },
//   {
//     date: 'Jun 9, 2025 at 10:16 AM',
//     agent: 'Urvashi Clone 5',
//     duration: '0:04',
//     messages: 1,
//     status: 'Successful',
//     convoId: 'abc-123-xyz',
//   },
//   {
//     date: 'Jun 9, 2025 at 10:16 AM',
//     agent: 'Urvashi Clone 5',
//     duration: '0:03',
//     messages: 1,
//     status: 'Error',
//     convoId: 'def-456-hij',
//   },
//   {
//     date: 'Jun 9, 2025 at 10:16 AM',
//     agent: 'Urvashi Clone 5',
//     duration: '0:06',
//     messages: 1,
//     status: 'Unknown',
//     convoId: 'abc-123-xyz',
//   },
//   {
//     date: 'Jun 9, 2025 at 10:15 AM',
//     agent: 'Urvashi Clone 5',
//     duration: '0:05',
//     messages: 1,
//     status: 'Successful',
//     convoId: 'def-456-hij',
//   },
// ]
// function parseCallDate(dateStr: string): Date | null {
//   const parsed = Date.parse(dateStr.replace(' at', ''))
//   return isNaN(parsed) ? null : new Date(parsed)
// }

// export default function CallHistoryPage() {
//   const [selected, setSelected] = useState<Call | null>(null)
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
//   const detailRef = useRef<HTMLDivElement>(null)

//   const [showDateAfter, setShowDateAfter] = useState(false)
//   const [showDateBefore, setShowDateBefore] = useState(false)
//   const [showStatusDropdown, setShowStatusDropdown] = useState(false)
//   const [showAgentDropdown, setShowAgentDropdown] = useState(false)

//   const [dateAfter, setDateAfter] = useState<Date | null>(null)
//   const [dateBefore, setDateBefore] = useState<Date | null>(null)
//   const [statusFilter, setStatusFilter] = useState<string | null>(null)
//   const [agentFilter, setAgentFilter] = useState<string | null>(null)

//   const uniqueAgents = Array.from(new Set(callData.map(call => call.agent)))

//   const filteredData = callData.filter(call => {
//     const callDate = parseCallDate(call.date)
//     if (!callDate) return false

//     const afterOK = dateAfter ? callDate >= dateAfter : true
//     const beforeOK = dateBefore ? callDate <= dateBefore : true
//     const statusOK = statusFilter ? call.status.toLowerCase() === statusFilter.toLowerCase() : true
//     const agentOK = agentFilter ? call.agent === agentFilter : true

//     return afterOK && beforeOK && statusOK && agentOK
//   })

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
//         setSelected(null)
//       }
//     }

//     if (selected) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [selected])

//   const closeAllDropdowns = () => {
//     setShowDateAfter(false)
//     setShowDateBefore(false)
//     setShowStatusDropdown(false)
//     setShowAgentDropdown(false)
//   }

//   const getStatusBadgeClasses = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'successful':
//         return 'bg-green-100 text-green-700'
//       case 'error':
//         return 'bg-red-100 text-red-700'
//       case 'unknown':
//         return 'bg-gray-300 text-gray-800'
//       default:
//         return 'bg-gray-200 text-gray-800'
//     }
//   }

//   return (
//     <div className="flex min-h-screen bg-black text-black font-sans">
//       {/* Sidebar */}
//       <aside className="w-64 border-r border-lime-400 p-5 text-sm space-y-6 bg-[#181C29]">
//         <h1 className="text-2xl font-bold text-lime-400">🧠 Conversational AI</h1>
//         <nav className="space-y-2 text-white">
//           <Link href="/dashboard" className="block hover:text-lime-400 cursor-pointer">
//             📊 Dashboard
//           </Link>
//           <Link href="/agents" className="block hover:text-lime-400 cursor-pointer">
//             👥 Agents
//           </Link>
//           <Link href="/call-history" className="block hover:text-lime-400 cursor-pointer">
//             📞 Call History
//           </Link>
//           <Link href="/knowledge-base" className="block hover:text-lime-400 cursor-pointer">
//             📚 Knowledge Base
//           </Link>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-8 relative text-white">
//         <h1 className="text-2xl font-bold mb-6 text-lime-400">Call history</h1>

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6 relative z-10">
//           {/* Date After */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowDateAfter(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Date After{dateAfter ? ` | ${dateAfter.toLocaleDateString('en-US')}` : ''}
//             </button>
//             {showDateAfter && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
//                 <DatePicker selected={dateAfter} onChange={date => { setDateAfter(date); setShowDateAfter(false) }} inline />
//               </div>
//             )}
//           </div>

//           {/* Date Before */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowDateBefore(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Date Before{dateBefore ? ` | ${dateBefore.toLocaleDateString('en-US')}` : ''}
//             </button>
//             {showDateBefore && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50">
//                 <DatePicker selected={dateBefore} onChange={date => { setDateBefore(date); setShowDateBefore(false) }} inline />
//               </div>
//             )}
//           </div>

//           {/* Evaluation Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowStatusDropdown(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Evaluation{statusFilter ? ` | ${statusFilter}` : ''}
//             </button>
//             {showStatusDropdown && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50 w-40">
//                 {['Successful', 'Error', 'Unknown', 'Clear'].map(option => (
//                   <div
//                     key={option}
//                     onClick={() => {
//                       setStatusFilter(option === 'Clear' ? null : option)
//                       setShowStatusDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-white hover:bg-gray-800 px-2 py-1 rounded"
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Agent Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowAgentDropdown(prev => !prev)
//               }}
//               className="text-xs border border-lime-400 rounded-full px-4 py-1 hover:bg-gray-800 cursor-pointer"
//             >
//               + Agent{agentFilter ? ` | ${agentFilter}` : ''}
//             </button>
//             {showAgentDropdown && (
//               <div className="absolute mt-2 bg-black p-2 rounded shadow-xl z-50 w-40">
//                 {uniqueAgents.map(agent => (
//                   <div
//                     key={agent}
//                     onClick={() => {
//                       setAgentFilter(agent)
//                       setShowAgentDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-white hover:bg-gray-800 px-2 py-1 rounded"
//                   >
//                     {agent}
//                   </div>
//                 ))}
//                 <div
//                   onClick={() => {
//                     setAgentFilter(null)
//                     setShowAgentDropdown(false)
//                   }}
//                   className="cursor-pointer text-sm text-white hover:bg-gray-800 px-2 py-1 rounded"
//                 >
//                   Clear
//                 </div>
//               </div>
//             )}
//           </div>
//           {/* ✖ Clear All Filters */}
//           {(dateAfter || dateBefore || statusFilter || agentFilter) && (
//             <button
//               onClick={() => {
//                 setDateAfter(null)
//                 setDateBefore(null)
//                 setStatusFilter(null)
//                 setAgentFilter(null)
//                 closeAllDropdowns()
//               }}
//               className="text-xs border border-red-500 text-red-400 rounded-full px-4 py-1 hover:bg-red-900 cursor-pointer"
//             >
//               ✖ Clear All Filters
//             </button>
//           )}
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
//                 <span className={`px-2 py-0.5 rounded-full text-xs ${getStatusBadgeClasses(call.status)}`}>
//                   {call.status}
//                 </span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Slide-in detail view */}
        // <AnimatePresence>
        //   {selected && (
        //     <motion.div
        //       key="detail"
        //       initial={{ x: '100%', opacity: 0 }}
        //       animate={{ x: 0, opacity: 1 }}
        //       exit={{ x: '100%', opacity: 0 }}
        //       transition={{ duration: 0.3 }}
        //       ref={detailRef}
        //       className="fixed top-0 right-0 h-full w-3/4 bg-[#181C29] text-white p-6 z-50 shadow-xl overflow-y-auto"
        //     >
        //       {/* Close button */}
        //       <div className="mb-4">
        //         <button
        //           onClick={() => setSelected(null)}
        //           className="border border-lime-400 px-3 py-1 text-sm rounded-md hover:bg-gray-700 transition cursor-pointer float-right"
        //         >
        //           Close
        //         </button>
        //       </div>

        //       {/* Right Divider (Main one) */}
        //       <div className="h-full border-r border-lime-400 absolute top-0 right-0 mr-100"></div>

        //       <div className="flex items-start h-full">
        //         {/* LEFT SIDE: Conversation Content */}
        //         <div className="flex-1 max-w-[calc(100%-12rem)] pr-10">
        //           <div className="mt-2 mb-4">
        //             <div className="flex items-center justify-between">
        //               <p className="text-lg font-semibold">Conversation with {selected.agent}</p>
        //               <p className="text-sm text-gray-400 ml-4">{selected.convoId || 'xyz-123-abc'}</p>
        //             </div>
        //           </div>

        //           <audio
        //             controls
        //             loop
        //             preload="auto"
        //             className="mt-4 w-full max-w-md rounded-md bg-gray-800"
        //           >
        //             <source src="/call-audio.mp3" type="audio/mpeg" />
        //             Your browser does not support the audio element.
        //           </audio>

        //           {/* Tab buttons */}
        //           <div className="mt-50 mb-6 flex space-x-10">
        //             <button
        //               className={`cursor-pointer ${activeTab === 'overview' ? 'text-lime-400' : ''}`}
        //               onClick={() => setActiveTab('overview')}
        //             >
        //               Overview
        //             </button>
        //             <button
        //               className={`cursor-pointer ${activeTab === 'transcription' ? 'text-lime-400' : ''}`}
        //               onClick={() => setActiveTab('transcription')}
        //             >
        //               Transcription
        //             </button>
        //             <button
        //               className={`cursor-pointer ${activeTab === 'client' ? 'text-lime-400' : ''}`}
        //               onClick={() => setActiveTab('client')}
        //             >
        //               Client Data
        //             </button>
        //           </div>

        //           {/* Tabs Content */}
        //           <div className="mt-8">
        //             {activeTab === 'overview' && (
        //               <>
        //                 {/* Summary */}
        //                 <div className="border-t border-lime-400 pt-6">
        //                   <p className="text-lg font-bold">Summary</p>
        //                   <br />
        //                   <p>
        //                     Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
        //                     recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
        //                     dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
        //                     ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
        //                     aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
        //                   </p>
        //                 </div>

        //                 {/* Call Status */}
        //                 <div className="border-t border-lime-400 mt-10 mb-5 pt-6">
        //                   <div className="flex items-center justify-between">
        //                     <p className="text-lg font-bold">Call Status</p>
        //                     <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-sm leading-none">
        //                       {selected.status}
        //                     </span>
        //                   </div>
        //                 </div>

        //                 {/* SECOND vertical line below Call Status */}
        //                 <div className="border-t border-lime-400 pt-6"></div>
        //               </>
        //             )}

        //             {activeTab === 'transcription' && (
        //               <div className="border-t border-lime-400 mt-4 pt-6">
        //                 <p className="text-lg font-bold mb-4">Full Transcription</p>

        //                 <div className="space-y-4">
        //                   {selected.transcription?.map((line, index) => (
        //                     <div
        //                       key={index}
        //                       className={`flex ${line.speaker === 'User' ? 'justify-end' : 'justify-start'}`}
        //                     >
        //                       <div
        //                         className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow-md ${
        //                           line.speaker === 'User'
        //                             ? 'bg-lime-500 text-black'
        //                             : 'bg-gray-700 text-white'
        //                         }`}
        //                       >
        //                         <p className="font-semibold mb-1">{line.speaker}</p>
        //                         <p>{line.text}</p>
        //                       </div>
        //                     </div>
        //                   ))}
        //                 </div>
        //               </div>
        //             )}


        //             {activeTab === 'client' && (
        //               <div className="border-t border-lime-400 mt-4 pt-6">
        //                 <div className="bg-gray-600 text-gray-300 rounded-lg p-6 border border-lime-400">
        //                   <p className="text-2xl text-center font-medium mb-1">No client data</p>
        //                   <p className="text-sm text-center text-gray-200">
        //                     This conversation did not receive any client data. When sent, client overrides, custom LLM body, and dynamic
        //                     variables will be shown here.
        //                   </p>
        //                 </div>
        //               </div>
        //             )}
        //           </div>
        //         </div>

        //         {/* RIGHT SIDE: Meta Data Panel */}
        //         <div className="mr-[1rem] mt-2 min-w-[10rem]">
        //           <p className="text-lg">Meta Data</p>
        //           <p className="text-sm text-gray-400 mt-2">Date: Today, 9:09 AM</p>
        //           <p className="text-sm text-gray-400">Connection duration: 0:54</p>
        //           <p className="text-sm text-gray-400">Cost (credits): 415</p>
        //           <p className="text-sm text-gray-400">LLM Price Preview: $0.019/min, Total: $0.017</p>
        //         </div>
        //       </div>
        //     </motion.div>
        //   )}
//         </AnimatePresence>

//       </main>
//     </div>
//   )
// }






// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { createApiUrl } from '@/lib/config'
// import NavigationLayout from '@/components/NavigationLayout'

// type TranscriptionLine = {
//   speaker: string
//   text: string
// }

// type Call = {
//   date: string
//   agent: string
//   duration: string
//   messages: number
//   status: string
//   convoId?: string
//   transcription?: TranscriptionLine[]
// }

// function parseCallDate(dateStr: string): Date | null {
//   const parsed = Date.parse(dateStr.replace(' at', ''))
//   return isNaN(parsed) ? null : new Date(parsed)
// }

// export default function CallHistoryPage() {
//   const [calls, setCalls] = useState<Call[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selected, setSelected] = useState<Call | null>(null)
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
//   const detailRef = useRef<HTMLDivElement>(null)

//   const [showDateAfter, setShowDateAfter] = useState(false)
//   const [showDateBefore, setShowDateBefore] = useState(false)
//   const [showStatusDropdown, setShowStatusDropdown] = useState(false)
//   const [showAgentDropdown, setShowAgentDropdown] = useState(false)

//   const [dateAfter, setDateAfter] = useState<Date | null>(null)
//   const [dateBefore, setDateBefore] = useState<Date | null>(null)
//   const [statusFilter, setStatusFilter] = useState<string | null>(null)
//   const [agentFilter, setAgentFilter] = useState<string | null>(null)

//   // Fetch calls from API
//   useEffect(() => {
//     const fetchCalls = async () => {
//       try {
//         if (typeof window === 'undefined') return;
        
//         const token = localStorage.getItem('jwtToken')
//         if (!token) {
//           console.warn('No JWT token found')
//           setLoading(false)
//           return
//         }

//         const res = await fetch(createApiUrl('/user/conversations/'), {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`)
//         }

//         const data = await res.json()
//         // Map the API conversation data to Call type for your UI
//         const formattedCalls: Call[] = data.conversations.map((conv: any) => { // eslint-disable-line @typescript-eslint/no-explicit-any
//           // Format Unix timestamp to readable date string
//           const dateObj = new Date(conv.start_time_unix_secs * 1000)
//           const dateStr = dateObj.toLocaleString('en-US', {
//             month: 'short',
//             day: 'numeric',
//             year: 'numeric',
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//           })

//           // Format duration seconds to "m:ss" format
//           const minutes = Math.floor(conv.call_duration_secs / 60)
//           const seconds = conv.call_duration_secs % 60
//           const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`

//           // Map API status to your UI status format if needed
//           let statusText = conv.call_successful || conv.status || 'Unknown'
//           statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1).toLowerCase()

//           return {
//             date: dateStr,
//             agent: conv.agent_name,
//             duration: durationStr,
//             messages: conv.message_count,
//             status: statusText,
//             convoId: conv.conversation_id,
//             // No transcription for now, can add later if you fetch that separately
//           }
//         })

//         setCalls(formattedCalls)
//         setLoading(false)
//       } catch (err) {
//         console.error('Error fetching conversations:', err)
//         setLoading(false)
//       }
//     }

//     fetchCalls()
//   }, [])

//   const closeAllDropdowns = () => {
//     setShowDateAfter(false)
//     setShowDateBefore(false)
//     setShowStatusDropdown(false)
//     setShowAgentDropdown(false)
//   }

//   const getStatusBadgeClasses = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'success':
//       case 'successful':
//         return 'bg-green-100 text-green-700'
//       case 'error':
//         return 'bg-red-100 text-red-700'
//       case 'unknown':
//         return 'bg-gray-300 text-gray-800'
//       default:
//         return 'bg-gray-200 text-gray-800'
//     }
//   }

//   const uniqueAgents = Array.from(new Set(calls.map(call => call.agent)))

//   const filteredData = calls.filter(call => {
//     const callDate = parseCallDate(call.date)
//     if (!callDate) return false

//     const afterOK = dateAfter ? callDate >= dateAfter : true
//     const beforeOK = dateBefore ? callDate <= dateBefore : true
//     const statusOK = statusFilter ? call.status.toLowerCase() === statusFilter.toLowerCase() : true
//     const agentOK = agentFilter ? call.agent === agentFilter : true

//     return afterOK && beforeOK && statusOK && agentOK
//   })

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
//         setSelected(null)
//       }
//     }

//     if (selected) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [selected])

//   return (
//     <NavigationLayout 
//       title="Call History" 
//       currentPage="/call-history"
//     >
//       <div className="flex-1 relative text-gray-900">

//         {/* Filters */}
//         <div className="flex flex-wrap gap-4 mb-6 relative z-40 overflow-visible">
//           {/* Date After */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowDateAfter(prev => !prev)
//               }}
//               className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
//             >
//               + Date After{dateAfter ? ` | ${dateAfter.toLocaleDateString('en-US')}` : ''}
//             </button>
//             {showDateAfter && (
//               <div className="absolute mt-2 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-200">
//                 <DatePicker
//                   selected={dateAfter}
//                   onChange={date => {
//                     setDateAfter(date)
//                     setShowDateAfter(false)
//                   }}
//                   inline
//                 />
//               </div>
//             )}
//           </div>

//           {/* Date Before */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowDateBefore(prev => !prev)
//               }}
//               className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
//             >
//               + Date Before{dateBefore ? ` | ${dateBefore.toLocaleDateString('en-US')}` : ''}
//             </button>
//             {showDateBefore && (
//               <div className="absolute mt-2 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-200">
//                 <DatePicker
//                   selected={dateBefore}
//                   onChange={date => {
//                     setDateBefore(date)
//                     setShowDateBefore(false)
//                   }}
//                   inline
//                 />
//               </div>
//             )}
//           </div>

//           {/* Evaluation Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowStatusDropdown(prev => !prev)
//               }}
//               className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
//             >
//               + Evaluation{statusFilter ? ` | ${statusFilter}` : ''}
//             </button>
//             {showStatusDropdown && (
//               <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
//                 {['Successful', 'Error', 'Unknown', 'Clear'].map(option => (
//                   <div
//                     key={option}
//                     onClick={() => {
//                       setStatusFilter(option === 'Clear' ? null : option)
//                       setShowStatusDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Agent Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowAgentDropdown(prev => !prev)
//               }}
//               className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
//             >
//               + Agent{agentFilter ? ` | ${agentFilter}` : ''}
//             </button>
//             {showAgentDropdown && (
//               <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
//                 {uniqueAgents.map(agent => (
//                   <div
//                     key={agent}
//                     onClick={() => {
//                       setAgentFilter(agent)
//                       setShowAgentDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
//                   >
//                     {agent}
//                   </div>
//                 ))}
//                 <div
//                   onClick={() => {
//                     setAgentFilter(null)
//                     setShowAgentDropdown(false)
//                   }}
//                   className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
//                 >
//                   Clear
//                 </div>
//               </div>
//             )}
//           </div>

//           {/* ✖ Clear All Filters */}
//           {(dateAfter || dateBefore || statusFilter || agentFilter) && (
//             <button
//               onClick={() => {
//                 setDateAfter(null)
//                 setDateBefore(null)
//                 setStatusFilter(null)
//                 setAgentFilter(null)
//                 closeAllDropdowns()
//               }}
//               className="text-sm border border-red-200 text-red-600 rounded-full px-4 py-2 hover:bg-red-50 cursor-pointer bg-white transition-all duration-200 shadow-sm"
//             >
//               ✖ Clear All Filters
//             </button>
//           )}
//         </div>

//         {/* Table */}
//         {loading ? (
//           <div className="text-gray-600 mt-4 text-center">Loading call history...</div>
//         ) : filteredData.length === 0 ? (
//           <div className="text-gray-500 mt-4 text-center">No calls match your filters.</div>
//         ) : (
//           <div className="modern-card overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Date</th>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Agent</th>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Duration</th>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Messages</th>
//                   <th className="p-4 text-center text-sm font-semibold text-gray-900">Evaluation result</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((call, i) => (
//                   <tr
//                     key={i}
//                     className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
//                     onClick={() => {
//                       setSelected(call)
//                       setActiveTab('overview')
//                     }}
//                   >
//                     <td className="p-4 text-gray-800">{call.date}</td>
//                     <td className="p-4 text-gray-800">{call.agent}</td>
//                     <td className="p-4 text-gray-800">{call.duration}</td>
//                     <td className="p-4 text-gray-800">{call.messages}</td>
//                     <td className="p-4 text-center">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(call.status)}`}>
//                         {call.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Slide-in detail view (you can complete this later) */}
//         <AnimatePresence>
//           {selected && (
//             <motion.div
//               key="detail"
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '100%', opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               ref={detailRef}
//               className="fixed top-0 right-0 h-full w-3/4 bg-white text-gray-900 p-6 z-50 shadow-2xl overflow-y-auto border-l border-gray-200"
//             >
//               {/* Close button */}
//               <div className="mb-4">
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="border border-gray-200 px-3 py-1 text-sm rounded-md hover:bg-gray-50 transition-colors cursor-pointer float-right text-gray-700"
//                 >
//                   Close
//                 </button>
//               </div>

//               {/* Right Divider: Position this precisely at the boundary */}
//               <div
//                 className="border-r border-gray-200 absolute top-0 bottom-0"
//                 style={{ right: '20rem', width: '1px' }}
//               ></div>

//               <div className="flex items-start h-full">
//                 {/* LEFT SIDE: Conversation Content */}
//                 <div
//                   className="flex-1 pr-10"
//                   style={{ maxWidth: 'calc(100% - 12rem)' }}
//                 >
//                   <div className="mt-2 mb-4">
//                     <div className="flex items-center justify-between">
//                       <p className="text-lg font-semibold text-gray-900">Conversation with {selected.agent}</p>
//                       <p className="text-sm text-gray-500 ml-4">{selected.convoId || 'xyz-123-abc'}</p>
//                     </div>
//                   </div>

//                   <audio
//                     controls
//                     loop
//                     preload="auto"
//                     className="mt-4 w-full max-w-md rounded-lg border border-gray-200"
//                   >
//                     <source src="/call-audio.mp3" type="audio/mpeg" />
//                     Your browser does not support the audio element.
//                   </audio>

//                   {/* Tab buttons */}
//                   <div className="mt-8 mb-6 flex space-x-10">
//                     <button
//                       className={`cursor-pointer transition-colors duration-200 ${activeTab === 'overview' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
//                       onClick={() => setActiveTab('overview')}
//                     >
//                       Overview
//                     </button>
//                     <button
//                       className={`cursor-pointer transition-colors duration-200 ${activeTab === 'transcription' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
//                       onClick={() => setActiveTab('transcription')}
//                     >
//                       Transcription
//                     </button>
//                     <button
//                       className={`cursor-pointer transition-colors duration-200 ${activeTab === 'client' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
//                       onClick={() => setActiveTab('client')}
//                     >
//                       Client Data
//                     </button>
//                   </div>

//                   {/* Tabs Content */}
//                   <div className="mt-8">
//                     {activeTab === 'overview' && (
//                       <>
//                         {/* Summary */}
//                         <div className="border-t border-gray-200 pt-6">
//                           <p className="text-lg font-bold text-gray-900">Summary</p>
//                           <br />
//                           <p className="text-gray-700 leading-relaxed">
//                             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
//                             recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
//                             dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
//                             ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
//                             aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
//                           </p>
//                         </div>

//                         {/* Call Status */}
//                         <div className="border-t border-gray-200 mt-10 mb-5 pt-6">
//                           <div className="flex items-center justify-between">
//                             <p className="text-lg font-bold text-gray-900">Call Status</p>
//                             <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-sm leading-none">
//                               {selected.status}
//                             </span>
//                           </div>
//                         </div>

//                         {/* SECOND vertical line below Call Status */}
//                         <div className="border-t border-gray-200 pt-6"></div>
//                       </>
//                     )}

//                     {activeTab === 'transcription' && (
//                       <div className="border-t border-gray-200 mt-4 pt-6">
//                         <p className="text-lg font-bold mb-4 text-gray-900">Full Transcription</p>

//                         <div className="space-y-4">
//                           {selected.transcription?.map((line, index) => (
//                             <div
//                               key={index}
//                               className={`flex ${line.speaker === 'User' ? 'justify-end' : 'justify-start'}`}
//                             >
//                               <div
//                                 className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow-md ${
//                                   line.speaker === 'User'
//                                     ? 'bg-orange-500 text-white'
//                                     : 'bg-gray-100 text-gray-800 border border-gray-200'
//                                 }`}
//                               >
//                                 <p className="font-semibold mb-1">{line.speaker}</p>
//                                 <p>{line.text}</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {activeTab === 'client' && (
//                       <div className="border-t border-gray-200 mt-4 pt-6">
//                         <div className="bg-gray-50 text-gray-600 rounded-lg p-6 border border-gray-200">
//                           <p className="text-2xl text-center font-medium mb-1 text-gray-700">No client data</p>
//                           <p className="text-sm text-center text-gray-600">
//                             This conversation did not receive any client data. When sent, client overrides, custom LLM body, and dynamic
//                             variables will be shown here.
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* RIGHT SIDE: Meta Data Panel */}
//                 <div
//                   className="mt-2"
//                   style={{
//                     width: '12rem', // fixed width
//                     flexShrink: 0,  // prevent shrinking when content is missing
//                     marginLeft: '1rem', // space from left content
//                   }}
//                 >
//                   <p className="text-lg text-gray-900">Meta Data</p>
//                   <p className="text-sm text-gray-600 mt-2">Date: Today, 9:09 AM</p>
//                   <p className="text-sm text-gray-600">Connection duration: 0:54</p>
//                   {/* Removed price preview line to avoid layout shifts */}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </NavigationLayout>
//   )
// }



// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import DatePicker from 'react-datepicker'
// import 'react-datepicker/dist/react-datepicker.css'
// import { createApiUrl } from '@/lib/config'
// import NavigationLayout from '@/components/NavigationLayout'

// type TranscriptionLine = {
//   speaker: string
//   text: string
// }

// type Call = {
//   date: string
//   agent: string
//   duration: string
//   messages: number
//   status: string
//   convoId?: string
//   transcription?: TranscriptionLine[]
// }

// function parseCallDate(dateStr: string): Date | null {
//   const parsed = Date.parse(dateStr.replace(' at', ''))
//   return isNaN(parsed) ? null : new Date(parsed)
// }

// export default function CallHistoryPage() {
//   const [calls, setCalls] = useState<Call[]>([])
//   const [loading, setLoading] = useState(true)
//   const [selected, setSelected] = useState<Call | null>(null)
//   const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
//   const detailRef = useRef<HTMLDivElement>(null)

//   const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
//   const [showDateRange, setShowDateRange] = useState(false)

//   const [statusFilter, setStatusFilter] = useState<string | null>(null)
//   const [showStatusDropdown, setShowStatusDropdown] = useState(false)

//   const [agentFilter, setAgentFilter] = useState<string | null>(null)
//   const [showAgentDropdown, setShowAgentDropdown] = useState(false)

//   const [startDate, endDate] = dateRange

//   useEffect(() => {
//     const fetchCalls = async () => {
//       try {
//         if (typeof window === 'undefined') return;

//         const token = localStorage.getItem('jwtToken')
//         if (!token) {
//           console.warn('No JWT token found')
//           setLoading(false)
//           return
//         }

//         const res = await fetch(createApiUrl('/user/conversations/'), {
//           headers: { Authorization: `Bearer ${token}` },
//         })

//         if (!res.ok) {
//           throw new Error(`HTTP error! status: ${res.status}`)
//         }

//         const data = await res.json()
//         const formattedCalls: Call[] = data.conversations.map((conv: any) => {
//           const dateObj = new Date(conv.start_time_unix_secs * 1000)
//           const dateStr = dateObj.toLocaleString('en-US', {
//             month: 'short',
//             day: 'numeric',
//             year: 'numeric',
//             hour: 'numeric',
//             minute: '2-digit',
//             hour12: true,
//           })

//           const minutes = Math.floor(conv.call_duration_secs / 60)
//           const seconds = conv.call_duration_secs % 60
//           const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`

//           let statusText = conv.call_successful || conv.status || 'Unknown'
//           statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1).toLowerCase()

//           return {
//             date: dateStr,
//             agent: conv.agent_name,
//             duration: durationStr,
//             messages: conv.message_count,
//             status: statusText,
//             convoId: conv.conversation_id,
//           }
//         })

//         setCalls(formattedCalls)
//         setLoading(false)
//       } catch (err) {
//         console.error('Error fetching conversations:', err)
//         setLoading(false)
//       }
//     }

//     fetchCalls()
//   }, [])

//   const closeAllDropdowns = () => {
//     setShowDateRange(false)
//     setShowStatusDropdown(false)
//     setShowAgentDropdown(false)
//   }

//   const getStatusBadgeClasses = (status: string) => {
//     switch (status.toLowerCase()) {
//       case 'success':
//       case 'successful':
//         return 'bg-green-100 text-green-700'
//       case 'error':
//         return 'bg-red-100 text-red-700'
//       case 'unknown':
//         return 'bg-gray-300 text-gray-800'
//       default:
//         return 'bg-gray-200 text-gray-800'
//     }
//   }

//   const uniqueAgents = Array.from(new Set(calls.map(call => call.agent)))

//   const filteredData = calls.filter(call => {
//     const callDate = parseCallDate(call.date)
//     if (!callDate) return false

//     const afterOK = startDate ? callDate >= startDate : true
//     const beforeOK = endDate ? callDate <= endDate : true
//     const statusOK = statusFilter ? call.status.toLowerCase() === statusFilter.toLowerCase() : true
//     const agentOK = agentFilter ? call.agent === agentFilter : true

//     return afterOK && beforeOK && statusOK && agentOK
//   })

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
//         setSelected(null)
//       }
//     }

//     if (selected) {
//       document.addEventListener('mousedown', handleClickOutside)
//     }

//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside)
//     }
//   }, [selected])

//   return (
//     <NavigationLayout title="Call History" currentPage="/call-history">
//       <div className="flex-1 relative text-gray-900">
//         <div className="flex flex-wrap gap-4 mb-6 relative z-40 overflow-visible">
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowDateRange(prev => !prev)
//               }}
//               className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
//             >
//               + Date Range
//               {(startDate || endDate) && (
//                 <> | {startDate?.toLocaleDateString('en-US') || '...'} - {endDate?.toLocaleDateString('en-US') || '...'} </>
//               )}
//             </button>
//             {showDateRange && (
//               <div className="absolute mt-2 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-200">
//                 <DatePicker
//                   selectsRange
//                   startDate={startDate}
//                   endDate={endDate}
//                   onChange={(update: [Date | null, Date | null]) => {
//                     setDateRange(update)
//                     if (update[0] && update[1]) setShowDateRange(false)
//                   }}
//                   inline
//                 />
//               </div>
//             )}
//           </div>
//           {/* Evaluation Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowStatusDropdown(prev => !prev)
//               }}
//               className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
//             >
//               + Evaluation{statusFilter ? ` | ${statusFilter}` : ''}
//             </button>
//             {showStatusDropdown && (
//               <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
//                 {['Successful', 'Error', 'Unknown'].map(option => (
//                   <div
//                     key={option}
//                     onClick={() => {
//                       setStatusFilter(option === 'Clear' ? null : option)
//                       setShowStatusDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
//                   >
//                     {option}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* Agent Filter */}
//           <div className="relative">
//             <button
//               onClick={() => {
//                 closeAllDropdowns()
//                 setShowAgentDropdown(prev => !prev)
//               }}
//               className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
//             >
//               + Agent{agentFilter ? ` | ${agentFilter}` : ''}
//             </button>
//             {showAgentDropdown && (
//               <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
//                 {uniqueAgents.map(agent => (
//                   <div
//                     key={agent}
//                     onClick={() => {
//                       setAgentFilter(agent)
//                       setShowAgentDropdown(false)
//                     }}
//                     className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
//                   >
//                     {agent}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           {/* ✖ Clear All Filters */}
//           {(startDate || endDate || statusFilter || agentFilter) && (
//             <button
//               onClick={() => {
//                 setDateRange([null, null])
//                 setStatusFilter(null)
//                 setAgentFilter(null)
//                 closeAllDropdowns()
//               }}
//               className="text-sm border border-red-200 text-red-600 rounded-full px-4 py-2 hover:bg-red-50 cursor-pointer bg-white transition-all duration-200 shadow-sm"
//             >
//               ✖ Clear All Filters
//             </button>
//           )}

//         </div>

//         {/* Table */}
//         {loading ? (
//           <div className="text-gray-600 mt-4 text-center">Loading call history...</div>
//         ) : filteredData.length === 0 ? (
//           <div className="text-gray-500 mt-4 text-center">No calls match your filters.</div>
//         ) : (
//           <div className="modern-card overflow-hidden">
//             <table className="w-full">
//               <thead className="bg-gray-50">
//                 <tr>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Date</th>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Agent</th>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Duration</th>
//                   <th className="p-4 text-left text-sm font-semibold text-gray-900">Messages</th>
//                   <th className="p-4 text-center text-sm font-semibold text-gray-900">Evaluation result</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredData.map((call, i) => (
//                   <tr
//                     key={i}
//                     className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
//                     onClick={() => {
//                       setSelected(call)
//                       setActiveTab('overview')
//                     }}
//                   >
//                     <td className="p-4 text-gray-800">{call.date}</td>
//                     <td className="p-4 text-gray-800">{call.agent}</td>
//                     <td className="p-4 text-gray-800">{call.duration}</td>
//                     <td className="p-4 text-gray-800">{call.messages}</td>
//                     <td className="p-4 text-center">
//                       <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(call.status)}`}>
//                         {call.status}
//                       </span>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}

//         {/* Slide-in detail view (you can complete this later) */}
//         <AnimatePresence>
//           {selected && (
//             <motion.div
//               key="detail"
//               initial={{ x: '100%', opacity: 0 }}
//               animate={{ x: 0, opacity: 1 }}
//               exit={{ x: '100%', opacity: 0 }}
//               transition={{ duration: 0.3 }}
//               ref={detailRef}
//               className="fixed top-0 right-0 h-full w-3/4 bg-white text-gray-900 p-6 z-50 shadow-2xl overflow-y-auto border-l border-gray-200"
//             >
//               {/* Close button */}
//               <div className="mb-4">
//                 <button
//                   onClick={() => setSelected(null)}
//                   className="border border-gray-200 px-3 py-1 text-sm rounded-md hover:bg-gray-50 transition-colors cursor-pointer float-right text-gray-700"
//                 >
//                   Close
//                 </button>
//               </div>

//               {/* Right Divider: Position this precisely at the boundary */}
//               <div
//                 className="border-r border-gray-200 absolute top-0 bottom-0"
//                 style={{ right: '20rem', width: '1px' }}
//               ></div>

//               <div className="flex items-start h-full">
//                 {/* LEFT SIDE: Conversation Content */}
//                 <div
//                   className="flex-1 pr-10"
//                   style={{ maxWidth: 'calc(100% - 12rem)' }}
//                 >
//                   <div className="mt-2 mb-4">
//                     <div className="flex items-center justify-between">
//                       <p className="text-lg font-semibold text-gray-900">Conversation with {selected.agent}</p>
//                       <p className="text-sm text-gray-500 ml-4">{selected.convoId || 'xyz-123-abc'}</p>
//                     </div>
//                   </div>

//                   <audio
//                     controls
//                     loop
//                     preload="auto"
//                     className="mt-4 w-full max-w-md rounded-lg border border-gray-200"
//                   >
//                     <source src="/call-audio.mp3" type="audio/mpeg" />
//                     Your browser does not support the audio element.
//                   </audio>

//                   {/* Tab buttons */}
//                   <div className="mt-8 mb-6 flex space-x-10">
//                     <button
//                       className={`cursor-pointer transition-colors duration-200 ${activeTab === 'overview' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
//                       onClick={() => setActiveTab('overview')}
//                     >
//                       Overview
//                     </button>
//                     <button
//                       className={`cursor-pointer transition-colors duration-200 ${activeTab === 'transcription' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
//                       onClick={() => setActiveTab('transcription')}
//                     >
//                       Transcription
//                     </button>
//                     <button
//                       className={`cursor-pointer transition-colors duration-200 ${activeTab === 'client' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
//                       onClick={() => setActiveTab('client')}
//                     >
//                       Client Data
//                     </button>
//                   </div>

//                   {/* Tabs Content */}
//                   <div className="mt-8">
//                     {activeTab === 'overview' && (
//                       <>
//                         {/* Summary */}
//                         <div className="border-t border-gray-200 pt-6">
//                           <p className="text-lg font-bold text-gray-900">Summary</p>
//                           <br />
//                           <p className="text-gray-700 leading-relaxed">
//                             Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nulla atque incidunt magni autem
//                             recusandae dolore? Itaque inventore consequatur, iste iusto perferendis corrupti? Quae architecto
//                             dolores veritatis molestiae facilis minus modi impedit in alias suscipit placeat nam velit, error,
//                             ratione incidunt. Maiores nostrum illo neque quod natus, soluta reiciendis optio officia, ipsum
//                             aspernatur quis quae blanditiis ullam quo vel! Quae, ducimus.
//                           </p>
//                         </div>

//                         {/* Call Status */}
//                         <div className="border-t border-gray-200 mt-10 mb-5 pt-6">
//                           <div className="flex items-center justify-between">
//                             <p className="text-lg font-bold text-gray-900">Call Status</p>
//                             <span className="bg-green-100 text-green-700 px-3 py-[3px] rounded-full text-sm leading-none">
//                               {selected.status}
//                             </span>
//                           </div>
//                         </div>

//                         {/* SECOND vertical line below Call Status */}
//                         <div className="border-t border-gray-200 pt-6"></div>
//                       </>
//                     )}

//                     {activeTab === 'transcription' && (
//                       <div className="border-t border-gray-200 mt-4 pt-6">
//                         <p className="text-lg font-bold mb-4 text-gray-900">Full Transcription</p>

//                         <div className="space-y-4">
//                           {selected.transcription?.map((line, index) => (
//                             <div
//                               key={index}
//                               className={`flex ${line.speaker === 'User' ? 'justify-end' : 'justify-start'}`}
//                             >
//                               <div
//                                 className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow-md ${
//                                   line.speaker === 'User'
//                                     ? 'bg-orange-500 text-white'
//                                     : 'bg-gray-100 text-gray-800 border border-gray-200'
//                                 }`}
//                               >
//                                 <p className="font-semibold mb-1">{line.speaker}</p>
//                                 <p>{line.text}</p>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {activeTab === 'client' && (
//                       <div className="border-t border-gray-200 mt-4 pt-6">
//                         <div className="bg-gray-50 text-gray-600 rounded-lg p-6 border border-gray-200">
//                           <p className="text-2xl text-center font-medium mb-1 text-gray-700">No client data</p>
//                           <p className="text-sm text-center text-gray-600">
//                             This conversation did not receive any client data. When sent, client overrides, custom LLM body, and dynamic
//                             variables will be shown here.
//                           </p>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* RIGHT SIDE: Meta Data Panel */}
//                 <div
//                   className="mt-2"
//                   style={{
//                     width: '12rem', // fixed width
//                     flexShrink: 0,  // prevent shrinking when content is missing
//                     marginLeft: '1rem', // space from left content
//                   }}
//                 >
//                   <p className="text-lg text-gray-900">Meta Data</p>
//                   <p className="text-sm text-gray-600 mt-2">Date: Today, 9:09 AM</p>
//                   <p className="text-sm text-gray-600">Connection duration: 0:54</p>
//                   {/* Removed price preview line to avoid layout shifts */}
//                 </div>
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </NavigationLayout>
//   )
// }





'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createApiUrl } from '@/lib/config'
import NavigationLayout from '@/components/NavigationLayout'

type TranscriptionLine = {
  speaker: string
  text: string
}

type Call = {
  date: string
  agent: string
  duration: string
  messages: number
  status: string
  convoId?: string
  transcription?: TranscriptionLine[]
}

function parseCallDate(dateStr: string): Date | null {
  const parsed = Date.parse(dateStr.replace(' at', ''))
  return isNaN(parsed) ? null : new Date(parsed)
}

export default function CallHistoryPage() {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Call | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
  const detailRef = useRef<HTMLDivElement>(null)

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [showDateRange, setShowDateRange] = useState(false)

  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  const [agentFilter, setAgentFilter] = useState<string | null>(null)
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)

  const [startDate, endDate] = dateRange

  const [callDetails, setCallDetails] = useState<any>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  const [audioUrl, setAudioUrl] = useState<string | null>(null)



  useEffect(() => {
    const fetchCalls = async () => {
      try {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('jwtToken')
        if (!token) {
          console.warn('No JWT token found')
          setLoading(false)
          return
        }

        const res = await fetch(createApiUrl('/user/conversations/'), {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        const formattedCalls: Call[] = data.conversations.map((conv: any) => {
          const dateObj = new Date(conv.start_time_unix_secs * 1000)
          const dateStr = dateObj.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })

          const minutes = Math.floor(conv.call_duration_secs / 60)
          const seconds = conv.call_duration_secs % 60
          const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`

          let statusText = conv.call_successful || conv.status || 'Unknown'
          statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1).toLowerCase()

          return {
            date: dateStr,
            agent: conv.agent_name,
            duration: durationStr,
            messages: conv.message_count,
            status: statusText,
            convoId: conv.conversation_id,
          }
        })

        setCalls(formattedCalls)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching conversations:', err)
        setLoading(false)
      }
    }

    fetchCalls()
  }, [])

  const closeAllDropdowns = () => {
    setShowDateRange(false)
    setShowStatusDropdown(false)
    setShowAgentDropdown(false)
  }

  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
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

  const uniqueAgents = Array.from(new Set(calls.map(call => call.agent)))

  const filteredData = calls.filter(call => {
    const callDate = parseCallDate(call.date)
    if (!callDate) return false

    const afterOK = startDate ? callDate >= startDate : true
    const beforeOK = endDate ? callDate <= endDate : true
    const statusOK = statusFilter ? call.status.toLowerCase() === statusFilter.toLowerCase() : true
    const agentOK = agentFilter ? call.agent === agentFilter : true

    return afterOK && beforeOK && statusOK && agentOK
  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
        setSelected(null)
      }
    }

    if (selected) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selected])

  return (
    <NavigationLayout title="Call History" currentPage="/call-history">
      <div className="flex-1 relative text-gray-900">
        <div className="flex flex-wrap gap-4 mb-6 relative z-40 overflow-visible">
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setShowDateRange(prev => !prev)
              }}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
            >
              + Date Range
              {(startDate || endDate) && (
                <> | {startDate?.toLocaleDateString('en-US') || '...'} - {endDate?.toLocaleDateString('en-US') || '...'} </>
              )}
            </button>
            {showDateRange && (
              <div className="absolute mt-2 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-200">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update: [Date | null, Date | null]) => {
                    setDateRange(update)
                    if (update[0] && update[1]) setShowDateRange(false)
                  }}
                  inline
                />
              </div>
            )}
          </div>
          {/* Evaluation Filter */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setShowStatusDropdown(prev => !prev)
              }}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
            >
              + Evaluation{statusFilter ? ` | ${statusFilter}` : ''}
            </button>
            {showStatusDropdown && (
              <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
                {['Successful', 'Error', 'Unknown'].map(option => (
                  <div
                    key={option}
                    onClick={() => {
                      setStatusFilter(option === 'Clear' ? null : option)
                      setShowStatusDropdown(false)
                    }}
                    className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Agent Filter */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setShowAgentDropdown(prev => !prev)
              }}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
            >
              + Agent{agentFilter ? ` | ${agentFilter}` : ''}
            </button>
            {showAgentDropdown && (
              <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
                {uniqueAgents.map(agent => (
                  <div
                    key={agent}
                    onClick={() => {
                      setAgentFilter(agent)
                      setShowAgentDropdown(false)
                    }}
                    className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                  >
                    {agent}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✖ Clear All Filters */}
          {(startDate || endDate || statusFilter || agentFilter) && (
            <button
              onClick={() => {
                setDateRange([null, null])
                setStatusFilter(null)
                setAgentFilter(null)
                closeAllDropdowns()
              }}
              className="text-sm border border-red-200 text-red-600 rounded-full px-4 py-2 hover:bg-red-50 cursor-pointer bg-white transition-all duration-200 shadow-sm"
            >
              ✖ Clear All Filters
            </button>
          )}

        </div>

        {/* Table */}
        {loading ? (
          <div className="text-gray-600 mt-4 text-center">Loading call history...</div>
        ) : filteredData.length === 0 ? (
          <div className="text-gray-500 mt-4 text-center">No calls match your filters.</div>
        ) : (
          <div className="modern-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Agent</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Messages</th>
                  <th className="p-4 text-center text-sm font-semibold text-gray-900">Evaluation result</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.map((call, i) => (
                  <tr
                    key={i}
                    className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={async () => {
                      setSelected(call)
                      setActiveTab('overview')
                      setDetailsLoading(true)
                      setCallDetails(null) // clear previous details

                      try {
                        const token = localStorage.getItem('jwtToken')

                        // Fetch call details
                        const res = await fetch(createApiUrl(`/user/conversations/${call.convoId}`), {
                          headers: { Authorization: `Bearer ${token}` },
                        })
                        const data = await res.json()
                        setCallDetails(data)

                        // Fetch audio
                        const audioRes = await fetch(createApiUrl(`/user/conversations/${call.convoId}/audio`), {
                          headers: { Authorization: `Bearer ${token}` },
                        })

                        if (audioRes.ok) {
                          const audioBlob = await audioRes.blob()
                          const audioObjectUrl = URL.createObjectURL(audioBlob)
                          setAudioUrl(audioObjectUrl)
                        } else {
                          setAudioUrl(null)
                          console.warn('Audio not available:', audioRes.status)
                        }
                      } catch (err) {
                        console.error('Error fetching call details or audio:', err)
                        setCallDetails(null)
                        setAudioUrl(null)
                      } finally {
                        setDetailsLoading(false)
                      }
                    }}
                  >
                    <td className="p-4 text-gray-800">{call.date}</td>
                    <td className="p-4 text-gray-800">{call.agent}</td>
                    <td className="p-4 text-gray-800">{call.duration}</td>
                    <td className="p-4 text-gray-800">{call.messages}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(call.status)}`}>
                        {call.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Slide-in detail view (you can complete this later) */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="detail"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={detailRef}
              className="fixed top-0 right-0 h-full w-3/4 bg-white text-gray-900 p-6 z-50 shadow-2xl overflow-y-auto border-l border-gray-200"
            >
              {/* Close button */}
              <div className="mb-4">
                <button
                  onClick={() => setSelected(null)}
                  className="border border-gray-200 px-3 py-1 text-sm rounded-md hover:bg-gray-50 transition-colors cursor-pointer float-right text-gray-700"
                >
                  Close
                </button>
              </div>

              {/* Right Divider: Position this precisely at the boundary */}
              <div
                className="border-r border-gray-200 absolute top-0 bottom-0"
                style={{ right: '20rem', width: '1px' }}
              ></div>

              <div className="flex items-start h-full">
                {/* LEFT SIDE: Conversation Content */}
                <div
                  className="flex-1 pr-10"
                  style={{ maxWidth: 'calc(100% - 12rem)' }}
                >
                  <div className="mt-2 mb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-900">Conversation with {selected.agent}</p>
                      <p className="text-sm text-gray-500 ml-4">{selected.convoId || 'xyz-123-abc'}</p>
                    </div>
                  </div>

                 {audioUrl ? (
                  <audio
                    controls
                    preload="auto"
                    className="mt-4 w-full max-w-md rounded-lg border border-gray-200"
                    src={audioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : detailsLoading ? (
                  <p className="text-sm text-gray-500">Loading audio...</p>
                ) : (
                  <p className="text-sm text-red-500 mt-4">No audio available for this call.</p>
                )}

                  {/* Tab buttons */}
                  <div className="mt-8 mb-6 flex space-x-10">
                    <button
                      className={`cursor-pointer transition-colors duration-200 ${activeTab === 'overview' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                      className={`cursor-pointer transition-colors duration-200 ${activeTab === 'transcription' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setActiveTab('transcription')}
                    >
                      Transcription
                    </button>
                  </div>

                  {/* Tabs Content */}
                  <div className="mt-8">
                    {activeTab === 'overview' && (
                      <>
                        {/* Summary */}
                        <div className="border-t border-gray-200 pt-6">
                          <p className="text-lg font-bold text-gray-900">Summary</p>
                          <br />
                          <p className="text-gray-700 leading-relaxed">
                            {detailsLoading
                              ? 'Loading summary...'
                              : callDetails?.analysis?.transcript_summary || 'No summary available for this call.'}
                          </p>
                        </div>

                        {/* Call Status */}
                        <div className="border-t border-gray-200 mt-10 mb-5 pt-6">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-gray-900">Call Status</p>
                            <span
                              className={`px-3 py-[3px] rounded-full text-sm leading-none ${getStatusBadgeClasses(
                                callDetails?.analysis?.call_successful || selected.status
                              )}`}
                            >
                              {callDetails?.analysis?.call_successful || selected.status}
                            </span>
                          </div>
                        </div>

                        {/* SECOND vertical line below Call Status */}
                        <div className="border-t border-gray-200 pt-6"></div>
                      </>
                    )}

                    {activeTab === 'transcription' && (
                      <div className="border-t border-gray-200 mt-4 pt-6">
                        <p className="text-lg font-bold mb-4 text-gray-900">Full Transcription</p>

                        {detailsLoading ? (
                          <p className="text-sm text-gray-500">Loading transcription...</p>
                        ) : callDetails?.transcript?.length ? (
                          <div className="space-y-3">
                            {callDetails.transcript.map((line: any, index: number) => (
                              <div key={index} className="text-sm">
                                <span className="font-semibold capitalize text-gray-800">
                                  {line.role}:
                                </span>
                                <span className="ml-2 text-gray-700">{line.message}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No transcription available.</p>
                        )}
                      </div>
                    )}

                  </div>
                </div>

                {/* RIGHT SIDE: Meta Data Panel */}
                <div
                  className="mt-2"
                  style={{
                    width: '12rem', // fixed width
                    flexShrink: 0,  // prevent shrinking when content is missing
                    marginLeft: '1rem', // space from left content
                  }}
                >
                  <p className="text-lg text-gray-900">Meta Data</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Date:{' '}
                    {callDetails?.metadata?.start_time_unix_secs
                      ? new Date(callDetails.metadata.start_time_unix_secs * 1000).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : '—'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Connection duration:{' '}
                    {callDetails?.metadata?.call_duration_secs != null
                      ? `${Math.floor(callDetails.metadata.call_duration_secs / 60)}:${String(
                          callDetails.metadata.call_duration_secs % 60
                        ).padStart(2, '0')}`
                      : '—'}
                  </p>

                  {/* Removed price preview line to avoid layout shifts */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NavigationLayout>
  )
}
