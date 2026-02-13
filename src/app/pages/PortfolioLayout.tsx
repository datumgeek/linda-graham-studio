import { useParams, useOutlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
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
  const location = useLocation();

  const portfolio = findPortfolio(
    listName as PortfolioListName,
    portfolioKey!,
  );

  const outlet = useOutlet({ portfolio, listName: listName as PortfolioListName });

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
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={location.pathname}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
        >
          {outlet}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
