/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ivypresto: ["ivypresto", "helveticaneue"],
        helveticaneue: ["helveticaneue", "sans-serif"],
        deregular: ["degular-display", "helveticaneue"],
      },
    },
  },
  plugins: [],
};
