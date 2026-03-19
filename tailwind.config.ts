import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Keep a single font family across the app for consistency.
        display: ["'DM Sans'", "system-ui", "sans-serif"],
        body: ["'DM Sans'", "system-ui", "sans-serif"],
        mono: ["'DM Sans'", "system-ui", "sans-serif"],
      },
      colors: {
        // Near-black with cool blue undertone
        slate: {
          DEFAULT: "#0E1117",
          50:  "#F0F2F7",
          100: "#DDE2EE",
          200: "#BCC4D8",
          300: "#8F9BB8",
          400: "#626F8C",
          500: "#3E4A63",
          600: "#2A3348",
          700: "#1A2030",
          800: "#121720",
          900: "#0E1117",
        },
        // Ice blue accent
        ice: {
          DEFAULT: "#7EB8D4",
          light: "#B8D8EA",
          muted: "#4A8FAA",
          pale:  "#E8F3F9",
        },
        // Cool surface tones
        frost: "#F2F5FA",
        mist:  "#E4EAF4",
      },
      animation: {
        "scan-line":  "scanLine 2s ease-in-out infinite",
        "fade-up":    "fadeUp 0.5s ease-out forwards",
        "fade-up-delay": "fadeUp 0.5s ease-out 0.1s forwards",
        shimmer:      "shimmer 2s linear infinite",
      },
      keyframes: {
        scanLine: {
          "0%":   { top: "0%",    opacity: "1"   },
          "50%":  {               opacity: "0.5" },
          "100%": { top: "100%",  opacity: "1"   },
        },
        fadeUp: {
          "0%":   { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)"    },
        },
        shimmer: {
          "0%":   { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition:  "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;

