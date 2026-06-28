/**
 * Central site data — single source of truth for resort info.
 * Update contact details, rates, nav etc. here; components read from this.
 * See docs/02-sitemap.md + docs/03-content-audit-existing-site.md
 */

export const site = {
  name: 'Segara Seaside Resort',
  tagline: 'Boutique oceanfront stay near Nusa Lembongan',
  domain: 'segaraseasideresort.netlify.app',
  // NOTE: the .com domain is a separate Cloudflare-hosted site that does not
  // serve /images/* (404), which breaks WhatsApp/social link previews. Until
  // .com is fully deployed (including the OG image), point canonical/OG URLs
  // at the Netlify domain that actually serves the full site + assets.
  url: 'https://segaraseasideresort.netlify.app',
  description:
    'Discover a peaceful boutique resort near Nusa Lembongan on Nusa Ceningan. Infinity pool, sauna & cold plunge, pet-friendly stays, and steps from Song Tepo Beach. Book direct for the best experience.',
  locale: 'en_US',
} as const;

export const contact = {
  addressLine1: 'Song Tepo Beach',
  addressLine2: 'Nusa Ceningan, Klungkung, Bali, Indonesia',
  whatsapp: '+62 822 6629 4250',
  whatsappLink: 'https://wa.me/6282266294250',
  email: 'hello@segaraseasideresort.com',
  instagram: '@segaraseaside',
  instagramUrl: 'https://www.instagram.com/segaraseaside/',
  facebook: 'https://www.facebook.com/profile.php?id=61558200825451',
  tiktok: 'https://www.tiktok.com/@segaraseaside',
  tiktokHandle: '@segaraseaside',
} as const;

export const nav = [
  { label: 'Rooms', href: '/rooms' },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Retreats', href: '/retreat' },
  { label: 'Location', href: '/location' },
  { label: 'Transfers', href: '/getting-here' },
  { label: 'Contact', href: '/contact' },
] as const;

export const cta = {
  label: 'Book Direct & Save',
  href: '/rooms',
};

/**
 * Booking integration — SiteMinder DirectOnline (Avvio) booking engine.
 *
 * Base URL + parameter names confirmed from the resort's live BookNow link.
 * All "Book" buttons send guests to the property's generic booking page with
 * their chosen dates + guests; the guest picks the room on the engine.
 *
 * Per-room deep-linking (items[0][rateId]) is supported by buildBookingUrl()
 * and the Room.rateId field below, but currently unused — the resort manager
 * couldn't locate the per-room IDs. Drop a rateId onto a room to enable it.
 *
 * Query params the engine accepts:
 *   locale, currency, checkInDate, checkOutDate,
 *   items[0][adults], items[0][children], items[0][infants], items[0][rateId],
 *   trackPage, selected
 */
export const booking = {
  provider: 'SiteMinder',
  // Engine endpoint — property stays constant, params appended per request.
  baseUrl: 'https://book-directonline.com/properties/SegaraSeasideResorDIRECT',
  // Defaults for general CTAs (header/footer/hero) — no room pre-selected.
  defaultAdults: 2,
  defaultChildren: 0,
  currency: 'IDR',
  locale: 'en',
  perks: [
    'Best rate guaranteed',
    'No booking fees',
    'Flexible cancellation',
    'Personal service',
  ],
} as const;

/**
 * Build a SiteMinder DirectOnline booking URL.
 *
 * Pass options to override defaults. When `rateId` is omitted (or empty),
 * the room selector is left generic — the guest picks a room on the engine.
 *
 *   buildBookingUrl({ rateId: '677890', checkIn: '2026-07-01', checkOut: '2026-07-03', adults: 2 })
 */
export function buildBookingUrl(opts: {
  rateId?: string;
  checkIn?: string; // YYYY-MM-DD
  checkOut?: string; // YYYY-MM-DD
  adults?: number;
  children?: number;
} = {}): string {
  const {
    rateId,
    checkIn,
    checkOut,
    adults = booking.defaultAdults,
    children = booking.defaultChildren,
  } = opts;

  const params = new URLSearchParams();
  params.set('locale', booking.locale);
  params.set('currency', booking.currency);
  // adults / children / infants travel under the items[0] namespace.
  params.set('items[0][adults]', String(adults));
  params.set('items[0][children]', String(children));
  params.set('items[0][infants]', '0');
  if (rateId) params.set('items[0][rateId]', rateId);
  if (checkIn) params.set('checkInDate', checkIn);
  if (checkOut) params.set('checkOutDate', checkOut);
  params.set('trackPage', 'no');
  params.set('selected', '0');

  return `${booking.baseUrl}?${params.toString()}`;
}

/**
 * General "Book" CTA used by header, footer, hero, and section CTAs across
 * the site. No dates → the engine defaults to its own calendar; no rateId
 * → the guest selects a room on the booking page.
 *
 * NOTE: built once at module load. Date pickers on room pages build their
 * own URL client-side via the same parameter contract.
 */
export const generalBookingUrl = buildBookingUrl();

export type AmenityGroup = { category: string; items: string[] };

export type Room = {
  slug: string;
  name: string;
  overline: string;
  metaTitle: string; // browser tab title — SEO-optimized
  metaDescription: string; // meta description — SEO-optimized
  shortDescription: string; // used on home + rooms overview cards
  longDescription: string; // detail page hero/intro paragraph(s)
  priceFromLabel: string; // formatted for display
  priceFromIDR: number;
  image: string;
  gallery: string[]; // detail page gallery (reuse image for now)
  specs: { size: string; beds: string; sleeps: number; view: string };
  features: string[]; // quick-glance amenity chips
  perfectFor: string[]; // "Perfect For" list
  amenityGroups: AmenityGroup[]; // categorized amenities for detail page
  locationBenefit: string; // SEO + helpful location note
  ctaText: string; // final CTA heading
  href: string;
  /**
   * SiteMinder DirectOnline rate plan ID — enables per-room deep-linking
   * (items[0][rateId]). Currently unused: all rooms send guests to the
   * generic booking page. Add a rateId here to deep-link a specific room.
   */
  rateId?: string;
};

export const rooms: Room[] = [
  {
    slug: 'sunset-villa',
    name: 'Two-Bedroom Villa with Private Pool',
    overline: '2-Bedroom Villa',
    metaTitle: 'Two-Bedroom Villa with Private Pool | Segara Seaside Resort',
    metaDescription:
      'Spacious Two-Bedroom Villa with private plunge pool on Nusa Ceningan. Sea views, open living, ideal for families and groups. Near Nusa Lembongan. Book direct.',
    shortDescription:
      'Our spacious two-bedroom villa with a private pool is ideal for families or couples seeking extra space, comfort, and stunning sunset views in a serene island setting.',
    longDescription:
      'Escape to your own private sanctuary at Segara Seaside Resort. Our Two-Bedroom Villa with Private Pool is the most spacious accommodation we offer — perfect for families, groups of friends, or couples who want extra space and privacy near Nusa Lembongan.\n\nWake up in one of the two separate bedrooms and step outside to your own private plunge pool, surrounded by tropical greenery with uninterrupted views of the Indian Ocean. The open-plan living and dining area flows directly onto the pool deck, creating a seamless indoor-outdoor living experience. Watch the sun set over Nusa Ceningan while enjoying complete privacy.\n\nWhether you’re planning a relaxed family holiday or a group getaway, this villa offers the perfect balance of comfort, space, and location — just minutes from the Yellow Bridge and everything Nusa Lembongan has to offer.',
    priceFromLabel: 'IDR 3,600,300',
    priceFromIDR: 3600300,
    image: '/images/rooms/two-bedroom-villa.jpg',
    gallery: ['/images/rooms/two-bedroom-villa.jpg', '/images/general/infinity-pool-bar.jpg', '/images/general/bungalows-exterior.jpg'],
    specs: {
      size: '66 m²',
      beds: '2 Bedrooms (1 King bed + 2 Twin beds)',
      sleeps: 4,
      view: 'Private plunge pool + Sea views',
    },
    features: ['Private pool', 'Sea view', 'Sleeps 4', 'AC', 'Minibar', 'Wi-Fi'],
    perfectFor: [
      'Families traveling with children',
      'Groups of friends or two couples',
      'Guests who want more space and a private pool',
      'Travelers looking for a peaceful base near Nusa Lembongan',
    ],
    amenityGroups: [
      {
        category: 'Outdoor & Views',
        items: [
          'Private plunge pool',
          'Sea and pool views',
          'Pool deck with lounge area',
          'Tropical garden surroundings',
        ],
      },
      {
        category: 'Bedrooms & Living',
        items: [
          '2 separate bedrooms (1 King bed + 2 Twin beds)',
          'Extra-long beds',
          'Open-plan living and dining area',
          'Air conditioning throughout',
        ],
      },
      {
        category: 'Kitchen & Convenience',
        items: ['Kitchenette', 'Minibar and refrigerator', 'Electric tea kettle', 'Free Wi-Fi'],
      },
      {
        category: 'Bathroom & Services',
        items: [
          'Private bathroom with shower and bidet',
          'Free toiletries and hairdryer',
          'Daily housekeeping',
        ],
      },
    ],
    locationBenefit:
      'The villa is located on peaceful Nusa Ceningan, just a short distance from the iconic Yellow Bridge. This makes it an excellent choice for guests who want to stay in a quieter area while still having easy access to Nusa Lembongan’s beaches, restaurants, and activities.',
    ctaText: 'Ready to enjoy your own private pool near Nusa Lembongan?',
    href: '/rooms/sunset-villa',
  },
  {
    slug: 'ocean-bungalow',
    name: 'Deluxe Bungalow with Sea View',
    overline: 'Sea-View Bungalow',
    metaTitle: 'Deluxe Bungalow with Sea View | Segara Seaside Resort',
    metaDescription:
      'Wake up to direct ocean and pool views in our Deluxe Bungalow with Sea View on Nusa Ceningan. King bed, modern amenities, steps from the beach. Book direct.',
    shortDescription:
      'Enjoy direct pool and ocean views from our elegant Deluxe Bungalow with Sea View, designed for relaxation and comfort — perfect for romantic getaways or solo travelers.',
    longDescription:
      'The Deluxe Bungalow with Sea View is our most sought-after room for couples and sunset chasers. Wake up to the sight and sound of the ocean right outside your door, with direct views over the infinity pool and the sea beyond. Thoughtfully designed with a king bed, natural light, and tropical-modern finishes, this bungalow blends comfort with the laid-back beauty of Nusa Ceningan. Step out and you’re moments from the pool deck, the restaurant, and Song Tepo Beach — making it the perfect base for a romantic escape near Nusa Lembongan.',
    priceFromLabel: 'IDR 2,825,000',
    priceFromIDR: 2825000,
    image: '/images/rooms/sea-view-bungalow.jpg',
    gallery: ['/images/rooms/sea-view-bungalow.jpg', '/images/rooms/ocean-view-bungalow.jpg', '/images/rooms/ocean-view-bungalow-deck.jpg'],
    specs: { size: '27 m²', beds: '1 King bed', sleeps: 2, view: 'Direct sea & pool views' },
    features: ['Sea view', 'Pool view', 'Sleeps 2', 'AC', 'Minibar', 'Wi-Fi'],
    perfectFor: [
      'Couples and honeymooners',
      'Sunset and ocean-view lovers',
      'Solo travelers seeking a scenic retreat',
      'Guests who want to be steps from the pool and beach',
    ],
    amenityGroups: [
      {
        category: 'Views & Outdoor',
        items: ['Direct sea and pool views', 'Moments from the infinity pool', 'Steps from Song Tepo Beach'],
      },
      {
        category: 'Bedroom & Comfort',
        items: ['1 King bed', 'Extra-long bed', 'Air conditioning', 'Natural light and tropical-modern finishes'],
      },
      {
        category: 'Convenience',
        items: ['Minibar and refrigerator', 'Electric tea kettle', 'Free Wi-Fi'],
      },
      {
        category: 'Bathroom & Services',
        items: [
          'Private bathroom with shower and bidet',
          'Free toiletries and hairdryer',
          'Daily housekeeping',
        ],
      },
    ],
    locationBenefit:
      'Set on the oceanfront of peaceful Nusa Ceningan, this bungalow places you right beside the infinity pool and a short stroll from the Yellow Bridge — close to Nusa Lembongan’s beaches and restaurants while staying in a quieter, more intimate setting.',
    ctaText: 'Ready to wake up to ocean views near Nusa Lembongan?',
    href: '/rooms/ocean-bungalow',
  },
  {
    slug: 'bungalow',
    name: 'Deluxe Bungalow',
    overline: 'Garden or Sea View',
    metaTitle: 'Deluxe Bungalow | Segara Seaside Resort, Nusa Ceningan',
    metaDescription:
      'Cozy, stylish Deluxe Bungalow on Nusa Ceningan. Garden setting, modern amenities, easy access to pool and beach. Great value near Nusa Lembongan.',
    shortDescription:
      'Our stylish Deluxe Bungalow offers garden or sea views in a quiet tropical setting — a comfortable, modern retreat for couples and solo travelers near Nusa Lembongan.',
    longDescription:
      'Relax in a cozy, stylish retreat at Segara Seaside Resort. Our Deluxe Bungalow is tucked into the resort’s quiet tropical gardens — an ideal choice for couples and solo travelers seeking great value without compromising on comfort.\n\nEach bungalow is compact yet thoughtfully designed, with air conditioning, a comfortable king bed, and all the modern amenities you need for a relaxing island stay. You’re just a short stroll from the infinity pool, Song Tepo Beach, and the oceanfront restaurant.\n\nWith easy access to everything Segara and nearby Nusa Lembongan have to offer, this bungalow is the perfect affordable base for exploring the islands at your own pace.',
    priceFromLabel: 'IDR 2,200,000',
    priceFromIDR: 2200000,
    image: '/images/rooms/deluxe-bungalow.jpg',
    gallery: ['/images/rooms/deluxe-bungalow.jpg', '/images/general/bungalows-exterior.jpg', '/images/general/aerial-infinity-pool.jpg'],
    specs: { size: '27 m²', beds: '1 King bed', sleeps: 2, view: 'Garden view' },
    features: ['Garden view', 'Sleeps 2', 'AC', 'Wi-Fi'],
    perfectFor: [
      'Couples on a romantic island break',
      'Solo travelers exploring Nusa Ceningan',
      'Budget-conscious guests who still want comfort',
      'Travelers who want easy access to the pool and beach',
    ],
    amenityGroups: [
      {
        category: 'Views & Outdoor',
        items: ['Garden view in a quiet tropical setting', 'Short stroll to the infinity pool and beach'],
      },
      {
        category: 'Bedroom & Comfort',
        items: ['1 King bed', 'Air conditioning', 'Compact, thoughtfully designed layout'],
      },
      {
        category: 'Convenience',
        items: ['Minibar and refrigerator', 'Electric tea kettle', 'Free Wi-Fi'],
      },
      {
        category: 'Bathroom & Services',
        items: [
          'Private bathroom with shower and bidet',
          'Free toiletries and hairdryer',
          'Daily housekeeping',
        ],
      },
    ],
    locationBenefit:
      'Located within easy reach of the infinity pool, Song Tepo Beach, and the Yellow Bridge, this bungalow gives you affordable access to the best of Nusa Ceningan and Nusa Lembongan — all from a peaceful garden setting.',
    ctaText: 'Ready for an affordable island escape near Nusa Lembongan?',
    href: '/rooms/bungalow',
  },
];

// "Why Segara" — 4 USPs (per client homepage brief, 2026-06-20)
export const valueProps = [
  {
    icon: 'pool',
    title: 'Oceanfront Infinity Pool',
    body: 'Wake up to sweeping ocean views and spend your days relaxing by our stunning infinity pool.',
  },
  {
    icon: 'pet',
    title: 'Pet-Friendly Welcome',
    body: 'We are one of the few pet-friendly resorts near Nusa Lembongan. Well-behaved dogs are welcome at no extra charge.',
  },
  {
    icon: 'wellness',
    title: 'Wellness Sanctuary',
    body: 'Rejuvenate in our sauna and cold plunge, or enjoy a swim in the ocean right in front of the resort.',
  },
  {
    icon: 'intimate',
    title: 'Intimate & Personal',
    body: 'With only a small number of rooms and villas, we offer a calm, personalized experience away from the crowds.',
  },
];

export const reviews = {
  googleRating: 4.9,
  googleCount: 148,
  bookingRating: 8.7,
  items: [
    {
      quote:
        'We were looking for a quiet boutique resort near Nusa Lembongan and found exactly what we wanted at Segara. The infinity pool and pet-friendly policy made our stay perfect.',
      author: 'Guest review',
    },
    {
      quote:
        'Best decision to stay on Ceningan instead of busy Lembongan. So peaceful, amazing views, and the staff were wonderful.',
      author: 'Guest review',
    },
    {
      quote:
        'Loved being able to bring our dog. The location is perfect — close enough to Nusa Lembongan but much calmer.',
      author: 'Guest review',
    },
  ],
};

// Wellness section highlights (per client homepage brief, 2026-06-20)
export const wellnessHighlights = [
  { title: 'Infinity Pool', body: 'Infinity pool with sweeping ocean views.' },
  { title: 'Sauna & Cold Plunge', body: 'Rejuvenate in our sauna and cold plunge.' },
  { title: 'Direct Beach Access', body: 'Steps to Song Tepo Beach, right in front of the resort.' },
  { title: 'Pool Bar', body: 'Relaxed moments and refreshments by the pool.' },
];

// Location key points (per client homepage brief, 2026-06-20)
export const locationPoints = [
  'Just minutes from the Yellow Bridge',
  'Steps from Song Tepo Beach',
  'Easy boat access from Bali (Sanur)',
  'Door-to-door transfers from anywhere in Bali — incl. private boat & yacht',
  'Perfect base for exploring both Nusa Lembongan and Nusa Ceningan',
];

/**
 * TikTok feed — curated embeds.
 *
 * TikTok has no unauthenticated "latest posts" API (the Display API
 * requires app approval that's routinely rejected for embed-your-own-feed
 * use cases), so we curate the videos manually here. Each entry is a real
 * TikTok post from @segaraseaside, embedded as a live, playable iframe on
 * the homepage via the no-auth embed player:
 *   https://www.tiktok.com/player/v1/{videoId}
 *
 * To add/swap a video: paste its full TikTok URL into `url` — the numeric
 * video ID is extracted automatically at render time. `caption` is a short
 * on-brand label shown under the embed (the TikTok description itself is
 * also rendered inside the iframe via ?description=1).
 */
export type TikTokVideo = {
  url: string;       // full TikTok post URL — video ID parsed from it
  caption?: string;  // optional short label shown beneath the embed
};

export const tiktokVideos: TikTokVideo[] = [
  { url: 'https://www.tiktok.com/@segaraseaside/video/7649689105894329618' },
  { url: 'https://www.tiktok.com/@segaraseaside/video/7603697429589904648' },
  { url: 'https://www.tiktok.com/@segaraseaside/video/7647479777674153223' },
  { url: 'https://www.tiktok.com/@segaraseaside/video/7644133697062472968' },
  { url: 'https://www.tiktok.com/@segaraseaside/video/7637486075727875346' },
  { url: 'https://www.tiktok.com/@segaraseaside/video/7616953564283473160' },
];

/**
 * Extract the numeric video ID from a TikTok post URL.
 *   "https://www.tiktok.com/@user/video/7649...618?is_from_webapp=1" → "7649...618"
 * Used by the homepage TikTok section to build the embed-player iframe src.
 */
export function tiktokVideoId(url: string): string {
  const match = url.match(/\/video\/(\d+)/);
  return match ? match[1] : '';
}

/**
 * Homepage FAQ — SEO-heavy content. Each question targets a real search query
 * from the keyword clusters in docs/01-keyword-research.md (Clusters B, C, D, E).
 * Answers are 40–60 words: long enough to rank, short enough to read.
 * Mirrored as FAQPage JSON-LD schema on the homepage for rich results.
 */
export type FAQItem = { question: string; answer: string };

export const faqs: FAQItem[] = [
  {
    question: 'Is Segara Seaside Resort in Nusa Lembongan?',
    answer:
      'Segara Seaside Resort is located on Nusa Ceningan, right across the iconic Yellow Bridge from Nusa Lembongan. Many guests searching for resorts in Nusa Lembongan stay with us because we are only a few minutes away by scooter or on foot. We offer the peaceful atmosphere of Ceningan with easy access to everything Nusa Lembongan has to offer.',
  },
  {
    question: 'Is Segara Seaside Resort pet-friendly?',
    answer:
      'Yes, Segara is one of the few pet-friendly resorts near Nusa Lembongan. We welcome dogs and other pets at no extra charge. Guests love that they can enjoy a relaxed island stay with their pets, whether by the infinity pool or walking to nearby beaches.',
  },
  {
    question: 'How far is Segara from Nusa Lembongan?',
    answer:
      'Segara Seaside Resort is very close to Nusa Lembongan — just a short ride across the Yellow Bridge (usually 2–5 minutes by scooter). Many of our guests explore both islands during their stay.',
  },
  {
    question: 'What makes Segara a good choice for a Nusa Lembongan trip?',
    answer:
      'Segara offers a quieter, more intimate experience compared to busier areas on Nusa Lembongan, while still being extremely convenient. You get an oceanfront infinity pool, wellness facilities (sauna & cold plunge), and direct access to Song Tepo Beach, all while being just minutes from Nusa Lembongan’s restaurants, activities, and attractions.',
  },
  {
    question: 'Do you have an infinity pool?',
    answer:
      'Yes. Our beautiful infinity pool overlooks the ocean and is one of the highlights for guests staying in the Nusa Lembongan area. It’s a perfect spot to relax with views across the water.',
  },
  {
    question: 'What room types are available at Segara?',
    answer:
      'We offer stylish Deluxe Bungalows (some with sea views) and a spacious Two-Bedroom Villa with Private Pool. These are popular with couples and families looking for boutique accommodation near Nusa Lembongan.',
  },
  {
    question: 'How do I get to Segara from Bali if I’m visiting Nusa Lembongan?',
    answer:
      'Most guests take a fast boat from Sanur to Nusa Lembongan, then cross the Yellow Bridge to Nusa Ceningan. The journey is straightforward, and we can help arrange transfers. Once you’re on Nusa Lembongan, we’re only a few minutes away.',
  },
  {
    question: 'Is there a restaurant at Segara?',
    answer:
      'Yes, we have an on-site restaurant serving fresh breakfast, lunch, and dinner. Many guests staying in the Nusa Lembongan area enjoy dining with us because of the peaceful setting and ocean views.',
  },
  {
    question: 'What can I do near Segara if I’m based near Nusa Lembongan?',
    answer:
      'You can easily visit Song Tepo Beach (right in front of us), cross to Nusa Lembongan for more restaurants and activities, or enjoy snorkeling, cliff views, and relaxed beach time. The location gives you the best of both islands.',
  },
  {
    question: 'Should I book directly with Segara?',
    answer:
      'We always recommend booking directly with us. You’ll get the best rates, more flexibility, and personal service. Many guests looking for resorts in Nusa Lembongan choose to book directly with Segara for a more authentic and stress-free experience.',
  },
];

/**
 * Retreats page — /retreat
 *
 * Segara as a venue for hosts, mastermind leaders, yoga teachers, and group
 * organizers to run their own retreats. Data lives here per the single-source-
 * of-truth convention; the page renders from these arrays.
 */

export type RetreatType = {
  icon: 'wellness' | 'mastermind' | 'yoga' | 'corporate';
  title: string;
  body: string;
};

// The four retreat categories the venue accommodates (per client brief).
export const retreats: RetreatType[] = [
  {
    icon: 'wellness',
    title: 'Wellness & Sauna Retreats',
    body:
      'Build your program around our signature sauna and cold plunge ritual, ocean swims, and sunset restoration. The ocean-view wellness deck becomes the heart of your guests’ reset.',
  },
  {
    icon: 'mastermind',
    title: 'Masterminds',
    body:
      'An intimate, distraction-free setting for focused work sessions and deep conversation. The Two-Bedroom Villa and oceanfront deck give your group space to think, connect, and create.',
  },
  {
    icon: 'yoga',
    title: 'Yoga & Mindfulness',
    body:
      'Host yoga, breathwork, and meditation retreats with the Indian Ocean as your backdrop. Open-air sessions on the deck, quiet island energy, and natural rhythm to ground your practice.',
  },
  {
    icon: 'corporate',
    title: 'Corporate & Group Getaways',
    body:
      'Team offsites, creative workshops, and private group escapes. Take the whole resort for full privacy, with catering, transfers, and a relaxed oceanfront setting that brings people together.',
  },
];

// "Why host at Segara" — four venue advantages shown in the intro section.
export const retreatAdvantages = [
  {
    icon: 'ocean',
    title: 'Oceanfront on Nusa Ceningan',
    body:
      'A dedicated oceanfront setting away from the crowds, with the infinity pool, beach, and Indian Ocean right in front of your retreat.',
  },
  {
    icon: 'sauna',
    title: 'Sauna & Cold Plunge Ritual',
    body:
      "Bali's only ocean-view Finnish cedar sauna and cold plunge — a ready-made wellness anchor for your program, included for all guests.",
  },
  {
    icon: 'pool',
    title: 'Infinity Pool & Beach',
    body:
      'A horizon-edge pool, direct access to Song Tepo Beach, and a pool bar for the in-between moments that make a retreat feel effortless.',
  },
  {
    icon: 'intimate',
    title: 'Intimate Boutique Scale',
    body:
      'A small number of rooms and villas means genuine privacy and personal service — or take the whole resort for a fully exclusive retreat.',
  },
];

// "What the venue offers" — facilities checklist included for retreat groups.
export const retreatFacilities = [
  'Oceanfront infinity pool',
  'Finnish cedar sauna & cold plunge',
  'Oceanfront restaurant & pool bar',
  'Direct access to Song Tepo Beach',
  'Accommodation for your whole group',
  'Two-bedroom villa with private pool',
  'Sunset deck & open-air spaces',
  'Transfer assistance from Bali',
];

// "A day on retreat at Segara" — the flow of a typical retreat day.
export const retreatDay = [
  {
    step: '01',
    title: 'Morning',
    body:
      'Begin with an ocean swim or the sauna and cold plunge ritual as the sun rises over Nusa Ceningan. A slow breakfast on the deck sets the tone for the day.',
  },
  {
    step: '02',
    title: 'Midday',
    body:
      'Your main session — yoga on the deck, a mastermind in the villa, or a workshop by the pool. The open-air spaces adapt to however you want to guide your group.',
  },
  {
    step: '03',
    title: 'Afternoon',
    body:
      'Free time to rest, swim, or explore Nusa Ceningan and Nusa Lembongan. The island’s gentle rhythm gives guests space to integrate and recharge.',
  },
  {
    step: '04',
    title: 'Evening',
    body:
      'Gather for sunset over the Indian Ocean, then share a meal at the oceanfront restaurant. The day closes with stillness, connection, and the sound of the waves.',
  },
];

// Real guest reviews that mention retreats (from resort-schema.ts).
export const retreatReviews = [
  {
    quote:
      'We did the 3-night wellness retreat. Yoga and cold therapy were life-changing.',
    author: 'Victor F.',
  },
  {
    quote: 'The retreat schedule was well organized. Very restorative weekend.',
    author: 'Nora D.',
  },
  {
    quote:
      'Highly recommend their custom retreats. The manager handled everything perfectly.',
    author: 'Leon H.',
  },
  {
    quote:
      'The 7-night retreat was exactly what I needed to disconnect and recover.',
    author: 'Maya V.',
  },
];

// Organizer-focused FAQ — targets real host search intent. Feeds both the
// visible accordion and the FAQPage JSON-LD schema on /retreat.
export const retreatFaqs: FAQItem[] = [
  {
    question: 'Can I host a retreat at Segara Seaside Resort?',
    answer:
      'Yes. Segara is an ideal oceanfront venue for wellness, yoga, mastermind, and group retreats on Nusa Ceningan. With a small number of rooms and villas, an infinity pool, an ocean-view sauna and cold plunge, and direct beach access, everything your group needs is in one intimate setting. Message us on WhatsApp to tell us about your retreat and we’ll help you plan it.',
  },
  {
    question: 'How many guests can a retreat accommodate?',
    answer:
      'Our rooms and Two-Bedroom Villa with Private Pool comfortably host small to mid-sized retreat groups, and the whole resort can be booked for an exclusive, private retreat experience. Whether you are planning an intimate gathering for a few close guests or a larger group takeover, get in touch and we will tailor the arrangements to your group size.',
  },
  {
    question: 'Can I book the entire resort for an exclusive retreat?',
    answer:
      'Yes. A whole-resort buyout gives your retreat complete privacy — the infinity pool, sauna and cold plunge, restaurant, and beach access are exclusively yours. This is a popular option for masterminds, corporate offsites, and private group retreats. Contact us on WhatsApp to check availability and pricing for an exclusive booking.',
  },
  {
    question: 'Is the venue suitable for yoga and wellness sessions?',
    answer:
      'Absolutely. The oceanfront deck, open-air spaces, and quiet island setting on Nusa Ceningan are perfect for yoga, breathwork, meditation, and wellness sessions. Our ocean-view sauna and cold plunge ritual can be built directly into your program, and the infinity pool and beach give your guests natural restoration between sessions.',
  },
  {
    question: 'Can you provide catering for a retreat group?',
    answer:
      'Yes. Our on-site oceanfront restaurant serves fresh breakfasts, lunches, and dinners, and the pool bar offers juices, cocktails, and light fare throughout the day. We can arrange meal plans and mindful dining tailored to your retreat’s schedule and dietary needs. Let us know your requirements when you enquire.',
  },
  {
    question: 'Do you help with transfers for retreat guests?',
    answer:
      'Yes. Most guests travel by fast boat from Sanur in Bali to Nusa Lembongan, then cross the Yellow Bridge to Nusa Ceningan. We can help arrange boat transfers and onward transport so your group arrives smoothly. This is especially helpful for retreat hosts coordinating several guests arriving from different places.',
  },
  {
    question: 'When is the best time of year to host a retreat at Segara?',
    answer:
      'The dry season (roughly April to October) brings sunny skies and calm seas, ideal for ocean swims and outdoor sessions. The quieter months offer more availability and a gentler pace. We host retreats year-round — the sauna, pool, and covered spaces work in any weather. Message us to find the best dates for your program.',
  },
  {
    question: 'How do I enquire about hosting a retreat?',
    answer:
      'The simplest way is to message us on WhatsApp with a few details about your retreat — your dates, group size, and the kind of program you are planning. Our team will help you put together the right combination of rooms, spaces, catering, and experiences for your group.',
  },
];

