import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { FadeIn } from '../components/FadeIn';
import { SEO } from '../components/SEO';
import { ArtworkStructuredData } from '../components/StructuredData';
import { RelatedWorks } from '../components/RelatedWorks';
import { ColorPalette } from '../components/ColorPalette';

export function PortfolioHomePage() {
  const { portfolio, listName } = usePortfolioContext();
  const { description } = portfolio;

  const hasMeta = description.venue || description.location || description.year || description.medium || description.collaborator;

  return (
    <div className="max-w-3xl">
      <SEO
        title={description.title}
        description={description.artistStatement || description.paragraphs[0] || `${description.title} by Linda Graham`}
      />
      <ArtworkStructuredData
        name={description.title}
        description={description.artistStatement}
        dateCreated={description.year}
        artMedium={description.medium}
      />
      <FadeIn>
        <h1 className="font-serif text-2xl sm:text-3xl font-semibold mb-4">{description.title}</h1>
      </FadeIn>

      {/* Structured metadata card */}
      {hasMeta && (
        <FadeIn delay={100}>
          <div className="bg-base-200/60 rounded-xl p-4 sm:p-5 mb-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-sm">
            {description.venue && (
              <div>
                <span className="font-medium opacity-60 text-xs uppercase tracking-wider">Venue</span>
                <p className="mt-0.5">{description.venue}</p>
              </div>
            )}
            {description.location && (
              <div>
                <span className="font-medium opacity-60 text-xs uppercase tracking-wider">Location</span>
                <p className="mt-0.5">{description.location}</p>
              </div>
            )}
            {description.year && (
              <div>
                <span className="font-medium opacity-60 text-xs uppercase tracking-wider">Year</span>
                <p className="mt-0.5">{description.year}</p>
              </div>
            )}
            {description.medium && (
              <div>
                <span className="font-medium opacity-60 text-xs uppercase tracking-wider">Medium</span>
                <p className="mt-0.5">{description.medium}</p>
              </div>
            )}
            {description.collaborator && (
              <div className="sm:col-span-2">
                <span className="font-medium opacity-60 text-xs uppercase tracking-wider">Collaborator</span>
                <p className="mt-0.5">{description.collaborator}</p>
              </div>
            )}
          </div>
        </FadeIn>
      )}

      {/* Artist statement */}
      {description.artistStatement && (
        <FadeIn delay={200}>
          <blockquote className="border-l-4 border-primary/30 pl-4 sm:pl-5 my-6 italic text-sm sm:text-base leading-relaxed opacity-90">
            &ldquo;{description.artistStatement}&rdquo;
            <footer className="mt-2 not-italic text-xs opacity-60">&mdash; Linda Graham</footer>
          </blockquote>
        </FadeIn>
      )}

      {/* Curator note */}
      {description.curatorNote && (
        <FadeIn delay={250}>
          <div className="bg-base-200/40 rounded-lg p-4 sm:p-5 my-6">
            <p className="text-sm sm:text-base leading-relaxed italic">
              &ldquo;{description.curatorNote.text}&rdquo;
            </p>
            <p className="mt-2 text-xs font-medium opacity-70">
              &mdash; {description.curatorNote.author}
            </p>
          </div>
        </FadeIn>
      )}

      {/* Additional paragraphs */}
      {description.paragraphs.length > 0 && (
        <FadeIn delay={300}>
          <div className="prose prose-sm sm:prose-base max-w-none">
            {description.paragraphs.map((p, i) => (
              <p key={i} className="leading-relaxed">{p}</p>
            ))}
          </div>
        </FadeIn>
      )}

      {/* Image count badge & Print button */}
      <FadeIn delay={350}>
        <div className="mt-6 flex items-center gap-4">
          <p className="text-xs opacity-50">
            {portfolio.images.length} work{portfolio.images.length !== 1 ? 's' : ''} in this collection
          </p>
          <button
            className="btn btn-ghost btn-xs gap-1 opacity-60 hover:opacity-100 print:hidden"
            onClick={() => window.print()}
            aria-label="Print this portfolio"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
            </svg>
            Print
          </button>
        </div>
      </FadeIn>

      {/* Color palette */}
      {description.palette && description.palette.length > 0 && (
        <FadeIn delay={400}>
          <ColorPalette colors={description.palette} className="mt-4" />
        </FadeIn>
      )}

      {/* Related works */}
      <RelatedWorks
        currentKey={portfolio.portfolio}
        currentListName={listName}
        currentMedium={description.medium}
      />
    </div>
  );
}
