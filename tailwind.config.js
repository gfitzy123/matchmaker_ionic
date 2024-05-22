// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,jsx,ts,tsx,css}"],
  darkMode: "media",
  theme: {
    extend: {},
    colors: {
      primary: "var(--bg-primary-button)",
      "bg-primary": "var(--bg-primary)",
      secondary: "var(--color-secondary)",
      background: "var(--background)",
      text: "var(--text)",
      "primary-text-button": "var(--primary-text-button)",
      border: "var(--border)",
      line: "var(--line)",
      "women-svg": "var(--women-svg)",
      "men-svg": "var(--men-svg)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
