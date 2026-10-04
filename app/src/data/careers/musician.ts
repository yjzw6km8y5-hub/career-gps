// Musician pathway (Build 2). Runs on the same screens as the cardiologist, with no screen changes.
// Nothing here is researched yet: every claim is "example", every number a [placeholder], and every
// institution, exam board or scheme name that is not checked is written as "[to verify]".
import type { CareerPack } from "../schema";
import { buildTracks } from "../tracks";
import { exampleEvidence as ev, INDIA, MAHARASHTRA, placeholderFigure as fig, tx } from "../helpers";

const TO_FIND = (en: string, mr: string) => tx(`[${en}: source to find]`, `[${mr}: स्रोत शोधायचा आहे]`);
const ENTRY = tx("[Entry route, duration and fees: to be sourced]", "[प्रवेश मार्ग, कालावधी आणि शुल्क: स्रोत शोधायचा आहे]");
const YEARLY = tx("Re-check every year", "दरवर्षी पुन्हा तपासा");

const TRACKS = buildTracks("m", {
  examsIndia: tx("[Auditions and graded exams: to be sourced]", "[ऑडिशन आणि श्रेणी परीक्षा: स्रोत शोधायचा आहे]"),
  examsAbroad: tx("[Auditions, work permits or other requirements to perform abroad: to be sourced]", "[परदेशात सादरीकरणासाठी ऑडिशन, कामाचे परवाने किंवा इतर अटी: स्रोत शोधायचा आहे]"),
  examsReturn: tx("[Recognition of a degree from abroad in India: to be sourced]", "[परदेशी पदवीला भारतात मान्यता: स्रोत शोधायचा आहे]")
});

export const MUSICIAN: CareerPack = {
  career: {
    id: "musician", icon: "🎵",
    name: tx("Musician", "संगीत कलाकार"), formalName: tx("Musician", "संगीत कलाकार"),
    what: tx("Sings or plays music for people: on stage, in recordings, or by teaching.", "लोकांसाठी गाणे गातात किंवा वाद्य वाजवतात: रंगमंचावर, ध्वनिमुद्रणात किंवा शिकवून."),
    day: [
      { icon: "🎹", text: tx("Practises, often for hours", "सराव करतात, बहुतेक वेळा तासन्‌तास") },
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
    outcomesNote: tx("Reliable data on how many musicians earn a living from music is not available yet. Many combine performing, teaching and other work.",
                     "किती संगीत कलाकार संगीतातून उदरनिर्वाह करतात याची विश्वासार्ह माहिती अजून उपलब्ध नाही. अनेक जण सादरीकरण, शिकवणे आणि इतर कामे एकत्र करतात."),
    evidence: ["ev.m.reality", "ev.m.day", "ev.m.pay"]
  },

  stages: [
    { id: "m.learn", phase: "explore", icon: "🎶", doneFromClass: 9,
      name: tx("Start lessons with a teacher", "गुरू किंवा शिक्षकांकडे शिकायला सुरुवात"),
      detail: tx("Regular lessons, and a little practice every day.", "नियमित शिकवणी, आणि रोज थोडा सराव."),
      keepsValue: tx("Training stays useful for every music route, including teaching.", "हे प्रशिक्षण संगीताच्या प्रत्येक मार्गासाठी, शिकवण्यासाठीही, उपयोगी राहते."),
      evidence: ["ev.m.training"], figures: ["fig.m.lessons"] },
    { id: "m.exams", phase: "prepare", icon: "📜",
      name: tx("Graded music exams", "संगीताच्या श्रेणी परीक्षा"),
      detail: tx("[Which exam boards, and whether a course needs them: to verify]", "[कोणती परीक्षा मंडळे आणि अभ्यासक्रमासाठी त्यांची गरज आहे का: तपासायचे आहे]"),
      keepsValue: tx("Exam certificates may help when teaching later [to verify].", "नंतर शिकवताना परीक्षा प्रमाणपत्रे उपयोगी पडू शकतात [तपासायचे आहे]."),
      evidence: ["ev.m.exams"], figures: ["fig.m.examFees"] },
    { id: "m.perform", phase: "prepare", icon: "🎤",
      name: tx("Perform at school and local events", "शाळा आणि स्थानिक कार्यक्रमांत सादरीकरण"),
      detail: tx("Performing in front of people builds confidence and a record of your work.", "लोकांसमोर सादरीकरण केल्याने आत्मविश्वास वाढतो आणि तुमच्या कामाची नोंद तयार होते."),
      evidence: ["ev.m.training"], figures: [] },
    { id: "m.audition", phase: "apply", icon: "🎟️",
      name: tx("Audition for a music course", "संगीत अभ्यासक्रमासाठी ऑडिशन"),
      detail: tx("[Which colleges in {stateName} and India, and their audition rules: to verify]", "[{stateName} आणि भारतातील कोणती महाविद्यालये, आणि त्यांचे ऑडिशनचे नियम: तपासायचे आहे]"),
      evidence: ["ev.m.course"], figures: ["fig.m.auditionFees"] },
    { id: "m.course", phase: "train", icon: "🎓",
      name: tx("Music degree or diploma", "संगीतातील पदवी किंवा पदविका"),
      detail: tx("[Duration and fees: to verify]", "[कालावधी आणि शुल्क: तपासायचे आहे]"),
      evidence: ["ev.m.course"], figures: ["fig.m.fees"] },
    { id: "m.community", phase: "train", icon: "🏘️",
      name: tx("Government or community music classes", "सरकारी किंवा सामुदायिक संगीत वर्ग"),
      detail: tx("[Where they run in {stateName}, and their fees: to verify]", "[{stateName}: ते कुठे चालतात आणि त्यांचे शुल्क: तपासायचे आहे]"),
      evidence: ["ev.m.community"], figures: ["fig.m.community"] },
    { id: "m.result", phase: "reassess", icon: "📄",
      name: tx("Audition did not get a place", "ऑडिशनमधून प्रवेश मिळाला नाही"),
      detail: tx("It is a decision point, not the end.", "हा निर्णयाचा टप्पा आहे, शेवट नाही."),
      evidence: ["ev.m.course"], figures: [] },
    { id: "m.keepTraining", phase: "prepare", icon: "🔁",
      name: tx("Keep training and try again", "प्रशिक्षण सुरू ठेवा आणि पुन्हा प्रयत्न करा"),
      detail: tx("[How often auditions can be tried again: to verify for each college]", "[ऑडिशन किती वेळा पुन्हा देता येते: प्रत्येक महाविद्यालयासाठी तपासायचे आहे]"),
      evidence: ["ev.m.course"], figures: ["fig.m.lessons"] },
    { id: "m.related", phase: "train", icon: "🎧",
      name: tx("Course or training for a related music career", "संगीताशी संबंधित करिअरसाठी अभ्यासक्रम किंवा प्रशिक्षण"),
      detail: tx("Teaching, sound engineering or instrument repair. Entry rules vary: confirm for each.", "शिकवणे, ध्वनी अभियांत्रिकी किंवा वाद्य दुरुस्ती. प्रवेशाचे नियम वेगवेगळे असतात: प्रत्येकासाठी खात्री करा."),
      evidence: ["ev.m.adjacent"], figures: ["fig.m.relatedFees"] },
    { id: "m.work", phase: "enterWork", icon: "🎤",
      name: tx("Perform, record or teach", "सादरीकरण, ध्वनिमुद्रण किंवा शिकवणे"),
      detail: tx("Often a mix of several kinds of work.", "बहुतेक वेळा अनेक प्रकारच्या कामांचे मिश्रण."),
      evidence: ["ev.m.reality"], figures: ["pay.musician"] },
    { id: "m.review", phase: "reassess", icon: "🗓️",
      name: tx("Yearly review with family and teacher", "कुटुंब आणि शिक्षकांसोबत वार्षिक आढावा"),
      detail: tx("Look at progress, money and interest again, and adjust the plan.", "प्रगती, पैसे आणि आवड पुन्हा पाहा आणि योजनेत बदल करा."),
      evidence: [], figures: [] }
  ],

  gates: [
    { id: "m.g.path", afterStage: "m.learn",
      question: tx("Which way next: exams and a course, or community classes?", "पुढे कोणता मार्ग: परीक्षा आणि अभ्यासक्रम, की सामुदायिक वर्ग?"),
      options: [
        { id: "course", label: tx("Exams and a course", "परीक्षा आणि अभ्यासक्रम"), leadsTo: { carryOn: true } },
        { id: "community", label: tx("Community classes", "सामुदायिक वर्ग"), leadsTo: { route: "m.r.lower" } }
      ],
      review: tx("Once a year, with the teacher.", "वर्षातून एकदा, शिक्षकांसोबत."), evidence: ["ev.m.training"] },
    { id: "m.g.audition", afterStage: "m.audition",
      question: tx("Did the audition get a place?", "ऑडिशनमधून प्रवेश मिळाला का?"),
      options: [
        { id: "yes", label: tx("Yes", "हो"), leadsTo: { carryOn: true } },
        { id: "no", label: tx("No", "नाही"), leadsTo: { route: "m.r.after" } }
      ],
      review: tx("After the audition result.", "ऑडिशनच्या निकालानंतर."), evidence: ["ev.m.course"] },
    { id: "m.g.retry", afterStage: "m.result",
      question: tx("Try again, or move to a related music career?", "पुन्हा प्रयत्न करायचा, की संगीताशी संबंधित करिअरकडे वळायचे?"),
      options: [
        { id: "retry", label: tx("Try again", "पुन्हा प्रयत्न"), leadsTo: { route: "m.r.main" } },
        { id: "related", label: tx("Related career", "संबंधित करिअर"), leadsTo: { route: "m.r.adjacent" } }
      ],
      review: tx("Within a month of the result, as a family.", "निकालानंतर एका महिन्यात, कुटुंबाने मिळून."), evidence: ["ev.m.course"] }
  ],

  rules: [
    { id: "m.rule.audition", stage: "m.audition", evidence: ["ev.m.course"],
      text: tx("[Audition requirements for each course: to verify]", "[प्रत्येक अभ्यासक्रमासाठी ऑडिशनच्या अटी: तपासायच्या आहेत]") },
    { id: "m.rule.school", stage: "m.course", evidence: ["ev.m.course"],
      text: tx("[School qualification a music course needs: to verify]", "[संगीत अभ्यासक्रमासाठी लागणारी शालेय पात्रता: तपासायची आहे]") }
  ],

  routes: [
    { id: "m.r.main", kind: "main", icon: "🛣️",
      name: tx("Main route", "मुख्य मार्ग"),
      summary: tx("A teacher, graded exams, an audition, a music course, then work.", "गुरू, श्रेणी परीक्षा, ऑडिशन, संगीत अभ्यासक्रम, मग काम."),
      stages: ["m.learn", "m.exams", "m.perform", "m.audition", "m.course", "m.work", "m.review"],
      gates: ["m.g.path", "m.g.audition"], rules: ["m.rule.audition", "m.rule.school"],
      scenarios: ["m.sc.courseLocal", "m.sc.courseAway"], schemes: ["m.sch.state", "m.sch.central"],
      costLevel: "higher", prepBasis: "practice", prepDemand: "high", placeSensitive: true,
      evidence: ["ev.m.course", "ev.m.exams"] },
    { id: "m.r.lower", kind: "lowerCost", icon: "💰",
      name: tx("Lower-cost route", "कमी खर्चाचा मार्ग"),
      summary: tx("Government or community classes instead of private lessons, and performing locally.", "खाजगी शिकवणीऐवजी सरकारी किंवा सामुदायिक वर्ग, आणि स्थानिक सादरीकरण."),
      stages: ["m.learn", "m.community", "m.perform", "m.work", "m.review"],
      gates: ["m.g.path"], rules: [],
      scenarios: ["m.sc.community"], schemes: ["m.sch.state", "m.sch.central"],
      costLevel: "lower", prepBasis: "practice", prepDemand: "high", placeSensitive: false,
      evidence: ["ev.m.community"] },
    { id: "m.r.after", kind: "afterUnsuccessful", icon: "🔁",
      name: tx("If the audition doesn't work out", "ऑडिशनमध्ये यश न मिळाल्यास"),
      summary: tx("Keep training and try again, or move to a related music career. All training so far still counts.", "प्रशिक्षण सुरू ठेवा आणि पुन्हा प्रयत्न करा, किंवा संगीताशी संबंधित करिअरकडे वळा. आतापर्यंतचे सगळे प्रशिक्षण उपयोगी राहते."),
      stages: ["m.result", "m.keepTraining", "m.review"],
      gates: ["m.g.retry"], rules: ["m.rule.audition"],
      scenarios: ["m.sc.extraYear"], schemes: ["m.sch.central"],
      reuses: { route: "m.r.main", stages: ["m.learn", "m.exams", "m.perform"],
        note: tx("Lessons, exams and performances so far all still count.", "आतापर्यंतच्या शिकवण्या, परीक्षा आणि सादरीकरणे सगळे उपयोगी राहते.") },
      costLevel: "unknown", prepBasis: "practice", prepDemand: "high", placeSensitive: false,
      evidence: ["ev.m.course"] },
    { id: "m.r.adjacent", kind: "adjacent", icon: "🎧",
      name: tx("Related music careers", "संगीताशी संबंधित करिअर"),
      summary: tx("Music teacher, sound engineer or instrument repair.", "संगीत शिक्षक, ध्वनी अभियंता किंवा वाद्य दुरुस्ती."),
      stages: ["m.learn", "m.related", "m.work", "m.review"],
      gates: [], rules: [],
      scenarios: ["m.sc.related"], schemes: ["m.sch.central"],
      adjacent: ["m.adj.teacher", "m.adj.sound", "m.adj.repair"],
      reuses: { route: "m.r.main", stages: ["m.learn"],
        note: tx("Music lessons help in every related career [entry rules: to verify].", "संगीताच्या शिकवण्या प्रत्येक संबंधित करिअरमध्ये उपयोगी पडतात [प्रवेश नियम: तपासायचे आहेत].") },
      costLevel: "unknown", prepBasis: "practice", prepDemand: "medium", placeSensitive: false,
      evidence: ["ev.m.adjacent"] }
  ],

  scenarios: [
    { id: "m.sc.community", seat: "government", place: "local", evidence: ["ev.m.community"],
      name: tx("Community or government classes, near home", "सामुदायिक किंवा सरकारी वर्ग, घराजवळ"),
      lines: [{ label: tx("Classes", "वर्ग"), figure: "fig.m.community" }, { label: tx("Instrument", "वाद्य"), figure: "fig.m.instrument" }],
      low: "m.sc.community.low", high: "m.sc.community.high" },
    { id: "m.sc.courseLocal", seat: "other", place: "local", evidence: ["ev.m.course", "ev.m.training"],
      name: tx("Lessons and a music course, living at home", "शिकवणी आणि संगीत अभ्यासक्रम, घरी राहून"),
      lines: [
        { label: tx("Lessons", "शिकवणी"), figure: "fig.m.lessons" },
        { label: tx("Exam fees", "परीक्षा शुल्क"), figure: "fig.m.examFees" },
        { label: tx("Course fees", "अभ्यासक्रम शुल्क"), figure: "fig.m.fees" },
        { label: tx("Instrument", "वाद्य"), figure: "fig.m.instrument" }
      ], low: "m.sc.courseLocal.low", high: "m.sc.courseLocal.high" },
    { id: "m.sc.courseAway", seat: "other", place: "away", evidence: ["ev.m.course", "ev.m.living"],
      name: tx("Music course, studying away from home", "संगीत अभ्यासक्रम, घरापासून दूर शिक्षण"),
      lines: [
        { label: tx("Course fees", "अभ्यासक्रम शुल्क"), figure: "fig.m.fees" },
        { label: tx("Hostel and living", "वसतिगृह आणि राहण्याचा खर्च"), figure: "fig.m.living" },
        { label: tx("Instrument", "वाद्य"), figure: "fig.m.instrument" }
      ], low: "m.sc.courseAway.low", high: "m.sc.courseAway.high" },
    { id: "m.sc.extraYear", seat: "other", place: "any", evidence: ["ev.m.training"],
      name: tx("One more year of training", "आणखी एक प्रशिक्षणाचे वर्ष"),
      lines: [{ label: tx("Lessons", "शिकवणी"), figure: "fig.m.lessons" }, { label: tx("Audition fees", "ऑडिशन शुल्क"), figure: "fig.m.auditionFees" }],
      low: "m.sc.extraYear.low", high: "m.sc.extraYear.high" },
    { id: "m.sc.related", seat: "other", place: "any", evidence: ["ev.m.adjacent"],
      name: tx("Course for a related music career", "संबंधित संगीत करिअरसाठी अभ्यासक्रम"),
      lines: [{ label: tx("Course fees", "अभ्यासक्रम शुल्क"), figure: "fig.m.relatedFees" }],
      low: "m.sc.related.low", high: "m.sc.related.high" }
  ],

  schemes: [
    { id: "m.sch.state", states: ["MH"], dependsOn: ["income", "state"], amount: "fig.m.schState", evidence: ["ev.m.scheme"],
      name: tx("[State arts or culture scholarship: to research]", "[राज्याची कला किंवा संस्कृती शिष्यवृत्ती: शोधायची आहे]"),
      what: tx("Some states support young artists. Which schemes exist in {stateName} is not checked yet.", "काही राज्ये तरुण कलाकारांना मदत करतात. {stateName}: कोणत्या योजना आहेत ते अजून तपासलेले नाही."),
      portal: { name: tx("[Official portal: to find]", "[अधिकृत पोर्टल: शोधायचे आहे]"), url: "[placeholder]" } },
    { id: "m.sch.central", dependsOn: ["income"], amount: "fig.m.schCentral", evidence: ["ev.m.scheme"],
      name: tx("[Central government culture scholarship: to research]", "[केंद्र सरकारची संस्कृती शिष्यवृत्ती: शोधायची आहे]"),
      what: tx("The central government may support young artists. The schemes and their rules are not checked yet.", "केंद्र सरकार तरुण कलाकारांना मदत करू शकते. योजना आणि त्यांचे नियम अजून तपासलेले नाहीत."),
      portal: { name: tx("[Official portal: to find]", "[अधिकृत पोर्टल: शोधायचे आहे]"), url: "[placeholder]" } }
  ],

  adjacent: [
    { id: "m.adj.teacher", icon: "🧑‍🏫", fits: ["care"], evidence: ["ev.m.adjacent"],
      name: tx("Music teacher", "संगीत शिक्षक"), why: tx("Shares music with students every day.", "रोज विद्यार्थ्यांना संगीत शिकवतात."), entry: ENTRY },
    { id: "m.adj.sound", icon: "🎚️", fits: ["technology"], evidence: ["ev.m.adjacent"],
      name: tx("Sound engineer", "ध्वनी अभियंता"), why: tx("Records and mixes music with machines.", "यंत्रांच्या मदतीने संगीत ध्वनिमुद्रित करतात आणि मिसळतात."), entry: ENTRY },
    { id: "m.adj.repair", icon: "🔧", fits: ["technology"], evidence: ["ev.m.adjacent"],
      name: tx("Instrument maker or repairer", "वाद्य बनवणारे किंवा दुरुस्त करणारे"), why: tx("Keeps instruments playing.", "वाद्ये चालू स्थितीत ठेवतात."), entry: ENTRY }
  ],

  // First matching template per owner wins, so the most specific come first.
  actions: [
    { id: "m.a.child.retry", owner: "child", when: { entrance: ["notQualified"] }, due: { inDays: 14 },
      text: tx("Ask your teacher what to work on before the next audition", "पुढच्या ऑडिशनपूर्वी कशावर काम करायचे ते तुझ्या शिक्षकांना विचार"),
      reason: tx("A teacher can hear what to improve.", "काय सुधारायचे ते शिक्षकांना ऐकून कळते.") },
    { id: "m.a.child.tech", owner: "child", when: { interest: ["technology"] }, due: { inDays: 30 },
      text: tx("Try recording a song on a phone and listen back", "फोनवर एखादे गाणे ध्वनिमुद्रित करून पुन्हा ऐकून पाहा"),
      reason: tx("You said the technology side interests you.", "तंत्रज्ञानाची बाजू तुला आवडते, असे तू सांगितलेस.") },
    { id: "m.a.child.care", owner: "child", when: { interest: ["care"] }, due: { inDays: 30 },
      text: tx("Help a younger child learn a simple song", "एखाद्या लहान मुलाला सोपे गाणे शिकवायला मदत कर"),
      reason: tx("You said helping others learn interests you.", "इतरांना शिकायला मदत करणे तुला आवडते, असे तू सांगितलेस.") },
    { id: "m.a.child.practice", owner: "child", when: { practice: ["rarely", "sometimes"] }, due: { inDays: 14 },
      text: tx("Practise a little every day for two weeks and note it down", "दोन आठवडे रोज थोडा सराव कर आणि तो लिहून ठेव"),
      reason: tx("Regular practice is how musicians get ready.", "नियमित सरावानेच संगीत कलाकार तयार होतात.") },
    { id: "m.a.child.default", owner: "child", when: {}, due: { inDays: 30 },
      text: tx("Perform one song for family or at school this month", "या महिन्यात कुटुंबासमोर किंवा शाळेत एक गाणे सादर कर"),
      reason: tx("Performing early builds confidence.", "लवकर सादरीकरण केल्याने आत्मविश्वास वाढतो.") },

    { id: "m.a.parent.retry", owner: "parent", when: { entrance: ["notQualified"] }, due: { inDays: 30 },
      text: tx("Compare one more year of training with a related music course", "आणखी एक प्रशिक्षणाचे वर्ष आणि संबंधित संगीत अभ्यासक्रम यांची तुलना करा"),
      reason: tx("Both are open; the family decides together.", "दोन्ही पर्याय खुले आहेत; कुटुंब मिळून ठरवते.") },
    { id: "m.a.parent.tight", owner: "parent", when: { budget: ["tight"] }, due: { inDays: 30 },
      text: tx("Find out about government or community music classes near home", "घराजवळच्या सरकारी किंवा सामुदायिक संगीत वर्गांची माहिती घ्या"),
      reason: tx("Money is tight, and these may cost less [fees: to verify].", "पैसे कमी आहेत, आणि यांचा खर्च कमी असू शकतो [शुल्क: तपासायचे आहे].") },
    { id: "m.a.parent.default", owner: "parent", when: {}, due: { inDays: 30 },
      text: tx("Find a teacher and ask about regular lessons", "शिक्षक शोधा आणि नियमित शिकवणीबद्दल विचारा"),
      reason: tx("Regular lessons are the first step.", "नियमित शिकवणी ही पहिली पायरी आहे.") },

    { id: "m.a.school.retry", owner: "school", when: { entrance: ["notQualified"] }, due: { inDays: 30 },
      text: tx("Ask the music teacher which other courses or careers fit", "इतर कोणते अभ्यासक्रम किंवा करिअर जुळतात ते संगीत शिक्षकांना विचारा"),
      reason: tx("Teachers know where past students went.", "आधीचे विद्यार्थी कुठे गेले ते शिक्षकांना माहीत असते.") },
    { id: "m.a.school.default", owner: "school", when: {}, due: { inDays: 30 },
      text: tx("Ask the school about music activities and competitions", "शाळेतील संगीत उपक्रम आणि स्पर्धांबद्दल विचारा"),
      reason: tx("School events are a first stage to perform on.", "शाळेचे कार्यक्रम हे सादरीकरणाचे पहिले व्यासपीठ असते.") }
  ],

  tracks: TRACKS.tracks,

  figures: {
    ...TRACKS.figures,
    "time.m.main": fig(tx("Time on the main route", "मुख्य मार्गाचा कालावधी"), tx("[time, to be sourced]", "[कालावधी, स्रोत शोधायचा आहे]"), "years", "ev.m.course"),
    "pay.musician": fig(tx("Pay range for musicians", "संगीत कलाकारांच्या उत्पन्नाची श्रेणी"), tx("[pay range]", "[उत्पन्न श्रेणी]"), "INR/month", "ev.m.pay"),
    "fig.m.lessons": fig(tx("Lessons", "शिकवणी"), tx("[lesson fees]", "[शिकवणी शुल्क]"), "INR/month", "ev.m.training"),
    "fig.m.examFees": fig(tx("Graded exam fees", "श्रेणी परीक्षा शुल्क"), tx("[exam fees]", "[परीक्षा शुल्क]"), "INR", "ev.m.exams"),
    "fig.m.auditionFees": fig(tx("Audition fees", "ऑडिशन शुल्क"), tx("[audition fees]", "[ऑडिशन शुल्क]"), "INR", "ev.m.course"),
    "fig.m.fees": fig(tx("Music course fees", "संगीत अभ्यासक्रम शुल्क"), tx("[course fee range]", "[अभ्यासक्रम शुल्क श्रेणी]"), "INR/year", "ev.m.course"),
    "fig.m.community": fig(tx("Community class fees", "सामुदायिक वर्गाचे शुल्क"), tx("[class fees]", "[वर्ग शुल्क]"), "INR/month", "ev.m.community"),
    "fig.m.instrument": fig(tx("Instrument", "वाद्य"), tx("[instrument cost]", "[वाद्याचा खर्च]"), "INR", "ev.m.training"),
    "fig.m.living": fig(tx("Hostel and living", "वसतिगृह आणि राहण्याचा खर्च"), tx("[hostel and living, per year]", "[वसतिगृह आणि राहणे, दरवर्षी]"), "INR/year", "ev.m.living"),
    "fig.m.relatedFees": fig(tx("Related course fees", "संबंधित अभ्यासक्रम शुल्क"), tx("[course fee range]", "[अभ्यासक्रम शुल्क श्रेणी]"), "INR/year", "ev.m.adjacent"),
    "fig.m.schState": fig(tx("State scholarship amount", "राज्य शिष्यवृत्तीची रक्कम"), tx("[scholarship amount]", "[शिष्यवृत्ती रक्कम]"), "INR", "ev.m.scheme"),
    "fig.m.schCentral": fig(tx("Central scholarship amount", "केंद्रीय शिष्यवृत्तीची रक्कम"), tx("[scholarship amount]", "[शिष्यवृत्ती रक्कम]"), "INR", "ev.m.scheme"),
    "m.sc.community.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.m.community"),
    "m.sc.community.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.m.community"),
    "m.sc.courseLocal.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.m.course"),
    "m.sc.courseLocal.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.m.course"),
    "m.sc.courseAway.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.m.course"),
    "m.sc.courseAway.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.m.course"),
    "m.sc.extraYear.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.m.training"),
    "m.sc.extraYear.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.m.training"),
    "m.sc.related.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.m.adjacent"),
    "m.sc.related.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.m.adjacent")
  },

  evidence: [
    ...TRACKS.evidence,
    ev("ev.m.reality", tx("What musicians do.", "संगीत कलाकार काय करतात."), TO_FIND("Professional body or labour data", "व्यावसायिक संस्था किंवा रोजगार माहिती"), INDIA),
    ev("ev.m.day", tx("An example day of a musician.", "संगीत कलाकाराचा एक उदाहरणादाखल दिवस."), TO_FIND("Practitioner interviews, checked by a reviewer", "कलाकारांच्या मुलाखती, तज्ज्ञांनी तपासलेल्या"), MAHARASHTRA, tx("Re-check every two years", "दर दोन वर्षांनी पुन्हा तपासा")),
    ev("ev.m.pay", tx("What musicians earn.", "संगीत कलाकार किती कमावतात."), TO_FIND("Published pay survey", "प्रकाशित उत्पन्न सर्वेक्षण"), INDIA, YEARLY),
    ev("ev.m.training", tx("How musicians train, and what lessons and instruments cost.", "संगीत कलाकार प्रशिक्षण कसे घेतात, आणि शिकवणी व वाद्यांचा खर्च."), TO_FIND("Music teachers and schools", "संगीत शिक्षक आणि शाळा"), MAHARASHTRA, YEARLY),
    ev("ev.m.exams", tx("Graded music exams and their fees.", "संगीताच्या श्रेणी परीक्षा आणि त्यांचे शुल्क."), TO_FIND("Exam boards", "परीक्षा मंडळे"), INDIA, YEARLY),
    ev("ev.m.course", tx("Music courses, auditions, entry rules and fees.", "संगीत अभ्यासक्रम, ऑडिशन, प्रवेश नियम आणि शुल्क."), TO_FIND("Colleges and universities", "महाविद्यालये आणि विद्यापीठे"), MAHARASHTRA),
    ev("ev.m.community", tx("Government and community music classes, and their fees.", "सरकारी आणि सामुदायिक संगीत वर्ग, आणि त्यांचे शुल्क."), TO_FIND("State culture department and local bodies", "राज्याचा सांस्कृतिक विभाग आणि स्थानिक संस्था"), MAHARASHTRA, YEARLY),
    ev("ev.m.living", tx("Hostel and living costs for music students.", "संगीत विद्यार्थ्यांचा वसतिगृह आणि राहण्याचा खर्च."), TO_FIND("College hostel fee notices", "महाविद्यालय वसतिगृह शुल्क सूचना"), MAHARASHTRA),
    ev("ev.m.adjacent", tx("Related music careers and how to enter them.", "संगीताशी संबंधित करिअर आणि त्यांत प्रवेश कसा घ्यायचा."), TO_FIND("Course providers", "अभ्यासक्रम चालवणाऱ्या संस्था"), INDIA),
    ev("ev.m.scheme", tx("Scholarships for young artists.", "तरुण कलाकारांसाठी शिष्यवृत्ती."), TO_FIND("State and central culture departments", "राज्य आणि केंद्र सरकारचे सांस्कृतिक विभाग"), INDIA, tx("Re-check every scholarship year", "दर शिष्यवृत्ती वर्षी पुन्हा तपासा"))
  ],

  // Musician wording for shared screens: auditions and places, not entrance exams and seats.
  wording: {
    change_entrance: tx("Audition result", "ऑडिशनचा निकाल"),
    entrance_notYet: tx("Not done yet", "अजून दिली नाही"),
    entrance_qualified: tx("Got a place", "प्रवेश मिळाला"),
    entrance_notQualified: tx("Didn't get a place", "प्रवेश मिळाला नाही"),
    oppNotQualified: tx("The audition did not get a place this time.", "या वेळी ऑडिशनमधून प्रवेश मिळाला नाही."),
    oppActRetry: tx("Decide together: try again or a related music career.", "एकत्र ठरवा: पुन्हा प्रयत्न की संगीताशी संबंधित करिअर."),
    oppUnverified: tx("Places compared with applicants are not verified yet.", "अर्जदारांच्या तुलनेत प्रवेशाच्या जागा किती ते अजून तपासलेले नाही."),
    oppActSeats: tx("We will add checked numbers before families use this.", "कुटुंबांनी वापरण्यापूर्वी आम्ही तपासलेले आकडे जोडू."),
    oppLocal: tx("Learning near home only may leave few teachers or courses to choose from.", "फक्त घराजवळ शिकायचे ठरवल्यास शिक्षक किंवा अभ्यासक्रमांचे पर्याय कमी राहू शकतात."),
    oppActAway: tx("Find which teachers or courses are within reach.", "कोणते शिक्षक किंवा अभ्यासक्रम आवाक्यात आहेत ते शोधा."),
    affActLowerCost: tx("Look at the lower-cost route and any arts scholarships.", "कमी खर्चाचा मार्ग आणि कलांसाठी शिष्यवृत्ती पाहा.")
  }
};
