import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { site, rooms } from './src/data/site.ts';

// https://astro.build/config
// Tailwind v3 is wired through PostCSS (postcss.config.mjs) rather than the
// @astrojs/tailwind integration, which was removed in Astro 7.
export default defineConfig({
  // NOTE: .com is a separate Cloudflare site that 404s on /images/* (breaks
  // social previews). Use the Netlify URL that serves the full site + assets.
  site: 'https://segaraseasideresort.netlify.app',
  integrations: [
    sitemap({
      // Drop non-indexable utility pages. /404 and /thank-you are both
      // `noindex` (see their page frontmatter) — listing them in a sitemap
      // would contradict robots.txt and waste crawl budget.
      filter: (page) => !page.includes('/404') && !page.includes('/thank-you'),

      // Per-URL metadata: lastmod + priority + changefreq + image entries.
      //
      // lastmod is consumed by Google and is the single most valuable field
      // here — it lets crawlers skip refetching unchanged pages. priority and
      // changefreq are formally ignored by Google but still read by Bing,
      // Yandex, and 2025-era AI crawlers (GPTBot, ClaudeBot, PerplexityBot,
      // AppleBot-Extended) as freshness / importance hints, so we set them.
      serialize: (item) => {
        const path = item.url.replace(site.url, '').replace(/\/$/, '') || '/';
        item.lastmod = new Date();

        // Helper: absolute image URLs for the <image:image> entries.
        const img = (src) => ({ url: `${site.url}${src}` });

        switch (path) {
          case '/':
            item.priority = 1.0;
            item.changefreq = 'weekly';
            item.img = [img('/images/general/aerial-infinity-pool.jpg')];
            break;
          case '/rooms':
            item.priority = 0.9;
            item.changefreq = 'weekly';
            item.img = [img('/images/rooms/two-bedroom-villa.jpg')];
            break;
          case '/wellness':
            item.priority = 0.7;
            item.changefreq = 'monthly';
            item.img = [img('/images/general/infinity-pool-bar.jpg')];
            break;
          case '/retreat':
          case '/location':
          case '/getting-here':
            item.priority = 0.7;
            item.changefreq = 'monthly';
            item.img = [img('/images/general/aerial-infinity-pool.jpg')];
            break;
          case '/contact':
            item.priority = 0.7;
            item.changefreq = 'monthly';
            item.img = [img('/images/general/infinity-pool-bar.jpg')];
            break;
          case '/terms':
          case '/privacy':
          case '/imprint':
            // Legal pages: real but low priority, rarely change.
            item.priority = 0.3;
            item.changefreq = 'yearly';
            break;
          default:
            if (path.startsWith('/rooms/')) {
              // Per-room detail page — pull the room's gallery images so
              // Google Images can index each room photo.
              const slug = path.split('/').pop();
              const room = rooms.find((r) => r.slug === slug);
              item.priority = 0.9;
              item.changefreq = 'weekly';
              if (room) item.img = room.gallery.map((g) => img(g));
            }
        }

        return item;
      },
    }),
  ],
});
