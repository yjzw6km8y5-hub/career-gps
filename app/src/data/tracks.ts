// Study in India vs abroad: four tracks per career, shown one at a time. Built from one factory so every
// career pack carries the same shape (schema extension: CareerPack.tracks). Nothing is sourced yet: every
// number is a [placeholder] with an Example EvidenceRecord. Canada and the US stay "Planned" labels only.
import { exampleEvidence as ev, INDIA, placeholderFigure as fig, tx } from "./helpers";
import type { EvidenceRecord, Figure, StudyTrack, Text } from "./schema";

export const DEFAULT_TRACK = "in-in";

export const FX_FIGURE_ID = "fx.rate";

/** Career-specific wording for the licences and entry steps; everything else is shared. */
export interface TrackWording {
  examsIndia: Text;
  examsAbroad: Text;
  examsReturn: Text;
}

const TO_SOURCE = (en: string, mr: string) => tx(`[${en}: to be sourced]`, `[${mr}: स्रोत शोधायचा आहे]`);
const NOT_NEEDED = tx("Not needed: the whole route is in India.", "गरज नाही: संपूर्ण मार्ग भारतातच आहे.");
const YEARLY = tx("Re-check every year", "दरवर्षी पुन्हा तपासा");

const TRACKS: { id: string; icon: string; name: Text; summary: Text; abroadStudy: boolean; abroadWork: boolean; returns?: boolean }[] = [
  { id: "in-in", icon: "🏠", abroadStudy: false, abroadWork: false,
    name: tx("Study in India, work in India", "भारतात शिक्षण, भारतात काम"),
    summary: tx("The usual route: learn and work close to home.", "नेहमीचा मार्ग: घराजवळ शिकणे आणि काम करणे.") },
  { id: "in-abroad", icon: "✈️", abroadStudy: false, abroadWork: true,
    name: tx("Study in India, work abroad", "भारतात शिक्षण, परदेशात काम"),
    summary: tx("Learn in India, then move abroad to work.", "भारतात शिकणे, मग कामासाठी परदेशी जाणे.") },
  { id: "abroad-abroad", icon: "🌍", abroadStudy: true, abroadWork: true,
    name: tx("Study abroad, work abroad", "परदेशात शिक्षण, परदेशात काम"),
    summary: tx("Learn abroad and stay there to work.", "परदेशात शिकणे आणि तिथेच काम करणे.") },
  { id: "abroad-return", icon: "🔁", abroadStudy: true, abroadWork: false, returns: true,
    name: tx("Study abroad, return to India", "परदेशात शिक्षण, भारतात परत"),
    summary: tx("Learn abroad, then come back to work in India.", "परदेशात शिकणे, मग काम करण्यासाठी भारतात परत येणे.") }
];

export const TRACK_PLANNED_NOTE: Text = tx(
  "Canada and the United States: Planned. Country-specific details are not built yet.",
  "कॅनडा आणि अमेरिका: नियोजित. देशानुसार माहिती अजून तयार नाही."
);

export const NO_RELIABLE_DATA: Text = tx("Reliable data not available", "विश्वासार्ह माहिती उपलब्ध नाही");

/** Tracks, figures and evidence for one career pack. `p` is the pack's id prefix (e.g. "c", "m"). */
export function buildTracks(p: string, w: TrackWording): { tracks: StudyTrack[]; figures: Record<string, Figure>; evidence: EvidenceRecord[] } {
  const figures: Record<string, Figure> = {};
  const evidence: EvidenceRecord[] = [];
  const tracks: StudyTrack[] = TRACKS.map((x) => {
    const base = `${p}.track.${x.id}`;
    const evId = `ev.${base}`;
    const any = x.abroadStudy || x.abroadWork;
    const f = (key: string, label: Text, placeholder: Text, unit: string) => {
      figures[`${base}.${key}`] = fig(label, placeholder, unit, evId);
      return `${base}.${key}`;
    };
    evidence.push(ev(
      evId,
      tx(`Cost, time, exams or licences, visa route and pay for: ${x.name.en}.`, `खर्च, कालावधी, परीक्षा किंवा परवाने, व्हिसा मार्ग आणि उत्पन्न: ${x.name.mr}.`),
      TO_SOURCE("Official fee, licensing and immigration pages", "अधिकृत शुल्क, परवाना आणि इमिग्रेशन पाने"),
      any ? tx("India and the destination country", "भारत आणि गंतव्य देश") : INDIA,
      YEARLY
    ));
    return {
      id: x.id, icon: x.icon, name: x.name, summary: x.summary,
      costInr: f("cost", tx("Total cost in rupees", "एकूण खर्च, रुपयांत"), tx("[total cost, rupees]", "[एकूण खर्च, रुपये]"), "INR"),
      costForeign: x.abroadStudy || x.abroadWork
        ? f("costForeign", tx("Total cost in the destination currency", "गंतव्य देशाच्या चलनात एकूण खर्च"), tx("[total cost, destination currency]", "[एकूण खर्च, गंतव्य चलन]"), "currency")
        : null,
      rate: any ? FX_FIGURE_ID : null,
      years: f("years", tx("Years in all", "एकूण वर्षे"), tx("[years, to be sourced]", "[वर्षे, स्रोत शोधायचा आहे]"), "years"),
      exams: x.returns ? w.examsReturn : x.abroadWork ? w.examsAbroad : w.examsIndia,
      visa: any ? TO_SOURCE("Visa route", "व्हिसा मार्ग") : NOT_NEEDED,
      pay: f("pay", tx("Pay range", "उत्पन्नाची श्रेणी"), tx("[pay range]", "[उत्पन्न श्रेणी]"), x.abroadWork ? "currency/year" : "INR/month"),
      howMany: NO_RELIABLE_DATA,
      evidence: [evId]
    };
  });
  return { tracks, figures, evidence };
}
