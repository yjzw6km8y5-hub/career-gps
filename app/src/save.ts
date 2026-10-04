// "Continue a saved journey": the fictional demo journey is kept in this browser only.
// No accounts and no real-child data (DECISIONS.md). Every read/write is guarded.
import type { AppState } from "./state";

const KEY = "cgps.journey.v1";
type Saved = Pick<AppState, "mode" | "screen" | "careerId" | "trackId" | "attractions" | "profile" | "skipped" | "doneActions" | "review" | "changeLog">;

export function saveJourney(s: AppState): void {
  if (!s.careerId) return;
  const data: Saved = { mode: s.mode, screen: s.screen, careerId: s.careerId, trackId: s.trackId, attractions: s.attractions, profile: s.profile,
    skipped: s.skipped, doneActions: s.doneActions, review: s.review, changeLog: s.changeLog };
  try { localStorage.setItem(KEY, JSON.stringify(data)); } catch { /* storage blocked: journey just isn't saved */ }
}

export function loadSaved(): Saved | null {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return null;
    const saved = JSON.parse(raw) as Partial<Saved>;
    // Older saves have no track, and a bad value must not replace the default: drop it unless it is text.
    if (typeof saved.trackId !== "string") delete saved.trackId;
    return saved as Saved;
  } catch {
    return null;
  }
}

export function clearSaved(): void {
  try { localStorage.removeItem(KEY); } catch { /* ignore */ }
}
