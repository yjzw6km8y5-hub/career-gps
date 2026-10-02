import { describe, expect, it } from "vitest";
import { PARENT_QUESTIONS as Q } from "../data/questions";
import { STATE_PACKS } from "../data/content";
import type { Figure } from "../data/types";
import { fillState, isVerified, nextQuestionId, nextStepIndex, pruneAnswers } from "./rules";

const base: Figure = { label: { en: "x", mr: "x" }, placeholder: { en: "[x]", mr: "[x]" }, unit: "", value: null, source: null, asOf: null, reviewer: null };

describe("isVerified", () => {
  it("needs value, https source, date and reviewer", () => {
    expect(isVerified(base)).toBe(false);
    expect(isVerified({ ...base, value: "1", source: { url: "https://a.gov.in", title: "A" }, asOf: "2026-10-01", reviewer: "R" })).toBe(true);
    expect(isVerified({ ...base, value: "1", source: { url: "http://a.gov.in", title: "A" }, asOf: "2026-10-01", reviewer: "R" })).toBe(false);
    expect(isVerified({ ...base, value: "1", source: { url: "https://a.gov.in", title: "A" }, asOf: "2026-10-01", reviewer: null })).toBe(false);
  });
});

describe("fillState", () => {
  it("fills state tokens in both languages", () => {
    expect(fillState("{stateCounselling} for {stateName}", STATE_PACKS.MH, "en")).toBe("State CET Cell for Maharashtra");
    expect(fillState("{stateName}", STATE_PACKS.MH, "mr")).toBe("महाराष्ट्र");
  });
});

describe("nextStepIndex", () => {
  it("points to Class 10 up to Class 10, then to Class 11–12", () => {
    expect(nextStepIndex(1)).toBe(0);
    expect(nextStepIndex(10)).toBe(0);
    expect(nextStepIndex(11)).toBe(1);
    expect(nextStepIndex(12)).toBe(1);
  });
});

describe("About you flow", () => {
  it("skips 'their work' when no one else earns", () => {
    expect(nextQuestionId("otherEarner", { otherEarner: "none" }, Q)).toBe("more");
    expect(nextQuestionId("otherEarner", { otherEarner: "partner" }, Q)).toBe("otherWork");
  });
  it("money questions only after 'yes'", () => {
    expect(nextQuestionId("more", { more: "no" }, Q)).toBeNull();
    expect(nextQuestionId("more", { more: "yes" }, Q)).toBe("income");
  });
  it("changing 'more' to 'no' drops money answers", () => {
    expect(pruneAnswers({ more: "no", income: "low", land: "yes", who: "mother" }, Q)).toEqual({ more: "no", who: "mother" });
  });
});
