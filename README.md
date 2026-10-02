# Career GPS

Shows a child and parent the real road to any career: the steps, the cost, the help available, and what to do this month.

**Status:** Week 1 build, demo with fictional children only. Pilot state: Maharashtra. The product spec lives in `Drive: AI Review Desk/Career GPS/`.

## Open the demo
- Double-click **`Open Career GPS.cmd`** in this folder. It opens `app/dist/index.html`: one file, works offline, fetches nothing from the internet.

## Folders
| Path | What it holds |
|---|---|
| `app/` | The product: React + TypeScript + Vite |
| `app/src/data/` | Demo family, Maharashtra state pack, careers, cardiologist route, figures (all `[placeholders]` for now), questions. Every text is English + Marathi. |
| `app/src/screens/` | Home and country, child screens, parent screens |
| `app/src/data/rules.test.ts` | Automatic checks of the never-change rules (no unsourced numbers, max 3 choices, money questions only after opt-in, Marathi complete) |
| `app/e2e/` | Click-through tests at phone size, in English and Marathi, using the Edge on this PC |
| `prototype/` | Sprint 0 clickable prototype (reference only) |
| `scripts/screenshots.js` | Saves phone-size screenshots for session reports |
| `.claude/agents/spec-reviewer.md` | The reviewer that checks every feature against the spec before the owner sees it |
| `docs/` | Tech setup, build plan with "done when" tests, fairness and privacy rules |
| `CLAUDE.md` | Session routine: feedback → build → check → review → report |
| `PROGRESS.md` / `DECISIONS.md` | What's done and next / technical decisions with date and reason |

## Commands (in `app/`)
```bash
npm run check
```
