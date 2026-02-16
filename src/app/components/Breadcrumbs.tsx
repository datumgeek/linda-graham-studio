import { Link, useParams, useLocation } from 'react-router-dom';
import { portfolioListLabels, findPortfolio, type PortfolioListName } from '../data/portfolio-data';

export function Breadcrumbs() {
  const { listName, portfolioKey, slideIndex } = useParams<{
    listName: string;
    portfolioKey: string;
    slideIndex: string;
  }>();
  const location = useLocation();

  const crumbs: { label: string; to?: string }[] = [
    { label: 'Home', to: '/' },
  ];

  if (listName) {
    const listLabel = portfolioListLabels[listName as PortfolioListName];
    if (listLabel) {
      crumbs.push({ label: listLabel, to: `/portfolio/${listName}` });
    }
  }

  if (listName && portfolioKey) {
    const portfolio = findPortfolio(listName as PortfolioListName, portfolioKey);
    if (portfolio) {
      crumbs.push({
        label: portfolio.portfolioName,
        to: `/portfolio/${listName}/${portfolioKey}`,
      });
    }

    // Sub-view
    const path = location.pathname;
    if (path.endsWith('/info')) {
      crumbs.push({ label: 'Info' });
    } else if (slideIndex !== undefined) {
      crumbs.push({ label: 'Slideshow' });
    }
  }

  if (crumbs.length <= 1) return null;

  return (
    <div className="text-xs sm:text-sm breadcrumbs py-0 mb-3 overflow-x-auto">
      <ul>
        {crumbs.map((crumb, i) => (
          <li key={i}>
            {crumb.to && i < crumbs.length - 1 ? (
              <Link to={crumb.to} className="opacity-60 hover:opacity-100 transition-opacity">
                {crumb.label}
              </Link>
            ) : (
              <span className="opacity-80">{crumb.label}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
