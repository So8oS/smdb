/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        Lobster: ["Lobster", "cursive"],
        Roboto: ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
};
