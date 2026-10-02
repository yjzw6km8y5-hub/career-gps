# Career GPS: build plan

Sources: `packet-2026-10-01-full-scope-spec.md` (Final draft), `packet-2026-10-01-scope-addendum.md` (Final draft), `packet-2026-10-01-cardiologist-path.md`, `FINAL-PLAN-fast.md`.
**Product direction since 2026-10-02:** `feedback-2026-10-02-01.md` and `feedback-2026-10-02-02.md` (the owner's decisions), plus the owner's pasted direction update. Where they differ from the older plan, they win.

## 1. Rules that never change
- Users are parents and children with little schooling. Pictures first, **at most 3 primary actions visible at once** (lists, search results and browse cards may hold more), one big number per screen, details on tap, regional language.
- Never invent a number. Every factual claim keeps its **source, geography, effective date, retrieval date, review status and expiry rule** (`EvidenceRecord`). Unsourced items stay visible `[placeholders]`, labelled **Example**, in demo mode only.
- Information, not financial advice. No product ranking. A "Talk to a registered adviser" button wherever savings appear.
- Demo data only (fictional children) until the privacy review is done.
- **No sensitive question before value is shown.** Ask budget, place or income only at the step where the answer changes a route, cost or scheme match. Say why it is asked, and always allow Skip. Occupation and land are not asked.

## 2. Builds: each one ends with something you can click

| Build | Clickable result | Done when |
|---|---|---|
| **0 (done)** | Sprint 0 prototype: first screen, look B with deep orange, Maharashtra, English + Marathi | Opens by double-click; reviewer passes |
| **1 (done)** | React app, English + Marathi everywhere, country switch (Canada/US Planned), tests | Click-through in both languages at phone size |
| **Journey (built 2026-10-02)** | **One complete cardiologist journey for a fictional Maharashtra student:** "What future are we exploring today?" (Search / Possibilities / Continue saved, with Together as the default mode) → Dream (what draws you) → family relay → Career reality (incl. an example day) → Routes (main, lower-cost, after an unsuccessful entrance attempt, related careers; decision points; progress that carries over) → Where I am (stage checkpoints) → Route Readiness (5 areas) → Cost scenarios (government/private, near home/away) → Support → Funding gap → Monthly estimate → Next three actions (child, parent, school) → Review date → Career Passport. Plus "Change something" (budget, marks, location, entrance result, interest). | Under 12 minutes; at least 3 different routes; one change visibly changes the plan; no sensitive question before value; three clear actions at the end; 390px in English and Marathi; all claims labelled Example; the musician fits the same schema with no component change |
| **Next: Musician (Build 2)** | The full musician journey on the same engine (the schema sample becomes a real pathway: training, auditions, community classes, related careers) | The same screens run it with no code change; reviewer passes |
| **Then: "Where to keep the money"** | An explainer after the monthly estimate: government-backed savings (e.g. SSY, PPF, NSC), bank deposits (RD/FD), market-linked (mutual fund SIPs); plain, product-specific risk wording; no ranking; registered-adviser button | No "best/safe" wording in either language; every rate or rule has evidence or is a `[placeholder]` |
| **Straight after: bank-by-bank comparison** | RD/FD rates by bank, each with a dated official source; alphabetical; no default; a clear inclusion rule | Every rate shows source and date; expired rates are flagged; no ranking or badges |
| **After that** | Study in India vs abroad tracks; then field check (FINAL-PLAN-fast weeks 7–12) | — |

**Target weeks** (calendar start date still to be set by the owner): Musician next week; "Where to keep the money" the week after; bank comparison the week after that, once official rates have been researched and checked by a person.

**Research in parallel:** official sources for each cardiologist evidence record (NTA, MCC, State CET Cell, NMC, NBEMS, MahaDBT, NSP), checked by a named person. Each verified record turns its claims from Example to Researched automatically.

**Not built yet (by decision):** bank comparison tables (until the step above), accounts or real-child data, teacher dashboard, payments, a numerical feasibility score, six full careers, psychometric testing, Canada/US beyond Planned labels, cosmetic redesign. The "competitor parity by launch" goal is dropped.

**Decision gates (the owner's):**
- **Decided:** look B with deep orange; Maharashtra; Marathi checked by Claude for now, by a person before families; Route Readiness instead of a number for now; Together as the default mode.
- **Still open:** calendar start date; whether to add a parent 1–10 score later. That needs a validated formula first: readiness keeps five separate areas so a score could sit on top without changing them.

## 3. Fairness: Route Readiness and any future score
- **Readiness has no overall score.** Five areas (eligibility, preparation, affordability, opportunity, evidence confidence), each shown as Ready / Gap / Unknown with its reason and one action.
- **Inputs today:** class, subjects, a rough marks band, a rough budget, near-home or away, entrance result, interest. Income is used **only** to match income-based schemes, and only if the family chooses to answer.
- **Never inputs:** gender, category, caste, religion, disability, region of origin, parents' occupation (it can stand in for caste), land.
- **Unknown is not a gap.** Skipped questions show "Unknown" with a reason, never a worse result.
- **Before any numerical score is added:** a validated formula, a distribution test across fictional profiles (income bands, town/city/village, gender, category, disability) with a `[threshold]` set with a reviewer, review by someone who did not write it, and a methods page with version and date.

## 4. Child-privacy basics
- **Now (demo):** fictional children only. No accounts, analytics, ads or tracking, and nothing is fetched from or sent to any other site. "Continue a saved journey" keeps the fictional journey in this browser only; "Start a new journey" clears it.
- **Before any real child:** privacy counsel review for each pilot jurisdiction. India: the Digital Personal Data Protection Act, 2023 and its rules on children's data and parental consent `[to confirm with counsel]`. Canada: federal and provincial privacy law `[to confirm with counsel]`.
- **Built in from the first real account:**
  - collect only what is needed;
  - encryption in transit and at rest;
  - role-based access;
  - an audit log;
  - retention periods `[set with counsel]`;
  - consent records;
  - backup and recovery;
  - a breach-response plan;
  - download and delete on request;
  - no advertising or profiling of children.

## 5. Kept from the addendum
- **Compare careers** later as short swipe screens, never one crowded screen. At most 3 careers.
- **Risk wording is product-specific** (for the savings explainer). Never "safe" or "low risk".
- **An official link counts as help** only if the family can actually use it: same cost, their language, their reading level, no account they cannot open.
