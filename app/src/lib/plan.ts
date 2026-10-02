// The pathway engine. Pure functions over a CareerPack and the family's Profile.
// No career-specific code lives here: the same engine runs the cardiologist and the musician.
import type { Action, CareerPack, Condition, CostScenario, EvidenceRecord, Figure, Owner, Phase, Profile, Route, SupportScheme } from "../data/schema";
import type { StringKey } from "../i18n";

// ---------- evidence ----------
export function isEvidenceVerified(e: EvidenceRecord | undefined): boolean {
  return !!e && e.review.level === "researched" && !!e.review.reviewer && /^https:\/\//.test(e.source.url)
    && /^\d{4}-\d{2}-\d{2}$/.test(e.effectiveDate) && /^\d{4}-\d{2}-\d{2}$/.test(e.retrievedDate);
}

/** A figure is shown only with a value AND verified evidence. Otherwise its [placeholder]. */
export function isFigureVerified(f: Figure, evidence: (id: string) => EvidenceRecord | undefined): boolean {
  return f.value != null && isEvidenceVerified(evidence(f.evidence));
}

// ---------- readiness ----------
export type Level = "ready" | "gap" | "unknown";
export type Dim = "eligibility" | "preparation" | "affordability" | "opportunity" | "evidence";
export const DIMS: Dim[] = ["eligibility", "preparation", "affordability", "opportunity", "evidence"];

export interface DimResult {
  dim: Dim;
  level: Level;
  reason: StringKey;
  action: StringKey;
  vars?: Record<string, string | number>;
}

const r = (dim: Dim, level: Level, reason: StringKey, action: StringKey, vars?: DimResult["vars"]): DimResult => ({ dim, level, reason, action, vars });

function eligibility(pack: CareerPack, route: Route, p: Profile): DimResult {
  const rules = pack.rules.filter((x) => route.rules.includes(x.id));
  const streamRule = rules.find((x) => x.needsStream);
  const rulesVerified = rules.length > 0 && rules.every((x) => x.evidence.every((id) => isEvidenceVerified(pack.evidence.find((e) => e.id === id))));
  if (streamRule) {
    if (p.stream === "other") return r("eligibility", "gap", "eligStreamOther", "eligActStream");
    if (p.stream === "undecided") {
      return p.classLevel <= 10 ? r("eligibility", "unknown", "eligDecideLater", "eligActDecide") : r("eligibility", "unknown", "eligStreamUnknown", "eligActStream");
    }
    if (p.marks === "needsWork") return r("eligibility", "gap", "eligMarksRisk", "eligActMarks");
    if (rulesVerified && p.marks === "strong") return r("eligibility", "ready", "eligReady", "eligActKeep");
    return r("eligibility", "unknown", "eligRulesUnverified", "eligActCheckRules");
  }
  if (rules.length === 0) return r("eligibility", "unknown", "eligNoRules", "eligActCheckRules");
  return rulesVerified ? r("eligibility", "ready", "eligReady", "eligActKeep") : r("eligibility", "unknown", "eligRulesUnverified", "eligActCheckRules");
}

const allVerified = (pack: CareerPack, ids: string[]) =>
  ids.length > 0 && ids.every((id) => isEvidenceVerified(pack.evidence.find((e) => e.id === id)));

// "Ready" is only ever shown when the facts it rests on are verified. Until then the best a
// route can be is "Unknown". A "Gap" may come from the family's own answer (e.g. marks need
// help, money is tight), because that doesn't depend on unverified facts.
function preparation(pack: CareerPack, route: Route, p: Profile): DimResult {
  if (route.prepBasis === "practice") return r("preparation", "unknown", "prepPractice", "prepActPractice");
  if (p.marks === "unknown") return r("preparation", "unknown", "prepMarksUnknown", "prepActTellMarks");
  if (p.marks === "needsWork") return r("preparation", "gap", "prepNeedsWork", "prepActHelp");
  const requirementVerified = allVerified(pack, pack.rules.filter((x) => route.rules.includes(x.id)).flatMap((x) => x.evidence));
  if (!requirementVerified) return r("preparation", "unknown", p.marks === "strong" ? "prepStrongUnverified" : "prepMediumUnverified", p.marks === "strong" ? "prepActKeep" : "prepActWeekly");
  if (p.marks === "strong") return r("preparation", "ready", "prepStrong", "prepActKeep");
  return route.prepDemand === "high" ? r("preparation", "gap", "prepMediumHigh", "prepActWeekly") : r("preparation", "ready", "prepMediumOk", "prepActKeep");
}

function affordability(pack: CareerPack, route: Route, p: Profile, scenario: CostScenario): DimResult {
  if (p.budget === "unknown") return r("affordability", "unknown", "affBudgetUnknown", "affActBudget");
  if (p.budget === "tight") return r("affordability", "gap", "affTight", "affActSupport");
  const costsVerified = allVerified(pack, scenario.evidence) && [scenario.low, scenario.high].every((f) => pack.figures[f]?.value != null);
  if (!costsVerified || route.costLevel === "unknown") return r("affordability", "unknown", "affCostUnverified", "affActCost");
  if (route.costLevel === "higher" && p.budget !== "flexible") return r("affordability", "gap", "affHigher", "affActLowerCost");
  return r("affordability", "ready", "affFits", "affActConfirm");
}

function opportunity(route: Route, p: Profile): DimResult {
  if (p.entrance === "notQualified" && (route.kind === "main" || route.kind === "lowerCost")) return r("opportunity", "gap", "oppNotQualified", "oppActRetry");
  if (route.placeSensitive && p.place === "local") return r("opportunity", "gap", "oppLocal", "oppActAway");
  return r("opportunity", "unknown", "oppUnverified", "oppActSeats");
}

function evidenceConfidence(pack: CareerPack, route: Route): DimResult {
  const ids = new Set([...route.evidence, ...pack.stages.filter((s) => route.stages.includes(s.id)).flatMap((s) => s.evidence)]);
  const total = ids.size;
  const checked = [...ids].filter((id) => isEvidenceVerified(pack.evidence.find((e) => e.id === id))).length;
  if (total > 0 && checked === total) return r("evidence", "ready", "evAll", "evActKeep", { n: checked, total });
  return r("evidence", "gap", checked ? "evSome" : "evNone", "evActCheck", { n: checked, total });
}

export function readiness(pack: CareerPack, route: Route, p: Profile): DimResult[] {
  return [eligibility(pack, route, p), preparation(pack, route, p), affordability(pack, route, p, pickScenario(pack, route, p)),
    opportunity(route, p), evidenceConfidence(pack, route)];
}

// ---------- routes, costs, support ----------
export type RouteStatus = "recommended" | "open" | "paused" | "ifNeeded";

export function routeStatus(route: Route, p: Profile, all: Route[]): RouteStatus {
  const focus = focusRouteId(all, p);
  if (route.id === focus) return "recommended";
  if (p.entrance === "notQualified" && (route.kind === "main" || route.kind === "lowerCost")) return "paused";
  if (route.kind === "afterUnsuccessful" && p.entrance !== "notQualified") return "ifNeeded";
  return "open";
}

/** Which route the plan centres on, from the family's situation. */
export function focusRouteId(all: Route[], p: Profile): string {
  const byKind = (k: Route["kind"]) => all.find((x) => x.kind === k)?.id;
  if (p.entrance === "notQualified") return byKind("afterUnsuccessful") ?? all[0].id;
  if (p.interest !== "core") return byKind("adjacent") ?? all[0].id;
  if (p.budget === "tight" || p.budget === "some") return byKind("lowerCost") ?? all[0].id;
  return byKind("main") ?? all[0].id;
}

export function pickScenario(pack: CareerPack, route: Route, p: Profile): CostScenario {
  let options = route.scenarios.map((id) => pack.scenarios.find((s) => s.id === id)!).filter(Boolean);
  if (p.place !== "unknown") {
    const fit = options.filter((s) => s.place === p.place || s.place === "any");
    if (fit.length) options = fit;
  }
  if (p.budget === "tight" || p.budget === "some") {
    const govt = options.filter((s) => s.seat !== "private");
    if (govt.length) options = govt;
  }
  return p.budget === "flexible" ? options[options.length - 1] : options[0];
}

/** Support that lowers the cost of a scenario. A government seat is a scenario choice, not money that
 *  comes off a bill (government scenarios already use government fees), so it is never subtracted. */
export function schemesForGap(pack: CareerPack, route: Route, p: Profile) {
  return matchSchemes(pack, route, p).filter(({ scheme }) => !scheme.dependsOn.includes("governmentSeat"));
}

export type SchemeStatus ="mayBeEligible" | "checkRules" | "needsIncome";

export function matchSchemes(pack: CareerPack, route: Route, p: Profile): { scheme: SupportScheme; status: SchemeStatus }[] {
  return route.schemes
    .map((id) => pack.schemes.find((s) => s.id === id)!)
    .filter((s) => s && (!s.states || s.states.includes(p.state)))
    .map((scheme) => {
      if (!scheme.dependsOn.includes("income")) return { scheme, status: "mayBeEligible" as const };
      if (p.income === "unknown") return { scheme, status: "needsIncome" as const };
      return { scheme, status: p.income === "low" ? ("mayBeEligible" as const) : ("checkRules" as const) };
    });
}

// ---------- actions ----------
export interface PlannedAction { template: Action; dueDate: string | null }

export function matches(c: Condition, p: Profile): boolean {
  if (c.classAtMost != null && p.classLevel > c.classAtMost) return false;
  if (c.classAtLeast != null && p.classLevel < c.classAtLeast) return false;
  if (c.marks && !c.marks.includes(p.marks)) return false;
  if (c.budget && !c.budget.includes(p.budget)) return false;
  if (c.entrance && !c.entrance.includes(p.entrance)) return false;
  if (c.interest && !c.interest.includes(p.interest)) return false;
  if (c.stream && !c.stream.includes(p.stream)) return false;
  return true;
}

export const OWNERS: Owner[] = ["child", "parent", "school"];

export function nextActions(pack: CareerPack, p: Profile, today: Date): PlannedAction[] {
  return OWNERS.map((owner) => {
    const template = pack.actions.find((a) => a.owner === owner && matches(a.when, p))!;
    const dueDate = "inDays" in template.due ? isoDate(addDays(today, template.due.inDays)) : null;
    return { template, dueDate };
  });
}

export function addDays(d: Date, n: number): Date { const x = new Date(d); x.setDate(x.getDate() + n); return x; }
export function isoDate(d: Date): string { return d.toISOString().slice(0, 10); }

// ---------- where I am ----------
export function currentPhase(p: Profile): Phase {
  if (p.entrance === "notQualified") return "reassess";
  if (p.classLevel <= 8) return "explore";
  if (p.classLevel === 9) return "prepare";
  if (p.classLevel === 10) return "decideSubjects";
  if (p.classLevel === 11) return "prepare";
  return "apply";
}

export function completedStages(pack: CareerPack, p: Profile): string[] {
  return pack.stages.filter((s) => s.doneFromClass != null && p.classLevel >= s.doneFromClass).map((s) => s.id);
}

/** School years left before college fees start (the child's own class, not a sourced figure). */
export function schoolYearsLeft(p: Profile): number {
  return Math.max(0, 12 - p.classLevel);
}

// ---------- the plan, and what changed ----------
export interface RoutePlan { route: Route; status: RouteStatus; readiness: DimResult[]; scenario: CostScenario }
export interface Plan { routes: RoutePlan[]; focus: string; actions: PlannedAction[]; done: string[] }

export function computePlan(pack: CareerPack, p: Profile, today: Date): Plan {
  return {
    routes: pack.routes.map((route) => ({ route, status: routeStatus(route, p, pack.routes), readiness: readiness(pack, route, p), scenario: pickScenario(pack, route, p) })),
    focus: focusRouteId(pack.routes, p),
    actions: nextActions(pack, p, today),
    done: completedStages(pack, p)
  };
}

export interface PlanChange {
  routes: { id: string; status?: [RouteStatus, RouteStatus]; scenario?: [string, string]; dims: { dim: Dim; from: Level; to: Level; reason: StringKey }[] }[];
  focus?: [string, string];
  actions: { owner: Owner; from: string; to: string }[];
  kept: string[];
}

export function diffPlans(before: Plan, after: Plan, doneActions: string[]): PlanChange {
  const routes = after.routes.flatMap((a) => {
    const b = before.routes.find((x) => x.route.id === a.route.id)!;
    // A dimension counts as changed if its level OR its reason changed (e.g. marks improve but stay Unknown).
    const dims = a.readiness.flatMap((d, i) => (d.level !== b.readiness[i].level || d.reason !== b.readiness[i].reason
      ? [{ dim: d.dim, from: b.readiness[i].level, to: d.level, reason: d.reason }] : []));
    const status = a.status !== b.status ? ([b.status, a.status] as [RouteStatus, RouteStatus]) : undefined;
    const scenario = a.scenario.id !== b.scenario.id ? ([b.scenario.id, a.scenario.id] as [string, string]) : undefined;
    return dims.length || status || scenario ? [{ id: a.route.id, status, scenario, dims }] : [];
  });
  const actions = after.actions.flatMap((a, i) => (a.template.id !== before.actions[i].template.id ? [{ owner: a.template.owner, from: before.actions[i].template.id, to: a.template.id }] : []));
  return {
    routes,
    focus: before.focus !== after.focus ? [before.focus, after.focus] : undefined,
    actions,
    kept: [...after.done, ...doneActions]
  };
}
