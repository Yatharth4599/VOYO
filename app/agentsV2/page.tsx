'use client'


import { ThemeProvider } from 'next-themes'
import Navbar from "@/components/landingV2/Navbar"
import Hero from "@/components/agentsV2/Hero"
import Footer from "@/components/landingV2/Footer"


export default function AgentsV2() {
  return (
    <div>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <Navbar />
        <Hero />
        <Footer />
      </ThemeProvider>
      
    </div>
  )
}