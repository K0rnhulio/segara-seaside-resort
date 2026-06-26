/**
 * Central site data — single source of truth for resort info.
 * Update contact details, rates, nav etc. here; components read from this.
 * See docs/02-sitemap.md + docs/03-content-audit-existing-site.md
 */

export const site = {
  name: 'Segara Seaside Resort',
  tagline: 'Boutique oceanfront stay near Nusa Lembongan',
  domain: 'segaraseasideresort.com',
  url: 'https://segaraseasideresort.com',
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
  facebook: 'https://www.facebook.com/',
  tiktok: 'https://www.tiktok.com/@segaraseaside',
  tiktokHandle: '@segaraseaside',
} as const;

export const nav = [
  { label: 'Rooms', href: '/rooms' },
  { label: 'Wellness', href: '/wellness' },
  { label: 'Location', href: '/location' },
  { label: 'Getting Here', href: '/getting-here' },
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
    metaTitle: 'Two-Bedroom Villa with Private Pool | Segara Resort',
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
    metaTitle: 'Deluxe Bungalow with Sea View | Segara Resort',
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
    metaTitle: 'Deluxe Bungalow | Segara Resort Nusa Ceningan',
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

export const experiences = [
  {
    title: 'Snorkel & Reef Tours',
    body: 'Glide over pristine coral gardens teeming with marine life, minutes from the resort.',
    image: '/images/experiences/snorkel-reef-tour.svg',
  },
  {
    title: 'Blue Lagoon Cliff Jump',
    body: 'The island’s #1 thrill — leap into the turquoise lagoon from 4 to 13 metres.',
    image: '/images/experiences/blue-lagoon-cliff-jump.svg',
  },
  {
    title: 'Nusa Penida Day Trips',
    body: 'Manta Point, Crystal Bay & Kelingking Beach — the iconic sights, a short boat away.',
    image: '/images/experiences/penida-day-trip.svg',
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

