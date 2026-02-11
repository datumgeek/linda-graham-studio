import { NavLink, Link } from 'react-router-dom';
import { useState } from 'react';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="navbar bg-base-100 shadow-sm fixed top-0 left-0 right-0 z-50">
      <div className="navbar-start">
        <div className="dropdown">
          <button
            className="btn btn-ghost lg:hidden"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle Navigation"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </button>
          {menuOpen && (
            <ul className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
            </ul>
          )}
        </div>
        <Link to="/" className="btn btn-ghost text-xl">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          Linda Graham
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
        </ul>
      </div>
      <div className="navbar-end" />
    </div>
  );
}
