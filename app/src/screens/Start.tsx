import { useState } from "react";
import { Listen, NavBar, Screen } from "../components";
import { CATALOGUE, MARKETS, POSSIBILITIES } from "../data/common";
import { pick } from "../i18n";
import { loadSaved } from "../save";
import { useApp, type Mode } from "../state";

const MODES: { v: Mode; key: "modeTogether" | "modeParent" | "modeChild" }[] = [
  { v: "together", key: "modeTogether" },
  { v: "parent", key: "modeParent" },
  { v: "child", key: "modeChild" }
];

export function Start() {
  const { s, t, go, update } = useApp();
  const [noSaved, setNoSaved] = useState(false);
  const big = (onClick: () => void, icon: string, title: string, sub: string, name: string) => (
    <button type="button" data-primary data-start={name} className="start-card" onClick={onClick}>
      <span className="start-icon" aria-hidden="true">{icon}</span>
      <span className="start-text"><span className="start-title">{title}</span><span className="start-sub">{sub}</span></span>
    </button>
  );
  const resume = () => {
    const saved = loadSaved();
    if (!saved) { setNoSaved(true); return; }
    update({ ...saved, history: ["start"], changeOpen: false, lastChange: null });
  };
  return (
    <Screen name="start">
      <h1 className="big-q">{t("startQ")}</h1>
      <p className="start-listen"><Listen /></p>
      <div className="mode" role="radiogroup" aria-label={t("whoHere")}>
        <span className="mode-label">{t("whoHere")}</span>
        {MODES.map((m) => (
          <button key={m.v} type="button" role="radio" aria-checked={s.mode === m.v} className="mode-btn" onClick={() => update({ mode: m.v })}>
            {t(m.key)}{m.v === "together" && <span className="mode-rec"> · {t("recommended")}</span>}
          </button>
        ))}
      </div>
      <div className="start-grid">
        {big(() => go("search"), "🔎", t("searchDream"), t("searchDreamSub"), "search")}
        {big(() => go("possibilities"), "✨", t("showPossibilities"), t("showPossibilitiesSub"), "possibilities")}
        {big(resume, "📂", t("continueSaved"), t("continueSavedSub"), "continue")}
      </div>
      {noSaved && <p className="notice" role="status">{t("noSaved")}</p>}
    </Screen>
  );
}

function CareerList({ items }: { items: typeof CATALOGUE }) {
  const { s, t, go, update } = useApp();
  const [asked, setAsked] = useState<string[]>([]);
  return (
    <ul className="career-list">
      {items.map((c) => (
        <li key={c.id} className={"career-item" + (c.ready ? " is-ready" : "")}>
          <span className="career-icon" aria-hidden="true">{c.icon}</span>
          <span className="career-name">{pick(c.name, s.lang)}</span>
          {c.ready ? (
            <button type="button" className="career-open" data-career={c.id} onClick={() => { update({ careerId: c.id, attractions: [] }); go("dream"); }}>{t("openJourney")}</button>
          ) : asked.includes(c.id) ? (
            <span className="career-note">{t("asked")}</span>
          ) : (
            <span className="career-coming">
              <span className="career-note">{t("dataComing")}</span>
              <button type="button" className="career-ask" onClick={() => setAsked([...asked, c.id])}>{t("askForCareer")}</button>
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

export function Search() {
  const { t } = useApp();
  const [q, setQ] = useState("");
  const words = q.trim().toLowerCase();
  const results = words ? CATALOGUE.filter((c) => (c.words + " " + c.name.en + " " + c.name.mr).toLowerCase().includes(words)) : CATALOGUE;
  return (
    <Screen name="search">
      <NavBar title={t("searchTitle")} />
      <label className="search-label" htmlFor="career-search">{t("searchLabel")}</label>
      <input id="career-search" className="search-input" type="search" value={q} placeholder={t("searchPlaceholder")} onChange={(e) => setQ(e.target.value)} autoComplete="off" />
      {results.length ? <CareerList items={results} /> : <p className="notice">{t("noResults")}</p>}
    </Screen>
  );
}

export function Possibilities() {
  const { s, t } = useApp();
  const [lean, setLean] = useState<string | null>(null);
  const matches = lean ? CATALOGUE.filter((c) => c.leans.includes(lean)) : [];
  return (
    <Screen name="possibilities">
      <NavBar title={t("showPossibilities")} />
      <h1 className="screen-title">{t("possTitle")}</h1>
      <p className="q-sub">{t("possHint")}</p>
      <div className="poss-grid">
        {POSSIBILITIES.map((p) => (
          <button key={p.id} type="button" className="poss-card" aria-pressed={lean === p.id} onClick={() => setLean(p.id)}>
            <span className="poss-icon" aria-hidden="true">{p.icon}</span>
            <span>{pick(p.name, s.lang)}</span>
          </button>
        ))}
      </div>
      {lean && (
        <>
          <h2 className="sub-title">{t("possMatches")}</h2>
          <CareerList items={matches} />
        </>
      )}
    </Screen>
  );
}

export function Country() {
  const { s, t, back, go, update } = useApp();
  return (
    <Screen name="country">
      <NavBar title={t("country")} />
      <h1 className="q-title">{t("whichCountry")}</h1>
      <div className="q-grid">
        {MARKETS.map((m) => (
          <button key={m.id} type="button" data-primary className="q-card" aria-pressed={m.id === "IN"}
            onClick={() => { if (!m.planned) back(); else { update({ plannedMarket: m.id }); go("country-planned"); } }}>
            <span className="q-icon" aria-hidden="true">{m.icon}</span>
            <span className="q-name">{pick(m.name, s.lang)}</span>
            {m.planned && <span className="q-hint">{t("labelPlanned")}</span>}
          </button>
        ))}
      </div>
    </Screen>
  );
}

export function CountryPlanned() {
  const { s, t, back } = useApp();
  const m = MARKETS.find((x) => x.id === s.plannedMarket) ?? MARKETS[1];
  const country = pick(m.name, s.lang);
  return (
    <Screen name="country-planned">
      <NavBar />
      <div className="soon">
        <span className="soon-icon" aria-hidden="true">🗺️</span>
        <h1 className="screen-title">{t("countryPlannedTitle", { country })}</h1>
        <p>{t("countryPlannedBody", { country })}</p>
        {/* Back twice: past the country picker, to where the user was before. */}
        <button type="button" data-primary className="next-btn" onClick={() => { back(); back(); }}>{t("backToIndia")}</button>
        <p className="screen-foot screen-foot-center"><span className="label label-planned" data-label="planned">{t("labelPlanned")}</span></p>
      </div>
    </Screen>
  );
}
