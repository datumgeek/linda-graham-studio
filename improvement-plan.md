# Linda Graham Studio — Improvement Plan

> A roadmap for evolving this artist portfolio from a functional migration into a polished, performant, and delightful web experience.

**Legend:** ✅ Completed | 🔄 In Progress | ⬜ Not Started | ⏭️ Skipped

---

## Phase 0 — Mobile-First Phone Experience (Priority: Highest)

### 0.1 Mobile Viewport & Layout Audit ✅
- ✅ Tested all pages on 375px / 390px / 414px viewports
- ✅ Fixed overflow, horizontal scroll, and clipped content issues
- ✅ Hamburger menu works: open, close, navigate, auto-close on route change
- ✅ All touch targets ≥ 44×44px

### 0.2 Touch-Optimized Carousel ✅
- ✅ Swipe gesture support (left/right) via touch events
- ✅ Larger thumb-friendly prev/next buttons
- ✅ Pinch-to-zoom on artwork images (react-zoom-pan-pinch)
- ✅ Full-screen immersive lightbox view
- ✅ Swipe hint animation on first visit

### 0.3 Responsive Image Grid ✅
- ✅ Single-column on small screens, 2 columns on medium, 3+ on desktop
- ✅ Masonry layout respecting artwork aspect ratios
- ✅ Captions readable without truncation on small screens

### 0.4 Bottom Navigation Bar ✅
- ✅ Fixed bottom bar on mobile with icons + labels
- ✅ Active section highlighting
- ✅ Desktop top navbar only

### 0.5 Performance on Mobile Networks ✅
- ✅ `loading="lazy"` on all off-screen images
- ✅ Responsive srcset with multiple sizes (320w, 640w, 1024w)
- ✅ Loading skeleton/spinner while images load
- ✅ Progressive image loading (blurhash → sharp image)
- ✅ Service worker for offline caching (workbox)

### 0.6 Mobile-Specific Polish ✅
- ✅ Minimum 16px body text
- ✅ `<meta name="theme-color">` for browser chrome tinting
- ✅ PWA manifest with "Add to Home Screen" support
- ✅ Smooth scroll behavior

---

## Phase 1 — Visual Design & Theme (Priority: High) ✅

### 1.1 Custom DaisyUI Theme ✅
- ✅ Custom `gallery` (light) and `galleryDark` (dark) themes
- ✅ Warm earth tones, gallery-white backgrounds, accent gold
- ✅ Theme toggle in navbar

### 1.2 Typography Upgrade ✅
- ✅ Cormorant Garamond for headings (serif, gallery aesthetic)
- ✅ Inter for body text (clean sans-serif)
- ✅ Structured metadata: venue/year, artist statements in styled layout

### 1.3 Home Page Hero Redesign ✅
- ✅ Ken Burns animation on background image (slow zoom/pan)
- ✅ CTA buttons: "View Exhibitions" and "Working with Clay"
- ✅ Ambient gradient overlay

### 1.4 Footer ✅
- ✅ Copyright notice
- ✅ Quick navigation links
- ✅ Responsive layout

---

## Phase 2 — UX & Interaction Polish (Priority: High) ✅

### 2.1 Page Transitions & Animations ✅
- ✅ Route transitions via framer-motion AnimatedOutlet
- ✅ Staggered fade-in on portfolio cards (FadeIn component)
- ✅ Progressive image loading (blurhash → blur-up → sharp)

### 2.2 Carousel Improvements ✅
- ✅ Keyboard navigation (arrow keys, Escape)
- ✅ Touch/swipe support for mobile
- ✅ Auto-play with pause on hover
- ✅ Preload adjacent images
- ✅ CSS transitions between slides
- ✅ Fullscreen lightbox overlay
- ✅ Pinch-to-zoom on mobile
- ✅ Mouse-wheel navigation on desktop

### 2.3 Image Grid Enhancements ✅
- ✅ Masonry layout respecting aspect ratios
- ✅ Hover effects: zoom, overlay with "View" icon
- ✅ Lazy loading with intersection observer
- ✅ Search/filter with tag chips (medium, year)

### 2.4 Breadcrumb Navigation ✅
- ✅ Breadcrumbs on all portfolio pages

### 2.5 Desktop-Specific Polish ✅
- ✅ Hover states and cursor changes
- ✅ Widescreen layout optimizations (max-width containers)
- ✅ Mouse-wheel scrolling in carousel

---

## Phase 3 — Content & Data Architecture (Priority: Medium) ✅

### 3.1 Richer Data Model ✅
- ✅ Extended PortfolioDescription with venue, location, year, medium, artistStatement, reviews
- ✅ Auto-extracted color palettes per portfolio
- ✅ Blurhash placeholder strings per image

### 3.2 Move Data to JSON ✅
- ✅ Extracted to `exhibitions.json` and `working-with-clay.json`
- ✅ Imported via `resolveJsonModule`
- ✅ Automated enrichment script (`scripts/enrich-data.mjs`)

### 3.3 Image Optimization Pipeline ✅
- ✅ WebP conversion at build time (sharp)
- ✅ Responsive srcset with 320w, 640w, 1024w sizes
- ✅ Blurhash/LQIP placeholders for progressive loading
- ✅ `<picture>` elements with WebP `<source>` fallbacks
- ✅ Removed unused/duplicate images

### 3.4 Video Embed Modernization ✅
- ✅ Lazy facade pattern (zero iframe until click)
- ✅ Poster thumbnail support
- ✅ Auto-upgrade http→https
- ✅ Error fallback UI
- ✅ Preconnect hints for JW Platform domains

---

## Phase 4 — New Features (Priority: Medium)

### 4.1 Lightbox / Full-Screen Gallery ✅
- ✅ Overlay that dims page and centers artwork
- ✅ Click outside or Escape to close
- ✅ Share button for individual artworks

### 4.2 Timeline / Chronology View ✅
- ✅ Vertical timeline with exhibition milestones
- ✅ Thumbnails inline at each milestone
- ✅ Smooth scroll animation

### 4.3 Search & Filtering ✅
- ✅ Global search modal (Cmd/Ctrl+K)
- ✅ Filter chips (medium, year)
- ✅ Fuzzy search across names, captions, descriptions

### 4.4 "Related Works" Section ✅
- ✅ Same-category recommendations with medium-based relevance scoring
- ✅ "You Might Also Like" section with blurhash placeholders and WebP

### 4.5 Contact Form ⏭️
- ⏭️ Skipped per user request

### 4.6 Print-Friendly Portfolio View ✅
- ✅ Print button with clean paginated layout
- ✅ CSS `@media print` styles

---

## Phase 5 — Performance & SEO (Priority: Medium) ✅

### 5.1 Performance Optimizations ✅
- ✅ Code splitting with React.lazy + Suspense
- ✅ Image lazy loading (native + intersection observer)
- ✅ Preconnect to video embed domains
- ✅ Service worker / PWA (workbox, CacheFirst for fonts, StaleWhileRevalidate for images)
- ✅ Bundle analysis (rollup-plugin-visualizer)

### 5.2 SEO & Social Sharing ✅
- ✅ react-helmet-async for per-page title/meta
- ✅ Open Graph tags with portfolio thumbnails
- ✅ Structured data (JSON-LD) for Person, ArtGallery, VisualArtwork
- ✅ sitemap.xml generated at build time
- ✅ Canonical URLs

### 5.3 Accessibility Audit ✅
- ✅ Full keyboard navigation
- ✅ Screen reader support (alt text, ARIA labels, heading hierarchy)
- ✅ Color contrast WCAG AA verified
- ✅ Focus management on route changes
- ✅ Skip-to-content link
- ✅ Reduced motion preference (`prefers-reduced-motion`)

---

## Phase 6 — Developer Experience & Infrastructure (Priority: Low)

### 6.1 Testing ✅
- ✅ Unit tests: data helpers, utility functions (Vitest — 20 tests)
- ✅ Component tests: portfolio rendering, toast, search (Testing Library)
- ✅ E2E tests: Playwright with Chromium (12 tests)
- ⬜ Visual regression tests (Chromatic/Percy)

### 6.2 CI/CD ✅
- ✅ GitHub Actions: lint, test, build on every push (`ci.yml`)
- ✅ Auto deploy to GitHub Pages on merge to main (`deploy.yml`)
- ✅ Lighthouse CI for performance/accessibility scoring (`lighthouse.yml`)

### 6.3 Storybook ✅
- ✅ Storybook setup (React + Vite)
- ✅ Stories for ProgressiveImage, ArtworkImage, VideoEmbed, ColorPalette, Toast

### 6.4 Nx Libraries ⬜
- ⬜ Reorganize into `libs/shared/ui`, `libs/portfolio/data`, `libs/portfolio/feature`

### 6.5 Error Handling ✅
- ✅ Error boundaries around route sections
- ✅ 404 page for unknown routes
- ✅ Graceful fallback for broken images (placeholder icon)
- ✅ Toast notifications for errors

---

## Phase 7 — Creative / Experimental Ideas (Priority: Exploratory)

### 7.1 Ambient Background ✅
- ✅ Ambient gradient animation on home page
- ✅ CSS keyframes with dynamic color shifting

### 7.2 Virtual Gallery Walk ⬜
- ⬜ 3D panoramic view with Three.js
- ⬜ Click artworks on wall to enter detail view

### 7.3 Color Palette Extraction ✅
- ✅ Auto-extract dominant colors from portfolio cover images
- ✅ Display color swatches on portfolio pages
- ✅ Per-portfolio accent theming via palette data

### 7.4 Comparison Slider ✅
- ✅ Before/After detail comparison slider
- ✅ Drag to reveal zoomed detail vs full composition

### 7.5 Audio Commentary ⬜
- ⬜ Optional audio clips with play button on portfolio pages

### 7.6 Interactive Exhibition Map ✅
- ✅ Map view showing exhibition locations
- ✅ Click pins to jump to exhibition
- ✅ Leaflet.js with elegant styling

---

## Implementation History

| Sprint | Focus | Status |
|--------|-------|--------|
| **1** | Mobile-first: touch carousel, responsive grid, bottom nav, lazy loading, PWA manifest | ✅ |
| **2** | Visual polish: custom theme, typography, footer, home page CTA | ✅ |
| **3** | Carousel & grid: lightbox, masonry grid, hover effects | ✅ |
| **4** | Animations: route transitions, scroll animations, blur-up loading | ✅ |
| **5** | Content: enriched data model, SEO, accessibility, timeline | ✅ |
| **6** | Tests: Vitest unit tests, CI/CD pipelines | ✅ |
| **7** | Search, color palettes, ambient gradient, sitemap, masonry | ✅ |
| **8** | Exhibition map, comparison slider, search chips, print | ✅ |
| **9** | Lighthouse CI, route transitions, pinch-to-zoom, carousel auto-play | ✅ |
| **10** | Mouse-wheel nav, share button, swipe hint | ✅ |
| **11** | Additional polish and features | ✅ |
| **12** | PWA service worker, bundle visualizer, toast, Playwright E2E, broken image fallback | ✅ |
| **13** | JSON data extraction, image optimization pipeline, video facade, Storybook | ✅ |
| **14** | Blurhash/LQIP placeholders, cover blurhash, auto palettes, unused image cleanup, preconnect hints | ✅ |
| **15** | Enhanced Related Works (medium-based relevance, blurhash/WebP), carousel/video fixes | ✅ |

## Remaining Items

| Item | Phase | Priority |
|------|-------|----------|
| Visual regression tests (Chromatic/Percy) | 6.1 | Low |
| Nx Libraries reorganization | 6.4 | Low |
| Virtual Gallery Walk (Three.js) | 7.2 | Exploratory |
| Audio Commentary | 7.5 | Exploratory |

---

*This plan has been systematically implemented across 15 sprints, transforming the site from a faithful Angular-to-React port into a modern, gallery-quality web experience worthy of Linda's art.*
