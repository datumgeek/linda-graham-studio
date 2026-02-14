import { useState, type ImgHTMLAttributes } from 'react';

interface ArtworkImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /** Fallback element shown when image fails to load */
  fallbackClassName?: string;
}

/**
 * Image component with graceful fallback for broken images.
 * Shows a placeholder artwork icon when the image fails to load.
 */
export function ArtworkImage({
  alt,
  fallbackClassName,
  className,
  ...props
}: ArtworkImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center bg-base-200 text-base-content/30 ${fallbackClassName ?? className ?? ''}`}
        role="img"
        aria-label={alt || 'Image unavailable'}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 mb-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs opacity-50">Image unavailable</span>
      </div>
    );
  }

  return (
    <img
      alt={alt}
      className={className}
      onError={() => setHasError(true)}
      {...props}
    />
  );
}
