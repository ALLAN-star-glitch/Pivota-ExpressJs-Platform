import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Teal-inspired color palette
        pivotaTeal: "#008080", // Main teal
        pivotaAqua: "#7FDBFF", // Soft Aqua for highlights/secondary elements
        pivotaGold: "#FFD700", // Gold for accenting important buttons and calls-to-action
        pivotaNavy: "#1D1E31", // Navy Blue for darker background elements, footer, etc.
        pivotaLightGray: "#F5F5F5", // Light Gray background or sections
        pivotaWhite: "#FFFFFF", // For text and clean backgrounds
        pivotaPurple: "#6A4CFF", // Purple for accents or secondary highlights
        pivotaCoral: "#FF6F61", // Coral as an alternative highlight for interactive elements
      },
    },
  },
  plugins: [],
} satisfies Config;
