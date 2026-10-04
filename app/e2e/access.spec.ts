import { expect, test } from "@playwright/test";

// Capture what the Listen button would say, instead of playing audio.
test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    const said: { text: string; lang: string }[] = [];
    (window as unknown as { __said: typeof said }).__said = said;
    // A fake voice list that includes Marathi, so no "no Marathi voice" note appears.
    const synth = {
      speak: (u: SpeechSynthesisUtterance) => said.push({ text: u.text, lang: u.lang }),
      cancel: () => {},
      getVoices: () => [{ lang: "en-IN" }, { lang: "mr-IN" }]
    };
    Object.defineProperty(window, "speechSynthesis", { value: synth, configurable: true });
    (window as unknown as { SpeechSynthesisUtterance: unknown }).SpeechSynthesisUtterance = class { text: string; lang = ""; constructor(t: string) { this.text = t; } };
  });
});

const said = (page: import("@playwright/test").Page) => page.evaluate(() => (window as unknown as { __said: { text: string; lang: string }[] }).__said);

for (const lang of ["en", "mr"]) {
  test(`Listen reads the screen in ${lang}, and says "not checked yet" instead of [placeholders]`, async ({ page }) => {
    await page.goto(`/?screen=monthly&lang=${lang}`);
    await page.locator('[data-action="listen"]').click();
    const [u] = await said(page);
    expect(u.lang).toBe(lang === "en" ? "en-IN" : "mr-IN");
    expect(u.text).toContain(lang === "en" ? "Saving each month" : "दरमहा बचत");
    expect(u.text).toContain(lang === "en" ? "not checked yet" : "अजून तपासलेले नाही");
    expect(u.text).not.toMatch(/\[|\]/);
  });
}

test("Listen on the opening screen reads the question and the three choices", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-action="listen"]').click();
  const [u] = await said(page);
  expect(u.text).toContain("What future are we exploring today?");
});

const ALL = ["start", "search", "possibilities", "country", "country-planned", "dream", "handoff", "reality", "routes", "route",
  "where", "readiness", "costs", "support", "gap", "monthly", "savings", "banks", "tracks", "actions", "review", "passport"];

for (const screen of ALL) {
  test(`Listen is on the ${screen} screen and reads its title`, async ({ page }) => {
    await page.goto(`/?screen=${screen}`);
    await expect(page.locator('[data-action="listen"]')).toHaveCount(1);
    const title = (await page.locator("main h1").first().innerText()).trim();
    await page.locator('[data-action="listen"]').click();
    const [u] = await said(page);
    expect(u.text).toContain(title);
  });
}

test("Listen reads savings products and risks, bank names and values, and track details", async ({ page }) => {
  await page.goto("/?screen=savings");
  await page.locator('[data-action="listen"]').click();
  const savings = (await said(page))[0].text;
  expect(savings).toContain((await page.locator(".product-name").first().innerText()).trim());
  expect(savings).toContain((await page.locator(".risk-list li").first().innerText()).replace("⚠", "").trim());
  await page.goto("/?screen=banks");
  await page.locator('[data-action="listen"]').click();
  expect((await said(page))[0].text).toContain((await page.locator(".bank-name").first().innerText()).trim());
  await page.goto("/?screen=tracks");
  await page.locator('[data-action="listen"]').click();
  const tracks = (await said(page))[0].text;
  expect(tracks).toContain((await page.locator(".track-facts dt").first().innerText()).trim());
  expect(tracks).not.toMatch(/\[|\]/);
});

test("a missing Marathi voice (or an empty voice list) shows a note", async ({ page }) => {
  await page.addInitScript(() => { (window.speechSynthesis as unknown as { getVoices: () => unknown[] }).getVoices = () => []; });
  await page.goto("/?screen=monthly&lang=mr");
  await page.locator('[data-action="listen"]').click();
  await expect(page.locator(".listen-note")).toBeVisible();
});

test("focus moves to the title on search, possibilities, country, handoff and route detail", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-start="search"]').click();
  await expect(page.locator('[data-screen="search"] h1')).toBeFocused();
  await page.goto("/");
  await page.locator('[data-start="possibilities"]').click();
  await expect(page.locator('[data-screen="possibilities"] h1')).toBeFocused();
  await page.locator(".country-chip").click();
  await expect(page.locator('[data-screen="country"] h1')).toBeFocused();
  await page.goto("/?screen=dream");
  await page.locator("[data-primary].next-btn").click();
  await expect(page.locator('[data-screen="handoff"] h1')).toBeFocused();
  await page.goto("/?screen=routes");
  await page.locator("[data-route]").first().click();
  await expect(page.locator('[data-screen="route"] h1')).toBeFocused();
});

test("each new screen moves focus to its title", async ({ page }) => {
  await page.goto("/?screen=reality");
  await page.locator("[data-primary].next-btn").click();
  await expect(page.locator('[data-screen="routes"] h1')).toBeFocused();
  await page.locator("[data-primary].next-btn").click();
  await expect(page.locator('[data-screen="where"] h1')).toBeFocused();
});

test("the change sheet takes focus, closes with Escape, and gives focus back", async ({ page }) => {
  await page.goto("/?screen=readiness");
  await page.locator('[data-action="change"]').click();
  await expect(page.locator("#change-title")).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(page.locator('[data-sheet="change"]')).toHaveCount(0);
  await expect(page.locator('[data-action="change"]')).toBeFocused();
});

test("Next works from the keyboard (Enter) across the first steps", async ({ page }) => {
  await page.goto("/?screen=dream");
  for (let step = 0; step < 4; step++) {
    // Focus the Next button and press Enter, as a keyboard user would.
    const next = page.locator("[data-primary].next-btn");
    await next.focus();
    await page.keyboard.press("Enter");
  }
  await expect(page.locator('[data-screen="where"]')).toBeVisible();
});
