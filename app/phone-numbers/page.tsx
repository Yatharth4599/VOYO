"use client"

import { useState, useRef, useEffect } from 'react'
import { MoreHorizontal } from 'lucide-react'
import NavigationLayout from '@/components/NavigationLayout'
import { motion, AnimatePresence } from 'framer-motion'
import Pagination from '@/components/Pagination'

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
  const [showDialerModal, setShowDialerModal] = useState(false)
  const [dialNumber, setDialNumber] = useState('')
  const [selectedCountryCode, setSelectedCountryCode] = useState('+971') // Default to UAE

  const fullNumber = `${selectedCountryCode}${dialNumber}`

  


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


  const agents = ['PineBot', 'SparkAgent', 'NovaAgent']
  const phoneNumbers = ['+1 404 123 9876', '+1 917 555 3045', '+1 213 888 7777']

  const [selectedAgent, setSelectedAgent] = useState('')
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('')



  return (
    <NavigationLayout
      title="Phone Numbers"
      currentPage="/phone-numbers"
      showCreateButton={true}
      onCreateClick={() => setDropdownOpen(!dropdownOpen)}
      createButtonText="Add Number" 
      secondaryButtonText="Dial Number"
      onSecondaryClick={() => setShowDialerModal(true)}
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
        </div>
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
                      📞 Call Now
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
      <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
        />

        <AnimatePresence>
          {showDialerModal && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md bg-black/30"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowDialerModal(false)}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 w-[340px] sm:w-[390px] shadow-2xl relative"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-3 right-4 text-gray-400 hover:text-gray-700 cursor-pointer"
                  onClick={() => setShowDialerModal(false)}
                >
                  ✖
                </button>

                <h2 className="text-xl font-semibold mb-4">Dial a Number</h2>

                <div className="flex items-center gap-2 mb-4">
                  <select
                    value={selectedCountryCode}
                    onChange={(e) => setSelectedCountryCode(e.target.value)}
                    className="border border-gray-300 rounded-md px-2 py-3 text-sm"
                  >
                    <option value="+91">🇮🇳 +91</option>
                    <option value="+971">🇦🇪 +971</option>
                  </select>

                  <input
                    type="text"
                    value={dialNumber}
                    readOnly
                    className="flex-1 text-center border border-gray-300 rounded-md py-2 text-lg tracking-wide"
                  />

                  <button
                    className="text-sm text-gray-600 hover:text-black"
                    onClick={() => setDialNumber((prev) => prev.slice(0, -1))}
                  >
                    ⌫
                  </button>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  
                  {['1','2','3','4','5','6','7','8','9','*','0','#'].map((digit) => (
                    <button
                      key={digit}
                      onClick={() => setDialNumber(prev => prev + digit)}
                      className="bg-gray-100 hover:bg-gray-200 text-xl py-3 rounded-md cursor-pointer"
                    >
                      {digit}
                    </button>
                  ))}

                  
                </div>

                <button
                  onClick={() => {
                    alert(`Calling ${selectedCountryCode}${dialNumber}...`)
                    setDialNumber('')
                    setShowDialerModal(false)
                  }}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 cursor-pointer"
                >
                  📞 Call Now
                </button>

                <div className="mt-6 space-y-4">
                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Select Agent</label>
                    <select
                      value={selectedAgent}
                      onChange={(e) => setSelectedAgent(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="" disabled>Select an agent</option>
                      {agents.map((agent) => (
                        <option key={agent} value={agent}>
                          {agent}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm text-gray-600 mb-1">Select Phone Number</label>
                    <select
                      value={selectedPhoneNumber}
                      onChange={(e) => setSelectedPhoneNumber(e.target.value)}
                      className="w-full border border-gray-300 rounded-md px-3 py-2"
                    >
                      <option value="" disabled>Select a phone number</option>
                      {phoneNumbers.map((number) => (
                        <option key={number} value={number}>
                          {number}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
    </NavigationLayout>
  )
}
