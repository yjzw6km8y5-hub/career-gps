// Saves phone-size screenshots of the main screens, for the session report.
// Usage: node scripts/screenshots.js <output-folder> <file-prefix> [screen?query ...]
//   e.g. node scripts/screenshots.js out test "screen=parent-plan&lang=mr"
// Needs the app served (cd app; npm run build; npm run preview → http://localhost:4173).
// Uses Playwright (installed in app/) driving the Microsoft Edge already on this PC.
const path = require("path");
const { chromium } = require(path.join(__dirname, "..", "app", "node_modules", "@playwright", "test"));

const [outDir, prefix, ...custom] = process.argv.slice(2);
if (!outDir || !prefix) { console.error("Usage: node scripts/screenshots.js <output-folder> <file-prefix> [query ...]"); process.exit(1); }
const BASE = process.env.CGPS_URL || "http://localhost:4173";

// Main screens, in report order. Edit this list as screens are added.
const shots = custom.length ? custom : [
  "screen=home",                     // 1. Who is using this?
  "screen=child-interests",          // 2. Child: what do you love doing?
  "screen=parent-plan&lang=mr",      // 3. Parent: one big number, in Marathi
  "screen=parent-road"               // 4. Parent: the road, with the life slider button
];

(async () => {
  const browser = await chromium.launch({ channel: "msedge" });
  let failed = 0;
  for (const [i, q] of shots.entries()) {
    const file = path.resolve(outDir, `${prefix}-${i + 1}.png`);
    // A fresh page per shot, so a remembered language can't leak from one shot into the next.
    const page = await browser.newPage({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
    try {
      await page.goto(`${BASE}/?${q}`);
      await page.locator("[data-screen]").waitFor();
      await page.waitForTimeout(500); // let the entry animation finish
      await page.screenshot({ path: file });
      console.log("saved " + file);
    } catch (e) {
      failed++;
      console.log("FAILED " + file + ": " + e.message.split("\n")[0]);
    }
    await page.close();
  }
  await browser.close();
  process.exit(failed ? 1 : 0);
})();
