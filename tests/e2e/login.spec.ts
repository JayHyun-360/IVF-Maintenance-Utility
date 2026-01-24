import { test, expect } from "@playwright/test";

test("should allow admin to login and access dashboard", async ({ page }) => {
  await page.goto("/");

  // Fill in login form
  await page.fill('input[type="email"]', "admin@ivf.edu");
  await page.fill('input[type="password"]', "admin123");

  // Submit form
  await page.click('button[type="submit"]');

  // Should redirect to admin dashboard
  await expect(page).toHaveURL("/admin/dashboard");
  await expect(page.locator("h2")).toContainText("Dashboard");
});

test("should show error for invalid credentials", async ({ page }) => {
  await page.goto("/");

  // Fill in invalid credentials
  await page.fill('input[type="email"]', "invalid@example.com");
  await page.fill('input[type="password"]', "wrongpassword");

  // Submit form
  await page.click('button[type="submit"]');

  // Should show error message
  await expect(page.locator("text=Invalid email or password")).toBeVisible();
});

test("should allow student to submit maintenance request", async ({ page }) => {
  // Login as student
  await page.goto("/");
  await page.fill('input[type="email"]', "student@ivf.edu");
  await page.fill('input[type="password"]', "student123");
  await page.click('button[type="submit"]');

  // Should redirect to student form
  await expect(page).toHaveURL("/student");

  // Fill out maintenance request form
  await page.fill('input[placeholder*="title"]', "Leaky Faucet");
  await page.selectOption('select[name="category"]', "PLUMBING");
  await page.selectOption('select[name="priority"]', "MEDIUM");
  await page.fill('input[placeholder*="location"]', "Building A, Room 101");
  await page.fill(
    'textarea[placeholder*="issue"]',
    "The faucet is leaking constantly",
  );

  // Submit form
  await page.click('button[type="submit"]');

  // Should show success message
  await expect(
    page.locator("text=Request Submitted Successfully!"),
  ).toBeVisible();
});
