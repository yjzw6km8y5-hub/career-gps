import { createContext, useContext } from "react";
import type { Lang } from "./data/types";
import type { StringKey } from "./i18n";

export type Screen =
  | "home"
  | "country" | "country-planned"
  | "child-class" | "child-interests" | "child-dreams" | "child-soon" | "child-road"
  | "parent-about" | "parent-plan" | "parent-road" | "parent-life" | "parent-save" | "parent-adviser";

export const SCREENS: Screen[] = [
  "home", "country", "country-planned",
  "child-class", "child-interests", "child-dreams", "child-soon", "child-road",
  "parent-about", "parent-plan", "parent-road", "parent-life", "parent-save", "parent-adviser"
];

export function roleOf(s: Screen): "home" | "child" | "parent" {
  if (s.startsWith("child")) return "child";
  if (s.startsWith("parent")) return "parent";
  return "home";
}

// Demo only: everything lives in memory. Only the language choice is remembered.
export interface AppState {
  lang: Lang;
  screen: Screen;
  history: Screen[];
  answers: Record<string, string>;
  qStack: string[];
  childClass: number;
  interests: string[];
  interestRound: number;
  plannedMarket: string | null;
  questDone: boolean;
}

export interface AppApi {
  s: AppState;
  t: (key: StringKey, vars?: Record<string, string | number>) => string;
  go: (screen: Screen) => void;
  back: () => void;
  update: (patch: Partial<AppState>) => void;
}

export const AppContext = createContext<AppApi | null>(null);

export function useApp(): AppApi {
  const api = useContext(AppContext);
  if (!api) throw new Error("useApp outside AppContext");
  return api;
}
