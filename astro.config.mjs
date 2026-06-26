import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Tailwind v3 is wired through PostCSS (postcss.config.mjs) rather than the
// @astrojs/tailwind integration, which was removed in Astro 7.
export default defineConfig({
  site: 'https://segaraseasideresort.com',
  integrations: [sitemap()],
});
