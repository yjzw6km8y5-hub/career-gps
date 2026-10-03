import { useState, type ReactNode } from "react";
import { COMMON_EVIDENCE, COMMON_FIGURES } from "./data/common";
import type { EvidenceRecord, Figure, ReviewLevel } from "./data/schema";
import { pick } from "./i18n";
import { isFigureVerified, type Level } from "./lib/plan";
import { JOURNEY, stepIndex, useApp } from "./state";

// Primary actions carry data-primary: tests enforce "at most 3 primary actions visible at once".
// Lists, browse cards, navigation, evidence and details toggles are not primary.

export function useEvidence() {
  const { pack } = useApp();
  return (id: string): EvidenceRecord | undefined => pack.evidence.find((e) => e.id === id) ?? COMMON_EVIDENCE.find((e) => e.id === id);
}

export function useFigure() {
  const { pack } = useApp();
  return (id: string): Figure | undefined => pack.figures[id] ?? COMMON_FIGURES[id];
}

export function Fig({ id }: { id: string }) {
  const { s, t } = useApp();
  const figure = useFigure()(id);
  const evidence = useEvidence();
  if (!figure) return <span className="ph">[?]</span>;
  if (isFigureVerified(figure, evidence)) return <span className="fig">{figure.value}</span>;
  return <span className="ph" title={t("sourceNotChecked")}>{pick(figure.placeholder, s.lang)}</span>;
}

export function Label({ kind }: { kind: ReviewLevel }) {
  const { t } = useApp();
  const key = kind === "researched" ? "labelResearched" : kind === "example" ? "labelExample" : "labelPlanned";
  return <span className={`label label-${kind}`} data-label={kind}>{t(key)}</span>;
}

/** The lowest review level among the evidence: one unchecked claim makes the whole item "example". */
export function useLevelOf() {
  const evidence = useEvidence();
  return (ids: string[]): ReviewLevel =>
    ids.length && ids.every((id) => evidence(id)?.review.level === "researched") ? "researched" : "example";
}

/** Tap to see every evidence field for the claims behind an item. */
export function Evidence({ ids }: { ids: string[] }) {
  const { s, t } = useApp();
  const evidence = useEvidence();
  const records = ids.map(evidence).filter((e): e is EvidenceRecord => !!e);
  const level = useLevelOf()(ids);
  if (!records.length) return null;
  return (
    <details className="evidence" data-evidence>
      <summary><Label kind={level} /> {t("evidenceBtn")}</summary>
      {records.map((e) => (
        <dl key={e.id} className="ev-record">
          <dt>{t("evClaim")}</dt><dd>{pick(e.claim, s.lang)}</dd>
          <dt>{t("evSource")}</dt><dd>{/^https:\/\//.test(e.source.url) ? <a href={e.source.url} target="_blank" rel="noopener noreferrer">{pick(e.source.title, s.lang)}</a> : pick(e.source.title, s.lang)}</dd>
          <dt>{t("evGeography")}</dt><dd>{pick(e.geography, s.lang)}</dd>
          <dt>{t("evEffective")}</dt><dd>{e.effectiveDate}</dd>
          <dt>{t("evRetrieved")}</dt><dd>{e.retrievedDate}</dd>
          <dt>{t("evReviewer")}</dt><dd>{e.review.reviewer ? `${e.review.reviewer}, ${e.review.reviewedOn}` : t("evNotReviewed")}</dd>
          <dt>{t("evExpiry")}</dt><dd>{pick(e.expiryRule, s.lang)}</dd>
        </dl>
      ))}
    </details>
  );
}

/** "16 October 2026" style dates, in the reader's language. */
export function useDate() {
  const { s } = useApp();
  return (iso: string) => new Date(iso + "T00:00:00").toLocaleDateString(s.lang === "mr" ? "mr-IN" : "en-IN", { day: "numeric", month: "long", year: "numeric" });
}

export function NavBar({ title, extra }: { title?: string; extra?: ReactNode }) {
  const { back, t } = useApp();
  return (
    <div className="navbar">
      <button type="button" className="nav-back" onClick={back}>← {t("back")}</button>
      {title && <span className="nav-title">{title}</span>}
      {extra}
    </div>
  );
}

// What the Listen button reads: the screen title, then its main content, in reading order.
const SAY = "main h1, main .q-sub, main .lede-strong, main .ask-q, main .ask-why, main .q-name, main .select-name, main .day-line li, " +
  "main .route-name, main .route-summary, main .dim-name, main .dim .level, main .dim-reason, main .dim-action, main .bn-lead, main .bn-value, " +
  "main .bn-unit, main .scheme-name, main .scheme-status, main .action-owner, main .action-text, main .action-why, main .passport dt, main .passport dd, main .soon p";
const SPEECH_LANG = { en: "en-IN", mr: "mr-IN" } as const;

/** Reads the current screen aloud (for parents and children who read little). Unchecked [placeholders] are read as "not checked yet". */
export function Listen() {
  const { s, t } = useApp();
  const [note, setNote] = useState("");
  const say = () => {
    if (!("speechSynthesis" in window)) { setNote(t("noVoice")); return; }
    const voices = window.speechSynthesis.getVoices();
    if (s.lang === "mr" && voices.length > 0 && !voices.some((v) => v.lang.toLowerCase().startsWith("mr"))) setNote(t("noMarathiVoice"));
    const text = [...document.querySelectorAll<HTMLElement>(SAY)].map((el) => el.innerText.trim()).filter(Boolean).join(". ")
      .replace(/\[[^\]]*\]/g, t("notCheckedSpoken"));
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = SPEECH_LANG[s.lang];
    window.speechSynthesis.speak(u);
  };
  return (
    <>
      <button type="button" className="nav-extra listen-btn" data-action="listen" onClick={say}><span aria-hidden="true">🔊</span> {t("listen")}</button>
      {note && <span className="listen-note" role="status">{note}</span>}
    </>
  );
}

/** Header for a journey step: Back, Listen, progress, and the Change-something button. */
export function StepHeader({ step }: { step: (typeof JOURNEY)[number] }) {
  const { t, update } = useApp();
  const n = stepIndex(step) + 1;
  const showChange = n >= 3; // once there is a plan to change
  return (
    <>
      <NavBar extra={<>
        <Listen />
        {showChange && <button type="button" className="nav-extra" data-action="change" onClick={() => update({ changeOpen: true })}>{t("changeSomething")}</button>}
      </>} />
      <div className="q-progress" role="progressbar" aria-valuemin={1} aria-valuemax={JOURNEY.length} aria-valuenow={n}
        aria-valuetext={t("stepOf", { n, total: JOURNEY.length })} aria-label={t("stepOf", { n, total: JOURNEY.length })}>
        {JOURNEY.map((j, i) => <span key={j} className={i < n ? "on" : ""} />)}
      </div>
      <p className="step-of" aria-hidden="true">{t("stepOf", { n, total: JOURNEY.length })}</p>
    </>
  );
}

export function NextButton({ onClick, label }: { onClick: () => void; label?: string }) {
  const { t } = useApp();
  return <button type="button" data-primary className="next-btn" onClick={onClick}>{label ?? t("next")} ▶</button>;
}

const LEVEL_ICON: Record<Level, string> = { ready: "✅", gap: "⚠️", unknown: "❔" };

export function LevelBadge({ level }: { level: Level }) {
  const { t } = useApp();
  return <span className={`level level-${level}`} data-level={level}><span aria-hidden="true">{LEVEL_ICON[level]}</span> {t(`level_${level}`)}</span>;
}

export function Screen({ children, name }: { children: ReactNode; name: string }) {
  return <section className="screen" data-screen={name}>{children}</section>;
}

/** A contextual question: says why it is asked, offers ≤3 answers, always allows Skip. */
export function AskInline<T extends string>({ id, question, why, options, onAnswer, onSkip }: {
  id: string; question: string; why: string; options: { v: T; label: ReactNode; icon?: string }[];
  onAnswer: (v: T) => void; onSkip: () => void;
}) {
  const { t } = useApp();
  return (
    <div className="ask" data-ask={id}>
      <h2 className="ask-q">{question}</h2>
      <p className="ask-why">{why}</p>
      <div className="ask-options">
        {options.map((o) => (
          <button key={o.v} type="button" data-primary data-answer={o.v} className="q-card" onClick={() => onAnswer(o.v)}>
            {o.icon && <span className="q-icon" aria-hidden="true">{o.icon}</span>}
            <span className="q-name">{o.label}</span>
          </button>
        ))}
      </div>
      <button type="button" className="q-skip" data-action="skip" onClick={onSkip}>{t("skip")} →</button>
    </div>
  );
}
