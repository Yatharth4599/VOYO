'use client'

import { useState, useEffect } from 'react'
import Logo from '@/components/landingV2/Logo'
import { Menu, X, ChevronDown } from 'lucide-react'
import ThemeToggle from './ThemeToggle'
import SignupForm from '../SignupForm'
import LoginForm from '../LoginForm'
// import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [showModal, setShowModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [user, setUser] = useState<{name: string, email: string} | null>(null);

  // Check for stored JWT token and user info
  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    const userData = localStorage.getItem('userData');
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showUserDropdown && !target.closest('.user-dropdown-container')) {
        setShowUserDropdown(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserDropdown])

  const openModal = () => setShowModal(true);

  const openLoginModal = () => {
    setShowLoginModal(true);
    setShowModal(false);
  };

  const openSignupModal = () => {
    setShowModal(true);
    setShowLoginModal(false);
  };

  const handleLoginClose = () => {
    setShowLoginModal(false);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('userData');
    setUser(null);
    window.location.href = '/';
  }

  if (!mounted) return null

  return (
    <header className="top-0 left-0 w-full bg-[#f5f1e8] dark:bg-black z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center py-4 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/" className="cursor-pointer">
            <Logo />
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="flex justify-between items-center w-full">
          <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-800 dark:text-purple-200">
            <a href="#" className="hover:text-black dark:hover:text-white transition">Features</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition">Pricing</a>
            <Link href="/agentsV2" className="hover:text-black dark:hover:text-white transition">Marketplace</Link>
            <a href="#" className="hover:text-black dark:hover:text-white transition">Community</a>
          </nav>

          {/* Right: Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <div className="relative user-dropdown-container">
                <button 
                  onClick={() => setShowUserDropdown(!showUserDropdown)}
                  className="flex items-center space-x-2 text-gray-800 dark:text-purple-200 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition cursor-pointer"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                    {user.name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <ChevronDown size={16} />
                </button>
                
                {showUserDropdown && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="font-semibold text-gray-900 dark:text-white">{user.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{user.email}</p>
                    </div>
                    <div className="p-2">
                      <Link 
                        href="/dashboard"
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded transition cursor-pointer"
                      >
                        Dashboard
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition cursor-pointer"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <>
                <button onClick={openLoginModal} className="text-gray-800 dark:text-purple-200 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-300 dark:hover:bg-gray-800 transition cursor-pointer">
                  Sign In
                </button>
                <button onClick={openModal} className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
                  Get Started
                </button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex gap-3">
          <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
            Get Started
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Menu" className="text-gray-800 dark:text-white">
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileOpen && (
        <div className="md:hidden bg-[#f5f1e8] dark:bg-black border-t border-gray-200 dark:border-gray-700">
          <nav className="flex flex-col space-y-4 py-4 px-6 font-medium text-gray-800 dark:text-white">
            <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Features</a>
            <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Docs</a>
            <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Pricing</a>
            <Link href="/agentsV2" className="hover:text-black dark:hover:text-gray-400 transition">Marketplace</Link>
            <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Community</a>
          </nav>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-start pt-12 pb-12 overflow-y-auto z-50">
          <div
            className="modern-card p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <SignupForm 
              onClose={() => setShowModal(false)} 
              switchToLogin={openLoginModal}
            />
          </div>
        </div>
      )}

      {showLoginModal && (
        <div className="fixed inset-0 bg-white bg-opacity-60 flex justify-center items-center z-50">
          <div
            className="modern-card p-8 max-w-md w-full mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <LoginForm 
              onClose={handleLoginClose} 
              switchToSignup={openSignupModal}
            />
          </div>
        </div>
      )}
    </header>
  )
}
