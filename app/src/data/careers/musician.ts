// Musician pathway: a SAMPLE that proves the pathway schema fits a non-medical career with
// no change to screen code. The full musician journey is Build 2 (feedback-2026-10-02-01).
// Nothing here is researched; every claim is "example" and every number a [placeholder].
import type { CareerPack } from "../schema";
import { exampleEvidence as ev, INDIA, placeholderFigure as fig, tx } from "../helpers";

const TO_FIND = tx("[Source to find]", "[स्रोत शोधायचा आहे]");
const ENTRY = tx("[Entry route, duration and fees: to be sourced]", "[प्रवेश मार्ग, कालावधी आणि शुल्क: स्रोत शोधायचा आहे]");

export const MUSICIAN: CareerPack = {
  career: {
    id: "musician", icon: "🎵",
    name: tx("Musician", "संगीत कलाकार"), formalName: tx("Musician", "संगीत कलाकार"),
    what: tx("Sings or plays music for people, on stage, in recordings or in teaching.", "लोकांसाठी गाणे गातात किंवा वाद्य वाजवतात: रंगमंचावर, ध्वनिमुद्रणात किंवा शिकवताना."),
    day: [
      { icon: "🎹", text: tx("Practises for hours", "तासन्‌तास सराव करतात") },
      { icon: "🎤", text: tx("Performs or records", "कार्यक्रम करतात किंवा ध्वनिमुद्रण करतात") },
      { icon: "🧑‍🏫", text: tx("Often teaches students too", "बहुतेक वेळा विद्यार्थ्यांना शिकवतातही") }
    ],
    attractions: [
      { id: "joy", icon: "😊", text: tx("Music makes me happy", "संगीतामुळे मला आनंद मिळतो") },
      { id: "stage", icon: "🎭", text: tx("Performing for people", "लोकांसमोर सादरीकरण") },
      { id: "create", icon: "✍️", text: tx("Making my own songs", "स्वतःची गाणी बनवणे") }
    ],
    payFigure: "pay.musician",
    timeFigure: "time.m.main",
    outcomesNote: tx("Reliable data on how many musicians earn a living from music is not available yet.", "किती संगीत कलाकार संगीतातून उदरनिर्वाह करतात याची विश्वासार्ह माहिती अजून उपलब्ध नाही."),
    evidence: ["ev.m.reality"]
  },
  stages: [
    { id: "m.learn", phase: "explore", icon: "🎶", name: tx("Learn with a teacher", "गुरू/शिक्षकांकडे शिकणे"), detail: tx("Regular lessons and daily practice.", "नियमित शिकवणी आणि रोजचा सराव."),
      keepsValue: tx("Training stays useful for teaching and other music jobs.", "हे प्रशिक्षण शिकवण्यासाठी आणि संगीतातील इतर कामांसाठी उपयोगी राहते."), evidence: ["ev.m.training"], figures: ["fig.m.lessons"] },
    { id: "m.exams", phase: "prepare", icon: "📜", name: tx("Graded music exams", "संगीताच्या श्रेणी परीक्षा"), detail: tx("[Which exam boards, and whether they are needed: to verify]", "[कोणती परीक्षा मंडळे आणि त्यांची गरज आहे का: तपासायचे आहे]"), evidence: ["ev.m.exams"], figures: [] },
    { id: "m.audition", phase: "apply", icon: "🎟️", name: tx("Audition for a music course", "संगीत अभ्यासक्रमासाठी ऑडिशन"), detail: tx("[Colleges and audition rules: to verify]", "[महाविद्यालये आणि ऑडिशनचे नियम: तपासायचे आहे]"), evidence: ["ev.m.course"], figures: [] },
    { id: "m.course", phase: "train", icon: "🎓", name: tx("Music degree or diploma", "संगीतातील पदवी किंवा पदविका"), detail: tx("[Duration: to verify]", "[कालावधी: तपासायचा आहे]"), evidence: ["ev.m.course"], figures: ["fig.m.fees"] },
    { id: "m.community", phase: "train", icon: "🏘️", name: tx("Government or community music classes", "सरकारी किंवा सामुदायिक संगीत वर्ग"), detail: tx("[Where they exist: to verify]", "[ते कुठे आहेत: तपासायचे आहे]"), evidence: ["ev.m.community"], figures: [] },
    { id: "m.result", phase: "reassess", icon: "📄", name: tx("Audition did not get a place", "ऑडिशनमधून प्रवेश मिळाला नाही"), detail: tx("A decision point, not the end.", "हा निर्णयाचा टप्पा आहे, शेवट नाही."), evidence: ["ev.m.course"], figures: [] },
    { id: "m.work", phase: "enterWork", icon: "🎤", name: tx("Perform, record or teach", "सादरीकरण, ध्वनिमुद्रण किंवा शिकवणे"), detail: tx("Often a mix of several kinds of work.", "बहुतेक वेळा अनेक प्रकारच्या कामांचे मिश्रण."), evidence: ["ev.m.reality"], figures: ["pay.musician"] },
    { id: "m.review", phase: "reassess", icon: "🗓️", name: tx("Yearly review with family and teacher", "कुटुंब आणि शिक्षकांसोबत वार्षिक आढावा"), detail: tx("Look at progress, money and interest again.", "प्रगती, पैसे आणि आवड पुन्हा पाहा."), evidence: [], figures: [] }
  ],
  gates: [
    { id: "m.g.audition", afterStage: "m.audition", question: tx("Did the audition get a place?", "ऑडिशनमधून प्रवेश मिळाला का?"),
      options: [{ id: "yes", label: tx("Yes", "हो"), leadsTo: { carryOn: true } }, { id: "no", label: tx("No", "नाही"), leadsTo: { route: "m.r.after" } }],
      review: tx("After the audition result.", "ऑडिशनच्या निकालानंतर."), evidence: ["ev.m.course"] }
  ],
  rules: [{ id: "m.rule.audition", stage: "m.audition", text: tx("[Audition requirements: to verify]", "[ऑडिशनच्या अटी: तपासायच्या आहेत]"), evidence: ["ev.m.course"] }],
  routes: [
    { id: "m.r.main", kind: "main", icon: "🛣️", name: tx("Main route", "मुख्य मार्ग"), summary: tx("Teacher, graded exams, a music course, then work.", "गुरू, श्रेणी परीक्षा, संगीत अभ्यासक्रम, मग काम."),
      stages: ["m.learn", "m.exams", "m.audition", "m.course", "m.work", "m.review"], gates: ["m.g.audition"], rules: ["m.rule.audition"],
      scenarios: ["m.sc.course"], schemes: ["m.sch.placeholder"], costLevel: "unknown", prepBasis: "practice", prepDemand: "high", placeSensitive: true, evidence: ["ev.m.course"] },
    { id: "m.r.lower", kind: "lowerCost", icon: "💰", name: tx("Lower-cost route", "कमी खर्चाचा मार्ग"), summary: tx("Government or community classes instead of private lessons.", "खाजगी शिकवणीऐवजी सरकारी किंवा सामुदायिक वर्ग."),
      stages: ["m.learn", "m.community", "m.work", "m.review"], gates: [], rules: [],
      scenarios: ["m.sc.community"], schemes: ["m.sch.placeholder"], costLevel: "lower", prepBasis: "practice", prepDemand: "high", placeSensitive: false, evidence: ["ev.m.community"] },
    { id: "m.r.after", kind: "afterUnsuccessful", icon: "🔁", name: tx("If the audition doesn't work out", "ऑडिशनमध्ये यश न मिळाल्यास"), summary: tx("Keep training and try again, or start teaching.", "प्रशिक्षण सुरू ठेवा आणि पुन्हा प्रयत्न करा, किंवा शिकवायला सुरुवात करा."),
      stages: ["m.result", "m.learn", "m.review"], gates: [], rules: [],
      scenarios: ["m.sc.community"], schemes: [], reuses: { route: "m.r.main", stages: ["m.learn", "m.exams"], note: tx("All training so far still counts.", "आतापर्यंतचे सगळे प्रशिक्षण उपयोगी राहते.") },
      costLevel: "unknown", prepBasis: "practice", prepDemand: "high", placeSensitive: false, evidence: ["ev.m.course"] },
    { id: "m.r.adjacent", kind: "adjacent", icon: "🎧", name: tx("Related music careers", "संगीताशी संबंधित करिअर"), summary: tx("Music teacher, sound engineer or instrument repair.", "संगीत शिक्षक, ध्वनी अभियंता किंवा वाद्य दुरुस्ती."),
      stages: ["m.learn", "m.course", "m.work", "m.review"], gates: [], rules: [],
      scenarios: ["m.sc.course"], schemes: [], adjacent: ["m.adj.teacher", "m.adj.sound", "m.adj.repair"],
      costLevel: "unknown", prepBasis: "practice", prepDemand: "medium", placeSensitive: false, evidence: ["ev.m.adjacent"] }
  ],
  scenarios: [
    { id: "m.sc.course", seat: "other", place: "any", name: tx("Music course", "संगीत अभ्यासक्रम"), lines: [{ label: tx("Course fees", "अभ्यासक्रम शुल्क"), figure: "fig.m.fees" }, { label: tx("Lessons", "शिकवणी"), figure: "fig.m.lessons" }], low: "m.sc.course.low", high: "m.sc.course.high", evidence: ["ev.m.course"] },
    { id: "m.sc.community", seat: "government", place: "local", name: tx("Community classes", "सामुदायिक वर्ग"), lines: [{ label: tx("Lessons", "शिकवणी"), figure: "fig.m.lessons" }], low: "m.sc.community.low", high: "m.sc.community.high", evidence: ["ev.m.community"] }
  ],
  schemes: [
    { id: "m.sch.placeholder", dependsOn: ["income"], amount: "fig.m.scholarship", evidence: ["ev.m.scheme"], name: tx("[Arts scholarships: to research]", "[कला शिष्यवृत्ती: शोधायच्या आहेत]"), what: tx("[To research]", "[शोधायचे आहे]"), portal: { name: tx("[Portal]", "[पोर्टल]"), url: "[placeholder]" } }
  ],
  adjacent: [
    { id: "m.adj.teacher", icon: "🧑‍🏫", fits: ["care"], name: tx("Music teacher", "संगीत शिक्षक"), why: tx("Shares music every day.", "रोज संगीत शिकवतात."), entry: ENTRY, evidence: ["ev.m.adjacent"] },
    { id: "m.adj.sound", icon: "🎚️", fits: ["technology"], name: tx("Sound engineer", "ध्वनी अभियंता"), why: tx("Works with music and machines.", "संगीत आणि यंत्रांसोबत काम करतात."), entry: ENTRY, evidence: ["ev.m.adjacent"] },
    { id: "m.adj.repair", icon: "🔧", fits: ["technology"], name: tx("Instrument repair", "वाद्य दुरुस्ती"), why: tx("Keeps instruments playing.", "वाद्ये चालू स्थितीत ठेवतात."), entry: ENTRY, evidence: ["ev.m.adjacent"] }
  ],
  actions: [
    { id: "m.a.child", owner: "child", when: {}, due: { inDays: 14 }, text: tx("Practise a little every day and note what you practised", "रोज थोडा सराव कर आणि काय सराव केलास ते लिहून ठेव"), reason: tx("Practice is how musicians get ready.", "सरावानेच संगीत कलाकार तयार होतात.") },
    { id: "m.a.parent", owner: "parent", when: {}, due: { inDays: 30 }, text: tx("Find out about music classes near home", "घराजवळच्या संगीत वर्गांची माहिती घ्या"), reason: tx("Regular lessons are the first step.", "नियमित शिकवणी ही पहिली पायरी आहे.") },
    { id: "m.a.school", owner: "school", when: {}, due: { inDays: 30 }, text: tx("Ask the school about music activities and competitions", "शाळेतील संगीत उपक्रम आणि स्पर्धांबद्दल विचारा"), reason: tx("Performing early builds confidence.", "लवकर सादरीकरण केल्याने आत्मविश्वास वाढतो.") }
  ],
  figures: {
    "time.m.main": fig(tx("Time on the main route", "मुख्य मार्गाचा कालावधी"), tx("[time, to be sourced]", "[कालावधी, स्रोत शोधायचा आहे]"), "years", "ev.m.course"),
    "pay.musician": fig(tx("Pay range for musicians", "संगीत कलाकारांच्या उत्पन्नाची श्रेणी"), tx("[pay range]", "[उत्पन्न श्रेणी]"), "INR/month", "ev.m.reality"),
    "fig.m.lessons": fig(tx("Lessons", "शिकवणी"), tx("[lesson fees]", "[शिकवणी शुल्क]"), "INR/month", "ev.m.training"),
    "fig.m.fees": fig(tx("Music course fees", "संगीत अभ्यासक्रम शुल्क"), tx("[course fee range]", "[अभ्यासक्रम शुल्क श्रेणी]"), "INR/year", "ev.m.course"),
    "fig.m.scholarship": fig(tx("Scholarship amount", "शिष्यवृत्तीची रक्कम"), tx("[scholarship amount]", "[शिष्यवृत्ती रक्कम]"), "INR", "ev.m.scheme"),
    "m.sc.course.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.m.course"),
    "m.sc.course.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.m.course"),
    "m.sc.community.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.m.community"),
    "m.sc.community.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.m.community")
  },
  evidence: [
    ev("ev.m.reality", tx("What musicians do and earn.", "संगीत कलाकार काय करतात आणि किती कमावतात."), TO_FIND, INDIA),
    ev("ev.m.training", tx("How musicians train.", "संगीत कलाकार प्रशिक्षण कसे घेतात."), TO_FIND, INDIA),
    ev("ev.m.exams", tx("Graded music exams.", "संगीताच्या श्रेणी परीक्षा."), TO_FIND, INDIA),
    ev("ev.m.course", tx("Music courses and auditions.", "संगीत अभ्यासक्रम आणि ऑडिशन."), TO_FIND, INDIA),
    ev("ev.m.community", tx("Government and community music classes.", "सरकारी आणि सामुदायिक संगीत वर्ग."), TO_FIND, INDIA),
    ev("ev.m.adjacent", tx("Related music careers.", "संगीताशी संबंधित करिअर."), TO_FIND, INDIA),
    ev("ev.m.scheme", tx("Scholarships for the arts.", "कलांसाठी शिष्यवृत्ती."), TO_FIND, INDIA)
  ],
  // Musician wording for shared screens: auditions and places, not entrance exams and seats.
  wording: {
    change_entrance: tx("Audition result", "ऑडिशनचा निकाल"),
    entrance_notYet: tx("Not done yet", "अजून दिली नाही"),
    entrance_qualified: tx("Got a place", "प्रवेश मिळाला"),
    entrance_notQualified: tx("Didn't get a place", "प्रवेश मिळाला नाही"),
    oppNotQualified: tx("The audition did not get a place this time.", "या वेळी ऑडिशनमधून प्रवेश मिळाला नाही."),
    oppUnverified: tx("Places compared with applicants are not verified yet.", "अर्जदारांच्या तुलनेत प्रवेशाच्या जागा किती ते अजून तपासलेले नाही."),
    oppActSeats: tx("We will add checked numbers before families use this.", "कुटुंबांनी वापरण्यापूर्वी आम्ही तपासलेले आकडे जोडू."),
    oppLocal: tx("Learning near home only may leave few teachers or courses to choose from.", "फक्त घराजवळ शिकायचे ठरवल्यास शिक्षक किंवा अभ्यासक्रमांचे पर्याय कमी राहू शकतात."),
    oppActAway: tx("Find which teachers or courses are within reach.", "कोणते शिक्षक किंवा अभ्यासक्रम आवाक्यात आहेत ते शोधा.")
  }
};
