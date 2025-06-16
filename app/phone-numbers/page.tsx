// 'use client'

// import { useState } from 'react'
// import { Plus, MoreVertical } from 'lucide-react'

// const fakePhoneData = [
//   {
//     name: 'PineChat',
//     number: '+1 404 123 9876',
//     agent: 'PineBot',
//     provider: 'Twilio',
//   },
//   {
//     name: 'SparkLine',
//     number: '+1 917 555 3045',
//     agent: 'SparkAgent',
//     provider: 'Vonage',
//   },
//   {
//     name: 'NovaPay',
//     number: '+1 213 888 7777',
//     agent: 'NovaAgent',
//     provider: 'Plivo',
//   },
// ]

// export default function PhoneNumbersPage() {
//   return (
//     <div className="flex min-h-screen font-sans text-gray-900">
//       {/* Sidebar */}
//       <aside className="w-64 bg-white border-r p-6 space-y-6">
//         <h1 className="text-2xl font-bold text-gray-900">🧠 Conversational AI</h1>
//         <nav className="space-y-3 text-sm font-medium">
//           <div className="cursor-pointer hover:text-black">📊 Dashboard</div>
//           <div className="cursor-pointer hover:text-black">👥 Agents</div>
//           <div className="cursor-pointer hover:text-black">📞 Call History</div>
//           <div className="cursor-pointer hover:text-black">📚 Knowledge Base</div>
//           <div className="cursor-pointer hover:text-black">📱 Phone Numbers</div>
//         </nav>
//       </aside>

//       {/* Main */}
//       <main className="flex-1 p-10">
//         <div className="flex justify-between items-center mb-6">
//           <div>
//             <h1 className="text-2xl font-bold">Phone numbers</h1>
//             <p className="text-gray-500">Import and manage your phone numbers</p>
//           </div>
//           <button className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 cursor-pointer">
//             <Plus size={16} /> Import number
//           </button>
//         </div>

//         {/* Table */}
//         <div className="overflow-x-auto">
//           <table className="min-w-full text-left text-sm">
//             <thead className="text-gray-500 border-b">
//               <tr>
//                 <th className="py-3">Name</th>
//                 <th className="py-3">Phone number</th>
//                 <th className="py-3">Assigned agent</th>
//                 <th className="py-3">Provider</th>
//                 <th className="py-3"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {fakePhoneData.map((entry, i) => (
//                 <tr key={i} className="border-b hover:bg-gray-50 cursor-pointer">
//                   <td className="py-4">{entry.name}</td>
//                   <td className="py-4">{entry.number}</td>
//                   <td className="py-4 flex items-center gap-1">
//                     {entry.agent}
//                     <span className="text-xs">↗</span>
//                   </td>
//                   <td className="py-4">
//                     <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{entry.provider}</span>
//                   </td>
//                   <td className="py-4">
//                     <MoreVertical size={18} className="cursor-pointer text-gray-500" />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </main>
//     </div>
//   )
// }



'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus, MoreHorizontal } from 'lucide-react'
import Link from 'next/link'

type PhoneEntry = {
  name: string;
  number: string;
  agent: string;
  provider: string;
};

const fakePhoneData: PhoneEntry[] = [
  {
    name: 'PineChat',
    number: '+1 404 123 9876',
    agent: 'PineBot',
    provider: 'Twilio',
  },
  {
    name: 'SparkLine',
    number: '+1 917 555 3045',
    agent: 'SparkAgent',
    provider: 'Vonage',
  },
  {
    name: 'NovaPay',
    number: '+1 213 888 7777',
    agent: 'NovaAgent',
    provider: 'Plivo',
  },
]

export default function PhoneNumbersPage() {
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const dropdownRef = useRef(null)

  // Close dropdown when clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !(dropdownRef.current as any).contains(event.target)
      ) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const [selectedPhone, setSelectedPhone] = useState<PhoneEntry | null>(null);
  const [showModal, setShowModal] = useState(false)

  const handleRowClick = (phoneEntry: any) => {
    setSelectedPhone(phoneEntry)
    setShowModal(true)
  }


  return (
    <div className="flex min-h-screen font-sans text-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r p-6 space-y-6">
        <h1 className="text-2xl font-bold text-gray-900">🧠 Conversational AI</h1>
        <nav className="space-y-3 text-sm font-medium">
          <Link href="/" className="block hover:text-orange-600 cursor-pointer transition-colors duration-200">
            📊 Dashboard
          </Link>
          <Link href="/dashboard" className="block hover:text-orange-600 cursor-pointer transition-colors duration-200">
            👥 Agents
          </Link>
          <Link href="/call-history" className="block hover:text-orange-600 cursor-pointer transition-colors duration-200">
            📞 Call History
          </Link>
          <Link href="/knowledge-base" className="block hover:text-orange-600 cursor-pointer transition-colors duration-200">
            📚 Knowledge Base
          </Link>
          <Link href="/phone-numbers" className="block hover:text-orange-600 cursor-pointer transition-colors duration-200">
          📱 Phone Numbers
          </Link>
        </nav>
      </aside>

      {/* Main */}
      <main className="flex-1 p-10 relative">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Phone numbers</h1>
            <p className="text-gray-500">Import and manage your phone numbers</p>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="bg-black text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 cursor-pointer"
            >
              <Plus size={16} />
              Import number
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false)
                    alert('Importing from Twilio...')
                  }}
                >
                  From Twilio
                </div>
                <div
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDropdownOpen(false)
                    alert('Importing from SIP Trunk...')
                  }}
                >
                  From SIP Trunk
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="text-gray-500 border-b">
              <tr>
                <th className="py-3">Name</th>
                <th className="py-3">Phone number</th>
                <th className="py-3">Assigned agent</th>
                <th className="py-3">Provider</th>
                <th className="py-3"></th>
              </tr>
            </thead>
            <tbody>
              {fakePhoneData.map((entry, i) => (
                <tr key={i} onClick={() => handleRowClick(entry)} className="border-b hover:bg-gray-50 cursor-pointer">
                  <td className="py-4">{entry.name}</td>
                  <td className="py-4">{entry.number}</td>
                  <td className="py-4 flex items-center gap-1">
                    {entry.agent}
                    <span className="text-xs">↗</span>
                  </td>
                  <td className="py-4">
                    <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{entry.provider}</span>
                  </td>
                  <td className="py-4">
                    <MoreHorizontal size={18} className="cursor-pointer text-gray-500 hover:bg-gray-200" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && selectedPhone && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50 p-6" onClick={() => setShowModal(false)}>
              <div
                className="bg-white rounded-xl p-9 max-w-3xl w-full relative"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close button */}
                <button className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer" onClick={() => setShowModal(false)}>✖</button>

                {/* Header Row */}
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h2 className="text-xl font-bold">{selectedPhone.number}</h2>
                    <p className="text-gray-600">{selectedPhone.name}</p>
                    <p className="text-xs text-gray-400">oBrIBWmQY7bmIbEIAC70</p>
                  </div>
                  <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 mr-4 cursor-pointer">
                    📞 Outbound call
                  </button>
                </div>

                {/* Inbound call section */}
                <div className="bg-gray-50 border rounded-xl p-4">
                  <p className="font-semibold">Inbound calls</p>
                  <p className="text-sm text-gray-500 mb-2">Assign an agent to handle calls to this phone number.</p>
                  <select className="border px-3 py-2 rounded-md">
                    <option>{selectedPhone.agent}</option>
                    <option>SparkAgent</option>
                    <option>NovaAgent</option>
                  </select>
                </div>
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
