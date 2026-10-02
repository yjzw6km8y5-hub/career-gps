// The product's never-change rules that code can check (replaces scripts/check-data.js for the app).
import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { FIGURES } from "./figures";
import { CAREERS, FAMILY, INTEREST_ROUNDS, MARKETS, ROUTES, SAVE_GROUPS, STATE_PACKS } from "./content";
import { MONEY_QUESTIONS, PARENT_QUESTIONS } from "./questions";
import { STRINGS } from "../i18n";
import type { Lang, Text } from "./types";
import { optionsOf } from "../lib/rules";

const LANGS: Lang[] = ["en", "mr"];
const pack = STATE_PACKS[FAMILY.state];

/** Walk any data structure and collect every Text ({en, mr}) inside it. */
function texts(x: unknown, out: Text[] = []): Text[] {
  if (x && typeof x === "object") {
    const o = x as Record<string, unknown>;
    if (typeof o.en === "string" && typeof o.mr === "string") out.push(o as unknown as Text);
    else for (const v of Object.values(o)) texts(v, out);
  }
  return out;
}

describe("demo data only", () => {
  it("family and child are fictional", () => {
    expect(FAMILY.demo).toBe(true);
    expect(FAMILY.fictional).toBe(true);
    expect(FAMILY.child.fictional).toBe(true);
  });
});

describe("never invent a number", () => {
  it.each(Object.entries(FIGURES))("figure %s is fully sourced or a [placeholder]", (_, f) => {
    for (const l of LANGS) expect(f.placeholder[l]).toMatch(/^\[.+\]$/);
    if (f.value != null) {
      expect(f.source?.url).toMatch(/^https:\/\//);
      expect(f.asOf).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(f.reviewer).toBeTruthy();
    }
  });

  it("every figure a route or question uses exists", () => {
    for (const r of Object.values(ROUTES)) for (const s of r.steps) for (const id of s.figures) expect(FIGURES[id], id).toBeDefined();
    for (const q of PARENT_QUESTIONS) for (const o of optionsOf(q, PARENT_QUESTIONS)) if (o.fig) expect(FIGURES[o.fig], o.fig).toBeDefined();
  });

  it("no figures typed into screen text (digits next to ₹, %, years, months, lakh, crore)", () => {
    const pattern = /\d[\d,.]*\s*(₹|%|lakh|crore|years?|months?|वर्ष|महिन)|₹\s*\d/i;
    const all = [...texts(STRINGS), ...texts(ROUTES), ...texts(SAVE_GROUPS), ...texts(PARENT_QUESTIONS), ...texts(CAREERS), ...texts(STATE_PACKS)];
    const bad = all.flatMap((t) => LANGS.map((l) => t[l])).filter((s) => pattern.test(s));
    expect(bad).toEqual([]);
  });

  it("no hard-coded figures in screen code", () => {
    const dir = join(__dirname, "..", "screens");
    for (const f of readdirSync(dir)) {
      const src = readFileSync(join(dir, f), "utf8");
      expect(src.match(/>[^<>{}]*\d[\d,.]*\s*(₹|%|lakh|crore|years?)[^<>]*</gi) ?? [], f).toEqual([]);
    }
  });
});

describe("every text has English and Marathi", () => {
  const all = [...texts(STRINGS), ...texts(ROUTES), ...texts(SAVE_GROUPS), ...texts(PARENT_QUESTIONS), ...texts(CAREERS),
    ...texts(STATE_PACKS), ...texts(INTEREST_ROUNDS), ...texts(MARKETS), ...texts(FIGURES), ...texts(FAMILY)];

  it("no empty translations", () => {
    expect(all.filter((t) => !t.en.trim() || !t.mr.trim())).toEqual([]);
  });

  it("Marathi text is not just a copy of the English (except names and slots)", () => {
    // Names that stay the same in Marathi: exam/board acronyms, and slot-only texts like "{partner}".
    const SAME_OK = /^(HSC|CBSE|\{\w+\}|DM \/ DrNB.*)$/;
    const same = all.filter((t) => t.en === t.mr && !SAME_OK.test(t.en));
    expect(same).toEqual([]);
  });
});

describe("simple screens: at most 3 choices", () => {
  it("careers, saving groups, markets, interest rounds", () => {
    expect(CAREERS.length).toBeLessThanOrEqual(3);
    expect(SAVE_GROUPS.length).toBeLessThanOrEqual(3);
    expect(MARKETS.length).toBeLessThanOrEqual(3);
    for (const r of INTEREST_ROUNDS) expect(r.length).toBeLessThanOrEqual(3);
  });

  it.each(PARENT_QUESTIONS.map((q) => [q.id, q] as const))("question %s has ≤3 answers and a plain skip", (_, q) => {
    expect(optionsOf(q, PARENT_QUESTIONS).length).toBeLessThanOrEqual(3);
    if (q.skip) expect(["skip", "preferNot", "notSure"]).toContain(q.skip);
  });

  it("money questions appear only after 'Yes, tell more' and can be skipped", () => {
    for (const id of MONEY_QUESTIONS) {
      const q = PARENT_QUESTIONS.find((x) => x.id === id)!;
      expect(q.when).toEqual({ more: ["yes"] });
      expect(q.skip).toBeTruthy();
    }
  });
});

describe("information, not advice", () => {
  it("no 'best', 'safe', 'low risk' or 'guarantee' wording on saving groups, in either language", () => {
    for (const g of SAVE_GROUPS) for (const t of texts(g)) {
      expect(t.en).not.toMatch(/\b(best|safe|low risk|guarantee[ds]?)\b/i);
      expect(t.mr).not.toMatch(/(सर्वोत्तम|सर्वात चांगल|सुरक्षित|हमी|कमी जोखीम)/);
    }
  });
  it("adviser and not-advice wording exist", () => {
    expect(STRINGS.adviserBtn.en).toMatch(/registered adviser/);
    expect(STRINGS.notAdvice.en).toMatch(/not financial advice/);
  });
});

describe("state is configuration", () => {
  it("family state has a pack whose languages all have strings", () => {
    expect(pack).toBeDefined();
    for (const l of pack.languages) expect(LANGS).toContain(l);
  });
  it("scholarship portal link is https or a [placeholder]", () => {
    for (const sp of Object.values(STATE_PACKS)) expect(sp.scholarshipPortal.url).toMatch(/^(https:\/\/|\[.+\]$)/);
  });
  it("route text uses state tokens, never typed state names, and every token resolves", () => {
    const tokens = new Set(["stateName", "boardName", "class12Name", "stateCounselling"]);
    for (const r of Object.values(ROUTES)) for (const s of r.steps) for (const l of LANGS) {
      const text = s.parent[l] + " " + s.child[l];
      for (const sp of Object.values(STATE_PACKS)) for (const w of [sp.name[l], sp.stateCounselling[l]]) expect(text, s.id).not.toContain(w);
      for (const m of text.matchAll(/\{(\w+)\}/g)) expect(tokens.has(m[1]), `${s.id}: {${m[1]}}`).toBe(true);
    }
  });
});
