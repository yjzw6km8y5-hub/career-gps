// "Where to keep the money": a plain explainer of the kinds of places a family can save (BUILD-PLAN order,
// feedback-2026-10-02-02). Information only: no ranking, no default, no "best/safe" wording.
// Every rule and rate is an Example claim or a [placeholder] until a named person checks it.
import { exampleEvidence as ev, INDIA, placeholderFigure as fig, tx } from "./helpers";
import type { EvidenceRecord, Figure, Text } from "./schema";

export interface SavingsProduct {
  id: string;
  name: Text;
  what: Text;
  returns: Text;          // how the return is decided (fixed by terms, or moves with markets)
  risks: Text[];          // product-specific, plain words
  rate: string;           // figure id
  minimum: string;        // figure id
  lockIn: string;         // figure id
  evidence: string[];
}

export interface SavingsGroup {
  id: string;
  icon: string;
  name: Text;
  summary: Text;
  products: SavingsProduct[];
}

const OFFICIAL = (en: string, mr: string) => tx(`[${en}: official source to attach]`, `[${mr}: अधिकृत स्रोत जोडायचा आहे]`);
const RATES = tx("Re-check every quarter", "दर तिमाहीला पुन्हा तपासा");

// Fixed order (government-backed, bank, market-linked). The order is not a ranking.
export const SAVINGS_GROUPS: SavingsGroup[] = [
  {
    id: "govt", icon: "🏛️",
    name: tx("Government-backed savings", "सरकारी पाठबळ असलेल्या बचत योजना"),
    summary: tx("Small-savings schemes run by the government, through post offices and banks.", "पोस्ट ऑफिस आणि बँकांमार्फत चालणाऱ्या सरकारी अल्पबचत योजना."),
    products: [
      { id: "ssy", rate: "sv.ssy.rate", minimum: "sv.ssy.min", lockIn: "sv.ssy.lock", evidence: ["ev.sv.ssy"],
        name: tx("Sukanya Samriddhi Yojana (for girls)", "सुकन्या समृद्धी योजना (मुलींसाठी)"),
        what: tx("A savings account for a girl child's future. Who can open it, and until what age, must be checked.", "मुलीच्या भविष्यासाठी बचत खाते. ते कोण उघडू शकते आणि कोणत्या वयापर्यंत, हे तपासावे लागेल."),
        returns: tx("The interest rate is set by the government and can change from time to time.", "व्याजदर सरकार ठरवते आणि तो वेळोवेळी बदलू शकतो."),
        risks: [
          tx("Money is locked in for many years. Taking it out early is allowed only in some cases.", "पैसे अनेक वर्षे अडकून राहतात. मुदतीआधी काढणे फक्त काही परिस्थितींतच शक्य असते."),
          tx("The rate for future years is not known in advance.", "पुढच्या वर्षांचा दर आधी माहीत नसतो.")
        ] },
      { id: "ppf", rate: "sv.ppf.rate", minimum: "sv.ppf.min", lockIn: "sv.ppf.lock", evidence: ["ev.sv.ppf"],
        name: tx("Public Provident Fund (PPF)", "सार्वजनिक भविष्य निर्वाह निधी (PPF)"),
        what: tx("A long-term government savings account that anyone can open.", "कोणीही उघडू शकेल असे दीर्घ मुदतीचे सरकारी बचत खाते."),
        returns: tx("The interest rate is set by the government and can change from time to time.", "व्याजदर सरकार ठरवते आणि तो वेळोवेळी बदलू शकतो."),
        risks: [
          tx("Money is locked in for many years. Partial withdrawal is allowed only after some years.", "पैसे अनेक वर्षे अडकून राहतात. काही वर्षांनंतरच अंशतः रक्कम काढता येते."),
          tx("The rate for future years is not known in advance.", "पुढच्या वर्षांचा दर आधी माहीत नसतो.")
        ] },
      { id: "nsc", rate: "sv.nsc.rate", minimum: "sv.nsc.min", lockIn: "sv.nsc.lock", evidence: ["ev.sv.nsc"],
        name: tx("National Savings Certificate (NSC)", "राष्ट्रीय बचत प्रमाणपत्र (NSC)"),
        what: tx("A fixed-term savings certificate bought at a post office.", "पोस्ट ऑफिसमधून घेतले जाणारे ठरावीक मुदतीचे बचत प्रमाणपत्र."),
        returns: tx("The rate is fixed when you buy it, for the whole term.", "खरेदी करताना ठरलेला दर संपूर्ण मुदतीसाठी लागू राहतो."),
        risks: [
          tx("Money is locked in until the term ends.", "मुदत संपेपर्यंत पैसे अडकून राहतात."),
          tx("Rising prices can reduce what the money buys later.", "महागाई वाढली तर नंतर त्या पैशात कमी वस्तू मिळतात.")
        ] }
    ]
  },
  {
    id: "bank", icon: "🏦",
    name: tx("Bank deposits", "बँक ठेवी"),
    summary: tx("Deposits at a bank or post office, for a fixed time.", "बँक किंवा पोस्ट ऑफिसमध्ये ठरावीक मुदतीसाठी ठेवी."),
    products: [
      { id: "rd", rate: "sv.rd.rate", minimum: "sv.rd.min", lockIn: "sv.rd.lock", evidence: ["ev.sv.deposits"],
        name: tx("Recurring deposit (RD)", "आवर्ती ठेव (RD)"),
        what: tx("Put in the same amount every month for a fixed time.", "ठरावीक मुदतीसाठी दरमहा तेवढीच रक्कम भरा."),
        returns: tx("The rate is fixed when you open it, by the bank's terms.", "खाते उघडताना बँकेच्या अटींनुसार दर ठरतो."),
        risks: [
          tx("Breaking a deposit early can cost a penalty.", "ठेव मुदतीआधी मोडल्यास दंड लागू शकतो."),
          tx("Deposit insurance covers only up to a limit, per bank.", "ठेव विमा प्रत्येक बँकेत फक्त एका मर्यादेपर्यंतच संरक्षण देतो."),
          tx("Rising prices can reduce what the money buys later.", "महागाई वाढली तर नंतर त्या पैशात कमी वस्तू मिळतात.")
        ] },
      { id: "fd", rate: "sv.fd.rate", minimum: "sv.fd.min", lockIn: "sv.fd.lock", evidence: ["ev.sv.deposits"],
        name: tx("Fixed deposit (FD)", "मुदत ठेव (FD)"),
        what: tx("Put in a lump sum once, for a fixed time.", "एकदाच एकरकमी रक्कम ठरावीक मुदतीसाठी ठेवा."),
        returns: tx("The rate is fixed when you open it, by the bank's terms.", "खाते उघडताना बँकेच्या अटींनुसार दर ठरतो."),
        risks: [
          tx("Breaking a deposit early can cost a penalty.", "ठेव मुदतीआधी मोडल्यास दंड लागू शकतो."),
          tx("Deposit insurance covers only up to a limit, per bank.", "ठेव विमा प्रत्येक बँकेत फक्त एका मर्यादेपर्यंतच संरक्षण देतो."),
          tx("Rising prices can reduce what the money buys later.", "महागाई वाढली तर नंतर त्या पैशात कमी वस्तू मिळतात.")
        ] }
    ]
  },
  {
    id: "market", icon: "📈",
    name: tx("Market-linked options", "बाजाराशी जोडलेले पर्याय"),
    summary: tx("Mutual funds, where the value moves with markets.", "म्युच्युअल फंड, ज्यांची किंमत बाजाराबरोबर बदलते."),
    products: [
      { id: "sip", rate: "sv.sip.past", minimum: "sv.sip.min", lockIn: "sv.sip.lock", evidence: ["ev.sv.mf"],
        name: tx("Mutual fund (monthly SIP)", "म्युच्युअल फंड (मासिक SIP)"),
        what: tx("Put a fixed amount into a mutual fund every month.", "दरमहा ठरावीक रक्कम म्युच्युअल फंडात गुंतवा."),
        returns: tx("Not fixed. The value goes up and down with markets. Past results are not a promise.", "ठरलेला परतावा नाही. किंमत बाजाराबरोबर वर-खाली होते. मागील परिणाम हे आश्वासन नाही."),
        risks: [
          tx("Value can rise and fall. You may get back less than you put in.", "किंमत वाढू किंवा घटू शकते. गुंतवलेल्यापेक्षा कमी पैसे परत मिळू शकतात."),
          tx("Value can be low just when the money is needed.", "पैशांची गरज असतानाच किंमत कमी असू शकते."),
          tx("Some funds charge fees or an exit charge.", "काही फंड शुल्क किंवा बाहेर पडण्याचे शुल्क आकारतात.")
        ] },
      { id: "index", rate: "sv.index.past", minimum: "sv.index.min", lockIn: "sv.index.lock", evidence: ["ev.sv.mf"],
        name: tx("Index fund", "इंडेक्स फंड"),
        what: tx("A mutual fund that follows a market index.", "बाजार निर्देशांकाचे अनुसरण करणारा म्युच्युअल फंड."),
        returns: tx("Not fixed. The value goes up and down with the index. Past results are not a promise.", "ठरलेला परतावा नाही. किंमत निर्देशांकाबरोबर वर-खाली होते. मागील परिणाम हे आश्वासन नाही."),
        risks: [
          tx("Value can rise and fall. You may get back less than you put in.", "किंमत वाढू किंवा घटू शकते. गुंतवलेल्यापेक्षा कमी पैसे परत मिळू शकतात."),
          tx("Value can be low just when the money is needed.", "पैशांची गरज असतानाच किंमत कमी असू शकते.")
        ] }
    ]
  }
];

export const SAVINGS_FIGURES: Record<string, Figure> = Object.fromEntries(
  SAVINGS_GROUPS.flatMap((g) => g.products).flatMap((p) => {
    const market = p.id === "sip" || p.id === "index";
    return [
      [p.rate, fig(market ? tx("Past results (a range, with dates)", "मागील परिणाम (तारखांसह श्रेणी)") : tx("Current rate", "सध्याचा दर"),
        market ? tx("[past range, dated]", "[मागील श्रेणी, तारखेसह]") : tx("[current rate, dated]", "[सध्याचा दर, तारखेसह]"), "%/year", p.evidence[0])],
      [p.minimum, fig(tx("Minimum amount", "किमान रक्कम"), tx("[minimum amount]", "[किमान रक्कम]"), "INR", p.evidence[0])],
      [p.lockIn, fig(tx("Lock-in or term", "अडकून राहण्याचा कालावधी किंवा मुदत"), tx("[lock-in or term]", "[मुदत]"), "years", p.evidence[0])]
    ] as [string, Figure][];
  })
);

export const SAVINGS_EVIDENCE: EvidenceRecord[] = [
  ev("ev.sv.ssy", tx("Sukanya Samriddhi Yojana: who can open it, lock-in, withdrawal rules and the current rate.", "सुकन्या समृद्धी योजना: कोण उघडू शकते, मुदत, पैसे काढण्याचे नियम आणि सध्याचा दर."), OFFICIAL("Ministry of Finance small-savings notification", "अर्थ मंत्रालयाची अल्पबचत अधिसूचना"), INDIA, RATES),
  ev("ev.sv.ppf", tx("PPF: lock-in, partial withdrawal rules and the current rate.", "PPF: मुदत, अंशतः रक्कम काढण्याचे नियम आणि सध्याचा दर."), OFFICIAL("Ministry of Finance small-savings notification", "अर्थ मंत्रालयाची अल्पबचत अधिसूचना"), INDIA, RATES),
  ev("ev.sv.nsc", tx("NSC: term and the current rate.", "NSC: मुदत आणि सध्याचा दर."), OFFICIAL("Ministry of Finance small-savings notification", "अर्थ मंत्रालयाची अल्पबचत अधिसूचना"), INDIA, RATES),
  ev("ev.sv.deposits", tx("Bank and post-office deposits: early-withdrawal penalties and the deposit insurance limit.", "बँक आणि पोस्ट ऑफिस ठेवी: मुदतीआधी काढण्याचा दंड आणि ठेव विम्याची मर्यादा."), OFFICIAL("RBI and DICGC", "RBI आणि DICGC"), INDIA, RATES),
  ev("ev.sv.mf", tx("Mutual funds and index funds: how value changes, fees and exit charges.", "म्युच्युअल फंड आणि इंडेक्स फंड: किंमत कशी बदलते, शुल्क आणि बाहेर पडण्याचे शुल्क."), OFFICIAL("SEBI and AMFI investor education", "SEBI आणि AMFI गुंतवणूकदार शिक्षण"), INDIA, RATES)
];
