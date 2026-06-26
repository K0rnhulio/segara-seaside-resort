import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
// Tailwind v3 is wired through PostCSS (postcss.config.mjs) rather than the
// @astrojs/tailwind integration, which was removed in Astro 7.
export default defineConfig({
  // NOTE: .com is a separate Cloudflare site that 404s on /images/* (breaks
  // social previews). Use the Netlify URL that serves the full site + assets.
  site: 'https://segaraseasideresort.netlify.app',
  integrations: [sitemap()],
});
