// "Continue a saved journey": the fictional demo journey is kept in this browser only.
// No accounts and no real-child data (DECISIONS.md). Every read/write is guarded.
import type { AppState } from "./state";

const KEY = "cgps.journey.v1";
type Saved = Pick<AppState, "mode" | "screen" | "careerId" | "attractions" | "profile" | "skipped" | "doneActions" | "review" | "changeLog">;

export function saveJourney(s: AppState): void {
  if (!s.careerId) return;
  const data: Saved = { mode: s.mode, screen: s.screen, careerId: s.careerId, attractions: s.attractions, profile: s.profile,
    skipped: s.skipped, doneActions: s.doneActions, review: s.review, changeLog: s.changeLog };
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage blocked: journey just isn't saved */ }
}

export function loadSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Saved) : null;
  } catch {
    return null;
  }
}

export function clearSaved(): void {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
