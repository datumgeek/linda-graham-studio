import { useEffect, useCallback, useState, type ReactNode } from 'react';
import { useSwipe } from '../hooks/useSwipe';

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  caption?: string;
  counter?: string;
  children: ReactNode;
}

export function Lightbox({
  isOpen,
  onClose,
  onPrev,
  onNext,
  caption,
  counter,
  children,
}: LightboxProps) {
  const [visible, setVisible] = useState(false);

  // Animate in/out
  useEffect(() => {
    if (isOpen) {
      // Lock body scroll
      document.body.style.overflow = 'hidden';
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard: Escape to close, arrows for prev/next
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowLeft' && onPrev) {
        e.preventDefault();
        onPrev();
      } else if (e.key === 'ArrowRight' && onNext) {
        e.preventDefault();
        onNext();
      }
    },
    [isOpen, onClose, onPrev, onNext],
  );

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Swipe in lightbox
  const swipeHandlers = useSwipe({
    onSwipeLeft: onNext,
    onSwipeRight: onPrev,
    threshold: 40,
  });

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center
                  bg-black/90 backdrop-blur-sm transition-opacity duration-300
                  ${visible ? 'opacity-100' : 'opacity-0'}`}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Lightbox"
    >
      {/* Close button */}
      <button
        className="absolute top-3 right-3 sm:top-4 sm:right-4 btn btn-circle btn-ghost
                   text-white/80 hover:text-white z-10 w-12 h-12 min-h-0"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Close lightbox"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {onPrev && (
        <button
          className="absolute left-1 sm:left-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost
                     text-white/70 hover:text-white z-10 w-14 h-14 min-h-0"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
      )}

      {/* Content */}
      <div
        className="max-w-[95vw] max-h-[85vh] flex items-center justify-center"
        onClick={(e) => e.stopPropagation()}
        {...swipeHandlers}
      >
        {children}
      </div>

      {/* Next */}
      {onNext && (
        <button
          className="absolute right-1 sm:right-4 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost
                     text-white/70 hover:text-white z-10 w-14 h-14 min-h-0"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      )}

      {/* Caption & Counter */}
      {(caption || counter) && (
        <div className="absolute bottom-4 sm:bottom-6 text-center text-white/80 px-4">
          {caption && <p className="text-sm sm:text-base font-medium drop-shadow">{caption}</p>}
          {counter && <p className="text-xs sm:text-sm opacity-60 mt-1">{counter}</p>}
        </div>
      )}
    </div>
  );
}
