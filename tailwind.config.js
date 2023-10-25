/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["app/**/*.{ts,tsx}", "components/**/*.{ts,tsx}"],
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
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    ({ addComponents, theme }) => {
      const lg = theme("screens.lg", {})
      const xl = theme("screens.xl", {})
      addComponents({
        ".gutter": {
          paddingLeft: theme("spacing.6"),
          paddingRight: theme("spacing.6"),
          [`@media (min-width: ${lg})`]: {
            paddingLeft: theme("spacing.12"),
            paddingRight: theme("spacing.12"),
          },
          [`@media (min-width: ${xl})`]: {
            paddingLeft: theme("spacing.24"),
            paddingRight: theme("spacing.24"),
          },
        },
        ".section": {
          marginTop: theme("spacing.7"),
          marginBottom: theme("spacing.7"),
          [`@media (min-width: ${lg})`]: {
            marginTop: theme("spacing.14"),
            marginBottom: theme("spacing.14"),
          },
          [`@media (min-width: ${xl})`]: {
            marginTop: theme("spacing.28"),
            marginBottom: theme("spacing.28"),
          },
        },
        ".section-top": {
          marginTop: theme("spacing.7"),
          [`@media (min-width: ${lg})`]: {
            marginTop: theme("spacing.14"),
          },
          [`@media (min-width: ${xl})`]: {
            marginTop: theme("spacing.28"),
          },
        },
        ".section-bottom": {
          marginBottom: theme("spacing.7"),
          [`@media (min-width: ${lg})`]: {
            marginBottom: theme("spacing.14"),
          },
          [`@media (min-width: ${xl})`]: {
            marginBottom: theme("spacing.28"),
          },
        },
        ".section-padding": {
          paddingTop: theme("spacing.7"),
          paddingBottom: theme("spacing.7"),
          [`@media (min-width: ${lg})`]: {
            paddingTop: theme("spacing.14"),
            paddingBottom: theme("spacing.14"),
          },
          [`@media (min-width: ${xl})`]: {
            paddingTop: theme("spacing.28"),
            paddingBottom: theme("spacing.28"),
          },
        },
        ".section-padding-top": {
          paddingTop: theme("spacing.7"),
          [`@media (min-width: ${lg})`]: {
            paddingTop: theme("spacing.14"),
          },
          [`@media (min-width: ${xl})`]: {
            paddingTop: theme("spacing.28"),
          },
        },
        ".section-padding-bottom": {
          paddingBottom: theme("spacing.7"),
          [`@media (min-width: ${lg})`]: {
            paddingBottom: theme("spacing.14"),
          },
          [`@media (min-width: ${xl})`]: {
            paddingBottom: theme("spacing.28"),
          },
        },
      })
    },
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
}
