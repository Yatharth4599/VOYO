'use client'

import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="top-0 left-0 w-full bg-black z-50 border-b border-gray-200">
        <div className="flex items-center py-4 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Image src="/Voyo Black Logo.png" alt="n8n logo" width={120} height={120} />
        </div>


        {/* Desktop Nav */}
        <div className="flex justify-between items-center w-full">
          {/* Left: All purple nav links */}
          <nav className="hidden md:flex items-center space-x-8 font-medium text-purple-200">
            <a href="#" className="hover:text-white transition">Features</a>
            <a href="#" className="hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-white transition">Blog</a>
            <a href="#" className="hover:text-white transition">Community</a>
          </nav>

          {/* Right: Buttons grouped together with a little space */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="bg-orange text-purple-200 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-800 transition">
              Sign In
            </button>
            <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
              Get Started
            </button>

          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-3">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
              Get Started
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Menu" className="text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-black border-t border-gray-200">
          <nav className="flex flex-col space-y-4 py-4 px-6 font-medium text-white">
            <a href="#" className="hover:text-gray-400 transition">Features</a>
            <a href="#" className="hover:text-gray-400  transition">Docs</a>
            <a href="#" className="hover:text-gray-400 transition">Pricing</a>
            <a href="#" className="hover:text-gray-400 transition">Blog</a>
            <a href="#" className="hover:text-gray-400 transition">Community</a>
          </nav>
        </div>
      )}

    </header>
  )
}
