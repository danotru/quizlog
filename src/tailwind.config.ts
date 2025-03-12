import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    { pattern: /bg-./ },
    { pattern: /ring-./ },
    { pattern: /border-./ },
  ],
  theme: {
    extend: {
      fontFamily: {
        body: "var(--font-outfit)",
      },
      colors: {
        primary: {
          300: "#FFFFFF",
          400: "#F4F3F7",
          500: "#E1DEE9",
          600: "#D2CEDE",
          700: "#BCB6CE",
        },
        secondary: {
          300: "#3D3D3D",
          400: "#333333",
          500: "#262626",
          600: "#1F1F1F",
          700: "#141414",
        },
        accent: {
          300: "#FFA585",
          400: "#FF875C",
          500: "#FF6B35",
          600: "#FF4B0A",
          700: "#E03C00",
        },
        error: {
          300: "#FE9D89",
          400: "#FD786B",
          500: "#FC3B3B",
          600: "#D82B3A",
          700: "#B51D38",
        },
        success: {
          300: "#A2FCAE",
          400: "#8AFAA4",
          500: "#64F895",
          600: "#49D585",
          700: "#32B276",
        },
        warning: {
          300: "#FFE385",
          400: "#FFD767",
          500: "#FFC535",
          600: "#DBA226",
          700: "#B7811A",
        },
        info: {
          300: "#8DD0F9",
          400: "#70BBF4",
          500: "#429BED",
          600: "#3079CB",
          700: "#215AAA",
        },
      },
    },
  },
  plugins: [require("tailwindcss-3d")],
} satisfies Config;
