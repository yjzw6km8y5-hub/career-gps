# Decisions

| Date | Decision | Why |
|---|---|---|
| 2026-10-01 | Sprint 0 prototype is plain HTML/CSS/JS with no build step | Opens by double-click with no installs, so you can judge looks immediately |
| 2026-10-01 | From Sprint 1: React + TypeScript + Vite, Vitest for logic, Playwright for click-through tests | Common, free, well supported; needed for many screens, two roles, three languages |
| 2026-10-01 | Figures live in data records; a figure renders only with value + https source + as-of date + reviewer, otherwise `[placeholder]` | "Never invent a number"; enforced by `scripts/check-data.js` |
| 2026-10-01 | Kannada and Marathi on the first screen only, marked "draft, needs native-speaker check" | Shows the language switch now without putting unchecked translations everywhere |
| 2026-10-01 | Cardiologist steps shown without durations or fees; all steps flagged "rules can change" | Consensus packet lists every step as needing verification; durations have no source link yet |
| 2026-10-01 | Saving groups use product-specific risk lines, never "safe"/"low risk" | Addendum open point |
| 2026-10-01 | Style picker bar and compare page are for choosing a look only; removed after the choice | Not part of the product |
| 2026-10-01 | **Look B (Night Sky) chosen by the owner**; style A removed. Accent changed to deep orange (#FF6A2B on dark, #D9480F on light); original B accent kept one click away for comparison | The owner asked for a more current, deep-orange look and left the call to Claude |
| 2026-10-01 | Orange, but not any bank's brand colours | The app compares banks neutrally; looking like one bank would suggest steering |
| 2026-10-01 | "About you" questions: who you are, your work, anyone else earning and their work. Income band, income trend and land appear only if the parent taps "Yes, tell more"; every question skippable; one question per screen, max 3 answers | The owner: capture parents' occupations, household income, income trajectory and land, but don't push for it |
| 2026-10-01 | Questions ask about "you" and "anyone else who earns", not "father's income" | Works for single-parent, guardian and mother-earner families; same data |
| 2026-10-01 | Occupation is never a feasibility-score input; used only for scheme matching | Occupation can stand in for caste in India (fairness rule) |
| 2026-10-01 | Income bands are `[placeholders]` until set from official scholarship income limits | Never invent a number |
| 2026-10-01 | UPDATE-1 adopted: ChatGPT bridge stopped (only on "cross-check with ChatGPT"); `spec-reviewer` agent reviews every feature before the owner sees it; session reports go to `code-reports\` | The owner's UPDATE-1 instructions |
| 2026-10-01 | Report screenshots taken with headless Edge through a 390px frame (`prototype/shot.html`), cropped to 390×844 | Headless Edge on Windows won't size a window below ~500px; this gives true phone-width pictures with no extra installs |
| 2026-10-01 | Project `CLAUDE.md` holds the session routine (feedback → build → review → report) | So every future session follows it without being told |
| 2026-10-01 | Parent money screen shows a range "About ₹[low]–₹[high] a month (estimate)", not one figure | Addendum §E; spec-reviewer finding |
| 2026-10-01 | Fees, seats and marks on the parent road sit behind "Costs and rules" taps; verified figures will show source and date beside the value | One big number per screen; details on tap |
| 2026-10-01 | Google Fonts kept in the prototype for now; week-1 build self-hosts fonts | Self-hosting needs the npm download the owner hasn't approved yet; no family data is involved in the demo |
| 2026-10-01 | Build plan re-aligned to FINAL-PLAN-fast: musician, adult stages and Passport in week 3; Canada RESP in week 4; US Planned until validated; school choice by age (week 2) and licensed interest assessment (week 5) added | Spec-reviewer found these missing or moved without a record |
| 2026-10-01 | Skip buttons say only "Skip" / "Prefer not to say"; "not working now" is explained in the question text | A long skip label works as a hidden 4th answer (max 3 choices) |
| 2026-10-01 | Kannada/Marathi Listen depends on the device having those voices; recorded audio planned | Test browser had no kn-IN / mr-IN voices |
| 2026-10-01 | **Pilot state: Maharashtra (the owner).** Added a state pack (`statePacks.MH`): languages English + Marathi, Class 12 = HSC, state counselling = State CET Cell, scholarships = MahaDBT. All marked "example" until confirmed for the admission year | State is configuration, not hard-coded (spec §3) |
| 2026-10-01 | Kannada removed from the language switch; strings kept for a later Karnataka pack. A remembered Kannada choice falls back to English | Only the pilot state's languages are shown |
| 2026-10-01 | Hindi not added yet | No reviewer named; adding unreviewed translations widens risk. Can be added to the MH pack if the owner wants it |
| 2026-10-01 | **Feasibility score format: "both" (the owner).** 1–10 for parents, three icon levels for children | The owner's choice; built in week 5 |
| 2026-10-01 | **Marathi checker: Claude for now (the owner).** Marked "AI-checked"; a person must check before any family sees it; ChatGPT cross-check only if the owner asks | Spec requires human review before publishing to families; AI check is fine for demos |
| 2026-10-01 | Week 1 app in `app/`: React 19 + TypeScript + Vite; Vitest for data rules and logic; Playwright for phone-size click-through tests using the installed Edge (no browser download) | Free, common, Claude Code knows them well; tests enforce the never-change rules |
| 2026-10-01 | Built with vite-plugin-singlefile: one `dist/index.html` with code, styles and fonts inlined (~1.5 MB) | Opens by double-click and works offline; nothing is fetched from any other site (closes the Google Fonts gap) |
| 2026-10-01 | All text is `{en, mr}` data; tests fail if any Marathi is missing, is a copy of the English, or contains a typed figure | Language switch on every screen; never invent a number |
| 2026-10-01 | Choice buttons carry `data-choice`; tests fail if a screen shows more than 3, any tap target is under 44px, or anything overflows at phone width | Never-change rules, enforced automatically |
| 2026-10-01 | Child profile: class picked with − / + (one big number) and interests as picture cards, 3 per screen over 3 screens, any number can be ticked | Max 3 choices per screen; "this is not a test" (a licensed interest assessment is separate, week 5) |
| 2026-10-01 | Parent profile gains "Which board is your child's school?" (state board from the state pack / CBSE / ICSE or other; "Not sure" skip) | Spec §2 asks for board; the parent is more likely to know |
| 2026-10-01 | Marks not asked yet | Only needed for the feasibility score (week 5); fewer questions now |
| 2026-10-01 | Country chip in the top bar opens India / Canada / United States; Canada and US show a Planned screen | FINAL-PLAN-fast: three markets shown, Canada and US Planned until validated |
| 2026-10-01 | Age slider skeleton moves through life stages (now, school, college, specialist training, working, changing course later) with no ages or years | Durations have no source yet; adult stages are Planned for week 3 |
| 2026-10-01 | Accent-colour bar, compare page and the "original B" accent dropped from the app | Look decided; internal tools no longer needed (`shot.html` stays for screenshots only) |
| 2026-10-01 | Demo v1 was not found on disk; the new looks are a deliberate move away from "too simple" (illustrated role cards, game-path road, one big number) | Only description available: the owner rejected demo v1 as too simple |
