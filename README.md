# Career GPS

Shows a child and parent the real road to any career: the steps, the cost, the help available, and what to do this month.

**Status:** One complete cardiologist journey (demo, fictional child). Pilot state: Maharashtra. Goal and scope: PROJECT_BRIEF.md. How it is built and reviewed: PROCESS.md. Current step: STATUS.md.

## Open the demo
- Double-click **`Open Career GPS.cmd`** in this folder. It opens `app/dist/index.html`: one file, works offline, fetches nothing from the internet.

## Folders
| Path | What it holds |
|---|---|
| `app/` | The product: React + TypeScript + Vite |
| `app/src/data/` | Pathway schema (`schema.ts`), career packs (`careers/cardiologist.ts`, `careers/musician.ts` sample), Maharashtra pack and catalogue (`common.ts`). Every claim has an evidence record; every number is a `[placeholder]` until verified. English + Marathi. |
| `app/src/lib/plan.ts` | The pathway engine: readiness, cost scenarios, support matching, actions, and what changed |
| `app/src/screens/` | Opening, search, possibilities, and the 12 journey steps |
| `app/src/**/*.test.ts` | Automatic checks: schema integrity for every career, evidence fields, no invented numbers, Marathi complete, readiness and Change-something logic |
| `app/e2e/` | Click-through tests at phone size, in English and Marathi, using the Edge on this PC |
| `prototype/` | Sprint 0 clickable prototype (reference only) |
| `scripts/screenshots.js` | Saves phone-size screenshots for session reports |
| `docs/` | Tech setup, build plan with "done when" tests, fairness and privacy rules |
| `CLAUDE.md` / `AGENTS.md` | Rules for the builder (Claude Code) and for Codex (reviewer, stand-in builder) |
| `PROJECT_BRIEF.md`, `CONTEXT.md`, `STATUS.md`, `PROCESS.md` | Brief, merged decisions, current step, the build-and-review loop |
| `reviews/`, `proposals/`, `logs/` | Codex and Claude reviews; outside findings awaiting approval; cycle log |
| `PROGRESS.md` / `DECISIONS.md` | History only / every decision with date and reason |

## Commands (in `app/`)
```bash
npm run check
```
