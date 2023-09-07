/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#f3f4f6",
        primary: "#43010c",
        secondary: "#f57600",
        dimmed_white: "rgba(255,255,255,.9)",
      },
    },
  },
  plugins: [],
};
