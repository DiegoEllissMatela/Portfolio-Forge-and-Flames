/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "pitch-black": "#080808",
        "surface": "#0e0e0e",
        "fire": "#E63946",
        "burnt": "#F4A261",
        "midnight": "#1D3557"
      }
    },
  },
  plugins: [],
}
