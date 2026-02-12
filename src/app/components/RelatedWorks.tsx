import { Link } from 'react-router-dom';
import {
  portfolios,
  getPortfolioThumbUrl,
  type Portfolio,
  type PortfolioListName,
} from '../data/portfolio-data';
import { FadeIn } from './FadeIn';

interface RelatedWorksProps {
  /** Current portfolio key to exclude from suggestions */
  currentKey: string;
  /** Current list name for same-category matching */
  currentListName: PortfolioListName;
  /** Max items to show */
  max?: number;
}

export function RelatedWorks({
  currentKey,
  currentListName,
  max = 3,
}: RelatedWorksProps) {
  // Gather candidates: same category first, then other category
  const sameCategory = portfolios[currentListName].filter(
    (p) => p.portfolio !== currentKey,
  );
  const otherListName: PortfolioListName =
    currentListName === 'exhibitions' ? 'workingWithClay' : 'exhibitions';
  const otherCategory = portfolios[otherListName];

  const candidates: { portfolio: Portfolio; listName: PortfolioListName }[] = [
    ...sameCategory.map((p) => ({ portfolio: p, listName: currentListName })),
    ...otherCategory.map((p) => ({ portfolio: p, listName: otherListName })),
  ];

  // Take up to max
  const related = candidates.slice(0, max);

  if (related.length === 0) return null;

  return (
    <FadeIn delay={400}>
      <div className="mt-10 pt-8 border-t border-base-300/50">
        <h3 className="text-lg sm:text-xl font-serif font-semibold mb-4">
          You Might Also Like
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          {related.map(({ portfolio, listName }) => (
            <Link
              key={portfolio.portfolio}
              to={`/portfolio/${listName}/${portfolio.portfolio}`}
              className="group card bg-base-100 shadow-sm hover:shadow-lg
                         transition-all duration-300 overflow-hidden"
            >
              <figure className="overflow-hidden">
                <img
                  src={getPortfolioThumbUrl(
                    listName,
                    portfolio.portfolio,
                    portfolio.portfolioImage,
                  )}
                  alt={portfolio.portfolioName}
                  className="w-full h-28 sm:h-32 object-cover transition-transform
                             duration-300 group-hover:scale-105"
                  loading="lazy"
                />
              </figure>
              <div className="card-body p-2 sm:p-3">
                <h4 className="text-xs sm:text-sm font-medium line-clamp-1">
                  {portfolio.portfolioName}
                </h4>
                {portfolio.description.year && (
                  <span className="text-[10px] opacity-50">
                    {portfolio.description.year}
                  </span>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </FadeIn>
  );
}
