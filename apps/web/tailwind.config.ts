import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: ["class", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Values live in globals.css so light/dark overrides reach the utilities.
        background: "var(--color-background)",
        surface: "var(--color-surface)",
        border: "var(--color-border)",

        // Text
        "text-primary": "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-tertiary": "var(--color-text-tertiary)",

        // Accent: Technical Blue
        accent: {
          DEFAULT: "var(--color-accent)",
          hover: "var(--color-accent-hover)",
          active: "var(--color-accent-active)",
          subtle: "var(--color-accent-subtle)",
          50: "oklch(0.95 0.02 38)",
          100: "oklch(0.90 0.04 38)",
          200: "oklch(0.80 0.08 38)",
          300: "oklch(0.70 0.12 38)",
          400: "oklch(0.60 0.14 38)",
          500: "oklch(0.52 0.15 38)",
          600: "oklch(0.48 0.16 38)",
          700: "oklch(0.42 0.17 38)",
          800: "oklch(0.35 0.16 38)",
          900: "oklch(0.28 0.14 38)",
        },

        // Status: Success, Warning, Error, Info
        success: {
          DEFAULT: "var(--color-success)",
          light: "var(--color-success-light)",
          dark: "var(--color-success)",
        },
        warning: {
          DEFAULT: "var(--color-warning)",
          light: "var(--color-warning-light)",
          dark: "var(--color-warning)",
        },
        error: {
          DEFAULT: "var(--color-error)",
          light: "var(--color-error-light)",
          dark: "var(--color-error)",
        },
        danger: {
          DEFAULT: "var(--color-error)",
          light: "var(--color-error-light)",
          dark: "var(--color-error)",
        },
        info: {
          DEFAULT: "var(--color-info)",
          light: "var(--color-info)",
          dark: "var(--color-info)",
        },

        // Additional surface variants
        "surface-secondary": "var(--color-surface-secondary)",
        "surface-tertiary": "var(--color-surface-tertiary)",
        "border-strong": "var(--color-border-strong)",
        "accent-fg": "var(--color-accent-fg)",
        "accent-text": "var(--color-accent-text)",
      },

      // Typography
      fontFamily: {
        sans: ["var(--font-sans)"],
        mono: ["var(--font-mono)"],
        serif: ["var(--font-serif)"],
      },

      fontSize: {
        // Display
        "display-1": ["32px", { lineHeight: "1.2", letterSpacing: "-0.5px", fontWeight: "600" }],
        "display-2": ["28px", { lineHeight: "1.2", letterSpacing: "-0.25px", fontWeight: "600" }],

        // Headline
        "headline": ["24px", { lineHeight: "1.3", letterSpacing: "-0.2px", fontWeight: "600" }],
        "subheading": ["18px", { lineHeight: "1.4", letterSpacing: "0px", fontWeight: "600" }],

        // Body
        "body-lg": ["16px", { lineHeight: "1.5", letterSpacing: "0px", fontWeight: "400" }],
        "body": ["14px", { lineHeight: "1.6", letterSpacing: "0px", fontWeight: "400" }],

        // Caption
        "caption": ["12px", { lineHeight: "1.5", letterSpacing: "0.2px", fontWeight: "500" }],
        "mono": ["13px", { lineHeight: "1.4", letterSpacing: "0.1px", fontWeight: "500" }],
      },

      // Spacing (8px base unit)
      spacing: {
        xs: "4px",
        sm: "8px",
        md: "16px",
        lg: "24px",
        xl: "32px",
        "2xl": "48px",
      },

      // Border Radius
      borderRadius: {
        none: "0px",
        sm: "6px",
        md: "12px",
        lg: "20px",
        full: "9999px",
      },

      // Box Shadow (Elevation)
      boxShadow: {
        none: "none",
        sm: "0 1px 3px rgba(0,0,0,0.3)",
        md: "0 4px 12px rgba(0,0,0,0.4)",
        lg: "0 12px 40px -12px rgba(0,0,0,0.7)",

        // Dark mode shadows (1.5x opacity)
        "dark-sm": "0 1px 3px rgba(0,0,0,0.12)",
        "dark-md": "0 4px 8px rgba(0,0,0,0.18)",
        "dark-lg": "0 12px 24px rgba(0,0,0,0.24)",
      },

      // Focus Ring (outline)
      outline: {
        accent: "2px solid oklch(0.52 0.15 38)",
      },

      // Transition
      transitionTimingFunction: {
        "ease-in": "cubic-bezier(0.42, 0, 1, 1)",
        "ease-out": "cubic-bezier(0, 0, 0.58, 1)",
        "ease-out-quart": "cubic-bezier(0.165, 0.84, 0.44, 1)",
        "ease-out-cubic": "cubic-bezier(0.215, 0.61, 0.355, 1)",
        "ease-in-cubic": "cubic-bezier(0.55, 0.055, 0.675, 0.19)",
      },

      transitionDuration: {
        fast: "150ms",
        normal: "300ms",
        slow: "400ms",
      },
    },
  },

  plugins: [
    // Dark mode text colors
    plugin(function ({ addBase, matchUtilities }) {
      addBase({
        ":root": {
          colorScheme: "light",
        },
        ":root:is(.dark)": {
          colorScheme: "dark",
        },
      });

      matchUtilities(
        {
          "text-semantic": (value) => ({
            color: value,
          }),
        },
        {
          values: {
            primary: "oklch(0.15 0.01 0)",
            secondary: "oklch(0.50 0.01 0)",
            tertiary: "oklch(0.72 0.005 0)",
          },
        }
      );
    }),

    // Dark mode overrides
    plugin(function ({ addVariant }) {
      addVariant("dark", [
        "&:is(.dark &)",
        "@media (prefers-color-scheme: dark)",
      ]);
    }),
  ],
};

export default config;
