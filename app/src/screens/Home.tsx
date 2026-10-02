import { Foot, Listen, NavBar, Screen } from "../components";
import { MARKETS } from "../data/content";
import { pick } from "../i18n";
import { useApp } from "../state";

const ART = {
  parent: (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <circle cx="80" cy="64" r="54" className="art-halo" />
      <circle cx="62" cy="38" r="15" className="art-skin" />
      <path d="M40 104c0-22 10-40 22-40s22 18 22 40z" className="art-main" />
      <circle cx="104" cy="58" r="11" className="art-skin" />
      <path d="M88 104c0-16 7-30 16-30s16 14 16 30z" className="art-alt" />
      <path d="M80 80c6-4 12-4 16 0" className="art-line" />
    </svg>
  ),
  child: (
    <svg viewBox="0 0 160 120" aria-hidden="true">
      <circle cx="80" cy="64" r="54" className="art-halo" />
      <path d="M118 22l4 9 10 1-7 7 2 10-9-5-9 5 2-10-7-7 10-1z" className="art-star" />
      <circle cx="76" cy="44" r="15" className="art-skin" />
      <path d="M52 106c0-22 11-40 24-40s24 18 24 40z" className="art-main" />
      <path d="M98 76l18-22" className="art-line" />
    </svg>
  )
};

export function Home() {
  const { t, go, update } = useApp();
  const role = (r: "parent" | "child") => (
    <button
      type="button"
      data-choice
      className={`role-card role-${r}`}
      onClick={() => {
        if (r === "parent") { update({ qStack: [] }); go("parent-about"); }
        else { update({ interestRound: 0 }); go("child-class"); }
      }}
    >
      <span className="role-art">{ART[r]}</span>
      <span className="role-name">{t(r)}</span>
      <span className="role-sub">{t(r === "parent" ? "parentSub" : "childSub")}</span>
    </button>
  );
  return (
    <Screen name="home">
      <h1 className="big-q">{t("whoIsUsing")}</h1>
      <p className="hint">
        {t("whoHint")} <Listen text={`${t("whoIsUsing")} ${t("parent")}. ${t("child")}.`} />
      </p>
      <div className="role-grid">{role("parent")}{role("child")}</div>
      <Foot kind="example" center />
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
          <button
            key={m.id}
            type="button"
            data-choice
            className="q-card"
            aria-pressed={m.id === "IN"}
            onClick={() => {
              if (m.id === "IN") back();
              else { update({ plannedMarket: m.id }); go("country-planned"); }
            }}
          >
            <span className="q-icon" aria-hidden="true">{m.id === "IN" ? "📍" : m.id === "CA" ? "🍁" : "🗽"}</span>
            <span className="q-name">{pick(m.name, s.lang)}</span>
            {m.status === "planned" && <span className="q-hint">{t("labelPlanned")}</span>}
          </button>
        ))}
      </div>
      <Foot kind="example" />
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
        <button type="button" data-choice className="adviser-btn" onClick={() => { back(); back(); }}>{t("backToIndia")}</button>
      </div>
      <Foot kind="planned" />
    </Screen>
  );
}
