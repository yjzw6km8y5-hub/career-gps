import type { EvidenceRecord, Figure, Text } from "./schema";

export const tx = (en: string, mr: string): Text => ({ en, mr });

/** An unsourced claim: kept visible, labelled Example, with every evidence field as a placeholder. */
export function exampleEvidence(id: string, claim: Text, source: Text, geography: Text, expiryRule?: Text): EvidenceRecord {
  return {
    id,
    claim,
    source: { title: source, url: "[placeholder]" },
    geography,
    effectiveDate: "[placeholder]",
    retrievedDate: "[placeholder]",
    review: { level: "example", reviewer: null, reviewedOn: null },
    expiryRule: expiryRule ?? tx("Re-check every admission year", "दर प्रवेश वर्षी पुन्हा तपासा")
  };
}

export function placeholderFigure(label: Text, placeholder: Text, unit: string, evidence: string): Figure {
  return { label, placeholder, unit, value: null, evidence };
}

export const INDIA = tx("India", "भारत");
export const MAHARASHTRA = tx("Maharashtra", "महाराष्ट्र");
