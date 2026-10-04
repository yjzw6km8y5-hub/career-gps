// Cardiologist pathway (India, Maharashtra pilot). Steps follow the cardiologist-path Final draft
// (packet-2026-10-01-cardiologist-path.md). Every claim is "example" until a named person checks it
// against an official source. Every number is a [placeholder].
import type { CareerPack } from "../schema";
import { buildTracks } from "../tracks";
import { exampleEvidence as ev, INDIA, MAHARASHTRA, placeholderFigure as fig, tx } from "../helpers";

const OFFICIAL = (en: string, mr: string) => tx(`[${en}: official source to attach]`, `[${mr}: अधिकृत स्रोत जोडायचा आहे]`);

const TRACKS = buildTracks("c", {
  examsIndia: tx("[Entrance exam and any later exams: to be sourced]", "[प्रवेश परीक्षा आणि नंतरच्या परीक्षा: स्रोत शोधायचा आहे]"),
  examsAbroad: tx("[Licensing exams to practise abroad: to be sourced]", "[परदेशात व्यवसाय करण्यासाठी परवाना परीक्षा: स्रोत शोधायचा आहे]"),
  examsReturn: tx("[Exams to practise in India after a degree abroad: to be sourced]", "[परदेशी पदवीनंतर भारतात व्यवसायासाठी परीक्षा: स्रोत शोधायचा आहे]")
});

export const CARDIOLOGIST: CareerPack = {
  career: {
    id: "cardiologist",
    icon: "🩺",
    name: tx("Heart doctor", "हृदयाचे डॉक्टर"),
    formalName: tx("Cardiologist", "हृदयरोगतज्ज्ञ (कार्डिओलॉजिस्ट)"),
    what: tx("A doctor who finds and treats problems of the heart and blood vessels.",
             "हृदय आणि रक्तवाहिन्यांचे आजार शोधून त्यांवर उपचार करणारे डॉक्टर."),
    day: [
      { icon: "🧑‍⚕️", text: tx("Sees patients and listens to their problems", "रुग्णांना भेटतात आणि त्यांच्या तक्रारी ऐकतात") },
      { icon: "📈", text: tx("Does heart tests and reads the results", "हृदयाच्या चाचण्या करतात आणि निकाल वाचतात") },
      { icon: "🚑", text: tx("Is sometimes called in for emergencies", "कधी कधी आणीबाणीच्या वेळी बोलावले जाते") }
    ],
    attractions: [
      { id: "help", icon: "🤝", text: tx("Helping people get well", "लोकांना बरे होण्यास मदत करणे") },
      { id: "science", icon: "🔬", text: tx("Science and how the body works", "विज्ञान आणि शरीर कसे काम करते") },
      { id: "respect", icon: "⭐", text: tx("A respected job", "मान असलेले काम") }
    ],
    payFigure: "pay.cardiologist",
    timeFigure: "time.main",
    outcomesNote: tx("Reliable data on how many who start become cardiologists is not available yet.",
                     "सुरुवात करणाऱ्यांपैकी किती जण हृदयरोगतज्ज्ञ होतात याची विश्वासार्ह माहिती अजून उपलब्ध नाही."),
    evidence: ["ev.reality", "ev.day", "ev.pay"]
  },

  stages: [
    { id: "s.school", phase: "prepare", icon: "📘", doneFromClass: 11,
      name: tx("Finish Class 10", "दहावी पूर्ण करा"),
      detail: tx("Class 10 through a recognised board or an accepted equivalent route.", "मान्यताप्राप्त मंडळातून किंवा मान्य समकक्ष मार्गाने दहावी."),
      keepsValue: tx("Class 10 counts for every route.", "दहावी प्रत्येक मार्गासाठी उपयोगी पडते."),
      evidence: ["ev.board"], figures: [] },
    { id: "s.subjects", phase: "decideSubjects", icon: "🧭", doneFromClass: 11,
      name: tx("Choose Science with Biology", "जीवशास्त्रासह विज्ञान निवडा"),
      detail: tx("For Class 11–12: Physics, Chemistry, Biology/Biotechnology and English.", "अकरावी–बारावीसाठी: भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र/जैवतंत्रज्ञान आणि इंग्रजी."),
      keepsValue: tx("These subjects may also keep other healthcare courses open [which ones: to verify].", "हे विषय इतर आरोग्य अभ्यासक्रमांचे दरवाजेही उघडे ठेवू शकतात [कोणते: तपासायचे आहे]."),
      evidence: ["ev.stream"], figures: [] },
    { id: "s.class12", phase: "prepare", icon: "🧪",
      name: tx("Class 11–12 Science", "अकरावी–बारावी विज्ञान"),
      detail: tx("{stateName}: Class 12 ends with the {class12Name} exam. Minimum marks are needed.", "{stateName}: बारावीच्या शेवटी {class12Name} परीक्षा होते. किमान गुण आवश्यक असतात."),
      evidence: ["ev.stream", "ev.minmarks"], figures: ["fig.minMarks"] },
    { id: "s.neetug", phase: "apply", icon: "✏️",
      name: tx("NEET-UG entrance exam", "NEET-UG प्रवेश परीक्षा"),
      detail: tx("Conducted by NTA, once a year. It is the entrance exam for MBBS seats.", "NTA दरवर्षी एकदा घेते. MBBS जागांसाठी ही प्रवेश परीक्षा आहे."),
      evidence: ["ev.neet"], figures: ["fig.examFees"] },
    { id: "s.counselling", phase: "apply", icon: "🪑",
      name: tx("Seat counselling", "जागा वाटप (कौन्सेलिंग)"),
      detail: tx("MCC for All-India Quota and some national, central and deemed-university seats; {stateCounselling} for {stateName} state-quota seats.",
                 "अखिल भारतीय कोटा आणि काही राष्ट्रीय, केंद्रीय व अभिमत विद्यापीठांच्या जागांसाठी MCC; {stateName} राज्य कोट्याच्या जागांसाठी {stateCounselling}."),
      evidence: ["ev.counselling"], figures: ["fig.seats"] },
    { id: "s.stateQuota", phase: "apply", icon: "🏛️",
      name: tx("Aim for a government seat", "सरकारी जागेचे लक्ष्य ठेवा"),
      detail: tx("Government seats cost far less than private seats. In {stateName}, state-quota seats go through {stateCounselling}.",
                 "सरकारी जागांचा खर्च खाजगी जागांपेक्षा खूप कमी असतो. {stateName} राज्य कोट्याच्या जागा {stateCounselling} मार्फत मिळतात."),
      evidence: ["ev.govtCheaper", "ev.counselling"], figures: ["fig.feeGovt"] },
    { id: "s.mbbs", phase: "train", icon: "🏥",
      name: tx("MBBS, then a compulsory internship", "MBBS, नंतर अनिवार्य इंटर्नशिप"),
      detail: tx("After the internship, registration with the medical council, under the rules then in force.", "इंटर्नशिपनंतर, त्या वेळच्या नियमांनुसार वैद्यकीय परिषदेकडे नोंदणी."),
      keepsValue: tx("General physician is a related career after MBBS [registration rules: to verify].", "MBBS नंतर सामान्य डॉक्टर (जनरल फिजिशियन) हे जवळचे करिअर आहे [नोंदणीचे नियम: तपासायचे आहेत]."),
      evidence: ["ev.mbbs"], figures: ["fig.feeGovt", "fig.feePrivate"] },
    { id: "s.pg", phase: "train", icon: "🩺",
      name: tx("MD / DNB General Medicine", "MD / DNB जनरल मेडिसिन"),
      detail: tx("Through NEET-PG (NBEMS), or NExT if it replaces it.", "NEET-PG (NBEMS) द्वारे, किंवा तिच्या जागी NExT आल्यास त्याद्वारे."),
      evidence: ["ev.pg"], figures: [] },
    { id: "s.ss", phase: "train", icon: "❤️",
      name: tx("DM / DrNB Cardiology", "DM / DrNB कार्डिओलॉजी"),
      detail: tx("Through NEET-SS and super-specialty counselling.", "NEET-SS आणि सुपर-स्पेशालिटी कौन्सेलिंगद्वारे."),
      evidence: ["ev.ss"], figures: [] },
    { id: "s.work", phase: "enterWork", icon: "💼",
      name: tx("Work as a cardiologist", "हृदयरोगतज्ज्ञ म्हणून काम"),
      detail: tx("In a hospital or clinic. Pay range: see career reality.", "रुग्णालयात किंवा दवाखान्यात. पगाराची श्रेणी: करिअरची वास्तविकता पाहा."),
      evidence: ["ev.reality"], figures: ["pay.cardiologist"] },
    { id: "s.result", phase: "reassess", icon: "📄",
      name: tx("NEET-UG result did not give a seat", "NEET-UG निकालातून जागा मिळाली नाही"),
      detail: tx("It is a decision point, not the end.", "हा निर्णयाचा टप्पा आहे, शेवट नाही."),
      evidence: ["ev.neet"], figures: [] },
    { id: "s.retryYear", phase: "prepare", icon: "🔁",
      name: tx("Prepare again for another attempt", "पुढच्या प्रयत्नासाठी पुन्हा तयारी"),
      detail: tx("Allowed attempts and age rules must be checked in that year's NTA bulletin.", "किती प्रयत्न आणि वयाचे नियम त्या वर्षीच्या NTA माहितीपत्रकात तपासावे लागतात."),
      evidence: ["ev.retry"], figures: ["fig.retryYear"] },
    { id: "s.allied", phase: "train", icon: "🫀",
      name: tx("Healthcare degree or diploma", "आरोग्य क्षेत्रातील पदवी किंवा पदविका"),
      detail: tx("Nursing, physiotherapy, cardiac technology or perfusion. Entry rules vary: confirm for each course.", "नर्सिंग, फिजिओथेरपी, कार्डिॲक तंत्रज्ञान किंवा परफ्युजन. प्रवेशाचे नियम वेगवेगळे असतात: प्रत्येक अभ्यासक्रमासाठी खात्री करा."),
      evidence: ["ev.adjacent"], figures: ["fig.feeAllied"] },
    { id: "s.alliedWork", phase: "enterWork", icon: "🤝",
      name: tx("Work in a heart-care team", "हृदयरोग उपचार पथकात काम"),
      detail: tx("In hospitals, clinics and test centres.", "रुग्णालये, दवाखाने आणि चाचणी केंद्रांमध्ये."),
      evidence: ["ev.adjacent"], figures: [] },
    { id: "s.review", phase: "reassess", icon: "🗓️",
      name: tx("Yearly review with family and teacher", "कुटुंब आणि शिक्षकांसोबत वार्षिक आढावा"),
      detail: tx("Look at marks, money and interest again, and adjust the plan.", "गुण, पैसे आणि आवड पुन्हा पाहा आणि योजनेत बदल करा."),
      evidence: [], figures: [] }
  ],

  gates: [
    { id: "g.subjects", afterStage: "s.school",
      question: tx("Which subjects in Class 11?", "अकरावीत कोणते विषय?"),
      options: [
        { id: "pcb", label: tx("Science with Biology", "जीवशास्त्रासह विज्ञान"), leadsTo: { carryOn: true } },
        { id: "unsure", label: tx("Not sure yet", "अजून ठरले नाही"), leadsTo: { carryOn: true } }
      ],
      review: tx("Decide before Class 11 admissions.", "अकरावीच्या प्रवेशापूर्वी ठरवा."), evidence: ["ev.stream"] },
    { id: "g.neet", afterStage: "s.neetug",
      question: tx("Did the NEET-UG result give a seat?", "NEET-UG निकालातून जागा मिळाली का?"),
      options: [
        { id: "yes", label: tx("Yes", "हो"), leadsTo: { carryOn: true } },
        { id: "no", label: tx("No", "नाही"), leadsTo: { route: "r.afterUnsuccessful" } }
      ],
      review: tx("Right after the result.", "निकाल लागल्यावर लगेच."), evidence: ["ev.neet"] },
    { id: "g.retry", afterStage: "s.result",
      question: tx("Try again, or switch to a related career?", "पुन्हा प्रयत्न करायचा, की जवळच्या करिअरकडे वळायचे?"),
      options: [
        { id: "retry", label: tx("Try again", "पुन्हा प्रयत्न"), leadsTo: { route: "r.main" } },
        { id: "switch", label: tx("Related career", "जवळचे करिअर"), leadsTo: { route: "r.adjacent" } }
      ],
      review: tx("Within two weeks of the result, as a family.", "निकालानंतर दोन आठवड्यांत, कुटुंबाने मिळून."), evidence: ["ev.retry"] },
    { id: "g.pg", afterStage: "s.mbbs",
      question: tx("Specialise, or work as a doctor now?", "विशेषज्ञ व्हायचे, की आत्ताच डॉक्टर म्हणून काम करायचे?"),
      options: [
        { id: "specialise", label: tx("Specialise", "विशेषज्ञ व्हायचे"), leadsTo: { carryOn: true } },
        { id: "work", label: tx("Work as a general physician", "सामान्य डॉक्टर म्हणून काम"), leadsTo: { route: "r.adjacent" } }
      ],
      review: tx("During the internship.", "इंटर्नशिपदरम्यान."), evidence: ["ev.pg"] }
  ],

  rules: [
    { id: "rule.stream", stage: "s.class12", needsStream: "pcb", evidence: ["ev.stream"],
      text: tx("Physics, Chemistry, Biology/Biotechnology and English in Class 11–12.", "अकरावी–बारावीत भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र/जैवतंत्रज्ञान आणि इंग्रजी.") },
    { id: "rule.marks", stage: "s.class12", evidence: ["ev.minmarks"],
      text: tx("Minimum Class 12 marks for NEET-UG, by category: [verified requirement].", "NEET-UG साठी बारावीतील किमान गुण, प्रवर्गानुसार: [तपासलेली अट].") },
    { id: "rule.age", stage: "s.neetug", evidence: ["ev.age"],
      text: tx("Age rule for the admission year: [check the NTA bulletin].", "प्रवेश वर्षासाठी वयाचा नियम: [NTA माहितीपत्रक तपासा].") }
  ],

  routes: [
    { id: "r.main", kind: "main", icon: "🛣️",
      name: tx("Main route", "मुख्य मार्ग"),
      summary: tx("MBBS, then MD, then DM Cardiology. Government or private seat.", "MBBS, नंतर MD, नंतर DM कार्डिओलॉजी. सरकारी किंवा खाजगी जागा."),
      stages: ["s.school", "s.subjects", "s.class12", "s.neetug", "s.counselling", "s.mbbs", "s.pg", "s.ss", "s.work", "s.review"],
      gates: ["g.subjects", "g.neet", "g.pg"], rules: ["rule.stream", "rule.marks", "rule.age"],
      scenarios: ["sc.govtLocal", "sc.govtAway", "sc.privateAway"], schemes: ["sch.stateQuota", "sch.mahadbt", "sch.nsp"],
      costLevel: "higher", prepBasis: "marks", prepDemand: "high", placeSensitive: true,
      evidence: ["ev.neet", "ev.counselling", "ev.mbbs", "ev.pg", "ev.ss", "ev.seats"] },
    { id: "r.lowerCost", kind: "lowerCost", icon: "💰",
      name: tx("Lower-cost route", "कमी खर्चाचा मार्ग"),
      summary: tx("Same exams, but aiming for a government seat, near home where possible, with scholarships.", "त्याच परीक्षा, पण सरकारी जागेचे लक्ष्य, शक्य असल्यास घराजवळ, शिष्यवृत्तीसह."),
      stages: ["s.school", "s.subjects", "s.class12", "s.neetug", "s.stateQuota", "s.mbbs", "s.pg", "s.ss", "s.work", "s.review"],
      gates: ["g.subjects", "g.neet", "g.pg"], rules: ["rule.stream", "rule.marks", "rule.age"],
      scenarios: ["sc.govtLocal", "sc.govtAway"], schemes: ["sch.stateQuota", "sch.mahadbt", "sch.nsp"],
      costLevel: "lower", prepBasis: "marks", prepDemand: "high", placeSensitive: true,
      evidence: ["ev.govtCheaper", "ev.counselling", "ev.mahadbt", "ev.seats"] },
    { id: "r.afterUnsuccessful", kind: "afterUnsuccessful", icon: "🔁",
      name: tx("If the entrance exam doesn't work out", "प्रवेश परीक्षेत यश न मिळाल्यास"),
      summary: tx("Prepare again for another attempt, or move to a related healthcare career. Earlier study still counts.", "पुढच्या प्रयत्नासाठी पुन्हा तयारी, किंवा जवळच्या आरोग्य करिअरकडे वळा. आधीचा अभ्यास वाया जात नाही."),
      stages: ["s.result", "s.retryYear", "s.review"],
      gates: ["g.retry"], rules: ["rule.age"],
      scenarios: ["sc.retryYear"], schemes: ["sch.nsp"],
      reuses: { route: "r.main", stages: ["s.school", "s.subjects", "s.class12"],
        note: tx("Class 10, the Science subjects and Class 12 all still count.", "दहावी, विज्ञान विषय आणि बारावी हे सगळे उपयोगी राहते.") },
      costLevel: "unknown", prepBasis: "marks", prepDemand: "high", placeSensitive: false,
      evidence: ["ev.retry"] },
    { id: "r.adjacent", kind: "adjacent", icon: "🫀",
      name: tx("Related healthcare careers", "जवळची आरोग्य करिअर"),
      summary: tx("Work with the heart in other roles: technologist, nurse, physiotherapist, perfusionist, or general physician.", "इतर भूमिकांमधून हृदयासाठी काम: तंत्रज्ञ, नर्स, फिजिओथेरपिस्ट, परफ्युजनिस्ट किंवा सामान्य डॉक्टर."),
      stages: ["s.school", "s.subjects", "s.class12", "s.allied", "s.alliedWork", "s.review"],
      gates: ["g.subjects"], rules: ["rule.stream"],
      scenarios: ["sc.allied"], schemes: ["sch.mahadbt", "sch.nsp"],
      adjacent: ["adj.physician", "adj.technologist", "adj.perfusionist", "adj.nurse", "adj.physio"],
      reuses: { route: "r.main", stages: ["s.school", "s.subjects", "s.class12"],
        note: tx("Class 10 and Class 11–12 Science study still count here [entry rules: to verify].", "दहावी आणि अकरावी–बारावी विज्ञानाचा अभ्यास इथेही उपयोगी राहतो [प्रवेश नियम: तपासायचे आहेत].") },
      costLevel: "unknown", prepBasis: "marks", prepDemand: "medium", placeSensitive: false,
      evidence: ["ev.adjacent"] }
  ],

  scenarios: [
    { id: "sc.govtLocal", seat: "government", place: "local", evidence: ["ev.govtCheaper", "ev.fees"],
      name: tx("Government seat, living at home", "सरकारी जागा, घरी राहून"),
      lines: [
        { label: tx("College fees", "महाविद्यालय शुल्क"), figure: "fig.feeGovt" },
        { label: tx("Coaching, if any", "शिकवणी, असल्यास"), figure: "fig.coaching" },
        { label: tx("Exam and application fees", "परीक्षा आणि अर्ज शुल्क"), figure: "fig.examFees" }
      ], low: "sc.govtLocal.low", high: "sc.govtLocal.high" },
    { id: "sc.govtAway", seat: "government", place: "away", evidence: ["ev.govtCheaper", "ev.fees", "ev.living"],
      name: tx("Government seat, studying away from home", "सरकारी जागा, घरापासून दूर शिक्षण"),
      lines: [
        { label: tx("College fees", "महाविद्यालय शुल्क"), figure: "fig.feeGovt" },
        { label: tx("Hostel and living", "वसतिगृह आणि राहण्याचा खर्च"), figure: "fig.hostel" },
        { label: tx("Travel", "प्रवास"), figure: "fig.travel" },
        { label: tx("Coaching, if any", "शिकवणी, असल्यास"), figure: "fig.coaching" }
      ], low: "sc.govtAway.low", high: "sc.govtAway.high" },
    { id: "sc.privateAway", seat: "private", place: "away", evidence: ["ev.fees", "ev.living"],
      name: tx("Private seat, studying away from home", "खाजगी जागा, घरापासून दूर शिक्षण"),
      lines: [
        { label: tx("College fees", "महाविद्यालय शुल्क"), figure: "fig.feePrivate" },
        { label: tx("Hostel and living", "वसतिगृह आणि राहण्याचा खर्च"), figure: "fig.hostel" },
        { label: tx("Travel", "प्रवास"), figure: "fig.travel" },
        { label: tx("Coaching, if any", "शिकवणी, असल्यास"), figure: "fig.coaching" }
      ], low: "sc.privateAway.low", high: "sc.privateAway.high" },
    { id: "sc.retryYear", seat: "other", place: "any", evidence: ["ev.retry"],
      name: tx("One more preparation year", "आणखी एक तयारीचे वर्ष"),
      lines: [
        { label: tx("Preparation and coaching", "तयारी आणि शिकवणी"), figure: "fig.retryYear" },
        { label: tx("Exam and application fees", "परीक्षा आणि अर्ज शुल्क"), figure: "fig.examFees" }
      ], low: "sc.retryYear.low", high: "sc.retryYear.high" },
    { id: "sc.allied", seat: "other", place: "any", evidence: ["ev.adjacent"],
      name: tx("Healthcare degree or diploma", "आरोग्य क्षेत्रातील पदवी किंवा पदविका"),
      lines: [
        { label: tx("Course fees", "अभ्यासक्रम शुल्क"), figure: "fig.feeAllied" },
        { label: tx("Hostel and living", "वसतिगृह आणि राहण्याचा खर्च"), figure: "fig.hostel" }
      ], low: "sc.allied.low", high: "sc.allied.high" }
  ],

  schemes: [
    { id: "sch.stateQuota", states: ["MH"], dependsOn: ["governmentSeat"], amount: "fig.schStateQuota", evidence: ["ev.govtCheaper", "ev.counselling"],
      name: tx("Government seat through state quota", "राज्य कोट्यातून सरकारी जागा"),
      what: tx("Government seats cost far less than private seats. Seats are allotted through {stateCounselling}.", "सरकारी जागांचा खर्च खाजगी जागांपेक्षा खूप कमी असतो. जागा {stateCounselling} मार्फत दिल्या जातात."),
      portal: { name: tx("{stateCounselling}", "{stateCounselling}"), url: "[placeholder]" } },
    { id: "sch.mahadbt", states: ["MH"], dependsOn: ["income", "state"], amount: "fig.schMahadbt", evidence: ["ev.mahadbt"],
      name: tx("MahaDBT scholarships", "महाडीबीटी (MahaDBT) शिष्यवृत्ती"),
      what: tx("Maharashtra's scholarship portal. Some scholarships depend on family income, course and category.", "महाराष्ट्राचे शिष्यवृत्ती पोर्टल. काही शिष्यवृत्ती कुटुंबाचे उत्पन्न, अभ्यासक्रम आणि प्रवर्गावर अवलंबून असतात."),
      portal: { name: tx("MahaDBT", "महाडीबीटी"), url: "[placeholder]" } },
    { id: "sch.nsp", dependsOn: ["income"], amount: "fig.schNsp", evidence: ["ev.nsp"],
      name: tx("National Scholarship Portal", "राष्ट्रीय शिष्यवृत्ती पोर्टल"),
      what: tx("Central government scholarships. Many depend on family income.", "केंद्र सरकारच्या शिष्यवृत्ती. अनेक शिष्यवृत्ती कुटुंबाच्या उत्पन्नावर अवलंबून असतात."),
      portal: { name: tx("National Scholarship Portal", "राष्ट्रीय शिष्यवृत्ती पोर्टल"), url: "[placeholder]" } }
  ],

  adjacent: [
    { id: "adj.physician", icon: "👩‍⚕️", fits: ["core"], evidence: ["ev.adjacent"],
      name: tx("General physician", "सामान्य डॉक्टर (जनरल फिजिशियन)"),
      why: tx("Still a doctor, after MBBS.", "MBBS नंतर डॉक्टरच."),
      entry: tx("[Entry route, duration and fees: to be sourced]", "[प्रवेश मार्ग, कालावधी आणि शुल्क: स्रोत शोधायचा आहे]") },
    { id: "adj.technologist", icon: "🖥️", fits: ["technology"], evidence: ["ev.adjacent"],
      name: tx("Cardiac care technologist", "कार्डिॲक केअर तंत्रज्ञ"),
      why: tx("Runs heart tests and machines.", "हृदयाच्या चाचण्या आणि यंत्रे हाताळतात."),
      entry: tx("[Entry route, duration and fees: to be sourced]", "[प्रवेश मार्ग, कालावधी आणि शुल्क: स्रोत शोधायचा आहे]") },
    { id: "adj.perfusionist", icon: "🫀", fits: ["technology"], evidence: ["ev.adjacent"],
      name: tx("Perfusionist", "परफ्युजनिस्ट"),
      why: tx("Runs the heart-lung machine during heart surgery.", "हृदय शस्त्रक्रियेदरम्यान हृदय-फुफ्फुस यंत्र चालवतात."),
      entry: tx("[Entry route, duration and fees: to be sourced]", "[प्रवेश मार्ग, कालावधी आणि शुल्क: स्रोत शोधायचा आहे]") },
    { id: "adj.nurse", icon: "🧑‍⚕️", fits: ["care"], evidence: ["ev.adjacent"],
      name: tx("Cardiac nurse", "कार्डिॲक नर्स"),
      why: tx("Cares for heart patients every day.", "हृदयरुग्णांची रोज काळजी घेतात."),
      entry: tx("[Entry route, duration and fees: to be sourced]", "[प्रवेश मार्ग, कालावधी आणि शुल्क: स्रोत शोधायचा आहे]") },
    { id: "adj.physio", icon: "🏃", fits: ["care"], evidence: ["ev.adjacent"],
      name: tx("Cardio-pulmonary physiotherapist", "कार्डिओ-पल्मोनरी फिजिओथेरपिस्ट"),
      why: tx("Helps heart and lung patients recover strength.", "हृदय आणि फुफ्फुसाच्या रुग्णांना पुन्हा ताकद मिळवण्यास मदत करतात."),
      entry: tx("[Entry route, duration and fees: to be sourced]", "[प्रवेश मार्ग, कालावधी आणि शुल्क: स्रोत शोधायचा आहे]") }
  ],

  // First matching template per owner wins, so the most specific come first.
  actions: [
    { id: "a.child.retry", owner: "child", when: { entrance: ["notQualified"] }, due: { inDays: 14 },
      text: tx("Talk with your family: try again, or explore a related career", "कुटुंबाशी बोल: पुन्हा प्रयत्न करायचा की जवळचे करिअर पाहायचे"),
      reason: tx("The entrance result changes which route makes sense.", "प्रवेश परीक्षेच्या निकालावरून कोणता मार्ग योग्य ते बदलते.") },
    { id: "a.child.tech", owner: "child", when: { interest: ["technology"] }, due: { inDays: 30 },
      text: tx("Find out what a cardiac care technologist does, with your teacher", "कार्डिॲक केअर तंत्रज्ञ काय करतात ते शिक्षकांच्या मदतीने शोध"),
      reason: tx("You said machines and technology in healthcare interest you.", "आरोग्य क्षेत्रातील यंत्रे आणि तंत्रज्ञान तुला आवडते, असे तू सांगितलेस.") },
    { id: "a.child.care", owner: "child", when: { interest: ["care"] }, due: { inDays: 30 },
      text: tx("Ask a nurse or physiotherapist what their day is like", "एखाद्या नर्सला किंवा फिजिओथेरपिस्टला त्यांचा दिवस कसा असतो ते विचार"),
      reason: tx("You said caring for patients every day interests you.", "रोज रुग्णांची काळजी घेणे तुला आवडते, असे तू सांगितलेस.") },
    { id: "a.child.marks", owner: "child", when: { marks: ["needsWork"] }, due: { inDays: 30 },
      text: tx("Pick one Science topic to practise each week", "दर आठवड्याला सरावासाठी विज्ञानाचा एक विषय निवड"),
      reason: tx("Preparation is where the biggest gap is right now.", "सध्या सर्वात मोठी उणीव तयारीत आहे.") },
    { id: "a.child.school", owner: "child", when: { classAtMost: 10 }, due: { inDays: 14 },
      text: tx("Ask your science teacher what Biology students learn in Class 11", "अकरावीत जीवशास्त्राचे विद्यार्थी काय शिकतात ते विज्ञानाच्या शिक्षकांना विचार"),
      reason: tx("Biology is needed for this route.", "या मार्गासाठी जीवशास्त्र आवश्यक आहे.") },
    { id: "a.child.study", owner: "child", when: {}, due: { inDays: 14 },
      text: tx("Make a weekly study plan for Physics, Chemistry and Biology", "भौतिकशास्त्र, रसायनशास्त्र आणि जीवशास्त्रासाठी आठवड्याचा अभ्यास-आराखडा बनव"),
      reason: tx("Class 11–12 Science for this route needs these three subjects.", "या मार्गासाठी अकरावी–बारावी विज्ञानात हे तीन विषय लागतात.") },

    { id: "a.parent.retry", owner: "parent", when: { entrance: ["notQualified"] }, due: { inDays: 21 },
      text: tx("Compare the cost of another preparation year with a related course", "आणखी एका तयारी-वर्षाचा खर्च आणि जवळच्या अभ्यासक्रमाचा खर्च यांची तुलना करा"),
      reason: tx("Both are open; the family decides together.", "दोन्ही पर्याय खुले आहेत; कुटुंब मिळून ठरवते.") },
    { id: "a.parent.tight", owner: "parent", when: { budget: ["tight"] }, due: { inDays: 30 },
      text: tx("Check the MahaDBT scholarship rules on the official portal", "अधिकृत पोर्टलवर महाडीबीटी शिष्यवृत्तीचे नियम तपासा"),
      reason: tx("Money is tight, and scholarships may lower the cost.", "पैसे कमी आहेत, आणि शिष्यवृत्तीमुळे खर्च कमी होऊ शकतो.") },
    { id: "a.parent.budget", owner: "parent", when: { budget: ["unknown"] }, due: { inDays: 30 },
      text: tx("Note privately what the family could put aside each month", "दरमहा कुटुंब किती बाजूला ठेवू शकते ते स्वतःसाठी लिहून ठेवा"),
      reason: tx("The cost plan needs a rough budget. You don't have to share it.", "खर्चाच्या योजनेसाठी अंदाजे बजेट लागते. ते सांगणे बंधनकारक नाही.") },
    { id: "a.parent.subjects", owner: "parent", when: { classAtMost: 10 }, due: { inDays: 30 },
      text: tx("Ask the school when Class 11 subjects are chosen", "अकरावीचे विषय केव्हा निवडले जातात ते शाळेत विचारा"),
      reason: tx("Choosing Science with Biology keeps this route open.", "जीवशास्त्रासह विज्ञान निवडल्याने हा मार्ग खुला राहतो.") },
    { id: "a.parent.documents", owner: "parent", when: {}, due: { inDays: 60 },
      text: tx("Keep a folder of marksheets and certificates", "गुणपत्रिका आणि प्रमाणपत्रांची एक फाईल ठेवा"),
      reason: tx("Counselling and scholarships ask for documents [which ones: to verify].", "कौन्सेलिंग आणि शिष्यवृत्तीसाठी कागदपत्रे लागतात [कोणती: तपासायचे आहे].") },

    { id: "a.school.retry", owner: "school", when: { entrance: ["notQualified"] }, due: { inDays: 21 },
      text: tx("Ask the teacher about related healthcare courses and their entry rules", "जवळचे आरोग्य अभ्यासक्रम आणि त्यांचे प्रवेश नियम याबद्दल शिक्षकांना विचारा"),
      reason: tx("Teachers know which courses past students joined.", "आधीचे विद्यार्थी कोणत्या अभ्यासक्रमांत गेले ते शिक्षकांना माहीत असते.") },
    { id: "a.school.help", owner: "school", when: { marks: ["needsWork"] }, due: { inDays: 30 },
      text: tx("Ask the teacher for extra help in Science", "विज्ञानात जादा मदतीसाठी शिक्षकांना विचारा"),
      reason: tx("A little help now makes Class 11–12 easier.", "आत्ताची थोडी मदत अकरावी–बारावी सोपी करते.") },
    { id: "a.school.subjects", owner: "school", when: { classAtMost: 10 }, due: { inDays: 30 },
      text: tx("Ask the class teacher which subjects keep the medical route open", "वैद्यकीय मार्ग खुला ठेवण्यासाठी कोणते विषय लागतात ते वर्गशिक्षकांना विचारा"),
      reason: tx("The school sets when and how subjects are chosen.", "विषय केव्हा आणि कसे निवडायचे ते शाळा ठरवते.") },
    { id: "a.school.neet", owner: "school", when: {}, due: { inDays: 30 },
      text: tx("Ask whether the school offers entrance-exam preparation support", "शाळा प्रवेश परीक्षेच्या तयारीसाठी मदत करते का ते विचारा"),
      reason: tx("School support may reduce the need for paid coaching.", "शाळेच्या मदतीमुळे पैसे भरून शिकवणी लावण्याची गरज कमी होऊ शकते.") }
  ],

  tracks: TRACKS.tracks,

  figures: {
    ...TRACKS.figures,
    "time.main": fig(tx("Time on the main route", "मुख्य मार्गाचा कालावधी"), tx("[time, to be sourced]", "[कालावधी, स्रोत शोधायचा आहे]"), "years", "ev.mbbs"),
    "pay.cardiologist": fig(tx("Pay range for cardiologists", "हृदयरोगतज्ज्ञांच्या पगाराची श्रेणी"), tx("[pay range]", "[पगार श्रेणी]"), "INR/month", "ev.pay"),
    "fig.minMarks": fig(tx("Minimum Class 12 marks", "बारावीतील किमान गुण"), tx("[verified requirement]", "[तपासलेली अट]"), "%", "ev.minmarks"),
    "fig.seats": fig(tx("Government MBBS seats", "सरकारी MBBS जागा"), tx("[seats]", "[जागा]"), "seats", "ev.seats"),
    "fig.feeGovt": fig(tx("Government college fee", "सरकारी महाविद्यालयाचे शुल्क"), tx("[government fee range]", "[सरकारी शुल्क श्रेणी]"), "INR/year", "ev.fees"),
    "fig.feePrivate": fig(tx("Private college fee", "खाजगी महाविद्यालयाचे शुल्क"), tx("[private fee range]", "[खाजगी शुल्क श्रेणी]"), "INR/year", "ev.fees"),
    "fig.feeAllied": fig(tx("Healthcare course fee", "आरोग्य अभ्यासक्रमाचे शुल्क"), tx("[course fee range]", "[अभ्यासक्रम शुल्क श्रेणी]"), "INR/year", "ev.adjacent"),
    "fig.hostel": fig(tx("Hostel and living", "वसतिगृह आणि राहण्याचा खर्च"), tx("[hostel and living, per year]", "[वसतिगृह आणि राहणे, दरवर्षी]"), "INR/year", "ev.living"),
    "fig.travel": fig(tx("Travel", "प्रवास"), tx("[travel]", "[प्रवास खर्च]"), "INR/year", "ev.living"),
    "fig.coaching": fig(tx("Coaching", "शिकवणी"), tx("[coaching, if any]", "[शिकवणी, असल्यास]"), "INR", "ev.fees"),
    "fig.examFees": fig(tx("Exam and application fees", "परीक्षा आणि अर्ज शुल्क"), tx("[exam fees]", "[परीक्षा शुल्क]"), "INR", "ev.neet"),
    "fig.retryYear": fig(tx("One more preparation year", "आणखी एक तयारीचे वर्ष"), tx("[preparation year cost]", "[तयारी-वर्षाचा खर्च]"), "INR", "ev.retry"),
    "fig.schStateQuota": fig(tx("Saving from a government seat", "सरकारी जागेमुळे होणारी बचत"), tx("[fee difference]", "[शुल्कातील फरक]"), "INR", "ev.govtCheaper"),
    "fig.schMahadbt": fig(tx("MahaDBT scholarship amount", "महाडीबीटी शिष्यवृत्तीची रक्कम"), tx("[scholarship amount]", "[शिष्यवृत्ती रक्कम]"), "INR", "ev.mahadbt"),
    "fig.schNsp": fig(tx("National scholarship amount", "राष्ट्रीय शिष्यवृत्तीची रक्कम"), tx("[scholarship amount]", "[शिष्यवृत्ती रक्कम]"), "INR", "ev.nsp"),
    "sc.govtLocal.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.fees"),
    "sc.govtLocal.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.fees"),
    "sc.govtAway.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.fees"),
    "sc.govtAway.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.fees"),
    "sc.privateAway.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.fees"),
    "sc.privateAway.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.fees"),
    "sc.retryYear.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.retry"),
    "sc.retryYear.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.retry"),
    "sc.allied.low": fig(tx("Total, low end", "एकूण, किमान बाजू"), tx("[low]", "[किमान]"), "INR", "ev.adjacent"),
    "sc.allied.high": fig(tx("Total, high end", "एकूण, कमाल बाजू"), tx("[high]", "[कमाल]"), "INR", "ev.adjacent")
  },

  evidence: [
    ...TRACKS.evidence,
    ev("ev.reality", tx("What a cardiologist does.", "हृदयरोगतज्ज्ञ काय करतात."), OFFICIAL("Medical council or professional body description", "वैद्यकीय परिषद किंवा व्यावसायिक संस्थेचे वर्णन"), INDIA),
    ev("ev.day", tx("An example day of a cardiologist.", "हृदयरोगतज्ज्ञाचा एक उदाहरणादाखल दिवस."), tx("[Practitioner interviews, checked by a reviewer: to gather]", "[व्यावसायिकांच्या मुलाखती, तज्ज्ञांनी तपासलेल्या: गोळा करायच्या आहेत]"), MAHARASHTRA,
       tx("Re-check every two years", "दर दोन वर्षांनी पुन्हा तपासा")),
    ev("ev.pay", tx("Pay range for cardiologists.", "हृदयरोगतज्ज्ञांच्या पगाराची श्रेणी."), OFFICIAL("Published pay survey", "प्रकाशित पगार सर्वेक्षण"), INDIA, tx("Re-check every year", "दरवर्षी पुन्हा तपासा")),
    ev("ev.board", tx("Class 10 through a recognised board or accepted equivalent.", "मान्यताप्राप्त मंडळातून किंवा मान्य समकक्ष मार्गाने दहावी."), OFFICIAL("NTA information bulletin", "NTA माहितीपत्रक"), INDIA),
    ev("ev.stream", tx("NEET-UG needs Physics, Chemistry, Biology/Biotechnology and English in Class 11–12.", "NEET-UG साठी अकरावी–बारावीत भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र/जैवतंत्रज्ञान आणि इंग्रजी आवश्यक."), OFFICIAL("NTA information bulletin", "NTA माहितीपत्रक"), INDIA),
    ev("ev.minmarks", tx("Minimum Class 12 marks for NEET-UG, by category.", "NEET-UG साठी प्रवर्गानुसार बारावीतील किमान गुण."), OFFICIAL("NTA information bulletin", "NTA माहितीपत्रक"), INDIA),
    ev("ev.age", tx("Age rule for NEET-UG.", "NEET-UG साठी वयाचा नियम."), OFFICIAL("NTA information bulletin", "NTA माहितीपत्रक"), INDIA),
    ev("ev.neet", tx("NEET-UG is conducted by NTA once a year and is the entrance exam for MBBS.", "NEET-UG ही परीक्षा NTA दरवर्षी एकदा घेते आणि ती MBBS साठी प्रवेश परीक्षा आहे."), OFFICIAL("NTA information bulletin", "NTA माहितीपत्रक"), INDIA),
    ev("ev.counselling", tx("MCC handles All-India Quota and some national, central and deemed seats; the State CET Cell handles Maharashtra state-quota seats.", "MCC अखिल भारतीय कोटा आणि काही राष्ट्रीय, केंद्रीय व अभिमत जागा हाताळते; राज्य CET कक्ष महाराष्ट्र राज्य कोट्याच्या जागा हाताळतो."), OFFICIAL("MCC and State CET Cell notices", "MCC आणि राज्य CET कक्षाच्या सूचना"), MAHARASHTRA),
    ev("ev.govtCheaper", tx("Government medical seats cost far less than private seats.", "सरकारी वैद्यकीय जागांचा खर्च खाजगी जागांपेक्षा खूप कमी असतो."), OFFICIAL("Fee notifications", "शुल्क अधिसूचना"), MAHARASHTRA),
    ev("ev.fees", tx("College fees and coaching costs.", "महाविद्यालय शुल्क आणि शिकवणीचा खर्च."), OFFICIAL("Fee regulating authority notices", "शुल्क नियामक प्राधिकरणाच्या सूचना"), MAHARASHTRA),
    ev("ev.living", tx("Hostel, living and travel costs.", "वसतिगृह, राहणे आणि प्रवासाचा खर्च."), OFFICIAL("College hostel fee notices", "महाविद्यालय वसतिगृह शुल्क सूचना"), MAHARASHTRA),
    ev("ev.seats", tx("Seats compared with applicants.", "अर्जदारांच्या तुलनेत जागा."), OFFICIAL("MCC seat matrix and NTA result data", "MCC जागा तक्ता आणि NTA निकाल माहिती"), INDIA),
    ev("ev.mbbs", tx("MBBS is followed by a compulsory internship, then registration.", "MBBS नंतर अनिवार्य इंटर्नशिप, मग नोंदणी."), OFFICIAL("National Medical Commission", "राष्ट्रीय वैद्यकीय आयोग"), INDIA),
    ev("ev.pg", tx("Postgraduate entry through NEET-PG (NBEMS), or NExT if implemented.", "पदव्युत्तर प्रवेश NEET-PG (NBEMS) द्वारे, किंवा NExT लागू झाल्यास त्याद्वारे."), OFFICIAL("NBEMS and NMC notices", "NBEMS आणि NMC सूचना"), INDIA),
    ev("ev.ss", tx("DM / DrNB Cardiology through NEET-SS.", "DM / DrNB कार्डिओलॉजी NEET-SS द्वारे."), OFFICIAL("NBEMS notices", "NBEMS सूचना"), INDIA),
    ev("ev.retry", tx("NEET-UG can be taken again in a later year, within the attempt and age rules.", "प्रयत्न आणि वयाच्या नियमांमध्ये राहून NEET-UG पुढच्या वर्षी पुन्हा देता येते."), OFFICIAL("NTA information bulletin", "NTA माहितीपत्रक"), INDIA),
    ev("ev.adjacent", tx("Related careers: general physician, cardiac care technologist, perfusionist, cardiac nurse, cardio-pulmonary physiotherapist.", "जवळची करिअर: सामान्य डॉक्टर, कार्डिॲक केअर तंत्रज्ञ, परफ्युजनिस्ट, कार्डिॲक नर्स, कार्डिओ-पल्मोनरी फिजिओथेरपिस्ट."), OFFICIAL("Course regulators and colleges", "अभ्यासक्रम नियामक आणि महाविद्यालये"), MAHARASHTRA),
    ev("ev.mahadbt", tx("MahaDBT is Maharashtra's scholarship portal.", "महाडीबीटी हे महाराष्ट्राचे शिष्यवृत्ती पोर्टल आहे."), OFFICIAL("MahaDBT portal", "महाडीबीटी पोर्टल"), MAHARASHTRA, tx("Re-check every scholarship year", "दर शिष्यवृत्ती वर्षी पुन्हा तपासा")),
    ev("ev.nsp", tx("The National Scholarship Portal lists central government scholarships.", "राष्ट्रीय शिष्यवृत्ती पोर्टलवर केंद्र सरकारच्या शिष्यवृत्ती असतात."), OFFICIAL("National Scholarship Portal", "राष्ट्रीय शिष्यवृत्ती पोर्टल"), INDIA, tx("Re-check every scholarship year", "दर शिष्यवृत्ती वर्षी पुन्हा तपासा"))
  ],
  // Cardiologist wording for shared readiness reasons.
  wording: {
    eligRulesUnverified: tx("The minimum marks and other rules are not verified yet.", "किमान गुण आणि इतर नियम अजून तपासलेले नाहीत.")
  }
};
