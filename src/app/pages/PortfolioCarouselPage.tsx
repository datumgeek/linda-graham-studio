import { useParams, useNavigate } from 'react-router-dom';
import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { getImageUrl } from '../data/portfolio-data';

export function PortfolioCarouselPage() {
  const { slideIndex, listName: listNameParam, portfolioKey } = useParams<{
    slideIndex: string;
    listName: string;
    portfolioKey: string;
  }>();
  const { portfolio, listName } = usePortfolioContext();
  const navigate = useNavigate();

  const currentIndex = parseInt(slideIndex || '0', 10);
  const total = portfolio.images.length;
  const current = portfolio.images[currentIndex];

  if (!current) {
    return (
      <div className="text-center p-8">
        <p>No image found</p>
      </div>
    );
  }

  const goTo = (index: number) => {
    navigate(
      `/portfolio/${listNameParam}/${portfolioKey}/carousel/${index}`,
      { replace: true },
    );
  };

  const prev = () => goTo((currentIndex - 1 + total) % total);
  const next = () => goTo((currentIndex + 1) % total);

  const isVideo = !!current.videoLarge;
  const caption = current.imageCaption || current.videoCaption || '';

  return (
    <div className="relative flex flex-col items-center">
      {/* Slide area */}
      <div className="w-full bg-base-200 rounded-lg flex items-center justify-center relative"
           style={{ minHeight: 'calc(100vh - 14rem)' }}>
        {/* Prev button */}
        <button
          className="btn btn-circle btn-ghost absolute left-2 top-1/2 -translate-y-1/2 z-10"
          onClick={prev}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Content */}
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
            className="max-h-[calc(100vh-16rem)] max-w-full object-contain"
          />
        )}

        {/* Next button */}
        <button
          className="btn btn-circle btn-ghost absolute right-2 top-1/2 -translate-y-1/2 z-10"
          onClick={next}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Caption and counter */}
      <div className="text-center mt-4">
        <p className="font-medium">{caption}</p>
        <p className="text-sm opacity-60">
          {currentIndex + 1} / {total}
        </p>
      </div>
    </div>
  );
}
