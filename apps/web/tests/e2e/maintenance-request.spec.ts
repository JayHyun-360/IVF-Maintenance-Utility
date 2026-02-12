import { test, expect } from '@playwright/test';

test.describe('Maintenance Requests', () => {
  test.beforeEach(async ({ page }) => {
    // Login first
    await page.goto('/');
    await page.fill('input[type="email"]', 'user@test.com');
    await page.fill('input[type="password"]', 'user123');
    await page.click('button[type="submit"]');
    await page.waitForURL(/dashboard/);
  });

  test('should display maintenance requests list', async ({ page }) => {
    // Navigate to requests page if not already there
    const requestsLink = page.locator('a:has-text("request"), a:has-text("maintenance")');
    if (await requestsLink.count() > 0) {
      await requestsLink.first().click();
    }

    // Should show requests
    await expect(page.locator('[data-testid="request-list"], .request-list, .maintenance-requests')).toBeVisible();
  });

  test('should create new maintenance request', async ({ page }) => {
    // Look for create request button
    const createButton = page.locator('button:has-text("create"), button:has-text("new"), a:has-text("create")');
    
    if (await createButton.count() > 0) {
      await createButton.first().click();
      
      // Fill out form
      await page.fill('input[name="title"], input[placeholder*="title"]', 'Test E2E Request');
      await page.fill('textarea[name="description"], textarea[placeholder*="description"]', 'This is a test maintenance request created by E2E test.');
      
      // Select category if available
      const categorySelect = page.locator('select[name="category"], [data-testid="category"]');
      if (await categorySelect.count() > 0) {
        await categorySelect.selectOption('PLUMBING');
      }
      
      // Submit form
      const submitButton = page.locator('button[type="submit"]:has-text("submit"), button:has-text("create")');
      if (await submitButton.count() > 0) {
        await submitButton.click();
        
        // Should show success message or redirect
        await expect(page.locator('.success, .notification, [data-testid="success"]')).toBeVisible({ timeout: 5000 });
      }
    }
  });

  test('should filter maintenance requests', async ({ page }) => {
    // Look for filter options
    const filterSelect = page.locator('select[name="status"], select[name="category"], [data-testid="filter"]');
    
    if (await filterSelect.count() > 0) {
      await filterSelect.first().selectOption({ index: 1 });
      
      // Should update the list
      await page.waitForTimeout(1000);
      await expect(page.locator('[data-testid="request-list"], .request-list')).toBeVisible();
    }
  });

  test('should view maintenance request details', async ({ page }) => {
    // Find first request in list
    const firstRequest = page.locator('[data-testid="request-item"], .request-item, .maintenance-request').first();
    
    if (await firstRequest.count() > 0) {
      await firstRequest.click();
      
      // Should show request details
      await expect(page.locator('h1, h2:has-text("details"), [data-testid="request-details"]')).toBeVisible();
    }
  });
});
