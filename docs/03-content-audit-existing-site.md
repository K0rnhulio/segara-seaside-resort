# Content Audit — Existing Website (segaraseasideresort.com)

> Captured from the live site on 2026-06-20 to seed the new Astro build with real copy, structure, and assets.
> Status: **Home + Rooms pages are live and readable.** Several inner pages (`/dining/`, `/bungalow/`, `/villa/`, `/contact/`) currently resolve to a CRM login screen — they appear misconfigured and serve no resort content. This is itself a reason to rebuild cleanly.

---

## 1. Brand & SEO identity (as-is)

| Field | Current value |
|---|---|
| **Domain** | segaraseasideresort.com (also www.) |
| **Platform** | WordPress 6.8.2 + Zante theme + WPBakery + Slider Revolution |
| **Booking plugin** | Eagle Booking (already integrated) |
| **Title tag** | `Luxurious Nusa Ceningan | Segara Seaside Resort` |
| **Meta description** | "Segara Seaside Resort on Nusa Ceningan Island. Enjoy beachfront villas, cozy bungalows, stunning ocean views, and unforgettable island experiences. Book your perfect getaway today!" |
| **Tagline** | "Relax by the Ocean on Beautiful Nusa Ceningan" |
| **OG image** | `wp-content/uploads/2024/12/Segara-Seaside-Resort-09092024_145249.jpg` (1920×1080) |
| **Favicon/logo** | `cropped-NusaCeninganSegaraLogoIcon` |
| **Lang** | en-US |

**SEO gaps to fix in the rebuild:**
- Title is generic ("Luxurious Nusa Ceningan") — should lead with the brand + a primary keyword.
- Meta description is okay but long; tighten + add "Book direct & save".
- No visible JSON-LD `Hotel`/`LodgingBusiness` schema.
- `viewport` caps zoom (`maximum-scale=1`) — accessibility/UX regression; remove in new build.
- Multiple render-blocking CSS files (heavy plugin stack) — Astro eliminates this.

---

## 2. Homepage content (verbatim usable copy)

### Hero
> **Welcome to Segara Seaside Resort**
> *Relax by the Ocean on Beautiful Nusa Ceningan*
>
> Rotating slogans: BEST SUNSET VIEW · ENJOY THE OCEAN · GREAT OCEANFRONT DINING IN NUSA CENINGAN

### Intro block
> **Welcome to Segara Seaside Resort**
> Your Dream Island Retreat Awaits on Nusa Ceningan Island
>
> Nestled next to Bali, Segara Seaside Resort offers an unparalleled escape to paradise. Surrounded by stunning ocean views, vibrant sunsets, and serene island vibes, our resort is the ideal destination for your next unforgettable getaway.

### Services / amenities (3 cards)
1. **Oceanfront Dining at Segara Seaside Resort**
   "Whether you're starting your day with a hearty breakfast, enjoying a sunset dinner, or savoring a late-night treat, every meal is an unforgettable experience with breathtaking views of the sea."

2. **Bungalows and Villas with Stunning Views**
   "Choose from luxurious 2-bedroom villas with private pools or cozy sea-view bungalows. Each is designed for ultimate relaxation and offers modern amenities for your perfect island retreat."

3. **Infinity Pool with Ocean Views**
   "Lounge by the infinity pool as it seamlessly blends into the horizon. Relax with a cocktail in hand and soak in panoramic views of the ocean, perfect for sunsets and unforgettable memories."

### Rooms preview (with rates shown on home)
| Room | From (as shown) |
|---|---|
| Bungalow Sea View | IDR 2,825,000 / night |
| Villa (2-bedroom) | IDR 3,600,300 / night |

### Discover Nusa Ceningan (intro to location section)
> Nusa Ceningan is a hidden gem in the Indonesian archipelago, offering breathtaking natural beauty, vibrant marine life, and unforgettable island charm. From sun-soaked beaches to thrilling cliffside adventures, these are the must-visit spots on Nusa Ceningan.

---

## 3. Rooms page content (verbatim)

The site currently lists **three room types** — confirms our earlier research:

### Bungalow
> "Nusa Ceningan Island Bungalow: Nestled in a quiet setting, our compact bungalows offer a perfect balance of simplicity and modern amenities. Ideal for couples or solo travelers seeking a relaxing and memorable island stay."
> Image: `Nusa-Ceningan-Bungalow-9.jpg`

### Villa (2-Bedroom)
> "2-Bedroom Villa with Private Pool & Sea Views: Relax in our spacious 2-bedroom villas, complete with a private pool and stunning sea views. Ideal for couples, families, or small groups, these villas offer modern comfort and a serene island escape."
> Image: `Nusa-Ceningan-Villa-23.jpg`

### Bungalow Sea View
> "Sea-View Bungalow: Enjoy breathtaking sea views from our cozy bungalows, designed for relaxation and comfort. Perfect for romantic getaways or solo travelers, these bungalows provide the ultimate peaceful retreat."
> Image: `Nusa-Ceningan-Bungalow-Sea-View-5.jpg`

> ⚠️ The individual room detail pages (`/bungalow/`, `/villa/`, `/bungalow-sea-view/`) are **broken** — they currently render a CRM login screen, not room content. The new build will give each room its own proper, SEO-rich page (per the sitemap).

---

## 4. Reusable image asset URLs (from current site)

These can be referenced or migrated to the new build:

| Asset | URL |
|---|---|
| OG hero image (1920×1080) | `…/wp-content/uploads/2024/12/Segara-Seaside-Resort-09092024_145249.jpg` |
| Logo icon | `…/wp-content/uploads/2024/12/cropped-NusaCeninganSegaraLogoIcon.png` |
| Bungalow Sea View | `…/wp-content/uploads/2018/07/Nusa-Ceningan-Bungalow-Sea-View-5.jpg` |
| Bungalow (garden) | `…/wp-content/uploads/2024/12/Nusa-Ceningan-Bungalow-9.jpg` |
| Villa | `…/wp-content/uploads/2020/05/Nusa-Ceningan-Villa-23.jpg` |

> TODO (client): provide high-res, professionally shot replacements for hero + each room + dining + pool + wellness. The 2018/2020 uploads are dated and small (720×470).

---

## 5. Key facts confirmed from the live site

- **Location:** Nusa Ceningan Island, next to Bali
- **Beach:** Song Tepo Beach (a few steps)
- **3 room types:** Bungalow · Bungalow Sea View · 2-Bedroom Villa (private pool)
- **Signature features:** best sunset view · oceanfront dining · infinity pool
- **Pricing (as displayed):** Bungalow Sea View from IDR 2,825,000/night · Villa from IDR 3,600,300/night
- **Booking system already exists:** Eagle Booking plugin (WordPress) — we can either migrate bookings to a new engine or embed

---

## 6. Content gaps the new site must fill

| Gap | New page/section |
|---|---|
| Dining has no real page (broken) | `/dining` — Segara Steak House, breakfast, sunset dinner |
| No wellness content | `/wellness` — infinity pool, sauna & cold plunge |
| No experiences/activities | `/experiences` — snorkeling, Blue Lagoon, day trips |
| No location/getting-here guide | `/location` + `/getting-here` — Song Tepo, Yellow Bridge, Sanur fast boat |
| No offers/packages | `/offers` — honeymoon, stay-longer, seasonal |
| No reviews/social proof | Reviews section + `AggregateRating` schema |
| No blog/topical authority | `/blog` — 4 launch articles (per sitemap) |
| No structured data | `Hotel` / `LodgingBusiness` / `Restaurant` / `FAQPage` JSON-LD |
| Poor mobile UX (zoom locked, heavy) | Modern responsive, fast, accessible Astro build |

---

## 7. Recommendations

1. **Migrate the Eagle Booking integration** into the new site (it already handles availability/pricing) OR pick a modern engine — confirm with client.
2. **301 redirect** all old URLs (`/bungalow/`, `/villa/`, `/rooms/`, `/dining/`, `/contact/`) to the new clean slugs from the sitemap to preserve any existing rankings.
3. **Keep the domain** `segaraseasideresort.com` — it has history and the favicon/logo assets.
4. **Request a full content/asset pack** from the resort: real room amenities lists, dining menu, wellness price list, activity partners, exact address + coordinates for schema.
