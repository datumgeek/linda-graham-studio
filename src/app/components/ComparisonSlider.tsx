import { useState, useRef, useCallback } from 'react';

interface ComparisonSliderProps {
  /** Left image (e.g. thumbnail/overview) */
  leftSrc: string;
  /** Right image (e.g. detail/zoomed) */
  rightSrc: string;
  leftLabel?: string;
  rightLabel?: string;
  alt?: string;
  className?: string;
}

export function ComparisonSlider({
  leftSrc,
  rightSrc,
  leftLabel = 'Overview',
  rightLabel = 'Detail',
  alt = 'Artwork comparison',
  className = '',
}: ComparisonSliderProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const pct = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setPosition(pct);
  }, []);

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      setIsDragging(true);
      updatePosition(e.clientX);
    },
    [updatePosition],
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return;
      updatePosition(e.clientX);
    },
    [isDragging, updatePosition],
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      setIsDragging(true);
      updatePosition(e.touches[0].clientX);
    },
    [updatePosition],
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!isDragging) return;
      e.preventDefault();
      updatePosition(e.touches[0].clientX);
    },
    [isDragging, updatePosition],
  );

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setPosition((p) => Math.max(0, p - 2));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setPosition((p) => Math.min(100, p + 2));
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none overflow-hidden rounded-xl cursor-col-resize ${className}`}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleMouseUp}
      role="slider"
      aria-label="Image comparison slider"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(position)}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Right image (full background) */}
      <img
        src={rightSrc}
        alt={`${alt} - ${rightLabel}`}
        className="w-full h-auto block"
        draggable={false}
      />

      {/* Left image (clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${position}%` }}
      >
        <img
          src={leftSrc}
          alt={`${alt} - ${leftLabel}`}
          className="w-full h-auto block"
          style={{ width: containerRef.current?.offsetWidth ?? '100%' }}
          draggable={false}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10 pointer-events-none"
        style={{ left: `${position}%`, transform: 'translateX(-50%)' }}
      >
        {/* Handle dot */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                        w-10 h-10 rounded-full bg-white/90 shadow-xl border-2 border-primary
                        flex items-center justify-center pointer-events-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
              d="M8 9l4-4 4 4m0 6l-4 4-4-4"
            />
          </svg>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-3 left-3 z-20">
        <span className="badge badge-sm bg-black/50 text-white border-none">
          {leftLabel}
        </span>
      </div>
      <div className="absolute top-3 right-3 z-20">
        <span className="badge badge-sm bg-black/50 text-white border-none">
          {rightLabel}
        </span>
      </div>
    </div>
  );
}
