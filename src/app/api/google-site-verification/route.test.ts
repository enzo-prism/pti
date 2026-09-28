import { describe, expect, it } from "vitest";
import { GET } from "./route";

describe("Search Console verification route", () => {
  it("answers the rewritten ?file= form used on Vercel", async () => {
    const response = GET(
      new Request(
        "https://practicetransitionsinstitute.com/api/google-site-verification?file=google12cfc68677988bb4.html"
      )
    );
    expect(response.status).toBe(200);
    expect(await response.text()).toBe(
      "google-site-verification: google12cfc68677988bb4.html\n"
    );
  });

  it("answers the original path form used by next start", async () => {
    const response = GET(
      new Request("http://localhost:3000/google12cfc68677988bb4.html")
    );
    expect(response.status).toBe(200);
  });

  it("returns 404 for tokens PTI never issued", () => {
    expect(
      GET(new Request("https://practicetransitionsinstitute.com/googleabc123notreal.html"))
        .status
    ).toBe(404);
    expect(
      GET(
        new Request(
          "https://practicetransitionsinstitute.com/api/google-site-verification?file=googleabc123notreal.html"
        )
      ).status
    ).toBe(404);
  });
});
