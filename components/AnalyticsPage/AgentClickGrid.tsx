// 'use client'

// import { useEffect, useState } from 'react'

// type AgentClick = {
//   agentId: string
//   name: string
//   clicks: number
// }

// export default function AgentClickGrid() {
//   const [clicks, setClicks] = useState<AgentClick[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchClicks() {
//       try {
//         const res = await fetch('/api/analytics/agent-clicks')
//         const data = await res.json()
//         console.log('🔥 Fetched clicks:', data) // 👈 This
//         setClicks(data)
//       } catch (err) {
//         console.error('Error fetching agent clicks:', err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchClicks()
//   }, [])


//   if (loading) return <div className="text-muted">Loading agent clicks...</div>
//   if (!clicks.length) return <div className="text-muted">No clicks recorded yet.</div>

//   return (
    
//       <div className="bg-white rounded-2xl p-6 shadow-sm dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950">
//       <h2 className="text-xl font-semibold mb-4 dark:text-white">Agent Click Stats</h2>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:text-white">
//         {clicks.map(agent => (
//           <div
//             key={agent.agentId}
//             className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
//           >
//             <h3 className="text-lg font-medium">{agent.name}</h3>
//             <p className="text-sm text-gray-500 mt-1">Clicks: {agent.clicks}</p>
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

type AgentClick = {
  agentId: string
  name: string
  clicks: number
}

export default function AgentClickGrid() {
  const [clicks, setClicks] = useState<AgentClick[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchClicks() {
      try {
        const res = await fetch('/api/analytics/agent-clicks')
        const data = await res.json()
        console.log('🔥 Fetched clicks:', data)
        setClicks(data)
      } catch (err) {
        console.error('Error fetching agent clicks:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchClicks()
  }, [])

  const visibleAgents = clicks.slice(0, 3)

  return (
    <>
      {/* Compact card */}
      <motion.div
        layoutId="agent-clicks-card"
        layout
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Agent Click Stats</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : !clicks.length ? (
          <p className="text-gray-400">No clicks recorded yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 dark:text-white">
            {visibleAgents.map(agent => (
              <div
                key={agent.agentId}
                className="border rounded-xl p-4 shadow-sm transition"
              >
                <h3 className="text-lg font-medium">{agent.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Clicks: {agent.clicks}</p>
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
              layoutId="agent-clicks-card"
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

              <h2 className="text-xl font-semibold mb-4">All Agent Clicks</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-h-[60vh] overflow-y-auto pr-2">
                {clicks.map(agent => (
                  <div
                    key={agent.agentId}
                    className="border rounded-xl p-4 shadow-sm"
                  >
                    <h3 className="text-lg font-medium">{agent.name}</h3>
                    <p className="text-sm text-gray-500 mt-1">Clicks: {agent.clicks}</p>
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
