import { describe, expect, it } from "vitest";
import { headerHeightPx, isNavItemActive } from "./nav";

describe("isNavItemActive", () => {
  it("marks Home only on the homepage", () => {
    expect(isNavItemActive("/", "/")).toBe(true);
    expect(isNavItemActive("/about", "/")).toBe(false);
    expect(isNavItemActive("/blog/hello", "/")).toBe(false);
  });

  it("marks a section and its nested routes", () => {
    expect(isNavItemActive("/services", "/services")).toBe(true);
    expect(isNavItemActive("/services/selling", "/services")).toBe(true);
    expect(isNavItemActive("/resources/second-book", "/resources")).toBe(true);
  });

  it("does not treat a similar prefix as the same section", () => {
    expect(isNavItemActive("/about-us", "/about")).toBe(false);
    expect(isNavItemActive("/service", "/services")).toBe(false);
    expect(isNavItemActive("/blog", "/resources")).toBe(false);
  });
});

describe("headerHeightPx", () => {
  it("stores a whole-pixel CSS value for the sticky header", () => {
    expect(headerHeightPx(88.4)).toBe("88px");
    expect(headerHeightPx(-4)).toBe("0px");
  });
});
