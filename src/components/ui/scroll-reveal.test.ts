import { describe, expect, it } from "vitest";
import { shouldAnimateReveal } from "./scroll-reveal";

describe("ScrollReveal fail-open behavior", () => {
  it("never hides content when reduced motion is requested", () => {
    expect(
      shouldAnimateReveal({
        top: 1200,
        viewportHeight: 800,
        reducedMotion: true,
        supportsIntersectionObserver: true,
      })
    ).toBe(false);
  });

  it("never hides content without IntersectionObserver", () => {
    expect(
      shouldAnimateReveal({
        top: 1200,
        viewportHeight: 800,
        reducedMotion: false,
        supportsIntersectionObserver: false,
      })
    ).toBe(false);
  });

  it("animates only content that begins below the initial viewport", () => {
    expect(
      shouldAnimateReveal({
        top: 600,
        viewportHeight: 800,
        reducedMotion: false,
        supportsIntersectionObserver: true,
      })
    ).toBe(false);
    expect(
      shouldAnimateReveal({
        top: 900,
        viewportHeight: 800,
        reducedMotion: false,
        supportsIntersectionObserver: true,
      })
    ).toBe(true);
  });
});
