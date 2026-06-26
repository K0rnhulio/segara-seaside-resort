// Generate a 1200x630 social share image for the resort.
// Uses the aerial photo with a dark gradient overlay + branded text.
import sharp from 'sharp';
import { readFileSync } from 'fs';

const source = readFileSync('public/images/general/aerial-infinity-pool.jpg');

// SVG overlay with brand name + tagline (positioned over the photo)
const overlay = Buffer.from(`
<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#0F3D47" stop-opacity="0.55"/>
      <stop offset="1" stop-color="#0F3D47" stop-opacity="0.85"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="630" fill="url(#grad)"/>
  <text x="600" y="290" font-family="Georgia, serif" font-size="68" fill="#FFFFFF" text-anchor="middle" font-weight="400">Segara Seaside Resort</text>
  <text x="600" y="350" font-family="Arial, sans-serif" font-size="28" fill="#E8F1EF" text-anchor="middle" letter-spacing="3">BOUTIQUE OCEANFRONT STAY</text>
  <text x="600" y="395" font-family="Arial, sans-serif" font-size="24" fill="#A8845C" text-anchor="middle" letter-spacing="2">NUSA CENINGAN · NEAR NUSA LEMBONGAN</text>
</svg>
`);

await sharp(source)
  .resize(1200, 630, { fit: 'cover', position: 'centre' })
  .composite([{ input: overlay, gravity: 'centre' }])
  .jpeg({ quality: 85, progressive: true })
  .toFile('public/images/segara-og-share.jpg');

console.log('Created public/images/segara-og-share.jpg (1200x630)');
