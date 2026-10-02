# Status

_Control file for the AI Project Runner. Detailed history stays in PROGRESS.md._

## Must-fix (from approved reviews; do these first)
_None open. Human-only items (a timed walkthrough, a Marathi check by a person, evidence research by a named reviewer) are tracked in CONTEXT.md, not here._

## Next step
**Musician journey (Build 2), on the same engine.** The schema sample in `app/src/data/careers/musician.ts` becomes a full pathway:
1. Write a fuller musician pack:
   - attractions;
   - an example day;
   - routes: main (teacher → graded exams [to verify] → audition → course → work); lower-cost (government/community classes); after an unsuccessful audition (keep training / teach); related careers (music teacher, sound engineer, instrument repair);
   - decision gates; cost scenarios; support placeholders; actions for child, parent and school; musician wording overrides.
   - Every claim gets an EvidenceRecord labelled Example; every number is a `[placeholder]`.
2. Make it selectable from search ("Musician"), not "data coming".
3. Do not change screen components to fit the musician. If something can't be expressed, extend the schema, then update both packs.
4. Tests:
   - `cd app && npm run check` must pass;
   - add a journey e2e for the musician in English and Marathi at 390px, with no medical wording.

After each change: `npm --prefix app run check`.

## Done recently
- Cardiologist journey end to end:
  - branching pathway schema;
  - Route Readiness (no "Ready" on unverified facts);
  - Change something;
  - three owned actions;
  - Career Passport;
  - English + Marathi at 390px.
- Tests: 38 data/engine tests and 89 phone-size click-throughs.
- Moved to the standard process (PROCESS.md). The repo is public, with personal data removed from files and history.

## Handoff
_Newest note first. Each tool ends its turn with a note here (CLAUDE.md section 7)._
- 2026-10-02, builder: claude. Switched to the standard process: standard files created, repo published, runner entry added. No build cycle run in this turn. Next builder: start "Next step" (musician journey).

## Runner notes
- Do not read or import the AI Review Desk during cycles. Outside input reaches this file only through the owner's approval (CLAUDE.md section 5).
- Log every cycle in `logs/cycles.csv`, with builder and reviewer. After 3 failed cycles in a row, pause and say why here.
- When Claude Code hits its usage limit, Codex builds (AGENTS.md); Claude Code reviews those cycles when it is back.
- 2026-10-02: the project is set to HALTED in the runner on purpose. The first push to GitHub is blocked until the owner gives the GitHub sign-in the "workflow" permission (needed for `.github/workflows/ci.yml`). Resume with `node runner.js resume career-gps` after the first push succeeds.
_(the runner writes here if it has to stop the project)_
