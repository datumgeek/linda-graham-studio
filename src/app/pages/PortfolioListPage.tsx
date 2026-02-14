import { useParams, Link } from 'react-router-dom';
import {
  portfolios,
  portfolioListLabels,
  type PortfolioListName,
  getPortfolioThumbUrl,
  toWebp,
} from '../data/portfolio-data';
import { FadeIn } from '../components/FadeIn';
import { ProgressiveImage } from '../components/ProgressiveImage';
import { SEO } from '../components/SEO';

export function PortfolioListPage() {
  const { listName } = useParams<{ listName: string }>();
  const list = portfolios[listName as PortfolioListName];

  if (!list) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold">Portfolio not found</h1>
      </div>
    );
  }

  const label = portfolioListLabels[listName as PortfolioListName];

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <SEO
        title={label}
        description={`Browse ${label.toLowerCase()} by artist Linda Graham.`}
        path={`/portfolio/${listName}`}
      />
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">{label}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {list.map((portfolio, index) => (
          <FadeIn key={portfolio.portfolio} delay={index * 80}>
            <Link
              to={`/portfolio/${listName}/${portfolio.portfolio}`}
              className="group card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            >
              <figure className="overflow-hidden">
                <ProgressiveImage
                  src={getPortfolioThumbUrl(
                    listName as PortfolioListName,
                    portfolio.portfolio,
                    portfolio.portfolioImage,
                  )}
                  webpSrc={getPortfolioThumbUrl(
                    listName as PortfolioListName,
                    portfolio.portfolio,
                    toWebp(portfolio.portfolioImage),
                  )}
                  alt={portfolio.portfolioName}
                  className="w-full h-44 sm:h-48 object-cover transition-transform duration-300
                             group-hover:scale-105"
                />
              </figure>
              <div className="card-body p-3 sm:p-4">
                <h2 className="card-title text-sm sm:text-base">{portfolio.portfolioName}</h2>
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
