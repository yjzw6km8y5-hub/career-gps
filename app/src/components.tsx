import type { ReactNode } from "react";
import { FIGURES } from "./data/figures";
import type { Status } from "./data/types";
import { pick } from "./i18n";
import { isVerified } from "./lib/rules";
import { useApp } from "./state";

// Choice buttons carry data-choice so tests can enforce "at most 3 choices per screen".
// Navigation (Back, Skip, Listen, language, details) carries no data-choice.

export function Fig({ id }: { id: string }) {
  const { s, t } = useApp();
  const f = FIGURES[id];
  if (!f) return <span className="ph">{t("missingFigure")}</span>;
  if (isVerified(f)) return <span className="fig">{f.value}</span>;
  return <span className="ph" title={t("sourceNotChecked")}>{pick(f.placeholder, s.lang)}</span>;
}

export function SourceNote({ id }: { id: string }) {
  const { t } = useApp();
  const f = FIGURES[id];
  if (!f || !isVerified(f) || !f.source) return <span className="src">{t("sourceNotChecked")}</span>;
  return (
    <span className="src">
      <a href={f.source.url} target="_blank" rel="noopener noreferrer">{t("sourceAsOf", { title: f.source.title, date: f.asOf ?? "" })}</a>
    </span>
  );
}

export function Label({ kind }: { kind: Status }) {
  const { t } = useApp();
  const key = kind === "researched" ? "labelResearched" : kind === "example" ? "labelExample" : "labelPlanned";
  return <span className={`label label-${kind}`} data-label={kind}>{t(key)}</span>;
}

export function Foot({ kind, children, center }: { kind: Status; children?: ReactNode; center?: boolean }) {
  return <p className={"screen-foot" + (center ? " screen-foot-center" : "")}><Label kind={kind} /> {children}</p>;
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

const SPEECH_LANG = { en: "en-IN", mr: "mr-IN" } as const;

export function Listen({ text }: { text: string }) {
  const { s, t } = useApp();
  const say = () => {
    if (!("speechSynthesis" in window)) return;
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = SPEECH_LANG[s.lang];
    window.speechSynthesis.speak(u);
  };
  return (
    <button type="button" className="listen" onClick={say}>
      <span aria-hidden="true">🔊</span> {t("listen")}
    </button>
  );
}

export function Screen({ children, name }: { children: ReactNode; name: string }) {
  return <section className="screen" data-screen={name}>{children}</section>;
}
