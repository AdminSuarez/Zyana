/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Zyana cosmic theme colors
        cosmic: {
          black: '#000000',
          purple: '#6366f1',
          gold: '#fbbf24',
          silver: '#e5e7eb',
        }
      },
      fontFamily: {
        cosmic: ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
