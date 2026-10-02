import { useCallback, useEffect, useMemo, useState } from "react";
import { FAMILY, MARKETS, STATE_PACKS } from "./data/content";
import type { Lang } from "./data/types";
import { pick, translate } from "./i18n";
import { AppContext, roleOf, SCREENS, type AppApi, type AppState, type Screen } from "./state";
import { Country, CountryPlanned, Home } from "./screens/Home";
import { ChildClass, ChildDreams, ChildInterests, ChildRoad, ChildSoon } from "./screens/Child";
import { ParentAbout, ParentAdviser, ParentLife, ParentPlan, ParentRoad, ParentSave } from "./screens/Parent";

const pack = STATE_PACKS[FAMILY.state];

function load(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } }
function save(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }

function initialState(): AppState {
  const params = new URLSearchParams(location.search);
  const wantLang = params.get("lang") || load("cgps.lang") || "en";
  const lang: Lang = (pack.languages as string[]).includes(wantLang) ? (wantLang as Lang) : "en";
  const wantScreen = params.get("screen") as Screen | null; // direct link, e.g. ?screen=parent-plan
  return {
    lang,
    screen: wantScreen && SCREENS.includes(wantScreen) ? wantScreen : "home",
    history: [],
    answers: {},
    qStack: [],
    childClass: FAMILY.child.classLevel,
    interests: [],
    interestRound: 0,
    plannedMarket: null,
    questDone: false
  };
}

const VIEWS: Record<Screen, () => React.JSX.Element> = {
  home: Home,
  country: Country,
  "country-planned": CountryPlanned,
  "child-class": ChildClass,
  "child-interests": ChildInterests,
  "child-dreams": ChildDreams,
  "child-soon": ChildSoon,
  "child-road": ChildRoad,
  "parent-about": ParentAbout,
  "parent-plan": ParentPlan,
  "parent-road": ParentRoad,
  "parent-life": ParentLife,
  "parent-save": ParentSave,
  "parent-adviser": ParentAdviser
};

export default function App() {
  const [s, setS] = useState<AppState>(initialState);

  const update = useCallback((patch: Partial<AppState>) => setS((prev) => ({ ...prev, ...patch })), []);
  const go = useCallback((screen: Screen) => {
    setS((prev) => (prev.screen === screen ? prev : { ...prev, history: [...prev.history, prev.screen], screen }));
    window.scrollTo(0, 0);
  }, []);
  const back = useCallback(() => {
    setS((prev) => {
      // Inside multi-step flows, Back steps back one question or one interest round first.
      if (prev.screen === "parent-about" && prev.qStack.length > 1) return { ...prev, qStack: prev.qStack.slice(0, -1) };
      if (prev.screen === "child-interests" && prev.interestRound > 0) return { ...prev, interestRound: prev.interestRound - 1 };
      const history = prev.history.slice(0, -1);
      return { ...prev, screen: prev.history[prev.history.length - 1] ?? "home", history };
    });
  }, []);

  const api: AppApi = useMemo(() => ({
    s, go, back, update,
    t: (key, vars) => translate(s.lang, key, vars)
  }), [s, go, back, update]);

  const role = roleOf(s.screen);
  useEffect(() => {
    document.documentElement.lang = s.lang;
    document.body.dataset.role = role;
  }, [s.lang, role]);

  const setLang = (lang: Lang) => { save("cgps.lang", lang); update({ lang }); };
  const View = VIEWS[s.screen];
  const india = MARKETS[0];

  return (
    <AppContext.Provider value={api}>
      <div className="sky" aria-hidden="true" />
      <header className="topbar">
        <button className="brand" type="button" aria-label="Career GPS" onClick={() => update({ screen: "home", history: [], qStack: [] })}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="15" fill="currentColor" opacity=".18" /><path d="M16 5c-5 0-8.5 3.6-8.5 8.3C7.5 19.5 16 27 16 27s8.5-7.5 8.5-13.7C24.5 8.6 21 5 16 5zm0 11.6a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6z" fill="currentColor" /></svg>
          </span>
          <span className="brand-text">
            <span className="brand-name">Career GPS</span>
            <span className="brand-tag">{api.t("tagline")}</span>
          </span>
        </button>
        <div className="top-right">
          <button type="button" className="country-chip" onClick={() => go("country")} aria-label={api.t("country")}>
            📍 {pick(india.name, s.lang)} ▾
          </button>
          <div className="lang" role="group" aria-label={api.t("languageGroup")}>
            {pack.languages.map((l) => (
              <button key={l} type="button" data-lang={l} aria-pressed={s.lang === l} onClick={() => setLang(l)}>
                {l === "en" ? "English" : "मराठी"}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="demo-banner">{api.t("demoBanner")}</div>
      {s.lang !== "en" && <p className="demo-banner tr-note" data-draft-note>{api.t("translationNote")}</p>}
      <main id="app" aria-live="polite">
        <View key={s.screen + ":" + s.qStack.length + ":" + s.interestRound} />
      </main>
    </AppContext.Provider>
  );
}
