import { test, expect } from '@playwright/test';

test.describe('Homepage', () => {
  test('should load and display hero content', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveTitle(/Linda Graham/);
    await expect(page.locator('h1')).toContainText('Linda Graham');
  });

  test('should have working navigation links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Check that main nav exists
    await expect(page.locator('nav[aria-label="Main navigation"]')).toBeVisible();
    // Desktop links visible at Desktop Chrome viewport (1280px >= lg breakpoint)
    const exhibitionsLink = page.locator('nav[aria-label="Main navigation"] a[href*="exhibitions"]');
    await expect(exhibitionsLink).toBeVisible();
    const aboutLink = page.locator('nav[aria-label="Main navigation"] a[href*="about"]');
    await expect(aboutLink).toBeVisible();
  });

  test('should navigate to exhibitions page', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Click exhibition link in either desktop or bottom nav
    await page.locator('a[href*="exhibitions"]').first().click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/portfolio\/exhibitions/);
    await expect(page.locator('main')).toBeVisible();
  });
});

test.describe('Portfolio List Page', () => {
  test('should display exhibition portfolios', async ({ page }) => {
    await page.goto('/portfolio/exhibitions');
    await page.waitForLoadState('networkidle');
    const cards = page.locator('a[href*="/portfolio/exhibitions/"]');
    await expect(cards.first()).toBeVisible();
    const count = await cards.count();
    expect(count).toBeGreaterThanOrEqual(1);
  });

  test('should navigate to a portfolio', async ({ page }) => {
    await page.goto('/portfolio/exhibitions');
    await page.waitForLoadState('networkidle');
    const firstCard = page.locator('a[href*="/portfolio/exhibitions/"]').first();
    await firstCard.click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/portfolio\/exhibitions\//);
    await expect(page.locator('h1')).toBeVisible();
  });
});

test.describe('Portfolio Detail Page', () => {
  test('should have grid and carousel navigation', async ({ page }) => {
    await page.goto('/portfolio/exhibitions');
    await page.waitForLoadState('networkidle');
    await page.locator('a[href*="/portfolio/exhibitions/"]').first().click();
    await page.waitForLoadState('networkidle');
    // Navigation links with text Grid and Carousel
    const gridLink = page.locator('a[href*="grid"]');
    const carouselLink = page.locator('a[href*="carousel"]');
    await expect(gridLink).toBeVisible();
    await expect(carouselLink).toBeVisible();
  });

  test('should display grid view with images', async ({ page }) => {
    await page.goto('/portfolio/exhibitions');
    await page.waitForLoadState('networkidle');
    await page.locator('a[href*="/portfolio/exhibitions/"]').first().click();
    await page.waitForLoadState('networkidle');
    await page.locator('a[href*="grid"]').click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL(/\/grid/);
    const images = page.locator('main img');
    await expect(images.first()).toBeVisible();
  });
});

test.describe('About Page', () => {
  test('should display about content', async ({ page }) => {
    await page.goto('/about');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('h1').first()).toBeVisible();
    // About page has "Contact" and "Bio and Resume" sections
    await expect(page.locator('main')).toContainText(/Contact|Bio/);
  });
});

test.describe('Search Modal', () => {
  test('should open with Ctrl+K and search portfolios', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Open search modal with keyboard shortcut
    await page.keyboard.press('Control+k');
    const dialog = page.locator('[role="dialog"]');
    await expect(dialog).toBeVisible({ timeout: 3000 });
    // Type a search query
    const input = dialog.locator('input');
    await input.fill('clay');
    // Wait for results to appear
    await page.waitForTimeout(300);
    // Close with Escape
    await page.keyboard.press('Escape');
    await expect(dialog).not.toBeVisible({ timeout: 3000 });
  });
});

test.describe('404 Page', () => {
  test('should show not found page for invalid routes', async ({ page }) => {
    await page.goto('/this-route-does-not-exist');
    await page.waitForLoadState('networkidle');
    await expect(page.locator('main')).toContainText(/not found|404/i);
  });
});

test.describe('Accessibility', () => {
  test('should have skip-to-content link', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    const skipLink = page.locator('a[href="#main-content"]');
    await expect(skipLink).toBeAttached();
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
    // Wait for lazy-loaded content
    await page.waitForSelector('h1', { timeout: 10000 });
    const h1 = page.locator('h1');
    const h1Count = await h1.count();
    expect(h1Count).toBeGreaterThanOrEqual(1);
  });
});
