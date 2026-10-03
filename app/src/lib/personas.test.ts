// Use-case bank: fictional family situations and what the plan must say for each.
// Every persona is fictional. Each expectation is a product decision written down, so a change
// that alters what a family would be told shows up here.
import { describe, expect, it } from "vitest";
import { PACKS, START_PROFILE } from "../data/common";
import type { Profile } from "../data/schema";
import { computePlan, currentPhase, type Level } from "./plan";

const TODAY = new Date("2026-10-03T00:00:00");

interface Persona {
  id: string;
  story: string;
  career: "cardiologist" | "musician";
  profile: Partial<Profile>;
  focus: string;
  scenario: string;
  actions: [string, string, string];
  readiness?: Partial<Record<"eligibility" | "preparation" | "affordability" | "opportunity" | "evidence", Level>>;
  paused?: string[];
  phase?: string;
}

const PERSONAS: Persona[] = [
  {
    id: "C1", career: "cardiologist", story: "Class 8, the family has shared nothing yet",
    profile: {}, focus: "r.main", scenario: "sc.govtLocal",
    actions: ["a.child.school", "a.parent.budget", "a.school.subjects"],
    readiness: { eligibility: "unknown", preparation: "unknown", affordability: "unknown", opportunity: "unknown", evidence: "gap" },
    phase: "explore"
  },
  {
    id: "C2", career: "cardiologist", story: "Class 10, very little money, can only study near home, marks okay",
    profile: { classLevel: 10, budget: "tight", place: "local", marks: "medium" }, focus: "r.lowerCost", scenario: "sc.govtLocal",
    actions: ["a.child.school", "a.parent.tight", "a.school.subjects"],
    readiness: { eligibility: "unknown", preparation: "unknown", affordability: "gap", opportunity: "gap", evidence: "gap" },
    phase: "decideSubjects"
  },
  {
    id: "C3", career: "cardiologist", story: "Class 12 Science with Biology, marks need help, some money, can study away",
    profile: { classLevel: 12, stream: "pcb", marks: "needsWork", budget: "some", place: "away" }, focus: "r.lowerCost", scenario: "sc.govtAway",
    actions: ["a.child.marks", "a.parent.documents", "a.school.help"],
    readiness: { eligibility: "gap", preparation: "gap", affordability: "unknown", opportunity: "unknown", evidence: "gap" },
    phase: "apply"
  },
  {
    id: "C4", career: "cardiologist", story: "Class 12, did not get a seat through NEET-UG",
    profile: { classLevel: 12, stream: "pcb", entrance: "notQualified" }, focus: "r.afterUnsuccessful", scenario: "sc.retryYear",
    actions: ["a.child.retry", "a.parent.retry", "a.school.retry"],
    paused: ["r.main", "r.lowerCost"], phase: "reassess"
  },
  {
    id: "C5", career: "cardiologist", story: "Class 9, more drawn to the machines and technology side",
    profile: { classLevel: 9, interest: "technology" }, focus: "r.adjacent", scenario: "sc.allied",
    actions: ["a.child.tech", "a.parent.budget", "a.school.subjects"], phase: "prepare"
  },
  {
    id: "C6", career: "cardiologist", story: "Class 11 Science, strong marks, enough money, can study away",
    profile: { classLevel: 11, stream: "pcb", marks: "strong", budget: "flexible", place: "away" }, focus: "r.main", scenario: "sc.privateAway",
    actions: ["a.child.study", "a.parent.documents", "a.school.neet"],
    // Nothing may be "Ready": the rules and costs are not verified yet.
    readiness: { eligibility: "unknown", preparation: "unknown", affordability: "unknown", opportunity: "unknown", evidence: "gap" }
  },
  {
    id: "C7", career: "cardiologist", story: "Class 11, chose subjects without Biology",
    profile: { classLevel: 11, stream: "other" }, focus: "r.main", scenario: "sc.govtLocal",
    actions: ["a.child.study", "a.parent.budget", "a.school.neet"],
    readiness: { eligibility: "gap" }
  },
  {
    id: "C8", career: "cardiologist", story: "Class 8, drawn to the caring side, very little money",
    profile: { interest: "care", budget: "tight" }, focus: "r.adjacent", scenario: "sc.allied",
    actions: ["a.child.care", "a.parent.tight", "a.school.subjects"]
  },
  {
    id: "M1", career: "musician", story: "Class 8, the family has shared nothing yet",
    profile: {}, focus: "m.r.main", scenario: "m.sc.courseLocal",
    actions: ["m.a.child.default", "m.a.parent.default", "m.a.school.default"],
    readiness: { preparation: "unknown", evidence: "gap" }
  },
  {
    id: "M2", career: "musician", story: "Practises rarely, very little money",
    profile: { practice: "rarely", budget: "tight" }, focus: "m.r.lower", scenario: "m.sc.community",
    actions: ["m.a.child.practice", "m.a.parent.tight", "m.a.school.default"],
    readiness: { preparation: "gap", affordability: "gap" }
  },
  {
    id: "M3", career: "musician", story: "Practises daily, did not get a place at the audition",
    profile: { practice: "daily", classLevel: 12, entrance: "notQualified" }, focus: "m.r.after", scenario: "m.sc.extraYear",
    actions: ["m.a.child.retry", "m.a.parent.retry", "m.a.school.retry"],
    paused: ["m.r.main", "m.r.lower"], readiness: { preparation: "unknown" }
  },
  {
    id: "M4", career: "musician", story: "More drawn to recording and sound technology, can study away",
    profile: { interest: "technology", place: "away" }, focus: "m.r.adjacent", scenario: "m.sc.related",
    actions: ["m.a.child.tech", "m.a.parent.default", "m.a.school.default"]
  }
];

describe.each(PERSONAS.map((x) => [x.id, x] as const))("use case %s", (_, persona) => {
  const pack = PACKS[persona.career];
  const profile: Profile = { ...START_PROFILE, ...persona.profile };
  const plan = computePlan(pack, profile, TODAY);
  const focus = plan.routes.find((r) => r.route.id === plan.focus)!;

  it(`${persona.story}: best-fit route, cost scenario and the three actions`, () => {
    expect(plan.focus).toBe(persona.focus);
    expect(focus.status).toBe("recommended");
    expect(focus.scenario.id).toBe(persona.scenario);
    expect(plan.actions.map((a) => a.template.id)).toEqual(persona.actions);
  });

  if (persona.readiness) {
    it(`${persona.story}: readiness on the best-fit route`, () => {
      for (const [dim, level] of Object.entries(persona.readiness!)) {
        expect(focus.readiness.find((d) => d.dim === dim)?.level, dim).toBe(level);
      }
    });
  }

  if (persona.paused) {
    it(`${persona.story}: routes that are paused`, () => {
      for (const id of persona.paused!) expect(plan.routes.find((r) => r.route.id === id)?.status, id).toBe("paused");
    });
  }

  if (persona.phase) {
    it(`${persona.story}: stage checkpoint`, () => expect(currentPhase(profile)).toBe(persona.phase));
  }

  it(`${persona.story}: never "Ready" on unverified facts, and every action has a due date`, () => {
    for (const rp of plan.routes) for (const d of rp.readiness) expect(d.level).not.toBe("ready");
    for (const a of plan.actions) expect(a.dueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
  });
});
