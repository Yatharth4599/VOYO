// 'use client'

// import { useEffect, useState } from 'react'

// type SearchQuery = {
//   query: string
//   count: number
// }

// export default function SearchQueriesGrid() {
//   const [queries, setQueries] = useState<SearchQuery[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchQueries() {
//       try {
//         const res = await fetch('/api/analytics/search-queries')
//         const data = await res.json()
//         console.log('🔎 Queries:', data)
//         setQueries(data)
//       } catch (err) {
//         console.error('Error fetching search queries:', err)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchQueries()
//   }, [])

//   if (loading) return <div className="text-muted">Loading search queries...</div>
//   if (!queries.length) return <div className="text-muted">No search data yet.</div>

//   return (
    
//       <div className="bg-white rounded-2xl p-6 shadow-sm dark:bg-gradient-to-b dark:from-slate-900 dark:to-fuchsia-950">
//       <h2 className="text-xl font-semibold mb-4 dark:text-white">Top Search Queries</h2>
//       <ul className="space-y-2">
//         {queries.map((q, i) => (
//           <li key={i} className="flex justify-between">
//             <span className="text-sm text-gray-800 dark:text-white">{q.query}</span>
//             <span className="text-sm text-gray-500 dark:text-white">{q.count}</span>
//           </li>
//         ))}
//       </ul>
    
//     </div>
    
//   )
// }

'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

type SearchQuery = {
  query: string
  count: number
}

export default function SearchQueriesGrid() {
  const [queries, setQueries] = useState<SearchQuery[]>([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    async function fetchQueries() {
      try {
        const res = await fetch('/api/analytics/search-queries')
        const data = await res.json()
        console.log('🔎 Queries:', data)
        setQueries(data)
      } catch (err) {
        console.error('Error fetching search queries:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchQueries()
  }, [])

  const topQueries = queries.slice(0, 5)

  return (
    <>
      {/* Collapsed card */}
      <motion.div
        layoutId="search-queries-card"
        layout
        onClick={() => setOpen(true)}
        className="cursor-pointer bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950 flex flex-col h-full"
      >
        <h2 className="text-xl font-semibold mb-4 dark:text-white">Top Search Queries</h2>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : !queries.length ? (
          <p className="text-gray-400">No search data yet.</p>
        ) : (
          <ul className="space-y-2">
            {topQueries.map((q, i) => (
              <li key={i} className="flex justify-between text-sm">
                <span className="text-gray-800 dark:text-white">{q.query}</span>
                <span className="text-gray-500 dark:text-white">{q.count}</span>
              </li>
            )).slice(0 , 5)}
          </ul>
        )}
        <p className="text-sm mt-4 text-blue-600 mt-auto">Click to expand</p>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 z-40"
              onClick={() => setOpen(false)}
            />

            <motion.div
              layoutId="search-queries-card"
              layout
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className={cn(
                'fixed z-50 top-20 left-1/2 -translate-x-1/2 w-[95%] max-w-3xl bg-white rounded-2xl p-6 shadow-xl dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950 dark:text-white'
              )}
              style={{ willChange: 'transform, opacity' }}
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 dark:text-white dark:hover:text-gray-300 cursor-pointer"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-4">All Search Queries</h2>

              <ul className="space-y-2 max-h-[60vh] overflow-y-auto pr-2">
                {queries.map((q, i) => (
                  <li key={i} className="flex justify-between text-sm">
                    <span className="text-gray-800 dark:text-white">{q.query}</span>
                    <span className="text-gray-500 dark:text-white">{q.count}</span>
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
