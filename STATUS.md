# Status

_Control file for the AI Project Runner. Detailed history stays in PROGRESS.md._

## Must-fix (from approved reviews; do these first)
_None open. Human-only items (a timed walkthrough, a Marathi check by a person, evidence research by a named reviewer) are tracked in CONTEXT.md, not here._

## Next step
**Bank-by-bank comparison** (BUILD-PLAN order: straight after "Where to keep the money"). Opened from the savings explainer, for RD and FD:
1. Data, not screen code: a list of banks and the Post Office.
   - Per product: rate `[placeholder]`, minimum, term, and an EvidenceRecord (official page, retrieval date, effective date, expiry rule "re-check every quarter").
   - Bank names may be listed. Every rate stays a `[placeholder]` until a named person verifies it from the bank's official page.
2. Inclusion rule shown on screen: `[objective inclusion rule: owner to decide]`. Example from the spec: all scheduled banks above a set size. It is an open owner decision in DECISIONS.md.
3. Alphabetical order. No "best" badge, no default, no highlighting, no referral links. Expired or unverified rates say "check the bank's site".
4. At most 3 primary actions; the list itself is not primary. Works at 390px in English and Marathi; accessibility check passes.
5. Tests: unit tests (alphabetical, no badges, every rate has evidence, no banned words EN/MR); e2e; a11y.

After each change: `npm --prefix app run check`.

## Done recently
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
- 2026-10-03, builder: claude (owner's session). Also built: "Where to keep the money", Listen button, focus handling. All checks pass (83 + 214). Next builder: bank-by-bank comparison (Next step).
- 2026-10-03, builder: claude (owner's session). Built: musician journey, use-case bank, accessibility checks and fixes. Codex: please review everything from 1fe96ab.
- 2026-10-02, builder: claude. Switched to the standard process: standard files created, repo published, runner entry added.

## Runner notes
- Do not read or import the AI Review Desk during cycles. Outside input reaches this file only through the owner's approval (CLAUDE.md section 5).
- Log every cycle in `logs/cycles.csv`, with builder and reviewer. After 3 failed cycles in a row, pause and say why here.
- When Claude Code hits its usage limit, Codex builds (AGENTS.md); Claude Code reviews those cycles when it is back.
_(the runner writes here if it has to stop the project)_
