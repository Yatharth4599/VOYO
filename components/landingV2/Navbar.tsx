// 'use client'

// import { useState, useEffect } from 'react'
// import { useTheme } from 'next-themes'
// import Logo from '@/components/landingV2/Logo'
// import { Menu, X } from 'lucide-react'
// import ThemeToggle from './ThemeToggle'

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false)
//   const { resolvedTheme, setTheme } = useTheme()
//   const [mounted, setMounted] = useState(false)

//   useEffect(() => {
//     setMounted(true)
//   }, [])

//   if (!mounted) return null

//   return (
//     <header className="top-0 left-0 w-full bg-[#f5f1e8] dark:bg-black z-50 border-b border-gray-200 dark:border-gray-700">
//       <div className="flex items-center py-4 px-6 lg:px-16 max-w-7xl mx-auto">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           {/* <Image src="/logo-voyo-removebg-preview.png" alt="voyo logo" width={120} height={120} className="block dark:hidden" />
//           <Image src="/Voyo Black Logo.png" alt="voyo logo" width={120} height={120} className="hidden dark:block" /> */}
//           <Logo />
//         </div>

//         {/* Desktop Nav */}
//         <div className="flex justify-between items-center w-full">
//           {/* Left: Nav links */}
//           <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-800 dark:text-purple-200">
//             <a href="#" className="hover:text-black dark:hover:text-white transition">Features</a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">Docs</a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">Pricing</a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">Blog</a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">Community</a>
//           </nav>

//           {/* Right: Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <ThemeToggle />
//             <button className="text-gray-800 dark:text-purple-200 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//               Sign In
//             </button>
//             <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
//               Get Started
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex gap-3">
//           <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
//             Get Started
//           </button>
//           <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle Menu" className="text-gray-800 dark:text-white">
//             {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {mobileOpen && (
//         <div className="md:hidden bg-[#f5f1e8] dark:bg-black border-t border-gray-200 dark:border-gray-700">
//           <nav className="flex flex-col space-y-4 py-4 px-6 font-medium text-gray-800 dark:text-white">
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Features</a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Docs</a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Pricing</a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Blog</a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Community</a>
//           </nav>
//         </div>
//       )}
//     </header>
//   )
// }


// "use client";

// import { useState, useEffect } from "react";
// import { useTheme } from "next-themes";
// import Logo from "@/components/landingV2/Logo";
// import { Menu, X } from "lucide-react";
// import ThemeToggle from "./ThemeToggle";

// export default function Navbar() {
//   const [mobileOpen, setMobileOpen] = useState(false);
//   const { resolvedTheme, setTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   if (!mounted) return null; // hold rendering until client mount to avoid hydration mismatch

//   return (
//     <header className="top-0 left-0 w-full bg-[#f5f1e8] dark:bg-black z-50 border-b border-gray-200 dark:border-gray-700">
//       <div className="flex items-center py-4 px-6 lg:px-16 max-w-7xl mx-auto">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <Logo />
//         </div>

//         {/* Desktop Nav */}
//         <div className="flex justify-between items-center w-full">
//           {/* Left: Nav links */}
//           <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-800 dark:text-purple-200">
//             <a href="#" className="hover:text-black dark:hover:text-white transition">
//               Features
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">
//               Docs
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">
//               Pricing
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">
//               Blog
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-white transition">
//               Community
//             </a>
//           </nav>

//           {/* Right: Buttons */}
//           <div className="hidden md:flex items-center space-x-4">
//             <ThemeToggle />
//             <button className="text-gray-800 dark:text-purple-200 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
//               Sign In
//             </button>
//             <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
//               Get Started
//             </button>
//           </div>
//         </div>

//         {/* Mobile Menu Button */}
//         <div className="md:hidden flex gap-3">
//           <button className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:opacity-90 transition cursor-pointer">
//             Get Started
//           </button>
//           <button
//             onClick={() => setMobileOpen(!mobileOpen)}
//             aria-label="Toggle Menu"
//             className="text-gray-800 dark:text-white"
//           >
//             {mobileOpen ? <X size={24} /> : <Menu size={24} />}
//           </button>
//         </div>
//       </div>

//       {/* Mobile Nav */}
//       {mobileOpen && (
//         <div className="md:hidden bg-[#f5f1e8] dark:bg-black border-t border-gray-200 dark:border-gray-700">
//           <nav className="flex flex-col space-y-4 py-4 px-6 font-medium text-gray-800 dark:text-white">
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">
//               Features
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">
//               Docs
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">
//               Pricing
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">
//               Blog
//             </a>
//             <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">
//               Community
//             </a>
//           </nav>
//         </div>
//       )}
//     </header>
//   );
// }


'use client'

import { useState, useEffect } from 'react'
import Logo from '@/components/landingV2/Logo'
import { Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <header className="top-0 left-0 w-full bg-[#f5f1e8] dark:bg-black z-50 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center py-4 px-6 lg:px-16 max-w-7xl mx-auto">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Logo />
        </div>

        {/* Desktop Nav */}
        <div className="flex justify-between items-center w-full">
          <nav className="hidden md:flex items-center space-x-8 font-medium text-gray-800 dark:text-purple-200">
            <a href="#" className="hover:text-black dark:hover:text-white transition">Features</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition">Docs</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition">Pricing</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition">Blog</a>
            <a href="#" className="hover:text-black dark:hover:text-white transition">Community</a>
          </nav>

          {/* Right: Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            <button className="text-gray-800 dark:text-purple-200 text-sm font-semibold px-4 py-2 rounded hover:bg-gray-100 dark:hover:bg-gray-800 transition">
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
            <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Blog</a>
            <a href="#" className="hover:text-black dark:hover:text-gray-400 transition">Community</a>
          </nav>
        </div>
      )}
    </header>
  )
}
