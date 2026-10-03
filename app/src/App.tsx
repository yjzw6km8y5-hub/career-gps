import { useCallback, useEffect, useMemo, useRef, useState, type JSX } from "react";
import { MARKETS, PACKS, START_PROFILE, STATE_PACKS } from "./data/common";
import type { Lang, Profile } from "./data/schema";
import { fill, pick, translate } from "./i18n";
import { computePlan, diffPlans } from "./lib/plan";
import { saveJourney } from "./save";
import { AppContext, SCREENS, stepIndex, type AppApi, type AppState, type Changeable, type Mode, type Screen } from "./state";
import { Country, CountryPlanned, Possibilities, Search, Start } from "./screens/Start";
import { Dream, Handoff, Reality, RouteDetail, Routes, Where } from "./screens/Journey1";
import { Costs, Gap, Monthly, Readiness, Savings, Support } from "./screens/Journey2";
import { Actions, ChangeSheet, Passport, Review } from "./screens/Journey3";

function load(k: string): string | null { try { return localStorage.getItem(k); } catch { return null; } }
function save(k: string, v: string) { try { localStorage.setItem(k, v); } catch { /* private mode */ } }

function initialState(): AppState {
  const params = new URLSearchParams(location.search);
  const languages = STATE_PACKS[START_PROFILE.state].languages as string[];
  const wantLang = params.get("lang") || load("cgps.lang") || "en";
  const lang: Lang = languages.includes(wantLang) ? (wantLang as Lang) : "en";
  const wantScreen = params.get("screen") as Screen | null; // direct link, e.g. ?screen=readiness
  const screen: Screen = wantScreen && SCREENS.includes(wantScreen) ? wantScreen : "start";
  const career = params.get("career");
  const mode = params.get("mode") as Mode | null;
  return {
    lang,
    mode: mode === "parent" || mode === "child" ? mode : "together",
    screen,
    history: [],
    // Deep links into the journey open the cardiologist unless another ready pack is named.
    careerId: career && PACKS[career] ? career : stepIndex(screen) >= 0 || screen === "route" || screen === "handoff" || screen === "savings" ? "cardiologist" : null,
    attractions: [],
    profile: { ...START_PROFILE },
    skipped: [],
    doneActions: [],
    review: null,
    changeLog: [],
    lastChange: null,
    routeId: null,
    readinessRoute: null,
    changeOpen: false,
    plannedMarket: null
  };
}

const VIEWS: Record<Screen, () => JSX.Element> = {
  start: Start, search: Search, possibilities: Possibilities, country: Country, "country-planned": CountryPlanned,
  dream: Dream, handoff: Handoff, reality: Reality, routes: Routes, route: RouteDetail, where: Where,
  readiness: Readiness, costs: Costs, support: Support, gap: Gap, monthly: Monthly, savings: Savings,
  actions: Actions, review: Review, passport: Passport
};

export default function App() {
  const [s, setS] = useState<AppState>(initialState);
  const pack = PACKS[s.careerId ?? "cardiologist"];
  // "Today" is fixed per session so due dates don't drift while the page is open.
  const [today] = useState(() => new Date());
  const plan = useMemo(() => computePlan(pack, s.profile, today), [pack, s.profile, today]);

  const update = useCallback((patch: Partial<AppState>) => setS((prev) => ({ ...prev, ...patch })), []);
  const go = useCallback((screen: Screen) => {
    setS((prev) => (prev.screen === screen ? prev : { ...prev, history: [...prev.history, prev.screen], screen }));
    window.scrollTo(0, 0);
  }, []);
  const back = useCallback(() => {
    setS((prev) => ({ ...prev, screen: prev.history[prev.history.length - 1] ?? "start", history: prev.history.slice(0, -1) }));
  }, []);
  const setProfile = useCallback((patch: Partial<Profile>) => setS((prev) => ({ ...prev, profile: { ...prev.profile, ...patch } })), []);

  /** "Change something": apply one assumption, then record what changed in the plan. */
  const applyChange = useCallback((what: Changeable, to: string) => {
    setS((prev) => {
      const from = String(prev.profile[what]);
      const profile = { ...prev.profile, [what]: to } as Profile;
      const before = computePlan(pack, prev.profile, today);
      const after = computePlan(pack, profile, today);
      return {
        ...prev,
        profile,
        readinessRoute: null,
        changeLog: [...prev.changeLog, { what, from, to }],
        lastChange: diffPlans(before, after, prev.doneActions)
      };
    });
  }, [pack, today]);

  const api: AppApi = useMemo(() => ({
    s, pack, plan, go, back, update, setProfile, applyChange,
    // A career pack may replace a shared string with its own wording (e.g. "audition" for a musician).
    t: (key, vars) => (pack.wording?.[key] ? fill(pick(pack.wording[key]!, s.lang), vars) : translate(s.lang, key, vars))
  }), [s, pack, plan, go, back, update, setProfile, applyChange]);

  // Existing moods, no redesign: the starry sky for opening screens and Child mode; calm and light
  // for information-dense journey screens when a parent is present.
  const inJourney = stepIndex(s.screen) >= 0 || s.screen === "route" || s.screen === "handoff" || s.screen === "savings";
  const role = !inJourney ? "home" : s.mode === "child" ? "child" : "parent";
  useEffect(() => {
    document.documentElement.lang = s.lang;
    document.body.dataset.role = role;
  }, [s.lang, role]);

  // On every new screen, move focus to its title so screen readers announce where the user is.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) { firstRender.current = false; return; }
    requestAnimationFrame(() => {
      const h = document.querySelector<HTMLElement>("main h1");
      if (h) { h.tabIndex = -1; h.focus({ preventScroll: true }); }
    });
  }, [s.screen, s.routeId]);

  // Keep the (fictional) journey resumable on this device.
  useEffect(() => { if (stepIndex(s.screen) >= 0) saveJourney(s); }, [s]);

  const setLang = (lang: Lang) => { save("cgps.lang", lang); update({ lang }); };
  const View = VIEWS[s.screen];
  const languages = STATE_PACKS[s.profile.state].languages;

  return (
    <AppContext.Provider value={api}>
      <div className="sky" aria-hidden="true" />
      <header className="topbar">
        <button className="brand" type="button" aria-label="Career GPS" onClick={() => update({ screen: "start", history: [] })}>
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
            {MARKETS[0].icon} {pick(MARKETS[0].name, s.lang)} ▾
          </button>
          <div className="lang" role="group" aria-label={api.t("languageGroup")}>
            {languages.map((l) => (
              <button key={l} type="button" data-lang={l} aria-pressed={s.lang === l} onClick={() => setLang(l)}>
                {l === "en" ? "English" : "मराठी"}
              </button>
            ))}
          </div>
        </div>
      </header>
      <div className="demo-banner">{api.t("demoBanner")}</div>
      {s.lang !== "en" && <p className="demo-banner tr-note" data-draft-note>{api.t("translationNote")}</p>}
      {/* While the change sheet is open, the screen underneath is hidden so it offers no competing actions. */}
      <main id="app" aria-live="polite" hidden={s.changeOpen}>
        <View key={s.screen + ":" + (s.routeId ?? "")} />
      </main>
      {s.changeOpen && <ChangeSheet />}
    </AppContext.Provider>
  );
}
