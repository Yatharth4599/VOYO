'use client'

import { useState, useEffect, useRef } from 'react'
import { createApiUrl } from '@/lib/config'

interface Agent {
  "Agent Name": string
  "Agent URL": string
  "Agent Logo": string
  "Description": string
  "Pricing Model": string
  "Category": string
  "Official Website URL": string
}

interface AgentModal {
  isOpen: boolean
  agent: Agent | null
}

export default function Hero() {
  const [sort, setSort] = useState('popularity')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [visibleCount, setVisibleCount] = useState(9)
  const [animate, setAnimate] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [categories, setCategories] = useState<string[]>([])
  const [agents, setAgents] = useState<Agent[]>([])
  const [loading, setLoading] = useState(true)
  const [modal, setModal] = useState<AgentModal>({ isOpen: false, agent: null })
  const cardGridRef = useRef<HTMLDivElement | null>(null);
  const [cardGridHeight, setCardGridHeight] = useState(0);

  useEffect(() => {
    setAnimate(true)
    fetchCategories()
    fetchAllAgents()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch(createApiUrl('/api/agents-directory/categories'))
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchAllAgents = async () => {
    try {
      const response = await fetch(createApiUrl('/api/agents-directory/all'))
      const data = await response.json()
      if (data.success) {
        setAgents(data.data)
      }
    } catch (error) {
      console.error('Error fetching agents:', error)
    } finally {
      setLoading(false)
    }
  }

  const fetchAgentsByCategory = async (category: string) => {
    setLoading(true)
    try {
      const encodedCategory = encodeURIComponent(category)
      const response = await fetch(createApiUrl(`/api/agents-directory/category/${encodedCategory}`))
      const data = await response.json()
      if (data.success) {
        setAgents(data.data)
      }
    } catch (error) {
      console.error('Error fetching agents by category:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setVisibleCount(9)
    if (category === 'all') {
      fetchAllAgents()
    } else {
      fetchAgentsByCategory(category)
    }
  }

  const openModal = (agent: Agent) => {
    setModal({ isOpen: true, agent })
  }

  const closeModal = () => {
    setModal({ isOpen: false, agent: null })
  }

  const filteredAgents = agents
    .filter(agent => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        return (
          agent['Agent Name'].toLowerCase().includes(query) ||
          agent.Description.toLowerCase().includes(query) ||
          agent.Category.toLowerCase().includes(query)
        )
      }
      return true
    })
    .sort((a, b) => {
      if (sort === 'name') return a['Agent Name'].localeCompare(b['Agent Name'])
      return 0
    })

    useEffect(() => {
      if (cardGridRef.current) {
        const height = cardGridRef.current.offsetHeight;
        setCardGridHeight(height);
      }
    }, [visibleCount, filteredAgents]);


  return (
    <section className="bg-[#FFFBF3] relative dark:bg-gradient-to-b dark:from-[#120B27] dark:via-orange-950 dark:to-black text-black dark:text-white pt-30 pb-32 overflow-hidden">
      <style>{`
        @keyframes slideUpFadeIn {
          0% {
            opacity: 0;
            transform: translateY(30px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .slide-up-fade-in {
          animation: slideUpFadeIn 0.6s ease forwards;
        }
      `}</style>

      <div className="text-center">
        <h1
          className={
            "bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 " +
            "bg-clip-text text-transparent text-[50px] font-bold " +
            (animate ? "slide-up-fade-in" : "opacity-0")
          }
          style={{ animationDelay: '0s' }}
        >
          Best AI Agents Directory
        </h1>
        <p
          className={
            "text-lg mt-4 " +
            (animate ? "slide-up-fade-in" : "opacity-0")
          }
          style={{ animationDelay: '0.2s' }}
        >
          Discover and explore the most powerful AI agents across different categories.
          Find the perfect AI agent for your business needs and workflows.
        </p>
      </div>

      <div className="ml-30 mt-10">
        <h1 className="bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[40px] font-bold mb-5">
          Explore AI Agents
        </h1>

        {/* Search */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search for AI agents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border border-gray-200 w-[500px] p-2 rounded-lg outline-none backdrop-saturate-50 dark:hover:border-purple-500 hover:border-orange-500"
          />
        </div>
      </div>

      <div className="mt-10 ml-30 mr-30 flex justify-between items-start gap-8">
        {/* Sidebar */}
        <div className="w-60 sticky top-0 h-screen overflow-y-auto pr-4">
          <h2 className="font-bold mb-4 text-xl">Categories</h2>
          <form className="flex flex-col gap-2 text-sm">
            <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
              <input
                type="checkbox"
                checked={selectedCategory === 'all'}
                onChange={() => handleCategoryChange('all')}
                className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-amber-600 checked:border-amber-600 dark:checked:bg-violet-600 dark:checked:border-violet-600"
              />
              All categories
            </label>

            {categories.map((category) => (
              <label key={category} className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
                <input
                  type="checkbox"
                  checked={selectedCategory === category}
                  onChange={() => handleCategoryChange(selectedCategory === category ? 'all' : category)}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-amber-600 checked:border-amber-600 dark:checked:bg-violet-600 dark:checked:border-violet-600"
                />
                {category}
              </label>
            ))}
          </form>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl whitespace-nowrap">
              {loading ? 'Loading...' : `${filteredAgents.length} AI Agents`}
            </h2>
            <div className="border border-gray-200 rounded-md p-2 inline-flex items-center gap-2">
              <label htmlFor="sort" className="text-gray-700 dark:text-gray-300 font-medium whitespace-nowrap">
                Sort:
              </label>
              <select
                id="sort"
                name="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="bg-transparent outline-none dark:text-white"
              >
                <option value="name">Name</option>
              </select>
            </div>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="flex flex-col border border-gray-200 rounded-2xl p-4 dark:border-gray-700 animate-pulse">
                  <div className="self-center bg-gray-200 dark:bg-gray-500 h-20 w-20 rounded-2xl" />
                  <div className="mt-5 h-6 bg-gray-200 dark:bg-gray-500 rounded self-center w-3/4" />
                  <div className="mt-3 h-4 bg-gray-200 dark:bg-gray-500 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {filteredAgents.slice(0, visibleCount).map((agent, index) => (
                <div 
                  key={index} 
                  className="flex flex-col border border-gray-200 rounded-2xl p-4 dark:border-gray-700 cursor-pointer hover:shadow-lg transition-shadow"
                  onClick={() => openModal(agent)}
                >
                  <div className="self-center h-20 w-20 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-500">
                    {agent['Agent Logo'] ? (
                      <img 
                        src={agent['Agent Logo']} 
                        alt={agent['Agent Name']} 
                        className="w-full h-full object-contain p-1" // ← FIXED
                        onError={(e) => {
                          e.currentTarget.style.display = 'none'
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-gray-500">
                        AI
                      </div>
                    )}
                  </div>
                  <h1 className="mt-5 text-xl font-bold self-center text-center">{agent['Agent Name']}</h1>
                  <p className="text-center mt-3 text-sm text-gray-600 dark:text-gray-400 line-clamp-2">
                    {agent.Description}
                  </p>
                  <div className="mt-2 text-center">
                    <span className="inline-block bg-amber-100 dark:bg-violet-100 text-amber-800 dark:text-violet-800 px-2 py-1 rounded-full text-xs">
                      {agent['Pricing Model']}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!loading && visibleCount < filteredAgents.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 9)}
              className="self-center mt-8 bg-amber-600 text-white py-2 px-6 rounded-full hover:bg-amber-700 dark:bg-violet-700 dark:hover:bg-violet-800 transition cursor-pointer"
            >
              Load More
            </button>
          )}
        </div>
      </div>

      {/* Modal */}
      {modal.isOpen && modal.agent && (
        <div className="fixed inset-0 bg-white bg-opacity-50 dark:bg-black dark:bg-opacity-30 flex items-center justify-center z-50 p-4">
          <div className="bg-[#FFFBF3] dark:bg-gradient-to-b dark:from-[#120B27] dark:via-orange-950 dark:to-black rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Agent Details</h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 text-2xl"
              >
                ×
              </button>
            </div>
            
            <div className="text-center mb-6">
              <div className="w-24 h-24 mx-auto mb-4 rounded-2xl overflow-hidden bg-gray-200 dark:bg-gray-500">
                {modal.agent['Agent Logo'] ? (
                  <img 
                    src={modal.agent['Agent Logo']} 
                    alt={modal.agent['Agent Name']} 
                    className="w-full h-full object-contain p-1" 
                    onError={(e) => {
                      e.currentTarget.style.display = 'none'
                    }}
                  />

                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-500 text-2xl">
                    AI
                  </div>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                {modal.agent['Agent Name']}
              </h3>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Description</h4>
                <p className="text-gray-600 dark:text-gray-400">{modal.agent.Description}</p>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Category</h4>
                <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm">
                  {modal.agent.Category}
                </span>
              </div>

              <div>
                <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">Pricing Model</h4>
                <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm">
                  {modal.agent['Pricing Model']}
                </span>
              </div>

              <div className="pt-4">
                <button
                  onClick={() => {
                    const url = modal.agent?.['Official Website URL'];
                    if (url) window.open(url, '_blank');
                  }}
                  className="w-full bg-amber-600 hover:bg-amber-700 dark:bg-violet-700 dark:hover:bg-violet-800 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Visit Website
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}



