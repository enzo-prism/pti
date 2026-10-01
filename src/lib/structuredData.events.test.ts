import { describe, expect, it } from "vitest";
import {
  buildSeminarStructuredEvent,
  practiceTransitionSeminarEvents,
} from "@/data/practiceTransitionSeminar";
import { buildEventSchema } from "./structuredData";

const sacramento2026 = practiceTransitionSeminarEvents.find(
  (event) => event.id === "pti-seminar-sacramento-2026"
)!;

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

  it("emits Pacific wall-clock start and end times with their offset", () => {
    const schema = buildEventSchema(
      buildSeminarStructuredEvent(sacramento2026, new Date("2026-09-27T12:00:00-07:00"))
    );

    expect(schema.startDate).toBe("2026-10-02T08:00:00-07:00");
    expect(schema.endDate).toBe("2026-10-02T15:00:00-07:00");
  });

  it("describes the venue as a Place with a postal address", () => {
    const schema = buildEventSchema(
      buildSeminarStructuredEvent(sacramento2026, new Date("2026-09-27T12:00:00-07:00"))
    );

    expect(schema.location).toEqual({
      "@type": "Place",
      name: "TDIC Headquarters",
      address: {
        "@type": "PostalAddress",
        streetAddress: "1201 K St, 14th Floor",
        addressLocality: "Sacramento",
        addressRegion: "CA",
        addressCountry: "US",
      },
    });
    expect(schema.image).toBe("https://practicetransitionsinstitute.com/opengraph.png");
  });

  it("keeps Event JSON-LD at the approved $397 until pending Liz terms are confirmed", () => {
    const beforeDeadline = buildEventSchema(
      buildSeminarStructuredEvent(sacramento2026, new Date("2026-09-02T20:00:00-07:00"))
    );
    const afterDeadline = buildEventSchema(
      buildSeminarStructuredEvent(sacramento2026, new Date("2026-09-03T00:01:00-07:00"))
    );
    const duringPendingEarlyBird = buildEventSchema(
      buildSeminarStructuredEvent(sacramento2026, new Date("2026-10-01T12:00:00-07:00"))
    );

    expect(beforeDeadline.offers).toMatchObject({ price: 397 });
    expect(afterDeadline.offers).toMatchObject({ price: 397 });
    expect(duringPendingEarlyBird.offers).toMatchObject({ price: 397 });
  });

  it("omits the offer when no price is published", () => {
    const schema = buildEventSchema({
      id: "dinner",
      title: "Dinner",
      date: "August 27, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Fats Asia Bistro, Roseville, CA",
      description: "A dinner.",
      registrationLink: "mailto:info@practicetransitions.com",
      type: "dinner",
    });

    expect(schema).not.toHaveProperty("offers");
    expect(schema.location).toMatchObject({ name: "Fats Asia Bistro" });
  });

  it("keeps an explicit free price and never uses mailto: as a web URL", () => {
    const schema = buildEventSchema({
      id: "webinar",
      title: "Webinar",
      date: "August 27, 2025",
      time: "5:30 PM PT • 8:30 PM ET",
      location: "Online",
      description: "A webinar.",
      registrationLink: "mailto:info@practicetransitions.com",
      type: "webinar",
      offerPrice: 0,
    });

    expect(schema.startDate).toBe("2025-08-27T17:30:00-07:00");
    expect(schema).not.toHaveProperty("endDate");
    expect(schema.offers).toMatchObject({
      price: 0,
      url: "https://practicetransitionsinstitute.com/events#event-webinar",
    });
    expect(schema.location).toEqual({
      "@type": "VirtualLocation",
      url: "https://practicetransitionsinstitute.com/events#event-webinar",
    });
  });

  it("keeps archived events scheduled and removes registration offers", () => {
    const schema = buildEventSchema({
      id: "leadership-retreat-2026",
      title: "Leadership Retreat",
      date: "June 4, 2026",
      endDate: "June 6, 2026",
      timeZone: "America/New_York",
      time: "Multi-day",
      location: "Savannah, GA",
      description: "A completed leadership retreat.",
      registrationLink: "https://www.dentistretreat.com/",
      type: "conference",
      detailPath: "/events/leadership-retreat",
      registrationOpen: false,
      offerPrice: 500,
    });

    expect(schema.eventStatus).toBe("https://schema.org/EventScheduled");
    expect(schema.startDate).toBe("2026-06-04");
    expect(schema.endDate).toBe("2026-06-06");
    expect(schema).not.toHaveProperty("offers");
    expect(schema.location).toMatchObject({
      name: "Savannah, GA",
      address: { addressLocality: "Savannah", addressRegion: "GA" },
    });
  });
});
