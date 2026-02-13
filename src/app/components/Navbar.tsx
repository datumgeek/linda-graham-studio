import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useTheme } from '../hooks/useTheme';

interface NavbarProps {
  onSearchOpen?: () => void;
}

export function Navbar({ onSearchOpen }: NavbarProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggle: toggleTheme } = useTheme();

  // Auto-close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="navbar bg-base-100/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50" aria-label="Main navigation">
      <div className="navbar-start">
        {/* Hamburger — only visible between sm and lg (tablet). On phone, bottom nav is used. */}
        <div className="dropdown hidden sm:block lg:hidden">
          <button
            className="btn btn-ghost"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {menuOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-base-100 rounded-box w-52">
              <li>
                <NavLink to="/" onClick={closeMenu}>
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/portfolio/exhibitions" onClick={closeMenu}>
                  Exhibitions
                </NavLink>
              </li>
              <li>
                <NavLink to="/portfolio/workingWithClay" onClick={closeMenu}>
                  Working with Clay
                </NavLink>
              </li>
              <li>
                <NavLink to="/about" onClick={closeMenu}>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/timeline" onClick={closeMenu}>
                  Timeline
                </NavLink>
              </li>
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-lg sm:text-xl gap-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span className="font-serif tracking-wide">Linda Graham</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li>
            <NavLink to="/" end>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio/exhibitions">Exhibitions</NavLink>
          </li>
          <li>
            <NavLink to="/portfolio/workingWithClay">Working with Clay</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          <li>
            <NavLink to="/timeline">Timeline</NavLink>
          </li>
        </ul>
      </div>
      <div className="navbar-end gap-1">
        <button
          onClick={onSearchOpen}
          className="btn btn-ghost btn-circle btn-sm"
          aria-label="Search portfolios"
          title="Search (Ctrl+K)"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
        <button
          onClick={toggleTheme}
          className="btn btn-ghost btn-circle btn-sm"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          title={isDark ? 'Light mode' : 'Dark mode'}
        >
          {isDark ? (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </nav>
  );
}
