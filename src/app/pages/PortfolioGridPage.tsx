import { Link, useParams } from 'react-router-dom';
import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { getImageUrl } from '../data/portfolio-data';

export function PortfolioGridPage() {
  const { portfolio, listName } = usePortfolioContext();
  const { listName: listNameParam, portfolioKey } = useParams();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">{portfolio.portfolioName}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {portfolio.images.map((img, index) => (
          <Link
            key={index}
            to={`/portfolio/${listNameParam}/${portfolioKey}/carousel/${index}`}
            className="card bg-base-100 shadow-sm hover:shadow-lg transition-shadow"
          >
            <figure className="p-2">
              <img
                src={getImageUrl(listName, portfolio.portfolio, img.imageSmall)}
                alt={img.imageCaption || img.videoCaption || ''}
                className="rounded-lg w-full h-40 object-cover"
              />
            </figure>
            <div className="card-body p-2 pt-0">
              <p className="text-xs text-center truncate">
                {img.imageCaption || img.videoCaption}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
