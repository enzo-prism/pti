import { describe, expect, it } from "vitest";
import { calculatePracticeValue } from "./practiceValue";

describe("educational valuation scenarios", () => {
  it("reconciles the public worked example and changes earnings without changing collections", () => {
    const first = calculatePracticeValue(1_000_000, 40, "general")!;
    const second = calculatePracticeValue(1_000_000, 20, "general")!;
    expect(first).toMatchObject({ adjustedEarnings: 400_000, collLow: 600_000, collHigh: 850_000, earnLow: 1_000_000, earnHigh: 1_600_000, low: 800_000, high: 1_225_000 });
    expect(second).toMatchObject({ adjustedEarnings: 200_000, collLow: first.collLow, collHigh: first.collHigh, earnLow: 500_000, earnHigh: 800_000 });
  });
  it.each([[0, 40], [-100, 40], [NaN, 40], [Infinity, 40], [1e12, 40], [1e6, -1], [1e6, 101], [1e6, NaN]])("rejects invalid input instead of silently changing the assumption", (collections, margin) => {
    expect(calculatePracticeValue(collections, margin, "general")).toBeNull();
  });
});
