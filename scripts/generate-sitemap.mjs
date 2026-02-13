/**
 * Generates sitemap.xml at build time.
 * Run: node scripts/generate-sitemap.mjs
 */
import { writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SITE_URL = 'https://datumgeek.github.io/linda-graham-studio';

// Portfolio data (mirrored from portfolio-data.ts to avoid TS import issues)
const exhibitions = [
  'naturalSelection',
  'multiverse3',
  'electromagneticTransformation',
  'myModernAesthetic',
  'personalPerceptions',
  'binaries',
];

const workingWithClay = ['earlyWorks', 'laterWorks'];

const staticRoutes = ['/', '/about', '/timeline'];

const portfolioListRoutes = [
  '/portfolio/exhibitions',
  '/portfolio/workingWithClay',
];

const portfolioRoutes = [
  ...exhibitions.map((k) => `/portfolio/exhibitions/${k}`),
  ...workingWithClay.map((k) => `/portfolio/workingWithClay/${k}`),
];

const allRoutes = [
  ...staticRoutes,
  ...portfolioListRoutes,
  ...portfolioRoutes,
];

const today = new Date().toISOString().split('T')[0];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allRoutes
  .map(
    (route) => `  <url>
    <loc>${SITE_URL}${route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${route === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${route === '/' ? '1.0' : route.includes('/portfolio/') ? '0.8' : '0.6'}</priority>
  </url>`,
  )
  .join('\n')}
</urlset>
`;

const outPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
writeFileSync(outPath, sitemap, 'utf-8');
console.log(`Sitemap generated: ${outPath} (${allRoutes.length} URLs)`);
