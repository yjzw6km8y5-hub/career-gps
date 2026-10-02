# Career GPS

Shows a child and parent the real road to any career: the steps, the cost, the help available, and what to do this month.

**Status:** Sprint 0, a clickable demo with fictional children only. Product spec lives in `Drive: AI Review Desk/Career GPS/`.

## Open the demo
- Double-click **`Open Career GPS.cmd`** in this folder. It opens `prototype/index.html` in your browser.
- To compare the two looks side by side, click **"See both side by side"** at the bottom of the page.

## Folders
| Path | What it holds |
|---|---|
| `prototype/` | The clickable page (plain HTML, CSS, JavaScript; no install needed) |
| `prototype/data/` | Demo family record, figures (all `[placeholders]` for now), screen text in English / Marathi (Kannada kept for a later Karnataka pack, not shown); Maharashtra state pack |
| `scripts/check-data.js` | Checks the product rules: no unsourced numbers, every screen labelled, demo data only |
| `scripts/serve.js` | Optional local web server (`node scripts/serve.js`, then http://localhost:4321) |
| `docs/` | Tech setup, build plan with "done when" tests, fairness and privacy rules |
| `scripts/screenshots.js` | Saves phone-size screenshots for session reports |
| `.claude/agents/spec-reviewer.md` | The reviewer that checks every feature against the spec before the owner sees it |
| `CLAUDE.md` | Session routine: feedback → build → review → report |
| `PROGRESS.md` | What is done and what is next |
| `DECISIONS.md` | Technical decisions, with date and reason |

## Checks
```bash
node scripts/check-data.js
```
