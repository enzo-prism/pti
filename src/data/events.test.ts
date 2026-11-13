import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import {
  buildEventListing,
  getUpcomingRawEvents,
  rawEvents,
  type RawEvent,
} from "@/data/events";
import { buildEventSchema } from "@/lib/structuredData";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { blogPosts } from "@/data/blogPosts";
import {
  getPastPracticeTransitionSeminarEvents,
  getSeminarRegistrationPrice,
  getUpcomingPracticeTransitionSeminarEvents,
  PRACTICE_TRANSITION_SEMINAR_PATH,
  getSeminarDetailPath,
  practiceTransitionSeminarEvents,
  practiceTransitionSeminarLearningPoints,
} from "@/data/practiceTransitionSeminar";

describe("events dataset", () => {
  it("lists the requested Sacramento dinner without inventing unconfirmed details", () => {
    const dinner = rawEvents.find(
      (event) => event.id === "panel-of-experts-sacramento-2027"
    );
    expect(dinner).toMatchObject({
      title: "Panel of Experts Dinner",
      date: "October 14, 2027",
      time: "Time to be confirmed",
      location: "Sacramento, CA",
      type: "dinner",
    });
    expect(dinner?.registrationLink).toContain("mailto:info@practicetransitionsinstitute.com");
    expect(dinner).not.toHaveProperty("speakers");
    expect(dinner).not.toHaveProperty("offerPrice");
    const referenceDate = new Date("2027-10-14T12:00:00-07:00");
    expect(getUpcomingRawEvents(referenceDate)).toContainEqual(dinner);
    expect(getUpcomingRawEvents(new Date("2027-10-15T00:00:00-07:00")))
      .not.toContainEqual(dinner);
  });

  it("lists the 2027 Panel of Experts dinners by city without inventing details", () => {
    const expected = [
      ["panel-of-experts-orange-county-jan-2027", "January 21, 2027", "Orange County, CA"],
      ["panel-of-experts-thousand-oaks-may-2027", "May 20, 2027", "Thousand Oaks, CA"],
      ["panel-of-experts-pasadena-jul-2027", "July 15, 2027", "Pasadena, CA"],
      ["panel-of-experts-bakersfield-2027", "October 21, 2027", "Bakersfield, CA"],
    ] as const;
    for (const [id, date, location] of expected) {
      const dinner = rawEvents.find((event) => event.id === id);
      expect(dinner).toMatchObject({
        title: "Panel of Experts Dinner",
        date,
        time: "Time to be confirmed",
        location,
        type: "dinner",
      });
      expect(dinner?.registrationLink).toContain("mailto:info@practicetransitionsinstitute.com");
      expect(dinner).not.toHaveProperty("speakers");
      expect(dinner).not.toHaveProperty("offerPrice");
      expect(getUpcomingRawEvents(new Date("2026-11-08T12:00:00-08:00"))).toContainEqual(dinner);
    }
  });

  it("lists the Beyond the Chair Anaheim workshop without overstating availability", () => {
    const workshop = rawEvents.find(
      (event) => event.id === "beyond-the-chair-anaheim-2026"
    );

    expect(workshop).toMatchObject({
      title: "The Dental Practice Beyond the Chair",
      date: "September 25, 2026",
      time: "8:30 AM - 1:30 PM",
      location: "The Phillips Group, 2300 E. Katella Ave, Suite 405, Anaheim, CA",
      type: "workshop",
      registrationLink:
        "mailto:info@practicetransitionsinstitute.com?subject=Beyond%20the%20Chair%20Anaheim%20September%2025",
      flyerImage: "/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp",
    });
    expect(workshop?.description).toContain("Contact PTI to confirm a seat");
    expect(workshop?.description).toContain("Michael A. Njo, DDS");
    expect(JSON.stringify(workshop)).not.toMatch(/registration is open/i);
    expect(
      getUpcomingRawEvents(new Date("2026-08-24T12:00:00-07:00")).some(
        (event) => event.id === workshop?.id
      )
    ).toBe(true);
    expect(
      getUpcomingRawEvents(new Date("2026-09-26T12:00:00-07:00")).some(
        (event) => event.id === workshop?.id
      )
    ).toBe(false);
  });

  it("lists the Roseville Practice Blueprint dinner without overstating availability", () => {
    const dinner = rawEvents.find(
      (event) => event.id === "practice-blueprint-dinner-roseville-2026"
    );

    expect(dinner).toMatchObject({
      title: "The Practice Blueprint Dinner",
      date: "August 27, 2026",
      time: "6:00 PM - 9:00 PM",
      location: "Fats Asia Bistro, Roseville, CA",
      type: "dinner",
      registrationLink:
        "mailto:info@practicetransitionsinstitute.com?subject=Roseville%20Dinner%20Availability",
    });
    expect(dinner?.description).toContain("confirm current seat availability");
    expect(JSON.stringify(dinner)).not.toMatch(/registration is open/i);
    expect(
      getUpcomingRawEvents(new Date("2026-08-21T12:00:00-07:00")).some(
        (event) => event.id === dinner?.id
      )
    ).toBe(true);
    expect(
      getUpcomingRawEvents(new Date("2026-08-28T12:00:00-07:00")).some(
        (event) => event.id === dinner?.id
      )
    ).toBe(false);
  });

  it("lists the Gargle Growth Summit with the interest list call to action", () => {
    const summit = rawEvents.find(
      (event) => event.id === "gargle-growth-summit-2027"
    );

    expect(summit).toMatchObject({
      title: "GARGLE: The Growth Summit",
      date: "September 23, 2027",
      endDate: "September 25, 2027",
      location: "Cancun, Mexico",
      type: "conference",
      registrationLink:
        "mailto:info@practicetransitionsinstitute.com?subject=Growth%20Summit%20Interest%20List",
    });
    expect(JSON.stringify(summit?.description)).toContain("Seats are limited");
    expect(JSON.stringify(summit?.description)).toContain(
      "Financial Freedom & Wealth Strategy"
    );
    expect(JSON.stringify(summit)).not.toMatch(/registration is open/i);
    expect(
      getUpcomingRawEvents(new Date("2027-09-01T12:00:00-07:00")).some(
        (event) => event.id === summit?.id
      )
    ).toBe(true);
    expect(
      getUpcomingRawEvents(new Date("2027-09-26T12:00:00-07:00")).some(
        (event) => event.id === summit?.id
      )
    ).toBe(false);
  });

  it("routes upcoming practice transition seminars to the native registration page", () => {
    const upcomingSeminars = getUpcomingRawEvents(new Date("2026-08-17T12:00:00-07:00")).filter(
      (event) =>
        event.title === "Mastering Your Dental Transition Into and Out of Practice"
    );

    expect(upcomingSeminars.map((event) => event.date)).toEqual([
      "October 2, 2026",
      "March 12, 2027",
      "July 30, 2027",
      "October 15, 2027",
    ]);

    for (const event of upcomingSeminars) {
      const seminar = practiceTransitionSeminarEvents.find((candidate) => candidate.id === event.id)!;
      expect(event.registrationLink).toBe(`${getSeminarDetailPath(seminar)}#register`);
      expect(event.detailPath).toBe(getSeminarDetailPath(seminar));
      expect(event.offerPrice).toBe(getSeminarRegistrationPrice(seminar, new Date("2026-08-17T12:00:00-07:00")));
      expect(event.offerPriceCurrency).toBe("USD");
    }
  });

  it("uses one seminar schedule as the source for event cards and registration", () => {
    const eventCardSeminars = rawEvents.filter(
      (event) => event.detailPath?.startsWith(`${PRACTICE_TRANSITION_SEMINAR_PATH}/`)
    );

    expect(eventCardSeminars).toHaveLength(practiceTransitionSeminarEvents.length);
    expect(eventCardSeminars.map((event) => event.date)).toEqual(
      practiceTransitionSeminarEvents.map((event) => event.date)
    );
  });

  it("archives expired seminar dates and never returns them as registrable", () => {
    const referenceDate = new Date("2026-08-17T12:00:00-07:00");

    expect(
      getUpcomingPracticeTransitionSeminarEvents(referenceDate).map(
        (event) => event.value
      )
    ).toEqual([
      "october-2-2026-sacramento",
      "march-12-2027-anaheim",
      "july-30-2027-san-francisco",
      "october-15-2027-sacramento",
    ]);
    expect(
      getPastPracticeTransitionSeminarEvents(referenceDate).map(
        (event) => event.value
      )
    ).toEqual(["july-17-2026-san-francisco"]);
  });

  it("switches from early-bird to standard pricing after the deadline", () => {
    const sacramento = practiceTransitionSeminarEvents.find(
      (event) => event.date === "October 2, 2026"
    );
    expect(sacramento).toBeDefined();
    expect(
      getSeminarRegistrationPrice(sacramento!, new Date("2026-09-02T23:59:00-07:00"))
    ).toBe(297);
    expect(
      getSeminarRegistrationPrice(sacramento!, new Date("2026-09-03T00:01:00-07:00"))
    ).toBe(397);
    // 8 PM PDT on the deadline is already September 3 in UTC; still early-bird.
    expect(
      getSeminarRegistrationPrice(sacramento!, new Date("2026-09-02T20:00:00-07:00"))
    ).toBe(297);
    const eventsAfterDeadline = getUpcomingRawEvents(new Date("2026-09-03T12:00:00-07:00"));
    expect(
      eventsAfterDeadline.find((event) => event.date === "October 2, 2026")
        ?.offerPrice
    ).toBe(397);
  });

  it("keeps 2027 event-hub offers aligned with the year-end preview promotion", () => {
    for (const [referenceDate, expectedPrice] of [
      [new Date("2026-12-31T23:59:59-08:00"), 247],
      [new Date("2027-01-01T00:00:00-08:00"), 397],
    ] as const) {
      const seminars = getUpcomingRawEvents(referenceDate).filter((event) =>
        event.detailPath?.startsWith(`${PRACTICE_TRANSITION_SEMINAR_PATH}/`)
      );
      expect(seminars).toHaveLength(3);
      expect(seminars.map((event) => event.offerPrice)).toEqual([
        expectedPrice, expectedPrice, expectedPrice,
      ]);
    }
  });

  it("publishes city-only locations for the 2026 seminars", () => {
    const sanFrancisco = rawEvents.find((event) => event.date === "July 17, 2026");
    const sacramento = rawEvents.find((event) => event.date === "October 2, 2026");

    expect(sanFrancisco?.location).toBe("San Francisco, CA");
    expect(sacramento?.location).not.toMatch(/TDIC/);
    expect(sacramento?.location).toBe("Sacramento, CA");
  });

  it("publishes a city-only location for the 2027 Anaheim seminar", () => {
    const anaheim = rawEvents.find((event) => event.date === "March 12, 2027");

    expect(anaheim?.location).toBe("Anaheim, CA");
  });

  it("publishes city-only locations for the 2027 seminars", () => {
    const sanFrancisco = rawEvents.find((event) => event.date === "July 30, 2027");
    const sacramento = rawEvents.find((event) => event.date === "October 15, 2027");

    expect(sanFrancisco?.location).toBe("San Francisco, CA");
    expect(sacramento?.location).not.toMatch(/TDIC/);
    expect(sacramento?.location).toBe("Sacramento, CA");
  });

  it("attaches the Sacramento flyer and flyer copy only to the October 2 2026 date", () => {
    const octoberDates = rawEvents.filter((event) => event.date === "October 2, 2026");
    const sacramento = octoberDates[0];
    const anaheim = rawEvents.find((event) => event.date === "March 12, 2027");
    const sanFrancisco = rawEvents.find((event) => event.date === "July 17, 2026");
    const sacramento2027 = rawEvents.find((event) => event.date === "October 15, 2027");
    const sanFrancisco2027 = rawEvents.find((event) => event.date === "July 30, 2027");
    const beyondTheChair = rawEvents.find(
      (event) => event.id === "beyond-the-chair-anaheim-2026"
    );

    expect(octoberDates).toHaveLength(1);
    expect(sacramento).toMatchObject({
      id: "pti-seminar-sacramento-2026",
      title: "Mastering Your Dental Transition Into and Out of Practice",
      subtitle: "BEFORE YOU BUY, EXPAND, PARTNER, OR SELL / KNOW YOUR OPTIONS",
      standalone: true,
      time: "8:00 AM - 3:00 PM",
      location: "Sacramento, CA",
      registrationLink: "/events/practice-transition-seminar/october-2-2026-sacramento#register",
      detailPath: "/events/practice-transition-seminar/october-2-2026-sacramento",
      flyerImage:
        "/lovable-uploads/drnjo-2026/pti-sacramento-seminar-2026-flyer.webp",
      flyerImageAlt:
        "Practice Transitions Institute Sacramento seminar flyer, October 2 2026 in Sacramento, CA.",
    });
    expect(typeof sacramento?.description).toBe("object");
    if (typeof sacramento?.description === "object") {
      expect(sacramento.description.intro).toContain(
        "evaluate today's transition landscape"
      );
      expect(sacramento.description.intro).not.toMatch(/TDIC/);
      expect(sacramento.description.intro).toContain(
        "from buying and expanding to transitioning and selling"
      );
      expect(sacramento.description.learningPoints).toEqual([
        "Which transition path may be right for you: start-up, associate buy-in, partnership, private sale, or DSO",
        "When to begin preparing—and why timing can dramatically affect your options",
        "How to evaluate a practice or opportunity beyond the asking price",
        "What buyers are looking for in today's market",
        "How to build the right advisory team and create a transition timeline that protects your future",
      ]);
    }
    expect(sacramento?.speakers).toEqual([
      {
        name: "Liz Armato",
        title: "COO",
        imageUrl: "/lovable-uploads/dfcf139a-4116-4e53-ac55-479fd8d2bbb8.png",
      },
      {
        name: "Dr. Michael Njo",
        title: "Founder & Lead Transition Consultant",
        imageUrl: "/lovable-uploads/fccc20e2-c4f3-4b29-8473-f24585fbc306.png",
      },
    ]);

    expect(anaheim?.flyerImage).toBeUndefined();
    expect(anaheim?.standalone).toBeUndefined();
    expect(anaheim?.speakers).toBeUndefined();
    expect(JSON.stringify(anaheim)).not.toMatch(/TDIC/);
    expect(typeof anaheim?.description).toBe("object");
    if (typeof anaheim?.description === "object") {
      expect(anaheim.description.learningPoints).toEqual(
        practiceTransitionSeminarLearningPoints
      );
    }

    expect(sanFrancisco?.flyerImage).toBeUndefined();
    expect(JSON.stringify(sanFrancisco)).not.toMatch(/TDIC/);

    expect(sacramento2027?.flyerImage).toBeUndefined();
    expect(sacramento2027?.standalone).toBeUndefined();
    expect(sacramento2027?.speakers).toBeUndefined();
    expect(JSON.stringify(sacramento2027)).not.toMatch(/TDIC/);
    expect(typeof sacramento2027?.description).toBe("object");
    if (typeof sacramento2027?.description === "object") {
      expect(sacramento2027.description.learningPoints).toEqual(
        practiceTransitionSeminarLearningPoints
      );
    }

    expect(sanFrancisco2027?.flyerImage).toBeUndefined();
    expect(JSON.stringify(sanFrancisco2027)).not.toMatch(/TDIC/);

    expect(beyondTheChair?.date).toBe("September 25, 2026");
    expect(beyondTheChair?.flyerImage).toBe(
      "/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp"
    );
    expect(
      existsSync(
        resolve(
          process.cwd(),
          "public/lovable-uploads/drnjo-2026/pti-sacramento-seminar-2026-flyer.webp"
        )
      )
    ).toBe(true);
    expect(
      [...communityImpactPosts, ...blogPosts].some((post) =>
        JSON.stringify(post).includes("pti-sacramento-seminar-2026-flyer")
      )
    ).toBe(false);
  });

  it("decides past events in Pacific time when building the listing", () => {
    // 8 PM PDT on October 2 is already October 3 in UTC.
    const eventEvening = new Date("2026-10-02T20:00:00-07:00");
    const sacramento = buildEventListing(eventEvening).find(
      (event) => event.id === "pti-seminar-sacramento-2026"
    );
    expect(sacramento?.isPast).toBe(false);

    const nextMorning = new Date("2026-10-03T08:00:00-07:00");
    expect(
      buildEventListing(nextMorning).find(
        (event) => event.id === "pti-seminar-sacramento-2026"
      )?.isPast
    ).toBe(true);
  });

  it("groups a same-title seminar series into one card with every date", () => {
    const listing = buildEventListing(new Date("2026-09-27T12:00:00-07:00"));
    const series = listing.find(
      (event) =>
        event.isEventGroup &&
        event.title === "Mastering Your Dental Transition Into and Out of Practice"
    );

    expect(series?.isPast).toBe(false);
    expect(series?.date).toBe("March 12, 2027");
    expect(series?.eventDates?.map((date) => date.date)).toContain("July 11, 2025");
    expect(
      series?.eventDates?.filter((date) => !date.isPast).map((date) => date.date)
    ).toEqual(["March 12, 2027", "July 30, 2027", "October 15, 2027"]);
    // Standalone Sacramento keeps its own card, ahead of every past event.
    const firstPastIndex = listing.findIndex((event) => event.isPast);
    const sacramentoIndex = listing.findIndex(
      (event) => event.id === "pti-seminar-sacramento-2026"
    );
    expect(sacramentoIndex).toBeGreaterThanOrEqual(0);
    expect(sacramentoIndex).toBeLessThan(firstPastIndex);
  });

  it("marks every past listing entry as sold out and never an upcoming one", () => {
    const listing = buildEventListing(new Date("2026-11-03T12:00:00-08:00"));

    expect(listing.length).toBeGreaterThan(0);
    for (const event of listing) {
      expect(event.soldOut).toBe(event.isPast);
    }

    const sacramento = listing.find(
      (event) => event.id === "pti-seminar-sacramento-2026"
    );
    expect(sacramento?.isPast).toBe(true);
    expect(sacramento?.soldOut).toBe(true);
    expect(sacramento?.location).not.toMatch(/TDIC/);

    const panel = listing.find(
      (event) => event.title === "Panel of Experts Dinner"
    );
    expect(panel?.isPast).toBe(false);
    expect(panel?.soldOut).toBe(false);
    expect(panel?.eventDates?.map((date) => [date.date, date.location])).toEqual([
      ["January 21, 2027", "Orange County, CA"],
      ["May 20, 2027", "Thousand Oaks, CA"],
      ["July 15, 2027", "Pasadena, CA"],
      ["October 14, 2027", "Sacramento, CA"],
      ["October 21, 2027", "Bakersfield, CA"],
    ]);
  });

  it("emits city-only JSON-LD locations for the 2027 Panel of Experts dinners", () => {
    const expected = [
      ["panel-of-experts-orange-county-jan-2027", "Orange County"],
      ["panel-of-experts-thousand-oaks-may-2027", "Thousand Oaks"],
      ["panel-of-experts-pasadena-jul-2027", "Pasadena"],
      ["panel-of-experts-sacramento-2027", "Sacramento"],
      ["panel-of-experts-bakersfield-2027", "Bakersfield"],
    ] as const;
    const dinners = rawEvents.filter(
      (event) => event.title === "Panel of Experts Dinner"
    );

    expect(dinners.map((event) => event.id).sort()).toEqual(
      [...expected.map(([id]) => id)].sort()
    );
    expect(dinners.map((event) => event.id)).not.toEqual(
      expect.arrayContaining([
        "panel-of-experts-los-angeles-jan-2027",
        "panel-of-experts-los-angeles-may-2027",
      ])
    );

    for (const [id, locality] of expected) {
      const dinner = dinners.find((event) => event.id === id);
      expect(dinner?.location).toBe(`${locality}, CA`);
      expect(dinner?.location).not.toMatch(
        /Los Angeles|firm|Ave|Street|Suite|Restaurant/i
      );

      const schema = buildEventSchema(toDinnerStructuredEvent(dinner!));
      const location = schema.location as {
        name?: string;
        address?: Record<string, unknown>;
      };
      expect(location).toEqual({
        "@type": "Place",
        name: `${locality}, CA`,
        address: {
          "@type": "PostalAddress",
          addressLocality: locality,
          addressRegion: "CA",
          addressCountry: "US",
        },
      });
      expect(location.address).not.toHaveProperty("streetAddress");
    }
  });
});

function toDinnerStructuredEvent(event: RawEvent) {
  return {
    id: event.id,
    title: event.title,
    date: event.date,
    time: event.time,
    location: event.location,
    description:
      typeof event.description === "string"
        ? event.description
        : event.description.intro,
    registrationLink: event.registrationLink,
    type: event.type,
  };
}
