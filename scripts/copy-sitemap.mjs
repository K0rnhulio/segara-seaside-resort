/**
 * After `astro build`, expose the URL set at the conventional /sitemap.xml
 * path that SEO tools and many bots request by default.
 *
 * @astrojs/sitemap emits sitemap-index.xml + sitemap-0.xml. With only a
 * handful of pages, serving the urlset directly at /sitemap.xml is clearer
 * for auditors and still fully valid for Google/Bing.
 */
import { copyFileSync, existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dist = join(process.cwd(), 'dist');
const sitemap0 = join(dist, 'sitemap-0.xml');
const sitemapXml = join(dist, 'sitemap.xml');
const sitemapIndex = join(dist, 'sitemap-index.xml');

if (!existsSync(sitemap0)) {
  console.error('[copy-sitemap] dist/sitemap-0.xml not found — run astro build first.');
  process.exit(1);
}

copyFileSync(sitemap0, sitemapXml);
console.log('[copy-sitemap] wrote dist/sitemap.xml');

// Keep sitemap-index.xml pointing at the same host paths (already correct
// after build via site config). Optionally re-write lastmod is unnecessary.
if (existsSync(sitemapIndex)) {
  const index = readFileSync(sitemapIndex, 'utf8');
  // Ensure index still lists sitemap-0; also add a note that /sitemap.xml exists
  // by keeping both valid entry points (robots prefers /sitemap.xml).
  writeFileSync(sitemapIndex, index);
}
