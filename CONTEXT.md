# Career GPS: shared context for builders and reviewers

_Updated: 2026-10-02. Merged from the earlier Claude and ChatGPT planning work (consensus packets, now in `reviews/old-manual-process/`), the planning-chat feedback files of 2026-10-02, and this repo's DECISIONS.md._

Read this before judging any Career GPS work, together with PROJECT_BRIEF.md, STATUS.md, DECISIONS.md and the latest files in `reviews/`. Owner decisions are marked as decisions. Reviewer suggestions stay proposals until the owner accepts them.

## Vision (owner)
- A lifelong, flexible career advisor, not a one-time quiz. It starts young and evolves with the child into adulthood.
- Any career: sciences, professions, arts, music, sports, trades, entrepreneurship, combinations.
- Honest about how realistic a path is, what it takes and costs, how to fund it, and the alternatives.
- Simple enough that a parent with little schooling understands it and can act on it this month.

## Fixed decisions (owner)
- **Look:** "Night Sky" with a deep-orange accent; not any bank's brand colours, because the app compares banks neutrally. No cosmetic redesign for now.
- **Pilot:** Maharashtra; English and Marathi. Marathi is checked by AI for now; a person must check it before families see it.
- **Opening:** "What future are we exploring today?" (Search for a dream / Show me possibilities / Continue a saved journey). "Explore together" is the default; Parent/Child is a small switch.
- **No sensitive onboarding:** budget, place and income only where they change a route, cost or scheme, each with a reason and Skip. Never occupation or land.
- **Route Readiness for now, not a 1–10 score.** Five areas, each Ready/Gap/Unknown with a reason and an action. A parent 1–10 score may come later, only with a validated formula, fairness tests and a methods page.
- **Branching pathway model** with reusable entities: CareerOutcome, Route, Stage, DecisionGate, EligibilityRule, CostScenario, SupportScheme, AdjacentCareer, Action, EvidenceRecord, ReviewStatus.
- **Rule change:** "at most 3 primary actions visible at once" (lists, search results and browse cards may hold more).
- **Evidence:** every claim keeps source, geography, effective date, retrieval date, reviewer status and expiry rule. Nothing is Researched until a named person checks it.
- **Sequence:** cardiologist journey → musician → "Where to keep the money" → bank-by-bank comparison → India vs abroad → field check.
- **Public repo** (2026-10-02). It contains no personal data, family details, passwords or keys.

## Guardrails (owner)
- Information, not financial advice. No ranking, no "best/safe/low risk/guaranteed" wording, product-specific risk lines, and a registered-adviser button.
- Demo data only (fictional children). No accounts, analytics or tracking. Nothing is fetched from or sent to other sites.
- Never "impossible". A gap always comes with an action and an alternative.
- Fairness: gender, category, caste, religion, disability, region, parents' occupation and land are never readiness inputs. "Unknown" (skipped) never counts as worse.

## Current facts status
- The cardiologist steps follow the agreed path draft (`reviews/old-manual-process/packet-2026-10-01-cardiologist-path-CONSENSUS.md`). Every step is still marked "rules may change" until checked against NTA, MCC, State CET Cell, NMC, NBEMS, MahaDBT and NSP sources.
- Every fee, seat count, mark threshold, scholarship amount and duration is a `[placeholder]`.

## Open proposals (not yet owner decisions)
- A PR-based dual-review loop with Codex and Claude on GitHub (feedback-2026-10-02-03). Superseded by the standard process in PROCESS.md for now. Its CI workflow is kept.

## Known open items
- One timed walkthrough of the cardiologist journey by a person (target: under 12 minutes).
- A human check of the Marathi.
- Evidence research by a named reviewer.
- Calendar start date for the build order.

## Review process
- The build-and-review loop is in PROCESS.md.
- Order of authority, highest first: the owner's latest approved decision, DECISIONS.md, CONTEXT.md, PROCESS.md, STATUS.md. PROGRESS.md is history only.
- Outside input waits in proposals/ for the owner's approval; every decision is logged in proposals/APPROVALS.md.
- Update this file only for newly confirmed owner decisions.
