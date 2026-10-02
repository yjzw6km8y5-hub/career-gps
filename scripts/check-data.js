// Checks the product rules that code can check. Run: node scripts/check-data.js
// Exit code 1 if any rule fails.
const fs = require("fs");
const path = require("path");
const vm = require("vm");

const proto = path.join(__dirname, "..", "prototype");
const sandbox = { window: {} };
vm.createContext(sandbox);
for (const f of ["data/strings.js", "data/demo-family.js", "data/profile-questions.js"]) {
  vm.runInContext(fs.readFileSync(path.join(proto, f), "utf8"), sandbox, { filename: f });
}
const D = sandbox.window.DEMO;
const S = sandbox.window.STRINGS;
const app = fs.readFileSync(path.join(proto, "app.js"), "utf8");

const fails = [];
const check = (ok, msg) => { if (!ok) fails.push(msg); };

// Rule: demo data only (fictional children) until privacy review.
check(D.demo === true, "DEMO.demo must be true");
check(D.family.fictional === true && D.family.child.fictional === true, "family and child must be marked fictional");

// Rule: never invent a number. A figure is either fully sourced or a [placeholder].
for (const [id, f] of Object.entries(D.figures)) {
  check(/^\[.+\]$/.test(f.placeholder || ""), `figure ${id}: placeholder must look like [something]`);
  if (f.value != null) {
    check(f.source && /^https:\/\//.test(f.source.url || ""), `figure ${id}: has a value but no https source link`);
    check(/^\d{4}-\d{2}-\d{2}$/.test(f.asOf || ""), `figure ${id}: has a value but no as-of date (YYYY-MM-DD)`);
    check(!!f.reviewer, `figure ${id}: has a value but no named human reviewer`);
  }
}

// Every figure a route refers to must exist.
for (const [rid, r] of Object.entries(D.routes)) {
  check(["researched", "example", "planned"].includes(r.status), `route ${rid}: status must be researched/example/planned`);
  for (const s of r.steps) for (const fid of s.figures) check(D.figures[fid], `route ${rid} step ${s.id}: unknown figure ${fid}`);
}

// Rule: no digits typed straight into screen text in app.js (numbers must come from figures).
const literalNumbers = app.match(/>[^<>{}]*?\d[\d,.]*\s*(₹|%|lakh|crore|years?|months?)[^<>]*</gi) || [];
check(literalNumbers.length === 0, "app.js has hard-coded figures in screen text: " + literalNumbers.join(" | "));

// Rule: every screen carries a Researched / Example / Planned label.
const screenBodies = app.split(/\n    "?[\w-]+"?: function \(\) \{/).slice(1);
const screenNames = [...app.matchAll(/\n    "?([\w-]+)"?: function \(\) \{/g)].map((m) => m[1]);
screenNames.forEach((name, i) => {
  check(/label\("(researched|example|planned)"\)/.test(screenBodies[i].split(/\n    \},?\n/)[0]), `screen ${name}: missing Researched/Example/Planned label`);
});

// Rule: information, not advice; the adviser button exists.
check(/registered adviser/.test(app), "missing 'Talk to a registered adviser' button");
check(/not financial advice/.test(app), "missing 'not financial advice' notice");

// Rule: max 3 choices per screen for the main choice lists.
check(D.careers.length <= 3, "child dream screen shows more than 3 careers");
check(D.saveGroups.length <= 3, "where-to-save screen shows more than 3 groups");

// "About you" questions: at most 3 answers each; money questions only after the parent opts in.
const PQ = sandbox.window.PROFILE_QUESTIONS;
const moneyQs = ["income", "trend", "land"];
for (const q of PQ) {
  const opts = q.sameOptionsAs ? PQ.find((x) => x.id === q.sameOptionsAs).options : q.options;
  check(opts.length <= 3, `question ${q.id}: more than 3 answers`);
  check(!q.skip || q.skip === "Skip" || q.skip === "Prefer not to say", `question ${q.id}: skip must be a plain skip, not a hidden 4th answer`);
  for (const o of opts) if (o.fig) check(D.figures[o.fig], `question ${q.id}: unknown figure ${o.fig}`);
  if (moneyQs.includes(q.id)) {
    check(q.when && q.when.more && q.when.more.join() === "yes", `question ${q.id}: money question must only appear after "Yes, tell more"`);
    check(!!q.skip, `question ${q.id}: money question must have a skip option`);
  }
}

// The family's state has a state pack, and every language it offers has screen text.
const pack = D.statePacks && D.statePacks[D.family.state];
check(!!pack, `family.state ${D.family.state} has no state pack`);
if (pack) for (const l of pack.languages) check(S[l], `state pack ${D.family.state}: no strings for language ${l}`);
for (const [sid, sp] of Object.entries(D.statePacks || {})) {
  const url = sp.scholarshipPortal && sp.scholarshipPortal.url;
  check(/^https:\/\//.test(url || "") || /^\[.+\]$/.test(url || ""), `state pack ${sid}: scholarship portal link must be https or a [placeholder]`);
}
// Every {token} in route text must resolve to a non-empty value in the family's state pack.
const tokenValue = (k) => (k === "stateName" ? pack && pack.name : pack && pack[k]);
for (const [rid, r] of Object.entries(D.routes)) for (const s of r.steps) {
  for (const m of (s.parent + " " + s.child).matchAll(/\{(\w+)\}/g)) {
    check(typeof tokenValue(m[1]) === "string" && tokenValue(m[1]).length > 0, `route ${rid} step ${s.id}: token {${m[1]}} has no value in state pack ${D.family.state}`);
  }
}
// Route text must not type state names directly; it uses {stateName}/{class12Name}/{stateCounselling}.
for (const [rid, r] of Object.entries(D.routes)) for (const s of r.steps) for (const sp of Object.values(D.statePacks || {})) {
  for (const word of [sp.name, sp.class12Name, sp.stateCounselling]) {
    check(!s.parent.includes(word) && !s.child.includes(word), `route ${rid} step ${s.id}: types "${word}" directly; use a state-pack token`);
  }
}
const shownLangs = [...fs.readFileSync(path.join(proto, "index.html"), "utf8").matchAll(/data-lang="(\w+)"/g)].map((m) => m[1]);
if (pack) check(shownLangs.join() === pack.languages.join(), `language buttons (${shownLangs}) must match state pack languages (${pack.languages})`);

// Every language has every English key (translations may be marked draft).
for (const lang of Object.keys(S)) for (const k of Object.keys(S.en)) check(k in S[lang], `strings.${lang} missing key ${k}`);

if (fails.length) {
  console.log("FAILED " + fails.length + " check(s):\n- " + fails.join("\n- "));
  process.exit(1);
}
console.log("All checks passed (" + Object.keys(D.figures).length + " figures, " + screenNames.length + " screens).");
