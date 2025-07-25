'use client'

import { useEffect, useState } from 'react'
import CountUp from '../animations/CountUp'

export default function GlobalStatsGrid() {
  const [stats, setStats] = useState({
    totalClicks: 0,
    totalViews: 0,
    totalSessions: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch('/api/analytics/global') // create this API route next
        const data = await res.json()
        setStats(data)
      } catch (err) {
        console.error('Failed to load stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  if (loading) return <div className="text-muted">Loading global stats...</div>

  return (
    <div className="grid grid-cols-3 gap-6 dark:text-white">
      <StatCard title="Total Agent Clicks" value={stats.totalClicks} />
      <StatCard title="Total Agent Views" value={stats.totalViews} />
      <StatCard title="Total Sessions" value={stats.totalSessions} />
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: number }) {
  return (
    
       <div className="rounded-2xl bg-white p-6 shadow-sm h-40 dark:bg-gradient-to-b dark:from-slate-900 dark:to-violet-950">
      <h3 className="text-sm font-medium text-gray-500 dark:text-white">{title}</h3>
      <div className="text-3xl font-bold text-black dark:text-white">
          <CountUp to={value} separator="," duration={1.2} />
        </div>
    </div>
    
  )
}
