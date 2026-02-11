import { useOutletContext } from 'react-router-dom';
import type { Portfolio, PortfolioListName } from '../data/portfolio-data';

interface PortfolioContext {
  portfolio: Portfolio;
  listName: PortfolioListName;
}

export function usePortfolioContext(): PortfolioContext {
  return useOutletContext<PortfolioContext>();
}
