import { test, expect } from '@playwright/test';

test.describe('Discord UI Navigation', () => {
  test('should navigate between channels without full page reload', async ({ page }) => {
    await page.goto('/servers/bestow/channels/general');
    await expect(page.locator('text=general')).toBeVisible();
    await page.click('text=product');
    await expect(page).toHaveURL('/servers/bestow/channels/product');
  });

  test('should switch between tabs', async ({ page }) => {
    await page.goto('/servers/bestow/channels/general');
    await page.click('text=Members');
    await expect(page).toHaveURL('/servers/bestow/members');
  });

  test('should display messages with formatting', async ({ page }) => {
    await page.goto('/servers/bestow/channels/general');
    await expect(page.locator('text=Welcome!')).toBeVisible();
    await expect(page.locator('pre code')).toBeVisible();
  });
});
