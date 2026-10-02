# Progress

## 2026-10-01: Sprint 0
**Done**
- Project folder `Documents\CareerGPS` created (code kept off Google Drive).
- Read the spec: brief, full-scope spec, scope addendum, cardiologist path, FINAL-PLAN-fast.
- Tech setup proposed in plain words: `docs/TECH-SETUP.md`. Cost $0.
- Build plan with weekly clickable builds, "done when" tests, fairness checks, child-privacy basics and addendum fixes: `docs/BUILD-PLAN.md`.
- Clickable prototype `prototype/index.html`:
  - "Who is using this? Parent / Child" first screen, with Listen button and an English / ಕನ್ನಡ / मराठी switch (draft translations).
  - Child: dream picker (3 careers), game-path road to Heart doctor, Quest card with a star.
  - Parent: one big number (`[amount]`, with details on tap), the road with ⚠ flags, three saving groups with product-specific risk lines, and a "Talk to a registered adviser" screen.
  - Two looks: **A Sunrise** and **B Night Sky**, plus a side-by-side compare page.
- `scripts/check-data.js` passes: no unsourced figures, every screen labelled, demo data only.

**Update, same day**
- The owner chose look **B**. Accent switched to deep orange (original B kept one click away). Style A removed.
- Added "About you" for parents: who you are → your work → anyone else earning → their work → "Want a closer money plan?" → (only if yes) income band, income trend, land. All skippable; answers shown as chips on the plan screen; demo answers are not saved.

**Update: UPDATE-1 adopted (same day)**
- ChatGPT bridge stopped (only on "cross-check with ChatGPT").
- `spec-reviewer` agent set up (`.claude/agents/spec-reviewer.md`). First review: 3 must-fix and 9 should-fix items, all fixed except fonts (deferred to week 1, logged).
  - Money is now a range: "About ₹[low]–₹[high] a month (estimate)".
  - Fees and rules on the road sit behind a tap.
  - Tap targets are at least 44px.
  - Savings names are spelled out.
  - The build plan is re-aligned to FINAL-PLAN-fast.
- Session routine written into project `CLAUDE.md`. `scripts/screenshots.js` saves phone-size pictures for reports.
- Feedback folder checked: empty.
- Re-review: PASS. Small follow-ups fixed (₹ stays with its number, ▼ arrows on taps).
- Report written: `code-reports\report-2026-10-01-2013.md`, plus 4 screenshots.

**Update: pilot state = Maharashtra**
- Maharashtra state pack added: English + Marathi, HSC, State CET Cell, MahaDBT (all "example", to confirm).
- Kannada taken off the switch.
- The parent road names HSC and the counselling bodies from the state pack, matching the cardiologist draft. The plan screen says "Maharashtra".
- Reviewer: round 1 FAIL (counselling wording), round 2 PASS.
- Report: `code-reports\report-2026-10-01-2019.md`.

**Decisions answered:** look B orange; Maharashtra; score format "both"; Marathi checked by Claude for now (a person checks before families).

## 2026-10-01: Week 1
**Done**
- Git set up; first commit (Sprint 0).
- React + TypeScript app in `app/`, look B orange as a design system, fonts bundled, single-file offline build.
- Every screen in English and Marathi (Claude-checked draft).
- Parent "About you" with the new board question. Child: class stepper and interests (3 picture cards per screen, 3 screens).
- Country chip: India, with Canada and US labelled Planned.
- Age-slider skeleton ("life road"), with stages only and no ages.
- Tests: 39 data-rule and logic tests; 36 phone-size click-through tests in Edge (every screen × both languages, plus flows).

**Next (week 2)**
- Cardiologist journey at full depth: route choice (main / affordable / alternative), Maharashtra college list (placeholders until researched), four study/work tracks, school choice by age, Marathi sample of the whole journey.
