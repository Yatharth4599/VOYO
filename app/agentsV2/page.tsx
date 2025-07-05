'use client'

import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import Navbar from "@/components/landingV2/Navbar"
import Hero from "@/components/agentsV2/Hero"
import Footer from "@/components/landingV2/Footer"
import LoginForm from "@/components/LoginForm"
import { checkAuthStatus, User } from '@/lib/auth'

export default function AgentsV2() {
  const [user, setUser] = useState<User | null>(null)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    checkAuth()
  }, [])

  const checkAuth = async () => {
    const userData = await checkAuthStatus()
    setUser(userData)
    
    if (!userData) {
      // Start 60 second timer for login prompt
      const timer = setTimeout(() => {
        setShowLoginModal(true)
      }, 60000) // 60 seconds
      
      return () => clearTimeout(timer)
    }
  }

  if (!mounted) return null

  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <Hero />
        <Footer />
        
        {/* Login Modal for unauthenticated users */}
        {showLoginModal && !user && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="text-center mb-4">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Sign in to continue
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Please sign in to access the agents directory and continue browsing.
                </p>
              </div>
              <LoginForm 
                onClose={() => setShowLoginModal(false)} 
                switchToSignup={() => {}} // We can add signup functionality later if needed
              />
            </div>
          </div>
        )}
      </ThemeProvider>
    </div>
  )
}