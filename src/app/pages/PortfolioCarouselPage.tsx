import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState, useRef } from 'react';
import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { getImageUrl, toWebp } from '../data/portfolio-data';
import { useSwipe } from '../hooks/useSwipe';
import { Lightbox } from '../components/Lightbox';
import { VideoEmbed } from '../components/VideoEmbed';
import { ComparisonSlider } from '../components/ComparisonSlider';
import { ArtworkImage } from '../components/ArtworkImage';

export function PortfolioCarouselPage() {
  const { slideIndex, listName: listNameParam, portfolioKey } = useParams<{
    slideIndex: string;
    listName: string;
    portfolioKey: string;
  }>();
  const { portfolio, listName } = usePortfolioContext();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [compareMode, setCompareMode] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);
  const [showSwipeHint, setShowSwipeHint] = useState(false);
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Show swipe hint on first carousel visit (mobile only)
  useEffect(() => {
    const key = 'lg-swipe-hint-seen';
    if (!localStorage.getItem(key) && 'ontouchstart' in window) {
      setShowSwipeHint(true);
      localStorage.setItem(key, '1');
      const timer = setTimeout(() => setShowSwipeHint(false), 3000);
      return () => clearTimeout(timer);
    }
  }, []);

  const currentIndex = parseInt(slideIndex || '0', 10);
  const total = portfolio.images.length;
  const current = portfolio.images[currentIndex];

  const goTo = useCallback(
    (index: number) => {
      setIsTransitioning(true);
      setTimeout(() => {
        navigate(
          `/portfolio/${listNameParam}/${portfolioKey}/carousel/${index}`,
          { replace: true },
        );
        setTimeout(() => setIsTransitioning(false), 50);
      }, 150);
    },
    [navigate, listNameParam, portfolioKey],
  );

  const prev = useCallback(
    () => goTo((currentIndex - 1 + total) % total),
    [goTo, currentIndex, total],
  );
  const next = useCallback(
    () => goTo((currentIndex + 1) % total),
    [goTo, currentIndex, total],
  );

  // Keyboard navigation (only when lightbox is closed — lightbox handles its own)
  useEffect(() => {
    if (lightboxOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [prev, next, lightboxOpen]);

  // Preload adjacent images
  useEffect(() => {
    const preloadIndices = [
      (currentIndex + 1) % total,
      (currentIndex - 1 + total) % total,
    ];
    preloadIndices.forEach((i) => {
      const img = portfolio.images[i];
      if (img?.imageLarge) {
        const preload = new Image();
        preload.src = getImageUrl(listName, portfolio.portfolio, img.imageLarge);
      }
    });
  }, [currentIndex, total, portfolio, listName]);

  // Reset compare mode on slide change
  useEffect(() => {
    setCompareMode(false);
  }, [currentIndex]);

  // Auto-play: advance every 4 seconds
  useEffect(() => {
    if (autoPlay && !lightboxOpen && !compareMode) {
      autoPlayRef.current = setInterval(() => {
        next();
      }, 4000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [autoPlay, lightboxOpen, compareMode, next]);

  // Mouse-wheel navigation (desktop)
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    let wheelCooldown = false;
    const handler = (e: WheelEvent) => {
      if (wheelCooldown || lightboxOpen) return;
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 30) return;
      e.preventDefault();
      wheelCooldown = true;
      if (delta > 0) next();
      else prev();
      setTimeout(() => { wheelCooldown = false; }, 400);
    };
    el.addEventListener('wheel', handler, { passive: false });
    return () => el.removeEventListener('wheel', handler);
  }, [next, prev, lightboxOpen]);

  // Swipe gestures
  const swipeHandlers = useSwipe({
    onSwipeLeft: next,
    onSwipeRight: prev,
    threshold: 40,
  });

  if (!current) {
    return (
      <div className="text-center p-8">
        <p>No image found</p>
      </div>
    );
  }

  const isVideo = !!current.videoLarge;
  const caption = current.imageCaption || current.videoCaption || '';
  const hasCompare = !isVideo && current.imageSmall && current.imageLarge;

  return (
    <div ref={containerRef} className="relative flex flex-col items-center select-none">
      {/* Compare slider (replaces carousel when active) */}
      {compareMode && hasCompare ? (
        <div className="w-full max-w-3xl px-2">
          <ComparisonSlider
            leftSrc={getImageUrl(listName, portfolio.portfolio, current.imageSmall)}
            rightSrc={getImageUrl(listName, portfolio.portfolio, current.imageLarge!)}
            leftLabel="Thumbnail"
            rightLabel="Full Detail"
            alt={caption}
            className="shadow-xl"
          />
        </div>
      ) : (
      <div
        className="w-full bg-base-200 rounded-lg flex items-center justify-center relative overflow-hidden touch-pan-y"
        style={{ minHeight: 'calc(100vh - 14rem)' }}
        {...swipeHandlers}
      >
        {/* Prev button */}
        <button
          className="btn btn-circle btn-ghost absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 sm:w-10 sm:h-10 min-h-0"
          onClick={prev}
          aria-label="Previous slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content with fade transition */}
        <div
          className={`transition-opacity duration-150 ease-in-out ${
            isTransitioning ? 'opacity-0' : 'opacity-100'
          }`}
        >
          {isVideo ? (
            <VideoEmbed
              src={current.videoLarge!}
              title={caption}
              posterSrc={getImageUrl(listName, portfolio.portfolio, current.imageSmall)}
              className="w-full max-w-3xl aspect-video"
            />
          ) : (
            <ArtworkImage
              src={getImageUrl(listName, portfolio.portfolio, current.imageLarge!)}
              webpSrc={getImageUrl(listName, portfolio.portfolio, toWebp(current.imageLarge!))}
              alt={caption}
              className="max-h-[calc(100vh-16rem)] max-w-full object-contain cursor-zoom-in"
              fallbackClassName="w-64 h-48"
              draggable={false}
              onClick={() => setLightboxOpen(true)}
            />
          )}
        </div>

        {/* Next button */}
        <button
          className="btn btn-circle btn-ghost absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 z-10
                     w-12 h-12 sm:w-10 sm:h-10 min-h-0"
          onClick={next}
          aria-label="Next slide"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>

        {/* Swipe hint overlay (first visit, mobile) */}
        {showSwipeHint && (
          <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
            <div className="bg-black/60 text-white rounded-full px-5 py-3 flex items-center gap-2 animate-bounce">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
              </svg>
              <span className="text-sm font-medium">Swipe to navigate</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </div>
          </div>
        )}
      </div>
      )}

      {/* Control buttons */}
      <div className="flex gap-2 mt-2">
        {/* Auto-play toggle */}
        <button
          onClick={() => setAutoPlay((a) => !a)}
          className={`btn btn-sm gap-1 ${autoPlay ? 'btn-accent' : 'btn-ghost'}`}
          aria-label={autoPlay ? 'Pause auto-play' : 'Start auto-play'}
          title="Auto-advance slides every 4 seconds"
        >
          {autoPlay ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
          {autoPlay ? 'Pause' : 'Auto-Play'}
        </button>

        {/* Compare toggle */}
        {hasCompare && (
          <button
            onClick={() => setCompareMode((m) => !m)}
            className={`btn btn-sm gap-1 ${compareMode ? 'btn-primary' : 'btn-ghost'}`}
            aria-label={compareMode ? 'Exit comparison view' : 'Compare thumbnail vs detail'}
            title="Compare thumbnail vs full detail"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
            {compareMode ? 'Back to Slideshow' : 'Compare Detail'}
          </button>
        )}
      </div>

      {/* Caption, counter & thumbnail strip */}
      <div className="text-center mt-3 w-full px-2">
        <p className="font-medium text-sm sm:text-base">{caption}</p>
        <div className="flex items-center justify-center gap-3 text-xs sm:text-sm opacity-60 mb-3">
          <span>{currentIndex + 1} / {total}</span>
          <button
            className="btn btn-ghost btn-xs gap-1 opacity-70 hover:opacity-100"
            onClick={async () => {
              const url = window.location.href;
              if (navigator.share) {
                try {
                  await navigator.share({ title: caption || portfolio.portfolioName, url });
                } catch { /* user cancelled */ }
              } else {
                await navigator.clipboard.writeText(url);
                // Brief visual feedback
                const btn = document.activeElement as HTMLButtonElement;
                const orig = btn?.textContent;
                if (btn) { btn.textContent = 'Copied!'; setTimeout(() => { btn.textContent = orig ?? 'Share'; }, 1500); }
              }
            }}
            aria-label="Share this artwork"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
            </svg>
            Share
          </button>
        </div>

        {/* Thumbnail strip */}
        <div className="flex gap-1.5 overflow-x-auto pb-2 justify-center">
          {portfolio.images.map((img, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`shrink-0 rounded overflow-hidden border-2 transition-all duration-200 ${
                i === currentIndex
                  ? 'border-primary scale-105 shadow-md'
                  : 'border-transparent opacity-60 hover:opacity-100'
              }`}
              aria-label={`Go to slide ${i + 1}`}
            >
              <picture>
                <source
                  srcSet={getImageUrl(listName, portfolio.portfolio, toWebp(img.imageSmall))}
                  type="image/webp"
                />
                <img
                  src={getImageUrl(listName, portfolio.portfolio, img.imageSmall)}
                  alt={img.imageCaption || img.videoCaption || ''}
                  className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                  loading="lazy"
                />
              </picture>
            </button>
          ))}
        </div>
      </div>

      {/* Keyboard hint */}
      <p className="hidden sm:block text-xs opacity-40 mt-2">
        Use arrow keys to navigate &middot; Click image for fullscreen
      </p>

      {/* Lightbox overlay */}
      {!isVideo && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          onPrev={prev}
          onNext={next}
          caption={caption}
          counter={`${currentIndex + 1} / ${total}`}
        >
          <picture>
            <source
              srcSet={getImageUrl(listName, portfolio.portfolio, toWebp(current.imageLarge!))}
              type="image/webp"
            />
            <img
              src={getImageUrl(listName, portfolio.portfolio, current.imageLarge!)}
              alt={caption}
              className="max-h-[90vh] max-w-[95vw] object-contain select-none"
              draggable={false}
            />
          </picture>
        </Lightbox>
      )}
    </div>
  );
}
