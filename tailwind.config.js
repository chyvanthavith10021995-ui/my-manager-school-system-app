/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f4ff',
          100: '#e0e9fe',
          200: '#bae0fd',
          300: '#7cc5fb',
          400: '#36a7f7',
          500: '#0c87eb',
          600: '#0069ca',
          700: '#0154a3',
          800: '#064786',
          900: '#0b3c6f',
          950: '#082649',
        },
        emerald: {
          50: '#ecfdf5',
          500: '#10b981',
          600: '#059669',
        },
        amber: {
          50: '#fffbeb',
          500: '#f59e0b',
          600: '#d97706',
        },
        rose: {
          50: '#fff1f2',
          500: '#f43f5e',
          600: '#e11d48',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.08)',
        'glass-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
    },
  },
  plugins: [],
}
