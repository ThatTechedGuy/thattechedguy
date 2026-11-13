import { expect, test } from "@playwright/test";

const origin = "https://thattechedguy.com";

for (const { path, canonical, jsonLd = true } of [
  { path: "/", canonical: [origin, `${origin}/`] },
  { path: "/opinions", canonical: [`${origin}/opinions`], jsonLd: false },
  { path: "/yank", canonical: [`${origin}/yank`] },
]) {
  test(`${path}: one h1, canonical, title, description, OG image and JSON-LD`, async ({ page }) => {
    await page.goto(path);
    await expect(page.locator("h1")).toHaveCount(1);
    expect(canonical).toContain(await page.locator('link[rel="canonical"]').getAttribute("href"));
    const title = await page.title();
    expect(title.length).toBeGreaterThanOrEqual(45);
    expect(title.length).toBeLessThanOrEqual(65);
    const description =
      (await page.locator('meta[name="description"]').getAttribute("content")) ?? "";
    expect(description.length).toBeGreaterThanOrEqual(140);
    expect(description.length).toBeLessThanOrEqual(165);

    const ogImage = (await page.locator('meta[property="og:image"]').getAttribute("content")) ?? "";
    expect(ogImage).toMatch(/^https:\/\/thattechedguy\.com\//);
    const image = await page.request.get(ogImage.replace(origin, ""));
    expect(image.status()).toBe(200);
    expect(image.headers()["content-type"]).toBe("image/png");

    if (!jsonLd) return;
    const script = await page.locator('script[type="application/ld+json"]').textContent();
    expect(() => JSON.parse(script ?? "")).not.toThrow();
    expect(script).toContain('"@context":"https://schema.org"');
  });
}

test("robots.txt, sitemap.xml and llms.txt are served", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("User-Agent: *");
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml).toContain(`<loc>${origin}/</loc>`);
  expect(xml).toContain(`<loc>${origin}/yank</loc>`);
  const llms = await request.get("/llms.txt");
  expect(await llms.text()).toContain("## Yank");
});

test.describe("without JavaScript", () => {
  test.use({ javaScriptEnabled: false });

  test("every heading, paragraph and demo card on /yank is visible", async ({ page }) => {
    await page.goto("/yank");
    // Entry animations finish on their own; then nothing may stay transparent or clipped away.
    await page.waitForTimeout(1500);
    const hidden = await page.evaluate(() =>
      [...document.querySelectorAll("main h1, main h2, main h3, main p, [data-clip]")]
        .filter((element) => {
          for (let node: Element | null = element; node; node = node.parentElement) {
            const style = getComputedStyle(node);
            if (Number(style.opacity) < 0.05 || style.visibility === "hidden") return true;
            if (style.clipPath.startsWith("inset(100%")) return true;
          }
          return element.getBoundingClientRect().height === 0;
        })
        .map((element) => element.textContent?.trim().slice(0, 60)),
    );
    expect(hidden).toEqual([]);
    await expect(page.getByText("Words found: “Gate B12, 7:40”")).toBeVisible();
  });
});
