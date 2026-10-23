import { readFileSync } from "node:fs";
import { join } from "node:path";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { ContactChannels } from "@/components/contact/ContactChannels";
import Footer from "@/components/layout/Footer";
import PrivacyPolicy from "@/views/PrivacyPolicy";
import TermsOfService from "@/views/TermsOfService";
import { buildPageJsonLd } from "./seo";
import { SITE_CONTACT_EMAIL } from "./siteMetadata";

const CONTACT_EMAIL = "info@practicetransitionsinstitute.com";

describe("public contact email", () => {
  it("uses PTI's correctly spelled institute inbox", () => {
    expect(SITE_CONTACT_EMAIL).toBe(CONTACT_EMAIL);
  });

  it("keeps the public AI discovery document aligned with the contact inbox", () => {
    const llms = readFileSync(join(process.cwd(), "public/llms.txt"), "utf8");
    expect(llms.match(/^- Email: (.+)$/m)?.[1]).toBe(CONTACT_EMAIL);
    expect(llms).not.toMatch(/practicetransitions\.com|practicetranstionsinstitute\.com/i);
  });

  it.each([
    ["footer", Footer],
    ["contact channels", ContactChannels],
    ["privacy policy", PrivacyPolicy],
    ["terms of service", TermsOfService],
  ] as const)("renders the correct visible email and mailto in %s", (_name, Component) => {
    const html = renderToStaticMarkup(createElement(Component));
    expect(html).toContain(`href="mailto:${CONTACT_EMAIL}"`);
    expect(html).toContain(`>${CONTACT_EMAIL}<`);
    expect(html).not.toMatch(/practicetransitions\.com|practicetranstionsinstitute\.com/i);
  });

  it.each(["/contact", "/events"])("publishes the correct contact point in %s JSON-LD", (path) => {
    const jsonLd = buildPageJsonLd({
      title: "Contact PTI",
      description: "Contact information",
      path,
    });
    const graph = jsonLd["@graph"] as Record<string, unknown>[];
    expect(graph.find((node) => node["@type"] === "ProfessionalService")).toMatchObject({
      contactPoint: [{ email: CONTACT_EMAIL }],
    });
  });
});
