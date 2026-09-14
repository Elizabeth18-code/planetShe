/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Playfair Display"', "Georgia", "serif"],
        paper: ["Newsreader", "Georgia", "serif"],
      },
      colors: {
        paper: {
          50: "#fdfcfa",
          100: "#faf7f2",
          200: "#ebe3d6",
          300: "#d4c9b8",
          ink: "#1a1a1a",
        },
      },
    },
  },
  plugins: [],
}
