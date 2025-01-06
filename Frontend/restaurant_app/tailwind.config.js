/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'primary-color' : '#f97316',
        'color-cream' : '#fff6ed',
        'color-darkGreen' : '#093d2f',
        'color-yellow' : '#ffca44',
        'color-lightGreen': "#ebe4da"
      }
    },
  },
  plugins: [],
}