import { Link, useParams } from 'react-router-dom';
import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { getImageUrl, toWebp } from '../data/portfolio-data';
import { FadeIn } from '../components/FadeIn';
import { ProgressiveImage } from '../components/ProgressiveImage';

export function PortfolioGridPage() {
  const { portfolio, listName } = usePortfolioContext();
  const { listName: listNameParam, portfolioKey } = useParams();

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{portfolio.portfolioName}</h2>
      {/* CSS-columns masonry layout — naturally adapts to varying image heights */}
      <div className="columns-2 sm:columns-3 md:columns-4 lg:columns-5 gap-2 sm:gap-4 [column-fill:_balance]">
        {portfolio.images.map((img, index) => (
          <FadeIn key={index} delay={index * 60}>
            <Link
              to={`/portfolio/${listNameParam}/${portfolioKey}/carousel/${index}`}
              className="group block mb-2 sm:mb-4 break-inside-avoid"
            >
              <div className="card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden">
                <figure className="p-1 sm:p-2 relative overflow-hidden">
                  <ProgressiveImage
                    src={getImageUrl(listName, portfolio.portfolio, img.imageSmall)}
                    webpSrc={getImageUrl(listName, portfolio.portfolio, toWebp(img.imageSmall))}
                    alt={img.imageCaption || img.videoCaption || ''}
                    className="rounded-lg w-full object-cover
                               transition-transform duration-300 group-hover:scale-105"
                  />
                  {/* Hover overlay — desktop only */}
                  <div className="absolute inset-0 m-1 sm:m-2 rounded-lg bg-black/0 group-hover:bg-black/20
                                  transition-colors duration-300 flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-8 w-8 text-white opacity-0 group-hover:opacity-80 transition-opacity duration-300 drop-shadow-lg"
                      fill="none" viewBox="0 0 24 24" stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                  </div>
                </figure>
                <div className="card-body p-2 pt-0">
                  <p className="text-xs sm:text-sm text-center line-clamp-2">
                    {img.imageCaption || img.videoCaption}
                  </p>
                </div>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
