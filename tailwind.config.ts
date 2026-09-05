import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        anton: ["var(--font-anton)", "sans-serif"],
        serif: ["var(--font-sans)", "sans-serif"],
        mono: ["var(--font-sans)", "sans-serif"],
      },
      colors: {
        primary: "var(--bg-primary)",
        main: "var(--text-main)",
        highlight: "var(--text-highlight)",
        accent: "var(--accent-button)",
        mutedUI: "var(--ui-muted)",
      },
    },
  },
  plugins: [],
};

export default config;
