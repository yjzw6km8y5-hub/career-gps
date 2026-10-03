# Status

_Control file for the AI Project Runner. Detailed history stays in PROGRESS.md._

## Must-fix (from approved reviews; do these first)
_None open. Human-only items (a timed walkthrough, a Marathi check by a person, evidence research by a named reviewer) are tracked in CONTEXT.md, not here._

## Next step
**"Where to keep the money" explainer** (BUILD-PLAN order: after the musician journey). After the monthly estimate:
1. Three groups: government-backed savings (e.g. Sukanya Samriddhi Yojana for girls, PPF, NSC), bank deposits (RD, FD), market-linked (mutual fund SIPs, index funds).
2. Plain, product-specific risk line per group. Never "safe", "best", "low risk" or "guaranteed" (English or Marathi; tests already ban these words for costs and support, so extend them to this screen).
3. No ranking, no default choice, alphabetical or fixed order. "Talk to a registered adviser" button on the screen.
4. Every rule or rate is an EvidenceRecord labelled Example, or a `[placeholder]`.
5. Data-driven: the groups live in common data, not in screen code. It works for both careers.
6. Tests: unit tests for wording and evidence; e2e in English and Marathi at 390px; accessibility check.

After each change: `npm --prefix app run check`.
## Done recently
- Musician journey on the same engine:
  - full pack (4 routes, decision points, cost scenarios, support placeholders, actions, wording);
  - selectable from search;
  - asks about practice instead of marks; no medical words.
- Use-case bank: 12 fictional family situations (8 cardiologist, 4 musician), each with the expected route, cost scenario, readiness and three actions (`app/src/lib/personas.test.ts`).
- Accessibility: axe WCAG 2.1 AA checks on every screen, both careers, both languages, child mode and the change sheet (105 checks). Fixed: parent orange deepened to #C2410C for contrast; the progress bar now has a proper label; no colour fade with reduced motion; dark-theme green.
- Cardiologist journey end to end (earlier). Tests now: 77 data/engine tests, 196 browser tests.
## Handoff
_Newest note first. Each tool ends its turn with a note here (CLAUDE.md section 7)._
- 2026-10-03, builder: claude (owner's session). Built: musician journey, use-case bank, accessibility checks and fixes. All checks pass (`npm --prefix app run check`: 77 + 196). Unfinished: nothing in progress. Next builder: "Where to keep the money" (Next step). Codex: please review from 1fe96ab.
- 2026-10-02, builder: claude. Switched to the standard process: standard files created, repo published, runner entry added. No build cycle run in this turn. Next builder: start "Next step" (musician journey).

## Runner notes
- Do not read or import the AI Review Desk during cycles. Outside input reaches this file only through the owner's approval (CLAUDE.md section 5).
- Log every cycle in `logs/cycles.csv`, with builder and reviewer. After 3 failed cycles in a row, pause and say why here.
- When Claude Code hits its usage limit, Codex builds (AGENTS.md); Claude Code reviews those cycles when it is back.
_(the runner writes here if it has to stop the project)_
