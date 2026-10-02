# Career GPS: rules for AI code reviewers (Codex)

Claude Code follows `CLAUDE.md`; this file carries the same durable rules for Codex. Plans that change week to week live in `docs/BUILD-PLAN.md` and the Drive feedback files, not here.

## What the product is
Career GPS shows a child and parent the real road to a career: routes, readiness, costs, support and next actions. Users are parents and children with little schooling. Pilot: Maharashtra, English + Marathi. Demo data only (fictional children).

## Never-change rules (review every change against these)
1. **At most 3 primary actions visible at once** (`data-primary`). Lists, search results and browse cards may hold more.
2. **No sensitive question before value is shown.** Budget, place and income are asked only where they change a route, cost or scheme, with a reason and Skip. Occupation and land are never asked.
3. **Never invent a number.** Every factual claim links to an `EvidenceRecord` (source, geography, effective date, retrieval date, review status, expiry rule). Unsourced = visible `[placeholder]`, labelled Example.
4. **Nothing is "Ready" or "Researched" on unverified facts.** Route Readiness has five areas (Ready / Gap / Unknown) and never one overall score.
5. **Information, not financial advice.** No product ranking, no "best/safe/guaranteed" wording (English or Marathi), and a registered-adviser button wherever savings appear.
6. **English and Marathi parity.** Every text exists in both; Marathi must be faithful, plain and gender-neutral when addressing the child.
7. **Screens never name a career.** Careers are data packs (`app/src/data/careers/*.ts`) on one schema (`app/src/data/schema.ts`).
8. **Works at 390px** with no horizontal scroll and 44px tap targets.
9. **Privacy:** no real child or family data, no analytics, nothing fetched from or sent to other sites.

## Checks that must pass (CI)
```bash
cd app && npm ci && npm run check
```

## Review output
Each finding: ID; severity BLOCKER / MUST / SHOULD / QUESTION; file or screen; evidence (quote); required outcome. No praise. Review read-only; never push or merge.
