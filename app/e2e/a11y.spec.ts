import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// Accessibility (WCAG 2.1 A/AA rules from axe-core) on every screen, both careers, both languages, at 390px.
const SCREENS = ["start", "search", "possibilities", "country", "country-planned", "dream", "handoff", "reality", "routes", "route",
  "where", "readiness", "costs", "support", "gap", "monthly", "savings", "banks", "actions", "review", "passport"];

for (const career of ["cardiologist", "musician"]) {
  for (const lang of ["en", "mr"]) {
    for (const screen of SCREENS) {
      test(`a11y: ${career} ${screen} [${lang}]`, async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.goto(`/?career=${career}&screen=${screen}&lang=${lang}`);
        await expect(page.locator(`[data-screen="${screen}"]`)).toBeVisible();
        const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
        const problems = results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length}× e.g. ${v.nodes[0]?.target.join(" ")}`);
        expect(problems).toEqual([]);
      });
    }
  }
}

// Child mode shows journey screens in the dark night-sky look.
for (const lang of ["en", "mr"]) {
  for (const screen of SCREENS.filter((x) => !["start", "search", "possibilities", "country", "country-planned"].includes(x))) {
    test(`a11y: child mode ${screen} [${lang}]`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`/?mode=child&screen=${screen}&lang=${lang}`);
      await expect(page.locator(`[data-screen="${screen}"]`)).toBeVisible();
      const results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
      expect(results.violations.map((v) => `${v.id} (${v.impact}): ${v.nodes.length}× e.g. ${v.nodes[0]?.target.join(" ")}`)).toEqual([]);
    });
  }
}

test("a11y: the change sheet and its result", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/?screen=readiness");
  await page.locator('[data-action="change"]').click();
  let results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.target.join(" ")}`)).toEqual([]);
  await page.locator('[data-change="budget"] [data-option="tight"]').click();
  results = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21aa"]).analyze();
  expect(results.violations.map((v) => `${v.id}: ${v.nodes[0]?.target.join(" ")}`)).toEqual([]);
});
