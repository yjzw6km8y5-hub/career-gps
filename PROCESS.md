# Career GPS build-and-review process (v1, 2026-10-02)

The single agreed description of how Career GPS is built and reviewed. It is the standard process (NEW_PROJECT_PLAYBOOK, first used for Viveka), adapted for Career GPS. Every participant follows it. Changes need the owner's approval.

## Roles (each in one fixed place)
| Role | Who | Where | Does |
|---|---|---|---|
| Owner | The project owner | Daily summary + Claude Code window | Sets intent, approves proposals once a day |
| Builder | Claude Code (Codex stands in when Claude hits its limit) | Owner's PC, project folder | Builds the next step in STATUS.md, tests, commits; imports approved proposals |
| Code and direction reviewer | Codex (Claude Code reviews Codex's own cycles) | Owner's PC, run by the AI Project Runner | Reviews every cycle's changes against the brief and context |
| Independent observer | ChatGPT, Career GPS project chat only | One ChatGPT scheduled task, every 2 hours | Reads this file first on every run; reviews progress, quality, safety and fidelity to the brief |
| Planner and milestone checker | Claude, Career GPS project chat only | claude.ai | Planning, and checks when the owner says "check Career GPS" |

Rule: a tool never checks its own work. No reviews happen in any other chat or window. The old manual process (consensus packets, the local spec-reviewer agent, code-reports and the feedback folder) is switched off.

## Where things live
- **GitHub repo** (single source of truth): https://github.com/yjzw6km8y5-hub/career-gps. It holds code, data, PROJECT_BRIEF.md, CONTEXT.md, DECISIONS.md, STATUS.md, reviews/, reviews/evaluations/ and proposals/.
- **Drive folder "AI Review Desk/Career GPS"** (mailbox): observer reviews, context files, and this process file. Older planning files stay there as history.
- **Drive folder "AI Review Desk":** daily-summary.md.
- **Runner:** Documents\AI-Consensus-Bridge on the owner's PC (`projects.json` entry `career-gps`).

## The loop
1. **Hourly (AI Project Runner):** Claude Code takes the next step in STATUS.md, builds and runs all tests (`npm --prefix app run check`). Codex then reviews: it reads PROJECT_BRIEF.md, CONTEXT.md, DECISIONS.md, STATUS.md and the last 5 reviews first. Claude Code fixes, re-tests and commits; the runner pushes. Reviews are saved in reviews/.
2. **Every 2 hours:** the ChatGPT observer reads this file and the repo, then saves a review to the Drive folder. Findings are labelled must-fix / should-fix / idea.
3. **At 8 PM:** the daily summary reads the Drive folder (read-only) and lists, in plain language: cycles run, Codex reviews, and new observer findings with their exact file versions.
4. **Approval:** the owner replies "approve" (or "approve except N") in the Claude Code window. Only then does Claude Code:
   - copy the approved findings into proposals/;
   - merge them into STATUS.md or CONTEXT.md;
   - commit and push.

   Must-fix items go to the top of STATUS.md.

## Who imports feedback and tracks approval
- Claude Code, in the owner's approval session, and nowhere else. Nothing from the Drive folder enters instruction files without the owner's approval.
- Every decision is logged in proposals/APPROVALS.md: date, source file, file version (modified time and SHA-256), each finding, and whether it was approved or rejected.
- An approval covers only the exact file versions listed. If a file changes afterwards, the new version waits for the next summary.

## Builder handoff
- When Claude Code hits its usage limit, Codex continues as builder from STATUS.md and CONTEXT.md (AGENTS.md). When Claude's limit resets, Claude Code takes back over.
- Codex reviews Claude Code's cycles; Claude Code reviews Codex's cycles when it is back.
- Each tool ends its turn with a short HANDOFF note in STATUS.md. `logs/cycles.csv` records who built and who reviewed each cycle.

## Urgent safety findings
- If the observer finds a problem that could harm a child or family, it puts URGENT-SAFETY on the first line of its review and in the title of its task notification.
- Examples: misleading financial guidance, an invented fact shown as checked, a sensitive question asked too early, or real child data appearing.
- Until real families use the app, an urgent finding blocks the next milestone and is handled first at the next approval.

## Failed cycles, recovery and health
- A cycle fails if tests still fail after the fix step, Codex cannot complete its review, or the push fails.
- After 3 failed cycles in a row, the project pauses and STATUS.md says why. It restarts when the owner says "resume" in the Claude Code window.
- The daily summary shows whether the runner, the Codex review and the observer reviews have worked recently.

## Release evidence (before any real family sees Career GPS)
- Every fact shown to a family is Researched: checked against its official source by a named person, with dates.
- The Marathi has been checked by a person.
- A privacy review by qualified counsel is done, covering India's DPDP Act and any other pilot jurisdiction.
- One timed walkthrough per journey is under 12 minutes.
- `npm --prefix app run check` passes.
- The owner signs off.

## Conflicting documents
Order of authority, highest first: the owner's latest approved decision, DECISIONS.md, CONTEXT.md, PROCESS.md, STATUS.md. PROGRESS.md is history only.

## Rules
- Subscriptions only. No API keys, no paid services. Pause when usage limits are hit.
- Work only in the project folder. Publish only to the project's repo.
- **The repo is public:** never commit personal data, real family details, local paths, passwords or keys.
- Every reviewer judges against PROJECT_BRIEF.md, CONTEXT.md and DECISIONS.md, not personal preference.
