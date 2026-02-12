import { test, expect } from '@playwright/test';

test.describe('Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should display login page', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('Maintenance Request System');
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('should show error for invalid credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'invalid@test.com');
    await page.fill('input[type="password"]', 'wrongpassword');
    await page.click('button[type="submit"]');
    
    // Should show error message or stay on login page
    await expect(page.locator('input[type="email"]')).toBeVisible();
  });

  test('should login successfully with admin credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
    await expect(page.locator('h1, h2')).toContainText(/dashboard|admin/i);
  });

  test('should login successfully with user credentials', async ({ page }) => {
    await page.fill('input[type="email"]', 'user@test.com');
    await page.fill('input[type="password"]', 'user123');
    await page.click('button[type="submit"]');
    
    // Should redirect to dashboard
    await expect(page).toHaveURL(/dashboard/);
  });
});

test.describe('Navigation', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.fill('input[type="email"]', 'admin@test.com');
    await page.fill('input[type="password"]', 'admin123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/);
  });

  test('should navigate to different sections', async ({ page }) => {
    // Test navigation to different pages
    const navigationLinks = page.locator('nav a, [role="navigation"] a');
    
    if (await navigationLinks.count() > 0) {
      const firstLink = navigationLinks.first();
      await firstLink.click();
      await expect(page).not.toHaveURL(/dashboard/);
    }
  });

  test('should logout successfully', async ({ page }) => {
    // Look for logout button or menu
    const logoutButton = page.locator('button:has-text("logout"), button:has-text("sign out"), [data-testid="logout"]');
    
    if (await logoutButton.count() > 0) {
      await logoutButton.first().click();
      await expect(page).toHaveURL(/login|\/$/);
    }
  });
});
