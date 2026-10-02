import type { Figure } from "./types";

// Every number a family could see. All are [placeholders] until researched,
// sourced, dated and checked by a named human reviewer.
const empty = { value: null, source: null, asOf: null, reviewer: null };

export const FIGURES: Record<string, Figure> = {
  monthlySavingLow: { ...empty, unit: "INR/month",
    label: { en: "Monthly saving, low end of estimate", mr: "मासिक बचत, अंदाजाची किमान बाजू" },
    placeholder: { en: "[low]", mr: "[किमान]" } },
  monthlySavingHigh: { ...empty, unit: "INR/month",
    label: { en: "Monthly saving, high end of estimate", mr: "मासिक बचत, अंदाजाची कमाल बाजू" },
    placeholder: { en: "[high]", mr: "[कमाल]" } },
  totalCost: { ...empty, unit: "INR",
    label: { en: "Total cost of the chosen route", mr: "निवडलेल्या मार्गाचा एकूण खर्च" },
    placeholder: { en: "[total cost]", mr: "[एकूण खर्च]" } },
  scholarshipHelp: { ...empty, unit: "INR",
    label: { en: "Scholarships and government seats", mr: "शिष्यवृत्ती आणि सरकारी जागा" },
    placeholder: { en: "[scholarship amount]", mr: "[शिष्यवृत्ती रक्कम]" } },
  inflation: { ...empty, unit: "%/year",
    label: { en: "Price-rise assumption", mr: "महागाईचा अंदाज" },
    placeholder: { en: "[rate, source, date]", mr: "[दर, स्रोत, तारीख]" } },
  incomeBandLow: { ...empty, unit: "INR/month",
    label: { en: "Monthly family income, lower band", mr: "कुटुंबाचे मासिक उत्पन्न, खालचा गट" },
    placeholder: { en: "[lower income band]", mr: "[खालचा उत्पन्न गट]" } },
  incomeBandMid: { ...empty, unit: "INR/month",
    label: { en: "Monthly family income, middle band", mr: "कुटुंबाचे मासिक उत्पन्न, मधला गट" },
    placeholder: { en: "[middle income band]", mr: "[मधला उत्पन्न गट]" } },
  incomeBandHigh: { ...empty, unit: "INR/month",
    label: { en: "Monthly family income, higher band", mr: "कुटुंबाचे मासिक उत्पन्न, वरचा गट" },
    placeholder: { en: "[higher income band]", mr: "[वरचा उत्पन्न गट]" } },
  minMarksPCB: { ...empty, unit: "%",
    label: { en: "Minimum Class 12 marks (Physics, Chemistry, Biology)", mr: "बारावीत किमान गुण (भौतिकशास्त्र, रसायनशास्त्र, जीवशास्त्र)" },
    placeholder: { en: "[verified requirement]", mr: "[तपासलेली अट]" } },
  neetSeatsGovt: { ...empty, unit: "seats",
    label: { en: "Government MBBS seats", mr: "सरकारी MBBS जागा" },
    placeholder: { en: "[seats]", mr: "[जागा]" } },
  mbbsFeeGovt: { ...empty, unit: "INR/year",
    label: { en: "Government college fee", mr: "सरकारी महाविद्यालयाचे शुल्क" },
    placeholder: { en: "[government fee range]", mr: "[सरकारी शुल्क श्रेणी]" } },
  mbbsFeePrivate: { ...empty, unit: "INR/year",
    label: { en: "Private college fee", mr: "खाजगी महाविद्यालयाचे शुल्क" },
    placeholder: { en: "[private fee range]", mr: "[खाजगी शुल्क श्रेणी]" } }
};
