import { useState, useCallback, useMemo } from 'react';

interface VideoEmbedProps {
  src: string;
  title: string;
  className?: string;
  /** Poster/thumbnail image shown before the video loads */
  posterSrc?: string;
}

/**
 * Convert a JW Platform player URL to a direct MP4 and poster URL.
 * e.g. http://content.jwplatform.com/players/RJS7Qcdi-S3u9V5Nq.html
 *   → mp4:    https://cdn.jwplayer.com/videos/RJS7Qcdi-JzxQ5USO.mp4
 *   → poster: https://assets-jpcust.jwpsrv.com/thumbs/RJS7Qcdi-720.jpg
 */
function parseJwPlatformUrl(src: string): { mp4: string; poster: string } | null {
  const match = src.match(/jwplatform\.com\/players\/([A-Za-z0-9]+)/);
  if (!match) return null;
  const mediaId = match[1];
  return {
    mp4: `https://cdn.jwplayer.com/videos/${mediaId}-JzxQ5USO.mp4`,
    poster: `https://assets-jpcust.jwpsrv.com/thumbs/${mediaId}-720.jpg`,
  };
}

/*// Try to extract direct MP4 + poster from JW Platform URL
  const jwInfo = useMemo(() => parseJwPlatformUrl(secureSrc), [secureSrc]);

  // Use JW poster if no custom poster provided
  const effectivePoster = posterSrc || jwInfo?.poster;

  *
 * Lazy video embed — shows a lightweight poster facade that loads
 * the actual video only when the user clicks play.
 *
 * For JW Platform URLs, uses native HTML5 <video> with direct MP4
 * for reliable playback. For other URLs, falls back to iframe embed.
 */
export function VideoEmbed({ src, title, className = '', posterSrc }: VideoEmbedProps) {
  const [activated, setActivated] = useState(false);
  const [error, setError] = useState(false);

  // Upgrade http → https when possible
  const secureSrc = src.replace(/^http:\/\//, 'https://');

  const handleActivate = useCallback(() => {
    setActivated(true);
  }, []);

  if (error) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-base-200 rounded-lg p-8 text-center ${className}`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-12 w-12 opacity-30 mb-3"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
          />
        </svg>
        <p className="text-sm font-medium opacity-60">Video unavailable</p>
        <p className="text-xs opacity-40 mt-1">{title}</p>
      </div>
    );
  }

  if (!activated) {
    return (
      <button
        onClick={handleActivate}
        className={`group relative bg-base-200 rounded-lg overflow-hidden cursor-pointer ${className}`}
        aria-label={`Play video: ${title}`}
      >
        {/* Poster image or gradient placeholder */}
        {effectivePoster ? (
          <img
            src={effectivePoster}
            alt=""
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-base-300 to-base-200" />
        )}

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors duration-200" />

        {/* Play button */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-primary/90 group-hover:bg-primary
                        flex items-center justify-center shadow-lg
                        transition-transform duration-200 group-hover:scale-110"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 sm:h-10 sm:w-10 text-primary-content ml-1"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <p className="mt-3 text-sm font-medium text-white/90 drop-shadow-lg">
            {title}
          </p>
        </div>
      </button>
    );
  }

  // For JW Platform URLs, use native HTML5 <video> for reliable playback
  if (jwInfo) {
    return (
      <video
        src={jwInfo.mp4}
        poster={effectivePoster || undefined}
        controls
        autoPlay
        className={`rounded-lg ${className}`}
        onError={() => setError(true)}
      >
        <track kind="captions" />
        Your browser does not support the video tag.
      </video>
    );
  }

  // For other embed URLs, fall back to iframe
  return (
    <iframe
      src={secureSrc}
      title={title}
      className={`rounded-lg ${className}`}
      allowFullScreen
      onError={() => setError(true)}
      allow="autoplay; encrypted-media"
    />
  );
}
