import { describe, expect, it } from "vitest";
import { NextRequest } from "next/server";
import { middleware } from "./middleware";

describe("canonical host middleware", () => {
  it("redirects the www host to the apex canonical host", () => {
    const request = new NextRequest(
      "https://www.practicetransitionsinstitute.com/faq?x=1",
    );

    const response = middleware(request);

    expect(response.status).toBe(308);
    expect(response.headers.get("location")).toBe(
      "https://practicetransitionsinstitute.com/faq?x=1",
    );
  });

  it("allows the canonical apex host through without a redirect", () => {
    const request = new NextRequest(
      "https://practicetransitionsinstitute.com/faq",
    );

    const response = middleware(request);

    expect(response.status).toBe(200);
    expect(response.headers.get("x-middleware-next")).toBe("1");
  });
});
