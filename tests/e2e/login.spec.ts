import { test, expect } from "@playwright/test";

test("should allow admin to login and access dashboard", async ({ page }) => {
  await page.goto("/login");

  // Fill in login form
  await page.fill('input[name="email"]', "admin@test.com");
  await page.fill('input[name="password"]', "admin12345");

  // Submit form
  await page.click('button[type="submit"]');

  // Should navigate to role selection
  await expect(page).toHaveURL("/role-selection");

  // Select Admin role
  await page.click("text=Sign in as Admin");

  // Should navigate to PIN verification
  await expect(page).toHaveURL("/admin-pin-verification");

  // Enter PIN
  await page.fill('input[type="password"]', "1234");
  await page.click('button:has-text("Verify PIN")');

  // Should navigate to admin dashboard
  await expect(page).toHaveURL("/admin/dashboard");
  await expect(page.locator("h1")).toContainText("Admin Dashboard");
});

test("should show error for invalid credentials", async ({ page }) => {
  await page.goto("/login");

  // Fill in invalid credentials
  await page.fill('input[name="email"]', "invalid@example.com");
  await page.fill('input[name="password"]', "wrongpassword");

  // Submit form
  await page.click('button[type="submit"]');

  // Should show error message
  await expect(page.locator("text=Invalid email or password")).toBeVisible();
});

test("should allow student to submit maintenance request", async ({ page }) => {
  // Login as student
  await page.goto("/login");
  await page.fill('input[name="email"]', "user@test.com");
  await page.fill('input[name="password"]', "user12345");
  await page.click('button[type="submit"]');

  // Should redirect to role selection
  await expect(page).toHaveURL("/role-selection");

  // Select User role
  await page.click("text=Sign in as User");

  // Should navigate to student dashboard/form
  await expect(page).toHaveURL("/student");

  // Handle alert dialog
  page.on("dialog", async (dialog) => {
    // We expect success message
    if (dialog.message().includes("submitted successfully")) {
      await dialog.accept();
    } else {
      await dialog.dismiss();
    }
  });

  // Fill out maintenance request form
  await page.fill('input[name="title"]', "Leaky Faucet");
  await page.fill('input[name="location"]', "Building A, Room 101");
  await page.fill(
    'textarea[name="description"]',
    "The faucet is leaking constantly",
  );
  await page.selectOption('select[name="category"]', "PLUMBING");
  await page.selectOption('select[name="priority"]', "MEDIUM");

  // Submit form
  await page.click('button[type="submit"]');

  // Wait a bit to ensure submission processed (optional, but good for stability if no immediate feedback other than alert)
  // The alert implies it finished.
});
