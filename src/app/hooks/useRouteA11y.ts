import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Scrolls to top and manages focus on route changes for accessibility.
 * - Resets scroll position on navigation
 * - Moves focus to main content for screen readers
 */
export function useRouteA11y() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, left: 0 });

    // Move focus to main content area for screen readers
    const main = document.getElementById('main-content');
    if (main) {
      // Temporarily make main focusable, focus it, then remove tabindex
      main.setAttribute('tabindex', '-1');
      main.focus({ preventScroll: true });
      // Remove tabindex after a brief delay so it doesn't interfere with tab order
      const timer = setTimeout(() => main.removeAttribute('tabindex'), 100);
      return () => clearTimeout(timer);
    }
  }, [pathname]);
}
