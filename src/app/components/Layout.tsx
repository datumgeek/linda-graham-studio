import { useState, useEffect, useCallback } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { BottomNav } from './BottomNav';
import { Footer } from './Footer';
import { StructuredData } from './StructuredData';
import { SearchModal } from './SearchModal';
import { useRouteA11y } from '../hooks/useRouteA11y';

export function Layout() {
  useRouteA11y();
  const [searchOpen, setSearchOpen] = useState(false);

  const openSearch = useCallback(() => setSearchOpen(true), []);
  const closeSearch = useCallback(() => setSearchOpen(false), []);

  // Listen for Cmd/Ctrl+K from anywhere
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <StructuredData />
      <SearchModal isOpen={searchOpen} onClose={closeSearch} />
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[200]
                   btn btn-primary btn-sm"
      >
        Skip to content
      </a>
      <Navbar onSearchOpen={openSearch} />
      <main id="main-content" className="flex-1 pt-16 pb-16 lg:pb-0">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
    </div>
  );
}
