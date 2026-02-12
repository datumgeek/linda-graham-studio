import { Link } from 'react-router-dom';
import {
  portfolios,
  getPortfolioThumbUrl,
  type PortfolioListName,
  type Portfolio,
} from '../data/portfolio-data';
import { FadeIn } from '../components/FadeIn';
import { SEO } from '../components/SEO';

interface TimelineEntry {
  year: number | null;
  portfolio: Portfolio;
  listName: PortfolioListName;
}

function buildTimeline(): TimelineEntry[] {
  const entries: TimelineEntry[] = [];

  for (const [listName, list] of Object.entries(portfolios) as [PortfolioListName, Portfolio[]][]) {
    for (const portfolio of list) {
      entries.push({
        year: portfolio.description.year ?? null,
        portfolio,
        listName,
      });
    }
  }

  // Sort by year descending; null years go at the end
  entries.sort((a, b) => {
    if (a.year === null && b.year === null) return 0;
    if (a.year === null) return 1;
    if (b.year === null) return -1;
    return b.year - a.year;
  });

  return entries;
}

export function TimelinePage() {
  const entries = buildTimeline();

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6 max-w-3xl">
      <SEO
        title="Timeline"
        description="A chronological journey through Linda Graham's exhibitions and clay work."
        path="/timeline"
      />

      <h1 className="text-3xl sm:text-4xl font-serif font-semibold text-center mb-2">
        Artistic Journey
      </h1>
      <p className="text-center text-sm opacity-60 mb-10">
        A chronological view of exhibitions and collections
      </p>

      {/* Vertical timeline */}
      <div className="relative">
        {/* Center line */}
        <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-base-300 -translate-x-1/2" />

        {entries.map((entry, index) => {
          const isLeft = index % 2 === 0;
          const { portfolio, listName, year } = entry;
          const thumbUrl = getPortfolioThumbUrl(
            listName,
            portfolio.portfolio,
            portfolio.portfolioImage,
          );

          return (
            <FadeIn key={portfolio.portfolio} delay={index * 100}>
              <div
                className={`relative flex items-start mb-10 sm:mb-12 ${
                  isLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'
                } flex-row`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary border-4 border-base-100 z-10 mt-5" />

                {/* Spacer for mobile (left gutter) */}
                <div className="sm:hidden w-10 shrink-0" />

                {/* Content card */}
                <div className={`sm:w-[calc(50%-2rem)] w-full ${isLeft ? 'sm:pr-8' : 'sm:pl-8'}`}>
                  <Link
                    to={`/portfolio/${listName}/${portfolio.portfolio}`}
                    className="group block bg-base-100 rounded-xl shadow-md hover:shadow-xl
                               transition-all duration-300 overflow-hidden"
                  >
                    <figure className="overflow-hidden">
                      <img
                        src={thumbUrl}
                        alt={portfolio.portfolioName}
                        className="w-full h-40 sm:h-44 object-cover transition-transform
                                   duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </figure>
                    <div className="p-3 sm:p-4">
                      {year && (
                        <span className="badge badge-primary badge-sm mb-1">
                          {year}
                        </span>
                      )}
                      <h3 className="font-serif font-semibold text-sm sm:text-base">
                        {portfolio.portfolioName}
                      </h3>
                      {portfolio.description.venue && (
                        <p className="text-xs opacity-60 mt-0.5">
                          {portfolio.description.venue}
                        </p>
                      )}
                      {portfolio.description.medium && (
                        <p className="text-xs opacity-50 mt-0.5">
                          {portfolio.description.medium}
                        </p>
                      )}
                    </div>
                  </Link>
                </div>
              </div>
            </FadeIn>
          );
        })}

        {/* Terminal dot */}
        <div className="absolute left-4 sm:left-1/2 -translate-x-1/2 bottom-0 w-3 h-3 rounded-full bg-base-300" />
      </div>
    </div>
  );
}
