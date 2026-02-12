import { Outlet, useParams } from 'react-router-dom';
import {
  findPortfolio,
  type PortfolioListName,
} from '../data/portfolio-data';
import { PortfolioNav } from '../components/PortfolioNav';
import { Breadcrumbs } from '../components/Breadcrumbs';

export function PortfolioLayout() {
  const { listName, portfolioKey } = useParams<{
    listName: string;
    portfolioKey: string;
  }>();

  const portfolio = findPortfolio(
    listName as PortfolioListName,
    portfolioKey!,
  );

  if (!portfolio) {
    return (
      <div className="container mx-auto p-8">
        <h1 className="text-2xl font-bold">Portfolio not found</h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-3 sm:px-6 py-4 sm:py-6">
      <Breadcrumbs />
      <PortfolioNav />
      <Outlet context={{ portfolio, listName: listName as PortfolioListName }} />
    </div>
  );
}
