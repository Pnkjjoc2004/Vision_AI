/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGray: "#e6eaf1",
        customDarkGray: "#282828",
        customLightGray: "#e2e6eb",
      },
      borderRadius: {
        custom: "50px",
        custom2: "4px",
      },
    },
  },
  plugins: [],
};
