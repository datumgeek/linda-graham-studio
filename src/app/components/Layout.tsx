import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { StructuredData } from './StructuredData';
import { useRouteA11y } from '../hooks/useRouteA11y';

export function Layout() {
  useRouteA11y();

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200]
                   btn btn-primary btn-sm"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" className="flex-1 pt-16 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
