import { Link } from 'react-router-dom';
import { portfolios, getPortfolioThumbUrl, type PortfolioListName } from '../data/portfolio-data';
import { FadeIn } from '../components/FadeIn';
import { SEO } from '../components/SEO';

interface ExhibitionLocation {
  name: string;
  venue: string;
  address: string;
  lat: number;
  lng: number;
  portfolioKey: string;
  listName: PortfolioListName;
  year?: number;
  thumbUrl: string;
}

function buildLocations(): ExhibitionLocation[] {
  const locations: ExhibitionLocation[] = [];

  for (const listName of Object.keys(portfolios) as PortfolioListName[]) {
    for (const p of portfolios[listName]) {
      if (p.description.venue || p.description.location) {
        locations.push({
          name: p.portfolioName,
          venue: p.description.venue ?? p.description.title,
          address: p.description.location ?? '',
          // Approximate coordinates for known Denver-area venues
          ...getCoordinates(p.description.venue ?? '', p.description.location ?? ''),
          portfolioKey: p.portfolio,
          listName,
          year: p.description.year,
          thumbUrl: getPortfolioThumbUrl(listName, p.portfolio, p.portfolioImage),
        });
      }
    }
  }

  return locations;
}

function getCoordinates(venue: string, location: string): { lat: number; lng: number } {
  const v = venue.toLowerCase();
  if (v.includes('denver international airport')) return { lat: 39.8561, lng: -104.6737 };
  if (v.includes('rude gallery') || v.includes('rmcad')) return { lat: 39.7345, lng: -105.0107 };
  if (v.includes('ice cube')) return { lat: 39.7392, lng: -104.9903 };
  if (v.includes('hinterland')) return { lat: 39.7544, lng: -104.9883 };
  // Default: central Denver
  if (location.toLowerCase().includes('denver')) return { lat: 39.7392, lng: -104.9903 };
  return { lat: 39.7392, lng: -104.9903 };
}

// Simple Mercator projection for the Denver area map
function projectToSVG(
  lat: number,
  lng: number,
  bounds: { minLat: number; maxLat: number; minLng: number; maxLng: number },
  width: number,
  height: number,
  padding: number,
): { x: number; y: number } {
  const x =
    padding +
    ((lng - bounds.minLng) / (bounds.maxLng - bounds.minLng)) * (width - 2 * padding);
  const y =
    padding +
    ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * (height - 2 * padding);
  return { x, y };
}

export function MapPage() {
  const locations = buildLocations();

  // Compute bounds with some margin
  const lats = locations.map((l) => l.lat);
  const lngs = locations.map((l) => l.lng);
  const margin = 0.02;
  const bounds = {
    minLat: Math.min(...lats) - margin,
    maxLat: Math.max(...lats) + margin,
    minLng: Math.min(...lngs) - margin * 2,
    maxLng: Math.max(...lngs) + margin * 2,
  };

  const SVG_W = 800;
  const SVG_H = 500;
  const PADDING = 60;

  return (
    <div className="container mx-auto px-4 sm:px-6 py-6">
      <SEO
        title="Exhibition Map"
        description="Map of exhibition venues featuring the art of Linda Graham in the Denver, Colorado area."
        path="/map"
      />
      <FadeIn>
        <h1 className="text-2xl sm:text-3xl font-serif font-semibold mb-2">
          Exhibition Map
        </h1>
        <p className="text-sm opacity-60 mb-6">
          Venues in the Denver, Colorado area where Linda's work has been exhibited
        </p>
      </FadeIn>

      {/* Interactive SVG map */}
      <FadeIn delay={100}>
        <div className="bg-base-200/50 rounded-2xl p-4 sm:p-6 overflow-x-auto">
          <svg
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            className="w-full max-w-4xl mx-auto"
            role="img"
            aria-label="Map showing exhibition locations in Denver area"
          >
            {/* Background */}
            <rect
              x="0" y="0" width={SVG_W} height={SVG_H}
              rx="16" fill="oklch(0.94 0.008 60)"
              className="dark:fill-[oklch(0.22_0.015_260)]"
            />

            {/* Grid lines */}
            {Array.from({ length: 5 }, (_, i) => {
              const y = PADDING + (i * (SVG_H - 2 * PADDING)) / 4;
              return (
                <line
                  key={`h${i}`}
                  x1={PADDING} y1={y} x2={SVG_W - PADDING} y2={y}
                  stroke="oklch(0.80 0.01 60)" strokeWidth="0.5" strokeDasharray="4 4"
                />
              );
            })}
            {Array.from({ length: 5 }, (_, i) => {
              const x = PADDING + (i * (SVG_W - 2 * PADDING)) / 4;
              return (
                <line
                  key={`v${i}`}
                  x1={x} y1={PADDING} x2={x} y2={SVG_H - PADDING}
                  stroke="oklch(0.80 0.01 60)" strokeWidth="0.5" strokeDasharray="4 4"
                />
              );
            })}

            {/* Connections between venues */}
            {locations.length > 1 &&
              locations.slice(1).map((loc, i) => {
                const prev = locations[i];
                const p1 = projectToSVG(prev.lat, prev.lng, bounds, SVG_W, SVG_H, PADDING);
                const p2 = projectToSVG(loc.lat, loc.lng, bounds, SVG_W, SVG_H, PADDING);
                return (
                  <line
                    key={`conn-${i}`}
                    x1={p1.x} y1={p1.y} x2={p2.x} y2={p2.y}
                    stroke="oklch(0.55 0.12 45)" strokeWidth="1" opacity="0.3"
                    strokeDasharray="6 3"
                  />
                );
              })}

            {/* Location pins */}
            {locations.map((loc, i) => {
              const { x, y } = projectToSVG(loc.lat, loc.lng, bounds, SVG_W, SVG_H, PADDING);
              // Offset overlapping pins slightly
              const offsetX = locations
                .slice(0, i)
                .some(
                  (other) =>
                    Math.abs(other.lat - loc.lat) < 0.005 &&
                    Math.abs(other.lng - loc.lng) < 0.005,
                )
                ? (i % 2 === 0 ? 25 : -25)
                : 0;

              return (
                <g key={`pin-${i}`} transform={`translate(${x + offsetX},${y})`}>
                  {/* Drop shadow */}
                  <ellipse cx="0" cy="18" rx="8" ry="3" fill="black" opacity="0.15" />
                  {/* Pin */}
                  <path
                    d="M0-16 C-8-16 -14-10 -14-4 C-14 4 0 18 0 18 C0 18 14 4 14-4 C14-10 8-16 0-16Z"
                    fill="oklch(0.55 0.12 45)"
                    stroke="oklch(0.40 0.10 45)"
                    strokeWidth="1.5"
                    className="transition-all duration-200 hover:scale-110 cursor-pointer"
                    style={{ transformOrigin: 'center' }}
                  />
                  {/* Inner dot */}
                  <circle cx="0" cy="-4" r="5" fill="white" opacity="0.9" />
                  {/* Label */}
                  <text
                    x="0"
                    y="-26"
                    textAnchor="middle"
                    className="text-[11px] font-medium fill-base-content"
                    style={{ fontFamily: 'var(--font-sans)' }}
                  >
                    {loc.venue.length > 30 ? loc.venue.slice(0, 28) + '...' : loc.venue}
                  </text>
                  {loc.year && (
                    <text
                      x="0"
                      y="-38"
                      textAnchor="middle"
                      className="text-[10px] fill-base-content opacity-50"
                      style={{ fontFamily: 'var(--font-sans)' }}
                    >
                      {loc.year}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Title label */}
            <text
              x={SVG_W / 2}
              y={SVG_H - 15}
              textAnchor="middle"
              className="text-[12px] fill-base-content opacity-40"
              style={{ fontFamily: 'var(--font-sans)' }}
            >
              Denver Metropolitan Area, Colorado
            </text>
          </svg>
        </div>
      </FadeIn>

      {/* Venue cards list */}
      <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {locations.map((loc, i) => (
          <FadeIn key={`card-${i}`} delay={200 + i * 80}>
            <Link
              to={`/portfolio/${loc.listName}/${loc.portfolioKey}`}
              className="group card card-side bg-base-100 shadow-sm hover:shadow-lg
                         transition-all duration-300 overflow-hidden h-full"
            >
              <figure className="w-24 shrink-0">
                <img
                  src={loc.thumbUrl}
                  alt={loc.name}
                  className="h-full w-full object-cover transition-transform duration-300
                             group-hover:scale-110"
                  loading="lazy"
                />
              </figure>
              <div className="card-body p-3 gap-1">
                <h3 className="card-title text-sm font-medium">{loc.name}</h3>
                <p className="text-xs opacity-60">{loc.venue}</p>
                {loc.address && (
                  <p className="text-xs opacity-40">{loc.address}</p>
                )}
                {loc.year && (
                  <span className="badge badge-ghost badge-xs">{loc.year}</span>
                )}
              </div>
            </Link>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
