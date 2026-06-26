import sharp from 'sharp';
import { readdir, stat, rename, unlink } from 'fs/promises';
import { join, extname, relative } from 'path';

const PUBLIC_DIR = 'public';
const TARGET_MAX_WIDTH = 1400; // Good balance for hero + gallery images
const JPEG_QUALITY = 78;
const SUPPORTED = ['.jpg', '.jpeg', '.png'];

async function getAllImages(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const fullPath = join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...await getAllImages(fullPath));
    } else if (SUPPORTED.includes(extname(entry.name).toLowerCase())) {
      files.push(fullPath);
    }
  }
  return files;
}

async function optimizeImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  const originalSize = (await stat(filePath)).size;

  try {
    const image = sharp(filePath, { failOn: 'none' });
    const metadata = await image.metadata();

    let pipeline = image;

    // Resize only if needed
    if (metadata.width && metadata.width > TARGET_MAX_WIDTH) {
      pipeline = pipeline.resize({
        width: TARGET_MAX_WIDTH,
        withoutEnlargement: true,
        fit: 'inside'
      });
    }

    const tmpPath = filePath + '.tmp';

    if (ext === '.png') {
      await pipeline
        .png({ compressionLevel: 9 })
        .toFile(tmpPath);
    } else {
      await pipeline
        .jpeg({
          quality: JPEG_QUALITY,
          progressive: true,
          mozjpeg: true
        })
        .toFile(tmpPath);
    }

    const newSize = (await stat(tmpPath)).size;

    // Only replace if we actually saved space (or close)
    if (newSize < originalSize * 0.95) {
      await rename(tmpPath, filePath);
      const saved = ((originalSize - newSize) / 1024 / 1024).toFixed(2);
      console.log(`✓ ${relative(PUBLIC_DIR, filePath)}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (-${saved}MB)`);
    } else {
      await unlink(tmpPath);
      console.log(`- ${relative(PUBLIC_DIR, filePath)}: already small or no gain`);
    }
  } catch (err) {
    console.error(`✗ Failed ${filePath}: ${err.message}`);
  }
}

async function main() {
  console.log('Optimizing images in public/... (max width 1400px, JPEG q78)\n');
  const images = await getAllImages(PUBLIC_DIR);

  console.log(`Found ${images.length} images to process.\n`);

  for (const img of images) {
    await optimizeImage(img);
  }

  console.log('\nDone! Run `npm run build` to verify.');
}

main().catch(console.error);