import { Foot, NavBar, Screen } from "../components";
import { CAREERS, FAMILY, INTEREST_ROUNDS, ROUTES } from "../data/content";
import { pick, STRINGS } from "../i18n";
import { nextStepIndex } from "../lib/rules";
import { useApp } from "../state";

export function ChildClass() {
  const { s, t, go, update } = useApp();
  const name = pick(FAMILY.child.firstName, s.lang);
  const set = (n: number) => update({ childClass: Math.min(12, Math.max(1, n)) });
  return (
    <Screen name="child-class">
      <NavBar />
      <p className="kid-hi">{t("hi", { name })}</p>
      <h1 className="screen-title">{t("whichClass")}</h1>
      <div className="stepper">
        <button type="button" data-choice className="step-btn" aria-label={t("lessClass")} onClick={() => set(s.childClass - 1)} disabled={s.childClass <= 1}>−</button>
        <p className="step-value" aria-live="polite">{t("classN", { n: s.childClass })}</p>
        <button type="button" data-choice className="step-btn" aria-label={t("moreClass")} onClick={() => set(s.childClass + 1)} disabled={s.childClass >= 12}>+</button>
      </div>
      <button type="button" data-choice className="next-btn" onClick={() => { update({ interestRound: 0 }); go("child-interests"); }}>{t("next")} ▶</button>
      <Foot kind="example">{t("childAboutFoot")}</Foot>
    </Screen>
  );
}

export function ChildInterests() {
  const { s, t, go, update } = useApp();
  const round = INTEREST_ROUNDS[s.interestRound] ?? INTEREST_ROUNDS[0];
  const toggle = (id: string) =>
    update({ interests: s.interests.includes(id) ? s.interests.filter((x) => x !== id) : [...s.interests, id] });
  const next = () => {
    if (s.interestRound < INTEREST_ROUNDS.length - 1) update({ interestRound: s.interestRound + 1 });
    else go("child-dreams");
  };
  return (
    <Screen name="child-interests">
      <NavBar />
      <div className="q-progress" aria-label={t("questionOf", { n: s.interestRound + 1, total: INTEREST_ROUNDS.length })}>
        {INTEREST_ROUNDS.map((_, i) => <span key={i} className={i <= s.interestRound ? "on" : ""} />)}
      </div>
      <h1 className="screen-title">{t("whatYouLove")}</h1>
      <p className="q-sub">{t("whatYouLoveSub")}</p>
      <div className="dream-grid">
        {round.map((it) => (
          <button key={it.id} type="button" data-choice className="dream-card interest-card" aria-pressed={s.interests.includes(it.id)} onClick={() => toggle(it.id)}>
            <span className="dream-icon" aria-hidden="true">{it.icon}</span>
            <span className="dream-name">{pick(it.name, s.lang)}</span>
            <span className="tick" aria-hidden="true">{s.interests.includes(it.id) ? "✓" : ""}</span>
          </button>
        ))}
      </div>
      <div className="q-actions">
        <span />
        <button type="button" className="next-btn next-inline" onClick={next}>{t("next")} ▶</button>
      </div>
      <Foot kind="example">{t("childAboutFoot")}</Foot>
    </Screen>
  );
}

export function ChildDreams() {
  const { s, t, go } = useApp();
  const liked = INTEREST_ROUNDS.flat().filter((i) => s.interests.includes(i.id));
  return (
    <Screen name="child-dreams">
      <NavBar />
      <div className="kid-hello">
        <span className="kid-avatar" aria-hidden="true">🙂</span>
        <div>
          <p className="kid-hi">{t("hi", { name: pick(FAMILY.child.firstName, s.lang) })}</p>
          <h1 className="screen-title">{t("dreamQ")}</h1>
        </div>
      </div>
      {liked.length > 0 && (
        <p className="liked">{t("youLike", { list: liked.map((i) => i.icon + " " + pick(i.name, s.lang)).join(" · ") })}</p>
      )}
      <div className="dream-grid">
        {CAREERS.map((c) => (
          <button key={c.id} type="button" data-choice className={"dream-card" + (c.ready ? "" : " is-locked")} onClick={() => go(c.ready ? "child-road" : "child-soon")}>
            <span className="dream-icon" aria-hidden="true">{c.icon}</span>
            <span className="dream-name">{pick(c.name, s.lang)}</span>
            <span className="dream-cta">{c.ready ? t("letsGo") : t("comingSoon")}</span>
          </button>
        ))}
      </div>
      <Foot kind="example">{t("moreCareers")}</Foot>
    </Screen>
  );
}

export function ChildSoon() {
  const { t } = useApp();
  return (
    <Screen name="child-soon">
      <NavBar />
      <div className="soon">
        <span className="soon-icon" aria-hidden="true">🔒</span>
        <h1 className="screen-title">{t("soonTitle")}</h1>
        <p>{t("soonBody")}</p>
      </div>
      <Foot kind="planned" />
    </Screen>
  );
}

export function ChildRoad() {
  const { s, t, update } = useApp();
  const r = ROUTES.cardiologist;
  const here = nextStepIndex(s.childClass);
  const career = pick(CAREERS[0].name, s.lang);
  const [before, after] = pick(STRINGS.roadTitle, s.lang).split("{career}"); // highlight the career name
  return (
    <Screen name="child-road">
      <NavBar />
      <h1 className="screen-title">{before}<span className="hl">{career}</span>{after}</h1>
      <ol className="road">
        {r.steps.map((st, i) => (
          <li key={st.id} className={`stone stone-${i < here ? "done" : i === here ? "next" : "later"}`} style={{ ["--i" as string]: i }}>
            <span className="stone-icon" aria-hidden="true">{st.icon}</span>
            <span className="stone-text">{pick(st.child, s.lang)}</span>
            {i === here && <span className="you">{t("nextStop")}</span>}
          </li>
        ))}
      </ol>
      <div className={"quest" + (s.questDone ? " is-done" : "")}>
        <span className="quest-badge" aria-hidden="true">⭐</span>
        <div>
          <p className="quest-kicker">{t("quest1")}</p>
          <p className="quest-text">{t("quest1Text")}</p>
        </div>
        <button type="button" data-choice className="quest-done" disabled={s.questDone} onClick={() => update({ questDone: true })}>
          {s.questDone ? t("starEarned") : t("questDone")}
        </button>
      </div>
      <Foot kind="example">{t("roadFoot")}</Foot>
    </Screen>
  );
}
