import { useState } from 'react';

interface VideoEmbedProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Graceful video embed — shows the iframe but handles load errors
 * with a fallback message. JWPlatform embeds may be defunct.
 */
export function VideoEmbed({ src, title, className = '' }: VideoEmbedProps) {
  const [error, setError] = useState(false);

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

  return (
    <iframe
      src={src}
      title={title}
      className={`rounded-lg ${className}`}
      allowFullScreen
      onError={() => setError(true)}
      loading="lazy"
    />
  );
}
