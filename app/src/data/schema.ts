// Career GPS pathway schema. Every career (cardiologist, musician, …) is a CareerPack of these
// entities. Screens read packs; no screen knows which career it is showing.
import type { StringKey } from "../i18n";

export type Lang = "en" | "mr";
export type Text = Record<Lang, string>;

// ---------- evidence ----------
export type ReviewLevel = "example" | "researched" | "planned";

export interface ReviewStatus {
  level: ReviewLevel;          // "researched" only after a named human checked the claim against its source
  reviewer: string | null;
  reviewedOn: string | null;   // YYYY-MM-DD
}

/** One factual claim and where it comes from. Unsourced claims use [placeholders] and stay "example". */
export interface EvidenceRecord {
  id: string;
  claim: Text;
  source: { title: Text; url: string };   // url is https://… or "[placeholder]"
  geography: Text;
  effectiveDate: string;                    // YYYY-MM-DD or "[placeholder]"
  retrievedDate: string;                    // YYYY-MM-DD or "[placeholder]"
  review: ReviewStatus;
  expiryRule: Text;
}

/** A number a family could see. Shown only when value is set and its evidence is researched. */
export interface Figure {
  label: Text;
  placeholder: Text;
  unit: string;
  value: string | null;
  evidence: string;
}

// ---------- pathway ----------
/** Stage checkpoints shared by every career (age is context only, never a gate). */
export type Phase = "explore" | "prepare" | "decideSubjects" | "apply" | "train" | "enterWork" | "reassess";
export const PHASES: Phase[] = ["explore", "prepare", "decideSubjects", "apply", "train", "enterWork", "reassess"];

export interface Stage {
  id: string;
  phase: Phase;
  icon: string;
  name: Text;
  detail: Text;
  evidence: string[];
  figures: string[];
  /** Done once the child is in at least this class (fictional profile). */
  doneFromClass?: number;
  /** Where progress made here stays useful if the route changes. */
  keepsValue?: Text;
}

export interface GateOption {
  id: string;
  label: Text;
  /** Where this outcome leads: another route, or carry on. */
  leadsTo: { route: string } | { carryOn: true };
}

export interface DecisionGate {
  id: string;
  afterStage: string;
  question: Text;
  options: GateOption[];
  review: Text;              // when to come back to this decision
  evidence: string[];
}

export interface EligibilityRule {
  id: string;
  stage: string;
  text: Text;
  needsStream?: Stream;
  evidence: string[];
}

export interface CostLine { label: Text; figure: string }

export interface CostScenario {
  id: string;
  name: Text;
  seat: "government" | "private" | "other";
  place: "local" | "away" | "any";
  lines: CostLine[];
  low: string;               // figure id
  high: string;              // figure id
  evidence: string[];
}

export type SchemeNeed = "income" | "state" | "governmentSeat";

export interface SupportScheme {
  id: string;
  name: Text;
  what: Text;
  portal: { name: Text; url: string };     // https://… or "[placeholder]"
  states?: string[];                        // state packs it applies to; absent = all India
  dependsOn: SchemeNeed[];
  amount: string;                           // figure id
  evidence: string[];
}

export type InterestLean = "core" | "technology" | "care";

export interface AdjacentCareer {
  id: string;
  icon: string;
  name: Text;
  why: Text;                 // why it keeps the same interest
  entry: Text;               // how you get in (placeholders until sourced)
  fits: InterestLean[];
  evidence: string[];
}

export type RouteKind = "main" | "lowerCost" | "afterUnsuccessful" | "adjacent";
export type Level3 = "lower" | "higher" | "unknown";

export interface Route {
  id: string;
  kind: RouteKind;
  icon: string;
  name: Text;
  summary: Text;
  stages: string[];
  gates: string[];
  rules: string[];
  scenarios: string[];       // in order of cost, cheapest first
  schemes: string[];
  adjacent?: string[];
  /** Earlier progress that carries over from another route. */
  reuses?: { route: string; stages: string[]; note: Text };
  costLevel: Level3;
  /** How preparation is judged: school marks, or practice (e.g. music). */
  prepBasis: "marks" | "practice";
  prepDemand: "high" | "medium";
  placeSensitive: boolean;   // few colleges near home, so studying away may be needed
  evidence: string[];
}

// ---------- actions ----------
export type Owner = "child" | "parent" | "school";

export interface Condition {
  classAtMost?: number;
  classAtLeast?: number;
  marks?: Marks[];
  budget?: Budget[];
  entrance?: Entrance[];
  interest?: InterestLean[];
  stream?: Stream[];
}

/** An action template; the plan picks the first matching one per owner. */
export interface Action {
  id: string;
  owner: Owner;
  text: Text;
  reason: Text;
  due: { inDays: number } | { review: Text };
  when: Condition;
}

// ---------- career ----------
export interface CareerOutcome {
  id: string;
  icon: string;
  name: Text;
  formalName: Text;
  what: Text;
  day: { icon: string; text: Text }[];
  attractions: { id: string; icon: string; text: Text }[];
  payFigure: string;
  timeFigure: string;        // how long the main route takes (a [placeholder] until sourced)
  outcomesNote: Text;
  evidence: string[];
}

export interface CareerPack {
  career: CareerOutcome;
  routes: Route[];
  stages: Stage[];
  gates: DecisionGate[];
  rules: EligibilityRule[];
  scenarios: CostScenario[];
  schemes: SupportScheme[];
  adjacent: AdjacentCareer[];
  actions: Action[];
  figures: Record<string, Figure>;
  evidence: EvidenceRecord[];
  /** Career-specific wording that replaces a shared screen string (e.g. 'audition' instead of 'entrance exam'). */
  wording?: Partial<Record<StringKey, Text>>;
}

// ---------- the family's situation (fictional in demo mode) ----------
export type Marks = "strong" | "medium" | "needsWork" | "unknown";
export type Budget = "tight" | "some" | "flexible" | "unknown";
export type Place = "local" | "away" | "unknown";
export type Entrance = "notYet" | "qualified" | "notQualified";
export type Stream = "pcb" | "other" | "undecided";
export type Income = "low" | "mid" | "high" | "unknown";

export interface Profile {
  classLevel: number;
  stream: Stream;
  marks: Marks;
  budget: Budget;
  place: Place;
  entrance: Entrance;
  interest: InterestLean;
  income: Income;
  state: string;
}
