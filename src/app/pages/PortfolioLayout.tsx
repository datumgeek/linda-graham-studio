import { Outlet, useParams } from 'react-router-dom';
import {
  findPortfolio,
  type PortfolioListName,
} from '../data/portfolio-data';
import { PortfolioNav } from '../components/PortfolioNav';

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
    <div className="container mx-auto p-6">
      <PortfolioNav />
      <Outlet context={{ portfolio, listName: listName as PortfolioListName }} />
    </div>
  );
}
