import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from './components/Layout';
import { PageSkeleton } from './components/PageSkeleton';
import { ErrorBoundary } from './components/ErrorBoundary';

const HomePage = lazy(() =>
  import('./pages/HomePage').then((m) => ({ default: m.HomePage })),
);
const PortfolioListPage = lazy(() =>
  import('./pages/PortfolioListPage').then((m) => ({ default: m.PortfolioListPage })),
);
const PortfolioLayout = lazy(() =>
  import('./pages/PortfolioLayout').then((m) => ({ default: m.PortfolioLayout })),
);
const PortfolioHomePage = lazy(() =>
  import('./pages/PortfolioHomePage').then((m) => ({ default: m.PortfolioHomePage })),
);
const PortfolioGridPage = lazy(() =>
  import('./pages/PortfolioGridPage').then((m) => ({ default: m.PortfolioGridPage })),
);
const PortfolioCarouselPage = lazy(() =>
  import('./pages/PortfolioCarouselPage').then((m) => ({
    default: m.PortfolioCarouselPage,
  })),
);
const AboutPage = lazy(() =>
  import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })),
);
const TimelinePage = lazy(() =>
  import('./pages/TimelinePage').then((m) => ({ default: m.TimelinePage })),
);
const MapPage = lazy(() =>
  import('./pages/MapPage').then((m) => ({ default: m.MapPage })),
);
const GalleryWalkPage = lazy(() =>
  import('./pages/GalleryWalkPage').then((m) => ({ default: m.GalleryWalkPage })),
);
const NotFoundPage = lazy(() =>
  import('./pages/NotFoundPage').then((m) => ({ default: m.NotFoundPage })),
);

export function App() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageSkeleton />}>
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
            <Route path="/timeline" element={<TimelinePage />} />
            <Route path="/map" element={<MapPage />} />
            <Route path="/gallery" element={<GalleryWalkPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
