# Status

_Control file for the AI Project Runner. Detailed history stays in PROGRESS.md._

## Must-fix (from approved reviews; do these first)
_None open. Human-only items (a timed walkthrough, a Marathi check by a person, evidence research by a named reviewer) are tracked in CONTEXT.md, not here._

## Next step
**Study in India vs abroad** (BUILD-PLAN order, addendum C). Four tracks per career, shown one at a time (the family's chosen track; default "study in India, work in India"):
1. Tracks: study in India + work in India; study in India + work abroad; study abroad + work abroad; study abroad + return to India.
2. Each track: total cost (rupees, and the destination currency with a dated exchange rate), years, extra exams or licences (e.g. for doctors abroad: `[licensing exams, to be sourced]`), visa route, pay range. All are `[placeholders]` with EvidenceRecords; "how many make it" only where reliable data exists, otherwise "Reliable data not available".
3. Data in the career packs (schema extension, used by both careers); no career named in screen code. Technical details on tap; at most 3 primary actions.
4. Canada/US stay "Planned" labels only (do not build Canada/US functionality).
5. Tests: schema/unit tests for both packs, e2e in English and Marathi at 390px, accessibility.

After each change: `npm --prefix app run check`.
## Done recently
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
- Tests now: 83 data/engine tests, 214 browser tests.

## Handoff
_Newest note first. Each tool ends its turn with a note here (CLAUDE.md section 7)._
- 2026-10-03, builder: claude (owner's session). Built: bank-by-bank comparison. All checks pass (87 + 226). Next builder: study in India vs abroad (Next step). Codex: review everything from 1fe96ab (large range; use git diff).
- 2026-10-03, builder: claude (owner's session). Also built: "Where to keep the money", Listen button, focus handling. All checks pass (83 + 214). Next builder: bank-by-bank comparison (Next step).
- 2026-10-03, builder: claude (owner's session). Built: musician journey, use-case bank, accessibility checks and fixes. Codex: please review everything from 1fe96ab.
- 2026-10-02, builder: claude. Switched to the standard process: standard files created, repo published, runner entry added.

## Runner notes
- Do not read or import the AI Review Desk during cycles. Outside input reaches this file only through the owner's approval (CLAUDE.md section 5).
- Log every cycle in `logs/cycles.csv`, with builder and reviewer. After 3 failed cycles in a row, pause and say why here.
- When Claude Code hits its usage limit, Codex builds (AGENTS.md); Claude Code reviews those cycles when it is back.
_(the runner writes here if it has to stop the project)_
