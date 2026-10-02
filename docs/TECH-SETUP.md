# Tech setup, in plain words

Total cost today: **$0**. Nothing here needs a paid service.

| Piece | What it is | Why | Cost |
|---|---|---|---|
| **Plain web page** (Sprint 0) | HTML, CSS and JavaScript files that any browser can open | Opens with a double-click. Nothing to install. Good for choosing a look fast. | Free |
| **React + TypeScript + Vite** (from Sprint 1) | The most common toolkit for building web apps. TypeScript catches mistakes before they reach the screen. Vite runs the app on your computer while we build. | Many screens, two roles and three languages need proper building blocks. Claude Code knows these tools well. | Free |
| **Node.js** | The engine that runs the build tools | Already installed on your PC | Free |
| **Data files (JSON)** | One record per fact: value, source link, as-of date, reviewer, expiry | Enforces "never invent a number". A check script blocks any figure without a source. | Free |
| **Tests**: Vitest + Playwright | Vitest checks the maths (money plan, feasibility score). Playwright clicks through the screens like a person would. | Every weekly build must pass before you see it | Free |
| **Git** | Saves every version of the project so nothing is ever lost and any change can be undone | Required by the start instructions | Free, but needs a one-time install (see below) |
| **Hosting** (later) | A free static web host such as Cloudflare Pages or Netlify, so others can open a link | Only when you say so; putting it online is publishing | Free tier |
| **Accounts and database** (much later) | Logins and saved family plans | Not before the privacy review (FINAL-PLAN: after week 12) | Decided then |

## Status (2026-10-01)
- Git is installed and the project is under version history.
- React, TypeScript, Vite, Vitest, Playwright and the fonts are installed in `app/`. All free.
- Playwright uses the Microsoft Edge already on this PC, so there's no extra browser download.
- The built app is a single offline file (`app/dist/index.html`) with fonts inside. No request goes to Google or anyone else.
