import { expect, test, type Page } from "@playwright/test";

// Every screen, in every language, at phone size: the never-change rules a browser can check.
const SCREENS = [
  "home", "country", "country-planned",
  "child-class", "child-interests", "child-dreams", "child-soon", "child-road",
  "parent-about", "parent-plan", "parent-road", "parent-life", "parent-save", "parent-adviser"
];

async function checkScreen(page: Page) {
  // At most 3 choices.
  const choices = await page.locator("[data-choice]:visible").count();
  expect(choices, "choices on screen").toBeLessThanOrEqual(3);
  // Researched / Example / Planned label.
  await expect(page.locator("[data-label]").first()).toBeVisible();
  // No horizontal scroll.
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "horizontal overflow px").toBeLessThanOrEqual(0);
  // No unfilled template slots or broken values.
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/\{\w+\}|undefined|null|NaN/);
  // Tap targets at least 44px tall and wide.
  const small = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("button, summary, input, a")]
      .filter((el) => el.offsetParent !== null)
      .map((el) => ({ el: (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 30), r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.height < 43.5 || r.width < 43.5)
      .map(({ el, r }) => `${el} ${Math.round(r.width)}x${Math.round(r.height)}`)
  );
  expect(small, "tap targets under 44px").toEqual([]);
}

for (const lang of ["en", "mr"]) {
  for (const screen of SCREENS) {
    test(`${screen} [${lang}] follows the screen rules`, async ({ page }) => {
      const errors: string[] = [];
      page.on("pageerror", (e) => errors.push(e.message));
      page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
      await page.goto(`/?screen=${screen}&lang=${lang}`);
      await expect(page.locator(`[data-screen="${screen}"]`)).toBeVisible();
      await checkScreen(page);
      expect(errors).toEqual([]);
    });
  }
}

test("nothing is fetched from another website", async ({ page }) => {
  const outside: string[] = [];
  page.on("request", (r) => { if (!r.url().startsWith("http://localhost")) outside.push(r.url()); });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(outside).toEqual([]);
});
