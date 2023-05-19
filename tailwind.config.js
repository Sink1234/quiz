/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '2xl': {'max': '1535px'},

  
        'xl': {'max': '1279px'},

  
        'lg': {'max': '1023px'},

  
        'md': {'max': '767px'},

  
        'sm': {'max': '639px'},

      },
      colors:{
        'green': 'rgba(24, 160, 50, 1)',
        'green0': 'rgba(24, 160, 50, 0)',
      }
    },
  },
  plugins: [],
}