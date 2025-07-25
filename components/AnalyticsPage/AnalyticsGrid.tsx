'use client'

import AgentClickGrid from "./AgentClickGrid"
import AgentViewGrid from "./AgentViewGrid"
import GlobalStatsGrid from "./GlobalStatsGrid"
import SearchQueriesGrid from "./SearchQueriesGrid"
import SessionLogsGrid from "./SessionLogsGrid"

export default function AnalyticsGrid () {
  return (
    <main className="p-6 sm:p-8 md:p-10 min-h-screen bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:to-gray-950">
      <h1 className="text-4xl font-bold text-amber-500 dark:text-purple-700">Analytics</h1>
      <section className="pb-30 pt-10 grid grid-cols-1 gap-4 p-3">
        <GlobalStatsGrid/>
        <section className="grid grid-cols-2 gap-4">
          <AgentClickGrid/>
          <AgentViewGrid/>
          <SessionLogsGrid/>
          <SearchQueriesGrid/>
        </section>
      </section>
    </main>
     
    
  )
}