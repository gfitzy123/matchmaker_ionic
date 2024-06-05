// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,jsx,ts,tsx,css}"],
  theme: {
    extend: {
      fontSize: {
        xs: ".75rem", // 12px
        sm: ".875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "32px", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        "6xl": "60px", // 64px
        // Custom font sizes
        tiny: "0.625rem", // 10px
        huge: "5rem", // 80px
      },
    },
    colors: {
      primary: "var(--ion-color-primary)",
      "bg-primary": "var(--bg-primary)",
      secondary: "rgb(var(--ion-color-primary-rgb))",
      background: "var(--ion-background-color)",
      text: "var(--ion-text-color)",
      secondaryBtn: "var(--ion-color-secondary-btn)",
      primaryBtn: "var(--ion-color-primary-btn)",
      "women-svg": "var(--women-svg)",
      "men-svg": "var(--men-svg)",
      customTextGray: "rgba(221, 221, 221, 1)",
      toggleOne: "var(--toggle-btn-color-one)",
      toggleTwo: "var(--toggle-btn-color-two)",
      listHover: "var(--list-hover-color)",
      hoverColor: "var(--hover-text-color)",
      borderColor: "rgb(var(--border-color))",
      itemBackground: "var(--item-background-color)",
      closeButton: "var(--ion-close-button)",
      "pausebutton": "rgb(var(--ion-color-primary-rgb))",
      dark:"var(--dark-grey-background-color)",
      light:"var(--ion-color-secondary-contrast)",
      textSecondary: "var(--ion-text-color-secondary)",
      dangerText: "var(--ion-danger-color)",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
