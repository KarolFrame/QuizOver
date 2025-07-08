/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--color-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        info: "var(--color-info)",
        white: "var(--color-white)",
        background: "var(--color-background)",
      },
    },
  },
  plugins: [],
};
