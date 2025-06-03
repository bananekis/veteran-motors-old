import type { Config } from "tailwindcss"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
        // Vintage/Art Deco colors
        cream: "rgba(var(--cream))",
        "cream-darker": "rgba(var(--cream-darker))",
        "brown-light": "rgb(var(--brown-light))",
        brown: "rgb(var(--brown))",
        "brown-dark": "rgb(var(--brown-dark))",
        gold: "rgb(var(--gold))",
        "gold-light": "rgb(var(--gold-light))",
        // Neon colors
        "neon-purple": "hsl(var(--neon-purple))",
        "neon-pink": "hsl(var(--neon-pink))",
        "neon-blue": "hsl(var(--neon-blue))",
        "neon-teal": "hsl(var(--neon-teal))",
        "spark-orange": "hsl(var(--spark-orange))",
        "deep-indigo": "hsl(var(--deep-indigo))",

        // NFS/Racing colors
        "nfs-blue": "rgb(0, 191, 255)", // Electric cyan blue
        "nfs-cyan": "rgb(0, 255, 255)", // Bright cyan
        "nfs-neon": "rgb(57, 255, 20)", // Electric green
        "nfs-orange": "rgb(255, 140, 0)", // Bright orange
        "nfs-yellow": "rgb(255, 215, 0)", // Electric yellow
        "nfs-red": "rgb(255, 20, 147)", // Hot pink/magenta
        "nfs-purple": "rgb(138, 43, 226)", // Deep electric purple
        "nfs-pink": "rgb(255, 20, 147)", // Hot pink/magenta
        "racing-black": "rgb(10, 10, 20)", // Deep dark purple-black
        "racing-white": "rgb(240, 240, 255)", // Slightly blue-tinted white
        "racing-dark": "rgb(20, 15, 35)", // Dark purple

        // Cyberpunk colors
        "cyber-purple": "rgb(138, 43, 226)", // Main purple
        "cyber-magenta": "rgb(255, 20, 147)", // Hot magenta/pink
        "cyber-cyan": "rgb(0, 255, 255)", // Electric cyan
        "cyber-blue": "rgb(0, 191, 255)", // Electric blue
        "cyber-violet": "rgb(75, 0, 130)", // Deep violet
        "cyber-flame": "rgb(255, 140, 0)", // Orange flame color
      },
      fontFamily: {
        marcellus: ["Marcellus", "serif"],
        montserrat: ["Montserrat", "sans-serif"],
        "racing-sans": ["Montserrat", "sans-serif"], // Reusing Montserrat for racing-sans
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        // NFS animations
        "speed-line": {
          "0%": { transform: "translateX(-100%) skewX(-15deg)", opacity: "0.7" },
          "100%": { transform: "translateX(300%) skewX(-15deg)", opacity: "0" },
        },
        "cyber-text-glow": {
          "0%": { textShadow: "0 0 8px rgba(0, 255, 255, 0.7)" },
          "100%": {
            textShadow:
              "0 0 15px rgba(0, 255, 255, 0.9), 0 0 30px rgba(138, 43, 226, 0.7), 0 0 45px rgba(255, 20, 147, 0.5)",
          },
        },
        "neon-pulse": {
          "0%, 100%": { textShadow: "0 0 5px rgba(0, 255, 255, 0.7)" },
          "50%": {
            textShadow:
              "0 0 15px rgba(0, 255, 255, 0.9), 0 0 20px rgba(138, 43, 226, 0.7), 0 0 25px rgba(255, 20, 147, 0.5)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        // NFS animations
        "speed-line": "speed-line 0.8s ease-out infinite",
        "cyber-text-glow": "cyber-text-glow 2s infinite alternate",
        "neon-pulse": "neon-pulse 2s infinite",
      },
      boxShadow: {
        "cyber-glow":
          "0 0 15px rgba(0, 255, 255, 0.5), 0 0 30px rgba(138, 43, 226, 0.3), 0 0 45px rgba(255, 20, 147, 0.2)",
        glow: "0 0 15px rgba(0, 255, 255, 0.5), 0 0 30px rgba(138, 43, 226, 0.3)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

export default config
