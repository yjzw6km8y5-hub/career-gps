import { Fig, Label, LevelBadge, NextButton, Screen, StepHeader, useDate } from "../components";
import { FAMILY } from "../data/common";
import type { Budget, Entrance, InterestLean, Marks, Place, Practice } from "../data/schema";
import { pick, type StringKey } from "../i18n";
import { addDays, currentPhase, isoDate, matchSchemes, usesMarks, usesPractice } from "../lib/plan";
import { saveJourney, clearSaved } from "../save";
import { useApp, type Changeable, type ReviewChoice } from "../state";
import { useStateText } from "../text";
import { useState } from "react";

function ActionCards() {
  const { s, t, plan, update } = useApp();
  const date = useDate();
  return (
    <ul className="action-list">
      {plan.actions.map(({ template: a, dueDate }) => {
        const done = s.doneActions.includes(a.id);
        return (
          <li key={a.id} className={"action-card owner-" + a.owner + (done ? " is-done" : "")} data-action-id={a.id} data-owner={a.owner}>
            <p className="action-owner">{a.owner === "child" ? "🧒" : a.owner === "parent" ? "🧑" : "🏫"} {t(`owner_${a.owner}`)}</p>
            <p className="action-text">{pick(a.text, s.lang)}</p>
            <p className="action-why"><strong>{t("whyLabel")}</strong> {pick(a.reason, s.lang)}</p>
            <p className="action-due">{dueDate ? t("dueBy", { date: date(dueDate) }) : "review" in a.due ? pick(a.due.review, s.lang) : ""}</p>
            <button type="button" data-select className="done-btn" aria-pressed={done}
              onClick={() => update({ doneActions: done ? s.doneActions.filter((x) => x !== a.id) : [...s.doneActions, a.id] })}>
              {done ? t("doneLabel") : t("markDone")}
            </button>
          </li>
        );
      })}
    </ul>
  );
}

export function Actions() {
  const { t, go } = useApp();
  return (
    <Screen name="actions">
      <StepHeader step="actions" />
      <h1 className="screen-title">{t("actionsTitle")}</h1>
      <ActionCards />
      <p className="screen-foot"><Label kind="example" /></p>
      <NextButton onClick={() => go("review")} />
    </Screen>
  );
}

const REVIEWS: ReviewChoice[] = ["month", "term", "results"];

export function reviewText(choice: ReviewChoice | null, t: (k: StringKey, v?: Record<string, string | number>) => string, date: (iso: string) => string): string {
  if (!choice) return t("noneYet");
  return choice === "month" ? `${t("review_month")} (${date(isoDate(addDays(new Date(), 30)))})` : t(`review_${choice}`);
}

export function Review() {
  const { s, t, go, update } = useApp();
  return (
    <Screen name="review">
      <StepHeader step="review" />
      <h1 className="screen-title">{t("reviewTitle")}</h1>
      <p className="q-sub">{t("reviewHint")}</p>
      <div className="q-grid">
        {REVIEWS.map((r) => (
          <button key={r} type="button" data-primary data-answer={r} className="q-card" aria-pressed={s.review === r} onClick={() => { update({ review: r }); go("passport"); }}>
            <span className="q-icon" aria-hidden="true">{r === "month" ? "🗓️" : r === "term" ? "🏫" : "📄"}</span>
            <span className="q-name">{t(`review_${r}`)}</span>
          </button>
        ))}
      </div>
    </Screen>
  );
}

export function Passport() {
  const { s, t, pack, plan, update } = useApp();
  const st = useStateText();
  const [saved, setSaved] = useState(false);
  const date = useDate();
  const c = pack.career;
  const rp = plan.routes.find((r) => r.route.id === plan.focus)!;
  const reasons = c.attractions.filter((a) => s.attractions.includes(a.id)).map((a) => pick(a.text, s.lang));
  const schemes = matchSchemes(pack, rp.route, s.profile);
  const keptStages = plan.done.map((id) => pack.stages.find((x) => x.id === id)!).filter(Boolean);
  return (
    <Screen name="passport">
      <StepHeader step="passport" />
      <h1 className="screen-title">📘 {t("passportTitle", { name: pick(FAMILY.child.name, s.lang) })}</h1>
      <dl className="passport">
        <dt>{t("pDream")}</dt><dd>{c.icon} {pick(c.name, s.lang)}{reasons.length > 0 && <> · {t("pBecause")}: {reasons.join(", ")}</>}</dd>
        <dt>{t("pRoute")}</dt><dd>{rp.route.icon} {pick(rp.route.name, s.lang)}</dd>
        <dt>{t("pWhere")}</dt><dd>{t("classN", { n: s.profile.classLevel })} · {t(`phase_${currentPhase(s.profile)}`)}</dd>
        <dt>{t("pReadiness")}</dt>
        <dd><ul className="mini-dims">{rp.readiness.map((d) => <li key={d.dim}>{t(`dim_${d.dim}`)}: <LevelBadge level={d.level} /></li>)}</ul></dd>
        <dt>{t("pCost")}</dt><dd>{pick(rp.scenario.name, s.lang)}</dd>
        <dt>{t("pSupport")}</dt><dd>{schemes.length ? schemes.map((x) => st(x.scheme.name)).join(", ") : t("noneYet")}</dd>
        <dt>{t("pActions")}</dt>
        <dd><ul className="mini-actions">{plan.actions.map(({ template: a, dueDate }) => (
          <li key={a.id} data-passport-action={a.owner}>{s.doneActions.includes(a.id) ? "✅" : "⬜"} {t(`owner_${a.owner}`)}: {pick(a.text, s.lang)}{dueDate && ` (${t("dueBy", { date: date(dueDate) })})`}</li>
        ))}</ul></dd>
        <dt>{t("pReview")}</dt><dd data-review>{reviewText(s.review, t, date)}</dd>
        <dt>{t("pKept")}</dt><dd>{keptStages.length ? keptStages.map((x) => `${x.icon} ${st(x.name)}`).join(" · ") : t("noneYet")}</dd>
        <dt>{t("pChanges")}</dt><dd>{s.changeLog.length ? s.changeLog.map((c2, i) => <span key={i} className="change-chip">{changeLine(c2.what, c2.from, c2.to, t)}</span>) : t("noneYet")}</dd>
      </dl>
      <div className="passport-actions">
        <button type="button" data-primary className="next-btn" onClick={() => window.print()}>{t("printBtn")}</button>
        <button type="button" data-primary className="next-btn alt" onClick={() => { saveJourney(s); setSaved(true); }}>{t("saveBtn")}</button>
      </div>
      {saved && <p className="notice" role="status">{t("savedNote")}</p>}
      <p className="screen-foot"><Label kind="example" /></p>
      <button type="button" className="secondary-btn" onClick={() => { clearSaved(); update({ screen: "start", history: [], careerId: null, changeLog: [], doneActions: [], attractions: [], review: null, skipped: [] }); }}>{t("startOver")}</button>
    </Screen>
  );
}

// ---------- Change something ----------
const CHANGES: { what: Changeable; options: string[] }[] = [
  { what: "budget", options: ["tight", "some", "flexible"] satisfies Budget[] },
  { what: "marks", options: ["strong", "medium", "needsWork"] satisfies Marks[] },
  { what: "practice", options: ["daily", "sometimes", "rarely"] satisfies Practice[] },
  { what: "place", options: ["local", "away"] satisfies Place[] },
  { what: "entrance", options: ["notYet", "qualified", "notQualified"] satisfies Entrance[] },
  { what: "interest", options: ["core", "technology", "care"] satisfies InterestLean[] }
];

export function optionLabel(what: Changeable, v: string, t: (k: StringKey) => string): string {
  return t(`${what}_${v}` as StringKey);
}

function changeLine(what: Changeable, from: string, to: string, t: (k: StringKey, v?: Record<string, string | number>) => string) {
  return t("changedLine", { what: t(`change_${what}`), from: optionLabel(what, from, t), to: optionLabel(what, to, t) });
}

export function ChangeSheet() {
  const { s, t, pack, plan, update, applyChange } = useApp();
  const st = useStateText();
  const ch = s.lastChange;
  const last = s.changeLog[s.changeLog.length - 1];
  const routeName = (id: string) => pick(pack.routes.find((r) => r.id === id)!.name, s.lang);
  const scenarioName = (id: string) => pick(pack.scenarios.find((x) => x.id === id)!.name, s.lang);
  const close = () => update({ changeOpen: false, lastChange: null });
  const focus = plan.routes.find((r) => r.route.id === plan.focus)!;
  return (
    <div className="sheet-backdrop" role="dialog" aria-modal="true" aria-labelledby="change-title" data-sheet="change">
      <div className="sheet">
        <div className="sheet-head">
          <h2 id="change-title" className="sheet-title">{t("changeTitle")}</h2>
          <button type="button" className="nav-back" onClick={close}>{t("closeSheet")}</button>
        </div>
        {ch && last ? (
          <div className="changed" data-changed>
            <h3 className="sub-title">{t("whatChanged")}</h3>
            <p className="changed-what">🔄 {changeLine(last.what, last.from, last.to, t)}</p>
            {ch.focus && <p className="changed-focus">➡️ {t("focusMoved", { route: routeName(ch.focus[1]) })}</p>}
            <h4 className="mini-title">{t("routesAffected")}</h4>
            {ch.routes.length ? (
              <ul className="plain-list" data-affected>
                {ch.routes.map((rc) => (
                  <li key={rc.id} data-affected-route={rc.id}>
                    <strong>{routeName(rc.id)}</strong>
                    {rc.status && <> · {t(`status_${rc.status[0]}`)} → {t(`status_${rc.status[1]}`)}</>}
                    {rc.scenario && <> · {scenarioName(rc.scenario[0])} → {scenarioName(rc.scenario[1])}</>}
                    {rc.dims.map((d) => (
                      <span key={d.dim} className="dim-change"> · {t(`dim_${d.dim}`)}: {d.from === d.to ? t(d.reason) : `${t(`level_${d.from}`)} → ${t(`level_${d.to}`)}`}</span>
                    ))}
                  </li>
                ))}
              </ul>
            ) : <p>{t("noRouteChange")}</p>}
            <p data-cost-now>{t("costNow", { scenario: pick(focus.scenario.name, s.lang) })} <span className="nw">(₹<Fig id={focus.scenario.low} />–₹<Fig id={focus.scenario.high} />)</span></p>
            {ch.actions.length > 0 && (
              <>
                <h4 className="mini-title">{t("actionsUpdated")}</h4>
                <ul className="plain-list" data-actions-updated>
                  {ch.actions.map((a) => <li key={a.owner}>{t(`owner_${a.owner}`)}: {pick(pack.actions.find((x) => x.id === a.to)!.text, s.lang)}</li>)}
                </ul>
              </>
            )}
            <div className="kept" data-kept>
              <h4 className="mini-title">✅ {t("keptList")}</h4>
              {ch.kept.length ? (
                <ul className="plain-list">
                  {ch.kept.map((id) => {
                    const stage = pack.stages.find((x) => x.id === id);
                    const action = pack.actions.find((x) => x.id === id);
                    return <li key={id} data-kept-item={id}>{stage ? `${stage.icon} ${st(stage.name)}` : action ? pick(action.text, s.lang) : id}</li>;
                  })}
                </ul>
              ) : <p>{t("keptNone")}</p>}
            </div>
            <button type="button" data-primary className="next-btn" onClick={close}>{t("seePlan")}</button>
          </div>
        ) : (
          <>
            <p className="q-sub">{t("changeHint")}</p>
            {CHANGES.filter((c) => (c.what !== "marks" || usesMarks(pack)) && (c.what !== "practice" || usesPractice(pack))).map((c) => (
              <fieldset key={c.what} className="change-group" data-change={c.what}>
                <legend>{t(`change_${c.what}`)}</legend>
                <div className="chips">
                  {c.options.map((o) => {
                    const current = (s.profile as unknown as Record<string, string>)[c.what] === o;
                    return (
                      <button key={o} type="button" data-select className="chip" aria-pressed={current} disabled={current} data-option={o}
                        onClick={() => applyChange(c.what, o)}>
                        {optionLabel(c.what, o, t)}
                      </button>
                    );
                  })}
                </div>
              </fieldset>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
