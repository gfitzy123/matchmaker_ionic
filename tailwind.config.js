// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,jsx,ts,tsx,css}"],
  darkMode: "media",
  theme: {
    extend: {},
    colors: {
      primary: "var(--ion-color-primary)",
      "bg-primary": "var(--bg-primary)",
      secondary: "var(ion-color-primary-rgb)",
      background: "var(--ion-background-color)",
      text: "var(--ion-text-color)",
      "primary-text-button": "var(--primary-text-button)",
      border: "var(--border)",
      line: "var(--line)",
      "women-svg": "var(--women-svg)",
      "men-svg": "var(--men-svg)",
      "customTextGray": 'rgba(221, 221, 221, 1)',
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
