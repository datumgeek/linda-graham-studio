import { Link, useParams } from 'react-router-dom';
import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { getImageUrl } from '../data/portfolio-data';

export function PortfolioGridPage() {
  const { portfolio, listName } = usePortfolioContext();
  const { listName: listNameParam, portfolioKey } = useParams();

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold mb-4">{portfolio.portfolioName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 sm:gap-4">
        {portfolio.images.map((img, index) => (
          <Link
            key={index}
            to={`/portfolio/${listNameParam}/${portfolioKey}/carousel/${index}`}
            className="group card bg-base-100 shadow-sm hover:shadow-lg transition-all duration-300"
          >
            <figure className="p-1 sm:p-2 relative overflow-hidden">
              <img
                src={getImageUrl(listName, portfolio.portfolio, img.imageSmall)}
                alt={img.imageCaption || img.videoCaption || ''}
                className="rounded-lg w-full h-32 sm:h-40 object-cover
                           transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
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
          </Link>
        ))}
      </div>
    </div>
  );
}
