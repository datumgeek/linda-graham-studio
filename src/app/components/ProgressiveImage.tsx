import { useState, type ImgHTMLAttributes } from 'react';

interface ProgressiveImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Low-quality placeholder or thumbnail src */
  placeholderSrc?: string;
}

export function ProgressiveImage({
  src,
  placeholderSrc,
  alt,
  className = '',
  ...props
}: ProgressiveImageProps) {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className={`flex items-center justify-center bg-base-200 text-base-content/30 ${className}`}
        {...(props as Record<string, unknown>)}
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1"
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Blurred placeholder */}
      {placeholderSrc && !loaded && (
        <img
          src={placeholderSrc}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-md scale-105"
        />
      )}

      {/* Skeleton while loading */}
      {!loaded && !placeholderSrc && (
        <div className="absolute inset-0 bg-base-300 animate-pulse" />
      )}

      {/* Full image */}
      <img
        src={src}
        alt={alt}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          loaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
        {...props}
      />
    </div>
  );
}
