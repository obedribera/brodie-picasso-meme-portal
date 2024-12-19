import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#8B5CF6", // Vivid Purple
          foreground: "#1A1F2C", // Dark background instead of white
        },
        secondary: {
          DEFAULT: "#1EAEDB", // Bright Blue
          foreground: "#1A1F2C", // Dark background instead of white
        },
        accent: {
          DEFAULT: "#1A1F2C", // Dark Purple
          foreground: "#8B5CF6", // Light purple instead of white
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "#1A1F2C", // Dark background instead of white
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "#9b87f5", // Light purple instead of white
        },
      },
      keyframes: {
        "bounce-slow": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      animation: {
        "bounce-slow": "bounce-slow 3s infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;