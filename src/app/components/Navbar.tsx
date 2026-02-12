import { NavLink, Link, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

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
      <div className="navbar-end" />
    </nav>
  );
}
