# Review: career-gps, cycle 2

_Reviewer: Codex. Range: 1fe96ab36b..036708a0ba. 2026-10-04._

1. **MUST — `app/e2e/a11y.spec.ts:5-6`**  
   `SCREENS` omits `"tracks"`. This breaks the recorded requirement that axe WCAG 2.1 AA pass on every screen. `STATUS.md:34` claims full coverage, while `STATUS.md:39` admits the tracks screen is unfinished. Add tracks for both careers, languages, and child mode.

2. **MUST — `app/src/screens/Start.tsx:82,96,121,143`; `app/src/screens/Journey1.tsx:40,126`**  
   Search, possibilities, country, country-planned, handoff, and route screens render `NavBar` without `Listen`. This contradicts `STATUS.md:28`: “Listen button on every screen.” Tests cover only monthly and start (`app/e2e/access.spec.ts:22-38`). Add Listen or narrow the claim and add all-screen coverage.

3. **MUST — `app/src/components.tsx:86-88`**  
   The speech selector omits savings product descriptions/risks, bank names and values, track-detail rows, and evidence. Consequently, even screens with Listen do not read their substantive content. This contradicts “reads it aloud” in `STATUS.md:28`. Add relevant content to the accessible speech source and test savings, banks, and tracks.

4. **MUST — `app/src/App.tsx:109`; `app/src/screens/Journey1.tsx:125-126`; `app/src/screens/Start.tsx:81-84`**  
   Focus moves only to `main h1`, but route detail has no `h1`, and search has no heading at all. Therefore `STATUS.md:28`’s “Focus moves to each new screen’s title” is unsupported. The focus test checks only two screens (`app/e2e/access.spec.ts:40-45`). Give every screen a focusable heading or target its actual title, and test all navigation paths.

5. **SHOULD — `app/src/components.tsx:97-98`**  
   Marathi-voice absence is reported only when `getVoices()` returns a nonempty list. Browsers commonly return an empty list before voices load, so no warning appears and speech may use the wrong voice. The fake test always supplies Marathi and never validates missing/late voices. Handle `voiceschanged` or treat an empty list as unavailable.

6. **STATUS mismatch — `STATUS.md:35,39`**  
   “Tests now: 83 data/engine tests, 214 browser tests” conflicts with the latest handoff’s 234 browser tests and earlier 87-unit-test claim. Record one current, reproducible count.

VERDICT: FINDINGS

## Builder response
All six findings were correct and fixed (2026-10-04): tracks added to the a11y spec; Listen moved into NavBar so every screen has it; speech selector extended (savings, banks, tracks, route detail, notices, evidence claim) with tests; search and route detail now have an h1 with focus tests; empty/late voice lists now trigger the Marathi note (voiceschanged handled); STATUS test counts set to 98 unit + 265 browser from the latest check.
