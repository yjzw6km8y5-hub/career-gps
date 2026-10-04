import { expect, test, type Page } from "@playwright/test";

// Every screen, in every language, at phone size (Pixel 7, ~412px; the narrow-390 check is below).
const SCREENS = ["start", "search", "possibilities", "country", "country-planned", "dream", "handoff", "reality", "routes", "route",
  "where", "readiness", "costs", "support", "gap", "monthly", "savings", "banks", "tracks", "actions", "review", "passport"];
// Screens that state facts must show a review label (all Example until a person verifies them).
// (Costs is checked in the journey test: while it is asking its question it shows no claim yet.)
const CLAIM_SCREENS = ["handoff", "reality", "routes", "route", "readiness", "support", "gap", "monthly", "savings", "banks", "tracks", "actions", "passport"];

async function checkScreen(page: Page, screen: string) {
  const primary = await page.locator("[data-primary]:visible").count();
  expect(primary, "primary actions visible").toBeLessThanOrEqual(3);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow, "horizontal overflow px").toBeLessThanOrEqual(0);
  const text = await page.locator("main").innerText();
  expect(text).not.toMatch(/\{\w+\}|undefined|NaN|\bnull\b/);
  const small = await page.evaluate(() =>
    [...document.querySelectorAll<HTMLElement>("button, summary, input, a")]
      .filter((el) => el.offsetParent !== null)
      .map((el) => ({ el: (el.textContent || el.getAttribute("aria-label") || el.tagName).trim().slice(0, 30), r: el.getBoundingClientRect() }))
      .filter(({ r }) => r.height < 43.5 || r.width < 43.5)
      .map(({ el, r }) => `${el} ${Math.round(r.width)}x${Math.round(r.height)}`)
  );
  expect(small, "tap targets under 44px").toEqual([]);
  // Nothing is verified yet, so nothing may claim to be "Researched".
  await expect(page.locator('[data-label="researched"]')).toHaveCount(0);
  if (CLAIM_SCREENS.includes(screen)) await expect(page.locator("[data-label]").first()).toBeAttached();
}

for (const width of [412, 390]) {
  for (const lang of ["en", "mr"]) {
    for (const screen of SCREENS) {
      test(`${screen} [${lang}] @${width}px follows the screen rules`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        const errors: string[] = [];
        page.on("pageerror", (e) => errors.push(e.message));
        page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
        await page.goto(`/?screen=${screen}&lang=${lang}`);
        await expect(page.locator(`[data-screen="${screen}"]`)).toBeVisible();
        await checkScreen(page, screen);
        expect(errors).toEqual([]);
      });
    }
  }
}

// Answered states (after a question is answered) and the change sheet, in both languages at 390px.
for (const lang of ["en", "mr"]) {
  test(`answered states and the change sheet follow the screen rules [${lang}] @390px`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/?screen=where&lang=${lang}`);
    await page.locator('[data-answer="medium"]').click();
    await checkScreen(page, "where");

    await page.goto(`/?screen=costs&lang=${lang}`);
    await checkScreen(page, "costs");                       // asking budget
    await page.locator('[data-answer="some"]').click();
    await checkScreen(page, "costs");                       // asking place
    await page.locator('[data-answer="away"]').click();
    await expect(page.locator("[data-scenario]")).toBeVisible();
    await checkScreen(page, "costs");                       // the scenario, with its label
    await expect(page.locator('[data-screen="costs"] [data-label="example"]').first()).toBeAttached();

    await page.goto(`/?screen=support&lang=${lang}`);
    await page.locator('[data-action="ask-income"]').click();
    await checkScreen(page, "support (asking income: no claims shown)");
    await page.locator('[data-answer="low"]').click();
    await checkScreen(page, "support");                     // schemes after answering

    await page.goto(`/?screen=readiness&lang=${lang}`);
    await page.locator('[data-action="change"]').click();
    await expect(page.locator('[data-sheet="change"]')).toBeVisible();
    expect(await page.locator("[data-primary]:visible").count()).toBeLessThanOrEqual(3);
    await page.locator('[data-change="budget"] [data-option="tight"]').click();
    await expect(page.locator("[data-changed]")).toBeVisible();
    expect(await page.locator("[data-primary]:visible").count()).toBeLessThanOrEqual(3);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    await expect(page.locator('[data-sheet="change"]')).not.toContainText("{");
  });
}

test("nothing is fetched from another website", async ({ page }) => {
  const outside: string[] = [];
  page.on("request", (r) => { if (!r.url().startsWith("http://localhost")) outside.push(r.url()); });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  expect(outside).toEqual([]);
});
