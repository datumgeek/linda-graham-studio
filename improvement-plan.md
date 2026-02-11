# Linda Graham Studio — Improvement Plan

> A roadmap for evolving this artist portfolio from a functional migration into a polished, performant, and delightful web experience.

---

## Phase 0 — Mobile-First Phone Experience (Priority: Highest)

Artist portfolios are frequently browsed on phones — shared via text, discovered on social media, viewed at gallery openings. The phone experience must be first-class, not an afterthought.

### 0.1 Mobile Viewport & Layout Audit
- Test every page on real device sizes (375px, 390px, 414px) using Chrome DevTools and physical devices
- Fix any overflow, horizontal scroll, or clipped content issues
- Ensure the navbar hamburger menu works flawlessly (open, close, navigate, auto-close on route change)
- Verify all touch targets are at least 44×44px (Apple HIG / WCAG 2.5.5)

### 0.2 Touch-Optimized Carousel
- Add **swipe gesture support** (left/right) using touch events or a library like `use-gesture`
- Make prev/next buttons larger and easier to thumb-tap
- Enable **pinch-to-zoom** on artwork images so users can examine detail
- Hide browser chrome and navbar in carousel for a true full-screen immersive view
- Show swipe hint animation on first visit (subtle bouncing arrow)

### 0.3 Responsive Image Grid
- Switch to a **single-column layout on small screens** with larger thumbnails
- Use **2 columns on medium phones** (≥390px), 3 on tablets
- Ensure captions are readable without truncation on small screens
- Add pull-to-refresh feel when returning to grid from carousel

### 0.4 Bottom Navigation Bar
- On mobile, move primary navigation to a **fixed bottom bar** (thumb-friendly zone)
- Icons + labels for: Home, Exhibitions, Clay, About
- Keep the top navbar for desktop only
- Highlight active section

### 0.5 Performance on Mobile Networks
- Add `loading="lazy"` to all images not in the initial viewport
- Serve appropriately sized images (don't send 750px images to a 375px screen)
- Minimize JavaScript bundle — target <100KB gzipped for initial load
- Add a loading skeleton/spinner while portfolio data and images load
- Test on throttled 3G in DevTools to ensure acceptable load times (<3s FCP)

### 0.6 Mobile-Specific Polish
- Ensure text is readable without pinching (minimum 16px body text)
- Add `<meta name="theme-color">` for browser chrome tinting
- Configure `manifest.json` so the site can be "Add to Home Screen" as a PWA
- Prevent accidental double-tap zoom on interactive elements
- Smooth scroll behavior on iOS Safari (address `-webkit-overflow-scrolling`)

---

## Phase 1 — Visual Design & Theme (Priority: High)

### 1.1 Custom DaisyUI Theme
The app currently uses the default DaisyUI theme, which feels generic for an artist's portfolio. Create a bespoke theme in `styles.css` that reflects Linda's aesthetic — warm earth tones, gallery-white backgrounds, and elegant typography.

- Define a custom DaisyUI theme with curated colors (warm neutrals, deep charcoal text, accent gold or terracotta)
- Support both light and dark themes (dark mode = "gallery at night" feel with dark walls and spotlit artwork)
- Add a theme toggle to the navbar

### 1.2 Typography Upgrade
- Add a display/serif font for headings (e.g., Playfair Display, Cormorant Garamond) to evoke fine-art gallery aesthetics
- Use a clean sans-serif for body text (Inter, Source Sans)
- Improve text hierarchy: exhibition venue/year as subtle metadata, artist statements in styled blockquotes

### 1.3 Home Page Hero Redesign
The current hero is minimal (title + "Studio"). Enhance it:
- Add a subtle Ken Burns animation (slow zoom/pan) on the background image
- Overlay a tagline or rotating exhibition highlight
- Add call-to-action buttons: "View Exhibitions" and "Working with Clay"
- Consider a parallax scroll effect into a featured works section below the fold

### 1.4 Footer
There is no footer. Add one with:
- Copyright notice
- Social links (if applicable)
- Quick navigation links
- "Built with React + DaisyUI" attribution (optional)

---

## Phase 2 — UX & Interaction Polish (Priority: High)

### 2.1 Page Transitions & Animations
- Add fade/slide transitions between routes using `framer-motion` or `react-transition-group`
- Animate portfolio cards on scroll (stagger fade-in)
- Smooth image loading transitions (blur-up placeholder → sharp image)

### 2.2 Carousel Improvements
The current carousel is basic (prev/next buttons, full-page reload per slide). Major upgrades:
- **Keyboard navigation**: arrow keys, Escape to close
- **Touch/swipe support** for mobile
- **Auto-play** with pause on hover
- **Thumbnail strip** below the main image (filmstrip navigation)
- **Preload adjacent images** for instant transitions
- **CSS transitions** between slides (fade or slide animation)
- **Fullscreen mode** (lightbox overlay that hides the navbar)
- **Pinch-to-zoom** on mobile for artwork detail

### 2.3 Image Grid Enhancements
- Replace fixed-height grid with a **masonry layout** that respects artwork aspect ratios
- Add **hover effects**: subtle zoom, overlay with artwork title, "View" icon
- **Lazy loading** with intersection observer for grids with many images
- Optional **filter/sort** (by medium, year, etc. — requires enriching data model)

### 2.4 Breadcrumb Navigation
Add breadcrumbs above portfolio views so users always know where they are:
`Home > Exhibitions > Natural Selection > Grid`

### 2.5 Desktop-Specific Polish
- Hover states and cursor changes on interactive elements
- Widescreen layout optimizations (max-width containers, centered content)
- Mouse-wheel scrolling in carousel

> **Note:** Core mobile experience is covered in Phase 0. Phase 2 focuses on desktop-specific refinements.

---

## Phase 3 — Content & Data Architecture (Priority: Medium)

### 3.1 Richer Data Model
The current `PortfolioDescription` is just a title + flat paragraph array. Enrich it:
```typescript
interface PortfolioDescription {
  title: string;
  venue?: string;
  location?: string;
  year?: number;
  artistStatement?: string;
  curatorStatement?: string;
  medium?: string;
  dimensions?: string;
  reviews?: { author: string; publication: string; excerpt: string; url?: string }[];
}
```
This enables structured display — metadata cards, timeline views, etc.

### 3.2 Move Data to JSON/CMS
Portfolio data is hardcoded in TypeScript. Consider:
- **Short-term**: Move to `.json` files that are imported (easier for non-developers to edit)
- **Long-term**: Headless CMS (Contentful, Sanity, Strapi) so Linda can manage content herself
- **Alternative**: Markdown files with frontmatter, processed at build time

### 3.3 Image Optimization Pipeline
Current images are served as-is from the original site (various sizes, no modern formats). Add:
- **WebP/AVIF conversion** at build time (Vite plugin or a script using `sharp`)
- **Responsive `srcset`** with multiple sizes per image
- **Blur placeholder hashes** (blurhash or LQIP) for progressive loading
- **Proper `<picture>` elements** with format fallbacks
- Remove unused/duplicate images from `public/images`

### 3.4 Video Embed Modernization
Videos currently use JWPlatform `<iframe>` embeds (potentially defunct links). Consider:
- Audit which video URLs still work
- Re-host on YouTube/Vimeo and use a lightweight embed component (e.g., `lite-youtube-embed` pattern)
- Add a video player component with poster frames
- Support self-hosted MP4 with the HTML5 `<video>` element

---

## Phase 4 — New Features (Priority: Medium)

### 4.1 Lightbox / Full-Screen Gallery
Replace the carousel-in-a-container with a true lightbox experience:
- Overlay that dims the page and centers the artwork
- Click outside or press Escape to close
- Track scroll position and return to it on close
- Share button for individual artworks

### 4.2 Timeline / Chronology View
New page that shows Linda's artistic journey chronologically:
- Vertical timeline with exhibition milestones
- Thumbnails inline at each milestone
- Smooth scroll animation
- Great for the About/Bio section

### 4.3 Search & Filtering
- Global search across portfolio names, captions, descriptions
- Filter exhibitions by year range
- Tag-based filtering (medium: clay, plexiglass, acrylic, projection)

### 4.4 "Related Works" Section
On each portfolio home page, show related portfolios:
- Same category (exhibitions/clay)
- Similar medium or era
- "You might also like" section

### 4.5 Contact Form
Replace static contact info with an interactive form:
- Name, email, message fields
- Integration with Formspree, Netlify Forms, or a serverless function
- CAPTCHA/honeypot for spam protection
- Success/error feedback with DaisyUI alerts

### 4.6 Print-Friendly Portfolio View
- Add a "Print Portfolio" button that renders a clean, paginated layout
- CSS `@media print` styles
- Useful for gallery submissions

---

## Phase 5 — Performance & SEO (Priority: Medium)

### 5.1 Performance Optimizations
- **Code splitting**: lazy-load page components with `React.lazy` + `Suspense`
- **Image lazy loading**: native `loading="lazy"` on all `<img>` tags
- **Preconnect** to video embed domains
- **Service worker / PWA** for offline gallery browsing
- **Bundle analysis** with `npx nx build` + rollup-plugin-visualizer

### 5.2 SEO & Social Sharing
- Add `react-helmet-async` for per-page `<title>` and `<meta>` tags
- Open Graph tags with portfolio thumbnail for social sharing
- Structured data (JSON-LD) for Person, ArtGallery, VisualArtwork schemas
- Generate a `sitemap.xml` at build time
- Add canonical URLs

### 5.3 Accessibility Audit
- Full keyboard navigation testing
- Screen reader testing (alt text, ARIA labels, heading hierarchy)
- Color contrast verification against WCAG AA
- Focus management on route changes
- Skip-to-content link
- Reduced motion preference (`prefers-reduced-motion`)

---

## Phase 6 — Developer Experience & Infrastructure (Priority: Low)

### 6.1 Testing
- **Unit tests**: data helpers, utility functions (Vitest)
- **Component tests**: portfolio card rendering, carousel nav logic (Testing Library)
- **Visual regression tests**: Chromatic or Percy snapshots of key pages
- **E2e tests**: Playwright or Cypress for critical user flows

### 6.2 CI/CD
- GitHub Actions workflow for lint, test, build on every PR
- Automatic deploy to Vercel/Netlify/GitHub Pages on merge to `main`
- Lighthouse CI for automated performance/accessibility scoring

### 6.3 Storybook
- Add Storybook for component development and documentation
- Stories for Navbar, PortfolioCard, CarouselSlide, PortfolioNav
- Enables visual iteration without navigating the full app

### 6.4 Nx Libraries
Leverage Nx workspace structure to organize code into libraries:
- `libs/shared/ui` — generic UI components (Lightbox, ImageCard, VideoEmbed)
- `libs/portfolio/data` — portfolio data model, helpers, and (eventually) API integration
- `libs/portfolio/feature` — portfolio feature components
- This enables code reuse if additional apps are added to the workspace

### 6.5 Error Handling
- Add error boundaries around route sections
- 404 page for unknown routes
- Graceful fallback for broken images (placeholder artwork icon)
- Toast notifications for errors (DaisyUI toast component)

---

## Phase 7 — Creative / Experimental Ideas (Priority: Exploratory)

### 7.1 Ambient Background
- Subtle animated background on the home page (floating particles, gradient shift, or generative art inspired by Linda's work)
- Use CSS `@keyframes` or a lightweight canvas library

### 7.2 Virtual Gallery Walk
- 3D panoramic view of an exhibition space using Three.js or a simple pannable photo
- Click artworks on the wall to enter their detail view
- Very "wow factor" for an artist portfolio

### 7.3 Color Palette Extraction
- Automatically extract dominant colors from each artwork thumbnail
- Use them as accent colors in the portfolio card, creating a dynamic per-portfolio theme
- Display color swatches alongside artwork info

### 7.4 Comparison Slider
- "Before/After" or detail comparison slider on artwork images
- Drag to reveal zoomed detail vs. full composition
- Great for showcasing texture and technique in clay work

### 7.5 Audio Commentary
- Attach optional audio clips where Linda discusses a piece or exhibition
- Small play button on portfolio home pages
- Adds a deeply personal, gallery-tour feel

### 7.6 Interactive Artist's Statement Map
- Map view showing exhibition locations (Denver International Airport, Ice Cube Gallery, RMCAD, Hinterland)
- Click pins to jump to that exhibition
- Leaflet.js or Mapbox with minimal, elegant styling

---

## Suggested Implementation Order

| Sprint | Focus | Key Deliverables |
|--------|-------|-------------------|
| **1** | **Mobile-first** | **Touch carousel, responsive grid, bottom nav, lazy loading, PWA manifest** |
| 2 | Visual polish | Custom theme, typography, footer, home page CTA buttons |
| 3 | Carousel & grid | Keyboard nav, lightbox, masonry grid, hover effects |
| 4 | Animations & transitions | Page transitions, scroll animations, image blur-up loading |
| 5 | Content & images | Image optimization pipeline, richer data model, video audit |
| 6 | SEO & accessibility | Meta tags, structured data, a11y audit, skip links |
| 7 | New features | Contact form, breadcrumbs, timeline view, search |
| 8 | Infrastructure | Tests, CI/CD, Storybook, error boundaries |
| 9 | Experimental | Color extraction, ambient background, virtual gallery |

---

*This plan transforms the site from a faithful Angular-to-React port into a modern, gallery-quality web experience worthy of Linda's art.*
