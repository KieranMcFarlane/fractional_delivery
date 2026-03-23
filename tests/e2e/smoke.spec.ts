import { expect, test } from "@playwright/test";

test("renders english and french homepages", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Delivery Operations Consultant|Fractional Delivery/i);

  await page.goto("/fr");
  await expect(page).toHaveTitle(/Consultante|Fractional Delivery/i);
});

test("renders blog and can open a post", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const firstLink = page.getByRole("link", { name: /Read article|Lire l'article/i }).first();
  await firstLink.click();
  await expect(page.locator("article")).toBeVisible();
});
