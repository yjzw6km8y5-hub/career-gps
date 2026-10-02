// Shared data shapes. Every piece of text a family sees is a Text: one string per language.
export type Lang = "en" | "mr";
export type Text = Record<Lang, string>;

// Screen labels (FINAL-PLAN-fast):
//   researched = checked against its source by a named human reviewer
//   example    = shows the idea, not yet checked
//   planned    = not built yet
export type Status = "researched" | "example" | "planned";

// A figure is shown only if value + https source + asOf + reviewer are all present.
// Otherwise the app shows its placeholder. src/data/rules.test.ts enforces this.
export interface Figure {
  label: Text;
  placeholder: Text;
  unit: string;
  value: string | null;
  source: { url: string; title: string } | null;
  asOf: string | null;
  reviewer: string | null;
}

export interface StatePack {
  id: string;
  name: Text;
  status: Status;
  languages: Lang[];
  boardName: Text;
  class12Name: Text;
  stateCounselling: Text;
  scholarshipPortal: { name: Text; url: string }; // https link or "[placeholder]"
}

export interface Career {
  id: string;
  name: Text;
  icon: string;
  ready: boolean;
}

export interface RouteStep {
  id: string;
  icon: string;
  stage: LifeStage;
  child: Text;
  parent: Text; // may use {stateName} {class12Name} {stateCounselling}
  figures: string[];
  mayChange: boolean;
}

export interface Route {
  status: Status;
  sourceNote: Text;
  steps: RouteStep[];
}

export type LifeStage = "school" | "college" | "training" | "working" | "later";

export interface Option {
  v: string;
  icon: string;
  t?: Text;      // answer text
  fig?: string;  // or a figure (shown as its placeholder until verified)
  hint?: Text;
  sum?: Text;    // short form for the "what you told us" summary
}

export type SkipKind = "skip" | "preferNot" | "notSure";

export interface Question {
  id: string;
  q: Text;
  sub?: Text;
  options?: Option[];
  sameOptionsAs?: string;
  skip?: SkipKind;
  when?: Record<string, string[]>;
}

export interface SaveGroup {
  id: string;
  icon: string;
  name: Text;
  examples: Text;
  risk: Text;
}

export interface Interest {
  id: string;
  icon: string;
  name: Text;
}
