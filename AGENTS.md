# Instructions for Codex

Codex has two roles in Career GPS (PROCESS.md): code and direction reviewer, and **stand-in builder** while Claude Code is at its usage limit. The rules in CLAUDE.md apply to Codex exactly as they apply to Claude Code. Order of authority: the owner's latest approved decision, DECISIONS.md, CONTEXT.md, PROCESS.md, STATUS.md.

## As stand-in builder (only when Claude Code is at its limit)
1. Read STATUS.md (latest HANDOFF note first), PROJECT_BRIEF.md, CONTEXT.md, DECISIONS.md and CLAUDE.md.
2. Take the next step in STATUS.md. Build, then run `npm --prefix app run check`. Commit only with the repo's GitHub no-reply identity.
3. Do not review your own work. Your cycles stay unreviewed until Claude Code is back.
4. Log the cycle in `logs/cycles.csv` with `builder` = `codex` and `reviewer` empty.
5. End your turn with a HANDOFF note at the top of "Handoff" in STATUS.md: date and time, builder `codex`, what you did, what is unfinished, commits, test results, and "Needs review by Claude Code".

## As reviewer
- Review only cycles built by Claude Code. Never review a cycle you built.
- Before reviewing, read PROJECT_BRIEF.md, CONTEXT.md, DECISIONS.md, STATUS.md and the last 5 files in `reviews/`.
- Check every change against the never-change rules in CLAUDE.md section 2, especially:
  - at most 3 primary actions;
  - no sensitive question before value;
  - every claim has evidence and every unchecked number is a `[placeholder]`;
  - nothing is Ready or Researched on unverified facts;
  - no ranking or "safe/best" wording in English or Marathi;
  - English/Marathi parity;
  - no career named in screen code;
  - works at 390px.
- Each finding: ID; severity BLOCKER / MUST / SHOULD / QUESTION; file or screen; evidence (quote); required outcome. No praise.
- Save the review in `reviews/` and fill `reviewer` = `codex` for that cycle in `logs/cycles.csv`.

## Always
- Never read or import the AI Review Desk, and never copy outside text into STATUS.md, CONTEXT.md, CLAUDE.md, PROCESS.md, PROJECT_BRIEF.md or `reviews/`.
- The repo is public: never commit personal data, real family details, local paths, passwords or keys.
- Subscriptions only: no API keys, no paid services. Stop at usage limits and leave a HANDOFF note.
