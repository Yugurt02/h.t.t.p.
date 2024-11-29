/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#222222'
      }
    },
        fontFamily: {
            'clash-display': ['ClashDisplay', 'sans-serif'],
        },
  },
  
  plugins: [],
}