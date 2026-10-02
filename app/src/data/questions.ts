import type { Question } from "./types";

// Parent "About you" questions (family profile, spec §2).
// Rules: one question per screen, at most 3 answers, every question can be skipped.
// Money questions (income, how it may change, land) appear ONLY after "Yes, tell more".
// Occupation is never a feasibility-score input (it can stand in for caste); it is used
// only to match schemes meant for certain kinds of work. See docs/BUILD-PLAN.md §3.
export const PARENT_QUESTIONS: Question[] = [
  {
    id: "who",
    q: { en: "Who are you?", mr: "तुम्ही कोण आहात?" },
    sub: { en: "So we can talk to you the right way.", mr: "म्हणजे आम्ही तुमच्याशी योग्य प्रकारे बोलू शकू." },
    options: [
      { v: "mother", icon: "👩", t: { en: "Mother", mr: "आई" } },
      { v: "father", icon: "👨", t: { en: "Father", mr: "वडील" } },
      { v: "guardian", icon: "🧓", t: { en: "Grandparent or guardian", mr: "आजी-आजोबा किंवा सांभाळ करणारे" } }
    ],
    skip: "skip"
  },
  {
    id: "board",
    q: { en: "Which board is your child's school?", mr: "मुलाची शाळा कोणत्या मंडळाची आहे?" },
    sub: { en: "The board decides some of the rules for exams.", mr: "परीक्षांचे काही नियम मंडळावर अवलंबून असतात." },
    options: [
      { v: "state", icon: "🏫", t: { en: "{boardName}", mr: "{boardName}" } },
      { v: "cbse", icon: "🏫", t: { en: "CBSE", mr: "CBSE" } },
      { v: "other", icon: "🏫", t: { en: "ICSE or another board", mr: "ICSE किंवा इतर मंडळ" } }
    ],
    skip: "notSure"
  },
  {
    id: "work",
    q: { en: "What work do you do?", mr: "तुम्ही कोणते काम करता?" },
    sub: { en: "Some help is only for families who do certain kinds of work. Doing something else, or not working now? Just skip.",
           mr: "काही मदत फक्त ठराविक काम करणाऱ्या कुटुंबांसाठी असते. दुसरे काम करता किंवा सध्या काम नाही? तर वगळा." },
    options: [
      { v: "daily", icon: "🌾", t: { en: "Farm or daily work", mr: "शेती किंवा रोजंदारी" },
        hint: { en: "Farming, labour, building, driving", mr: "शेती, मजुरी, बांधकाम, गाडी चालवणे" } },
      { v: "business", icon: "🏪", t: { en: "Own shop or business", mr: "स्वतःचे दुकान किंवा व्यवसाय" },
        hint: { en: "Shop, stall, trade", mr: "दुकान, स्टॉल, व्यापार" } },
      { v: "salary", icon: "🏢", t: { en: "Job with a salary", mr: "पगाराची नोकरी" },
        hint: { en: "Government, office, factory, shop staff", mr: "सरकारी, ऑफिस, कारखाना, दुकानातील कर्मचारी" } }
    ],
    skip: "skip"
  },
  {
    id: "otherEarner",
    q: { en: "Does anyone else in the family earn?", mr: "कुटुंबात आणखी कोणी कमावते का?" },
    options: [
      { v: "partner", icon: "🧑", t: { en: "{partner}", mr: "{partner}" } },
      { v: "someone", icon: "👥", t: { en: "Someone else", mr: "दुसरे कोणी" } },
      { v: "none", icon: "✋", t: { en: "No one else", mr: "आणखी कोणी नाही" } }
    ],
    skip: "skip"
  },
  {
    id: "otherWork",
    when: { otherEarner: ["partner", "someone"] },
    q: { en: "What work do they do?", mr: "ते कोणते काम करतात?" },
    sameOptionsAs: "work",
    skip: "skip"
  },
  {
    id: "more",
    q: { en: "Want a closer money plan?", mr: "पैशाची अधिक नेमकी योजना हवी आहे का?" },
    sub: { en: "You can tell us a little about money. Only if you want to.", mr: "पैशाबद्दल थोडी माहिती देऊ शकता. फक्त तुमची इच्छा असेल तर." },
    options: [
      { v: "yes", icon: "📊", t: { en: "Yes, tell more", mr: "हो, माहिती द्यायची आहे" } },
      { v: "no", icon: "⏭️", t: { en: "Not now", mr: "आत्ता नको" } }
    ]
  },
  {
    id: "income",
    when: { more: ["yes"] },
    q: { en: "About how much does the family earn in a month?", mr: "कुटुंब महिन्याला साधारण किती कमावते?" },
    sub: { en: "All earners together. A rough idea is enough.", mr: "सर्व कमावणाऱ्यांचे मिळून. अंदाज पुरेसा आहे." },
    options: [
      { v: "low", icon: "🪙", fig: "incomeBandLow" },
      { v: "mid", icon: "💵", fig: "incomeBandMid" },
      { v: "high", icon: "💰", fig: "incomeBandHigh" }
    ],
    skip: "preferNot"
  },
  {
    id: "trend",
    when: { more: ["yes"] },
    q: { en: "In the next few years, family income will probably…", mr: "पुढच्या काही वर्षांत कुटुंबाचे उत्पन्न बहुधा…" },
    options: [
      { v: "up", icon: "📈", t: { en: "Go up", mr: "वाढेल" }, sum: { en: "Income likely to go up", mr: "उत्पन्न वाढण्याची शक्यता" } },
      { v: "same", icon: "➖", t: { en: "Stay about the same", mr: "साधारण तेवढेच राहील" }, sum: { en: "Income likely steady", mr: "उत्पन्न स्थिर राहण्याची शक्यता" } },
      { v: "unsure", icon: "🤷", t: { en: "Not sure, may go down", mr: "खात्री नाही, कमी होऊ शकते" }, sum: { en: "Income not sure", mr: "उत्पन्नाची खात्री नाही" } }
    ],
    skip: "preferNot"
  },
  {
    id: "land",
    when: { more: ["yes"] },
    q: { en: "Does the family own land?", mr: "कुटुंबाकडे स्वतःची जमीन आहे का?" },
    sub: { en: "Land can be part of how a family pays for studies.", mr: "शिक्षणाचा खर्च भागवण्यात जमिनीचाही वाटा असू शकतो." },
    options: [
      { v: "yes", icon: "🌱", t: { en: "Yes", mr: "हो" }, sum: { en: "Owns land", mr: "जमीन आहे" } },
      { v: "no", icon: "🏠", t: { en: "No", mr: "नाही" }, sum: { en: "No land", mr: "जमीन नाही" } }
    ],
    skip: "preferNot"
  }
];

export const MONEY_QUESTIONS = ["income", "trend", "land"];
