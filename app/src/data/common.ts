// Data shared by every career: the pilot state, markets, the fictional family, the career
// catalogue for search, and the money figures that every journey uses.
import type { CareerPack, Figure, Profile, Text } from "./schema";
import { exampleEvidence, INDIA, placeholderFigure as fig, tx } from "./helpers";
import { CARDIOLOGIST } from "./careers/cardiologist";
import { MUSICIAN } from "./careers/musician";

export interface StatePack {
  id: string;
  name: Text;
  languages: ("en" | "mr")[];
  class12Name: Text;
  stateCounselling: Text;
}

// Pilot state chosen by the owner on 2026-10-01. Names follow the cardiologist-path Final draft.
export const STATE_PACKS: Record<string, StatePack> = {
  MH: {
    id: "MH",
    name: tx("Maharashtra", "महाराष्ट्र"),
    languages: ["en", "mr"],
    class12Name: tx("HSC", "HSC"),
    stateCounselling: tx("State CET Cell", "राज्य CET कक्ष (State CET Cell)")
  }
};

export const MARKETS = [
  { id: "IN", icon: "📍", name: tx("India", "भारत"), planned: false },
  { id: "CA", icon: "🍁", name: tx("Canada", "कॅनडा"), planned: true },
  { id: "US", icon: "🗽", name: tx("United States", "अमेरिका"), planned: true }
];

// DEMO DATA ONLY: a fictional child. No real child's data until the privacy review is done.
export const FAMILY = { demo: true, fictional: true, child: { name: tx("Asha", "आशा"), fictional: true } } as const;

export const START_PROFILE: Profile = {
  classLevel: 8, stream: "undecided", marks: "unknown", practice: "unknown", budget: "unknown", place: "unknown",
  entrance: "notYet", interest: "core", income: "unknown", state: "MH"
};

/** Career packs that run on the pathway engine. */
export const PACKS: Record<string, CareerPack> = { cardiologist: CARDIOLOGIST, musician: MUSICIAN };

/** Search catalogue. Only careers with a pack open a journey; the rest say "data coming". */
export const CATALOGUE: { id: string; icon: string; name: Text; words: string; ready: boolean; sample?: boolean; leans: string[] }[] = [
  { id: "cardiologist", icon: "🩺", name: tx("Heart doctor (cardiologist)", "हृदयाचे डॉक्टर (हृदयरोगतज्ज्ञ)"), words: "heart doctor cardiologist cardiology medicine mbbs neet हृदय डॉक्टर वैद्यकीय", ready: true, leans: ["helping", "science"] },
  { id: "musician", icon: "🎵", name: tx("Musician", "संगीत कलाकार"), words: "music musician singer singing गायक संगीत कलाकार", ready: true, leans: ["music"] },
  { id: "cricketer", icon: "🏏", name: tx("Cricketer", "क्रिकेटपटू"), words: "cricket cricketer sport sports क्रिकेट खेळ", ready: false, leans: ["sport"] },
  { id: "software", icon: "💻", name: tx("Software engineer", "सॉफ्टवेअर अभियंता"), words: "software engineer computer coding it संगणक अभियंता", ready: false, leans: ["computers", "numbers"] },
  { id: "electrician", icon: "💡", name: tx("Electrician", "इलेक्ट्रिशियन (वीजतंत्री)"), words: "electrician electric wiring iti वीज", ready: false, leans: ["fixing"] },
  { id: "civil", icon: "🏛️", name: tx("Civil services officer", "प्रशासकीय सेवा अधिकारी"), words: "civil services ias upsc officer collector प्रशासकीय अधिकारी", ready: false, leans: ["helping", "reading"] }
];

/** "Show me possibilities": interest cards (a guide to explore, not a test). */
export const POSSIBILITIES: { id: string; icon: string; name: Text }[] = [
  { id: "helping", icon: "🤝", name: tx("Helping people", "लोकांना मदत करणे") },
  { id: "science", icon: "🔬", name: tx("Science", "विज्ञान") },
  { id: "music", icon: "🎵", name: tx("Music", "संगीत") },
  { id: "sport", icon: "🏏", name: tx("Sport", "खेळ") },
  { id: "computers", icon: "💻", name: tx("Computers", "संगणक") },
  { id: "fixing", icon: "🔧", name: tx("Fixing things", "वस्तू दुरुस्त करणे") },
  { id: "numbers", icon: "🧮", name: tx("Numbers", "आकडे") },
  { id: "reading", icon: "📚", name: tx("Reading", "वाचन") }
];

// Money figures used by every journey. All [placeholders] until the cost engine has sourced inputs.
export const COMMON_EVIDENCE = [
  exampleEvidence("ev.common.income", tx("Income bands used by scholarships.", "शिष्यवृत्तींसाठी वापरले जाणारे उत्पन्न गट."), tx("[Scholarship income limits: official source to attach]", "[शिष्यवृत्तीच्या उत्पन्न मर्यादा: अधिकृत स्रोत जोडायचा आहे]"), INDIA),
  exampleEvidence("ev.common.estimate", tx("Funding gap and monthly saving estimate, worked out from the costs and support above.", "वरील खर्च आणि मदतीवरून काढलेली निधीतील तूट आणि मासिक बचतीचा अंदाज."), tx("[Calculated from sourced costs: not yet possible]", "[तपासलेल्या खर्चावरून मोजायचे: अजून शक्य नाही]"), INDIA, tx("Re-calculate when any cost or support changes", "कोणताही खर्च किंवा मदत बदलल्यास पुन्हा मोजा"))
];

export const COMMON_FIGURES: Record<string, Figure> = {
  "income.low": fig(tx("Monthly family income, lower band", "कुटुंबाचे मासिक उत्पन्न, खालचा गट"), tx("[lower income band]", "[खालचा उत्पन्न गट]"), "INR/month", "ev.common.income"),
  "income.mid": fig(tx("Monthly family income, middle band", "कुटुंबाचे मासिक उत्पन्न, मधला गट"), tx("[middle income band]", "[मधला उत्पन्न गट]"), "INR/month", "ev.common.income"),
  "income.high": fig(tx("Monthly family income, higher band", "कुटुंबाचे मासिक उत्पन्न, वरचा गट"), tx("[higher income band]", "[वरचा उत्पन्न गट]"), "INR/month", "ev.common.income"),
  "gap.low": fig(tx("Funding gap, low end", "निधीतील तूट, किमान बाजू"), tx("[gap low]", "[तूट किमान]"), "INR", "ev.common.estimate"),
  "gap.high": fig(tx("Funding gap, high end", "निधीतील तूट, कमाल बाजू"), tx("[gap high]", "[तूट कमाल]"), "INR", "ev.common.estimate"),
  "monthly.low": fig(tx("Monthly saving, low end", "मासिक बचत, किमान बाजू"), tx("[low]", "[किमान]"), "INR/month", "ev.common.estimate"),
  "monthly.high": fig(tx("Monthly saving, high end", "मासिक बचत, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR/month", "ev.common.estimate")
};
