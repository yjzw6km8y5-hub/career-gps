# Career GPS: build plan

Sources: `packet-2026-10-01-full-scope-spec.md` (Final draft), `packet-2026-10-01-scope-addendum.md` (Final draft), `packet-2026-10-01-cardiologist-path.md`, `FINAL-PLAN-fast.md`.
This file applies the "Open points for the owner" fixes from both packets (section 5).

## 1. Rules that never change
- Users are parents and children with little schooling. Pictures first, at most 3 choices per screen, one big number per screen, details on tap, regional language.
- Never invent a number. Every figure has a source link, as-of date and named reviewer, or it shows `[placeholder]`. `scripts/check-data.js` enforces this.
- Information, not financial advice. No product ranking. A "Talk to a registered adviser" button wherever savings appear.
- Demo data only (fictional children) until the privacy review is done.
- Every screen is labelled **Researched**, **Example** or **Planned**.

## 2. Weekly builds: each week ends with something you can click
Every week ends with a clickable build that passes all checks. If a week's scope does not fit, the leftover moves to the next week. It is never left half-built on screen.

| Week | Clickable result | Done when |
|---|---|---|
| **0 (done)** | First screen "Who is using this?"; child and parent sample screens; look B with deep-orange accent (chosen by the owner); parent "About you" questions; English / Marathi switch on the first screen (Maharashtra pilot); demo family record | Opens by double-click; works at phone and desktop width; `check-data.js` passes; spec-reviewer passes; no figure without a source |
| **1 (done)** | App rebuilt in React with look B (deep orange) as a design system. Profile by taps (every field skippable): parent "About you" (including the school board) plus child class and interests as picture cards. English + Marathi on every screen. Country switch India / Canada / US (Canada and US labelled Planned). Age slider skeleton. | Profile can be completed in about 2 minutes with taps only; every screen has 3 or fewer choices; Playwright clicks through child and parent paths in English and Marathi at phone width; Marathi screens carry a "draft translation" note until a person checks them |
| **2** | Cardiologist journey at full depth: road → route (main / affordable / alternative) → college list; four study/work tracks, one shown at a time; school choice by age (addendum D); a regional-language sample of the whole journey | Every step and figure comes from a data record; unverified items show `[placeholder]` or ⚠ "rules may change"; tests cover each screen |
| **3** | Musician journey; adult stages on the age slider (career change, reskilling, job loss); printable Career Passport; money plan as a monthly range with "where does this come from" on tap; three saving groups with product-specific risk lines; minimal scholarship and government-seat matcher | Money-plan maths has unit tests; no "best" badge or default product; "not financial advice" and adviser button on every money screen; scholarships say "may be eligible, confirm on the official portal" |
| **4** | Canada toggle with RESP view (Planned until checked); researched facts swapped in for placeholders; compare 2–3 careers as **swipe screens** (money, daily life, interest fit, barriers); 6 pilot careers in search, with "data coming" where empty | Each comparison screen shows one big thing; never more than 3 careers; empty careers show no numbers; every swapped-in fact has source, date, reviewer |
| **5** | Reviewer corrections (professors, music teacher, cricket coach) applied; feasibility score (format chosen by you) with methods page; fairness tests (section 3); interest assessment chosen (a licensed, validated tool, decision gate) | Fairness tests pass; score never says "impossible"; tap shows why and what would raise it |
| **6** | 10-minute demo walkthrough ("Brihat" path); competitor-audit table started | You can run the walkthrough without help; every figure shown is Researched or a visible `[placeholder]` |

**If week 3 runs over:** the scholarship matcher and the printable Passport move to week 4. Musician journey, adult stages and the money plan stay in week 3.

**Internal tools:** none ship with the app. The accent bar, `compare.html` and `shot.html` exist only in the old `prototype/` folder.

After week 6, the plan follows FINAL-PLAN-fast: field check (weeks 7–12), then pilot only if the gate is passed. These come after the week-6 demo: spec sprints 4–6 (bank comparison, trackers, gamification, full Passport history), and the US 529 view (US stays labelled Planned until validated).

**Decision gates (yours, before the week that needs them):** ~~look A or B~~ decided: B with deep orange (2026-10-01); ~~first state~~ decided: Maharashtra (2026-10-01); ~~Marathi checker~~ decided: Claude for now, a person before families (2026-10-01); ~~feasibility score format~~ decided: both (2026-10-01); calendar start date, which licensed interest-assessment tool (costs money, so yours to approve; week 5).

## 3. Fairness checks on the feasibility score
- **Inputs allowed:** marks vs requirement, time left, cost vs family capacity *after* scholarships and government seats, competition and seats.
- **Never inputs:** gender, category, caste, religion, disability, region of origin. *Test:* changing any of these on a fictional profile must not change the score.
- **Proxy check:** income, location and school board can stand in for protected traits. Each one used is listed on the methods page with its reason.
- **Parents' occupation is never a score input.** In India it can stand in for caste. It is used only to match schemes meant for certain kinds of work. *Test:* changing occupation on a fictional profile must not change the score.
- **Income, how it may change, and land** feed only the affordability part, and only when the family chose to share them ("Yes, tell more"). If they skip, the score shows a wider range and a "less certain" flag, never a lower score.
- **Distribution test:** the score is run on a fixed set of fictional profiles that spans income bands, town/city/village, gender, category and disability. The build fails if the gap between groups is above `[threshold, to be set with a reviewer]`. The minimum profiles per group is `[number]`.
- **On failure:** the release is blocked until the formula is fixed or the gap is explained and signed off by a human reviewer.
- **Review:** a human who did not write the change reviews every formula change. Version and date are shown on the methods page.
- **Limits:** with fictional profiles only, real-world effects cannot be measured. This is written on the methods page. An accessibility review with low-literacy users is required instead, before any field use.
- **Users can flag** a wrong score or input. Response target: `[response time]`.

## 4. Child-privacy basics
- **Now (demo):** fictional children only. No accounts, no analytics, no ads, no tracking. No answers leave the device or are saved. The browser stores only the chosen look and language. Known gap: the prototype loads fonts from Google Fonts, which sends a request to Google; the week-1 build self-hosts the fonts so nothing leaves the device.
- **Before any real child:** privacy counsel review for each pilot jurisdiction. India: the Digital Personal Data Protection Act, 2023 and its rules on children's data and parental consent `[to confirm with counsel]`. Canada: federal and provincial privacy law `[to confirm with counsel]`.
- **Built in from the first real account:** collect only what is needed; gender and category optional and used only for scheme matching; encryption in transit and at rest; role-based access (parent, child, later teacher); audit log of who saw or changed what; retention periods `[set with counsel]`; consent records; backup and recovery; a breach-response plan; download and delete on request; no advertising or profiling of children; parent access needs the young person's consent after `[age of majority]`.

## 5. Addendum fixes
- **Compare careers** as short swipe screens (money, daily life, interest fit, barriers), never one crowded screen. At most 3 careers.
- **Risk wording is product-specific** on the main screen, e.g. "Money is locked in for some years" (government-backed), "Breaking a deposit early can cost a penalty" (bank), "Value can rise and fall" (market-linked). Never a blanket "value may fall", never "safe" or "low risk". Each line is checked by a human reviewer against the product's sourced terms.
- **Competitor parity:** an official link counts as parity **only if the target family can actually use it**: free or at the same cost, in their language, at their reading level, without an extra account they cannot open. Otherwise it is a gap.
- **Competitor checklist is a starting list,** not complete. The audit tests whole user journeys (eligibility, price, languages, accessibility, account needs), not just feature names.
