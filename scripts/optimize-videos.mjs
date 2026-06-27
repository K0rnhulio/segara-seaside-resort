import { spawn } from 'child_process';
import { stat, rename, unlink } from 'fs/promises';
import { join } from 'path';

const VIDEO_DIR = 'public/video';
// Hero is a muted, autoplaying background loop, so we drop the audio track
// entirely (no bytes wasted on a stream nobody hears) and use a gentler CRF
// than the sauna clip — it's the first thing visitors see and the previous
// CRF-26 encode looked too compressed. CRF 20 keeps it visibly sharper.
const VIDEOS = [
  {
    input: 'segara-hero.mp4',
    maxWidth: 1280,
    crf: 20,
    audioBitrate: null, // strip audio — muted autoplay background video
    label: 'Hero'
  },
  {
    input: 'segara-sauna.mp4',
    maxWidth: 1280,
    crf: 26,
    audioBitrate: '96k',
    label: 'Sauna'
  }
];

function runFfmpeg(args) {
  return new Promise((resolve, reject) => {
    const proc = spawn('ffmpeg', args, { stdio: ['ignore', 'pipe', 'pipe'] });
    let stderr = '';
    proc.stderr.on('data', (d) => { stderr += d.toString(); });
    proc.on('close', (code) => {
      if (code === 0) resolve(stderr);
      else reject(new Error(`ffmpeg exited with code ${code}\n${stderr}`));
    });
    proc.on('error', reject);
  });
}

async function optimizeVideo(video) {
  const inputPath = join(VIDEO_DIR, video.input);
  const tmpPath = join(VIDEO_DIR, video.input.replace('.mp4', '-opt.mp4'));

  try {
    const originalSize = (await stat(inputPath)).size;

    const args = [
      '-i', inputPath,
      '-c:v', 'libx264',
      '-crf', String(video.crf),
      '-preset', 'medium',
      '-vf', `scale='min(${video.maxWidth},iw)':-2`,
      // audioBitrate: null → strip the audio track entirely (muted bg video).
      ...(video.audioBitrate ? ['-c:a', 'aac', '-b:a', video.audioBitrate] : ['-an']),
      '-movflags', '+faststart',
      '-y',
      tmpPath
    ];

    console.log(`Compressing ${video.label} (${video.input})...`);
    await runFfmpeg(args);

    const newSize = (await stat(tmpPath)).size;
    const savedMB = ((originalSize - newSize) / 1024 / 1024).toFixed(2);

    if (newSize < originalSize) {
      await rename(tmpPath, inputPath);
      console.log(`✓ ${video.input}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (-${savedMB}MB)`);
    } else {
      await unlink(tmpPath);
      console.log(`- ${video.input}: no improvement`);
    }
  } catch (err) {
    console.error(`✗ Failed ${video.input}: ${err.message}`);
    try { await unlink(tmpPath); } catch {}
  }
}

async function main() {
  console.log('Optimizing videos with ffmpeg (H.264, max 1280px, per-video CRF)\n');

  for (const v of VIDEOS) {
    await optimizeVideo(v);
  }

  console.log('\nDone. You can run `npm run optimize:videos` again if needed.');
}

main().catch(console.error);