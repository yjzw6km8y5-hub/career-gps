# Consensus result — packet-2026-10-01-full-scope-spec.md

Result: NO FULL CONSENSUS — the owner to decide open points
Lead: Claude | Reviewer: ChatGPT | Calls: Claude 2, ChatGPT 3
Finished: 10/1/2026, 7:18:01 PM

## Final draft

# Career GPS — Product Scope (build spec for Claude Code)

## 0. Principles
- Mission: no child should feel a career is out of reach because of constraints. Show the child and parent *how*, honestly and simply.
- Any career: sciences, professions, arts, music, sports, trades, entrepreneurship, combinations of fields.
- Information, not advice. No paid ranking. No invented figures.
- One simple interface that child and parent can use together.

## 1. First screen: who is using it
- "Who is using this?" shows two choices only: **Parent** and **Child**.
- Both roles work on the SAME shared family plan, each with its own language, tone and screens.
  - Child view: game-like, simple words.
  - Parent view: money, steps, deadlines.
- Future roles (not shown in v1): Teacher/counsellor, and the child as an adult on their own account.

## 2. Family profile (about 2 minutes, mostly taps)
- Child: age/class, state, board, recent marks (optional), interests (picture cards), things the child enjoys doing.
- Family: monthly income band, current education savings (optional), city/town/village.
- Child's gender is used only to match gender-specific schemes. Category is used only for scholarship matching and is optional.
- Both are stored minimally, with a plain-language "why we ask". Neither is ever an input to the feasibility score (see §4).
- Every field can be skipped. Missing data lowers match precision and is shown as such. It never blocks the user.
- Language: regional language and a simple low-literacy mode are part of v1 design. The first languages are [language list, set by the chosen state(s)]. Audio follows later.

## 3. Geography and access model
- State is a configuration, not hard-coded. Pilot state(s): [Karnataka and/or Maharashtra, to be decided by the owner]. Each state has its own data pack: colleges, schemes, portals.
- Scholarships may include ones outside India. Each scholarship record carries its country.
- Access model (brief): free for families who cannot pay, including free use in government schools. Revenue comes from institutions (governments, CSR, schools, others) in a way that does not hurt families. Pricing is [to be defined] and is not built in v1. The data model keeps "free tier" and "institution-sponsored" flags so the model can be added later.
- Canada/US is a separate commercial version (see §10).

## 4. Career Match Matrix (core decision screen)
**Career coverage**
- Career taxonomy: [number] top-level families and sub-careers, each with a unique ID, aliases and local-language names. Entrepreneurship, trades, arts and sports are first-class families.
- A career with no data yet still appears via search, with "data coming" and a request button. It never shows made-up numbers.
- Authoring workflow: a career-data template, a source-and-reviewer checklist and a publish gate (see §12). Pilot careers: cardiologist, software engineer, electrician, civil services, musician, cricketer. Coverage targets by sprint: [number].
- Multi-field careers are supported: a child can hold several careers on the same plan.

**Columns** (compare up to 3 side by side)
- Interest fit (from the child's picks).
- Lifestyle: work hours, travel, physical demand, job stability, work location.
- Pay: at start, at age 28, at age 35. Each is a range with source and date.
- Honest outcomes: share of entrants who support themselves in the career (see outcome-measure methodology below). Shown only where a published source meets the methodology. Otherwise [placeholder].
- Cost to reach the career: low/typical/high.
- Years until earning.
- Competition level, with the source (for example seats vs applicants).
- Feasibility score, 1–10, for this child (below).

**Outcome-measure methodology (published in-app and on the methods page)**
- Every "honest outcomes" figure records: the denominator (who counts as an entrant, and when they are counted), the time horizon (for example years after entry), the earnings threshold for "supports themselves" and its source, the employment definition (full-time, part-time, self-employed, gig), and how portfolio or multiple-career workers are treated.
- Figures are compared side by side only when these definitions are compatible. If they are not, each is shown separately with its definition and the comparison cell reads "not comparable".
- Per career, a labour-market or education-data specialist confirms whether a reliable measure exists before the figure is published. Until then: [placeholder].

**Feasibility score**
- It is a composite of four indicators, each shown on its own with its inputs:
  1. Eligibility: marks and subjects vs the route requirement.
  2. Preparation: time left to meet requirements.
  3. Affordability: cost vs family capacity, **after** scholarships, government seats and cheaper routes (uses the scholarship/seat matcher from Sprint 2).
  4. Opportunity: competition and seats.
- Weights and formula are published in-app and in a methods page, with version and date.
- Protected traits are excluded: gender, category, religion, caste, disability, region of origin. Location enters only where a real access factor exists (for example whether a college or exam centre is reachable), and is stated.
- Missing inputs widen a range and show a "less certain" flag. They are never filled in silently.
- Tap the score to see why, and what would raise it. The wording is never "impossible". Low scores show the specific steps and alternatives (catch-up plan, cheaper route, related career).
- The score is a planning aid, not a prediction of the child's ability or worth. This is stated on screen.
- Governance: score distributions are tested across income and location bands before each release ([test criteria]). A human reviews the formula before each change. Users can flag a wrong input or score for correction, with a [response time] target.

**Interaction**
- Sort and filter by any column.
- The child unlocks career cards by finishing small quests.

## 5. Route and college selection
- Routes: main, affordable, alternative.
- Then specific colleges: government vs private, location, fees per year, hostel, seats, past cut-off ranges, official link, each with source and date. Selection feeds the money plan.
- Non-college paths (apprenticeship, ITI, self-taught, sports academy, music training, starting a business) use the same route structure with their own cost and time fields.

## 6. Money plan (scenario calculator)
- Total cost of the chosen route = fees + hostel + coaching + exams + travel, each line sourced and dated.
- Inflation-adjusted to the year each cost falls due. The inflation assumption is [rate, source, date], editable by the user.
- Output wording: "Under these assumptions, saving ₹X a month from [month] would reach ₹Y by [year]." Assumptions are shown next to it. It also shows two or three alternative scenarios (different amount, different timeline, with/without scholarship).
- "Where to save": a neutral comparison table, not a recommendation.
  - Columns: current rate, lock-in, tax treatment, risk, flexibility, as-of date, source link.
  - Default order is alphabetical. The user can re-sort. There is no "best" badge and no default selection.
  - India: Sukanya Samriddhi Yojana (girls; eligibility rules), PPF, NSC, bank RD, bank FD, savings account, mutual fund SIP (marked market-risk, no return shown).
  - Banks and Post Office: inclusion rule is [objective criterion, for example all scheduled banks above a set size]. Rates come from official bank or government pages, with retrieval date and archived copy. A bank without a verified current rate shows [placeholder].
  - Canada: RESP, Canada Education Savings Grant, Canada Learning Bond. US: 529 plan. Rules and amounts come only from government sources.
- Shows how scholarships and government seats lower the monthly figure.
- Fixed notice: "Information only, not financial advice. Rates change; confirm with the provider before acting."

## 7. Scholarships and schemes
- Matched by eligibility (state, marks, income, gender, category, course, country).
- Each record: amount, deadline, documents, official portal (National Scholarship Portal, state portals such as SSP Karnataka and MahaDBT, and others by state pack), source and date.
- Deadline reminders. Records past their expiry rule are hidden or marked "check the portal".
- Eligibility is shown as "may be eligible, confirm on the official portal". The app does not claim to decide eligibility.
- Build order: a minimal matcher (a small set of sourced scholarships and government seats for the Sprint 2 career) ships in Sprint 2. Coverage expands in Sprint 4.

## 8. Progress trackers and gamification
- Milestone checklist per age/class: child quests and parent tasks.
- Savings tracker: target vs actual deposits, shown as on-track or behind. Deposits are entered by the family in v1.
- Marks tracker vs route requirement.
- Upcoming deadlines (exams, forms, scholarships).
- When off track: automatic re-plan with options (catch-up amount, cheaper route, related career).
- Gamification: points, badges and streaks for completed steps, plus a shared family progress bar.
- Guardrail: rewards are for effort and completed steps, never for marks or savings amounts. Streak loss is soft ("pick up again"), with no public leaderboards between children.

## 9. Career Passport and lifelong use
- One file per child across the years. Downloadable PDF and version history. Export in an open format (data portability).
- Annual reassessment prompt: update marks, interests, family finances, and re-run the matrix.
- Goals can change. Past choices stay in history and nothing is deleted without the user's say-so.
- Several careers can be active at once.
- Adult transition: at [age of majority, by jurisdiction] the child is prompted to take over the account. Parent access then needs the young person's consent.
- Consent is re-asked at that point and whenever data use changes.
- Ownership transfer: parent to child, or to another guardian, with a record of the change.
- Deletion and download on request.

## 10. Integrations (phased)
- v1: curated data tables with source and date, refreshed on a [schedule] by the update tool. Links out to official portals and banks.
- v2: WhatsApp/SMS reminders, phone OTP login, PDF export.
- v3 (needs partnerships or licences):
  - India Account Aggregator (consented read of savings).
  - Bank/RESP provider links, only under this rule: compensation never affects inclusion, order, scores, defaults or presentation. Any referral link sits in a separate, labelled area with the compensation disclosed.
  - School dashboards.
  - DigiLocker for marks, if permitted.
  - Government of India integration, as a possible later route.
- Canada/US commercial version: RESP/529 views and bank linkage, subject to the same neutrality rule.

## 11. Design
- Child: bright, friendly, game-like. Parent: calm and clear.
- Big buttons, few words, icons, regional language. Audio later.
- The owner picks one of two style options before the build.
- A "Brihat" showcase path: a polished walkthrough on pilot-career data for presentations. It uses only sourced data or visible [placeholders].

## 12. Data accuracy rules
- Every displayed figure carries: primary or published source link, effective/as-of date, geography, retrieval date, reviewer name and status, expiry rule, and an archived copy of the source.
- A figure without these is not published. It renders as [placeholder]. There is no "Example" label on live figures. Sample data exists only in a clearly marked demo mode.
- AI tools (ChatGPT Deep Research, Claude) may find and draft. Each figure is verified against its source by a named human reviewer before publishing. The bridge cross-check is an extra check, not the approval.
- Expired data is flagged automatically and shown as "check the source".
- Users can report errors. Corrections are logged with a date.

## 13. Build plan (Claude Code), weekly demoable deliverables
Each sprint is one week and ends with a build the owner can click and show. If a sprint's scope does not fit in a week, it is split into named weekly milestones (for example 3a, 3b), and each milestone also ends in a clickable build. Weeks are numbered in order; calendar start date is [set by the owner].
- **Sprint 0 — decisions:** pick the pilot state, the two style options, the data schema, the source-record format and the project folder with test and data-update commands.
- **Sprint 1:** app skeleton, Parent/Child role choice, profile, design system, regional-language switch.
- **Sprint 2 — one end-to-end slice:** ONE career → route → college → money plan, with fully sourced data, a minimal sourced scholarship/government-seat matcher for that career, automated tests and the data-update tool. This proves the evidence rules before scale. Split into 2a (career, route, college) and 2b (money plan and matcher) if needed.
- **Sprint 3:** the Career Match Matrix across the 6 pilot careers, the transparent feasibility score (affordability uses the Sprint 2 matcher) with the methods page and outcome-measure methodology, and career search with the "data coming" state. Likely split: 3a matrix columns and search, 3b feasibility score and methods page.
- **Sprint 4:** India savings-instrument and bank comparison (neutral rules, as-of dates), then expanded scholarships and schemes coverage across the pilot state(s). Likely split: 4a savings and banks, 4b scholarships.
- **Sprint 5:** progress trackers, gamification, deadline reminders.
- **Sprint 6:** Career Passport (PDF, history, annual reassessment), then the Canada RESP view, polish, deploy. Likely split: 6a Passport, 6b Canada RESP and polish.
- Data research runs in parallel each sprint. The publish gate in §12 applies to every sprint.

## Open points for the owner

- ERROR — “Each sprint is one week and ends with a build the owner can click,” but “Sprint 0 — decisions” produces no clickable build, and several later splits are only “likely.” This still violates the weekly-demo requirement. Fix: convert every split into fixed numbered weeks with explicit clickable outputs and acceptance criteria; make Sprint 0 deliver a clickable shell demonstrating the chosen style, schema-backed sample record, and language switch.

- ERROR — “score distributions are tested across income and location bands” does not implement the previously accepted disparate-impact safeguard. Gender and category are collected, while disability and other relevant proxies may still affect outcomes even when excluded directly. Fix: define privacy-preserving fairness tests across all legally permissible relevant groups and proxy variables, minimum sample rules, failure thresholds, remediation, and independent review. Where testing is legally or statistically impossible, document that limitation and require qualitative accessibility review.

- ERROR — The document is not yet executable as a Claude Code build specification. It lacks the selected stack, repository structure, data schemas, authentication/authorization model, storage approach, test levels, deployment target, accessibility standard, and feature-level acceptance criteria. Fix: add a technical implementation section and testable “done when” criteria for every weekly build, leaving genuinely undecided choices as explicit decision gates rather than letting Claude Code infer them.

- UNCERTAIN — The product stores children’s marks, finances, gender/category, account ownership, and savings activity, but specifies no child-privacy, security, retention, breach-response, parental-consent, or jurisdictional compliance requirements. Applicability depends on pilot jurisdictions and operating model. Fix: identify the initial jurisdictions and have qualified privacy counsel determine applicable requirements; meanwhile specify data minimization, encryption, role-based access, audit logs, retention periods, consent records, backup/recovery, and prohibition on advertising or profiling children.

VERDICT: NEEDS CHANGES

## Full exchange

### ChatGPT — review

- ERROR — “Parent / Child / Teacher.” The required first choice is parent or child; an inactive “teacher later” option creates an unsupported path. Fix: show only Parent and Child initially; document Teacher as a future role.

- ERROR — “For every career” conflicts with “6 careers” in Sprint 2 and does not specify expansion to “absolutely arbitrary any career,” including entrepreneurship, trades, multiple fields, arts, and sports. Fix: define a scalable career taxonomy, search, career-data schema, authoring workflow, and staged coverage targets using `[number]` placeholders.

- ERROR — “Feasibility score…marks vs requirement, money gap…competition” risks presenting wealth and current marks as a child’s inherent career viability. Fix: separate eligibility, preparation, affordability, and opportunity indicators; publish sourced inputs, weights, uncertainty, and date; prohibit protected traits from scoring; allow missing data; test for disparate impact; provide human review and an appeal/correction mechanism.

- ERROR — “Start saving ₹X every month” reads as a financial recommendation. Fix: label it as a scenario calculation, show assumptions and alternatives, avoid product recommendations/default ordering, and require users to confirm current rates with official providers.

- ERROR — “bank/RESP provider referral links” could undermine “no paid ranking.” Fix: prohibit compensation from affecting inclusion, order, scores, defaults, or presentation; clearly separate sponsored/referral links and disclose compensation.

- ERROR — “Facts gathered by ChatGPT…verified by Claude” is not an evidence-control process. Fix: require every displayed figure to have a primary/published source, effective/as-of date, geography, retrieval date, reviewer status, expiry rule, and archived citation. Unknown values must render as `[placeholder]`, never “Example.”

- ERROR — Lifelong evolution is under-specified. Fix: include annual reassessment, changing goals, multiple simultaneous careers, adult transitions, data portability, consent changes as the child ages, and account ownership transfer.

- ERROR — Sprint 3 combines college data, cost calculations, inflation, and regulated financial comparisons before a validated end-to-end slice. Fix: first build one sourced career-route-college-money journey with tests and update tooling; then expand careers and financial products.

- UNCERTAIN — `brief.md` was not present in the available workspace, so completeness against its full contents cannot be verified. Providing that file would settle this.

VERDICT: NEEDS CHANGES

---

### Claude — revision 1

DECISIONS:
- Teacher option on the first screen -> ACCEPT: the brief and the owner's request specify a parent or child choice. An inactive third option adds an unsupported path. Teacher moves to a future-roles note.
- "For every career" conflicts with the 6-career Sprint 2 -> ACCEPT: the brief says "absolutely arbitrary any career". The 6 careers become a pilot inside a scalable taxonomy, schema and authoring workflow. Coverage targets are placeholders.
- Feasibility score could present wealth and marks as a child's inherent viability -> ACCEPT: the 1–10 score stays, because the owner asked for it and the brief wants honest realism. It becomes a composite of four separately shown indicators, with sourced inputs, weights, uncertainty, a date, and an exclusion list for protected traits. It also gets missing-data handling, a bias test, human review and a correction route. Affordability is shown net of scholarships and cheaper routes, so a low-income family sees a path and not a verdict.
- "Start saving ₹X" reads as financial advice -> ACCEPT: it becomes a scenario calculation with assumptions, alternatives and a "confirm with provider" note. The plain-words output stays, as the brief requires.
- Referral links could undermine "no paid ranking" -> ACCEPT: compensation may not affect inclusion, order, scores, defaults or presentation. Any referral link is separated and disclosed. Referral links stay in v3 only.
- ChatGPT/Claude pipeline is not an evidence control -> ACCEPT: each figure now needs a primary or published source, effective date, geography, retrieval date, reviewer status, expiry rule and archived copy. The "Example" label is dropped for displayed figures; unknowns render as [placeholder]. AI tools may draft but cannot be the verifier. A named human signs off.
- Lifelong evolution is under-specified -> ACCEPT: the brief calls for a lifelong advisor. Added annual reassessment, multiple simultaneous careers, adult transition, portability, consent changes at the age of majority and ownership transfer. Ages and legal rules are [placeholders] by jurisdiction.
- Sprint 3 bundles too much before a validated slice -> ACCEPT: a Sprint 0 and an end-to-end slice for one career come first, with tests and a data-update tool. Then careers and financial products expand. Sprints become weekly demoable deliverables, as the brief asks.
- brief.md not available to the reviewer -> ACCEPT in part: the brief was supplied in full to me, so completeness was checked against it. The check found gaps the reviewer did not list: regional language in v1, a configurable state (not Karnataka-fixed), scholarships outside India, the free-for-government-schools and institutional-revenue model, honest "how many succeed" data, alternatives, and a "Brihat" demo. All are added.

=== REVISED DRAFT ===

# Career GPS — Product Scope (build spec for Claude Code)

## 0. Principles
- Mission: no child should feel a career is out of reach because of constraints. Show the child and parent *how*, honestly and simply.
- Any career: sciences, professions, arts, music, sports, trades, entrepreneurship, combinations of fields.
- Information, not advice. No paid ranking. No invented figures.
- One simple interface that child and parent can use together.

## 1. First screen: who is using it
- "Who is using this?" shows two choices only: **Parent** and **Child**.
- Both roles work on the SAME shared family plan, each with its own language, tone and screens.
  - Child view: game-like, simple words.
  - Parent view: money, steps, deadlines.
- Future roles (not shown in v1): Teacher/counsellor, and the child as an adult on their own account.

## 2. Family profile (about 2 minutes, mostly taps)
- Child: age/class, state, board, recent marks (optional), interests (picture cards), things the child enjoys doing.
- Family: monthly income band, current education savings (optional), city/town/village.
- Child's gender is used only to match gender-specific schemes. Category is used only for scholarship matching and is optional.
- Both are stored minimally, with a plain-language "why we ask". Neither is ever an input to the feasibility score (see §4).
- Every field can be skipped. Missing data lowers match precision and is shown as such. It never blocks the user.
- Language: regional language and a simple low-literacy mode are part of v1 design. The first languages are [language list, set by the chosen state(s)]. Audio follows later.

## 3. Geography and access model
- State is a configuration, not hard-coded. Pilot state(s): [Karnataka and/or Maharashtra, to be decided by the owner]. Each state has its own data pack: colleges, schemes, portals.
- Scholarships may include ones outside India. Each scholarship record carries its country.
- Access model (brief): free for families who cannot pay, including free use in government schools. Revenue comes from institutions (governments, CSR, schools, others) in a way that does not hurt families. Pricing is [to be defined] and is not built in v1. The data model keeps "free tier" and "institution-sponsored" flags so the model can be added later.
- Canada/US is a separate commercial version (see §10).

## 4. Career Match Matrix (core decision screen)
**Career coverage**
- Career taxonomy: [number] top-level families and sub-careers, each with a unique ID, aliases and local-language names. Entrepreneurship, trades, arts and sports are first-class families.
- A career with no data yet still appears via search, with "data coming" and a request button. It never shows made-up numbers.
- Authoring workflow: a career-data template, a source-and-reviewer checklist and a publish gate (see §12). Pilot careers: cardiologist, software engineer, electrician, civil services, musician, cricketer. Coverage targets by sprint: [number].
- Multi-field careers are supported: a child can hold several careers on the same plan.

**Columns** (compare up to 3 side by side)
- Interest fit (from the child's picks).
- Lifestyle: work hours, travel, physical demand, job stability, work location.
- Pay: at start, at age 28, at age 35. Each is a range with source and date.
- Honest outcomes: share of entrants who support themselves in the career, where a published source exists. Otherwise [placeholder].
- Cost to reach the career: low/typical/high.
- Years until earning.
- Competition level, with the source (for example seats vs applicants).
- Feasibility score, 1–10, for this child (below).

**Feasibility score**
- It is a composite of four indicators, each shown on its own with its inputs:
  1. Eligibility: marks and subjects vs the route requirement.
  2. Preparation: time left to meet requirements.
  3. Affordability: cost vs family capacity, **after** scholarships, government seats and cheaper routes.
  4. Opportunity: competition and seats.
- Weights and formula are published in-app and in a methods page, with version and date.
- Protected traits are excluded: gender, category, religion, caste, disability, region of origin. Location enters only where a real access factor exists (for example whether a college or exam centre is reachable), and is stated.
- Missing inputs widen a range and show a "less certain" flag. They are never filled in silently.
- Tap the score to see why, and what would raise it. The wording is never "impossible". Low scores show the specific steps and alternatives (catch-up plan, cheaper route, related career).
- The score is a planning aid, not a prediction of the child's ability or worth. This is stated on screen.
- Governance: score distributions are tested across income and location bands before each release ([test criteria]). A human reviews the formula before each change. Users can flag a wrong input or score for correction, with a [response time] target.

**Interaction**
- Sort and filter by any column.
- The child unlocks career cards by finishing small quests.

## 5. Route and college selection
- Routes: main, affordable, alternative.
- Then specific colleges: government vs private, location, fees per year, hostel, seats, past cut-off ranges, official link, each with source and date. Selection feeds the money plan.
- Non-college paths (apprenticeship, ITI, self-taught, sports academy, music training, starting a business) use the same route structure with their own cost and time fields.

## 6. Money plan (scenario calculator)
- Total cost of the chosen route = fees + hostel + coaching + exams + travel, each line sourced and dated.
- Inflation-adjusted to the year each cost falls due. The inflation assumption is [rate, source, date], editable by the user.
- Output wording: "Under these assumptions, saving ₹X a month from [month] would reach ₹Y by [year]." Assumptions are shown next to it. It also shows two or three alternative scenarios (different amount, different timeline, with/without scholarship).
- "Where to save": a neutral comparison table, not a recommendation.
  - Columns: current rate, lock-in, tax treatment, risk, flexibility, as-of date, source link.
  - Default order is alphabetical. The user can re-sort. There is no "best" badge and no default selection.
  - India: Sukanya Samriddhi Yojana (girls; eligibility rules), PPF, NSC, bank RD, bank FD, savings account, mutual fund SIP (marked market-risk, no return shown).
  - Banks and Post Office: inclusion rule is [objective criterion, for example all scheduled banks above a set size]. Rates come from official bank or government pages, with retrieval date and archived copy. A bank without a verified current rate shows [placeholder].
  - Canada: RESP, Canada Education Savings Grant, Canada Learning Bond. US: 529 plan. Rules and amounts come only from government sources.
- Shows how scholarships and government seats lower the monthly figure.
- Fixed notice: "Information only, not financial advice. Rates change; confirm with the provider before acting."

## 7. Scholarships and schemes
- Matched by eligibility (state, marks, income, gender, category, course, country).
- Each record: amount, deadline, documents, official portal (National Scholarship Portal, state portals such as SSP Karnataka and MahaDBT, and others by state pack), source and date.
- Deadline reminders. Records past their expiry rule are hidden or marked "check the portal".
- Eligibility is shown as "may be eligible, confirm on the official portal". The app does not claim to decide eligibility.

## 8. Progress trackers and gamification
- Milestone checklist per age/class: child quests and parent tasks.
- Savings tracker: target vs actual deposits, shown as on-track or behind. Deposits are entered by the family in v1.
- Marks tracker vs route requirement.
- Upcoming deadlines (exams, forms, scholarships).
- When off track: automatic re-plan with options (catch-up amount, cheaper route, related career).
- Gamification: points, badges and streaks for completed steps, plus a shared family progress bar.
- Guardrail: rewards are for effort and completed steps, never for marks or savings amounts. Streak loss is soft ("pick up again"), with no public leaderboards between children.

## 9. Career Passport and lifelong use
- One file per child across the years. Downloadable PDF and version history. Export in an open format (data portability).
- Annual reassessment prompt: update marks, interests, family finances, and re-run the matrix.
- Goals can change. Past choices stay in history and nothing is deleted without the user's say-so.
- Several careers can be active at once.
- Adult transition: at [age of majority, by jurisdiction] the child is prompted to take over the account. Parent access then needs the young person's consent.
- Consent is re-asked at that point and whenever data use changes.
- Ownership transfer: parent to child, or to another guardian, with a record of the change.
- Deletion and download on request.

## 10. Integrations (phased)
- v1: curated data tables with source and date, refreshed on a [schedule] by the update tool. Links out to official portals and banks.
- v2: WhatsApp/SMS reminders, phone OTP login, PDF export.
- v3 (needs partnerships or licences):
  - India Account Aggregator (consented read of savings).
  - Bank/RESP provider links, only under this rule: compensation never affects inclusion, order, scores, defaults or presentation. Any referral link sits in a separate, labelled area with the compensation disclosed.
  - School dashboards.
  - DigiLocker for marks, if permitted.
  - Government of India integration, as a possible later route.
- Canada/US commercial version: RESP/529 views and bank linkage, subject to the same neutrality rule.

## 11. Design
- Child: bright, friendly, game-like. Parent: calm and clear.
- Big buttons, few words, icons, regional language. Audio later.
- The owner picks one of two style options before the build.
- A "Brihat" showcase path: a polished walkthrough on pilot-career data for presentations. It uses only sourced data or visible [placeholders].

## 12. Data accuracy rules
- Every displayed figure carries: primary or published source link, effective/as-of date, geography, retrieval date, reviewer name and status, expiry rule, and an archived copy of the source.
- A figure without these is not published. It renders as [placeholder]. There is no "Example" label on live figures. Sample data exists only in a clearly marked demo mode.
- AI tools (ChatGPT Deep Research, Claude) may find and draft. Each figure is verified against its source by a named human reviewer before publishing. The bridge cross-check is an extra check, not the approval.
- Expired data is flagged automatically and shown as "check the source".
- Users can report errors. Corrections are logged with a date.

## 13. Build plan (Claude Code), weekly demoable deliverables
Each sprint ends with something the owner can click and show. Sprint length is [weeks, set by the owner].
- **Sprint 0 — decisions:** pick the pilot state, the two style options, the data schema, the source-record format and the project folder with test and data-update commands.
- **Sprint 1:** app skeleton, Parent/Child role choice, profile, design system, regional-language switch.
- **Sprint 2 — one end-to-end slice:** ONE career → route → college → money plan, with fully sourced data, automated tests and the data-update tool. This proves the evidence rules before scale.
- **Sprint 3:** the Career Match Matrix across the 6 pilot careers, the transparent feasibility score with the methods page, and career search with the "data coming" state.
- **Sprint 4:** India savings-instrument and bank comparison (neutral rules, as-of dates), then scholarships and schemes.
- **Sprint 5:** progress trackers, gamification, deadline reminders.
- **Sprint 6:** Career Passport (PDF, history, annual reassessment), then the Canada RESP view, polish, deploy.
- Data research runs in parallel each sprint. The publish gate in §12 applies to every sprint.

---

### ChatGPT — check 1

- ERROR — “Sprint length is [weeks, set by the owner]” conflicts with the requirement for small, weekly demoable deliverables. Fix: define each sprint as one week, or divide longer sprints into explicitly named weekly milestones, each ending in a clickable build.

- ERROR — Sprint 3 calculates affordability “after scholarships,” but scholarship matching is not built until Sprint 4, after both the end-to-end money slice and feasibility score. This makes the earlier affordability result incomplete or dependent on manually embedded data. Fix: include a minimal sourced scholarship/government-seat matcher in Sprint 2, use it in Sprint 3, and expand coverage in Sprint 4.

- UNCERTAIN — “share of entrants who support themselves in the career” lacks a defined denominator, time horizon, earnings threshold, employment definition, and treatment of portfolio or multiple-career workers. Different sources could produce misleading comparisons. Fix: add a published outcome-measure methodology specifying these fields and prohibit comparison when definitions are incompatible. Validation by a labour-market or education-data specialist would settle whether reliable measures exist for each career.

VERDICT: NEEDS CHANGES

---

### Claude — revision 2

DECISIONS:
- Sprint length is "[weeks, set by the owner]", which conflicts with weekly deliverables -> ACCEPT: the brief asks for small weekly deliverables, so each sprint is now one week, and any sprint too large for a week is split into named weekly milestones, each ending in a clickable build.
- Affordability "after scholarships" in Sprint 3, but scholarship matching only arrives in Sprint 4 -> ACCEPT: the dependency is real, so a minimal sourced scholarship/government-seat matcher moves into the Sprint 2 slice and is used in Sprint 3. Sprint 4 expands coverage.
- "Share of entrants who support themselves" has no defined measure -> ACCEPT: without a denominator, time horizon, earnings threshold and employment definition, figures from different sources are not comparable. Added an outcome-measure methodology and a rule that blocks comparison across incompatible definitions. Whether a reliable measure exists per career is left to specialist validation, and the column stays [placeholder] until then.

=== REVISED DRAFT ===
# Career GPS — Product Scope (build spec for Claude Code)

## 0. Principles
- Mission: no child should feel a career is out of reach because of constraints. Show the child and parent *how*, honestly and simply.
- Any career: sciences, professions, arts, music, sports, trades, entrepreneurship, combinations of fields.
- Information, not advice. No paid ranking. No invented figures.
- One simple interface that child and parent can use together.

## 1. First screen: who is using it
- "Who is using this?" shows two choices only: **Parent** and **Child**.
- Both roles work on the SAME shared family plan, each with its own language, tone and screens.
  - Child view: game-like, simple words.
  - Parent view: money, steps, deadlines.
- Future roles (not shown in v1): Teacher/counsellor, and the child as an adult on their own account.

## 2. Family profile (about 2 minutes, mostly taps)
- Child: age/class, state, board, recent marks (optional), interests (picture cards), things the child enjoys doing.
- Family: monthly income band, current education savings (optional), city/town/village.
- Child's gender is used only to match gender-specific schemes. Category is used only for scholarship matching and is optional.
- Both are stored minimally, with a plain-language "why we ask". Neither is ever an input to the feasibility score (see §4).
- Every field can be skipped. Missing data lowers match precision and is shown as such. It never blocks the user.
- Language: regional language and a simple low-literacy mode are part of v1 design. The first languages are [language list, set by the chosen state(s)]. Audio follows later.

## 3. Geography and access model
- State is a configuration, not hard-coded. Pilot state(s): [Karnataka and/or Maharashtra, to be decided by the owner]. Each state has its own data pack: colleges, schemes, portals.
- Scholarships may include ones outside India. Each scholarship record carries its country.
- Access model (brief): free for families who cannot pay, including free use in government schools. Revenue comes from institutions (governments, CSR, schools, others) in a way that does not hurt families. Pricing is [to be defined] and is not built in v1. The data model keeps "free tier" and "institution-sponsored" flags so the model can be added later.
- Canada/US is a separate commercial version (see §10).

## 4. Career Match Matrix (core decision screen)
**Career coverage**
- Career taxonomy: [number] top-level families and sub-careers, each with a unique ID, aliases and local-language names. Entrepreneurship, trades, arts and sports are first-class families.
- A career with no data yet still appears via search, with "data coming" and a request button. It never shows made-up numbers.
- Authoring workflow: a career-data template, a source-and-reviewer checklist and a publish gate (see §12). Pilot careers: cardiologist, software engineer, electrician, civil services, musician, cricketer. Coverage targets by sprint: [number].
- Multi-field careers are supported: a child can hold several careers on the same plan.

**Columns** (compare up to 3 side by side)
- Interest fit (from the child's picks).
- Lifestyle: work hours, travel, physical demand, job stability, work location.
- Pay: at start, at age 28, at age 35. Each is a range with source and date.
- Honest outcomes: share of entrants who support themselves in the career (see outcome-measure methodology below). Shown only where a published source meets the methodology. Otherwise [placeholder].
- Cost to reach the career: low/typical/high.
- Years until earning.
- Competition level, with the source (for example seats vs applicants).
- Feasibility score, 1–10, for this child (below).

**Outcome-measure methodology (published in-app and on the methods page)**
- Every "honest outcomes" figure records: the denominator (who counts as an entrant, and when they are counted), the time horizon (for example years after entry), the earnings threshold for "supports themselves" and its source, the employment definition (full-time, part-time, self-employed, gig), and how portfolio or multiple-career workers are treated.
- Figures are compared side by side only when these definitions are compatible. If they are not, each is shown separately with its definition and the comparison cell reads "not comparable".
- Per career, a labour-market or education-data specialist confirms whether a reliable measure exists before the figure is published. Until then: [placeholder].

**Feasibility score**
- It is a composite of four indicators, each shown on its own with its inputs:
  1. Eligibility: marks and subjects vs the route requirement.
  2. Preparation: time left to meet requirements.
  3. Affordability: cost vs family capacity, **after** scholarships, government seats and cheaper routes (uses the scholarship/seat matcher from Sprint 2).
  4. Opportunity: competition and seats.
- Weights and formula are published in-app and in a methods page, with version and date.
- Protected traits are excluded: gender, category, religion, caste, disability, region of origin. Location enters only where a real access factor exists (for example whether a college or exam centre is reachable), and is stated.
- Missing inputs widen a range and show a "less certain" flag. They are never filled in silently.
- Tap the score to see why, and what would raise it. The wording is never "impossible". Low scores show the specific steps and alternatives (catch-up plan, cheaper route, related career).
- The score is a planning aid, not a prediction of the child's ability or worth. This is stated on screen.
- Governance: score distributions are tested across income and location bands before each release ([test criteria]). A human reviews the formula before each change. Users can flag a wrong input or score for correction, with a [response time] target.

**Interaction**
- Sort and filter by any column.
- The child unlocks career cards by finishing small quests.

## 5. Route and college selection
- Routes: main, affordable, alternative.
- Then specific colleges: government vs private, location, fees per year, hostel, seats, past cut-off ranges, official link, each with source and date. Selection feeds the money plan.
- Non-college paths (apprenticeship, ITI, self-taught, sports academy, music training, starting a business) use the same route structure with their own cost and time fields.

## 6. Money plan (scenario calculator)
- Total cost of the chosen route = fees + hostel + coaching + exams + travel, each line sourced and dated.
- Inflation-adjusted to the year each cost falls due. The inflation assumption is [rate, source, date], editable by the user.
- Output wording: "Under these assumptions, saving ₹X a month from [month] would reach ₹Y by [year]." Assumptions are shown next to it. It also shows two or three alternative scenarios (different amount, different timeline, with/without scholarship).
- "Where to save": a neutral comparison table, not a recommendation.
  - Columns: current rate, lock-in, tax treatment, risk, flexibility, as-of date, source link.
  - Default order is alphabetical. The user can re-sort. There is no "best" badge and no default selection.
  - India: Sukanya Samriddhi Yojana (girls; eligibility rules), PPF, NSC, bank RD, bank FD, savings account, mutual fund SIP (marked market-risk, no return shown).
  - Banks and Post Office: inclusion rule is [objective criterion, for example all scheduled banks above a set size]. Rates come from official bank or government pages, with retrieval date and archived copy. A bank without a verified current rate shows [placeholder].
  - Canada: RESP, Canada Education Savings Grant, Canada Learning Bond. US: 529 plan. Rules and amounts come only from government sources.
- Shows how scholarships and government seats lower the monthly figure.
- Fixed notice: "Information only, not financial advice. Rates change; confirm with the provider before acting."

## 7. Scholarships and schemes
- Matched by eligibility (state, marks, income, gender, category, course, country).
- Each record: amount, deadline, documents, official portal (National Scholarship Portal, state portals such as SSP Karnataka and MahaDBT, and others by state pack), source and date.
- Deadline reminders. Records past their expiry rule are hidden or marked "check the portal".
- Eligibility is shown as "may be eligible, confirm on the official portal". The app does not claim to decide eligibility.
- Build order: a minimal matcher (a small set of sourced scholarships and government seats for the Sprint 2 career) ships in Sprint 2. Coverage expands in Sprint 4.

## 8. Progress trackers and gamification
- Milestone checklist per age/class: child quests and parent tasks.
- Savings tracker: target vs actual deposits, shown as on-track or behind. Deposits are entered by the family in v1.
- Marks tracker vs route requirement.
- Upcoming deadlines (exams, forms, scholarships).
- When off track: automatic re-plan with options (catch-up amount, cheaper route, related career).
- Gamification: points, badges and streaks for completed steps, plus a shared family progress bar.
- Guardrail: rewards are for effort and completed steps, never for marks or savings amounts. Streak loss is soft ("pick up again"), with no public leaderboards between children.

## 9. Career Passport and lifelong use
- One file per child across the years. Downloadable PDF and version history. Export in an open format (data portability).
- Annual reassessment prompt: update marks, interests, family finances, and re-run the matrix.
- Goals can change. Past choices stay in history and nothing is deleted without the user's say-so.
- Several careers can be active at once.
- Adult transition: at [age of majority, by jurisdiction] the child is prompted to take over the account. Parent access then needs the young person's consent.
- Consent is re-asked at that point and whenever data use changes.
- Ownership transfer: parent to child, or to another guardian, with a record of the change.
- Deletion and download on request.

## 10. Integrations (phased)
- v1: curated data tables with source and date, refreshed on a [schedule] by the update tool. Links out to official portals and banks.
- v2: WhatsApp/SMS reminders, phone OTP login, PDF export.
- v3 (needs partnerships or licences):
  - India Account Aggregator (consented read of savings).
  - Bank/RESP provider links, only under this rule: compensation never affects inclusion, order, scores, defaults or presentation. Any referral link sits in a separate, labelled area with the compensation disclosed.
  - School dashboards.
  - DigiLocker for marks, if permitted.
  - Government of India integration, as a possible later route.
- Canada/US commercial version: RESP/529 views and bank linkage, subject to the same neutrality rule.

## 11. Design
- Child: bright, friendly, game-like. Parent: calm and clear.
- Big buttons, few words, icons, regional language. Audio later.
- The owner picks one of two style options before the build.
- A "Brihat" showcase path: a polished walkthrough on pilot-career data for presentations. It uses only sourced data or visible [placeholders].

## 12. Data accuracy rules
- Every displayed figure carries: primary or published source link, effective/as-of date, geography, retrieval date, reviewer name and status, expiry rule, and an archived copy of the source.
- A figure without these is not published. It renders as [placeholder]. There is no "Example" label on live figures. Sample data exists only in a clearly marked demo mode.
- AI tools (ChatGPT Deep Research, Claude) may find and draft. Each figure is verified against its source by a named human reviewer before publishing. The bridge cross-check is an extra check, not the approval.
- Expired data is flagged automatically and shown as "check the source".
- Users can report errors. Corrections are logged with a date.

## 13. Build plan (Claude Code), weekly demoable deliverables
Each sprint is one week and ends with a build the owner can click and show. If a sprint's scope does not fit in a week, it is split into named weekly milestones (for example 3a, 3b), and each milestone also ends in a clickable build. Weeks are numbered in order; calendar start date is [set by the owner].
- **Sprint 0 — decisions:** pick the pilot state, the two style options, the data schema, the source-record format and the project folder with test and data-update commands.
- **Sprint 1:** app skeleton, Parent/Child role choice, profile, design system, regional-language switch.
- **Sprint 2 — one end-to-end slice:** ONE career → route → college → money plan, with fully sourced data, a minimal sourced scholarship/government-seat matcher for that career, automated tests and the data-update tool. This proves the evidence rules before scale. Split into 2a (career, route, college) and 2b (money plan and matcher) if needed.
- **Sprint 3:** the Career Match Matrix across the 6 pilot careers, the transparent feasibility score (affordability uses the Sprint 2 matcher) with the methods page and outcome-measure methodology, and career search with the "data coming" state. Likely split: 3a matrix columns and search, 3b feasibility score and methods page.
- **Sprint 4:** India savings-instrument and bank comparison (neutral rules, as-of dates), then expanded scholarships and schemes coverage across the pilot state(s). Likely split: 4a savings and banks, 4b scholarships.
- **Sprint 5:** progress trackers, gamification, deadline reminders.
- **Sprint 6:** Career Passport (PDF, history, annual reassessment), then the Canada RESP view, polish, deploy. Likely split: 6a Passport, 6b Canada RESP and polish.
- Data research runs in parallel each sprint. The publish gate in §12 applies to every sprint.

---

### ChatGPT — check 2

- ERROR — “Each sprint is one week and ends with a build the owner can click,” but “Sprint 0 — decisions” produces no clickable build, and several later splits are only “likely.” This still violates the weekly-demo requirement. Fix: convert every split into fixed numbered weeks with explicit clickable outputs and acceptance criteria; make Sprint 0 deliver a clickable shell demonstrating the chosen style, schema-backed sample record, and language switch.

- ERROR — “score distributions are tested across income and location bands” does not implement the previously accepted disparate-impact safeguard. Gender and category are collected, while disability and other relevant proxies may still affect outcomes even when excluded directly. Fix: define privacy-preserving fairness tests across all legally permissible relevant groups and proxy variables, minimum sample rules, failure thresholds, remediation, and independent review. Where testing is legally or statistically impossible, document that limitation and require qualitative accessibility review.

- ERROR — The document is not yet executable as a Claude Code build specification. It lacks the selected stack, repository structure, data schemas, authentication/authorization model, storage approach, test levels, deployment target, accessibility standard, and feature-level acceptance criteria. Fix: add a technical implementation section and testable “done when” criteria for every weekly build, leaving genuinely undecided choices as explicit decision gates rather than letting Claude Code infer them.

- UNCERTAIN — The product stores children’s marks, finances, gender/category, account ownership, and savings activity, but specifies no child-privacy, security, retention, breach-response, parental-consent, or jurisdictional compliance requirements. Applicability depends on pilot jurisdictions and operating model. Fix: identify the initial jurisdictions and have qualified privacy counsel determine applicable requirements; meanwhile specify data minimization, encryption, role-based access, audit logs, retention periods, consent records, backup/recovery, and prohibition on advertising or profiling children.

VERDICT: NEEDS CHANGES