#!/usr/bin/env node
/**
 * Enrich portfolio JSON data with:
 *   1. Blurhash placeholders for each image (imageSmall)
 *   2. Auto-extracted dominant color palettes from the portfolio cover image
 *
 * Run with: node scripts/enrich-data.mjs
 * Idempotent — skips images that already have a blurhash.
 */
import sharp from 'sharp';
import { encode } from 'blurhash';
import { readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

const PUBLIC_IMAGES = 'public/images';
const DATA_DIR = 'src/app/data';

const FILES = [
  { json: 'exhibitions.json', listName: 'exhibitions' },
  { json: 'working-with-clay.json', listName: 'workingWithClay' },
];

/**
 * Generate a blurhash string from an image file.
 * Uses a very small decode (32×32) for speed — the hash itself is tiny.
 */
async function generateBlurhash(imagePath) {
  try {
    const { data, info } = await sharp(imagePath)
      .resize(32, 32, { fit: 'cover' })
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true });

    return encode(new Uint8ClampedArray(data), info.width, info.height, 4, 3);
  } catch (err) {
    console.warn(`  ⚠ blurhash failed for ${imagePath}: ${err.message}`);
    return null;
  }
}

/**
 * Extract dominant colors from an image using sharp's stats().
 * Returns an array of 5 hex color strings.
 */
async function extractPalette(imagePath) {
  try {
    const image = sharp(imagePath).resize(200, 200, { fit: 'cover' });
    const { dominant, channels } = await image.stats();

    // dominant gives us the single most common color
    const dominantHex = rgbToHex(dominant.r, dominant.g, dominant.b);

    // Use channel means for additional palette entries
    const meanColor = rgbToHex(
      Math.round(channels[0].mean),
      Math.round(channels[1].mean),
      Math.round(channels[2].mean),
    );

    // Sample specific regions for variety
    const regions = [
      { left: 0, top: 0 },                         // top-left
      { left: 100, top: 0 },                        // top-right
      { left: 0, top: 100 },                        // bottom-left
      { left: 50, top: 50 },                        // center
    ];

    const regionColors = [];
    for (const region of regions) {
      try {
        const { dominant: d } = await sharp(imagePath)
          .resize(200, 200, { fit: 'cover' })
          .extract({ left: region.left, top: region.top, width: 80, height: 80 })
          .stats();
        regionColors.push(rgbToHex(d.r, d.g, d.b));
      } catch {
        // region extraction may fail for tiny images
      }
    }

    // Deduplicate and pick 5 distinct colors
    const all = [dominantHex, meanColor, ...regionColors];
    const unique = [...new Set(all)];

    // If we have fewer than 5, generate tints/shades of dominant
    while (unique.length < 5) {
      const base = hexToRgb(dominantHex);
      const factor = 0.3 + unique.length * 0.15;
      const tint = rgbToHex(
        Math.min(255, Math.round(base.r + (255 - base.r) * factor)),
        Math.min(255, Math.round(base.g + (255 - base.g) * factor)),
        Math.min(255, Math.round(base.b + (255 - base.b) * factor)),
      );
      if (!unique.includes(tint)) {
        unique.push(tint);
      } else {
        // shade
        const shade = rgbToHex(
          Math.round(base.r * (1 - factor * 0.5)),
          Math.round(base.g * (1 - factor * 0.5)),
          Math.round(base.b * (1 - factor * 0.5)),
        );
        unique.push(shade);
      }
    }

    return unique.slice(0, 5);
  } catch (err) {
    console.warn(`  ⚠ palette extraction failed for ${imagePath}: ${err.message}`);
    return null;
  }
}

function rgbToHex(r, g, b) {
  return '#' + [r, g, b].map((c) => c.toString(16).padStart(2, '0')).join('').toUpperCase();
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 };
}

async function processFile({ json, listName }) {
  const jsonPath = join(DATA_DIR, json);
  const portfolios = JSON.parse(await readFile(jsonPath, 'utf-8'));
  let hashCount = 0;
  let coverHashCount = 0;
  let paletteCount = 0;

  for (const portfolio of portfolios) {
    const dir = join(PUBLIC_IMAGES, listName, portfolio.portfolio);

    // --- Blurhash for each image ---
    for (const img of portfolio.images) {
      if (img.blurhash) continue; // already processed

      const filename = img.imageSmall;
      const imagePath = join(dir, filename);
      const hash = await generateBlurhash(imagePath);
      if (hash) {
        img.blurhash = hash;
        hashCount++;
      }
    }

    // --- Cover blurhash ---
    if (!portfolio.coverBlurhash) {
      const coverPath = join(dir, portfolio.portfolioImage);
      const coverHash = await generateBlurhash(coverPath);
      if (coverHash) {
        portfolio.coverBlurhash = coverHash;
        coverHashCount++;
      }
    }

    // --- Auto palette from cover image ---
    const coverPath = join(dir, portfolio.portfolioImage);
    const palette = await extractPalette(coverPath);
    if (palette) {
      portfolio.description.palette = palette;
      paletteCount++;
    }
  }

  await writeFile(jsonPath, JSON.stringify(portfolios, null, 2) + '\n');
  console.log(`  ${json}: ${hashCount} blurhashes, ${coverHashCount} cover hashes, ${paletteCount} palettes`);
}

console.log('🎨 Enriching portfolio data...');
const start = Date.now();

for (const file of FILES) {
  await processFile(file);
}

const elapsed = ((Date.now() - start) / 1000).toFixed(1);
console.log(`✅ Done in ${elapsed}s`);
