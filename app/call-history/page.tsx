'use client'

import { useState } from 'react'

const callData = [
  { date: 'Jun 10, 2025 at 2:36 PM', agent: 'New agent', duration: '1:04', messages: 6, status: 'Successful' },
  { date: 'Jun 9, 2025 at 5:17 PM', agent: 'New agent', duration: '0:16', messages: 6, status: 'Successful' },
  { date: 'Jun 9, 2025 at 4:23 PM', agent: 'New agent', duration: '0:08', messages: 2, status: 'Successful' },
  { date: 'Jun 9, 2025 at 10:17 AM', agent: 'Urvashi Clone 5', duration: '0:07', messages: 1, status: 'Successful' },
  { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:04', messages: 1, status: 'Successful' },
  { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:03', messages: 1, status: 'Successful' },
  { date: 'Jun 9, 2025 at 10:16 AM', agent: 'Urvashi Clone 5', duration: '0:06', messages: 1, status: 'Successful' },
  { date: 'Jun 9, 2025 at 10:15 AM', agent: 'Urvashi Clone 5', duration: '0:05', messages: 1, status: 'Successful' },
]

const filters = ['Date After', 'Date Before', 'Evaluation', 'Agent']

export default function CallHistoryPage() {
  return (
    <div className="flex min-h-screen bg-black text-black font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-gray-200 p-5 text-sm space-y-6 bg-[#181C29]">
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
      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6 text-lime-400">Call history</h1>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {filters.map(f => (
            <button
              key={f}
              className="text-xs border border-gray-300 rounded-full px-4 py-1 text-white hover:bg-gray-800 cursor-pointer"
            >
              + {f}
            </button>
          ))}
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
          {callData.map((call, i) => (
            <div key={i} className="grid grid-cols-5 text-sm py-3 items-center text-white">
              <span>{call.date}</span>
              <span>{call.agent}</span>
              <span>{call.duration}</span>
              <span>{call.messages}</span>
              <div className="flex justify-center">
              <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                {call.status}
              </span>
            </div>

            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
