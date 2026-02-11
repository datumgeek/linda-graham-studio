import { Link } from 'react-router-dom';
import {
  portfolios,
  getPortfolioThumbUrl,
} from '../data/portfolio-data';

// Pick a few featured works for the section below the fold
const featured = [
  portfolios.exhibitions[0],  // Natural Selection
  portfolios.exhibitions[3],  // My Modern Aesthetic
  portfolios.exhibitions[5],  // Binaries
  portfolios.workingWithClay[1], // Later Works
];

export function HomePage() {
  return (
    <div>
      {/* ── Hero Section with Ken Burns animation ── */}
      <div className="hero min-h-[calc(100vh-4rem)] relative overflow-hidden">
        <div
          className="absolute inset-0 animate-ken-burns bg-cover bg-center"
          style={{
            backgroundImage: 'url(/images/IllusiveReality-1024x682.jpg)',
          }}
        />
        <div className="hero-overlay bg-gradient-to-t from-base-100/90 via-black/40 to-black/20" />
        <div className="hero-content text-center text-neutral-content relative z-10">
          <div className="max-w-lg">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-bold text-white drop-shadow-lg tracking-wide">
              Linda Graham
            </h1>
            <p className="py-2 text-lg sm:text-xl text-white/80 drop-shadow font-light tracking-widest uppercase">
              Studio
            </p>
            <p className="mt-2 mb-6 text-sm sm:text-base text-white/70 leading-relaxed max-w-md mx-auto">
              Exploring the intersection of art, science, and technology
              through clay, plexiglass, light, and projection.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link
                to="/portfolio/exhibitions"
                className="btn btn-primary btn-md sm:btn-lg"
              >
                View Exhibitions
              </Link>
              <Link
                to="/portfolio/workingWithClay"
                className="btn btn-outline btn-md sm:btn-lg border-white/50 text-white hover:bg-white/20 hover:border-white"
              >
                Working with Clay
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Featured Works Section ── */}
      <section className="container mx-auto px-4 sm:px-6 py-12 sm:py-16">
        <h2 className="text-2xl sm:text-3xl font-serif font-semibold text-center mb-2">
          Featured Works
        </h2>
        <p className="text-center text-sm opacity-60 mb-8 sm:mb-10">
          Selected exhibitions and collections
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
          {featured.map((p) => {
            const listName = portfolios.exhibitions.includes(p)
              ? 'exhibitions'
              : 'workingWithClay';
            return (
              <Link
                key={p.portfolio}
                to={`/portfolio/${listName}/${p.portfolio}`}
                className="group relative rounded-lg overflow-hidden shadow-md hover:shadow-xl
                           transition-all duration-300 aspect-[4/3]"
              >
                <img
                  src={getPortfolioThumbUrl(
                    listName as 'exhibitions' | 'workingWithClay',
                    p.portfolio,
                    p.portfolioImage,
                  )}
                  alt={p.portfolioName}
                  className="w-full h-full object-cover transition-transform duration-500
                             group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent
                                flex items-end p-3 sm:p-4">
                  <span className="text-white text-xs sm:text-sm font-medium drop-shadow">
                    {p.portfolioName}
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </div>
  );
}
