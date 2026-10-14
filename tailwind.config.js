/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        creator: {
          dark: '#090D16',
          card: '#111827',
          border: '#1F2937',
          primary: '#6366F1', // Indigo electric
          accent: '#10B981',  // Emerald for money/deals
          danger: '#EF4444',
          gold: '#F59E0B'
        }
      }
    },
  },
  plugins: [],
}
