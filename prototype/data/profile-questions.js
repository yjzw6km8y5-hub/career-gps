// "About you" questions for the parent (family profile, first part).
// Rules: one question per screen, at most 3 answers, every question can be skipped.
// Money questions (income, how it may change, land) appear ONLY if the parent chooses
// "Yes, tell more". Nothing here is a feasibility-score input except through the
// affordability check (see docs/BUILD-PLAN.md section 3); occupation is used only to
// match schemes meant for certain kinds of work.
window.PROFILE_QUESTIONS = [
  {
    id: "who",
    q: "Who are you?",
    sub: "So we can talk to you the right way.",
    options: [
      { v: "mother", icon: "👩", t: "Mother" },
      { v: "father", icon: "👨", t: "Father" },
      { v: "guardian", icon: "🧓", t: "Grandparent or guardian" }
    ],
    skip: "Skip"
  },
  {
    id: "work",
    q: "What work do you do?",
    sub: "Some help is only for families who do certain kinds of work. Doing something else, or not working now? Just skip.",
    options: [
      { v: "daily", icon: "🌾", t: "Farm or daily work", hint: "Farming, labour, building, driving" },
      { v: "business", icon: "🏪", t: "Own shop or business", hint: "Shop, stall, trade" },
      { v: "salary", icon: "🏢", t: "Job with a salary", hint: "Government, office, factory, shop staff" }
    ],
    skip: "Skip"
  },
  {
    id: "otherEarner",
    q: "Does anyone else in the family earn?",
    sub: "",
    options: [
      { v: "partner", icon: "🧑", t: "{partner}" },
      { v: "someone", icon: "👥", t: "Someone else" },
      { v: "none", icon: "✋", t: "No one else" }
    ],
    skip: "Skip"
  },
  {
    id: "otherWork",
    when: { otherEarner: ["partner", "someone"] },
    q: "What work do they do?",
    sub: "",
    sameOptionsAs: "work",
    skip: "Skip"
  },
  {
    id: "more",
    q: "Want a closer money plan?",
    sub: "You can tell us a little about money. Only if you want to.",
    options: [
      { v: "yes", icon: "📊", t: "Yes, tell more" },
      { v: "no", icon: "⏭️", t: "Not now" }
    ]
  },
  {
    id: "income",
    when: { more: ["yes"] },
    q: "About how much does the family earn in a month?",
    sub: "All earners together. A rough idea is enough.",
    options: [
      { v: "low", icon: "🪙", fig: "incomeBandLow" },
      { v: "mid", icon: "💵", fig: "incomeBandMid" },
      { v: "high", icon: "💰", fig: "incomeBandHigh" }
    ],
    skip: "Prefer not to say"
  },
  {
    id: "trend",
    when: { more: ["yes"] },
    q: "In the next few years, family income will probably…",
    sub: "",
    options: [
      { v: "up", icon: "📈", t: "Go up", sum: "Income likely to go up" },
      { v: "same", icon: "➖", t: "Stay about the same", sum: "Income likely steady" },
      { v: "unsure", icon: "🤷", t: "Not sure, may go down", sum: "Income not sure" }
    ],
    skip: "Prefer not to say"
  },
  {
    id: "land",
    when: { more: ["yes"] },
    q: "Does the family own land?",
    sub: "Land can be part of how a family pays for studies.",
    options: [
      { v: "yes", icon: "🌱", t: "Yes", sum: "Owns land" },
      { v: "no", icon: "🏠", t: "No", sum: "No land" }
    ],
    skip: "Prefer not to say"
  }
];
