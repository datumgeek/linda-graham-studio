import { useCallback, useMemo, Suspense, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  portfolios,
  getImageUrl,
  getPortfolioThumbUrl,
  type PortfolioListName,
} from '../data/portfolio-data';
import { FadeIn } from '../components/FadeIn';
import { SEO } from '../components/SEO';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { GalleryScene, type ArtworkEntry } from '../components/GalleryScene';
import { Lightbox } from '../components/Lightbox';

function buildArtworks(): ArtworkEntry[] {
  const entries: ArtworkEntry[] = [];

  for (const listName of Object.keys(portfolios) as PortfolioListName[]) {
    for (const p of portfolios[listName]) {
      // Find the first image entry that has an actual image (skip video-only entries)
      const imageEntry = p.images?.find(
        (img) => img.imageLarge || (img.imageSmall && !img.videoLarge),
      );
      const bestFile =
        imageEntry?.imageLarge ?? imageEntry?.imageSmall ?? p.portfolioImage;
      const imageUrl = getImageUrl(listName, p.portfolio, bestFile);

      entries.push({
        listName,
        portfolio: p,
        imageUrl,
        label: p.portfolioName,
      });
    }
  }

  return entries;
}

function detectWebGL(): boolean {
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    return gl instanceof WebGLRenderingContext || gl instanceof WebGL2RenderingContext;
  } catch {
    return false;
  }
}

function GalleryFallback({ artworks }: { artworks: ArtworkEntry[] }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-base-200 p-6 text-center">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-base-content/30 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
      <h2 className="text-xl font-serif font-semibold mb-2">3D Gallery Unavailable</h2>
      <p className="text-sm text-base-content/60 mb-4 max-w-md">
        The virtual gallery requires WebGL, which isn't available in your browser.
        Try using a recent version of Chrome, Firefox, or Edge, or enable hardware acceleration.
      </p>
      <div className="divider text-xs text-base-content/40">Browse artwork below</div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 w-full max-w-3xl overflow-y-auto max-h-[50vh]">
        {artworks.map((a) => (
          <Link
            key={a.portfolio.portfolio}
            to={`/portfolio/${a.listName}/${a.portfolio.portfolio}`}
            className="group rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-base-100"
          >
            <img
              src={a.imageUrl}
              alt={a.label}
              loading="lazy"
              className="w-full aspect-[4/3] object-cover group-hover:scale-105 transition-transform"
            />
            <p className="text-xs p-2 truncate text-base-content/70">{a.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

function GalleryErrorFallback() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-base-200 p-6 text-center">
      <div className="text-5xl mb-4 opacity-30">⚠</div>
      <h2 className="text-xl font-serif font-semibold mb-2">Gallery failed to load</h2>
      <p className="text-sm text-base-content/60 mb-4">
        An error occurred while loading the 3D gallery.
      </p>
      <button className="btn btn-primary btn-sm" onClick={() => window.location.reload()}>
        Reload Page
      </button>
    </div>
  );
}

export function GalleryWalkPage() {
  const navigate = useNavigate();
  const artworks = useMemo(() => buildArtworks(), []);
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  useEffect(() => {
    setWebGLSupported(detectWebGL());
  }, []);

  const handleArtworkClick = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prevArtwork = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i - 1 + artworks.length) % artworks.length : null,
      ),
    [artworks.length],
  );

  const nextArtwork = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? (i + 1) % artworks.length : null,
      ),
    [artworks.length],
  );

  const currentArtwork = lightboxIndex !== null ? artworks[lightboxIndex] : null;

  return (
    <>
      <SEO
        title="Virtual Gallery | Linda Graham Studio"
        description="Walk through a virtual 3D gallery showcasing Linda Graham's ceramic art exhibitions and clay works."
        path="/gallery"
      />

      <FadeIn className="flex flex-col h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] pb-16 sm:pb-0">
        {/* Header */}
        <div className="px-4 pt-4 pb-2 sm:px-6">
          <nav className="text-sm breadcrumbs mb-2" aria-label="Breadcrumb">
            <ul>
              <li>
                <a href={`${import.meta.env.BASE_URL}`}>Home</a>
              </li>
              <li>Virtual Gallery</li>
            </ul>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-base-content">
            Virtual Gallery
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Explore Linda Graham's artwork in an immersive 3D gallery space
          </p>
        </div>

        {/* 3D Scene */}
        <div className="flex-1 relative min-h-0">
          {webGLSupported === null ? (
            <div className="w-full h-full flex items-center justify-center bg-base-200">
              <span className="loading loading-spinner loading-lg text-primary" />
            </div>
          ) : webGLSupported === false ? (
            <GalleryFallback artworks={artworks} />
          ) : (
            <ErrorBoundary fallback={<GalleryErrorFallback />}>
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center bg-base-200">
                    <div className="text-center">
                      <span className="loading loading-spinner loading-lg text-primary" />
                      <p className="mt-4 text-sm text-base-content/60">
                        Loading gallery...
                      </p>
                    </div>
                  </div>
                }
              >
                <GalleryScene
                  artworks={artworks}
                  onArtworkClick={handleArtworkClick}
                />
              </Suspense>
            </ErrorBoundary>
          )}
        </div>
      </FadeIn>

      {/* Fullscreen lightbox for clicked artwork */}
      <Lightbox
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        onPrev={prevArtwork}
        onNext={nextArtwork}
        caption={currentArtwork?.label}
        counter={currentArtwork ? `${lightboxIndex! + 1} / ${artworks.length}` : undefined}
      >
        {currentArtwork && (
          <img
            src={currentArtwork.imageUrl}
            alt={currentArtwork.label}
            className="w-full h-full object-contain select-none"
            draggable={false}
          />
        )}
      </Lightbox>
    </>
  );
}

export default GalleryWalkPage;
