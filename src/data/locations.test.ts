import { describe, expect, it } from "vitest";
import { LOCATIONS } from "./locations";

const normalizedWordSet = (value: string) =>
  new Set(
    value
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, " ")
      .split(/\s+/)
      .filter((word) => word.length > 3)
  );

const jaccardSimilarity = (left: string, right: string) => {
  const a = normalizedWordSet(left);
  const b = normalizedWordSet(right);
  const overlap = [...a].filter((word) => b.has(word)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : overlap / union;
};

describe("location content", () => {
  it("has unique decision guidance and official references for every state", () => {
    expect(new Set(LOCATIONS.map((location) => location.heroIntro)).size).toBe(
      LOCATIONS.length
    );
    expect(new Set(LOCATIONS.map((location) => location.firstStep.title)).size).toBe(
      LOCATIONS.length
    );

    for (const location of LOCATIONS) {
      expect(location.firstStep.description.length).toBeGreaterThan(120);
      expect(location.officialReferences.length).toBeGreaterThanOrEqual(2);
      expect(
        location.officialReferences.every((reference) =>
          reference.url.startsWith("https://")
        )
      ).toBe(true);
    }
  });

  it("keeps state narratives materially distinct", () => {
    for (let left = 0; left < LOCATIONS.length; left += 1) {
      for (let right = left + 1; right < LOCATIONS.length; right += 1) {
        const leftNarrative = LOCATIONS[left].introParagraphs.join(" ");
        const rightNarrative = LOCATIONS[right].introParagraphs.join(" ");
        expect(jaccardSimilarity(leftNarrative, rightNarrative)).toBeLessThan(0.35);
      }
    }
  });
});
