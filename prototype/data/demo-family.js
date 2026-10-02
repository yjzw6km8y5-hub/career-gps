// DEMO DATA ONLY. Fictional family. No real child's data until the privacy review is done.
//
// Figure rule: a figure is shown only if it has value + source + asOf + reviewer.
// Otherwise the app shows its [placeholder]. scripts/check-data.js enforces this.
//
// Screen labels (from FINAL-PLAN-fast):
//   researched = checked against its source by a named human reviewer
//   example    = shows the idea, not yet checked
//   planned    = not built yet
window.DEMO = {
  schemaVersion: "0.1",
  demo: true,

  family: {
    id: "demo-family-1",
    fictional: true,
    state: "MH",
    language: "mr",
    child: { firstName: "Asha", classLevel: 8, fictional: true },
    activeCareers: ["cardiologist"]
  },

  // State pack: pilot state chosen by the owner on 2026-10-01. Names come from the cardiologist-path
  // Final draft and the spec; each must be confirmed for the admission year (status "example").
  statePacks: {
    MH: {
      name: "Maharashtra",
      status: "example",
      languages: ["en", "mr"],
      class12Name: "HSC",
      stateCounselling: "State CET Cell",
      scholarshipPortal: { name: "MahaDBT", url: "[official link, to verify]" }
    }
  },

  careers: [
    { id: "cardiologist", name: "Heart doctor", formalName: "Cardiologist", icon: "🩺", ready: true },
    { id: "musician", name: "Musician", formalName: "Musician", icon: "🎵", ready: false },
    { id: "cricketer", name: "Cricketer", formalName: "Cricketer", icon: "🏏", ready: false }
  ],

  // Cardiologist path, from packet-2026-10-01-cardiologist-path.md (Final draft).
  // Status "example": agreed outline, facts not yet verified against official notices.
  routes: {
    cardiologist: {
      status: "example",
      sourceNote: "Career GPS cardiologist path draft, 2026-10-01. Not yet checked by a human reviewer.",
      steps: [
        { id: "c10", icon: "📘", child: "Finish Class 10", parent: "Class 10 through a recognised board or an accepted equivalent route", figures: [], mayChange: true },
        { id: "c12", icon: "🧪", child: "Class 11–12 Science", parent: "Class 11–12: Physics, Chemistry, Biology/Biotechnology and English (in {stateName}, Class 12 ends with the {class12Name} exam)", figures: ["minMarksPCB"], mayChange: true },
        { id: "neetug", icon: "✏️", child: "Big exam: NEET-UG", parent: "NEET-UG entrance exam (NTA), then seat counselling: MCC for All-India Quota and some national, central and deemed-university seats; {stateCounselling} for {stateName} state-quota seats (confirm each year)", figures: ["neetSeatsGovt"], mayChange: true },
        { id: "mbbs", icon: "🏥", child: "Doctor school: MBBS", parent: "MBBS, then a compulsory internship", figures: ["mbbsFeeGovt", "mbbsFeePrivate"], mayChange: true },
        { id: "md", icon: "🩺", child: "Become a medicine expert: MD", parent: "MD / DNB General Medicine (via NEET-PG, or NExT if it replaces it)", figures: [], mayChange: true },
        { id: "dm", icon: "❤️", child: "Heart doctor: DM Cardiology", parent: "DM / DrNB Cardiology (via NEET-SS)", figures: [], mayChange: true }
      ],
      childPosition: "c10"
    }
  },

  figures: {
    monthlySavingLow:  { label: "Monthly saving, low end of estimate", placeholder: "[low]", unit: "INR/month", value: null, source: null, asOf: null, reviewer: null },
    monthlySavingHigh: { label: "Monthly saving, high end of estimate", placeholder: "[high]", unit: "INR/month", value: null, source: null, asOf: null, reviewer: null },
    totalCost:       { label: "Total cost of the chosen route", placeholder: "[total cost]", unit: "INR", value: null, source: null, asOf: null, reviewer: null },
    scholarshipHelp: { label: "Scholarships and government seats", placeholder: "[scholarship amount]", unit: "INR", value: null, source: null, asOf: null, reviewer: null },
    incomeBandLow:   { label: "Monthly family income, lower band", placeholder: "[lower income band]", unit: "INR/month", value: null, source: null, asOf: null, reviewer: null },
    incomeBandMid:   { label: "Monthly family income, middle band", placeholder: "[middle income band]", unit: "INR/month", value: null, source: null, asOf: null, reviewer: null },
    incomeBandHigh:  { label: "Monthly family income, higher band", placeholder: "[higher income band]", unit: "INR/month", value: null, source: null, asOf: null, reviewer: null },
    inflation:      { label: "Price-rise assumption", placeholder: "[rate, source, date]", unit: "%/year", value: null, source: null, asOf: null, reviewer: null },
    minMarksPCB:     { label: "Minimum Class 12 marks (Physics, Chemistry, Biology)", placeholder: "[verified requirement]", unit: "%", value: null, source: null, asOf: null, reviewer: null },
    neetSeatsGovt:   { label: "Government MBBS seats", placeholder: "[seats]", unit: "seats", value: null, source: null, asOf: null, reviewer: null },
    mbbsFeeGovt:     { label: "Government college fee", placeholder: "[government fee range]", unit: "INR/year", value: null, source: null, asOf: null, reviewer: null },
    mbbsFeePrivate:  { label: "Private college fee", placeholder: "[private fee range]", unit: "INR/year", value: null, source: null, asOf: null, reviewer: null }
  },

  // "Where to save": three broad groups (addendum §E). Risk lines are product-group specific,
  // never "safe" or "low risk". Individual products and rates are Planned (Sprint 4).
  saveGroups: [
    { id: "govt", icon: "🏛️", name: "Government-backed savings", examples: "Sukanya Samriddhi Yojana (for girls), Public Provident Fund, National Savings Certificate", risk: "Money is locked in for some years. Taking it out early may not be allowed." },
    { id: "bank", icon: "🏦", name: "Bank deposits", examples: "Recurring deposit, fixed deposit", risk: "Breaking a deposit early can cost a penalty. Rising prices can reduce what it buys." },
    { id: "market", icon: "📈", name: "Market-linked options", examples: "Mutual funds (monthly SIP), index funds", risk: "Value can rise and fall. You may get back less than you put in." }
  ]
};
