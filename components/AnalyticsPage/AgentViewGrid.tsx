// 'use client'

// import { useEffect, useState } from 'react'

// type AgentView = {
//   agentId: string
//   agentName: string
//   totalViews: number
// }

// export default function AgentViewGrid() {
//   const [views, setViews] = useState<AgentView[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchViews() {
//       try {
//         const res = await fetch('/api/analytics/agent-views')
//         const data = await res.json()
//         console.log('👁️ Agent Views:', data)
//         setViews(data)
//       } catch (err) {
//         console.error('Error fetching agent views:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchViews()
//   }, [])

//   if (loading) return <div className="text-muted">Loading agent views...</div>
//   if (!views.length) return <div className="text-muted">No views recorded yet.</div>

//   return (
    
//       <div className="bg-white rounded-2xl p-6 shadow-sm dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950">
//       <h2 className="text-xl font-semibold mb-4 dark:text-white">Agent View Stats</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:text-white">
//         {views.map(agent => (
//           <div
//             key={agent.agentId}
//             className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
//           >
//             <h3 className="text-lg font-medium">{agent.agentName}</h3>
//             <p className="text-sm text-gray-500 mt-1">Views: {agent.totalViews}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type AgentView = {
  agentId: string
  agentName: string
  totalViews: number
}

export default function AgentViewGrid() {
  const [views, setViews] = useState<AgentView[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchViews() {
      try {
        const res = await fetch('/api/analytics/agent-views')
        const data = await res.json()
        console.log('👁️ Agent Views:', data)
        setViews(data)
      } catch (err) {
        console.error('Error fetching agent views:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchViews()
  }, [])

  const visibleAgents = views.slice(0, 6)

  return (
    <>
      {/* Compact card */}
      <motion.div
        layoutId="agent-views-card"
        layout
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Agent View Stats</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : !views.length ? (
          <p className="text-gray-400">No views recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:text-white">
            {visibleAgents.map(agent => (
              <div
                key={agent.agentId}
                className="border rounded-xl p-4 shadow-sm transition"
              >
                <h3 className="text-lg font-medium">{agent.agentName}</h3>
                <p className="text-sm text-gray-500 mt-1">Views: {agent.totalViews}</p>
              </div>
            ))}
          </div>
        )}

        <p className="text-sm mt-4 text-blue-600">Click to expand</p>
      </motion.div>

      {/* Modal version */}
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

            {/* Modal */}
            <motion.div
              layoutId="agent-views-card"
              layout
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={cn(
                'fixed z-50 top-20 left-1/2 -translate-x-1/2 w-[95%] max-w-5xl bg-white rounded-2xl p-6 shadow-xl dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950 dark:text-white',
              )}
              style={{ willChange: 'transform, opacity' }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 dark:text-white dark:hover:text-gray-300 cursor-pointer"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4">All Agent Views</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {views.map(agent => (
                  <div
                    key={agent.agentId}
                    className="border rounded-xl p-4 shadow-sm"
                  >
                    <h3 className="text-lg font-medium">{agent.agentName}</h3>
                    <p className="text-sm text-gray-500 mt-1">Views: {agent.totalViews}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
