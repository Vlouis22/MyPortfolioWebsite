import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}", "./content/**/*.{md,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "var(--bg)",
        elevated: "var(--bg-elevated)",
        fg: "var(--fg)",
        muted: "var(--fg-muted)",
        border: "var(--border)",
        accent: "var(--accent)",
        "accent-soft": "var(--accent-soft)",
      },
      boxShadow: {
        card: "var(--shadow-card)",
      },
      borderRadius: {
        button: "8px",
        card: "12px",
        image: "16px",
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        serif: ["var(--font-fraunces)"],
        mono: ["var(--font-jetbrains)"],
      },
      maxWidth: {
        layout: "1200px",
        prose: "72ch",
      },
    },
  },
  plugins: [],
};

export default config;
