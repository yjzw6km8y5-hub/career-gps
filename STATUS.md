# Status

_Control file for the AI Project Runner. Detailed history stays in PROGRESS.md._

## Must-fix (from approved reviews; do these first)
_None open. Human-only items (a timed walkthrough, a Marathi check by a person, evidence research by a named reviewer) are tracked in CONTEXT.md, not here._

## Next step
**Choose with the owner.** BUILD-PLAN has no further item queued after "Study in India vs abroad". Suggested small steps, in order:
1. Add the tracks screen to the axe accessibility spec (`app/e2e/a11y.spec.ts`) for both careers and languages.
2. Show the chosen track in the Passport summary.
3. Ask the owner what to build next (open: bank inclusion rule, calendar start date).

After each change: `npm --prefix app run check`.
## Done recently
- Study in India vs abroad: side screen opened from the routes screen.
  - Four tracks per career (schema: `CareerPack.tracks`, built by `app/src/data/tracks.ts`); one shown at a time, default India + India; one big number (total cost); years, exams or licences, visa, pay and destination-currency cost with a dated exchange rate are on tap.
  - All `[placeholders]` with Example evidence; "how many make it" says "Reliable data not available"; Canada/US only a Planned note.
  - Tests: 5 schema checks per pack, e2e both careers in English and Marathi at 390px.
- Bank-by-bank deposits (RD, FD), opened from the savings explainer.
  - Six example banks (incl. India Post) in alphabetical order; no badges, no default, no referral wording.
  - Every rate and minimum is a dated `[placeholder]` with that bank's evidence record (quarterly expiry).
  - The inclusion rule is shown as an open owner decision.
- "Where to keep the money" explainer: opens from the monthly estimate.
  - Three groups (government-backed, bank deposits, market-linked) and 7 options, each with product-specific risk lines.
  - Every rate, minimum and lock-in is a `[placeholder]` with evidence.
  - No ranking; notice and adviser button on the screen. Tests ban "best/safe/guaranteed" in English and Marathi.
- Listen button on every screen: reads it aloud, and reads unchecked `[placeholders]` as "not checked yet". Focus moves to each new screen's title; Escape closes the change panel.
- Musician journey on the same engine:
  - full pack (4 routes, decision points, cost scenarios, support placeholders, actions, wording);
  - selectable from search;
  - asks about practice instead of marks; no medical words.
- Use-case bank: 12 fictional family situations with the expected route, cost scenario, readiness and three actions (`app/src/lib/personas.test.ts`).
- Accessibility: axe WCAG 2.1 AA on every screen, both careers, both languages, child mode and the change sheet. Fixed contrast (parent orange #C2410C), progress-bar label, colour fade with reduced motion, dark-theme green.
- Tests now (npm run check, 2026-10-04): 98 data/engine tests, 265 browser tests.

## Handoff
_Newest note first. Each tool ends its turn with a note here (CLAUDE.md section 7)._
- 2026-10-04, builder: claude (runner, fixing review of cycle 2). Fixed all 6 findings: tracks in the a11y spec; Listen inside every NavBar; Listen also reads savings, banks, tracks, route detail, notices and evidence claims; every screen has an h1 (search, route detail added) with focus tests; Marathi-voice note handles empty/late voice lists. Check passes (98 unit + 265 browser). Next: see Next step.
- 2026-10-03, builder: claude (runner cycle). Previous cycle timed out after 60 min; this one ran the full check once (about 4 min) and finished. Built: study in India vs abroad (tracks). Check passes (all unit + 234 browser tests). Unfinished: a11y spec for the tracks screen, Passport line. Next: see Next step.
- 2026-10-03, builder: claude (owner's session). Built: bank-by-bank comparison. All checks pass (87 + 226). Next builder: study in India vs abroad (Next step). Codex: review everything from 1fe96ab (large range; use git diff).
- 2026-10-03, builder: claude (owner's session). Also built: "Where to keep the money", Listen button, focus handling. All checks pass (83 + 214). Next builder: bank-by-bank comparison (Next step).
- 2026-10-03, builder: claude (owner's session). Built: musician journey, use-case bank, accessibility checks and fixes. Codex: please review everything from 1fe96ab.
- 2026-10-02, builder: claude. Switched to the standard process: standard files created, repo published, runner entry added.

## Runner notes
- Do not read or import the AI Review Desk during cycles. Outside input reaches this file only through the owner's approval (CLAUDE.md section 5).
- Log every cycle in `logs/cycles.csv`, with builder and reviewer. After 3 failed cycles in a row, pause and say why here.
- When Claude Code hits its usage limit, Codex builds (AGENTS.md); Claude Code reviews those cycles when it is back.
_(the runner writes here if it has to stop the project)_
