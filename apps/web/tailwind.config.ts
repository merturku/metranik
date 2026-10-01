import type { Config } from "tailwindcss";

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
        // Semantic: Light mode base
        background: "oklch(0.99 0.001 0)",
        surface: "oklch(0.96 0.002 0)",
        border: "oklch(0.92 0.003 0)",

        // Text
        "text-primary": "oklch(0.15 0.01 0)",
        "text-secondary": "oklch(0.50 0.01 0)",
        "text-tertiary": "oklch(0.72 0.005 0)",

        // Accent: Technical Blue
        accent: {
          DEFAULT: "oklch(0.52 0.15 260)",
          hover: "oklch(0.48 0.16 260)",
          active: "oklch(0.42 0.17 260)",
          subtle: "oklch(0.88 0.05 260)",
          50: "oklch(0.95 0.02 260)",
          100: "oklch(0.90 0.04 260)",
          200: "oklch(0.80 0.08 260)",
          300: "oklch(0.70 0.12 260)",
          400: "oklch(0.60 0.14 260)",
          500: "oklch(0.52 0.15 260)",
          600: "oklch(0.48 0.16 260)",
          700: "oklch(0.42 0.17 260)",
          800: "oklch(0.35 0.16 260)",
          900: "oklch(0.28 0.14 260)",
        },

        // Status: Success, Warning, Error, Info
        success: {
          DEFAULT: "oklch(0.62 0.12 142)",
          light: "oklch(0.85 0.05 142)",
          dark: "oklch(0.45 0.14 142)",
        },
        warning: {
          DEFAULT: "oklch(0.68 0.14 60)",
          light: "oklch(0.90 0.06 60)",
          dark: "oklch(0.50 0.16 60)",
        },
        error: {
          DEFAULT: "oklch(0.60 0.14 20)",
          light: "oklch(0.85 0.06 20)",
          dark: "oklch(0.45 0.16 20)",
        },
        danger: {
          DEFAULT: "oklch(0.60 0.14 20)",
          light: "oklch(0.85 0.06 20)",
          dark: "oklch(0.45 0.16 20)",
        },
        info: {
          DEFAULT: "oklch(0.58 0.11 250)",
          light: "oklch(0.88 0.04 250)",
          dark: "oklch(0.40 0.13 250)",
        },

        // Additional surface variants
        "surface-secondary": "oklch(0.93 0.003 0)",
        "border-strong": "oklch(0.85 0.005 0)",
        "accent-fg": "oklch(0.98 0.001 0)",
      },

      // Dark mode overrides
      darkMode: ["class"],

      // Typography
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"IBM Plex Sans"',
          '"Segoe UI"',
          "sans-serif",
        ],
        mono: [
          '"IBM Plex Mono"',
          '"SF Mono"',
          '"Monaco"',
          "monospace",
        ],
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
        sm: "4px",
        md: "8px",
        lg: "12px",
        full: "9999px",
      },

      // Box Shadow (Elevation)
      boxShadow: {
        none: "none",
        sm: "0 1px 3px rgba(0,0,0,0.08)",
        md: "0 4px 8px rgba(0,0,0,0.12)",
        lg: "0 12px 24px rgba(0,0,0,0.16)",

        // Dark mode shadows (1.5x opacity)
        "dark-sm": "0 1px 3px rgba(0,0,0,0.12)",
        "dark-md": "0 4px 8px rgba(0,0,0,0.18)",
        "dark-lg": "0 12px 24px rgba(0,0,0,0.24)",
      },

      // Focus Ring (outline)
      outline: {
        accent: "2px solid oklch(0.52 0.15 260)",
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
    function ({ addBase, matchUtilities, theme }) {
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
    },

    // Dark mode overrides
    function ({ addVariant, e }) {
      addVariant("dark", [
        "&:is(.dark &)",
        "@media (prefers-color-scheme: dark)",
      ]);
    },
  ],
};

export default config;
