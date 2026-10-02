import type { Career, Interest, Route, SaveGroup, StatePack } from "./types";

// DEMO DATA ONLY. Fictional family. No real child's data until the privacy review is done.
export const FAMILY = {
  id: "demo-family-1",
  fictional: true,
  demo: true,
  state: "MH",
  child: { firstName: { en: "Asha", mr: "आशा" }, classLevel: 8, fictional: true }
} as const;

// Pilot state chosen by the owner on 2026-10-01. Names follow the cardiologist-path Final draft
// and the spec; each must be confirmed for the admission year (status "example").
export const STATE_PACKS: Record<string, StatePack> = {
  MH: {
    id: "MH",
    name: { en: "Maharashtra", mr: "महाराष्ट्र" },
    status: "example",
    languages: ["en", "mr"],
    boardName: { en: "Maharashtra State Board", mr: "महाराष्ट्र राज्य मंडळ" },
    class12Name: { en: "HSC", mr: "HSC" },
    stateCounselling: { en: "State CET Cell", mr: "राज्य CET कक्ष (State CET Cell)" },
    scholarshipPortal: { name: { en: "MahaDBT", mr: "महाडीबीटी (MahaDBT)" }, url: "[official link, to verify]" }
  }
};

export const CAREERS: Career[] = [
  { id: "cardiologist", name: { en: "Heart doctor", mr: "हृदयाचे डॉक्टर" }, icon: "🩺", ready: true },
  { id: "musician", name: { en: "Musician", mr: "संगीतकार" }, icon: "🎵", ready: false },
  { id: "cricketer", name: { en: "Cricketer", mr: "क्रिकेटपटू" }, icon: "🏏", ready: false }
];

// Cardiologist path, from packet-2026-10-01-cardiologist-path.md (Final draft).
// No durations or fees: none have a source link yet.
export const ROUTES: Record<string, Route> = {
  cardiologist: {
    status: "example",
    sourceNote: {
      en: "Career GPS cardiologist path draft, 2026-10-01. Not yet checked by a human reviewer.",
      mr: "Career GPS हृदयरोगतज्ज्ञ मार्ग मसुदा, 2026-10-01. अजून तज्ज्ञ व्यक्तीने तपासलेला नाही."
    },
    steps: [
      { id: "c10", icon: "📘", stage: "school", figures: [], mayChange: true,
        child: { en: "Finish Class 10", mr: "दहावी पूर्ण कर" },
        parent: { en: "Class 10 through a recognised board or an accepted equivalent route",
                  mr: "मान्यताप्राप्त मंडळातून किंवा मान्य समकक्ष मार्गाने दहावी" } },
      { id: "c12", icon: "🧪", stage: "school", figures: ["minMarksPCB"], mayChange: true,
        child: { en: "Class 11–12 Science", mr: "अकरावी–बारावी विज्ञान" },
        parent: { en: "Class 11–12: Physics, Chemistry, Biology/Biotechnology and English (in {stateName}, Class 12 ends with the {class12Name} exam)",
                  mr: "अकरावी–बारावी: भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र/जैवतंत्रज्ञान आणि इंग्रजी ({stateName}मध्ये बारावीच्या शेवटी {class12Name} परीक्षा होते)" } },
      { id: "neetug", icon: "✏️", stage: "school", figures: ["neetSeatsGovt"], mayChange: true,
        child: { en: "Big exam: NEET-UG", mr: "मोठी परीक्षा: NEET-UG" },
        parent: { en: "NEET-UG entrance exam (NTA), then seat counselling: MCC for All-India Quota and some national, central and deemed-university seats; {stateCounselling} for {stateName} state-quota seats (confirm each year)",
                  mr: "NEET-UG प्रवेश परीक्षा (NTA), नंतर जागा वाटप (कौन्सेलिंग): अखिल भारतीय कोटा आणि काही राष्ट्रीय, केंद्रीय व अभिमत विद्यापीठांच्या जागांसाठी MCC; {stateName} राज्य कोट्याच्या जागांसाठी {stateCounselling} (दरवर्षी खात्री करा)" } },
      { id: "mbbs", icon: "🏥", stage: "college", figures: ["mbbsFeeGovt", "mbbsFeePrivate"], mayChange: true,
        child: { en: "Doctor school: MBBS", mr: "डॉक्टरचे शिक्षण: MBBS" },
        parent: { en: "MBBS, then a compulsory internship", mr: "MBBS, नंतर अनिवार्य इंटर्नशिप" } },
      { id: "md", icon: "🩺", stage: "training", figures: [], mayChange: true,
        child: { en: "Become a medicine expert: MD", mr: "वैद्यकशास्त्रातील तज्ज्ञ हो: MD" },
        parent: { en: "MD / DNB General Medicine (via NEET-PG, or NExT if it replaces it)",
                  mr: "MD / DNB जनरल मेडिसिन (NEET-PG द्वारे, किंवा तिच्या जागी NExT आल्यास त्याद्वारे)" } },
      { id: "dm", icon: "❤️", stage: "training", figures: [], mayChange: true,
        child: { en: "Heart doctor: DM Cardiology", mr: "हृदयाचे डॉक्टर: DM कार्डिओलॉजी" },
        parent: { en: "DM / DrNB Cardiology (via NEET-SS)", mr: "DM / DrNB कार्डिओलॉजी (NEET-SS द्वारे)" } }
    ]
  }
};

// "Where to save": three broad groups (addendum §E). Risk lines are group-specific,
// never "safe" or "low risk". Individual products and rates come later.
export const SAVE_GROUPS: SaveGroup[] = [
  { id: "govt", icon: "🏛️",
    name: { en: "Government-backed savings", mr: "सरकारी पाठबळ असलेल्या बचत योजना" },
    examples: { en: "Sukanya Samriddhi Yojana (for girls), Public Provident Fund, National Savings Certificate",
                mr: "सुकन्या समृद्धी योजना (मुलींसाठी), सार्वजनिक भविष्य निर्वाह निधी (PPF), राष्ट्रीय बचत प्रमाणपत्र (NSC)" },
    risk: { en: "Money is locked in for some years. Taking it out early may not be allowed.",
            mr: "पैसे काही वर्षे अडकून राहतात. मुदतीआधी काढता येतीलच असे नाही." } },
  { id: "bank", icon: "🏦",
    name: { en: "Bank deposits", mr: "बँक ठेवी" },
    examples: { en: "Recurring deposit, fixed deposit", mr: "आवर्ती ठेव (RD), मुदत ठेव (FD)" },
    risk: { en: "Breaking a deposit early can cost a penalty. Rising prices can reduce what it buys.",
            mr: "ठेव मुदतीआधी मोडल्यास दंड लागू शकतो. महागाई वाढली तर त्या पैशात कमी वस्तू मिळतात." } },
  { id: "market", icon: "📈",
    name: { en: "Market-linked options", mr: "बाजाराशी जोडलेले पर्याय" },
    examples: { en: "Mutual funds (monthly SIP), index funds", mr: "म्युच्युअल फंड (मासिक SIP), इंडेक्स फंड" },
    risk: { en: "Value can rise and fall. You may get back less than you put in.",
            mr: "किंमत वाढू किंवा घटू शकते. गुंतवलेल्यापेक्षा कमी पैसे परत मिळू शकतात." } }
];

// Child interests: picture cards, three per screen. A guide to explore, not a test
// (a licensed interest assessment is a separate, later item: addendum H).
export const INTEREST_ROUNDS: Interest[][] = [
  [
    { id: "helping", icon: "🩺", name: { en: "Helping sick people", mr: "आजारी लोकांना मदत करणे" } },
    { id: "music", icon: "🎵", name: { en: "Music and singing", mr: "संगीत आणि गाणे" } },
    { id: "sport", icon: "🏏", name: { en: "Sports and games", mr: "खेळ" } }
  ],
  [
    { id: "fixing", icon: "🔧", name: { en: "Fixing and building things", mr: "वस्तू दुरुस्त करणे आणि बनवणे" } },
    { id: "computers", icon: "💻", name: { en: "Computers and phones", mr: "संगणक आणि फोन" } },
    { id: "art", icon: "🎨", name: { en: "Drawing and making", mr: "चित्रकला आणि हस्तकला" } }
  ],
  [
    { id: "nature", icon: "🌱", name: { en: "Plants and animals", mr: "झाडे आणि प्राणी" } },
    { id: "reading", icon: "📚", name: { en: "Reading and stories", mr: "वाचन आणि गोष्टी" } },
    { id: "numbers", icon: "🧮", name: { en: "Numbers and puzzles", mr: "आकडे आणि कोडी" } }
  ]
];

// Markets (FINAL-PLAN-fast): India now; Canada and US labelled Planned until validated.
export const MARKETS = [
  { id: "IN", name: { en: "India", mr: "भारत" }, status: "example" as const },
  { id: "CA", name: { en: "Canada", mr: "कॅनडा" }, status: "planned" as const },
  { id: "US", name: { en: "United States", mr: "अमेरिका" }, status: "planned" as const }
];
