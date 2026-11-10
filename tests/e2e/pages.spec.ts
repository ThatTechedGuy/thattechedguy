import { expect, test, type Page } from "@playwright/test";

/** Collects console errors and uncaught exceptions for the whole test. */
function watchErrors(page: Page): string[] {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  return errors;
}

/** Scrolls through the page in steps, so every scroll-driven island runs. */
async function scrollThrough(page: Page) {
  const height = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < height; y += 700) {
    // Steps must run in order, one scroll after another.
    // oxlint-disable-next-line no-await-in-loop
    await page.evaluate((top) => window.scrollTo(0, top), y);
    // oxlint-disable-next-line no-await-in-loop
    await page.waitForTimeout(60);
  }
}

for (const path of ["/", "/yank"]) {
  test(`${path} loads and scrolls with no console errors`, async ({ page }) => {
    const errors = watchErrors(page);
    await page.goto(path, { waitUntil: "networkidle" });
    await scrollThrough(page);
    await page.waitForTimeout(500);
    expect(errors).toEqual([]);
  });
}

test("unknown URLs get the 404 page", async ({ page }) => {
  const response = await page.goto("/no-such-page");
  expect(response?.status()).toBe(404);
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Page not found");
});

const theme = (page: Page) => page.evaluate(() => document.documentElement.dataset["theme"]);

test("/yank: the theme switch works both ways and persists after reload", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/yank");
  const toggle = page.getByRole("switch", { name: "Dark mode" });
  await expect(toggle).toHaveAttribute("aria-checked", "false");
  await toggle.click();
  await expect.poll(() => theme(page)).toBe("dark");
  await expect(toggle).toHaveAttribute("aria-checked", "true");
  await page.reload();
  expect(await theme(page)).toBe("dark");
  await toggle.click();
  await expect.poll(() => theme(page)).toBe("light");
  await page.reload();
  expect(await theme(page)).toBe("light");
});

const palette = (page: Page) => page.evaluate(() => document.documentElement.dataset["palette"]);

test("/: the paper is random on each visit until one is picked, then persists", async ({
  context,
  page,
}) => {
  // Eight papers: twelve visits all landing on the same one is a 1 in 8^11 chance.
  const visits = await Promise.all(
    Array.from({ length: 12 }, async () => {
      const visit = await context.newPage();
      await visit.goto("/");
      const paper = await palette(visit);
      await visit.close();
      return paper;
    }),
  );
  expect(new Set(visits).size).toBeGreaterThan(1);

  await page.goto("/");
  await page.getByRole("button", { name: "Choose colours" }).click();
  await page.getByRole("menuitemradio", { name: "Matcha" }).click();
  expect(await palette(page)).toBe("matcha");
  await expect(page.locator('meta[name="theme-color"]')).toHaveAttribute("content", "#cfdcb4");
  await expect(page.getByRole("menuitemradio", { name: "Matcha" })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  await page.keyboard.press("Escape");
  await expect(page.getByRole("menu", { name: "Colours" })).toBeHidden();
  await page.reload();
  expect(await palette(page)).toBe("matcha");

  // Random forgets the saved paper and shows a different one now.
  await page.getByRole("button", { name: "Choose colours" }).click();
  await page.getByRole("menuitemradio", { name: "Random" }).click();
  await expect(page.getByRole("menuitemradio", { name: "Random" })).toHaveAttribute(
    "aria-checked",
    "true",
  );
  expect(await palette(page)).not.toBe("matcha");
  expect(await page.evaluate(() => localStorage.getItem("ttg:home:palette"))).toBeNull();
});

test("the home page's paper and Yank's theme are remembered apart", async ({ page }) => {
  await page.emulateMedia({ colorScheme: "light" });
  await page.goto("/");
  await page.getByRole("button", { name: "Choose colours" }).click();
  await page.getByRole("menuitemradio", { name: "Midnight" }).click();
  expect(await palette(page)).toBe("midnight");
  await page.goto("/yank");
  expect(await theme(page)).toBe("light");
});

test.describe("phones", () => {
  test.use({ viewport: { width: 390, height: 844 } });

  test("/: the Index menu jumps to a section and closes", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("button", { name: "Index" }).click();
    await page.locator("#pop-index").getByRole("link", { name: "Contact" }).click();
    await expect(page.locator("#pop-index")).toBeHidden();
    await expect(page.getByRole("heading", { name: "Say hello" })).toBeInViewport();
  });

  for (const path of ["/", "/yank"]) {
    test(`${path} has no horizontal overflow at 390 px`, async ({ page }) => {
      await page.goto(path, { waitUntil: "networkidle" });
      await scrollThrough(page);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth - document.documentElement.clientWidth,
      );
      expect(overflow).toBe(0);
    });
  }
});

test("the page colour follows the section, scrolling down and back up", async ({ page }) => {
  // Headless browsers draw the 3D backdrop on the CPU; with all three engines running at once a
  // round-trip can take seconds, so this test waits longer than the default 5 s.
  const slow = expect.configure({ timeout: 15_000 });
  await page.goto("/yank", { waitUntil: "networkidle" });
  const pageColour = () =>
    page.evaluate(() => document.documentElement.style.getPropertyValue("--section-bg"));
  const scrollTo = (id: string) =>
    page.evaluate((target) => document.getElementById(target)?.scrollIntoView(), id);
  await slow.poll(pageColour).not.toBe("");
  const atTop = await pageColour();
  await scrollTo("privacy");
  await slow.poll(pageColour).not.toBe(atTop);
  const atPrivacy = await pageColour();
  await scrollTo("how");
  await slow.poll(pageColour).not.toBe(atPrivacy);
  await page.evaluate(() => window.scrollTo(0, 0));
  await slow.poll(pageColour).toBe(atTop);
});

test("the demo's search finds “gate” and pastes it with Return", async ({ page }) => {
  await page.goto("/yank");
  await page.getByPlaceholder("Search copies, try “gate”").fill("gate");
  const cards = page.locator("[data-clip]");
  await expect(cards).toHaveCount(1);
  await expect(cards).toContainText("Boarding pass");
  await page.keyboard.press("Enter");
  await expect(page.getByText("Notes · 1 paste")).toBeVisible();
  await expect(page.getByRole("status")).toHaveText("Pasted the boarding pass photo");
});
