import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { HomePage } from './pages/HomePage';
import { PortfolioListPage } from './pages/PortfolioListPage';
import { PortfolioLayout } from './pages/PortfolioLayout';
import { PortfolioHomePage } from './pages/PortfolioHomePage';
import { PortfolioGridPage } from './pages/PortfolioGridPage';
import { PortfolioCarouselPage } from './pages/PortfolioCarouselPage';
import { AboutPage } from './pages/AboutPage';

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/portfolio/:listName" element={<PortfolioListPage />} />
        <Route
          path="/portfolio/:listName/:portfolioKey"
          element={<PortfolioLayout />}
        >
          <Route index element={<PortfolioHomePage />} />
          <Route path="grid" element={<PortfolioGridPage />} />
          <Route path="carousel/:slideIndex" element={<PortfolioCarouselPage />} />
        </Route>
        <Route path="/about" element={<AboutPage />} />
      </Route>
    </Routes>
  );
}

export default App;
