# Wireframes — Segara Seaside Resort

> ASCII wireframes for the build phase. Apply the Coastal Calm design system (`04-design-system.md`).
> Use these to validate layout & content hierarchy *before* writing Astro components.
> Last updated: 2026-06-20

Legend:
- `█` = image / media block
- `▒` = tinted background (`seafoam-100`, `mist`, or `lagoon` section)
- `[ ]` = button / interactive
- `···` = repeated content omitted

---

# 1. HOMEPAGE — Desktop (≥1024px)

Scroll flow top → bottom. Each `════` is a section boundary.

```
═══════════════════════════════════════════════════════════════════════
SECTION 0 — STICKY HEADER (transparent over hero → mist on scroll)
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│  ◆ SEGARA          Rooms  Dining  Wellness  Experiences   [Book Now▸]│
│  (serif wordmark)               Location  Offers  Blog              │
└─────────────────────────────────────────────────────────────────────┘
   • Logo left (lagoon), nav centre, CTA right (lagoon button)
   • On scroll: header bg → mist, hairline bottom border, logo shrinks

═══════════════════════════════════════════════════════════════════════
SECTION 1 — HERO  (full-bleed background VIDEO, autoplay/muted/loop)
═══════════════════════════════════════════════════════════════════════

▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶   ← <video> element
▶▶▶                                                                   ▶▶▶
▶▶▶     OCEANFRONT RETREAT · NUSA CENINGAN      ← overline            ▶▶▶
▶▶▶                                                                   ▶▶▶
▶▶▶     Relax by the Ocean                                            ▶▶▶
▶▶▶     on Beautiful Nusa Ceningan            ← H1 (Fraunces, white)  ▶▶▶
▶▶▶                                                                   ▶▶▶
▶▶▶     Your dream island escape — beachfront villas,                 ▶▶▶
▶▶▶     cozy bungalows & unforgettable sunsets. ← lead (Inter)        ▶▶▶
▶▶▶                                                                   ▶▶▶
▶▶▶     [  Book Direct & Save  ▸  ]   [ Explore Rooms ]                ▶▶▶
▶▶▶                                                                   ▶▶▶
▶▶▶                          ↓ scroll                                 ▶▶▶
▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶▶

   Hero video specs:
   • Element: <video autoplay muted loop playsinline poster="hero-fallback.jpg">
   • Sources: MP4 (H.264) primary + WebM fallback. Single source fine for MVP.
   • Aspect/size: full viewport height (min 100vh on desktop, 85vh mobile),
     object-fit: cover, object-position centred.
   • File size target: ≤ 4–6 MB (compress aggressively; ~1080p, 24fps, short loop 8–15s).
     Provide a separate smaller file for mobile (≤ 3 MB, 720p) served via media query.
   • Accessibility: MUST respect prefers-reduced-motion → swap video for the
     poster image (static hero) when user has reduced motion enabled.
   • Fallback: poster image shows before video loads / on unsupported browsers.
   • Dark gradient overlay (bottom→transparent, also a touch top-down for
     header legibility) so white text always meets WCAG AA contrast.
   • No sound / controls / pause button — ambient background only.
   • Hero copy left-aligned, vertically centred.

═══════════════════════════════════════════════════════════════════════
SECTION 2 — VALUE PROPS  (white bg, 3-column strip)
═══════════════════════════════════════════════════════════════════════

              THE SEGARA DIFFERENCE            ← overline, centered

   ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
   │   🌅  icon   │    │   🏊  icon   │    │   🍽️  icon   │
   │ Best Sunset  │    │ Infinity Pool│    │ Oceanfront   │
   │ on the Island│    │ with Sea View│    │ Dining       │
   │              │    │              │    │              │
   │ Short body…  │    │ Short body…  │    │ Short body…  │
   └──────────────┘    └──────────────┘    └──────────────┘
   • Hairline-bordered cards, no shadow
   • Icons = thin-line lagoon-600, NOT emoji (replace with SVG set)

═══════════════════════════════════════════════════════════════════════
SECTION 3 — STAY  (rooms teaser, alternating image/text rows)
═══════════════════════════════════════════════════════════════════════

              ACCOMMODATION                       ← overline
              Where You'll Rest                   ← H2 (Fraunces)

┌─────────────────────────────┬───────────────────────────────────────┐
│                             │  NUSA VERANDA SUNSET VILLA            │
│   ████████████████████      │  ← H3                                 │
│   ███  villa photo   ███    │                                       │
│   ████████████████████      │  2-bedroom · private pool · sea view  │
│                            │                                       │
│                            │  Spacious villas with a private pool   │
│                            │  and stunning sunset views. Ideal for │
│                            │  couples, families & small groups.    │
│                            │                                       │
│                            │  From IDR 3,600,300 / night  ← brass  │
│                            │  [ View Villa ▸ ]                      │
└─────────────────────────────┴───────────────────────────────────────┘

┌───────────────────────────────┬─────────────────────────────────────┐
│  BUNGALOW SEA VIEW            │                                     │
│  ← H3                         │      ████████████████████            │
│                              │      ███ bungalow photo ███          │
│  Cozy sea-view bungalows…    │      ████████████████████            │
│                              │                                     │
│  From IDR 2,825,000 / night  │                                     │
│  [ View Bungalow ▸ ]         │                                     │
└───────────────────────────────┴─────────────────────────────────────┘
   • Image-text rows alternate left/right (zig-zag rhythm)
   • "From IDR …" in brass-500, Inter tabular figures
   • CTA ghost button

═══════════════════════════════════════════════════════════════════════
SECTION 4 — DINING  (full-bleed parallax banner + feature)
═══════════════════════════════════════════════════════════════════════

███████████████████████████████████████████████████████████████████████
██  (parallax: steak house / sunset dinner scene)                    ██
██                                                                   ██
██     OCEANFRONT DINING                                             ██
██     Segara Steak House                                            ██
██     Savour sunset dinners & fresh island flavours with            ██
██     breathtaking views of the sea.                                ██
██     [ Discover Dining ▸ ]                                          ██
███████████████████████████████████████████████████████████████████████
   • Dark lagoon overlay, white text
   • One of the most "Instagrammable" sections — lean on the photo

═══════════════════════════════════════════════════════════════════════
SECTION 5 — EXPERIENCES  (mist bg, 3-col card grid)
═══════════════════════════════════════════════════════════════════════
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
▒              EXPERIENCES                                          ▒
▒              Make the Island Yours                                ▒
▒                                                                   ▒
▒   ┌──────────┐    ┌──────────┐    ┌──────────┐                    ▒
▒   │ ███ img  │    │ ███ img  │    │ ███ img  │                    ▒
▒   │ Snorkel  │    │ Blue     │    │ Nusa     │                    ▒
▒   │ & Reef   │    │ Lagoon   │    │ Penida   │                    ▒
▒   │  Tours   │    │ Cliff Jump│   │ Day Trips│                    ▒
▒   └──────────┘    └──────────┘    └──────────┘                    ▒
▒                                                                   ▒
▒              [ Explore Experiences ▸ ]                            ▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
   • Cards: image top, title + short desc, hover = seafoam tint + img zoom

═══════════════════════════════════════════════════════════════════════
SECTION 6 — LOCATION  (split: text + map)
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────┬───────────────────────────────────────────┐
│  THE LOCATION           │                                           │
│  On Song Tepo Beach     │   █████████████████████████████           │
│  ← H2                   │   ███  embedded map  ███                  │
│                         │   █████████████████████████████           │
│  A few steps from the   │                                           │
│  sand, beside the       │   • Song Tepo Beach   ▢ marker            │
│  Yellow Bridge linking  │   • Yellow Bridge     ▢ marker            │
│  Lembongan & Ceningan.  │   • Mushroom Bay      ▢ marker            │
│                         │                                           │
│  [ How to Get Here ▸ ]  │                                           │
└─────────────────────────┴───────────────────────────────────────────┘

═══════════════════════════════════════════════════════════════════════
SECTION 7 — SOCIAL PROOF  (lagoon bg, reviews + ratings)
═══════════════════════════════════════════════════════════════════════
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒   (lagoon-700 bg)
▒              GUESTS SAY                                           ▒   (white text)
▒                                                                   ▒
▒   ★★★★★   ★★★★★   ★★★★★                                        ▒
▒   "Perfect…" "Best sunset…" "Dreamy…"   ← short testimonials      ▒
▒                                                                   ▒
▒   ★ 4.9 / 5  ·  148 reviews  (Google)   ┃  ★ 8.7  (Booking)      ▒
▒              [ Read Reviews ▸ ]                                    ▒
▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒▒
   • AggregateRating — feeds JSON-LD schema for SEO

═══════════════════════════════════════════════════════════════════════
SECTION 8 — INSTAGRAM FEED  (white bg, latest @segaraseaside posts)
═══════════════════════════════════════════════════════════════════════

              FOLLOW THE JOURNEY                 ← overline
              @segaraseaside                     ← H2 (Fraunces) + IG icon

   ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐  ┌──────┐
   │ ████ │  │ ████ │  │ ████ │  │ ████ │  │ ████ │   ← 1:1 tiles, 6–8 visible
   └──────┘  └──────┘  └──────┘  └──────┘  └──────┘      (horiz. scroll on mobile)
   ┌──────┐  ┌──────┐  ┌──────┐
   │ ████ │  │ ████ │  │ ████ │
   └──────┘  └──────┘  └──────┘

                  [  Follow @segaraseaside  ▸  ]   → links to instagram.com/segaraseaside

   Implementation notes:
   • Static build (Astro) → embed Instagram via lightweight approach, NOT the
     heavy official IG script. Options ranked by preference:
       1. Build-time fetch of latest posts (Astro integration / scheduled
          rebuild) → renders as plain <img> grid. Best performance + SEO.
       2. Static curated grid (you pick the tiles) → simplest, zero JS,
          you control exactly what shows. Good for MVP.
       3. Lite embed (e.g. elven-tools / @igor.dvlpr) if live feed required.
   • Tiles link straight to each IG post (open in new tab).
   • Hover: subtle zoom + IG glyph overlay.
   • Mobile: horizontal snap-scroll carousel, partial next tile peeking.
   • Lazy-load all tile images with blur-up placeholder.

═══════════════════════════════════════════════════════════════════════
SECTION 9 — FINAL CTA  (full-bleed image, single conversion focus)
═══════════════════════════════════════════════════════════════════════

███████████████████████████████████████████████████████████████████████
██                                                                   ██
██             Your Island Escape Awaits                             ██
██                                                                   ██
██        Book direct for the best rate & exclusive perks.           ██
██                                                                   ██
██          [  Book Direct & Save  ▸  ]                              ██
██                                                                   ██
███████████████████████████████████████████████████████████████████████

═══════════════════════════════════════════════════════════════════════
FOOTER
═══════════════════════════════════════════════════════════════════════

┌─────────────────────────────────────────────────────────────────────┐
│ ◆ SEGARA           │  Explore        │  Contact                     │
│ Oceanfront boutique│  Rooms          │  Song Tepo Beach,            │
│ resort, Nusa       │  Dining         │  Nusa Ceningan, Bali         │
│ Ceningan           │  Wellness       │  WA +62 812 3766 6330        │
│                    │  Experiences    │  hello@segaraseasideresort…  │
│ [insta][fb][tiktok]│  Blog           │                              │
│                    │  Offers         │  Follow @segaraseaside ▸     │
│ ──────────────────────────────────────────────────────────────────  │
│ © 2026 Segara Seaside Resort  ·  Privacy · Terms                    │
└─────────────────────────────────────────────────────────────────────┘
```

---

# 2. HOMEPAGE — Mobile (<768px)

Single-column stack. Header collapses to hamburger. CTAs remain prominent.

```
┌─────────────────────────┐
│ ◆ SEGARA        ☰  [Book]│  ← hamburger + persistent Book button
└─────────────────────────┘
███████████████████████████
██                        ██
██ OCEANFRONT RETREAT     ██
██                        ██
██ Relax by the Ocean     ██
██ on Beautiful           ██
██ Nusa Ceningan          ██
██                        ██
██ [Book Direct & Save▸]  ██
██ [Explore Rooms]        ██
██                        ██
███████████████████████████

   THE SEGARA DIFFERENCE
   ┌───────────────────┐
   │ 🌅 Best Sunset    │   ← stacked cards
   └───────────────────┘
   ┌───────────────────┐
   │ 🏊 Infinity Pool  │
   └───────────────────┘
   ┌───────────────────┐
   │ 🍽️ Dining         │
   └───────────────────┘

   ACCOMMODATION
   Where You'll Rest
   ┌───────────────────┐
   │ ███ villa photo   │
   │ Sunset Villa      │
   │ From IDR 3,600,300│
   │ [ View Villa ▸ ]  │
   └───────────────────┘
   ┌───────────────────┐
   │ ███ bungalow      │
   │ Bungalow Sea View │
   │ From IDR 2,825,000│
   │ [ View ▸ ]        │
   └───────────────────┘
       ··· (dining, experiences, location, reviews, IG feed, CTA all stack) ···
   • IG feed on mobile → horizontal snap-scroll carousel
┌─────────────────────────┐
│ (footer — stacked)      │
└─────────────────────────┘
```

Mobile-specific rules:
- Hero text smaller via `clamp()`, vertically centred, no horizontal padding on image
- All multi-column grids → single column
- Final CTA button becomes full-width sticky-feel on hero only
- Map embed full-width, fixed height (e.g. 240px)

---

# 3. ROOM DETAIL PAGE (template — applies to all 3 rooms)

URLs: `/rooms/ocean-bungalow` · `/rooms/sunset-villa` · `/rooms/family-room`

```
═══════════════════════════════════════════════════════════════════════
HEADER (same as home, solid mist — not over hero)
═══════════════════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════════════════
BREADCRUMB   Home › Rooms › Nusa Veranda Sunset Villa      (schema)
═══════════════════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════════════════
GALLERY  (large left image + 4 thumb grid right)
═══════════════════════════════════════════════════════════════════════
┌──────────────────────────────┬───────────────────┐
│                              │ ███  ███          │
│       ███ main image ███     │ ███  ███          │
│       (lightbox on click)    │ ███  ███          │
│                              │ ███  ███          │
└──────────────────────────────┴───────────────────┘

═══════════════════════════════════════════════════════════════════════
ROOM HEADER + BOOKING CARD (2-col split)
═══════════════════════════════════════════════════════════════════════
┌─────────────────────────────────┬────────────────────────────────┐
│ OCEAN-VIEW VILLA                │ ┌────────────────────────────┐ │
│ Nusa Veranda Sunset Villa       │ │  From                       │ │
│ ← H1 (Fraunces)                 │ │  IDR 3,600,300 / night  brass│ │
│                                 │ │                            │ │
│ 2-bedroom · Private pool ·      │ │  Check-in   [date]         │ │
│ Ocean view · Sleeps 4           │ │  Check-out  [date]         │ │
│                                 │ │  Guests     [2 ▾]          │ │
│ "Spacious villas with a private │ │                            │ │
│  pool and stunning sunset       │ │  [  Book Direct & Save ▸  ]│ │
│  views…"  ← description body    │ │                            │ │
│                                 │ │  ✓ Best rate guaranteed    │ │
│ AMENITIES                       │ │  ✓ Free cancellation       │ │
│ ✓ AC  ✓ Minibar  ✓ Wi-Fi        │ │  ✓ No booking fees         │ │
│ ✓ Private pool ✓ Sea view       │ │                            │ │
│ ✓ Kettle  ✓ Bathroom w/ bidet   │ │  Questions? WhatsApp ▸     │ │
│                                 │ └────────────────────────────┘ │
└─────────────────────────────────┴────────────────────────────────┘
   • Booking card = STICKY on desktop (follows scroll)
   • On mobile: collapses to a sticky bottom bar "From IDR … · [Book Now]"

═══════════════════════════════════════════════════════════════════════
GALLERY EXTENDED  (full-width strip of detail shots)
═══════════════════════════════════════════════════════════════════════
████   ████   ████   ████   ████   (interior, bathroom, pool, view…)

═══════════════════════════════════════════════════════════════════════
THE SPACE  (long-form description, max 65ch, optional pull quote)
═══════════════════════════════════════════════════════════════════════

═══════════════════════════════════════════════════════════════════════
OTHER ROOMS  (cross-sell, 2 remaining rooms as cards)
═══════════════════════════════════════════════════════════════════════
┌────────────┐    ┌────────────┐
│ ███        │    │ ███        │
│ Bungalow   │    │ Family     │
│ Sea View   │    │ Room       │
│ From IDR … │    │ From IDR … │
└────────────┘    └────────────┘
```

---

# 4. GLOBAL PATTERNS

## 4.1 Persistent "Book Direct & Save" CTA
- Present in: header (right button), hero, final CTA section, every room page booking card, footer
- Same label everywhere → reinforces the direct-booking USP

## 4.2 Section rhythm (vertical)
- Major section padding: `py-20 md:py-32`
- Background alternation: white → mist → white → seafoam → lagoon (for dark sections)
- Each section opens with an overline label → H2 → content

## 4.3 Overline label pattern
```
   ACCOMMODATION                    ← 0.75rem, uppercase, +0.1em, lagoon-600
   Where You'll Rest                ← H2, Fraunces
```

## 4.4 Hover / interaction states
- Cards: `seafoam-100` bg tint + image `scale(1.03)` over 300ms
- Buttons: darken 10% + slight upward translate (no shadow)
- Links: underline appears on hover (brass-500)

## 4.5 Responsive breakpoints
- Mobile: < 768px (single column, hamburger nav)
- Tablet: 768–1023px (2-column grids)
- Desktop: ≥ 1024px (full multi-column, sticky elements)

---

# 5. DECISIONS LOG

- [x] **Hero:** background VIDEO (not image) — see Section 1 specs.
- [x] **No newsletter.** Replaced by Instagram feed (Section 8) — leverages the
      resort's active @segaraseaside posting for fresh content + social proof.
- [x] **Room gallery lightbox:** native HTML `<dialog>` element for zero-JS
      weight (keeps Astro build lean & Core Web Vitals green).
