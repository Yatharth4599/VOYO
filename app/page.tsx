import { ThemeProvider } from 'next-themes'
import Navbar from "@/components/landingV2/Navbar"
import Hero from "@/components/landingV2/Hero"
import Features from "@/components/landingV2/Features"
import CaseStudies from "@/components/landingV2/CaseStudies"
import Performance from "@/components/landingV2/Performance"
import Working from "@/components/landingV2/Working"
import Footer from "@/components/landingV2/Footer"
import Reviews from "@/components/landingV2/Reviews"

export default function Home() {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div>
        <Navbar />
        <Hero />
        <Working />
        <Features />
        <CaseStudies />
        <Performance />
        <Reviews />
        <Footer />
      </div>
    </ThemeProvider>
  )
}