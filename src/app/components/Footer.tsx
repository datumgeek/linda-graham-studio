import { Link } from 'react-router-dom';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="hidden lg:block bg-base-200 border-t border-base-300">
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <h3 className="font-serif text-lg font-semibold mb-2">Linda Graham Studio</h3>
            <p className="text-sm opacity-70 leading-relaxed">
              Exploring the intersection of art, science, and technology through
              clay, plexiglass, light, and projection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 opacity-60">
              Explore
            </h4>
            <ul className="space-y-1.5">
              <li>
                <Link to="/portfolio/exhibitions" className="text-sm link link-hover">
                  Exhibitions
                </Link>
              </li>
              <li>
                <Link to="/portfolio/workingWithClay" className="text-sm link link-hover">
                  Working with Clay
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-sm link link-hover">
                  About & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-sm uppercase tracking-wider mb-3 opacity-60">
              Contact
            </h4>
            <p className="text-sm opacity-70">
              <a href="mailto:lgraham938@hotmail.com" className="link link-hover">
                lgraham938@hotmail.com
              </a>
            </p>
            <p className="text-sm opacity-70">Denver, CO</p>
          </div>
        </div>

        <div className="divider my-4" />

        <div className="flex flex-col sm:flex-row justify-between items-center gap-2 text-xs opacity-50">
          <p>&copy; {currentYear} Linda Graham. All rights reserved.</p>
          <p>Built with React + DaisyUI</p>
        </div>
      </div>
    </footer>
  );
}
