/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // This is critical for dark mode toggle to work
  content: [
    './app/**/*.{js,ts,jsx,tsx}',   // adjust this based on your folder structure (app dir or pages dir)
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}
