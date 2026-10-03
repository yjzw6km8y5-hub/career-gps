import { AskInline, Evidence, Fig, Label, LevelBadge, Listen, NavBar, NextButton, Screen, StepHeader, useFigure, useLevelOf } from "../components";
import { SAVINGS_GROUPS } from "../data/savings";
import type { Budget, Income, Place } from "../data/schema";
import { pick } from "../i18n";
import { matchSchemes, schemesForGap, schoolYearsLeft, type RoutePlan } from "../lib/plan";
import { useApp } from "../state";
import { useStateText } from "../text";

function useFocus(): RoutePlan {
  const { plan, s } = useApp();
  const id = s.readinessRoute ?? plan.focus;
  return plan.routes.find((r) => r.route.id === id) ?? plan.routes.find((r) => r.route.id === plan.focus)!;
}

function ForRoute() {
  const { s, t, plan } = useApp();
  const rp = plan.routes.find((r) => r.route.id === plan.focus)!;
  return <p className="for-route">{rp.route.icon} {t("forRoute", { route: pick(rp.route.name, s.lang) })} · <span className={`route-status status-${rp.status}`}>{t(`status_${rp.status}`)}</span></p>;
}

export function Readiness() {
  const { s, t, plan, go, update } = useApp();
  const levelOf = useLevelOf();
  const focus = useFocus();
  return (
    <Screen name="readiness">
      <StepHeader step="readiness" />
      <h1 className="screen-title">{t("readinessTitle")}</h1>
      <p className="q-sub">{t("readinessHint")}</p>
      <div className="route-switch" role="radiogroup" aria-label={t("showRoute")}>
        {plan.routes.map((rp) => (
          <button key={rp.route.id} type="button" role="radio" aria-checked={rp.route.id === focus.route.id} className="mode-btn"
            onClick={() => update({ readinessRoute: rp.route.id })}>
            {rp.route.icon} {pick(rp.route.name, s.lang)}
          </button>
        ))}
      </div>
      <ul className="dims" data-route={focus.route.id}>
        {focus.readiness.map((d) => (
          <li key={d.dim} className={`dim dim-${d.level}`} data-dim={d.dim}>
            <div className="dim-head"><span className="dim-name">{t(`dim_${d.dim}`)}</span><LevelBadge level={d.level} /></div>
            <p className="dim-reason">{t(d.reason, d.vars)}</p>
            <p className="dim-action"><strong>{t("whatHelps")}</strong> {t(d.action, d.vars)}</p>
          </li>
        ))}
      </ul>
      <Evidence ids={focus.route.evidence} />
      <p className="screen-foot"><Label kind={levelOf(focus.route.evidence)} /></p>
      <NextButton onClick={() => { update({ readinessRoute: null }); go("costs"); }} />
    </Screen>
  );
}

const BUDGETS: Budget[] = ["tight", "some", "flexible"];
const PLACES: Exclude<Place, "unknown">[] = ["local", "away"];

export function Costs() {
  const { s, t, pack, plan, go, update, setProfile } = useApp();
  const levelOf = useLevelOf();
  const rp = plan.routes.find((r) => r.route.id === plan.focus)!;
  const sc = rp.scenario;
  const skip = (id: string) => update({ skipped: [...s.skipped, id] });
  const askBudget = s.profile.budget === "unknown" && !s.skipped.includes("budget");
  const askPlace = !askBudget && rp.route.placeSensitive && s.profile.place === "unknown" && !s.skipped.includes("place");
  const others = rp.route.scenarios.filter((id) => id !== sc.id).map((id) => pack.scenarios.find((x) => x.id === id)!);
  return (
    <Screen name="costs">
      <StepHeader step="costs" />
      <h1 className="screen-title">{t("costsTitle")}</h1>
      <ForRoute />
      {askBudget ? (
        <AskInline id="budget" question={t("budgetQ")} why={t("whyBudget")}
          options={BUDGETS.map((b) => ({ v: b, label: t(`budget_${b}`), icon: b === "tight" ? "🪙" : b === "some" ? "💵" : "💰" }))}
          onAnswer={(v) => setProfile({ budget: v })} onSkip={() => skip("budget")} />
      ) : askPlace ? (
        <AskInline id="place" question={t("placeQ")} why={t("whyPlace")}
          options={PLACES.map((p) => ({ v: p, label: t(`place_${p}`), icon: p === "local" ? "🏠" : "🚌" }))}
          onAnswer={(v) => setProfile({ place: v })} onSkip={() => skip("place")} />
      ) : (
        <>
          <p className="q-sub">{t("costsHint")}</p>
          <div className="big-number" data-scenario={sc.id}>
            <p className="bn-lead">{pick(sc.name, s.lang)}</p>
            <p className="bn-value" data-big-number><span className="nw">₹<Fig id={sc.low} />–</span><span className="nw">₹<Fig id={sc.high} /></span></p>
            <p className="bn-note">{t("notAdvice")}</p>
            <details className="bn-details">
              <summary>{t("whatsInIt")}</summary>
              <dl className="why-panel">
                {sc.lines.map((l) => <div key={l.figure}><dt>{pick(l.label, s.lang)}</dt><dd><Fig id={l.figure} /></dd></div>)}
              </dl>
            </details>
          </div>
          {others.length > 0 && (
            <>
              <h2 className="sub-title">{t("otherScenarios")}</h2>
              <ul className="plain-list">{others.map((o) => <li key={o.id}>{pick(o.name, s.lang)}: ₹<Fig id={o.low} />–₹<Fig id={o.high} /></li>)}</ul>
            </>
          )}
          <Evidence ids={sc.evidence} />
          <p className="screen-foot"><Label kind={levelOf(sc.evidence)} /></p>
          <NextButton onClick={() => go("support")} />
        </>
      )}
    </Screen>
  );
}

const INCOMES: Exclude<Income, "unknown">[] = ["low", "mid", "high"];

export function Support() {
  const { s, t, pack, plan, go, update, setProfile } = useApp();
  const st = useStateText();
  const rp = plan.routes.find((r) => r.route.id === plan.focus)!;
  const schemes = matchSchemes(pack, rp.route, s.profile);
  const needsIncome = schemes.some((x) => x.status === "needsIncome");
  const asking = s.skipped.includes("incomeOpen") && !s.skipped.includes("income") && s.profile.income === "unknown";
  return (
    <Screen name="support">
      <StepHeader step="support" />
      <h1 className="screen-title">{t("supportTitle")}</h1>
      <ForRoute />
      <p className="q-sub">{t("supportHint")}</p>
      {asking ? (
        <AskInline id="income" question={t("incomeQ")} why={t("whyIncome")}
          options={INCOMES.map((i) => ({ v: i, label: <Fig id={`income.${i}`} />, icon: i === "low" ? "🪙" : i === "mid" ? "💵" : "💰" }))}
          onAnswer={(v) => setProfile({ income: v })} onSkip={() => update({ skipped: [...s.skipped, "income"] })} />
      ) : (
        <>
          <ul className="scheme-list">
            {schemes.map(({ scheme, status }) => (
              <li key={scheme.id} className="scheme" data-scheme={scheme.id} data-scheme-status={status}>
                <p className="scheme-name">{st(scheme.name)}</p>
                <p className="scheme-what">{st(scheme.what)}</p>
                <p className={`scheme-status st-${status}`}>{t(`scheme_${status}`)}</p>
                <p className="scheme-meta">{t("amount")}: <Fig id={scheme.amount} /> · {t("officialPortal", { name: st(scheme.portal.name) })} <span className="ph-text">{/^https:\/\//.test(scheme.portal.url) ? scheme.portal.url : t("linkToVerify")}</span></p>
                <Evidence ids={scheme.evidence} />
              </li>
            ))}
          </ul>
          {needsIncome && s.profile.income === "unknown" && !s.skipped.includes("income") && (
            <button type="button" className="secondary-btn" data-action="ask-income" onClick={() => update({ skipped: [...s.skipped, "incomeOpen"] })}>{t("incomeAsk")}</button>
          )}
          <NextButton onClick={() => go("gap")} />
        </>
      )}
    </Screen>
  );
}

export function Gap() {
  const { s, t, pack, plan, go } = useApp();
  const st = useStateText();
  const rp = plan.routes.find((r) => r.route.id === plan.focus)!;
  const schemes = schemesForGap(pack, rp.route, s.profile);
  return (
    <Screen name="gap">
      <StepHeader step="gap" />
      <h1 className="screen-title">{t("gapTitle")}</h1>
      <ForRoute />
      <p className="q-sub">{t("gapHint")}</p>
      <div className="sum">
        <div className="sum-row"><span>{t("gapCost")} · {pick(rp.scenario.name, s.lang)}</span><span>₹<Fig id={rp.scenario.low} />–₹<Fig id={rp.scenario.high} /></span></div>
        {schemes.map(({ scheme }) => <div key={scheme.id} className="sum-row minus"><span>− {st(scheme.name)}</span><span><Fig id={scheme.amount} /></span></div>)}
        <div className="sum-row total" data-big-number><span>{t("gapResult")}</span><span>₹<Fig id="gap.low" />–₹<Fig id="gap.high" /></span></div>
      </div>
      <Evidence ids={["ev.common.estimate"]} />
      <NextButton onClick={() => go("monthly")} />
    </Screen>
  );
}

/** "Where to keep the money": opened from the monthly estimate. Explains, never ranks or picks. */
export function Savings() {
  const { s, t } = useApp();
  const figure = useFigure();
  return (
    <Screen name="savings">
      <NavBar title={t("savingsTitle")} extra={<Listen />} />
      <h1 className="screen-title">{t("savingsTitle")}</h1>
      <p className="q-sub">{t("savingsHint")}</p>
      <ul className="savings-list">
        {SAVINGS_GROUPS.map((g) => (
          <li key={g.id} className="savings-group" data-group={g.id}>
            <p className="savings-name"><span aria-hidden="true">{g.icon}</span> {pick(g.name, s.lang)}</p>
            <p className="savings-summary">{pick(g.summary, s.lang)}</p>
            <details className="tl-details">
              <summary>{t("seeProducts")}</summary>
              {g.products.map((p) => (
                <div key={p.id} className="product" data-product={p.id}>
                  <p className="product-name">{pick(p.name, s.lang)}</p>
                  <p>{pick(p.what, s.lang)}</p>
                  <p><strong>{t("howReturns")}:</strong> {pick(p.returns, s.lang)}</p>
                  <dl className="product-facts">
                    {[p.rate, p.minimum, p.lockIn].map((id) => (
                      <div key={id}><dt>{pick(figure(id)!.label, s.lang)}</dt><dd><Fig id={id} /></dd></div>
                    ))}
                  </dl>
                  <p className="mini-title">{t("thingsToKnow")}</p>
                  <ul className="risk-list">{p.risks.map((r, i) => <li key={i}><span aria-hidden="true">⚠</span> {pick(r, s.lang)}</li>)}</ul>
                  <Evidence ids={p.evidence} />
                </div>
              ))}
            </details>
          </li>
        ))}
      </ul>
      <p className="notice">{t("saveNotice")}</p>
      <details className="adviser">
        <summary>{t("adviserBtn")}</summary>
        <p>{t("adviserBody")}</p>
      </details>
      <p className="screen-foot"><Label kind="example" /></p>
    </Screen>
  );
}

export function Monthly() {
  const { s, t, go } = useApp();
  const years = schoolYearsLeft(s.profile);
  return (
    <Screen name="monthly">
      <StepHeader step="monthly" />
      <h1 className="screen-title">{t("monthlyTitle")}</h1>
      <ForRoute />
      <div className="big-number">
        <p className="bn-lead">{t("about")}</p>
        <p className="bn-value" data-big-number><span className="nw">₹<Fig id="monthly.low" />–</span><span className="nw">₹<Fig id="monthly.high" /></span></p>
        <p className="bn-unit">{t("aMonth")}</p>
        <p className="bn-note">{years > 0 ? t("yearsToSave", { n: years }) : t("yearsToSaveNone")}</p>
        <p className="bn-note">{t("notAdvice")}</p>
      </div>
      <details className="adviser">
        <summary>{t("adviserBtn")}</summary>
        <p>{t("adviserBody")}</p>
      </details>
      <button type="button" className="secondary-btn" data-action="savings" onClick={() => go("savings")}>{t("whereKeep")}</button>
      <Evidence ids={["ev.common.estimate"]} />
      <NextButton onClick={() => go("actions")} />
    </Screen>
  );
}
