import { useState } from "react";
import { Fig, Foot, NavBar, Screen, SourceNote } from "../components";
import { FIGURES } from "../data/figures";
import { CAREERS, FAMILY, ROUTES, SAVE_GROUPS, STATE_PACKS } from "../data/content";
import { PARENT_QUESTIONS as Q } from "../data/questions";
import type { LifeStage, Option } from "../data/types";
import { pick, type StringKey } from "../i18n";
import { applies, fillState, nextQuestionId, nextStepIndex, optionsOf, pruneAnswers } from "../lib/rules";
import { useApp } from "../state";

const pack = STATE_PACKS[FAMILY.state];

function useOptionText() {
  const { s, t } = useApp();
  return (o: Option) => {
    if (o.fig) return <Fig id={o.fig} />;
    const partner = s.answers.who === "mother" ? t("partnerMother") : s.answers.who === "father" ? t("partnerFather") : t("partnerOther");
    return fillState(pick(o.t!, s.lang).replace("{partner}", partner), pack, s.lang);
  };
}

export function ParentAbout() {
  const { s, t, go, update } = useApp();
  const optionText = useOptionText();
  const currentId = s.qStack[s.qStack.length - 1] ?? Q[0].id;
  const q = Q.find((x) => x.id === currentId) ?? Q[0];
  const shown = Q.filter((x) => applies(x, s.answers));
  const pos = shown.indexOf(q);

  const advance = (answers: Record<string, string>) => {
    const next = nextQuestionId(q.id, answers, Q);
    const stack = s.qStack.length ? s.qStack : [q.id];
    if (next) update({ answers, qStack: [...stack, next] });
    else { update({ answers, qStack: stack }); go("parent-plan"); } // stack kept: Back returns to the last question
  };
  const answer = (v: string) => advance(pruneAnswers({ ...s.answers, [q.id]: v }, Q));
  const skip = () => { const a = { ...s.answers }; delete a[q.id]; advance(pruneAnswers(a, Q)); };

  return (
    <Screen name="parent-about">
      <NavBar title={t("aboutYou")} />
      <div className="q-progress" aria-label={t("questionOf", { n: pos + 1, total: shown.length })}>
        {shown.map((_, i) => <span key={i} className={i <= pos ? "on" : ""} />)}
      </div>
      <h1 className="q-title" data-question={q.id}>{pick(q.q, s.lang)}</h1>
      {q.sub && <p className="q-sub">{pick(q.sub, s.lang)}</p>}
      <div className="q-grid">
        {optionsOf(q, Q).map((o) => (
          <button key={o.v} type="button" data-choice data-answer={o.v} className="q-card" aria-pressed={s.answers[q.id] === o.v} onClick={() => answer(o.v)}>
            <span className="q-icon" aria-hidden="true">{o.icon}</span>
            <span className="q-name">{optionText(o)}</span>
            {o.hint && <span className="q-hint">{pick(o.hint, s.lang)}</span>}
          </button>
        ))}
      </div>
      <div className="q-actions">
        {q.skip ? <button type="button" className="q-skip" data-action="skip" onClick={skip}>{t(q.skip)} →</button> : <span />}
        <p className="q-private">{t("notSaved")}</p>
      </div>
      <Foot kind="example">{t("aboutFoot")}</Foot>
    </Screen>
  );
}

function AboutSummary() {
  const { s, t } = useApp();
  const optionText = useOptionText();
  const bits = Q.filter((q) => q.id !== "more" && s.answers[q.id]).flatMap((q) => {
    const o = optionsOf(q, Q).find((x) => x.v === s.answers[q.id]);
    return o ? [<span key={q.id}>{o.icon} {o.sum ? pick(o.sum, s.lang) : optionText(o)}</span>] : [];
  });
  if (!bits.length) return null;
  return (
    <details className="about-chip">
      <summary>{t("basedOn")}</summary>
      <p>{bits}</p>
    </details>
  );
}

export function ParentPlan() {
  const { s, t, go, update } = useApp();
  const [showWhy, setShowWhy] = useState(false);
  const hasAnswers = Object.keys(s.answers).length > 0;
  const choice = (screen: "parent-road" | "parent-save" | "parent-adviser", icon: string, key: StringKey) => (
    <button type="button" data-choice className="choice" onClick={() => go(screen)}>
      <span className="choice-icon" aria-hidden="true">{icon}</span><span>{t(key)}</span>
    </button>
  );
  return (
    <Screen name="parent-plan">
      <NavBar extra={hasAnswers && (
        <button type="button" className="nav-extra" onClick={() => { update({ qStack: [] }); go("parent-about"); }}>{t("changeAnswers")}</button>
      )} />
      <p className="kicker">{t("planKicker", { name: pick(FAMILY.child.firstName, s.lang), career: pick(CAREERS[0].name, s.lang), state: pick(pack.name, s.lang) })}</p>
      <AboutSummary />
      <div className="big-number">
        <p className="bn-lead">{t("about")}</p>
        <p className="bn-value" data-big-number>
          <span className="nw">₹<Fig id="monthlySavingLow" />–</span><span className="nw">₹<Fig id="monthlySavingHigh" /></span>
        </p>
        <p className="bn-unit">{t("aMonth")}</p>
        <p className="bn-note">{t("notAdvice")}</p>
        <button type="button" className="why" aria-expanded={showWhy} onClick={() => setShowWhy(!showWhy)}>
          {showWhy ? t("whyHide") : t("whyShow")}
        </button>
        {showWhy && (
          <dl className="why-panel">
            {["totalCost", "scholarshipHelp", "inflation"].map((id) => (
              <div key={id}>
                <dt>{pick(FIGURES[id].label, s.lang)}</dt>
                <dd><Fig id={id} /> <SourceNote id={id} /></dd>
              </div>
            ))}
          </dl>
        )}
      </div>
      <div className="choice-row">
        {choice("parent-road", "🗺️", "seeRoad")}
        {choice("parent-save", "🏦", "whereSave")}
        {choice("parent-adviser", "🧑‍💼", "talkAdviser")}
      </div>
      <Foot kind="example">{t("planFoot")}</Foot>
    </Screen>
  );
}

export function ParentRoad() {
  const { s, t, go } = useApp();
  const r = ROUTES.cardiologist;
  return (
    <Screen name="parent-road">
      <NavBar title={t("roadStepByStep")} extra={
        <button type="button" className="nav-extra" onClick={() => go("parent-life")}>{t("slideYears")}</button>
      } />
      <ol className="timeline">
        {r.steps.map((st) => (
          <li key={st.id} className="tl-step">
            <span className="tl-dot" aria-hidden="true">{st.icon}</span>
            <div className="tl-body">
              <p className="tl-title">{fillState(pick(st.parent, s.lang), pack, s.lang)}</p>
              {st.figures.length > 0 && (
                <details className="tl-details">
                  <summary>{t("costsRules")}</summary>
                  <p className="tl-figs">
                    {st.figures.map((id) => (
                      <span key={id} className="tl-fig">
                        <span className="tl-fig-label">{pick(FIGURES[id].label, s.lang)}:</span> <Fig id={id} /> <SourceNote id={id} />
                      </span>
                    ))}
                  </p>
                </details>
              )}
              {st.mayChange && <p className="tl-warn">{t("rulesChange")}</p>}
            </div>
          </li>
        ))}
      </ol>
      <Foot kind="example">{pick(r.sourceNote, s.lang)}</Foot>
    </Screen>
  );
}

// Age-slider skeleton (FINAL-PLAN-fast). Stages only: no ages or years until durations are sourced.
const STOPS: { id: "now" | LifeStage; key: StringKey }[] = [
  { id: "now", key: "stageNow" },
  { id: "school", key: "stageSchool" },
  { id: "college", key: "stageCollege" },
  { id: "training", key: "stageTraining" },
  { id: "working", key: "stageWorking" },
  { id: "later", key: "stageLater" }
];

export function ParentLife() {
  const { s, t } = useApp();
  const [i, setI] = useState(0);
  const stop = STOPS[i];
  const steps = ROUTES.cardiologist.steps.filter((st) => st.stage === stop.id);
  const nextStep = ROUTES.cardiologist.steps[nextStepIndex(s.childClass)];
  const stageName = (k: StringKey) => t(k, { n: s.childClass });
  return (
    <Screen name="parent-life">
      <NavBar title={t("lifeRoadTitle", { name: pick(FAMILY.child.firstName, s.lang) })} />
      <p className="q-sub">{t("lifeRoadHint")}</p>
      <p className="life-stage" aria-live="polite">{stageName(stop.key)}</p>
      <input
        className="life-slider"
        type="range"
        min={0}
        max={STOPS.length - 1}
        step={1}
        value={i}
        aria-label={t("lifeRoadHint")}
        aria-valuetext={stageName(stop.key)}
        onChange={(e) => setI(Number(e.target.value))}
      />
      <div className="life-ticks" aria-hidden="true">
        {STOPS.map((st, j) => <span key={st.id} className={j === i ? "on" : ""} />)}
      </div>
      <div className="life-card">
        {stop.id === "now" ? (
          <p className="tl-title">{t("nextStep")} {nextStep.icon} {fillState(pick(nextStep.parent, s.lang), pack, s.lang)}</p>
        ) : steps.length ? (
          steps.map((st) => <p key={st.id} className="tl-title">{st.icon} {fillState(pick(st.parent, s.lang), pack, s.lang)}</p>)
        ) : (
          <p className="life-planned">{t("stagePlanned")}</p>
        )}
      </div>
      <Foot kind={stop.id === "working" || stop.id === "later" ? "planned" : "example"}>{t("lifeRoadFoot")}</Foot>
    </Screen>
  );
}

export function ParentSave() {
  const { s, t, go } = useApp();
  return (
    <Screen name="parent-save">
      <NavBar title={t("whereSave")} />
      <p className="lede">{t("saveLede")}</p>
      <div className="save-grid">
        {SAVE_GROUPS.map((g) => (
          <article key={g.id} className="save-card">
            <span className="save-icon" aria-hidden="true">{g.icon}</span>
            <h2 className="save-name">{pick(g.name, s.lang)}</h2>
            <p className="save-ex">{pick(g.examples, s.lang)}</p>
            <p className="save-risk"><span aria-hidden="true">⚠</span> {pick(g.risk, s.lang)}</p>
          </article>
        ))}
      </div>
      <p className="notice">{t("saveNotice")}</p>
      <button type="button" data-choice className="adviser-btn" onClick={() => go("parent-adviser")}>{t("adviserBtn")}</button>
      <Foot kind="example">{t("saveFoot")}</Foot>
    </Screen>
  );
}

export function ParentAdviser() {
  const { t } = useApp();
  return (
    <Screen name="parent-adviser">
      <NavBar title={t("talkAdviser")} />
      <div className="soon">
        <span className="soon-icon" aria-hidden="true">🧑‍💼</span>
        <h1 className="screen-title">{t("adviserTitle")}</h1>
        <p>{t("adviserBody1")}</p>
        <p>{t("adviserBody2")}</p>
      </div>
      <Foot kind="planned">{t("adviserFoot")}</Foot>
    </Screen>
  );
}
