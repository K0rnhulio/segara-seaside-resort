# Segara Seaside Resort — Design System

> Locked direction: **B. Coastal Calm** — minimal, editorial, design-forward boutique.
> This document is the single source of truth for every visual decision in the build.
> Last updated: 2026-06-20

---

## 1. Design philosophy

**"Coastal Calm"** — a serene, editorial, gallery-like aesthetic that lets the resort's photography do the talking. The opposite of the saturated, busy tropical-resort cliché. Think Aman, Soho House, or a high-end travel magazine.

### Core principles
1. **Photography is the hero.** UI gets out of the way — generous full-bleed imagery, restrained type, minimal chrome.
2. **Calm, unhurried rhythm.** Lots of whitespace, generous line-height, slow reveals. The site should *feel* like a holiday.
3. **Restrained colour.** A near-monochrome base with one cool primary (lagoon teal) and a single warm metallic accent (brass). Colour is an accent, never a wash.
4. **Editorial typography.** A modern characterful serif for headings, a neutral geometric sans for everything else. Strong hierarchy via size + weight, not decoration.
5. **Quiet confidence.** No gradients-on-everything, no shadows-everywhere, no animated flair. Subtle, considered details.

---

## 2. Colour palette

### Primary
| Token | Hex | Role |
|---|---|---|
| `lagoon-700` | `#0F3D47` | Darkest — footer, deep backgrounds, heading text on light |
| `lagoon-600` | `#1E5F6B` | **Primary** — buttons, links, section accents, nav active |
| `lagoon-500` | `#2B7A87` | Hover/active states, secondary UI |

### Soft / surface
| Token | Hex | Role |
|---|---|---|
| `seafoam-200` | `#C9DEDA` | Tinted backgrounds, cards on white, dividers |
| `seafoam-100` | `#E8F1EF` | Subtle section backgrounds, hover fills |
| `mist` | `#F7F9F8` | Default page background |
| `paper` | `#FFFFFF` | Cards, modals, inputs |

### Neutral / text
| Token | Hex | Role |
|---|---|---|
| `ink` | `#1A2A2D` | Primary body text (slightly cool-tinted, never pure black) |
| `slate` | `#5A6B6E` | Secondary text, captions, meta |
| `mist-text` | `#8FA0A3` | Tertiary / placeholder |
| `line` | `#E2E8E7` | Hairline borders, dividers |

### Accent (use sparingly)
| Token | Hex | Role |
|---|---|---|
| `brass-600` | `#9A6E45` | Metallic accent — small details, hover highlights, price emphasis |
| `brass-500` | `#A8845C` | Primary brass tone |
| `coral` | `#D87158` | Reserved — *only* for urgent/error states or a single hero accent if needed |

### Semantic
| Token | Hex | Role |
|---|---|---|
| `success` | `#3E7D5A` | Confirmations |
| `warning` | `#B8862F` | Notices |
| `danger` | `#B5524A` | Errors |

> **Rule of thumb:** 70% neutrals, 25% lagoon teal, 5% brass. Coral only as a last resort.

---

## 3. Typography

### Type pairing
- **Headings:** `Fraunces` (Google Fonts) — modern serif with optical sizing and character. Use for H1–H4.
- **Body & UI:** `Inter` (Google Fonts) — neutral, geometric, exceptionally legible at small sizes.

### Type scale (fluid, clamp-based for responsive)

| Element | Desktop | Mobile | Weight | Family |
|---|---|---|---|---|
| H1 (hero) | `clamp(2.75rem, 5vw, 4.5rem)` | ↓ auto | 400 (Fraunces) | Fraunces |
| H2 (section) | `clamp(2rem, 3.5vw, 3rem)` | ↓ auto | 400 | Fraunces |
| H3 | `clamp(1.5rem, 2vw, 1.875rem)` | ↓ auto | 500 | Fraunces |
| H4 | `1.25rem` | `1.125rem` | 500 | Fraunces |
| Body (lead) | `1.25rem` | `1.125rem` | 400 | Inter |
| Body | `1rem` (16px) | `1rem` | 400 | Inter |
| Small / meta | `0.875rem` | `0.875rem` | 400 | Inter |
| Caption / overline | `0.75rem` | `0.75rem` | 500, uppercase, +0.1em letter-spacing | Inter |

### Typography rules
- **Line-height:** 1.15 for headings, 1.6 for body, 1.4 for UI.
- **Max measure:** body copy capped at `65ch` for readability.
- **Letter-spacing:** Fraunces headings get a slight `-0.02em` tighten at large sizes.
- **No text in all-caps except overlines/captions.**
- **Numbers** (prices, stats) — use `Inter` tabular figures.

---

## 4. Spacing & layout

### Spacing scale (Tailwind base, rem)
`0 · 1 (0.25) · 2 (0.5) · 3 · 4 (1) · 6 (1.5) · 8 (2) · 12 (3) · 16 (4) · 20 (5) · 24 (6) · 32 (8)`

### Container
- **Max width:** `1280px` (content), `1600px` (full-bleed imagery)
- **Gutters:** `1.5rem` mobile → `2rem` tablet → `4rem` desktop
- **Vertical rhythm:** section padding `py-20 md:py-32` between major sections

### Grid
- **12-column** on desktop, collapses to single column on mobile
- **Card grids:** 1 col mobile → 2 col tablet → 3 col desktop

---

## 5. Imagery & art direction

This is the most important asset class for Coastal Calm.

### Treatment
- **Photography style:** natural light, muted tones, editorial framing. Avoid over-saturated HDR.
- **Hero = background video** (autoplay, muted, loop, playsinline) with a static
  poster image fallback. Dark gradient overlay for text legibility. MUST respect
  `prefers-reduced-motion` → swap to poster image. Target ≤ 4–6 MB desktop /
  ≤ 3 MB mobile (720p). See wireframes §1.
- **Aspect ratios (standardised):**
  - Hero video: full viewport height (`min-height: 100vh` desktop / `85vh` mobile)
  - Room/feature card: `4:3` or `3:2`
  - Gallery tile: `1:1` or `4:5` (portrait)
  - Wide feature: `3:1` (parallax banner)
- **Subtle treatment:** light desaturation + warm-cool balance to match palette. Avoid heavy filters.
- **Alt text:** descriptive + keyword-rich (every image is an SEO asset per the keyword doc).

### Requirements from client
- [ ] 1 hero (ocean/sunset, 1920×1080+ minimum, ideally 2560px wide)
- [ ] 4–6 photos per room type
- [ ] Dining (Steak House dishes, sunset dinner scene, breakfast)
- [ ] Wellness (infinity pool, sauna, cold plunge)
- [ ] Experiences (snorkeling, cliff jumping, beach)
- [ ] Aerial/drone shot of the property if available

---

## 6. Components & UI patterns

### Buttons
```
Primary   → lagoon-600 bg, white text, 0.5rem radius, subtle hover lift
Secondary → transparent bg, 1px lagoon border, lagoon text
Ghost     → text only, underline-on-hover, brass colour
CTA bar   → lagoon-600, slightly larger, used for "Book Direct & Save"
```
- **Radius:** `0.375rem–0.5rem` (soft but not pill — editorial, not playful)
- **No drop shadows** on buttons; rely on colour + spacing for hierarchy.

### Cards
- White `paper` background, `1px line` border (no shadow), `0.75rem` radius
- Image top, content padded `1.5rem`
- Hover: subtle `seafoam-100` background tint + image zoom (1.03) within frame

### Navigation
- **Sticky header**, transparent over hero → solid `mist` with hairline border on scroll
- Logo left, nav centre/right, "Book Direct" button right (always visible)
- Mobile: hamburger → full-screen overlay nav, large type, calm slide-in

### Sections / dividers
- Hairline `line` borders, never heavy rules
- Overline labels (`0.75rem uppercase lagoon-600`) introduce each section editorial-style

### Forms
- Underlined or `1px line` bordered inputs (no boxed fields), generous padding
- Focus state: `lagoon-600` border + subtle `seafoam-100` fill

### Motion
- **Slow and subtle.** Fade-up reveals on scroll (200–400ms ease-out), image lazy-loads with blur-up.
- No parallax abuse, no autoplay carousels. Hero can have a very slow Ken Burns zoom (optional).
- Respect `prefers-reduced-motion`.

---

## 7. Accessibility

- Colour contrast: all text meets **WCAG AA** (4.5:1 body, 3:1 large).
- Focus visible states on every interactive element.
- `aria-label`s on icon-only buttons.
- Semantic HTML (`<header>`, `<nav>`, `<main>`, `<section>`, `<footer>`).
- No zoom-locking (`maximum-scale` removed — fixing the old site's mistake).

---

## 8. Tailwind config (reference for build)

```js
// tailwind.config.js (excerpt)
colors: {
  lagoon:  { 500: '#2B7A87', 600: '#1E5F6B', 700: '#0F3D47' },
  seafoam: { 100: '#E8F1EF', 200: '#C9DEDA' },
  mist:    '#F7F9F8',
  paper:   '#FFFFFF',
  ink:     '#1A2A2D',
  slate:   '#5A6B6E',
  line:    '#E2E8E7',
  brass:   { 500: '#A8845C', 600: '#9A6E45' },
  coral:   '#D87158',
},
fontFamily: {
  serif: ['Fraunces', 'serif'],
  sans:  ['Inter', 'sans-serif'],
},
borderRadius: { DEFAULT: '0.375rem', lg: '0.5rem' },
```

---

## 9. Mood / reference (for client alignment)

Visual references in the spirit of Coastal Calm (not to copy, to align taste):
- **Aman Resorts** — restraint, material warmth, photography-led
- **Soho House** — editorial typography, muted palette
- **Cereal Magazine / Kinfolk Travel** — whitespace, calm pacing
- **Six Senses** — wellness-forward, natural textures

---

## 10. Open items before build

- [ ] Client confirms palette + type pairing (this doc locks it unless flagged)
- [ ] Client provides hi-res photo assets (see §5 checklist)
- [ ] Confirm logo file — current is a PNG icon; prefer SVG with the lagoon colour applied
