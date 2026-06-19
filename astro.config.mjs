import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://segaraseasideresort.com',
  integrations: [
    tailwind({
      // Apply base styles via our own src/styles/global.css instead of the
      // injected ones, so we control font imports + base layer ordering.
      applyBaseStyles: false,
    }),
    sitemap(),
  ],
});
