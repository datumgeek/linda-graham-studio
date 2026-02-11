import { useRef, useCallback, type TouchEvent } from 'react';

interface SwipeHandlers {
  onTouchStart: (e: TouchEvent) => void;
  onTouchMove: (e: TouchEvent) => void;
  onTouchEnd: (e: TouchEvent) => void;
}

interface UseSwipeOptions {
  onSwipeLeft?: () => void;
  onSwipeRight?: () => void;
  threshold?: number;
}

export function useSwipe({
  onSwipeLeft,
  onSwipeRight,
  threshold = 50,
}: UseSwipeOptions): SwipeHandlers {
  const startX = useRef(0);
  const startY = useRef(0);
  const deltaX = useRef(0);

  const onTouchStart = useCallback((e: TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
    deltaX.current = 0;
  }, []);

  const onTouchMove = useCallback((e: TouchEvent) => {
    deltaX.current = e.touches[0].clientX - startX.current;
    const deltaY = Math.abs(e.touches[0].clientY - startY.current);
    // If horizontal swipe is dominant, prevent vertical scroll
    if (Math.abs(deltaX.current) > deltaY) {
      e.preventDefault();
    }
  }, []);

  const onTouchEnd = useCallback(() => {
    if (Math.abs(deltaX.current) > threshold) {
      if (deltaX.current > 0) {
        onSwipeRight?.();
      } else {
        onSwipeLeft?.();
      }
    }
    deltaX.current = 0;
  }, [onSwipeLeft, onSwipeRight, threshold]);

  return { onTouchStart, onTouchMove, onTouchEnd };
}
