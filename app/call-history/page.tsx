'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { createApiUrl } from '@/lib/config'
import NavigationLayout from '@/components/NavigationLayout'
import Pagination from '@/components/Pagination'

type TranscriptionLine = {
  speaker: string
  text: string
}

type TranscriptLine = {
  role: string
  message: string
}

type CallDetails = {
  transcript?: TranscriptLine[]
  analysis?: {
    transcript_summary?: string
    call_successful?: boolean
    [key: string]: unknown
  }
  metadata?: {
    start_time_unix_secs?: number
    call_duration_secs?: number
    [key: string]: unknown
  }
  [key: string]: unknown
}

type ConversationData = {
  start_time_unix_secs: number
  agent: { name: string }
  agent_name: string
  duration_seconds: number
  call_duration_secs: number
  call_successful: boolean
  status?: string
  message_count: number
  conversation_id: string
  inbound_phone_number: string
  [key: string]: unknown
}

type Call = {
  date: string
  agent: string
  duration: string
  messages: number
  status: string
  convoId?: string
  call_successful: 'success' | 'failed' | 'unknown'
  transcription?: TranscriptionLine[]
}

function parseCallDate(dateStr: string): Date | null {
  const parsed = Date.parse(dateStr.replace(' at', ''))
  return isNaN(parsed) ? null : new Date(parsed)
}

export default function CallHistoryPage() {
  const [calls, setCalls] = useState<Call[]>([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState<Call | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'transcription'>('overview')
  const detailRef = useRef<HTMLDivElement>(null)

  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null])
  const [showDateRange, setShowDateRange] = useState(false)

  const [statusFilter, setStatusFilter] = useState<string | null>(null)
  const [showStatusDropdown, setShowStatusDropdown] = useState(false)

  const [agentFilter, setAgentFilter] = useState<string | null>(null)
  const [showAgentDropdown, setShowAgentDropdown] = useState(false)

  const [startDate, endDate] = dateRange

  const [callDetails, setCallDetails] = useState<CallDetails | null>(null)
  const [detailsLoading, setDetailsLoading] = useState(false)

  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const [currentPage, setCurrentPage] = useState(1)
  const callsPerPage = 10

  useEffect(() => {
    const fetchCalls = async () => {
      try {
        if (typeof window === 'undefined') return;

        const token = localStorage.getItem('jwtToken')
        if (!token) {
          console.warn('No JWT token found')
          setLoading(false)
          return
        }

        const res = await fetch(createApiUrl('/user/conversations/'), {
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`)
        }

        const data = await res.json()
        const formattedCalls: Call[] = data.conversations.map((conv: ConversationData) => {
          const dateObj = new Date(conv.start_time_unix_secs * 1000)
          const dateStr = dateObj.toLocaleString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
          })

          const minutes = Math.floor(conv.call_duration_secs / 60)
          const seconds = conv.call_duration_secs % 60
          const durationStr = `${minutes}:${seconds.toString().padStart(2, '0')}`

          let statusText = conv.status || (conv.call_successful ? 'Successful' : 'Failed')
          statusText = statusText.charAt(0).toUpperCase() + statusText.slice(1).toLowerCase()

          return {
            date: dateStr,
            agent: conv.agent_name,
            duration: durationStr,
            messages: conv.message_count,
            status: statusText,
            call_successful: conv.call_successful,
            convoId: conv.conversation_id,
          }
        })

        setCalls(formattedCalls)
        setLoading(false)
      } catch (err) {
        console.error('Error fetching conversations:', err)
        setLoading(false)
      }
    }

    fetchCalls()
  }, [])

  const closeAllDropdowns = () => {
    setShowDateRange(false)
    setShowStatusDropdown(false)
    setShowAgentDropdown(false)
  }

  const getStatusBadgeClasses = (status: string) => {
    switch (status.toLowerCase()) {
      case 'success':
      case 'successful':
        return 'bg-green-100 text-green-700'
      case 'error':
        return 'bg-red-100 text-red-700'
      case 'unknown':
        return 'bg-gray-300 text-gray-800'
      default:
        return 'bg-gray-200 text-gray-800'
    }
  }

  const uniqueAgents = Array.from(new Set(calls.map(call => call.agent)))

  const filteredData = calls.filter(call => {
    const callDate = parseCallDate(call.date)
    if (!callDate) return false

    const afterOK = startDate ? callDate >= startDate : true
    const beforeOK = endDate ? callDate <= endDate : true
    const statusOK = statusFilter ? (call.call_successful?.toLowerCase?.() === statusFilter.toLowerCase()) : true
    const agentOK = agentFilter ? call.agent === agentFilter : true

    return afterOK && beforeOK && statusOK && agentOK

  })

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (detailRef.current && !detailRef.current.contains(event.target as Node)) {
        setSelected(null)
      }
    }

    if (selected) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selected])

  return (
    <NavigationLayout title="Call History" currentPage="/call-history">
      <div className="flex-1 relative text-gray-900">
        <div className="flex flex-wrap gap-4 mb-6 relative z-40 overflow-visible">
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setShowDateRange(prev => !prev)
              }}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
            >
              + Date Range
              {(startDate || endDate) && (
                <> | {startDate?.toLocaleDateString('en-US') || '...'} - {endDate?.toLocaleDateString('en-US') || '...'} </>
              )}
            </button>
            {showDateRange && (
              <div className="absolute mt-2 bg-white p-4 rounded-lg shadow-xl z-50 border border-gray-200">
                <DatePicker
                  selectsRange
                  startDate={startDate}
                  endDate={endDate}
                  onChange={(update: [Date | null, Date | null]) => {
                    setDateRange(update)
                    if (update[0] && update[1]) setShowDateRange(false)
                  }}
                  inline
                />
              </div>
            )}
          </div>
          {/* Evaluation Filter */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setShowStatusDropdown(prev => !prev)
              }}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
            >
              + Evaluation{statusFilter ? ` | ${statusFilter}` : ''}
            </button>
            {showStatusDropdown && (
              <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
                {['Success', 'Error', 'Unknown'].map(option => (
                  <div
                    key={option}
                    onClick={() => {
                      setStatusFilter(option === 'Clear' ? null : option)
                      setShowStatusDropdown(false)
                    }}
                    className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                  >
                    {option}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Agent Filter */}
          <div className="relative">
            <button
              onClick={() => {
                closeAllDropdowns()
                setShowAgentDropdown(prev => !prev)
              }}
              className="text-sm border border-gray-200 rounded-full px-4 py-2 hover:bg-gray-50 cursor-pointer bg-white text-gray-700 transition-all duration-200 shadow-sm"
            >
              + Agent{agentFilter ? ` | ${agentFilter}` : ''}
            </button>
            {showAgentDropdown && (
              <div className="absolute mt-2 bg-white p-2 rounded-lg shadow-xl z-50 w-40 border border-gray-200">
                {uniqueAgents.map(agent => (
                  <div
                    key={agent}
                    onClick={() => {
                      setAgentFilter(agent)
                      setShowAgentDropdown(false)
                    }}
                    className="cursor-pointer text-sm text-gray-700 hover:bg-gray-50 px-2 py-1 rounded transition-colors"
                  >
                    {agent}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ✖ Clear All Filters */}
          {(startDate || endDate || statusFilter || agentFilter) && (
            <button
              onClick={() => {
                setDateRange([null, null])
                setStatusFilter(null)
                setAgentFilter(null)
                closeAllDropdowns()
              }}
              className="text-sm border border-red-200 text-red-600 rounded-full px-4 py-2 hover:bg-red-50 cursor-pointer bg-white transition-all duration-200 shadow-sm"
            >
              ✖ Clear All Filters
            </button>
          )}

        </div>

        {/* Table */}
        {loading ? (
          <div className="text-gray-600 mt-4 text-center">Loading call history...</div>
        ) : filteredData.length === 0 ? (
          <div className="text-gray-500 mt-4 text-center">No calls match your filters.</div>
        ) : (
          <div className="modern-card overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Date</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Agent</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Duration</th>
                  <th className="p-4 text-left text-sm font-semibold text-gray-900">Messages</th>
                  <th className="p-4 text-center text-sm font-semibold text-gray-900">Evaluation result</th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice((currentPage - 1) * callsPerPage, currentPage * callsPerPage).map((call, i) => (

                  <tr
                    key={i}
                    className="border-t border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors duration-200"
                    onClick={async () => {
                      setSelected(call)
                      setActiveTab('overview')
                      setDetailsLoading(true)
                      setCallDetails(null) // clear previous details

                      try {
                        const token = localStorage.getItem('jwtToken')

                        // Fetch call details
                        const res = await fetch(createApiUrl(`/user/conversations/${call.convoId}`), {
                          headers: { Authorization: `Bearer ${token}` },
                        })
                        const data = await res.json()
                        setCallDetails(data)

                        // Fetch audio
                        const audioRes = await fetch(createApiUrl(`/user/conversations/${call.convoId}/audio`), {
                          headers: { Authorization: `Bearer ${token}` },
                        })

                        if (audioRes.ok) {
                          const audioBlob = await audioRes.blob()
                          const audioObjectUrl = URL.createObjectURL(audioBlob)
                          setAudioUrl(audioObjectUrl)
                        } else {
                          setAudioUrl(null)
                          console.warn('Audio not available:', audioRes.status)
                        }
                      } catch (err) {
                        console.error('Error fetching call details or audio:', err)
                        setCallDetails(null)
                        setAudioUrl(null)
                      } finally {
                        setDetailsLoading(false)
                      }
                    }}
                  >
                    <td className="p-4 text-gray-800">{call.date}</td>
                    <td className="p-4 text-gray-800">{call.agent}</td>
                    <td className="p-4 text-gray-800">{call.duration}</td>
                    <td className="p-4 text-gray-800">{call.messages}</td>
                    <td className="p-4 text-center">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusBadgeClasses(call.call_successful)}`}>
                        {call.call_successful.charAt(0).toUpperCase() + call.call_successful.slice(1)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
        )}

        <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(filteredData.length / callsPerPage)}
        onPageChange={setCurrentPage}
      />


        {/* Slide-in detail view (you can complete this later) */}
        <AnimatePresence>
          {selected && (
            <motion.div
              key="detail"
              initial={{ x: '100%', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ duration: 0.3 }}
              ref={detailRef}
              className="fixed top-0 right-0 h-full w-3/4 bg-white text-gray-900 p-6 z-50 shadow-2xl overflow-y-auto border-l border-gray-200"
            >
              {/* Close button */}
              <div className="mb-4">
                <button
                  onClick={() => setSelected(null)}
                  className="border border-gray-200 px-3 py-1 text-sm rounded-md hover:bg-gray-50 transition-colors cursor-pointer float-right text-gray-700"
                >
                  Close
                </button>
              </div>

              {/* Right Divider: Position this precisely at the boundary */}
              <div
                className="border-r border-gray-200 absolute top-0 bottom-0"
                style={{ right: '20rem', width: '1px' }}
              ></div>

              <div className="flex items-start h-full">
                {/* LEFT SIDE: Conversation Content */}
                <div
                  className="flex-1 pr-10"
                  style={{ maxWidth: 'calc(100% - 12rem)' }}
                >
                  <div className="mt-2 mb-4">
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-semibold text-gray-900">Conversation with {selected.agent}</p>
                    </div>
                  </div>

                 {audioUrl ? (
                  <audio
                    controls
                    preload="auto"
                    className="mt-4 w-full max-w-md rounded-lg border border-gray-200"
                    src={audioUrl}
                  >
                    Your browser does not support the audio element.
                  </audio>
                ) : detailsLoading ? (
                  <p className="text-sm text-gray-500">Loading audio...</p>
                ) : (
                  <p className="text-sm text-red-500 mt-4">No audio available for this call.</p>
                )}

                  {/* Tab buttons */}
                  <div className="mt-8 mb-6 flex space-x-10">
                    <button
                      className={`cursor-pointer transition-colors duration-200 ${activeTab === 'overview' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setActiveTab('overview')}
                    >
                      Overview
                    </button>
                    <button
                      className={`cursor-pointer transition-colors duration-200 ${activeTab === 'transcription' ? 'text-orange-600 font-medium' : 'text-gray-600 hover:text-gray-800'}`}
                      onClick={() => setActiveTab('transcription')}
                    >
                      Transcription
                    </button>
                  </div>

                  {/* Tabs Content */}
                  <div className="mt-8">
                    {activeTab === 'overview' && (
                      <>
                        {/* Summary */}
                        <div className="border-t border-gray-200 pt-6">
                          <p className="text-lg font-bold text-gray-900">Summary</p>
                          <br />
                          <p className="text-gray-700 leading-relaxed">
                            {detailsLoading
                              ? 'Loading summary...'
                              : callDetails?.analysis?.transcript_summary || 'No summary available for this call.'}
                          </p>
                        </div>

                        {/* Call Status */}
                        <div className="border-t border-gray-200 mt-10 mb-5 pt-6">
                          <div className="flex items-center justify-between">
                            <p className="text-lg font-bold text-gray-900">Call Status</p>

                            {(() => {
                              const rawStatus = callDetails?.analysis?.call_successful ?? selected.call_successful ?? 'unknown'
                              const statusStr = String(rawStatus).toLowerCase()
                              const label = statusStr.charAt(0).toUpperCase() + statusStr.slice(1)

                              return (
                                <span className={`px-3 py-[3px] rounded-full text-sm leading-none ${getStatusBadgeClasses(statusStr)}`}>
                                  {label}
                                </span>
                              )
                            })()}
                          </div>
                        </div>
                        {/* SECOND vertical line below Call Status */}
                        <div className="border-t border-gray-200 pt-6"></div>
                      </>
                    )}

                    {activeTab === 'transcription' && (
                      <div className="border-t border-gray-200 mt-4 pt-6">
                        <p className="text-lg font-bold mb-4 text-gray-900">Full Transcription</p>

                        {detailsLoading ? (
                          <p className="text-sm text-gray-500">Loading transcription...</p>
                        ) : callDetails?.transcript?.length ? (
                          <div className="space-y-3">
                            {callDetails.transcript.map((line: TranscriptLine, index: number) => (
                              <div key={index} className="text-sm">
                                <span className="font-semibold capitalize text-gray-800">
                                  {line.role}:
                                </span>
                                <span className="ml-2 text-gray-700">{line.message}</span>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-sm text-gray-500">No transcription available.</p>
                        )}
                      </div>
                    )}

                  </div>
                </div>

                {/* RIGHT SIDE: Meta Data Panel */}
                <div
                  className="mt-2"
                  style={{
                    width: '12rem', // fixed width
                    flexShrink: 0,  // prevent shrinking when content is missing
                    marginLeft: '1rem', // space from left content
                  }}
                >
                  <p className="text-lg text-gray-900">Meta Data</p>
                  <p className="text-sm text-gray-600 mt-2">
                    Date:{' '}
                    {callDetails?.metadata?.start_time_unix_secs
                      ? new Date(callDetails.metadata.start_time_unix_secs * 1000).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })
                      : '—'}
                  </p>
                  <p className="text-sm text-gray-600">
                    Connection duration:{' '}
                    {callDetails?.metadata?.call_duration_secs != null
                      ? `${Math.floor(callDetails.metadata.call_duration_secs / 60)}:${String(
                          callDetails.metadata.call_duration_secs % 60
                        ).padStart(2, '0')}`
                      : '—'}
                  </p>

                  {/* Removed price preview line to avoid layout shifts */}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </NavigationLayout>
  )
}
