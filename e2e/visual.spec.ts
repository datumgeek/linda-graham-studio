import { test, expect } from '@playwright/test';

/**
 * Visual regression tests using Playwright's built-in screenshot comparison.
 *
 * First run generates baseline snapshots in e2e/visual.spec.ts-snapshots/.
 * Subsequent runs compare against baselines and fail on visual differences.
 *
 * Update baselines: npx playwright test e2e/visual.spec.ts --update-snapshots
 */

const LOAD_OPTS = { waitUntil: 'networkidle' as const };

// Allow small pixel differences (anti-aliasing, font rendering)
const SCREENSHOT_OPTS = { maxDiffPixelRatio: 0.02 };

test.describe('Visual Regression — Pages', () => {
  test('homepage hero', async ({ page }) => {
    await page.goto('/', LOAD_OPTS);
    // Wait for hero image + Ken Burns animation to settle
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('homepage-hero.png', {
      ...SCREENSHOT_OPTS,
      fullPage: false,
    });
  });

  test('exhibitions list', async ({ page }) => {
    await page.goto('/portfolio/exhibitions', LOAD_OPTS);
    await page.waitForTimeout(800); // fade-in animations
    await expect(page).toHaveScreenshot('exhibitions-list.png', {
      ...SCREENSHOT_OPTS,
      fullPage: true,
    });
  });

  test('working with clay list', async ({ page }) => {
    await page.goto('/portfolio/workingWithClay', LOAD_OPTS);
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('clay-list.png', {
      ...SCREENSHOT_OPTS,
      fullPage: true,
    });
  });

  test('portfolio detail page', async ({ page }) => {
    await page.goto('/portfolio/exhibitions/naturalSelection', LOAD_OPTS);
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('portfolio-detail.png', {
      ...SCREENSHOT_OPTS,
      fullPage: true,
    });
  });

  test('portfolio grid view', async ({ page }) => {
    await page.goto('/portfolio/exhibitions/naturalSelection/grid', LOAD_OPTS);
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('portfolio-grid.png', {
      ...SCREENSHOT_OPTS,
      fullPage: true,
    });
  });

  test('about page', async ({ page }) => {
    await page.goto('/about', LOAD_OPTS);
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('about-page.png', {
      ...SCREENSHOT_OPTS,
      fullPage: true,
    });
  });

  test('timeline page', async ({ page }) => {
    await page.goto('/timeline', LOAD_OPTS);
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('timeline-page.png', {
      ...SCREENSHOT_OPTS,
      fullPage: true,
    });
  });

  test('404 page', async ({ page }) => {
    await page.goto('/nonexistent-route', LOAD_OPTS);
    await page.waitForTimeout(300);
    await expect(page).toHaveScreenshot('404-page.png', {
      ...SCREENSHOT_OPTS,
    });
  });
});

test.describe('Visual Regression — Components', () => {
  test('carousel slide', async ({ page }) => {
    await page.goto(
      '/portfolio/exhibitions/naturalSelection/carousel/0',
      LOAD_OPTS,
    );
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('carousel-slide.png', {
      ...SCREENSHOT_OPTS,
    });
  });

  test('search modal', async ({ page }) => {
    await page.goto('/', LOAD_OPTS);
    await page.keyboard.press('Control+k');
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });
    await expect(page).toHaveScreenshot('search-modal-empty.png', {
      ...SCREENSHOT_OPTS,
    });
    // Type and capture results
    await dialog.locator('input').fill('clay');
    await page.waitForTimeout(400);
    await expect(page).toHaveScreenshot('search-modal-results.png', {
      ...SCREENSHOT_OPTS,
    });
  });

  test('dark mode toggle', async ({ page }) => {
    await page.goto('/', LOAD_OPTS);
    await page.waitForTimeout(1000);
    // Toggle to dark mode via the theme button
    const themeToggle = page.locator('button[aria-label="Switch to dark mode"]');
    await expect(themeToggle).toBeVisible({ timeout: 3000 });
    await themeToggle.click();
    await page.waitForTimeout(500);
    await expect(page).toHaveScreenshot('homepage-dark-mode.png', {
      ...SCREENSHOT_OPTS,
    });
  });
});

test.describe('Visual Regression — Responsive', () => {
  test.use({ viewport: { width: 375, height: 812 } }); // iPhone SE

  test('mobile homepage', async ({ page }) => {
    await page.goto('/', LOAD_OPTS);
    await page.waitForTimeout(1000);
    await expect(page).toHaveScreenshot('mobile-homepage.png', {
      ...SCREENSHOT_OPTS,
    });
  });

  test('mobile exhibitions list', async ({ page }) => {
    await page.goto('/portfolio/exhibitions', LOAD_OPTS);
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('mobile-exhibitions.png', {
      ...SCREENSHOT_OPTS,
      fullPage: true,
    });
  });

  test('mobile bottom nav', async ({ page }) => {
    await page.goto('/', LOAD_OPTS);
    const bottomNav = page.locator('nav[aria-label="Mobile navigation"]');
    if (await bottomNav.isVisible()) {
      await expect(bottomNav).toHaveScreenshot('mobile-bottom-nav.png', {
        ...SCREENSHOT_OPTS,
      });
    }
  });

  test('mobile carousel', async ({ page }) => {
    await page.goto(
      '/portfolio/exhibitions/naturalSelection/carousel/0',
      LOAD_OPTS,
    );
    await page.waitForTimeout(800);
    await expect(page).toHaveScreenshot('mobile-carousel.png', {
      ...SCREENSHOT_OPTS,
    });
  });
});
