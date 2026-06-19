# Segara Seaside Resort — Site Map

> Structure derived directly from the keyword research (`01-keyword-research.md`).
> Each page targets a defined intent and primary keyword. Designed for SEO + clean UX.
> Last updated: 2026-06-20

---

## 1. Architecture principles

1. **Shallow hierarchy** — every page ≤2 clicks from home (better for users + crawlers).
2. **One page, one intent** — no competing pages for the same keyword (prevents cannibalisation).
3. **Conversion path on every page** — sticky "Book direct & save" CTA in header + footer.
4. **Mobile-first** — primary navigation collapses to a clean hamburger; booking CTA always visible.
5. **Topical authority via blog** — Nusa Ceningan/Lembongan guides feed the location + rooms pages with internal links.

---

## 2. Primary navigation (header)

```
Home | Rooms | Dining | Wellness | Experiences | Location | Offers | Blog | [Book Direct]
```

`Book Direct` is a persistent, high-contrast button — present on every page.

---

## 3. Full site map

### Tier 1 — Core pages

```
🏠 Home                              /
   Hero: ocean/sunset, primary CTA
   • Value props (beachfront, sunset, boutique, pet-friendly)
   • Featured rooms teaser
   • Signature experiences teaser
   • Reviews/social proof
   • Location snapshot (map + getting here)
   • Newsletter / direct-booking incentive

🛏️ Rooms (overview)                 /rooms
   • All room types with quick facts
   • Links to individual room pages
   • "Compare" quick-glance table
   • Direct booking CTA

   📄 Bungalow with Ocean View       /rooms/ocean-bungalow
       Primary kw: beach bungalow Nusa Lembongan
   📄 Nusa Veranda Sunset Villa       /rooms/sunset-villa
       Primary kw: Nusa Veranda Sunset Villa
   📄 Family / Pet-Friendly Room      /rooms/family-room
       Primary kw: pet friendly resort Bali

🍽️ Dining                           /dining
   • Segara Steak House feature
   • Poolside bar & snack bar
   • In-room breakfast / special diet menus
   • Sunset dinner experience CTA
   • Menu highlights + gallery

🧖 Wellness                         /wellness
   • Infinity pool
   • Sauna & cold plunge
   • Wellness / massage partnerships
   • Retreat packages (links to Offers)

🏄 Experiences                      /experiences
   • Snorkeling, cliff jumping (Blue Lagoon), mangrove tour
   • Nusa Penida day trips (Manta Point, Crystal Bay)
   • Sunset cruises / island hopping
   • Bookable via partner CTAs

📍 Location                         /location
   • Song Tepo Beach, Yellow Bridge proximity
   • Interactive map
   • Getting here summary → link to /getting-here
   • Nearby attractions

🚤 Getting Here                     /getting-here
   • Sanur → Nusa Lembongan fast boat guide
   • Operators, schedules, transfer to resort
   • Island transport (scooter, buggy)

🎁 Offers                           /offers
   • Honeymoon package
   • Stay-longer deals, seasonal rates
   • Direct-booking exclusive perks

📰 Blog                             /blog
   • Nusa Lembongan / Nusa Ceningan travel guides
   • Internal links to rooms, experiences, location

   (launch articles — see §5)
   /blog/things-to-do-nusa-ceningan
   /blog/best-time-to-visit-nusa-lembongan
   /blog/sanur-to-nusa-lembongan-fast-boat-guide
   /blog/blue-lagoon-cliff-jump-guide

☎️ Contact                          /contact
   • Direct booking form / WhatsApp
   • NAP details, map, hours
   • FAQ accordion

ℹ️ About                            /about
   • Resort story, sustainability, pet-friendly ethos
   • Team / hospitality
```

### Tier 2 — Utility pages (footer)

```
/privacy-policy
/terms
/faq                      (or section within /contact)
/sitemap.xml              (auto-generated)
/robots.txt
```

### Tier 3 — Conversion

```
/book                    (booking widget / redirect to engine)
/checkout/...            (handled by booking-engine provider, if used)
/thank-you               (post-booking / post-form confirmation)
```

---

## 4. Footer

- **Brand block:** logo + tagline ("Oceanfront boutique resort, Nusa Ceningan")
- **Quick links:** Rooms, Dining, Offers, Blog, Contact
- **Contact:** address, phone, WhatsApp +62 812 3766 6330, email
- **Social:** Instagram (@segaraseaside), Facebook, TikTok
- **Trust:** TripAdvisor badge, "Book direct & save"
- **Legal:** Privacy, Terms

---

## 5. Launch blog content (topical authority)

These four posts each target a Cluster-C informational keyword and internally link to the relevant money page:

| Article | Primary keyword | Internal links to |
|---|---|---|
| Things to Do in Nusa Ceningan | things to do Nusa Ceningan | Experiences, Location, Rooms |
| Best Time to Visit Nusa Lembongan | best time to visit Nusa Lembongan | Offers, Getting Here |
| Sanur to Nusa Lembongan Fast Boat Guide | Sanur to Nusa Lembongan fast boat | Getting Here, Contact |
| Blue Lagoon Cliff Jump Guide | Blue Lagoon cliff jump Nusa Ceningan | Experiences, Location |

---

## 6. SEO technical checklist (for the build)

- [ ] Clean URL slugs (lowercase, hyphenated, keyword-rich — see map above)
- [ ] Unique `<title>` + meta description per page (per keyword doc)
- [ ] `Hotel` / `LodgingBusiness` JSON-LD schema on Home + Rooms
- [ ] `Restaurant` schema on Dining
- [ ] `FAQPage` schema on Contact FAQ
- [ ] `BreadcrumbList` schema site-wide
- [ ] XML sitemap auto-generated + submitted to Google Search Console
- [ ] `robots.txt` with sitemap reference
- [ ] Open Graph + Twitter Card images per page
- [ ] Optimised, lazy-loaded images with descriptive alt text
- [ ] Mobile-first, Core Web Vitals green (LCP < 2.5s)
- [ ] HTTPS, canonical tags, hreflang if multilingual planned

---

## 7. Open questions for client

- [ ] Domain name + hosting preference?
- [ ] Booking engine: custom WhatsApp form vs. channel manager (Cloudbeds/SiteMinder)?
- [ ] Confirm exact room names + count for the Rooms pages.
- [ ] High-res photo assets available? (Hero, rooms, dining, wellness, experiences)
- [ ] Multilingual needed at launch (EN / ID / DE / CN)? Affects hreflang + sitemap scope.
