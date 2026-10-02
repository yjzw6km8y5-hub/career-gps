import { AskInline, Evidence, Fig, Label, NavBar, NextButton, Screen, StepHeader, useLevelOf } from "../components";
import { FAMILY } from "../data/common";
import { PHASES, type Marks, type Route, type Stream } from "../data/schema";
import { pick } from "../i18n";
import { currentPhase, matchSchemes } from "../lib/plan";
import { useApp } from "../state";
import { useStateText } from "../text";

export function Dream() {
  const { s, t, pack, go, update } = useApp();
  const c = pack.career;
  const toggle = (id: string) => update({ attractions: s.attractions.includes(id) ? s.attractions.filter((x) => x !== id) : [...s.attractions, id] });
  return (
    <Screen name="dream">
      <StepHeader step="dream" />
      <div className="dream-hero"><span className="dream-big-icon" aria-hidden="true">{c.icon}</span></div>
      <h1 className="screen-title">{t("dreamTitle", { career: pick(c.name, s.lang) })}</h1>
      <p className="q-sub">{s.mode === "parent" ? t("dreamHintParent") : t("dreamHintChild")}</p>
      <div className="select-list">
        {c.attractions.map((a) => (
          <button key={a.id} type="button" data-select className="select-card" aria-pressed={s.attractions.includes(a.id)} onClick={() => toggle(a.id)}>
            <span className="select-icon" aria-hidden="true">{a.icon}</span>
            <span className="select-name">{pick(a.text, s.lang)}</span>
            <span className="tick" aria-hidden="true">{s.attractions.includes(a.id) ? "✓" : ""}</span>
          </button>
        ))}
      </div>
      <NextButton onClick={() => go(s.mode === "together" ? "handoff" : "reality")} />
    </Screen>
  );
}

export function Handoff() {
  const { s, t, pack, plan, go } = useApp();
  const c = pack.career;
  const reasons = c.attractions.filter((a) => s.attractions.includes(a.id)).map((a) => pick(a.text, s.lang));
  const focus = plan.routes.find((r) => r.route.id === plan.focus)!;
  return (
    <Screen name="handoff">
      <NavBar />
      <div className="soon">
        <span className="soon-icon" aria-hidden="true">🤝</span>
        <h1 className="screen-title">{t("handoffTitle")}</h1>
        <p>{t("handoffBody", { name: pick(FAMILY.child.name, s.lang), career: pick(c.name, s.lang), list: reasons.length ? reasons.join(", ") : t("handoffNoReasons") })}</p>
        <ul className="handoff-facts">
          <li>⏳ {t("handoffTime")}: <Fig id={c.timeFigure} /></li>
          <li>💰 {t("handoffCost")}: ₹<Fig id={focus.scenario.low} />–₹<Fig id={focus.scenario.high} /></li>
          <li>🤝 {t("handoffHelp", { n: matchSchemes(pack, focus.route, s.profile).length })}</li>
        </ul>
        <Evidence ids={[...focus.scenario.evidence, pack.figures[c.timeFigure].evidence]} />
        <NextButton onClick={() => go("reality")} label={t("handoffBtn")} />
      </div>
    </Screen>
  );
}

export function Reality() {
  const { s, t, pack, go } = useApp();
  const c = pack.career;
  return (
    <Screen name="reality">
      <StepHeader step="reality" />
      <h1 className="screen-title">{t("realityTitle", { career: pick(c.name, s.lang) })}</h1>
      <p className="lede-strong">{c.icon} {pick(c.what, s.lang)}</p>
      <h2 className="sub-title">{t("dayTitle")}</h2>
      <ol className="day-line">
        {c.day.map((d, i) => <li key={i}><span className="day-icon" aria-hidden="true">{d.icon}</span><span>{pick(d.text, s.lang)}</span></li>)}
      </ol>
      <div className="fact-row">
        <div className="fact"><span className="fact-label">{t("payTitle")}</span><span className="fact-value"><Fig id={c.payFigure} /></span></div>
        <div className="fact"><span className="fact-label">{t("outcomesTitle")}</span><span className="fact-note">{pick(c.outcomesNote, s.lang)}</span></div>
      </div>
      <Evidence ids={c.evidence} />
      <NextButton onClick={() => go("routes")} />
    </Screen>
  );
}

export function RouteCard({ route, onOpen }: { route: Route; onOpen: () => void }) {
  const { s, t, plan } = useApp();
  const levelOf = useLevelOf();
  const rp = plan.routes.find((x) => x.route.id === route.id)!;
  return (
    <button type="button" className={`route-card route-${rp.status}`} data-route={route.id} data-status={rp.status} onClick={onOpen}>
      <span className="route-icon" aria-hidden="true">{route.icon}</span>
      <span className="route-text">
        <span className="route-name">{pick(route.name, s.lang)}</span>
        <span className="route-summary">{pick(route.summary, s.lang)}</span>
        <span className="route-meta">
          <span className={`route-status status-${rp.status}`}>{t(`status_${rp.status}`)}</span>
          <Label kind={levelOf(route.evidence)} />
        </span>
      </span>
    </button>
  );
}

export function Routes() {
  const { t, pack, go, update } = useApp();
  return (
    <Screen name="routes">
      <StepHeader step="routes" />
      <h1 className="screen-title">{t("routesTitle")}</h1>
      <p className="q-sub">{t("routesHint")}</p>
      <div className="route-list">
        {pack.routes.map((r) => <RouteCard key={r.id} route={r} onOpen={() => { update({ routeId: r.id }); go("route"); }} />)}
      </div>
      <NextButton onClick={() => go("where")} />
    </Screen>
  );
}

/** One route as a branching pathway: stages, decision gates, what carries over, related careers. */
export function RouteDetail() {
  const { s, t, pack, plan, update } = useApp();
  const st = useStateText();
  const levelOf = useLevelOf();
  const route = pack.routes.find((r) => r.id === s.routeId) ?? pack.routes[0];
  const name = (id: string) => pick(pack.routes.find((r) => r.id === id)?.name ?? route.name, s.lang);
  const stages = route.stages.map((id) => pack.stages.find((x) => x.id === id)!);
  const rules = pack.rules.filter((x) => route.rules.includes(x.id));
  const adjacent = pack.adjacent.filter((a) => route.adjacent?.includes(a.id));
  return (
    <Screen name="route">
      <NavBar title={pick(route.name, s.lang)} />
      <p className="lede-strong">{route.icon} {pick(route.summary, s.lang)}</p>
      {route.reuses && (
        <div className="reuses">
          <h2 className="sub-title">♻️ {t("reusesTitle")}</h2>
          <p>{pick(route.reuses.note, s.lang)}</p>
          <p className="reuse-stages">{route.reuses.stages.map((id) => { const x = pack.stages.find((y) => y.id === id)!; return `${x.icon} ${st(x.name)}`; }).join(" · ")}</p>
        </div>
      )}
      <ol className="pathway">
        {stages.map((x) => {
          const done = plan.done.includes(x.id);
          const gates = pack.gates.filter((g) => g.afterStage === x.id && route.gates.includes(g.id));
          return (
            <li key={x.id} className={"pw-stage" + (done ? " is-done" : "")} data-stage={x.id}>
              <div className="pw-card">
                <p className="pw-title"><span aria-hidden="true">{x.icon}</span> {st(x.name)} {done && <span className="pw-done">✓ {t("stageDone")}</span>}</p>
                <p className="pw-phase">{t(`phase_${x.phase}`)}</p>
                <p className="pw-detail">{st(x.detail)}</p>
                {x.figures.length > 0 && <p className="pw-figs">{x.figures.map((f) => <span key={f}>{pick(pack.figures[f].label, s.lang)}: <Fig id={f} /></span>)}</p>}
                {x.keepsValue && <p className="pw-keeps">♻️ {t("keepsValue")} {st(x.keepsValue)}</p>}
                <Evidence ids={x.evidence} />
              </div>
              {gates.map((g) => (
                <div key={g.id} className="pw-gate" data-gate={g.id}>
                  <p className="gate-kicker">◆ {t("decisionPoint")}</p>
                  <p className="gate-q">{st(g.question)}</p>
                  <ul className="gate-options">
                    {g.options.map((o) => (
                      <li key={o.id}>
                        {pick(o.label, s.lang)} →{" "}
                        {"route" in o.leadsTo
                          ? <button type="button" className="link-btn" onClick={() => update({ routeId: (o.leadsTo as { route: string }).route })}>{name(o.leadsTo.route)}</button>
                          : t("carriesOn")}
                      </li>
                    ))}
                  </ul>
                  <p className="gate-review">{t("reviewWhen", { when: st(g.review) })}</p>
                </div>
              ))}
            </li>
          );
        })}
      </ol>
      {rules.length > 0 && (
        <>
          <h2 className="sub-title">{t("rulesTitle")}</h2>
          <ul className="plain-list">{rules.map((x) => <li key={x.id}>{st(x.text)} <Evidence ids={x.evidence} /></li>)}</ul>
        </>
      )}
      {adjacent.length > 0 && (
        <>
          <h2 className="sub-title">{t("relatedCareers")}</h2>
          <ul className="adj-list">
            {adjacent.map((a) => (
              <li key={a.id} className={"adj-card" + (a.fits.includes(s.profile.interest) && s.profile.interest !== "core" ? " is-fit" : "")} data-adjacent={a.id}>
                <span className="adj-icon" aria-hidden="true">{a.icon}</span>
                <span><strong>{pick(a.name, s.lang)}</strong><br />{pick(a.why, s.lang)}<br /><span className="ph-text">{pick(a.entry, s.lang)}</span></span>
              </li>
            ))}
          </ul>
        </>
      )}
      <p className="screen-foot"><Label kind={levelOf(route.evidence)} /></p>
    </Screen>
  );
}

const MARKS: Marks[] = ["strong", "medium", "needsWork"];
const STREAMS: Stream[] = ["pcb", "other", "undecided"];

export function Where() {
  const { s, t, pack, go, update, setProfile } = useApp();
  const p = s.profile;
  const routeNeedsSubjects = pack.rules.some((x) => x.needsStream);
  const phase = currentPhase(p);
  const askMarks = p.marks === "unknown" && !s.skipped.includes("marks");
  const askStream = !askMarks && routeNeedsSubjects && p.classLevel >= 10 && p.stream === "undecided" && !s.skipped.includes("stream");
  const skip = (id: string) => update({ skipped: [...s.skipped, id] });
  const setClass = (n: number) => setProfile({ classLevel: Math.min(12, Math.max(1, n)) });
  return (
    <Screen name="where">
      <StepHeader step="where" />
      <h1 className="screen-title">{t("whereTitle")}</h1>
      <div className="stepper">
        <button type="button" className="step-btn" aria-label={t("lessClass")} onClick={() => setClass(p.classLevel - 1)} disabled={p.classLevel <= 1}>−</button>
        <p className="step-value" aria-live="polite">{t("classN", { n: p.classLevel })}</p>
        <button type="button" className="step-btn" aria-label={t("moreClass")} onClick={() => setClass(p.classLevel + 1)} disabled={p.classLevel >= 12}>+</button>
      </div>
      <p className="sub-title">{t("yourStage")}</p>
      <ol className="phase-strip" aria-label={t("yourStage")}>
        {PHASES.map((ph) => <li key={ph} className={ph === phase ? "on" : ""} aria-current={ph === phase ? "step" : undefined}>{t(`phase_${ph}`)}</li>)}
      </ol>
      {askMarks ? (
        <AskInline id="marks" question={t("marksQ")} why={t("whyMarks")}
          options={MARKS.map((m) => ({ v: m, label: t(`marks_${m}`), icon: m === "strong" ? "😊" : m === "medium" ? "🙂" : "🤝" }))}
          onAnswer={(v) => setProfile({ marks: v })} onSkip={() => skip("marks")} />
      ) : askStream ? (
        <AskInline id="stream" question={t("streamQ")} why={t("whyStream")}
          options={STREAMS.map((x) => ({ v: x, label: t(`stream_${x}`) }))}
          onAnswer={(v) => { setProfile({ stream: v }); skip("stream"); }} onSkip={() => skip("stream")} />
      ) : (
        <NextButton onClick={() => go("readiness")} />
      )}
    </Screen>
  );
}

