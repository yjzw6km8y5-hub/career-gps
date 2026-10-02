import type { Lang, Text } from "./data/types";

// Screen text that is not part of the data. Marathi was drafted and checked by Claude;
// a person must check it before families see it (DECISIONS.md, 2026-10-01).
export const STRINGS = {
  demoBanner: { en: "Demo · fictional family · every [bracket] is a figure we have not checked yet",
                mr: "डेमो · काल्पनिक कुटुंब · [कंसातील] आकडे अजून तपासलेले नाहीत" },
  translationNote: { en: "Marathi drafted and checked by AI (Claude). A person must check it before families see it.", mr: "मसुदा भाषांतर: AI (Claude) ने तयार करून तपासले. कुटुंबांना दाखवण्यापूर्वी एखाद्या व्यक्तीने तपासणे आवश्यक." },
  tagline: { en: "Swapna se Sankalp tak", mr: "स्वप्नापासून संकल्पापर्यंत" },
  languageGroup: { en: "Language", mr: "भाषा" },
  whoIsUsing: { en: "Who is using this?", mr: "हे कोण वापरत आहे?" },
  whoHint: { en: "Tap one. You can switch any time.", mr: "एकावर टॅप करा. कधीही बदलू शकता." },
  parent: { en: "Parent", mr: "पालक" },
  parentSub: { en: "Money, steps, dates", mr: "पैसे, पायऱ्या, तारखा" },
  child: { en: "Child", mr: "मूल" },
  childSub: { en: "Find your dream road", mr: "तुझ्या स्वप्नाचा रस्ता शोध" },
  listen: { en: "Listen", mr: "ऐका" },
  back: { en: "Back", mr: "मागे" },
  next: { en: "Next", mr: "पुढे" },
  skip: { en: "Skip", mr: "वगळा" },
  preferNot: { en: "Prefer not to say", mr: "सांगायचे नाही" },
  notSure: { en: "Not sure", mr: "माहीत नाही" },

  labelResearched: { en: "Researched", mr: "तपासलेले" },
  labelExample: { en: "Example · not yet checked", mr: "उदाहरण · अजून तपासलेले नाही" },
  labelPlanned: { en: "Planned · not built yet", mr: "नियोजित · अजून तयार नाही" },

  sourceNotChecked: { en: "Source: not checked yet", mr: "स्रोत: अजून तपासलेला नाही" },
  sourceAsOf: { en: "Source: {title}, as of {date}", mr: "स्रोत: {title}, {date} नुसार" },
  missingFigure: { en: "[missing figure]", mr: "[आकडा नाही]" },

  // country
  country: { en: "Country", mr: "देश" },
  whichCountry: { en: "Which country?", mr: "कोणता देश?" },
  countryPlannedTitle: { en: "{country}: coming later", mr: "{country}: नंतर येईल" },
  countryPlannedBody: { en: "We will add {country} only after its facts are checked. Until then, Career GPS shows India.",
                        mr: "{country}ची माहिती तपासल्यानंतरच हा देश जोडला जाईल. तोपर्यंत Career GPS भारताची माहिती दाखवते." },
  backToIndia: { en: "Use India", mr: "भारत वापरा" },

  // child: about
  hi: { en: "Hi {name}!", mr: "नमस्कार {name}!" },
  whichClass: { en: "Which class are you in?", mr: "तू कितवीत आहेस?" },
  classN: { en: "Class {n}", mr: "इयत्ता {n}" },
  lessClass: { en: "One class lower", mr: "एक इयत्ता कमी" },
  moreClass: { en: "One class higher", mr: "एक इयत्ता जास्त" },
  whatYouLove: { en: "What do you love doing?", mr: "तुला काय करायला आवडते?" },
  whatYouLoveSub: { en: "Tap all you like. Then tap Next. This is not a test.", mr: "आवडणारे सगळे निवड. मग पुढे दाबा. ही परीक्षा नाही." },
  childAboutFoot: { en: "Your answers stay on this screen. Nothing is saved.", mr: "तुझी उत्तरे इथेच राहतात. काहीही जतन होत नाही." },

  // child: dreams and road
  dreamQ: { en: "What do you dream of being?", mr: "तुला मोठेपणी काय व्हायचे आहे?" },
  youLike: { en: "You like: {list}", mr: "तुला आवडते: {list}" },
  letsGo: { en: "Let's go ▶", mr: "चला ▶" },
  comingSoon: { en: "🔒 Coming soon", mr: "🔒 लवकरच" },
  moreCareers: { en: "More careers: search is planned.", mr: "आणखी करिअर: शोध नियोजित आहे." },
  soonTitle: { en: "This road is being built", mr: "हा रस्ता तयार होत आहे" },
  soonBody: { en: "This road is still being drawn. Come back soon!", mr: "हा रस्ता अजून आखला जात आहे. लवकर परत ये!" },
  roadTitle: { en: "Your road to {career}", mr: "{career} होण्याचा तुझा रस्ता" },
  nextStop: { en: "Next stop", mr: "पुढचा थांबा" },
  quest1: { en: "Quest 1", mr: "पहिले काम" },
  quest1Text: { en: "Ask your science teacher: what do Biology students learn?", mr: "तुझ्या विज्ञानाच्या शिक्षकांना विचार: जीवशास्त्राचे विद्यार्थी काय शिकतात?" },
  questDone: { en: "Done!", mr: "झाले!" },
  starEarned: { en: "⭐ Star earned!", mr: "⭐ तारा मिळाला!" },
  roadFoot: { en: "Steps come from our draft path. Rules can change each year.", mr: "या पायऱ्या आमच्या मसुद्यातून आहेत. नियम दरवर्षी बदलू शकतात." },

  // parent: about
  aboutYou: { en: "About you", mr: "तुमच्याबद्दल" },
  questionOf: { en: "Question {n} of {total}", mr: "प्रश्न {n} / {total}" },
  notSaved: { en: "🔒 Demo: answers are not saved.", mr: "🔒 डेमो: उत्तरे जतन केली जात नाहीत." },
  aboutFoot: { en: "Questions are a first draft for testing with families.", mr: "हे प्रश्न कुटुंबांसोबत तपासण्यासाठीचा पहिला मसुदा आहेत." },
  partnerMother: { en: "Child’s father", mr: "मुलाचे वडील" },
  partnerFather: { en: "Child’s mother", mr: "मुलाची आई" },
  partnerOther: { en: "Child’s parent", mr: "मुलाचे आई किंवा वडील" },

  // parent: plan
  planKicker: { en: "{name}’s plan · {career} · {state}", mr: "{name}ची योजना · {career} · {state}" },
  changeAnswers: { en: "✏️ Change answers", mr: "✏️ उत्तरे बदला" },
  basedOn: { en: "Based on what you told us", mr: "तुम्ही सांगितलेल्या माहितीवरून" },
  about: { en: "About", mr: "सुमारे" },
  aMonth: { en: "a month (estimate)", mr: "दरमहा (अंदाज)" },
  notAdvice: { en: "Information, not financial advice.", mr: "ही माहिती आहे, आर्थिक सल्ला नाही." },
  whyShow: { en: "Where does this come from? ▼", mr: "हा आकडा कुठून आला? ▼" },
  whyHide: { en: "Hide details ▲", mr: "तपशील लपवा ▲" },
  seeRoad: { en: "See the road", mr: "रस्ता पाहा" },
  whereSave: { en: "Where to save", mr: "बचत कुठे करावी" },
  talkAdviser: { en: "Talk to an adviser", mr: "सल्लागाराशी बोला" },
  planFoot: { en: "Numbers stay as [brackets] until checked against official sources.", mr: "अधिकृत स्रोतांशी तपासेपर्यंत आकडे [कंसात] राहतात." },

  // parent: road
  roadStepByStep: { en: "The road, step by step", mr: "रस्ता, पायरी-पायरीने" },
  costsRules: { en: "Costs and rules", mr: "खर्च आणि नियम" },
  rulesChange: { en: "⚠ Rules can change. Check that year’s official notice.", mr: "⚠ नियम बदलू शकतात. त्या वर्षाची अधिकृत सूचना तपासा." },
  slideYears: { en: "🎚️ Slide through the years", mr: "🎚️ वर्षांमधून पुढे सरका" },

  // parent: life road (age slider skeleton)
  lifeRoadTitle: { en: "{name}’s life road", mr: "{name}च्या आयुष्याचा रस्ता" },
  lifeRoadHint: { en: "Move the slider to see each part of life.", mr: "आयुष्याचा प्रत्येक टप्पा पाहण्यासाठी स्लायडर सरकवा." },
  stageSchool: { en: "School", mr: "शाळा" },
  stageCollege: { en: "College", mr: "महाविद्यालय" },
  stageTraining: { en: "Specialist training", mr: "विशेष प्रशिक्षण" },
  stageWorking: { en: "Working", mr: "काम" },
  stageLater: { en: "Changing course later", mr: "पुढे दिशा बदलणे" },
  stageNow: { en: "Now: Class {n}", mr: "आत्ता: इयत्ता {n}" },
  nextStep: { en: "Next step:", mr: "पुढची पायरी:" },
  stagePlanned: { en: "Coming in a later build: what this part of life looks like, including career change, learning new skills and losing a job.",
                  mr: "पुढच्या आवृत्तीत येईल: आयुष्याचा हा टप्पा कसा असतो, त्यात करिअर बदल, नवी कौशल्ये शिकणे आणि नोकरी जाणे हेही." },
  lifeRoadFoot: { en: "No ages or years shown until durations are checked against official sources.", mr: "कालावधी अधिकृत स्रोतांशी तपासेपर्यंत वय किंवा वर्षे दाखवली जात नाहीत." },

  // parent: save
  saveLede: { en: "Three kinds of places. We explain them; we do not pick one for you.", mr: "बचतीचे तीन प्रकार. आम्ही ते समजावून सांगतो; तुमच्यासाठी निवड करत नाही." },
  saveNotice: { en: "Information only, not financial advice. Rates change; confirm with the provider before acting.",
                mr: "ही फक्त माहिती आहे, आर्थिक सल्ला नाही. दर बदलतात; निर्णयापूर्वी संबंधित बँक किंवा संस्थेकडून खात्री करा." },
  adviserBtn: { en: "🧑‍💼 Talk to a registered adviser", mr: "🧑‍💼 नोंदणीकृत सल्लागाराशी बोला" },
  saveFoot: { en: "Product details, rates and dates come in a later build.", mr: "योजनांचे तपशील, दर आणि तारखा पुढच्या आवृत्तीत येतील." },

  // parent: adviser
  adviserTitle: { en: "For a personal plan, talk to a registered adviser", mr: "स्वतःसाठी योजना हवी असल्यास नोंदणीकृत सल्लागाराशी बोला" },
  adviserBody1: { en: "In India, look for a SEBI-registered investment adviser. In Canada, a licensed adviser.",
                  mr: "भारतात SEBI-नोंदणीकृत गुंतवणूक सल्लागार शोधा. कॅनडामध्ये परवानाधारक सल्लागार." },
  adviserBody2: { en: "Career GPS gives information only. We never take money to show one bank or product above another.",
                  mr: "Career GPS फक्त माहिती देते. एखादी बँक किंवा योजना इतरांपेक्षा वर दाखवण्यासाठी आम्ही कधीही पैसे घेत नाही." },
  adviserFoot: { en: "A list of how to find one is not built yet.", mr: "सल्लागार कसा शोधावा याची यादी अजून तयार नाही." }
} satisfies Record<string, Text>;

export type StringKey = keyof typeof STRINGS;

/** Fills {name} style slots in a string. */
export function fill(text: string, vars: Record<string, string | number> = {}): string {
  return text.replace(/\{(\w+)\}/g, (whole, k) => (k in vars ? String(vars[k]) : whole));
}

export function pick(text: Text, lang: Lang): string {
  return text[lang] || text.en;
}

export function translate(lang: Lang, key: StringKey, vars?: Record<string, string | number>): string {
  return fill(pick(STRINGS[key], lang), vars);
}
