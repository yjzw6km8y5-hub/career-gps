import type { Figure, Lang, Option, Question, StatePack } from "../data/types";
import { fill, pick } from "../i18n";

/** A figure may be shown only with value + https source + as-of date + named reviewer. */
export function isVerified(f: Figure): boolean {
  return f.value != null && !!f.source && /^https:\/\//.test(f.source.url) && !!f.asOf && !!f.reviewer;
}

/** State names come from the state pack, never typed into route text (spec §3). */
export function fillState(text: string, pack: StatePack, lang: Lang): string {
  return fill(text, {
    stateName: pick(pack.name, lang),
    boardName: pick(pack.boardName, lang),
    class12Name: pick(pack.class12Name, lang),
    stateCounselling: pick(pack.stateCounselling, lang)
  });
}

/**
 * Which cardiologist-road stone is next for a child in this class:
 * up to Class 10 → "Finish Class 10" (0); Class 11–12 → "Class 11–12 Science" (1).
 */
export function nextStepIndex(classLevel: number): number {
  return classLevel >= 11 ? 1 : 0;
}

/** Does a conditional question apply, given the answers so far? */
export function applies(q: Question, answers: Record<string, string>): boolean {
  if (!q.when) return true;
  return Object.entries(q.when).every(([k, allowed]) => allowed.includes(answers[k]));
}

export function optionsOf(q: Question, all: Question[]): Option[] {
  if (q.sameOptionsAs) return all.find((x) => x.id === q.sameOptionsAs)?.options ?? [];
  return q.options ?? [];
}

/** Drop answers to questions that no longer apply (e.g. after changing "more" to "no"). */
export function pruneAnswers(answers: Record<string, string>, all: Question[]): Record<string, string> {
  const out = { ...answers };
  let changed = true;
  while (changed) {
    changed = false;
    for (const q of all) if (q.id in out && !applies(q, out)) { delete out[q.id]; changed = true; }
  }
  return out;
}

/** Next question id after `current` that applies, or null when the flow is finished. */
export function nextQuestionId(current: string, answers: Record<string, string>, all: Question[]): string | null {
  const i = all.findIndex((q) => q.id === current);
  for (let j = i + 1; j < all.length; j++) if (applies(all[j], answers)) return all[j].id;
  return null;
}
