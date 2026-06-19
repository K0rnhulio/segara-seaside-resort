# Segara Seaside Resort — Website

Oceanfront boutique resort website for Segara Seaside Resort, Nusa Ceningan, Bali.
Built with **Astro + Tailwind CSS** using the **Coastal Calm** design system.

---

## Quick start

```bash
npm install      # install dependencies (first time only)
npm run dev      # start dev server → http://localhost:4321
npm run build    # production build → ./dist
npm run preview  # preview the production build locally
```

**Requires Node 18+** (built on Node 24).

---

## Project structure

```
Segara/
├── docs/                       # ← planning & design source of truth
│   ├── 01-keyword-research.md
│   ├── 02-sitemap.md
│   ├── 03-content-audit-existing-site.md
│   ├── 04-design-system.md
│   └── 05-wireframes.md
├── public/                     # static assets served as-is
│   ├── images/                 # placeholder SVGs (replace with real photos)
│   ├── video/                  # ← drop hero.mp4 here
│   ├── favicon.svg
│   ├── og-default.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── SEO.astro           # <head> manager: title, meta, OG, JSON-LD
│   │   ├── Header.astro        # sticky nav, transparent-over-hero, mobile menu
│   │   └── Footer.astro
│   ├── data/
│   │   └── site.ts             # ← single source of truth: rooms, rates, contact
│   ├── layouts/
│   │   └── Base.astro          # page shell wrapping every route
│   ├── pages/
│   │   └── index.astro         # homepage (9 sections per wireframe)
│   └── styles/
│       └── global.css          # Coastal Calm tokens + base/components layers
├── astro.config.mjs
├── tailwind.config.mjs         # design tokens (colours, fonts, radii)
├── tsconfig.json
└── package.json
```

---

## Design system — "Coastal Calm"

Defined in `docs/04-design-system.md` and encoded in `tailwind.config.mjs`:

| Token | Hex | Use |
|---|---|---|
| `lagoon-600` | `#1E5F6B` | Primary — buttons, links, nav |
| `lagoon-700` | `#0F3D47` | Footer, deep backgrounds |
| `mist` | `#F7F9F8` | Page background |
| `paper` | `#FFFFFF` | Cards |
| `ink` | `#1A2A2D` | Body text |
| `brass-500` | `#A8845C` | Accent (prices, highlights) |

- **Headings:** Fraunces (serif) · **Body:** Inter (sans)
- Fonts loaded via Google Fonts CDN. For production, self-host with `@fontsource/*`.

---

## Editing content

Most copy lives in **`src/data/site.ts`** — update rooms, rates, contact details,
value props, experiences, reviews, and Instagram tiles there. Components read from
this file, so changes propagate everywhere automatically.

---

## TODO before launch

- [ ] Replace placeholder SVGs in `public/images/` with real photography
- [ ] Add `public/video/hero.mp4` (≤ 4–6 MB desktop, ≤ 3 MB mobile)
- [ ] Provide a real logo SVG (replace the ◆ wordmark)
- [ ] Wire `/book` to a real booking engine or WhatsApp form
- [ ] Build remaining pages: `/rooms/*`, `/dining`, `/wellness`, `/experiences`,
      `/location`, `/getting-here`, `/offers`, `/blog`, `/contact`
- [ ] Embed a real Google Map in the Location section
- [ ] Replace static Instagram grid with build-time fetch (optional)
- [ ] Submit `sitemap-index.xml` to Google Search Console
