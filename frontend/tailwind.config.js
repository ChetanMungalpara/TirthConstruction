/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./client/src/**/*.{js,jsx,ts,tsx}",
    "./dashboard/src/**/*.{js,jsx,ts,tsx}",
    "./dashboard.html",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#303030ff',
        'primary-light': '#f0f0f0ff',
        'accent-brand': '#909090ff',
        'accent-secondary': '#b9b9b9ff',
      },
      fontFamily: {
        heading: ['Montserrat', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
