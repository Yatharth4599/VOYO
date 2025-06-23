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



// 'use client'

// import { useState, useRef, useEffect } from 'react'
// import { Plus, MoreHorizontal } from 'lucide-react'
// import NavigationLayout from '@/components/NavigationLayout'

// type PhoneEntry = {
//   name: string;
//   number: string;
//   agent: string;
//   provider: string;
// };

// const fakePhoneData: PhoneEntry[] = [
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
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const dropdownRef = useRef(null)

//   // Close dropdown when clicked outside
//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !(dropdownRef.current as any).contains(event.target)
//       ) {
//         setDropdownOpen(false)
//       }
//     }
//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const [selectedPhone, setSelectedPhone] = useState<PhoneEntry | null>(null);
//   const [showModal, setShowModal] = useState(false)

//   const handleRowClick = (phoneEntry: PhoneEntry) => {
//     setSelectedPhone(phoneEntry)
//     setShowModal(true)
//   }


//   return (
//     <NavigationLayout 
//       title="Phone Numbers" 
//       currentPage="/phone-numbers"
//       showCreateButton={true}
//       onCreateClick={() => setDropdownOpen(!dropdownOpen)}
//       createButtonText="Import Number"
//     >
//       <div className="flex-1 relative">
//         <div className="mb-6">
//           <p className="text-gray-500">Import and manage your phone numbers</p>
//         </div>

        // <div className="relative" ref={dropdownRef}>
        //   {dropdownOpen && (
        //     <div className="absolute right-0 top-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
        //       <div
        //         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        //         onClick={() => {
        //           setDropdownOpen(false)
        //           alert('Importing from Twilio...')
        //         }}
        //       >
        //         From Twilio
        //       </div>
        //       <div
        //         className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
        //         onClick={() => {
        //           setDropdownOpen(false)
        //           alert('Importing from SIP Trunk...')
        //         }}
        //       >
        //         From SIP Trunk
        //       </div>
        //     </div>
        //   )}
        // </div>

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
//                 <tr key={i} onClick={() => handleRowClick(entry)} className="border-b hover:bg-gray-50 cursor-pointer">
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
//                     <MoreHorizontal size={18} className="cursor-pointer text-gray-500 hover:bg-gray-200" />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {showModal && selectedPhone && (
//             <div className="fixed inset-0 bg-black bg-opacity-40 flex items-start justify-center z-50 p-6" onClick={() => setShowModal(false)}>
//               <div
//                 className="bg-white rounded-xl p-9 max-w-3xl w-full relative"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 {/* Close button */}
//                 <button className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer" onClick={() => setShowModal(false)}>✖</button>

//                 {/* Header Row */}
//                 <div className="flex justify-between items-start mb-6">
//                   <div>
//                     <h2 className="text-xl font-bold">{selectedPhone.number}</h2>
//                     <p className="text-gray-600">{selectedPhone.name}</p>
//                     <p className="text-xs text-gray-400">oBrIBWmQY7bmIbEIAC70</p>
//                   </div>
//                   <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 mr-4 cursor-pointer">
//                     📞 Outbound call
//                   </button>
//                 </div>

//                 {/* Inbound call section */}
//                 <div className="bg-gray-50 border rounded-xl p-4">
//                   <p className="font-semibold">Inbound calls</p>
//                   <p className="text-sm text-gray-500 mb-2">Assign an agent to handle calls to this phone number.</p>
//                   <select className="border px-3 py-2 rounded-md">
//                     <option>{selectedPhone.agent}</option>
//                     <option>SparkAgent</option>
//                     <option>NovaAgent</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </NavigationLayout>
//   )
// }


// "use client"

// import { useState, useRef, useEffect } from 'react'
// import { MoreHorizontal } from 'lucide-react'
// import NavigationLayout from '@/components/NavigationLayout'
// import { motion, AnimatePresence } from 'framer-motion'

// type PhoneEntry = {
//   name: string;
//   number: string;
//   agent: string;
//   provider: string;
// };

// const fakePhoneData: PhoneEntry[] = [
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
//   const [dropdownOpen, setDropdownOpen] = useState(false)
//   const [selectedPhone, setSelectedPhone] = useState<PhoneEntry | null>(null)
//   const [showModal, setShowModal] = useState(false)

//   const dropdownRef = useRef<HTMLDivElement>(null)

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         dropdownRef.current &&
//         !dropdownRef.current.contains(event.target as Node)
//       ) {
//         setDropdownOpen(false)
//       }
//     }

//     document.addEventListener('mousedown', handleClickOutside)
//     return () => document.removeEventListener('mousedown', handleClickOutside)
//   }, [])

//   const handleRowClick = (phoneEntry: PhoneEntry) => {
//     setSelectedPhone(phoneEntry)
//     setShowModal(true)
//   }

//   return (
//     <NavigationLayout
//       title="Phone Numbers"
//       currentPage="/phone-numbers"
//       showCreateButton={true}
//       onCreateClick={() => setDropdownOpen(!dropdownOpen)}
//       createButtonText="Import Number"
//     >
//       <div className="flex-1 relative">
//         <div className="mb-6">
//           <p className="text-gray-500">Import and manage your phone numbers</p>
//         </div>

//         {/* Soft Reveal Dropdown */}
//         <AnimatePresence>
//           {dropdownOpen && (
//             <motion.div
//               ref={dropdownRef}
//               className="absolute z-50 right-[-25] top-[-40] w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
//               initial={{ opacity: 0, y: -10 }}
//               animate={{ opacity: 1, y: 0 }}
//               exit={{ opacity: 0, y: -10 }}
//               transition={{ duration: 0.2 }}
//             >
//               <div
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setDropdownOpen(false)
//                   alert('Importing from Twilio...')
//                 }}
//               >
//                 From Twilio
//               </div>
//               <div
//                 className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setDropdownOpen(false)
//                   alert('Importing from SIP Trunk...')
//                 }}
//               >
//                 From SIP Trunk
//               </div>
//             </motion.div>
//           )}
//         </AnimatePresence>

//         {/* Table */}
//         <div className="modern-card overflow-x-auto">
//           <table className="min-w-full text-left text-sm">
//             <thead className="bg-gray-50 text-gray-500 border-b">
//               <tr>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-900">Name</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-900">Phone number</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-900">Assigned agent</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-900">Provider</th>
//                 <th className="p-4 text-left text-sm font-semibold text-gray-900"></th>
//               </tr>
//             </thead>
//             <tbody>
//               {fakePhoneData.map((entry, i) => (
//                 <tr
//                   key={i}
//                   onClick={() => handleRowClick(entry)}
//                   className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
//                 >
//                   <td className="p-4 text-gray-800">{entry.name}</td>
//                   <td className="p-4 text-gray-800">{entry.number}</td>
//                   <td className="p-4 text-gray-800">
//                     {entry.agent}
//                     <span className="text-xs">↗</span>
//                   </td>
//                   <td className="p-4 text-gray-800">
//                     <span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">
//                       {entry.provider}
//                     </span>
//                   </td>
//                   <td className="p-4 text-gray-800">
//                     <MoreHorizontal
//                       size={18}
//                       className="cursor-pointer text-gray-500 hover:bg-gray-200"
//                     />
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* Slide-in Side Panel */}
//           <AnimatePresence>
//             {showModal && selectedPhone && (
//               <motion.div
//                 className="fixed inset-0 z-50 flex"
//                 initial={{ opacity: 0 }}
//                 animate={{ opacity: 1 }}
//                 exit={{ opacity: 0 }}
//                 onClick={() => setShowModal(false)}
//               >
//                 <div className="flex-1" />

//                 <motion.div
//                   className="w-full max-w-xl bg-white h-full shadow-xl overflow-y-auto p-9 relative"
//                   initial={{ x: '100%' }}
//                   animate={{ x: 0 }}
//                   exit={{ x: '100%' }}
//                   transition={{ duration: 0.3 }}
//                   onClick={(e) => e.stopPropagation()}
//                 >
//                   <button
//                     className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
//                     onClick={() => setShowModal(false)}
//                   >
//                     ✖
//                   </button>

//                   <div className="flex justify-between items-start mb-6">
//                     <div>
//                       <h2 className="text-xl font-bold">
//                         {selectedPhone.number}
//                       </h2>
//                       <p className="text-gray-600">{selectedPhone.name}</p>
//                       <p className="text-xs text-gray-400">
//                         oBrIBWmQY7bmIbEIAC70
//                       </p>
//                     </div>
//                     <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 mr-4 cursor-pointer">
//                       📞 Outbound call
//                     </button>
//                   </div>

//                   <div className="bg-gray-50 border rounded-xl p-4">
//                     <p className="font-semibold">Inbound calls</p>
//                     <p className="text-sm text-gray-500 mb-2">
//                       Assign an agent to handle calls to this phone number.
//                     </p>
//                     <select className="border px-3 py-2 rounded-md">
//                       <option>{selectedPhone.agent}</option>
//                       <option>SparkAgent</option>
//                       <option>NovaAgent</option>
//                     </select>
//                   </div>
//                 </motion.div>
//               </motion.div>
//             )}
//           </AnimatePresence>
//         </div>
//       </div>
//     </NavigationLayout>
//   )
// }


"use client"

import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'
import NavigationLayout from '@/components/NavigationLayout'
import { motion, AnimatePresence } from 'framer-motion'

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
  const [selectedPhone, setSelectedPhone] = useState<PhoneEntry | null>(null)
  const [showModal, setShowModal] = useState(false)

  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleRowClick = (phoneEntry: PhoneEntry) => {
    setSelectedPhone(phoneEntry)
    setShowModal(true)
  }

  const ITEMS_PER_PAGE = 10

  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(fakePhoneData.length / ITEMS_PER_PAGE)

  const paginatedData = fakePhoneData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  )


  return (
    <NavigationLayout
      title="Phone Numbers"
      currentPage="/phone-numbers"
      showCreateButton={true}
      onCreateClick={() => setDropdownOpen(!dropdownOpen)}
      createButtonText="Import Number"
    >
      <div className="flex-1 relative">
        <div className="mb-6">
          <p className="text-gray-500">Import and manage your phone numbers</p>
        </div>

        {/* Soft Reveal Dropdown */}
        <AnimatePresence>
          {dropdownOpen && (
            <motion.div
              ref={dropdownRef}
              className="absolute z-50 right-[-25] top-[-40] w-48 bg-white border border-gray-200 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
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
            </motion.div>
          )}
        </AnimatePresence>

        {/* Table */}
        <div className="modern-card overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-500 border-b">
              <tr>
                <th className="p-4 text-left text-sm font-semibold text-gray-900">Name</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900">Phone number</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900">Assigned agent</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900">Provider</th>
                <th className="p-4 text-left text-sm font-semibold text-gray-900"></th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((entry, i) => (
                <tr key={i} onClick={() => handleRowClick(entry)} className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                  <td className="p-4 text-gray-800">{entry.name}</td>
                  <td className="p-4 text-gray-800">{entry.number}</td>
                  <td className="p-4 text-gray-800">{entry.agent}<span className="text-xs">↗</span></td>
                  <td className="p-4 text-gray-800"><span className="bg-gray-100 px-2 py-0.5 rounded-full text-xs">{entry.provider}</span></td>
                  <td className="p-4 text-gray-800"><MoreHorizontal size={18} className="cursor-pointer text-gray-500 hover:bg-gray-200" /></td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Slide-in Side Panel */}
          <AnimatePresence>
            {showModal && selectedPhone && (
              <motion.div
                className="fixed inset-0 z-50 flex"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setShowModal(false)}
              >
                <div className="flex-1" />

                <motion.div
                  className="w-full max-w-xl bg-white h-full shadow-xl overflow-y-auto p-9 relative"
                  initial={{ x: '100%' }}
                  animate={{ x: 0 }}
                  exit={{ x: '100%' }}
                  transition={{ duration: 0.3 }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="absolute top-4 right-4 text-gray-500 hover:text-black cursor-pointer"
                    onClick={() => setShowModal(false)}
                  >
                    ✖
                  </button>

                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <h2 className="text-xl font-bold">
                        {selectedPhone.number}
                      </h2>
                      <p className="text-gray-600">{selectedPhone.name}</p>
                      <p className="text-xs text-gray-400">
                        oBrIBWmQY7bmIbEIAC70
                      </p>
                    </div>
                    <button className="bg-black text-white px-4 py-2 rounded-md flex items-center gap-2 hover:bg-gray-800 mr-4 cursor-pointer">
                      📞 Outbound call
                    </button>
                  </div>

                  <div className="bg-gray-50 border rounded-xl p-4">
                    <p className="font-semibold">Inbound calls</p>
                    <p className="text-sm text-gray-500 mb-2">
                      Assign an agent to handle calls to this phone number.
                    </p>
                    <select className="border px-3 py-2 rounded-md">
                      <option>{selectedPhone.agent}</option>
                      <option>SparkAgent</option>
                      <option>NovaAgent</option>
                    </select>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center items-center gap-2 mt-4 px-2">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className={`px-3 py-1 rounded-md border text-sm ${currentPage === 1 ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          ← Prev
        </button>

        <span className="text-sm text-gray-700">
          Page {currentPage} of {totalPages}
        </span>

        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className={`px-3 py-1 rounded-md border text-sm ${currentPage === totalPages ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'hover:bg-gray-100'}`}
        >
          Next →
        </button>
      </div>
    </NavigationLayout>
  )
}
