/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  safelist: [
    {
      pattern: /grid-cols-./,
    },
  ],
  theme: {
    extend: {},
    screens: {
      small: "544px",
      med: "768px",
      big: "1011px",
    },
  },
  plugins: [],
};
