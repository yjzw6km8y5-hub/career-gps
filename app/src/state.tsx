import { createContext, useContext } from "react";
import type { CareerPack, Lang, Profile } from "./data/schema";
import type { StringKey } from "./i18n";
import type { Plan, PlanChange } from "./lib/plan";

/** The journey, in order (feedback-2026-10-02-01 §8). "handoff" and "route" are side screens. */
export const JOURNEY = ["dream", "reality", "routes", "where", "readiness", "costs", "support", "gap", "monthly", "actions", "review", "passport"] as const;
export type Step = (typeof JOURNEY)[number];
export type Screen = "start" | "search" | "possibilities" | "country" | "country-planned" | "handoff" | "route" | "savings" | "banks" | Step;

export const SCREENS: Screen[] = ["start", "search", "possibilities", "country", "country-planned", "handoff", "route", "savings", "banks", ...JOURNEY];

export type Mode = "together" | "parent" | "child";
export type ReviewChoice = "month" | "term" | "results";
export type Changeable = "budget" | "marks" | "practice" | "place" | "entrance" | "interest";

export interface ChangeEntry { what: Changeable; from: string; to: string }

export interface AppState {
  lang: Lang;
  mode: Mode;
  screen: Screen;
  history: Screen[];
  careerId: string | null;
  attractions: string[];
  profile: Profile;
  /** Contextual questions the family chose to skip: never asked again unprompted. */
  skipped: string[];
  doneActions: string[];
  review: ReviewChoice | null;
  changeLog: ChangeEntry[];
  lastChange: PlanChange | null;
  routeId: string | null;      // route open on the route-detail screen
  readinessRoute: string | null;
  changeOpen: boolean;
  plannedMarket: string | null;
}

export interface AppApi {
  s: AppState;
  pack: CareerPack;
  plan: Plan;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
  go: (screen: Screen) => void;
  back: () => void;
  update: (patch: Partial<AppState>) => void;
  setProfile: (patch: Partial<Profile>) => void;
  applyChange: (what: Changeable, to: string) => void;
}

export const AppContext = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const api = useContext(AppContext);
  if (!api) throw new Error("useApp outside AppContext");
  return api;
}

export function stepIndex(screen: Screen): number {
  return (JOURNEY as readonly string[]).indexOf(screen);
}
