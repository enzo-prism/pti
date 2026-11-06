import { describe, expect, it } from "vitest";
import { parseScenarioNumber } from "./scenarioInput";
describe("scenario input integrity", () => {
  it("accepts formatted collections and decimal percentages", () => {
    expect(parseScenarioNumber("$1,200,000")).toBe(1200000);
    expect(parseScenarioNumber("37.5")).toBe(37.5);
  });
  it.each(["-1200000", "1e6", "12.3.4", "abc123", "0", "", "Infinity"])("does not silently reinterpret %s", (value) => {
    expect(parseScenarioNumber(value)).toBeNull();
  });
});
