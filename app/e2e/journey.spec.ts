import { expect, test, type Page } from "@playwright/test";
import { translate, type StringKey } from "../src/i18n";
import type { Lang } from "../src/data/schema";

const SENSITIVE = '[data-ask="income"], [data-ask="budget"], [data-ask="place"]';

/** Click the big "Next" button on a journey step. */
const next = (page: Page) => page.locator("[data-primary].next-btn").click();

for (const lang of ["en", "mr"] as Lang[]) {
  const t = (k: StringKey, v?: Record<string, string | number>) => translate(lang, k, v);

  test(`[${lang}] the full cardiologist journey, end to end, in under 12 minutes of taps`, async ({ page }) => {
    let taps = 0;
    let beforeCosts = true; // until the cost step, no sensitive question may appear on any screen
    const tap = async (fn: () => Promise<void>) => {
      taps++;
      await fn();
      if (beforeCosts) await expect(page.locator(SENSITIVE), `sensitive question before value (tap ${taps})`).toHaveCount(0);
    };
    await page.goto(`/?lang=${lang}`);

    // 1. Opening: what future are we exploring? Together is the default.
    await expect(page.locator("h1")).toHaveText(t("startQ"));
    await expect(page.locator('[role="radio"][aria-checked="true"]')).toContainText(t("modeTogether"));
    await tap(() => page.locator('[data-start="search"]').click());
    await tap(() => page.locator("#career-search").fill(lang === "en" ? "heart" : "हृदय"));
    await tap(() => page.locator('[data-career="cardiologist"]').click());

    // 2. Dream + family relay. No sensitive question anywhere before value is shown.
    await expect(page.locator('[data-screen="dream"]')).toBeVisible();
    await tap(() => page.locator("[data-select]").first().click());
    await tap(() => next(page));
    await expect(page.locator('[data-screen="handoff"]')).toBeVisible();
    await tap(() => next(page));
    await expect(page.locator('[data-screen="reality"]')).toBeVisible();
    await expect(page.locator(SENSITIVE)).toHaveCount(0);
    await tap(() => next(page));

    // 3. Routes: at least three genuinely different routes.
    await expect(page.locator("[data-route]")).toHaveCount(4);
    await tap(() => page.locator('[data-route="r.afterUnsuccessful"]').click());
    await expect(page.locator('[data-screen="route"]')).toBeVisible();
    await expect(page.locator("[data-stage]").first()).toBeVisible();
    await tap(() => page.getByRole("button", { name: new RegExp(t("back")) }).click());
    await tap(() => next(page));

    // 4. Where I am: marks asked with a reason and Skip.
    await expect(page.locator('[data-ask="marks"]')).toContainText(t("whyMarks"));
    await tap(() => page.locator('[data-answer="medium"]').click());
    await tap(() => next(page));

    // 5. Readiness: five areas, each with a level, reason and action; no single score.
    await expect(page.locator("[data-dim]")).toHaveCount(5);
    // "Okay" marks with an unverified requirement: Unknown, never Ready.
    await expect(page.locator('[data-dim="preparation"] [data-level]')).toHaveAttribute("data-level", "unknown");
    await expect(page.locator('[data-level="ready"]')).toHaveCount(0);
    beforeCosts = false;
    await tap(() => next(page));

    // 6. Costs: budget asked only now, with a reason; then place.
    await expect(page.locator('[data-ask="budget"]')).toContainText(t("whyBudget"));
    await tap(() => page.locator('[data-answer="some"]').click());
    await tap(() => page.locator('[data-answer="away"]').click());
    await expect(page.locator("[data-scenario]")).toHaveAttribute("data-scenario", "sc.govtAway");
    await expect(page.locator('[data-screen="costs"] [data-label="example"]').first()).toBeAttached();
    await tap(() => next(page));

    // 7. Support: income asked only if the family chooses to check.
    await expect(page.locator('[data-ask="income"]')).toHaveCount(0);
    await expect(page.locator('[data-scheme="sch.mahadbt"]')).toHaveAttribute("data-scheme-status", "needsIncome");
    await tap(() => next(page));

    // 8–9. Funding gap, monthly estimate.
    await expect(page.locator('[data-screen="gap"]')).toBeVisible();
    await tap(() => next(page));
    await expect(page.locator('[data-screen="monthly"] [data-big-number]')).toBeVisible();
    await tap(() => next(page));

    // 10. Three owned actions.
    await expect(page.locator("[data-owner]")).toHaveCount(3);
    await tap(() => page.locator('[data-owner="child"] .done-btn').click());
    await tap(() => next(page));

    // 11–12. Review date, then the Career Passport with three clear actions.
    await tap(() => page.locator('[data-answer="term"]').click());
    await expect(page.locator('[data-screen="passport"]')).toBeVisible();
    await expect(page.locator("[data-passport-track]")).toHaveCount(1);
    await expect(page.locator("[data-passport-action]")).toHaveCount(3);
    await expect(page.locator("[data-review]")).toHaveText(t("review_term"));

    // A first-time family reads each screen; at ~25 seconds per tap this stays well under 12 minutes.
    expect(taps).toBeLessThanOrEqual(28);
  });

  test(`[${lang}] Change something: budget and entrance result visibly change the plan`, async ({ page }) => {
    await page.goto(`/?screen=actions&lang=${lang}`);
    const childBefore = await page.locator('[data-owner="child"] .action-text').innerText();
    await page.locator('[data-owner="child"] .done-btn').click();

    await page.locator('[data-action="change"]').click();
    await page.locator('[data-change="budget"] [data-option="tight"]').click();
    const changed = page.locator("[data-changed]");
    await expect(changed).toContainText(t("change_budget"));
    await expect(changed).toContainText(t("focusMoved", { route: lang === "en" ? "Lower-cost route" : "कमी खर्चाचा मार्ग" }));
    await expect(page.locator("[data-affected-route]").first()).toBeVisible();
    await expect(page.locator("[data-cost-now]")).toContainText("₹"); // the cost range itself, not just a name
    await expect(page.locator("[data-actions-updated]")).toBeVisible();
    await expect(page.locator("[data-kept-item]")).toHaveCount(1);    // the done action is kept, by name
    await expect(page.locator("[data-kept-item]")).toHaveText(childBefore);
    await page.locator("[data-changed] [data-primary]").click();

    await page.locator('[data-action="change"]').click();
    await page.locator('[data-change="entrance"] [data-option="notQualified"]').click();
    await expect(page.locator("[data-changed]")).toContainText(t("entrance_notQualified"));
    await expect(page.locator('[data-affected-route="r.main"]')).toContainText(t("status_paused"));
    await page.locator("[data-changed] [data-primary]").click();

    const childAfter = await page.locator('[data-owner="child"] .action-text').innerText();
    expect(childAfter).not.toBe(childBefore);
  });
}

for (const lang of ["en", "mr"] as Lang[]) {
  const t = (k: StringKey, v?: Record<string, string | number>) => translate(lang, k, v);

  test(`[${lang}] the full musician journey at 390px, on the same screens`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/?lang=${lang}`);
    await page.locator('[data-start="search"]').click();
    await page.locator("#career-search").fill(lang === "en" ? "music" : "संगीत");
    await page.locator('[data-career="musician"]').click();
    await expect(page.locator('[data-screen="dream"]')).toBeVisible();
    await page.locator("[data-select]").nth(1).click();
    await next(page);                                                     // → handoff
    await next(page);                                                     // → reality
    await expect(page.locator(SENSITIVE)).toHaveCount(0);
    await next(page);                                                     // → routes
    await expect(page.locator("[data-route]")).toHaveCount(4);
    await page.locator('[data-route="m.r.after"]').click();
    await expect(page.locator("[data-gate]")).toHaveCount(1);
    await page.getByRole("button", { name: new RegExp(t("back")) }).click();
    await next(page);                                                     // → where
    // Music asks about practice, not school marks or subjects.
    await expect(page.locator('[data-ask="marks"]')).toHaveCount(0);
    await expect(page.locator('[data-ask="practice"]')).toContainText(t("whyPractice"));
    await page.locator('[data-answer="daily"]').click();
    await next(page);                                                     // → readiness
    await expect(page.locator("[data-dim]")).toHaveCount(5);
    await expect(page.locator('[data-dim="preparation"] [data-level]')).toHaveAttribute("data-level", "unknown");
    await expect(page.locator('[data-level="ready"]')).toHaveCount(0);
    await next(page);                                                     // → costs
    await page.locator('[data-answer="some"]').click();
    // Some money → the lower-cost community route is the best fit; it doesn't depend on studying away, so place isn't asked.
    await expect(page.locator('[data-ask="place"]')).toHaveCount(0);
    await expect(page.locator("[data-scenario]")).toHaveAttribute("data-scenario", "m.sc.community");
    await next(page);                                                     // → support
    await expect(page.locator("[data-scheme]")).toHaveCount(2);
    await next(page); await next(page); await next(page);                 // → gap → monthly → actions
    await expect(page.locator("[data-owner]")).toHaveCount(3);
    await next(page);
    await page.locator('[data-answer="results"]').click();
    await expect(page.locator("[data-passport-track]")).toHaveCount(1);
    await expect(page.locator("[data-passport-action]")).toHaveCount(3);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
    expect(overflow).toBeLessThanOrEqual(0);
    expect(await page.locator("body").innerText()).not.toMatch(/MBBS|NEET|doctor|Biology|डॉक्टर|जीवशास्त्र/i);
  });
}

test("continue a saved journey after closing the page", async ({ page }) => {
  await page.goto("/?screen=readiness");
  await expect(page.locator('[data-screen="readiness"]')).toBeVisible();
  await page.goto("/");
  await page.locator('[data-start="continue"]').click();
  await expect(page.locator('[data-screen="readiness"]')).toBeVisible();
});

test("show me possibilities leads to the cardiologist journey", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-start="possibilities"]').click();
  await page.getByRole("button", { name: /Helping people/ }).click();
  await page.locator('[data-career="cardiologist"]').click();
  await expect(page.locator('[data-screen="dream"]')).toBeVisible();
});

test("a career without data says so and makes up nothing", async ({ page }) => {
  await page.goto("/?screen=search");
  await page.locator("#career-search").fill("cricket");
  await expect(page.getByText("Data coming")).toBeVisible();
  await expect(page.locator("[data-career]")).toHaveCount(0);
});

test("the musician sample runs on the same screens with no code change, and no medical wording", async ({ page }) => {
  const MEDICAL = /MBBS|NEET|doctor|Biology|seat|medical|hospital|Cardio|marks|डॉक्टर|जीवशास्त्र|वैद्यकीय|रुग्णालय|किमान गुण|गुण कसे|गुणांसाठी/i; // not plain "गुण": it is also inside गुणांक ("score")
  const noMedical = async () => expect(await page.locator("body").innerText()).not.toMatch(MEDICAL);

  await page.goto("/?career=musician&screen=routes");
  await expect(page.locator("[data-route]")).toHaveCount(4);
  await noMedical();
  await page.locator('[data-route="m.r.main"]').click();
  await expect(page.locator("[data-stage]")).toHaveCount(7);
  await noMedical();
  for (const screen of ["dream", "handoff", "reality", "readiness", "costs", "support", "gap", "monthly", "actions", "passport"]) {
    await page.goto(`/?career=musician&screen=${screen}`);
    await expect(page.locator(`[data-screen="${screen}"]`)).toBeVisible();
    await noMedical();
  }
  // Class 10+ would ask about subjects for a medical route; the musician route needs none.
  await page.goto("/?career=musician&screen=where");
  for (let i = 0; i < 3; i++) await page.getByRole("button", { name: "One class higher" }).click();
  await page.locator('[data-action="skip"]').click();
  await expect(page.locator('[data-ask="stream"]')).toHaveCount(0);
  // The change sheet speaks of auditions, not entrance exams.
  await page.goto("/?career=musician&screen=readiness");
  await page.locator('[data-action="change"]').click();
  await expect(page.locator('[data-change="entrance"]')).toContainText("Audition result");
  await page.locator('[data-change="entrance"] [data-option="notQualified"]').click();
  await noMedical();
  await page.goto("/?career=musician&screen=passport");
  await expect(page.locator("[data-passport-action]")).toHaveCount(3);
  // Same check in Marathi.
  for (const screen of ["routes", "readiness", "actions", "passport"]) {
    await page.goto(`/?career=musician&screen=${screen}&lang=mr`);
    await expect(page.locator(`[data-screen="${screen}"]`)).toBeVisible();
    await noMedical();
  }
});

test("Canada is Planned, and 'Use India' returns to where you were", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Country" }).click();
  await page.getByRole("button", { name: /Canada/ }).click();
  await expect(page.locator('[data-screen="country-planned"]')).toBeVisible();
  await page.getByRole("button", { name: "Use India" }).click();
  await expect(page.locator('[data-screen="start"]')).toBeVisible();
});

test("a language the state pack does not offer falls back to English", async ({ page }) => {
  await page.goto("/?lang=kn");
  await expect(page.locator("h1")).toHaveText("What future are we exploring today?");
});

for (const lang of ["en", "mr"] as Lang[]) {
  const t = (k: StringKey) => translate(lang, k);
  test(`[${lang}] "Where to keep the money" opens from the monthly estimate, explains three kinds of places and ranks nothing`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/?screen=monthly&lang=${lang}`);
    await page.locator('[data-action="savings"]').click();
    await expect(page.locator('[data-screen="savings"]')).toBeVisible();
    await expect(page.locator("[data-group]")).toHaveCount(3);
    for (const g of ["govt", "bank", "market"]) await page.locator(`[data-group="${g}"] summary`).first().click();
    await expect(page.locator("[data-product]")).toHaveCount(7);
    await expect(page.locator('[data-screen="savings"]')).toContainText(t("saveNotice"));
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(lang === "en" ? /\b(best|safest|recommended|guaranteed)\b/i : /(सर्वोत्तम|सुरक्षित|हमी)/);
    await page.getByRole("button", { name: new RegExp(t("back")) }).click();
    await expect(page.locator('[data-screen="monthly"]')).toBeVisible();
  });
}

for (const lang of ["en", "mr"] as Lang[]) {
  test(`[${lang}] bank-by-bank deposits open from the savings explainer, alphabetical, with no badges`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/?screen=savings&lang=${lang}`);
    await page.locator('[data-group="bank"] summary').first().click();
    await page.locator('[data-action="banks"]').click();
    await expect(page.locator('[data-screen="banks"]')).toBeVisible();
    const ids = await page.locator("[data-bank]").evaluateAll((els) => els.map((e) => e.getAttribute("data-bank")));
    expect(ids).toEqual(["bob", "canara", "hdfc", "icici", "post", "sbi"]); // alphabetical by English name
    expect(await page.locator("[data-primary]:visible").count()).toBe(0);  // nothing pushes one bank
    const text = await page.locator("main").innerText();
    expect(text).not.toMatch(/\b(best|top|recommended|featured|sponsored)\b|सर्वोत्तम|शिफारस/i);
  });
}

for (const lang of ["en", "mr"] as Lang[]) {
  for (const career of ["cardiologist", "musician"]) {
    test(`[${lang}] ${career}: study in India or abroad shows one track at a time, details on tap`, async ({ page }) => {
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(`/?screen=routes&lang=${lang}&career=${career}`);
      await page.locator('[data-action="tracks"]').click();
      await expect(page.locator('[data-screen="tracks"]')).toBeVisible();
      await expect(page.locator("[data-track]")).toHaveCount(4);
      await expect(page.locator('[data-track="in-in"]')).toHaveAttribute("aria-checked", "true");
      expect(await page.locator("[data-primary]:visible").count()).toBeLessThanOrEqual(3);
      await page.locator('[data-track="abroad-abroad"]').click();
      await expect(page.locator('[data-track="abroad-abroad"]')).toHaveAttribute("aria-checked", "true");
      await expect(page.locator("[data-big-number]")).toHaveCount(1);
      await page.locator("[data-track-details] summary").click();
      await expect(page.locator("[data-track-details]")).toContainText(translate(lang, "trackRate"));
      const text = await page.locator("main").innerText();
      expect(text).not.toMatch(lang === "en" ? /\b(best|safest|recommended|guaranteed)\b/i : /(सर्वोत्तम|सुरक्षित|हमी)/);
    });
  }
}

for (const lang of ["en", "mr"] as Lang[]) {
  const t = (k: StringKey, v?: Record<string, string | number>) => translate(lang, k, v);
  test(`[${lang}] the chosen study track is kept after saving, continuing, and shows by name in the Passport`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/?screen=routes&lang=${lang}&career=musician`);
    await page.locator('[data-action="tracks"]').click();
    await page.locator('[data-track="abroad-return"]').click();
    await page.getByRole("button", { name: new RegExp(t("back")) }).click();
    await expect(page.locator('[data-screen="routes"]')).toBeVisible();
    await page.goto(`/?lang=${lang}`);                                    // closing the page and coming back
    await page.locator('[data-start="continue"]').click();
    await expect(page.locator('[data-screen="routes"]')).toBeVisible();
    await next(page);                                                     // → where
    await page.locator('[data-answer="daily"]').click();
    await next(page); await next(page);                                   // → readiness → costs
    await page.locator('[data-answer="some"]').click();
    await next(page);                                                     // → support
    await next(page); await next(page); await next(page);                 // → gap → monthly → actions
    await next(page);
    await page.locator('[data-answer="results"]').click();
    await expect(page.locator('[data-screen="passport"]')).toBeVisible();
    await expect(page.locator("[data-passport-track]")).toContainText(
      lang === "en" ? "Study abroad, return to India" : "परदेशात शिक्षण, भारतात परत");
    await expect(page.locator("[data-passport-track]")).not.toContainText(lang === "en" ? "Study in India, work in India" : "भारतात शिक्षण, भारतात काम");
  });
}
