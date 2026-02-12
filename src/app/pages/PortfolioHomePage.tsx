import { usePortfolioContext } from '../hooks/usePortfolioContext';
import { FadeIn } from '../components/FadeIn';
import { SEO } from '../components/SEO';
import { ArtworkStructuredData } from '../components/StructuredData';

export function PortfolioHomePage() {
  const { portfolio } = usePortfolioContext();
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

      {/* Image count badge */}
      <FadeIn delay={350}>
        <p className="mt-6 text-xs opacity-50">
          {portfolio.images.length} work{portfolio.images.length !== 1 ? 's' : ''} in this collection
        </p>
      </FadeIn>
    </div>
  );
}
