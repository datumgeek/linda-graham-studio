import { useCallback, useMemo, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import {
  portfolios,
  getPortfolioThumbUrl,
  type PortfolioListName,
} from '../data/portfolio-data';
import { FadeIn } from '../components/FadeIn';
import { SEO } from '../components/SEO';
import { GalleryScene, type ArtworkEntry } from '../components/GalleryScene';

function buildArtworks(): ArtworkEntry[] {
  const entries: ArtworkEntry[] = [];

  for (const listName of Object.keys(portfolios) as PortfolioListName[]) {
    for (const p of portfolios[listName]) {
      entries.push({
        listName,
        portfolio: p,
        imageUrl: getPortfolioThumbUrl(listName, p.portfolio, p.portfolioImage),
        label: p.portfolioName,
      });
    }
  }

  return entries;
}

export function GalleryWalkPage() {
  const navigate = useNavigate();
  const artworks = useMemo(() => buildArtworks(), []);

  const handleArtworkClick = useCallback(
    (listName: PortfolioListName, portfolioKey: string) => {
      navigate(`/portfolio/${listName}/${portfolioKey}`);
    },
    [navigate],
  );

  return (
    <>
      <SEO
        title="Virtual Gallery | Linda Graham Studio"
        description="Walk through a virtual 3D gallery showcasing Linda Graham's ceramic art exhibitions and clay works."
        path="/gallery"
      />

      <FadeIn className="flex flex-col h-[calc(100vh-4rem)] sm:h-[calc(100vh-4rem)] pb-16 sm:pb-0">
        {/* Header */}
        <div className="px-4 pt-4 pb-2 sm:px-6">
          <nav className="text-sm breadcrumbs mb-2" aria-label="Breadcrumb">
            <ul>
              <li>
                <a href={`${import.meta.env.BASE_URL}`}>Home</a>
              </li>
              <li>Virtual Gallery</li>
            </ul>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-serif font-bold text-base-content">
            Virtual Gallery
          </h1>
          <p className="text-sm text-base-content/60 mt-1">
            Explore Linda Graham's artwork in an immersive 3D gallery space
          </p>
        </div>

        {/* 3D Scene */}
        <div className="flex-1 relative min-h-0">
          <Suspense
            fallback={
              <div className="w-full h-full flex items-center justify-center bg-base-200">
                <div className="text-center">
                  <span className="loading loading-spinner loading-lg text-primary" />
                  <p className="mt-4 text-sm text-base-content/60">
                    Loading gallery...
                  </p>
                </div>
              </div>
            }
          >
            <GalleryScene
              artworks={artworks}
              onArtworkClick={handleArtworkClick}
            />
          </Suspense>
        </div>
      </FadeIn>
    </>
  );
}

export default GalleryWalkPage;
