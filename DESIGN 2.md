# Design System — Metranik

Apple Human Interface Guidelines + Technical Engineering Platform

## Color Palette

### Semantic Colors (OKLCH)

**Light Mode:**
- **Background**: `oklch(0.99 0.001 0)` — almost white, tinted to brand warmth
- **Surface**: `oklch(0.96 0.002 0)` — subtle contrast for cards/panels
- **Border**: `oklch(0.92 0.003 0)` — light neutral for structure
- **Text Primary**: `oklch(0.15 0.01 0)` — almost black, slightly warm
- **Text Secondary**: `oklch(0.50 0.01 0)` — mid-gray for captions
- **Text Tertiary**: `oklch(0.72 0.005 0)` — light gray for disabled/hints

**Dark Mode:**
- **Background**: `oklch(0.12 0.01 0)` — deep neutral, professional
- **Surface**: `oklch(0.16 0.012 0)` — subtle lift from background
- **Border**: `oklch(0.25 0.015 0)` — visible but restrained
- **Text Primary**: `oklch(0.98 0.001 0)` — off-white, slightly warm
- **Text Secondary**: `oklch(0.70 0.008 0)` — light gray
- **Text Tertiary**: `oklch(0.48 0.007 0)` — muted for captions

### Accent Color

**Technical Blue** (professional, not trendy):
- Primary: `oklch(0.52 0.15 260)` — saturated, action-focused
- Hover: `oklch(0.48 0.16 260)` — deeper for interaction feedback
- Active: `oklch(0.42 0.17 260)` — darkest state
- Subtle: `oklch(0.88 0.05 260)` — light background tint (light mode)
- Subtle Dark: `oklch(0.20 0.08 260)` — dark mode tint

### Status Colors

- **Success**: `oklch(0.62 0.12 142)` — muted green (not bright lime)
- **Warning**: `oklch(0.68 0.14 60)` — warm amber (not yellow)
- **Error**: `oklch(0.60 0.14 20)` — warm red (not neon)
- **Info**: `oklch(0.58 0.11 250)` — professional blue

## Typography

### Font Stack

```
/* Display/Headlines */
-apple-system, BlinkMacSystemFont, "IBM Plex Sans", "Segoe UI", sans-serif

/* Body/UI */
-apple-system, BlinkMacSystemFont, "IBM Plex Sans", "Segoe UI", sans-serif

/* Monospace (code, formulas, values) */
"IBM Plex Mono", "SF Mono", "Monaco", monospace
```

### Scale (Modular: 1.25 ratio)

| Use | Size | Weight | Line Height | Letter Spacing |
|---|---|---|---|---|
| Display 1 | 32px | 600 (SemiBold) | 1.2 | -0.5px |
| Display 2 | 28px | 600 | 1.2 | -0.25px |
| Headline | 24px | 600 | 1.3 | -0.2px |
| Subheading | 18px | 600 | 1.4 | 0px |
| Body Large | 16px | 400 (Regular) | 1.5 | 0px |
| Body | 14px | 400 | 1.6 | 0px |
| Caption | 12px | 500 (Medium) | 1.5 | 0.2px |
| Mono (values) | 13px | 500 | 1.4 | 0.1px |

### Usage Rules

- Body line length: 60–75 characters (not wider; readability)
- Always use 1.5x+ line height for body text (accessibility)
- Headings: weight contrast, not just size
- Captions: medium weight + reduced color (not light weight; WCAG AAA contrast)

## Spacing System

**Base unit: 8px** (modular 8px grid)

| Token | Value | Use |
|---|---|---|
| xs | 4px | Tight spacing (inline, icon gaps) |
| sm | 8px | Padding inside components, tight margins |
| md | 16px | Default padding, card spacing |
| lg | 24px | Section breaks, between major elements |
| xl | 32px | Large sections, top-level spacing |
| 2xl | 48px | Hero spacing, page margins |

### Component Padding

- **Button**: 10px (vertical) × 16px (horizontal) — tighter than Apple default (professional, compact)
- **Input**: 12px vertical, 16px horizontal — visual balance with buttons
- **Card**: 20px padding, 8px border-radius
- **Section**: 24px padding top/bottom, 32px left/right

## Elevation & Shadows

### Shadow Scale (no blur = light, minimum blur = subtle)

```
Elevation 1: 0 1px 3px rgba(0,0,0,0.08)
Elevation 2: 0 4px 8px rgba(0,0,0,0.12)
Elevation 3: 0 12px 24px rgba(0,0,0,0.16)
```

Dark mode: increase opacity by 1.5x (more visible).

### Border Radius

- Tight (icon, avatar): 4px
- Default (button, input, card): 8px
- Loose (large panels, hero): 12px
- Pill (toggle, badge): 9999px

## Components

### Button

**Primary (action)**
- Background: Accent (oklch Technical Blue)
- Padding: 10px 16px
- Border Radius: 8px
- Font: Body (14px, 600)
- Hover: darker blue
- Disabled: oklch(0.80 0.02 0) (light mode), oklch(0.30 0.01 0) (dark)

**Secondary (alternate)**
- Background: Surface
- Border: 1px solid Border color
- Padding: 10px 16px
- Font: Body, 600
- Hover: slightly darker surface

**Ghost (minimal)**
- Background: transparent
- Color: Text Primary
- Border: None
- Hover: oklch(0.93 0.005 0) background (light), oklch(0.20 0.01 0) (dark)

### Input / Form Field

- Border: 1px solid Border
- Background: Surface
- Padding: 12px 16px
- Border Radius: 8px
- Font: Body, 400
- Focus: 2px solid Accent (ring, not border replacement)
- Label: Caption, 500, Text Secondary above input

### Card

- Background: Surface
- Border: 1px solid Border
- Padding: 20px
- Border Radius: 8px
- Box Shadow: Elevation 1
- Hover: slight background lift (Surface darkened 1% in light, lightened 2% in dark)

### Badge / Label

- Background: Subtle (tinted accent or status)
- Padding: 4px 8px
- Border Radius: 4px
- Font: Caption, 600
- Color: contrast-adjusted for status

## Motion

### Easing

- Entrance: ease-out-cubic (standard reveal)
- Emphasis: ease-out-quart (interaction feedback)
- Exit: ease-in-cubic (exit)

No bounce, no elastic. No animation of layout (width, height, transform X/Y that affects flow).

### Durations

- Fast (micro): 150ms — button feedback, hover
- Normal (standard): 300ms — view transitions, modal
- Slow (entrance): 400ms — page load reveals

### Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Accessibility

- **Color contrast**: WCAG AAA (minimum 7:1 for small text, 4.5:1 for large)
- **Focus indicator**: 2px solid Accent ring, 2px offset
- **Keyboard navigation**: Tab order logical, visible focus always
- **Screen reader**: semantic HTML, ARIA labels where needed
- **Responsive text**: minimum 14px body, 1.5x line height
- **Interactive targets**: minimum 44×44px (touch-friendly)

## Dark Mode

Automatic via `prefers-color-scheme: dark` media query. No manual toggle needed for first release, but `data-theme="dark"` attribute support for future UX toggle.

---

**Design Rationale**

This system follows Apple's restrained, purposeful aesthetic: generous space, clear hierarchy, one or two accent colors, no decoration without function. The warm terracotta/projenik influence is *removed* in favor of professional technical blue (engineering standard) and neutral, accessible base colors. IBM Plex preserves the technical character without the AI-snippet associations of Sora/JetBrains Mono duos.

Every token is accessible first (WCAG AAA), professional second, decorative never.
