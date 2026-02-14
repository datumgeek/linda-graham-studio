#!/usr/bin/env node
/**
 * Image optimization script
 *
 * Generates WebP versions and responsive sizes for all portfolio images.
 * Run with: node scripts/optimize-images.mjs
 *
 * Output goes alongside originals so Vite serves them from public/.
 * The app's <picture> elements reference .webp variants automatically.
 */
import sharp from 'sharp';
import { readdir, stat, access } from 'node:fs/promises';
import { join, extname, basename } from 'node:path';

const PUBLIC_IMAGES = 'public/images';
const WIDTHS = [320, 640, 1024]; // responsive breakpoints
const QUALITY = { webp: 80, jpeg: 85 };

let converted = 0;
let skipped = 0;

async function exists(p) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function processImage(filePath) {
  const ext = extname(filePath).toLowerCase();
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) return;

  // Generate WebP version of the original
  const webpPath = filePath.replace(/\.(jpe?g|png)$/i, '.webp');
  if (!(await exists(webpPath))) {
    try {
      await sharp(filePath).webp({ quality: QUALITY.webp }).toFile(webpPath);
      converted++;
    } catch (err) {
      console.warn(`  ⚠ Could not convert ${filePath}: ${err.message}`);
    }
  } else {
    skipped++;
  }

  // Generate responsive sizes for "large" images (skip thumbnails)
  const name = basename(filePath);
  const is162 = name.includes('162x162');
  const is300x200 = name.includes('300x200');
  if (is162 || is300x200) return; // skip thumbnails

  try {
    const meta = await sharp(filePath).metadata();
    if (!meta.width) return;

    for (const w of WIDTHS) {
      if (w >= meta.width) continue; // don't upscale

      const suffix = `-${w}w`;
      const sizedWebp = filePath.replace(/\.(jpe?g|png)$/i, `${suffix}.webp`);

      if (!(await exists(sizedWebp))) {
        await sharp(filePath)
          .resize(w)
          .webp({ quality: QUALITY.webp })
          .toFile(sizedWebp);
        converted++;
      } else {
        skipped++;
      }
    }
  } catch (err) {
    console.warn(`  ⚠ Could not resize ${filePath}: ${err.message}`);
  }
}

async function walkDir(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      await walkDir(full);
    } else {
      await processImage(full);
    }
  }
}

console.log('🖼  Optimizing images...');
const start = Date.now();
await walkDir(PUBLIC_IMAGES);
const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`✅ Done in ${elapsed}s — ${converted} created, ${skipped} already existed`);
