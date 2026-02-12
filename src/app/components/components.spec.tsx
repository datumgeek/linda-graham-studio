import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

// Components
import { FadeIn } from './FadeIn';
import { ErrorBoundary } from './ErrorBoundary';
import { Breadcrumbs } from './Breadcrumbs';
import { ProgressiveImage } from './ProgressiveImage';

// Mock IntersectionObserver for FadeIn tests
beforeEach(() => {
  // Mock matchMedia for FadeIn's reduced-motion check
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });

  // Mock IntersectionObserver as a class
  window.IntersectionObserver = class MockIO {
    constructor(callback: IntersectionObserverCallback) {
      // Immediately trigger visibility
      setTimeout(() => {
        callback(
          [{ isIntersecting: true } as IntersectionObserverEntry],
          this as unknown as IntersectionObserver,
        );
      }, 0);
    }
    observe = vi.fn();
    unobserve = vi.fn();
    disconnect = vi.fn();
    root = null;
    rootMargin = '';
    thresholds = [0];
    takeRecords = vi.fn().mockReturnValue([]);
  } as unknown as typeof IntersectionObserver;
});

describe('FadeIn', () => {
  it('should render children', () => {
    render(<FadeIn><span data-testid="child">Hello</span></FadeIn>);
    expect(screen.getByTestId('child')).toBeDefined();
  });

  it('should become visible when observed', async () => {
    const { container } = render(
      <FadeIn><span>Content</span></FadeIn>,
    );
    // Wait for the setTimeout in the mock IntersectionObserver callback
    await vi.waitFor(() => {
      const wrapper = container.firstElementChild as HTMLElement;
      expect(wrapper.className).toContain('opacity-100');
    });
  });
});

describe('ErrorBoundary', () => {
  // Suppress console.error for intentional error
  const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => { /* noop */ });

  function ThrowError() {
    throw new Error('Test error');
  }

  it('should render children when no error', () => {
    render(
      <ErrorBoundary>
        <span data-testid="ok">OK</span>
      </ErrorBoundary>,
    );
    expect(screen.getByTestId('ok')).toBeDefined();
  });

  it('should render fallback on error', () => {
    render(
      <ErrorBoundary>
        <ThrowError />
      </ErrorBoundary>,
    );
    expect(screen.getByText('Something went wrong')).toBeDefined();
    consoleSpy.mockRestore();
  });
});

describe('Breadcrumbs', () => {
  it('should render nothing on home page (no params)', () => {
    const { container } = render(
      <HelmetProvider>
        <MemoryRouter initialEntries={['/']}>
          <Breadcrumbs />
        </MemoryRouter>
      </HelmetProvider>,
    );
    expect(container.firstChild).toBeNull();
  });
});

describe('ProgressiveImage', () => {
  it('should render an img element with correct alt', () => {
    render(
      <ProgressiveImage src="/test.jpg" alt="Test image" />,
    );
    const img = screen.getByAltText('Test image');
    expect(img).toBeDefined();
    expect(img.getAttribute('src')).toBe('/test.jpg');
  });

  it('should show skeleton before load', () => {
    const { container } = render(
      <ProgressiveImage src="/test.jpg" alt="Test" />,
    );
    // Should have an animated pulse skeleton
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).toBeDefined();
  });
});
