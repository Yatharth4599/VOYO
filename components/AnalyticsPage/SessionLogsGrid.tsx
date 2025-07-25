// 'use client'

// import { useEffect, useState } from 'react'
// import { formatDistanceToNow } from 'date-fns'

// type Session = {
//   id: string
//   userId: string
//   timestamp: string | null
// }

// export default function SessionLogsGrid() {
//   const [sessions, setSessions] = useState<Session[]>([])
//   const [loading, setLoading] = useState(true)
//   const [expanded, setExpanded] = useState(false)

//   useEffect(() => {
//     async function fetchSessions() {
//       try {
//         const res = await fetch('/api/analytics/sessions')
//         const data = await res.json()
//         console.log('🕒 Sessions:', data)
//         setSessions(data)
//       } catch (err) {
//         console.error('Error fetching session logs:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSessions()
//   }, [])

//   if (loading) return <div className="text-muted">Loading session logs...</div>
//   if (!sessions.length) return <div className="text-muted">No sessions found.</div>

//   // Show either first 5 or all depending on state
//   const visibleSessions = expanded ? sessions : sessions.slice(0, 5)

//   return (
//     <div className="bg-white rounded-2xl p-6 shadow-sm border">
//       <h2 className="text-xl font-semibold mb-4">Recent Sessions</h2>
//       <ul className="divide-y">
//         {visibleSessions.map(session => (
//           <li key={session.id} className="py-3">
//             <div className="flex items-center justify-between">
//               <span className="text-sm text-gray-800">👤 {session.userId}</span>
//               <span className="text-sm text-gray-500">
//                 {session.timestamp
//                   ? formatDistanceToNow(new Date(session.timestamp), { addSuffix: true })
//                   : 'Unknown time'}
//               </span>
//             </div>
//           </li>
//         ))}
//       </ul>

//       {/* Toggle button */}
//       {sessions.length > 5 && (
//         <button
//           onClick={() => setExpanded(prev => !prev)}
//           className="mt-4 text-sm text-blue-600 hover:underline"
//         >
//           {expanded ? 'Show Less' : 'Show More'}
//         </button>
//       )}
//     </div>
//   )
// }

// 'use client'

// import { useState, useEffect } from 'react'
// import { motion, AnimatePresence } from 'framer-motion'
// import { formatDistanceToNow } from 'date-fns'
// import { X } from 'lucide-react'
// import { cn } from '@/lib/utils' // 👈 make sure this exists or adjust

// type Session = {
//   id: string
//   userId: string
//   timestamp: string | null
// }

// export default function SessionLogsCard() {
//   const [sessions, setSessions] = useState<Session[]>([])
//   const [loading, setLoading] = useState(true)
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     async function fetchSessions() {
//       try {
//         const res = await fetch('/api/analytics/sessions')
//         const data = await res.json()
//         setSessions(data)
//       } catch (err) {
//         console.error('Error fetching session logs:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchSessions()
//   }, [])

//   const visibleSessions = sessions.slice(0, 5)

//   return (
//     <>
//       {/* Card that expands */}
//       <motion.div
//         layoutId="session-card"
//         layout
//         onClick={() => setOpen(true)}
//         className="cursor-pointer bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-fuchsia-950 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
//       >
//         <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Sessions</h2>

//         {loading ? (
//           <p className="text-gray-400">Loading...</p>
//         ) : !sessions.length ? (
//           <p className="text-gray-400">No sessions found.</p>
//         ) : (
//           <ul className="divide-y">
//             {visibleSessions.map(session => (
//               <li key={session.id} className="py-2 text-sm text-gray-700 flex justify-between dark:text-white">
//                 <span>👤 {session.userId}</span>
//                 <span className="text-gray-500 dark:text-white">
//                   {session.timestamp
//                     ? formatDistanceToNow(new Date(session.timestamp), { addSuffix: true })
//                     : 'Unknown'}
//                 </span>
//               </li>
//             ))}
//           </ul>
//         )}

//         <p className="text-sm mt-4 text-blue-600">Click to expand</p>
//       </motion.div>

//       {/* Modal version of card (shared layout) */}
//       <AnimatePresence>
//         {open && (
//           <>
//             {/* Backdrop */}
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 bg-black/30 z-40"
//               onClick={() => setOpen(false)}
//             />

//             {/* Modal expanding from card */}
//             <motion.div
//               layoutId="session-card"
//               layout
//               transition={{ duration: 0.12, ease: "easeOut" }}  // faster and snappier
//               className={cn(
//                 'fixed z-50 top-20 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl bg-white rounded-2xl p-6 shadow-xl dark:bg-gradient-to-b dark:from-slate-900 dark:to-fuchsia-950',
//               )}
//             >
//               <button
//                 onClick={() => setOpen(false)}
//                 className="absolute top-4 right-4 text-gray-400 hover:text-black hover:text-gray-300 dark:text-white cursor-pointer"
//               >
//                 <X size={20} />
//               </button>

//               <h2 className="text-xl font-semibold mb-4 dark:text-white">All Session Logs</h2>

//               <ul className="divide-y max-h-[60vh] overflow-y-auto pr-2">
//                 {sessions.map(session => (
//                   <li
//                     key={session.id}
//                     className="py-3 text-sm text-gray-700 flex justify-between dark:text-white"
//                   >
//                     <span>👤 {session.userId}</span>
//                     <span className="text-gray-500 dark:text-white">
//                       {session.timestamp
//                         ? formatDistanceToNow(new Date(session.timestamp), { addSuffix: true })
//                         : 'Unknown'}
//                     </span>
//                   </li>
//                 ))}
//               </ul>
//             </motion.div>
//           </>
//         )}
//       </AnimatePresence>
//     </>
//   )
// }


'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { formatDistanceToNow } from 'date-fns'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type Session = {
  id: string
  userId: string
  timestamp: string | null
}

export default function SessionLogsCard() {
  const [sessions, setSessions] = useState<Session[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchSessions() {
      try {
        const res = await fetch('/api/analytics/sessions')
        const data = await res.json()

        // 🧠 Sort by timestamp DESCENDING
        const sorted = [...data].sort((a, b) =>
          new Date(b.timestamp ?? 0).getTime() - new Date(a.timestamp ?? 0).getTime()
        )

        setSessions(sorted)
      } catch (err) {
        console.error('Error fetching session logs:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchSessions()
  }, [])

  const visibleSessions = sessions.slice(0, 5)

  return (
    <>
      {/* Card that expands */}
      <motion.div
        layoutId="session-card"
        layout
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950 rounded-2xl p-6 shadow-sm hover:shadow-md transition"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Recent Sessions</h2>

        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : !sessions.length ? (
          <p className="text-gray-400">No sessions found.</p>
        ) : (
          <ul className="divide-y">
            {visibleSessions.map(session => (
              <li key={session.id} className="py-2 text-sm text-gray-700 flex justify-between dark:text-white">
                <span>👤 {session.userId}</span>
                <span className="text-gray-500 dark:text-white">
                  {session.timestamp
                    ? formatDistanceToNow(new Date(session.timestamp), { addSuffix: true })
                    : 'Unknown'}
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="text-sm mt-4 text-blue-600">Click to expand</p>
      </motion.div>

      {/* Modal version of card (shared layout) */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setOpen(false)}
            />

            {/* Modal expanding from card */}
            <motion.div
              layoutId="session-card"
              layout
              transition={{ duration: 0.12, ease: 'easeOut' }}
              className={cn(
                'fixed z-50 top-20 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl bg-white rounded-2xl p-6 shadow-xl dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950',
              )}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-black hover:text-gray-300 dark:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4 dark:text-white">All Session Logs</h2>

              <ul className="divide-y max-h-[60vh] overflow-y-auto pr-2">
                {sessions.map(session => (
                  <li
                    key={session.id}
                    className="py-3 text-sm text-gray-700 flex justify-between dark:text-white"
                  >
                    <span>👤 {session.userId}</span>
                    <span className="text-gray-500 dark:text-white">
                      {session.timestamp
                        ? formatDistanceToNow(new Date(session.timestamp), { addSuffix: true })
                        : 'Unknown'}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
