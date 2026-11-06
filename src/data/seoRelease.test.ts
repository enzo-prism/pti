import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { transitionStories } from "./transitionStories";
import { getReviewBySlug } from "./reviews";
import { buildSeminarStructuredEvent, getSeminarDetailPath, practiceTransitionSeminarEvents } from "./practiceTransitionSeminar";
import { buildEventSchema } from "@/lib/structuredData";
import { getBreadcrumbsForPath } from "@/lib/routeBreadcrumbs";
import { buildSearchIndex } from "@/lib/searchIndex";
import sitemap from "@/app/sitemap";
import { faqItems } from "./faq";
import Faq from "@/views/Faq";

describe("SEO release discovery and source integrity", () => {
  it("makes each substantive story discoverable and retains its published source", () => {
    const urls = sitemap().map((entry) => entry.url);
    const search = buildSearchIndex(new Date("2026-11-06T12:00:00-08:00"));
    for (const story of transitionStories) {
      const path = `/case-studies/${story.slug}`;
      expect(getReviewBySlug(story.reviewSlug)?.quote.length).toBeGreaterThan(100);
      expect(urls).toContain(`https://practicetransitionsinstitute.com${path}`);
      expect(search.some((record) => record.url === path)).toBe(true);
      expect(getBreadcrumbsForPath(path)?.at(-1)?.path).toBe(path);
    }
  });
  it("gives each 2027 seminar a distinct canonical leaf and registration target", () => {
    const events = practiceTransitionSeminarEvents.filter((event) => event.date.endsWith("2027"));
    const urls = events.map((event) => {
      const schema = buildEventSchema(buildSeminarStructuredEvent(event, new Date("2026-11-06T12:00:00-08:00")));
      const path = getSeminarDetailPath(event);
      expect(schema.url).toBe(`https://practicetransitionsinstitute.com${path}`);
      expect(schema.offers).toMatchObject({ url: `https://practicetransitionsinstitute.com${path}#register`, price: 247 });
      expect(schema.location).toMatchObject({ name: `${event.city}, CA` });
      expect(schema.location).not.toHaveProperty("address.streetAddress");
      expect(getBreadcrumbsForPath(path)?.at(-1)?.path).toBe(path);
      return schema.url;
    });
    expect(new Set(urls).size).toBe(3);
  });
  it("renders contextual next steps with the FAQ answers", () => {
    const html = renderToStaticMarkup(createElement(Faq));
    for (const item of faqItems) expect(html).toContain(`href="${item.nextStep!.href}"`);
    expect(html).toContain("Use the practice sale readiness checklist");
  });
});
