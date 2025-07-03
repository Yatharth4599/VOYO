// 'use client';

// import { useEffect, useState } from 'react';
// import { Sun, Moon } from 'lucide-react';

// export default function ThemeToggle() {
//   const [theme, setTheme] = useState<'light' | 'dark'>('light');

//   useEffect(() => {
//     const storedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
//     const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//     const initial = storedTheme ?? (prefersDark ? 'dark' : 'light');
//     setTheme(initial);
//     document.documentElement.classList.toggle('dark', initial === 'dark');
//   }, []);

//   const toggleTheme = () => {
//     const nextTheme = theme === 'dark' ? 'light' : 'dark';
//     setTheme(nextTheme);
//     localStorage.setItem('theme', nextTheme);
//     document.documentElement.classList.toggle('dark', nextTheme === 'dark');
//   };

//   return (
//     <button
//       onClick={toggleTheme}
//       className="text-gray-800 dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 p-2 rounded-full transition"
//       aria-label="Toggle Theme"
//     >
//       {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
//     </button>
//   );
// }


'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // This is essential to avoid hydration mismatch on first render
  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  // Determine current theme - prefer user choice, fallback to system
  const currentTheme = theme === 'system' ? systemTheme : theme

  return (
    <button
      aria-label="Toggle Dark Mode"
      onClick={() => setTheme(currentTheme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200 transition cursor-pointer"
    >
      {currentTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  )
}
