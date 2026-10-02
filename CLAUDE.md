# Career GPS: standing rules for Claude Code

Instructions: `Drive: AI Review Desk/Career GPS/CLAUDE-CODE-START.md`, then each `CLAUDE-CODE-UPDATE-*.md` in order. Where they differ, the later update wins.

## Talking to the owner
- The owner is not a software engineer. Use very short, plain numbered steps.
- Run commands yourself; never ask the owner to type them unless unavoidable.

## Every work session
1. **Start:** read any `Drive: AI Review Desk/Career GPS/feedback\feedback-*.md` newer than the latest report in `...\code-reports\`.
   - Apply items marked MUST.
   - Ask the owner about items marked QUESTION.
   - Do the same whenever the owner says "continue".
2. **After every feature, before showing the owner anything:**
   - Run `node scripts/check-data.js`.
   - Run the `spec-reviewer` agent (`.claude/agents/spec-reviewer.md`). Fix every MUST-FIX it finds, then show the owner.
3. **End:** write a NEW report: `Drive: AI Review Desk/Career GPS/code-reports\report-YYYY-MM-DD-HHMM.md`.
   - Contents: what was built, what the owner decided, spec mapping (done / partly / not started), open questions, files changed.
   - Screenshots: `node scripts/screenshots.js "<code-reports folder>" report-YYYY-MM-DD-HHMM` (server must be running).
4. Update `PROGRESS.md`, and record technical decisions in `DECISIONS.md`.

## Never-change rules
- Users are parents and children with little schooling: pictures first, at most 3 choices per screen, one big number per screen, details on tap, regional language.
- Never invent a number. Every figure has a source link and date, or shows a `[placeholder]`.
- Information, not financial advice. No product ranking. "Talk to a registered adviser" button.
- Demo data only (fictional children) until the privacy review is done.

## Where things live
- Code stays in `%USERPROFILE%\Documents\CareerGPS`. Only reports, screenshots and feedback go on the H: drive.
- ChatGPT bridge: do NOT write consensus packets unless the owner says "cross-check with ChatGPT" (UPDATE-1).

## Commands
- Local server: `node scripts/serve.js` (http://localhost:4321)
- Rule checks: `node scripts/check-data.js`
- Report screenshots: `node scripts/screenshots.js <folder> <prefix>`
