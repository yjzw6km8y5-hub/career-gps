// Every career pack must satisfy the pathway schema and the never-change rules.
// Running the same checks on the musician pack proves the schema is not cardiology-specific.
import { describe, expect, it } from "vitest";
import { COMMON_EVIDENCE, COMMON_FIGURES, PACKS, STATE_PACKS } from "./common";
import type { CareerPack, Lang, Text } from "./schema";
import { STRINGS } from "../i18n";
import { isEvidenceVerified } from "../lib/plan";

const LANGS: Lang[] = ["en", "mr"];

function texts(x: unknown, out: Text[] = []): Text[] {
  if (x && typeof x === "object") {
    const o = x as Record<string, unknown>;
    if (typeof o.en === "string" && typeof o.mr === "string") out.push(o as unknown as Text);
    else for (const v of Object.values(o)) texts(v, out);
  }
  return out;
}

const PLACEHOLDER = /^\[.+\]$/;
const DATE_OR_PLACEHOLDER = /^(\d{4}-\d{2}-\d{2}|\[.+\])$/;

describe.each(Object.entries(PACKS))("career pack: %s", (_, pack: CareerPack) => {
  const has = (list: { id: string }[], id: string) => list.some((x) => x.id === id);
  const evidenceIds = new Set([...pack.evidence, ...COMMON_EVIDENCE].map((e) => e.id));

  it("every reference points at something that exists", () => {
    for (const r of pack.routes) {
      for (const id of r.stages) expect(has(pack.stages, id), `${r.id} stage ${id}`).toBe(true);
      for (const id of r.gates) expect(has(pack.gates, id), `${r.id} gate ${id}`).toBe(true);
      for (const id of r.rules) expect(has(pack.rules, id), `${r.id} rule ${id}`).toBe(true);
      for (const id of r.scenarios) expect(has(pack.scenarios, id), `${r.id} scenario ${id}`).toBe(true);
      for (const id of r.schemes) expect(has(pack.schemes, id), `${r.id} scheme ${id}`).toBe(true);
      for (const id of r.adjacent ?? []) expect(has(pack.adjacent, id), `${r.id} adjacent ${id}`).toBe(true);
      if (r.reuses) {
        expect(has(pack.routes, r.reuses.route)).toBe(true);
        for (const id of r.reuses.stages) expect(has(pack.stages, id)).toBe(true);
      }
    }
    for (const g of pack.gates) {
      expect(has(pack.stages, g.afterStage), g.id).toBe(true);
      for (const o of g.options) if ("route" in o.leadsTo) expect(has(pack.routes, o.leadsTo.route), `${g.id} → ${o.leadsTo.route}`).toBe(true);
    }
    const figureIds = [...pack.stages.flatMap((s) => s.figures), ...pack.scenarios.flatMap((s) => [s.low, s.high, ...s.lines.map((l) => l.figure)]),
      ...pack.schemes.map((s) => s.amount), pack.career.payFigure];
    for (const id of figureIds) expect(pack.figures[id] ?? COMMON_FIGURES[id], `figure ${id}`).toBeDefined();
    const evRefs = [...pack.career.evidence, ...pack.stages.flatMap((s) => s.evidence), ...pack.gates.flatMap((g) => g.evidence), ...pack.rules.flatMap((x) => x.evidence),
      ...pack.routes.flatMap((x) => x.evidence), ...pack.scenarios.flatMap((x) => x.evidence), ...pack.schemes.flatMap((x) => x.evidence),
      ...pack.adjacent.flatMap((x) => x.evidence), ...Object.values(pack.figures).map((f) => f.evidence)];
    for (const id of evRefs) expect(evidenceIds.has(id), `evidence ${id}`).toBe(true);
  });

  it("has at least three genuinely different routes, including main, lower-cost, after-unsuccessful and adjacent", () => {
    const kinds = pack.routes.map((r) => r.kind);
    for (const k of ["main", "lowerCost", "afterUnsuccessful", "adjacent"] as const) expect(kinds).toContain(k);
    const shapes = new Set(pack.routes.map((r) => r.stages.join(">")));
    expect(shapes.size).toBeGreaterThanOrEqual(3);
  });

  it("every factual item carries evidence", () => {
    expect(pack.career.evidence.length).toBeGreaterThan(0);
    for (const x of [...pack.routes, ...pack.gates, ...pack.rules, ...pack.scenarios, ...pack.schemes, ...pack.adjacent]) expect(x.evidence.length, x.id).toBeGreaterThan(0);
    // Stages need evidence unless they are a pure review checkpoint with no facts or figures.
    for (const s of pack.stages) if (!(s.phase === "reassess" && s.figures.length === 0 && s.evidence.length === 0 && /review/.test(s.id))) expect(s.evidence.length, s.id).toBeGreaterThan(0);
  });

  it("every evidence record has source, geography, effective date, retrieval date, review status and expiry rule", () => {
    for (const e of pack.evidence) {
      for (const l of LANGS) {
        expect(e.claim[l].trim(), e.id).not.toBe("");
        expect(e.source.title[l].trim(), e.id).not.toBe("");
        expect(e.geography[l].trim(), e.id).not.toBe("");
        expect(e.expiryRule[l].trim(), e.id).not.toBe("");
      }
      expect(e.source.url, e.id).toMatch(/^(https:\/\/|\[.+\]$)/);
      expect(e.effectiveDate, e.id).toMatch(DATE_OR_PLACEHOLDER);
      expect(e.retrievedDate, e.id).toMatch(DATE_OR_PLACEHOLDER);
      expect(["example", "researched", "planned"]).toContain(e.review.level);
      // "researched" is only allowed when everything is really filled in by a named reviewer.
      if (e.review.level === "researched") expect(isEvidenceVerified(e), e.id).toBe(true);
    }
  });

  it("never invents a number: figures are [placeholders] unless verified", () => {
    for (const [id, f] of Object.entries(pack.figures)) {
      for (const l of LANGS) expect(f.placeholder[l], id).toMatch(PLACEHOLDER);
      if (f.value != null) expect(isEvidenceVerified(pack.evidence.find((e) => e.id === f.evidence)), id).toBe(true);
    }
  });

  it("every owner always gets an action (a catch-all template exists)", () => {
    for (const owner of ["child", "parent", "school"]) {
      expect(pack.actions.some((a) => a.owner === owner && Object.keys(a.when).length === 0), owner).toBe(true);
    }
  });

  it("all text is in English and Marathi, with no typed figures", () => {
    const all = texts(pack);
    expect(all.filter((t) => !t.en.trim() || !t.mr.trim())).toEqual([]);
    const typed = /\d[\d,.]*\s*(₹|%|lakh|crore|years?|months?|वर्ष|महिन)|₹\s*\d/i;
    expect(all.flatMap((t) => LANGS.map((l) => t[l])).filter((s) => typed.test(s))).toEqual([]);
  });

  it("no 'best', 'safe' or 'guarantee' wording on costs or support", () => {
    for (const t of texts([pack.scenarios, pack.schemes])) {
      expect(t.en).not.toMatch(/\b(best|safe|low risk|guarantee[ds]?)\b/i);
      expect(t.mr).not.toMatch(/(सर्वोत्तम|सुरक्षित|हमी|कमी जोखीम)/);
    }
  });
});

describe("screen text", () => {
  const all = texts(STRINGS);
  it("every string has English and Marathi", () => {
    expect(all.filter((t) => !t.en.trim() || !t.mr.trim())).toEqual([]);
  });
  it("Marathi is not just a copy of the English (except pure slot templates)", () => {
    expect(all.filter((t) => t.en === t.mr && !/^[{}\w\s:→]+$/.test(t.en.replace(/\{\w+\}/g, "")))).toEqual([]);
  });
  it("no sensitive onboarding questions exist (occupation, land, income trend)", () => {
    const en = all.map((t) => t.en.toLowerCase()).join(" | ");
    expect(en).not.toMatch(/occupation|what work do you do|own land|income will probably/);
  });
  it("state packs offer only languages that have screen text", () => {
    for (const sp of Object.values(STATE_PACKS)) for (const l of sp.languages) expect(LANGS).toContain(l);
  });
});
