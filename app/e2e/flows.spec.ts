import { expect, test } from "@playwright/test";
import { translate } from "../src/i18n";
import { INTEREST_ROUNDS, CAREERS, STATE_PACKS } from "../src/data/content";
import { FIGURES } from "../src/data/figures";
import type { Lang } from "../src/data/types";

// The main flows, clicked through in every language of the Maharashtra pack.
for (const lang of ["en", "mr"] as Lang[]) {
  const t = (k: Parameters<typeof translate>[1], v?: Record<string, string | number>) => translate(lang, k, v);

  test.describe(`[${lang}]`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(`/?lang=${lang}`);
    });

    test("parent: About you → plan, with money questions only after opting in", async ({ page }) => {
      await page.getByRole("button", { name: new RegExp(t("parent")) }).click();
      const answer = (v: string) => page.locator(`[data-answer="${v}"]`).click();
      const question = page.locator("[data-question]");

      await expect(question).toHaveAttribute("data-question", "who");
      await expect(question).toHaveText(lang === "en" ? "Who are you?" : "तुम्ही कोण आहात?");
      await answer("mother");
      await expect(page.locator('[data-answer="state"]')).toContainText(STATE_PACKS.MH.boardName[lang]);
      await answer("state");
      await answer("daily");
      await expect(page.locator('[data-answer="partner"]')).toContainText(t("partnerMother"));
      await answer("partner");
      await expect(question).toHaveAttribute("data-question", "otherWork");
      await answer("salary");
      await expect(question).toHaveAttribute("data-question", "more");
      await answer("yes");
      await expect(question).toHaveAttribute("data-question", "income");
      await expect(page.locator('[data-answer="low"]')).toContainText(FIGURES.incomeBandLow.placeholder[lang]);
      await page.locator('[data-action="skip"]').click(); // prefer not to say
      await answer("up");
      await answer("no");

      await expect(page.locator('[data-screen="parent-plan"]')).toBeVisible();
      await expect(page.locator("[data-big-number]")).toContainText(FIGURES.monthlySavingLow.placeholder[lang]);
      await expect(page.locator("[data-big-number]")).toContainText(FIGURES.monthlySavingHigh.placeholder[lang]);
      await page.getByText(t("basedOn")).click();
      await expect(page.locator(".about-chip")).toContainText(lang === "en" ? "Farm or daily work" : "शेती किंवा रोजंदारी");
      await expect(page.locator(".about-chip")).not.toContainText(FIGURES.incomeBandLow.placeholder[lang]); // skipped

      // Back returns to the last question answered.
      await page.getByRole("button", { name: new RegExp(t("back")) }).click();
      await expect(question).toHaveAttribute("data-question", "land");
    });

    test("parent: 'Not now' skips every money question", async ({ page }) => {
      await page.goto(`/?screen=parent-about&lang=${lang}`);
      for (let i = 0; i < 4; i++) await page.locator('[data-action="skip"]').click(); // who, board, work, otherEarner
      await expect(page.locator("[data-question]")).toHaveAttribute("data-question", "more");
      await page.locator('[data-answer="no"]').click();
      await expect(page.locator('[data-screen="parent-plan"]')).toBeVisible();
    });

    test("parent: road details open on tap; life slider moves through stages", async ({ page }) => {
      await page.goto(`/?screen=parent-plan&lang=${lang}`);
      await page.getByRole("button", { name: new RegExp(t("seeRoad")) }).click();
      await expect(page.getByText(STATE_PACKS.MH.stateCounselling[lang], { exact: false })).toBeVisible();
      const fee = page.getByText(FIGURES.mbbsFeeGovt.placeholder[lang]);
      await expect(fee).toBeHidden();
      await page.getByText(t("costsRules")).nth(2).click();
      await expect(fee).toBeVisible();
      await page.getByRole("button", { name: t("slideYears") }).click();
      await expect(page.locator(".life-stage")).toHaveText(t("stageNow", { n: 8 }));
      await page.locator(".life-slider").fill("2");
      await expect(page.locator(".life-stage")).toHaveText(t("stageCollege"));
      await expect(page.locator(".life-card")).toContainText("MBBS");
    });

    test("child: class → interests → dreams → road → quest", async ({ page }) => {
      await page.getByRole("button", { name: new RegExp(t("child")) }).click();
      await expect(page.locator(".step-value")).toHaveText(t("classN", { n: 8 }));
      for (let i = 0; i < 3; i++) await page.getByRole("button", { name: t("moreClass") }).click();
      await expect(page.locator(".step-value")).toHaveText(t("classN", { n: 11 }));
      await page.getByRole("button", { name: new RegExp(t("next")) }).click();

      const first = INTEREST_ROUNDS[0][0].name[lang];
      await page.getByRole("button", { name: new RegExp(first) }).click();
      await expect(page.getByRole("button", { name: new RegExp(first) })).toHaveAttribute("aria-pressed", "true");
      for (let i = 0; i < 3; i++) await page.getByRole("button", { name: new RegExp(t("next")) }).click();

      await expect(page.locator('[data-screen="child-dreams"]')).toBeVisible();
      await expect(page.locator(".liked")).toContainText(first);
      await page.getByRole("button", { name: new RegExp(CAREERS[0].name[lang]) }).click();
      await expect(page.locator(".stone")).toHaveCount(6);
      // Class 11: Class 10 is done, Class 11–12 is the next stop.
      await expect(page.locator(".stone").nth(0)).toHaveClass(/stone-done/);
      await expect(page.locator(".stone").nth(1)).toHaveClass(/stone-next/);
      await page.getByRole("button", { name: t("questDone") }).click();
      await expect(page.getByText(t("starEarned"))).toBeVisible();
    });

    test("country: Canada is Planned; 'Use India' returns to where you were", async ({ page }) => {
      await page.getByRole("button", { name: t("country") }).click();
      await page.getByRole("button", { name: new RegExp(lang === "en" ? "Canada" : "कॅनडा") }).click();
      await expect(page.locator('[data-screen="country-planned"]')).toBeVisible();
      await page.getByRole("button", { name: t("backToIndia") }).click();
      await expect(page.locator('[data-screen="home"]')).toBeVisible();
    });

    test("Marathi screens carry the draft-translation note", async ({ page }) => {
      const note = page.locator("[data-draft-note]");
      if (lang === "en") await expect(note).toHaveCount(0);
      else await expect(note).toContainText("मसुदा");
    });
  });
}

test("language switch is remembered after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "मराठी" }).click();
  await page.reload();
  await expect(page.locator("h1")).toHaveText("हे कोण वापरत आहे?");
  await expect(page.locator("html")).toHaveAttribute("lang", "mr");
});

test("a language the state pack does not offer falls back to English", async ({ page }) => {
  await page.goto("/?lang=kn");
  await expect(page.locator("h1")).toHaveText("Who is using this?");
});
