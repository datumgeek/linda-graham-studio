import { Link } from 'react-router-dom';
import {
  portfolios,
  getPortfolioThumbUrl,
  toWebp,
  type Portfolio,
  type PortfolioListName,
} from '../data/portfolio-data';
import { FadeIn } from './FadeIn';
import { ProgressiveImage } from './ProgressiveImage';

interface RelatedWorksProps {
  /** Current portfolio key to exclude from suggestions */
  currentKey: string;
  /** Current list name for same-category matching */
  currentListName: PortfolioListName;
  /** Current medium for relevance sorting */
  currentMedium?: string;
  /** Max items to show */
  max?: number;
}

/**
 * Score how related a candidate portfolio is to the current one.
 * Higher = more related.
 */
function relevanceScore(
  candidate: Portfolio,
  currentMedium?: string,
): number {
  let score = 0;
  // Similar medium keywords
  if (currentMedium && candidate.description.medium) {
    const currentWords = currentMedium.toLowerCase().split(/[\s,]+/);
    const candidateWords = candidate.description.medium.toLowerCase().split(/[\s,]+/);
    for (const word of currentWords) {
      if (word.length > 2 && candidateWords.includes(word)) score += 10;
    }
  }
  // Prefer portfolios with more images (richer content)
  score += Math.min(candidate.images.length, 5);
  return score;
}

export function RelatedWorks({
  currentKey,
  currentListName,
  currentMedium,
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

  // Sort by relevance, then take top N
  candidates.sort(
    (a, b) =>
      relevanceScore(b.portfolio, currentMedium) -
      relevanceScore(a.portfolio, currentMedium),
  );
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
                <ProgressiveImage
                  src={getPortfolioThumbUrl(
                    listName,
                    portfolio.portfolio,
                    portfolio.portfolioImage,
                  )}
                  webpSrc={getPortfolioThumbUrl(
                    listName,
                    portfolio.portfolio,
                    toWebp(portfolio.portfolioImage),
                  )}
                  blurhash={portfolio.coverBlurhash}
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
