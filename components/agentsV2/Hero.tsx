'use client'

import { useState, useEffect } from 'react'

export default function Hero() {
  const [sort, setSort] = useState('popularity')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedSubcategory, setSelectedSubcategory] = useState('')
  const [selectedType, setSelectedType] = useState('All Types')
  const [visibleCount, setVisibleCount] = useState(4)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    setAnimate(true) // trigger animation on mount
  }, [])

  const cards = [
    { id: 1, title: 'AI Vector Store', category: 'AI', subcategory: 'vector stores', type: 'Core Nodes', createdAt: '2024-01-01', popularity: 100 },
    { id: 2, title: 'Email Trigger', category: 'Communication', subcategory: '', type: 'Trigger', createdAt: '2024-03-15', popularity: 300 },
    { id: 3, title: 'Finance Tool', category: 'Finance & Accounting', subcategory: '', type: 'Regular', createdAt: '2023-12-10', popularity: 150 },
    { id: 4, title: 'AI LLM', category: 'AI', subcategory: 'language models', type: 'Regular', createdAt: '2024-02-20', popularity: 400 },
    { id: 5, title: 'Marketing App', category: 'Marketing', subcategory: '', type: 'Core Nodes', createdAt: '2024-04-01', popularity: 50 },
    { id: 6, title: 'Analytics Dashboard', category: 'Analytics', subcategory: '', type: 'Regular', createdAt: '2023-11-05', popularity: 200 },
    { id: 7, title: 'Cybersecurity Monitor', category: 'Cybersecurity', subcategory: '', type: 'Trigger', createdAt: '2024-01-25', popularity: 180 },
  ]

  let filteredCards = cards
    .filter(card => {
      if (selectedCategory !== 'all' && card.category !== selectedCategory) return false
      if (selectedSubcategory && card.subcategory !== selectedSubcategory) return false
      if (selectedType !== 'All Types' && card.type !== selectedType) return false
      return true
    })
    .sort((a, b) => {
      if (sort === 'popularity') return b.popularity - a.popularity
      if (sort === 'name') return a.title.localeCompare(b.title)
      if (sort === 'oldest') return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      return 0
    })

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
          Best App & Software Integrations
        </h1>
        <p
          className={
            "text-lg mt-4 " +
            (animate ? "slide-up-fade-in" : "opacity-0")
          }
          style={{ animationDelay: '0.2s' }}
        >
          Optimize your workflows with these top software integrations.
          Seamlessly move and transform data between different apps with <br /> n8n
        </p>
      </div>

      <div className="ml-30 mt-10">
        <h1 className="bg-gradient-to-r from-amber-600 to-red-950 dark:from-gray-200 dark:to-violet-800 bg-clip-text text-transparent text-[40px] font-bold mb-5">
          Connect anything to everything
        </h1>

        {/* Search + Types */}
        <div className="flex justify-between items-center">
          <input
            type="text"
            placeholder="Search for workflows, nodes, tasks..."
            className="border border-gray-200 w-[500px] p-2 rounded-lg outline-none backdrop-saturate-50 hover:border-purple-500"
          />

          <div className="flex gap-x-2 mr-30 border border-gray-300 rounded-xl p-1">
            {['All Types', 'Regular', 'Trigger', 'Core Nodes'].map((type) => (
              <div
                key={type}
                onClick={() => setSelectedType(selectedType === type ? 'All Types' : type)}
                className={
                  "py-2 px-3 rounded-xl cursor-pointer " +
                  (selectedType === type
                    ? "border bg-amber-500 dark:bg-black dark:border-violet-600"
                    : "") +
                  " hover:border hover:bg-amber-400 dark:hover:bg-black dark:text-purple-200"
                }
              >
                {type}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-10 ml-30 mr-30 flex justify-between items-start gap-8">
        {/* Sidebar */}
        <div className="w-60 sticky top-0 h-screen overflow-y-auto pr-4 border-r border-gray-300 dark:border-gray-700">
          <h2 className="font-bold mb-4 text-xl">Categories</h2>
          <form className="flex flex-col gap-2 text-sm">
            <label className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
              <input
                type="checkbox"
                checked={selectedCategory === 'all'}
                onChange={() => {
                  setSelectedSubcategory('')
                  setSelectedCategory('all')
                }}
                className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-amber-600 checked:border-amber-600 dark:checked:bg-violet-600 dark:checked:border-violet-600"
              />
              All categories
            </label>

            <details>
              <summary className="cursor-pointer hover:text-amber-600 dark:hover:text-violet-600 transition font-medium flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedCategory === 'AI'}
                  onChange={() => {
                    setSelectedSubcategory('')
                    setSelectedCategory(selectedCategory === 'AI' ? 'all' : 'AI')
                  }}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-amber-600 checked:border-amber-600 dark:checked:bg-violet-600 dark:checked:border-violet-600"
                />
                AI
              </summary>
              <div className="ml-6 mt-2 flex flex-col gap-1">
                {['vector stores', 'tools', 'chains', 'embeddings', 'rerankers', 'language models'].map((sub) => (
                  <label key={sub} className="flex items-center gap-2 cursor-pointer dark:hover:text-violet-600 hover:text-amber-600 transition">
                    <input
                      type="checkbox"
                      checked={selectedSubcategory === sub}
                      onChange={() => {
                        setSelectedCategory('AI')
                        setSelectedSubcategory(selectedSubcategory === sub ? '' : sub)
                      }}
                      className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-amber-600 checked:border-amber-600 dark:checked:bg-violet-600 dark:checked:border-violet-600"
                    />
                    {sub}
                  </label>
                ))}
              </div>
            </details>

            {['Analytics', 'Communication', 'Cybersecurity', 'Data & Storage', 'Developer Tools', 'Developement',
              'Finance & Accounting', 'HITL', 'Marketing', 'Miscellaneous', 'Productivity', 'Sales', 'Utility'].map((cat) => (
              <label key={cat} className="flex items-center gap-2 cursor-pointer hover:text-amber-600 transition">
                <input
                  type="checkbox"
                  checked={selectedCategory === cat}
                  onChange={() => {
                    setSelectedSubcategory('')
                    setSelectedCategory(selectedCategory === cat ? 'all' : cat)
                  }}
                  className="appearance-none w-4 h-4 rounded-full border border-gray-400 checked:bg-amber-600 checked:border-amber-600 dark:checked:bg-violet-600 dark:checked:border-violet-600"
                />
                {cat}
              </label>
            ))}
          </form>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col gap-10">
          <div className="flex items-center justify-between">
            <h2 className="font-bold text-xl whitespace-nowrap">{filteredCards.length} Integrations</h2>
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
                <option value="popularity">Popularity</option>
                <option value="name">Name</option>
                <option value="oldest">Oldest</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredCards.slice(0, visibleCount).map((card) => (
              <div key={card.id} className="flex flex-col border border-gray-200 rounded-2xl p-4 dark:border-gray-700">
                <div className="self-center bg-gray-200 dark:bg-gray-500 h-20 w-20 rounded-2xl" />
                <h1 className="mt-5 text-xl font-bold self-center">{card.title}</h1>
                <p className="text-center mt-3">Category: {card.category} | Type: {card.type}</p>
              </div>
            ))}
          </div>
          {visibleCount < filteredCards.length && (
            <button
              onClick={() => setVisibleCount((prev) => prev + 6)}
              className="self-center mt-8 bg-amber-600 text-white py-2 px-6 rounded-full hover:bg-amber-700 dark:bg-violet-700 dark:hover:bg-violet-800 transition cursor-pointer"
            >
              Load More
            </button>
          )}
        </div>
      </div>
    </section>
  )
}
