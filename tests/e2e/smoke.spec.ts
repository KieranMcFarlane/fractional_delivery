import { expect, test } from "@playwright/test";

test("renders english and french homepages", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/Fractional Digital Delivery|Fractional Delivery/i);

  await page.goto("/fr");
  await expect(page).toHaveTitle(/Consultante|Fractional Delivery/i);
});

test("renders blog and can open a post", async ({ page }) => {
  await page.goto("/blog");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();

  const firstLink = page.getByRole("link", { name: /Read article|Lire l'article/i }).first();
  await firstLink.click();
  await expect(page.locator("article").first()).toBeVisible();
});

test("service path cards behave as hash-synced tabs", async ({ page }) => {
  await page.goto("/");

  const businessOffer = page.locator("#businesses-going-digital");
  const scalingOffer = page.locator("#scaling-tech-teams");
  const businessTab = page.getByRole("tab", { name: /Path 1 Businesses going digital/i });
  const scalingTab = page.getByRole("tab", { name: /Path 2 Scaling tech and AI teams/i });

  await expect(businessTab).toHaveAttribute("aria-selected", "true");
  await expect(scalingTab).toHaveAttribute("aria-selected", "false");
  await expect(businessTab).toHaveCSS("cursor", "pointer");
  await expect(scalingTab).toHaveCSS("cursor", "pointer");
  await expect(businessTab).toContainText("An established organisation with a serious digital agenda");
  await expect(scalingTab).toContainText("You already have product, design and engineering");
  await expect(page.getByTestId("active-door-card")).toHaveCount(0);

  await expect(businessOffer).toBeVisible();
  await expect(scalingOffer).toBeHidden();

  await scalingTab.click();

  await expect(businessTab).toHaveAttribute("aria-selected", "false");
  await expect(scalingTab).toHaveAttribute("aria-selected", "true");
  await expect(businessOffer).toBeHidden();
  await expect(scalingOffer).toBeVisible();
  await expect(page).toHaveURL(/#scaling-tech-teams$/);

  await businessTab.click();

  await expect(businessOffer).toBeVisible();
  await expect(scalingOffer).toBeHidden();
  await expect(page).toHaveURL(/#businesses-going-digital$/);
});

test("hero path buttons select the matching services tab", async ({ page }) => {
  await page.goto("/");

  const businessHero = page.getByTestId("hero-path-business");
  const scalingHero = page.getByTestId("hero-path-scaling");
  const businessTab = page.getByRole("tab", { name: /Path 1 Businesses going digital/i });
  const scalingTab = page.getByRole("tab", { name: /Path 2 Scaling tech and AI teams/i });

  await expect(businessHero).toHaveAttribute("aria-current", "true");
  await expect(scalingHero).not.toHaveAttribute("aria-current", "true");

  await scalingHero.click();

  await expect(scalingHero).toHaveAttribute("aria-current", "true");
  await expect(businessHero).not.toHaveAttribute("aria-current", "true");
  await expect(scalingTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#scaling-tech-teams")).toBeVisible();
  await expect(page.locator("#businesses-going-digital")).toBeHidden();

  await businessHero.click();

  await expect(businessHero).toHaveAttribute("aria-current", "true");
  await expect(scalingHero).not.toHaveAttribute("aria-current", "true");
  await expect(businessTab).toHaveAttribute("aria-selected", "true");
  await expect(page.locator("#businesses-going-digital")).toBeVisible();
  await expect(page.locator("#scaling-tech-teams")).toBeHidden();
});

test("testimonial read more toggle shows a hand cursor", async ({ page }) => {
  await page.goto("/");

  const toggle = page.getByRole("button", { name: /Read more/i }).first();
  await expect(toggle).toBeVisible();
  await expect(toggle).toHaveCSS("cursor", "pointer");

  await toggle.click();
  await expect(page.getByRole("button", { name: /Read less/i }).first()).toHaveCSS("cursor", "pointer");
});

test("footer newsletter signs up through the site newsletter endpoint", async ({ page }) => {
  let requestPayload: unknown;

  await page.route("**/api/ebook-signup", async (route) => {
    requestPayload = route.request().postDataJSON();
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/");

  const footer = page.locator("footer");
  await footer.getByPlaceholder(/Enter your email|Votre adresse email/i).fill("footer-newsletter@example.com");
  await footer.getByRole("button", { name: /Subscribe|S'inscrire/i }).click();

  await expect(footer.getByText(/You're subscribed|Vous êtes inscrit/i)).toBeVisible();
  expect(requestPayload).toMatchObject({
    email: "footer-newsletter@example.com",
    locale: "en",
    source: "footer_newsletter",
    termsAccepted: true,
    marketingConsent: true,
  });
});

test("trusted square logos are scaled up beside the wordmark logos", async ({ page }) => {
  await page.goto("/");

  for (const alt of ["This is One", "ThirtyThree", "B&Q"]) {
    const box = await page.getByAltText(alt).boundingBox();
    expect(box?.height).toBeGreaterThanOrEqual(56);
  }
});

test("hero emphasis keeps the rainbow gradient treatment", async ({ page }) => {
  await page.goto("/");

  const emphasis = page.getByText("without the full-time hire");
  await expect(emphasis).toHaveClass(/gradient-text/);
  await expect(emphasis).toHaveCSS("-webkit-text-fill-color", "rgba(0, 0, 0, 0)");
});

test("about portrait block is compact on desktop", async ({ page }) => {
  await page.goto("/");

  const portrait = page.getByAltText("Camille Wilhelm McFarlane portrait");
  const box = await portrait.boundingBox();

  expect(box?.width).toBeLessThanOrEqual(320);
});

test("about portrait block is centered with balanced mobile spacing", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  const portrait = page.getByAltText("Camille Wilhelm McFarlane portrait");
  const tags = portrait.locator("xpath=following-sibling::div[1]");
  const portraitBox = await portrait.boundingBox();
  const tagsBox = await tags.boundingBox();

  expect(portraitBox?.width).toBeLessThanOrEqual(288);
  expect(portraitBox?.x).toBeGreaterThan(40);
  expect(tagsBox?.x).toBeGreaterThanOrEqual(24);
  expect(tagsBox?.y ?? 0).toBeGreaterThan((portraitBox?.y ?? 0) + (portraitBox?.height ?? 0) + 12);
});
