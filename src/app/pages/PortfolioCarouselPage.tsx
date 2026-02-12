import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useCallback, useState } from 'react';
import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { getImageUrl } from '../data/portfolio-data';
import { useSwipe } from '../hooks/useSwipe';
import { Lightbox } from '../components/Lightbox';

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

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Slide area */}
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
            <iframe
              src={current.videoLarge}
              className="w-full max-w-3xl aspect-video rounded"
              allowFullScreen
              title={caption}
            />
          ) : (
            <img
              src={getImageUrl(listName, portfolio.portfolio, current.imageLarge!)}
              alt={caption}
              className="max-h-[calc(100vh-16rem)] max-w-full object-contain cursor-zoom-in"
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
      </div>

      {/* Caption, counter & thumbnail strip */}
      <div className="text-center mt-3 w-full px-2">
        <p className="font-medium text-sm sm:text-base">{caption}</p>
        <p className="text-xs sm:text-sm opacity-60 mb-3">
          {currentIndex + 1} / {total}
        </p>

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
              <img
                src={getImageUrl(listName, portfolio.portfolio, img.imageSmall)}
                alt={img.imageCaption || img.videoCaption || ''}
                className="w-12 h-12 sm:w-14 sm:h-14 object-cover"
                loading="lazy"
              />
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
          <img
            src={getImageUrl(listName, portfolio.portfolio, current.imageLarge!)}
            alt={caption}
            className="max-h-[90vh] max-w-[95vw] object-contain select-none"
            draggable={false}
          />
        </Lightbox>
      )}
    </div>
  );
}
