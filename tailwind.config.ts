import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "var(--ink)",
        paper: "var(--paper)",
        "paper-light": "var(--paper-light)",
        brandRed: "var(--red)",
        brandBlue: "var(--blue)",
        brandAmber: "var(--amber)",
        brandGreen: "var(--green)",
        aboutAccent: "var(--about-accent)",
      },
      fontFamily: {
        display: "var(--display)",
        sans: "var(--font-sans)",
        mono: "var(--mono)",
        hand: "var(--hand)",
      },
    },
  },
  plugins: [],
};
export default config;
