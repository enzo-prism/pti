import { describe, expect, it } from "vitest";
import { buildEventSchema } from "./structuredData";

describe("event structured data", () => {
  it("builds paid seminar offers without marking registration as free", () => {
    const schema = buildEventSchema({
      id: "pti-seminar-san-francisco-2026",
      title: "Practice Transitions Seminar - San Francisco",
      date: "July 17, 2026",
      time: "8:00 AM - 3:00 PM",
      location: "Kohan Group, 490 Post St., Ste 1135, San Francisco, CA",
      description: "A one-day dental practice transition seminar.",
      registrationLink: "/events/practice-transition-seminar#register",
      type: "seminar",
      detailPath: "/events/practice-transition-seminar",
      offerPrice: 297,
    });

    expect(schema["@id"]).toBe(
      "https://practicetransitionsinstitute.com/events/practice-transition-seminar#event-pti-seminar-san-francisco-2026"
    );
    expect(schema.url).toBe(
      "https://practicetransitionsinstitute.com/events/practice-transition-seminar#event-pti-seminar-san-francisco-2026"
    );
    expect(schema.offers).toMatchObject({
      "@type": "Offer",
      url: "https://practicetransitionsinstitute.com/events/practice-transition-seminar#register",
      price: 297,
      priceCurrency: "USD",
    });
  });

  it("defaults event offer price to zero when no price is supplied", () => {
    const schema = buildEventSchema({
      id: "webinar",
      title: "Webinar",
      date: "August 27, 2025",
      time: "5:30 PM PT",
      location: "Online",
      description: "A webinar.",
      registrationLink: "/contact",
      type: "webinar",
    });

    expect(schema.offers).toMatchObject({
      price: 0,
      priceCurrency: "USD",
    });
  });
});
