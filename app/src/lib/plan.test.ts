import { describe, expect, it } from "vitest";
import { PACKS, START_PROFILE } from "../data/common";
import type { Profile } from "../data/schema";
import { computePlan, currentPhase, diffPlans, DIMS, isEvidenceVerified, matchSchemes, schemesForGap, schoolYearsLeft } from "./plan";

const C = PACKS.cardiologist;
const M = PACKS.musician;
const TODAY = new Date("2026-10-02T00:00:00");
const p = (patch: Partial<Profile> = {}): Profile => ({ ...START_PROFILE, ...patch });
const route = (plan: ReturnType<typeof computePlan>, kind: string) => plan.routes.find((r) => r.route.kind === kind)!;
const dim = (rp: ReturnType<typeof route>, d: string) => rp.readiness.find((x) => x.dim === d)!;

describe("route readiness", () => {
  it("has five separate dimensions per route, each with a level, reason and action, and no overall score", () => {
    for (const rp of computePlan(C, p(), TODAY).routes) {
      expect(rp.readiness.map((d) => d.dim)).toEqual(DIMS);
      for (const d of rp.readiness) {
        expect(["ready", "gap", "unknown"]).toContain(d.level);
        expect(d.reason).toBeTruthy();
        expect(d.action).toBeTruthy();
      }
      expect(rp).not.toHaveProperty("score");
    }
  });

  it("evidence confidence is a gap while no fact is checked", () => {
    expect(dim(route(computePlan(C, p(), TODAY), "main"), "evidence").level).toBe("gap");
  });

  it("marks that need help make preparation a gap; good marks stay Unknown while the requirement is unverified", () => {
    expect(dim(route(computePlan(C, p({ marks: "needsWork" }), TODAY), "main"), "preparation").level).toBe("gap");
    expect(dim(route(computePlan(C, p({ marks: "strong" }), TODAY), "main"), "preparation").level).toBe("unknown");
  });

  it("never shows Ready while the facts behind it are unverified, for any profile or career", () => {
    const options = {
      marks: ["strong", "medium", "needsWork", "unknown"], budget: ["tight", "some", "flexible", "unknown"], place: ["local", "away", "unknown"],
      entrance: ["notYet", "qualified", "notQualified"], interest: ["core", "technology", "care"], stream: ["pcb", "other", "undecided"]
    } as const;
    for (const pack of [C, M]) for (const marks of options.marks) for (const budget of options.budget) for (const place of options.place)
      for (const entrance of options.entrance) for (const interest of options.interest) for (const stream of options.stream) {
        const plan = computePlan(pack, p({ marks, budget, place, entrance, interest, stream, classLevel: 11 }), TODAY);
        for (const rp of plan.routes) for (const d of rp.readiness) expect(d.level, `${pack.career.id} ${rp.route.id} ${d.dim}`).not.toBe("ready");
      }
  });

  it("eligibility is never 'ready' while the rules are unverified", () => {
    expect(dim(route(computePlan(C, p({ stream: "pcb", marks: "strong", classLevel: 11 }), TODAY), "main"), "eligibility").level).toBe("unknown");
  });
});

describe("changing one assumption changes the plan", () => {
  it("a tight budget moves the focus to the lower-cost route and a government scenario", () => {
    const before = computePlan(C, p(), TODAY);
    const after = computePlan(C, p({ budget: "tight" }), TODAY);
    expect(before.focus).toBe("r.main");
    expect(after.focus).toBe("r.lowerCost");
    expect(route(after, "main").scenario.seat).toBe("government");
    expect(dim(route(after, "main"), "affordability").level).toBe("gap");
    const change = diffPlans(before, after, []);
    expect(change.focus).toEqual(["r.main", "r.lowerCost"]);
    expect(change.routes.length).toBeGreaterThan(0);
    expect(change.actions.find((a) => a.owner === "parent")?.to).toBe("a.parent.tight");
  });

  it("a flexible budget allows the private scenario", () => {
    expect(route(computePlan(C, p({ budget: "flexible", place: "away" }), TODAY), "main").scenario.id).toBe("sc.privateAway");
  });

  it("studying near home only picks a local scenario and flags opportunity", () => {
    const plan = computePlan(C, p({ place: "local" }), TODAY);
    expect(route(plan, "main").scenario.place).toBe("local");
    expect(dim(route(plan, "main"), "opportunity").level).toBe("gap");
  });

  it("an unsuccessful entrance attempt pauses the main routes and recommends the after-attempt route", () => {
    const plan = computePlan(C, p({ entrance: "notQualified", classLevel: 12 }), TODAY);
    expect(plan.focus).toBe("r.afterUnsuccessful");
    expect(route(plan, "main").status).toBe("paused");
    expect(route(plan, "lowerCost").status).toBe("paused");
    expect(plan.actions.map((a) => a.template.id)).toEqual(["a.child.retry", "a.parent.retry", "a.school.retry"]);
  });

  it("interest in the technology side recommends related careers", () => {
    const plan = computePlan(C, p({ interest: "technology" }), TODAY);
    expect(plan.focus).toBe("r.adjacent");
    expect(plan.actions[0].template.id).toBe("a.child.tech");
  });

  it("completed milestones are kept", () => {
    const before = computePlan(C, p({ classLevel: 11 }), TODAY);
    const after = computePlan(C, p({ classLevel: 11, budget: "tight" }), TODAY);
    const change = diffPlans(before, after, ["a.child.study"]);
    expect(change.kept).toEqual(expect.arrayContaining(["s.school", "s.subjects", "a.child.study"]));
  });
});

describe("next actions", () => {
  it("always gives three owned actions with a due date", () => {
    for (const profile of [p(), p({ classLevel: 12 }), p({ entrance: "notQualified" }), p({ budget: "tight", marks: "needsWork" })]) {
      const actions = computePlan(C, profile, TODAY).actions;
      expect(actions.map((a) => a.template.owner)).toEqual(["child", "parent", "school"]);
      for (const a of actions) expect(a.dueDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    }
  });
});

describe("funding gap", () => {
  it("never subtracts a government seat as if it were money: it is a scenario choice", () => {
    const main = C.routes.find((r) => r.kind === "main")!;
    const gap = schemesForGap(C, main, p()).map((x) => x.scheme.id);
    expect(gap).not.toContain("sch.stateQuota");
    expect(gap).toContain("sch.mahadbt");
  });
});

describe("support", () => {
  it("income-based schemes say 'depends on income' until the family chooses to answer", () => {
    const main = C.routes.find((r) => r.kind === "main")!;
    expect(matchSchemes(C, main, p()).find((x) => x.scheme.id === "sch.mahadbt")?.status).toBe("needsIncome");
    expect(matchSchemes(C, main, p({ income: "low" })).find((x) => x.scheme.id === "sch.mahadbt")?.status).toBe("mayBeEligible");
  });
  it("state schemes only appear in their state", () => {
    const main = C.routes.find((r) => r.kind === "main")!;
    expect(matchSchemes(C, main, p({ state: "KA" })).map((x) => x.scheme.id)).not.toContain("sch.mahadbt");
  });
});

describe("where I am", () => {
  it("maps class to a stage checkpoint, and the entrance result to reassess", () => {
    expect(currentPhase(p({ classLevel: 8 }))).toBe("explore");
    expect(currentPhase(p({ classLevel: 10 }))).toBe("decideSubjects");
    expect(currentPhase(p({ entrance: "notQualified" }))).toBe("reassess");
    expect(schoolYearsLeft(p({ classLevel: 8 }))).toBe(4);
  });
});

describe("evidence", () => {
  it("is verified only with a reviewer, an https source and real dates", () => {
    const e = C.evidence[0];
    expect(isEvidenceVerified(e)).toBe(false);
    expect(isEvidenceVerified({ ...e, review: { level: "researched", reviewer: "R", reviewedOn: "2026-10-02" }, source: { ...e.source, url: "https://nta.ac.in" }, effectiveDate: "2026-01-01", retrievedDate: "2026-10-02" })).toBe(true);
  });
});

describe("the same engine runs a musician", () => {
  it("computes a full plan with no musician-specific code", () => {
    const plan = computePlan(M, p(), TODAY);
    expect(plan.routes.length).toBe(4);
    expect(plan.actions.length).toBe(3);
    expect(dim(route(plan, "main"), "preparation").reason).toBe("prepPractice");
  });
});
