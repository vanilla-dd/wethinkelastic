/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ivypresto: ["ivypresto", "serif"],
        helveticaneue: ["helveticaneue", "sans-serif"],
      },
    },
  },
  plugins: [],
};
