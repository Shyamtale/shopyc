/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#fdf2e9',
          100: '#fae5d3',
          200: '#f4cba6',
          300: '#edb179',
          400: '#e7974c',
          500: '#e67e22',
          600: '#cf711f',
          700: '#b3611b',
          800: '#964f19',
          900: '#7a3e15',
        }
      }
    },
  },
  plugins: [],
}
