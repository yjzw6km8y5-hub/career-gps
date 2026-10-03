// Bank-by-bank comparison of deposits (RD and FD), opened from "Where to keep the money".
// Rules (BUILD-PLAN, CONTEXT): alphabetical order, no "best" badge, no default, no highlighting, no referral
// links. Every rate is a [placeholder] with an EvidenceRecord (official page, dates, expiry) until a named
// person checks it on the bank's own site. Who is included will follow an objective rule the owner sets.
import { exampleEvidence as ev, INDIA, placeholderFigure as fig, tx } from "./helpers";
import type { EvidenceRecord, Figure, Text } from "./schema";

export interface BankEntry {
  id: string;
  name: Text;          // listed and sorted by the English name
  rd: { rate: string; minimum: string };
  fd: { rate: string; minimum: string };
  evidence: string[];
}

const QUARTERLY = tx("Re-check every quarter, and whenever the bank announces new rates", "दर तिमाहीला, आणि बँकेने नवे दर जाहीर केल्यावर पुन्हा तपासा");

const entry = (id: string, en: string, mr: string): BankEntry => ({
  id, name: tx(en, mr),
  rd: { rate: `bank.${id}.rd.rate`, minimum: `bank.${id}.rd.min` },
  fd: { rate: `bank.${id}.fd.rate`, minimum: `bank.${id}.fd.min` },
  evidence: [`ev.bank.${id}`]
});

// Example list taken from the product spec. The final list follows the owner's inclusion rule (DECISIONS.md, open).
const LIST: BankEntry[] = [
  entry("sbi", "State Bank of India", "स्टेट बँक ऑफ इंडिया"),
  entry("bob", "Bank of Baroda", "बँक ऑफ बडोदा"),
  entry("canara", "Canara Bank", "कॅनरा बँक"),
  entry("hdfc", "HDFC Bank", "एचडीएफसी बँक"),
  entry("icici", "ICICI Bank", "आयसीआयसीआय बँक"),
  entry("post", "India Post (Post Office)", "भारतीय टपाल (पोस्ट ऑफिस)")
];

/** Always alphabetical by English name: the order is never a ranking. */
export const BANKS: BankEntry[] = [...LIST].sort((a, b) => a.name.en.localeCompare(b.name.en, "en"));

export const BANK_INCLUSION_RULE: Text = tx(
  "Who is listed will follow one fixed rule that applies to every bank [rule: owner to decide]. This is an example list.",
  "यादीत कोण असेल ते प्रत्येक बँकेला लागू होणाऱ्या एका ठरलेल्या नियमानुसार ठरेल [नियम: मालकाने ठरवायचा आहे]. ही उदाहरणादाखल यादी आहे."
);

export const BANK_FIGURES: Record<string, Figure> = Object.fromEntries(BANKS.flatMap((b) => [
  [b.rd.rate, fig(tx("Recurring deposit (RD) rate", "आवर्ती ठेव (RD) दर"), tx("[rate, dated]", "[दर, तारखेसह]"), "%/year", b.evidence[0])],
  [b.rd.minimum, fig(tx("RD minimum each month", "RD दरमहा किमान रक्कम"), tx("[minimum]", "[किमान]"), "INR/month", b.evidence[0])],
  [b.fd.rate, fig(tx("Fixed deposit (FD) rate", "मुदत ठेव (FD) दर"), tx("[rate, dated]", "[दर, तारखेसह]"), "%/year", b.evidence[0])],
  [b.fd.minimum, fig(tx("FD minimum amount", "FD किमान रक्कम"), tx("[minimum]", "[किमान]"), "INR", b.evidence[0])]
] as [string, Figure][]));

export const BANK_EVIDENCE: EvidenceRecord[] = BANKS.map((b) => ev(
  b.evidence[0],
  tx(`${b.name.en}: current RD and FD rates and minimum amounts.`, `${b.name.mr}: सध्याचे RD आणि FD दर आणि किमान रक्कम.`),
  tx(`[${b.name.en} official interest-rate page: to attach]`, `[${b.name.mr} अधिकृत व्याजदर पान: जोडायचे आहे]`),
  INDIA, QUARTERLY
));
