import { existsSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";
import { getUpcomingRawEvents, rawEvents } from "@/data/events";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { blogPosts } from "@/data/blogPosts";
import {
  getPastPracticeTransitionSeminarEvents,
  getSeminarRegistrationPrice,
  getUpcomingPracticeTransitionSeminarEvents,
  PRACTICE_TRANSITION_SEMINAR_PATH,
  PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
  practiceTransitionSeminarEvents,
  practiceTransitionSeminarLearningPoints,
} from "@/data/practiceTransitionSeminar";

describe("events dataset", () => {
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
        "mailto:info@practicetransitions.com?subject=Beyond%20the%20Chair%20Anaheim%20September%2025",
      flyerImage: "/lovable-uploads/drnjo-2026/promotional-flyer-dental-strategies.webp",
    });
    expect(workshop?.description).toContain("Contact PTI to confirm a seat");
    expect(workshop?.description).toContain("Michael A. Njo, DDS");
    expect(JSON.stringify(workshop)).not.toMatch(/registration is open|sold out/i);
    expect(
      getUpcomingRawEvents(new Date(2026, 7, 24)).some(
        (event) => event.id === workshop?.id
      )
    ).toBe(true);
    expect(
      getUpcomingRawEvents(new Date(2026, 8, 26)).some(
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
        "mailto:info@practicetransitions.com?subject=Roseville%20Dinner%20Availability",
    });
    expect(dinner?.description).toContain("confirm current seat availability");
    expect(JSON.stringify(dinner)).not.toMatch(/registration is open|sold out/i);
    expect(
      getUpcomingRawEvents(new Date(2026, 7, 21)).some(
        (event) => event.id === dinner?.id
      )
    ).toBe(true);
    expect(
      getUpcomingRawEvents(new Date(2026, 7, 28)).some(
        (event) => event.id === dinner?.id
      )
    ).toBe(false);
  });

  it("routes upcoming practice transition seminars to the native registration page", () => {
    const upcomingSeminars = getUpcomingRawEvents(new Date(2026, 7, 17)).filter(
      (event) =>
        event.title === "Mastering Your Dental Transition Into and Out of Practice"
    );

    expect(upcomingSeminars.map((event) => event.date)).toEqual([
      "October 2, 2026",
      "March 12, 2027",
    ]);

    for (const event of upcomingSeminars) {
      expect(event.registrationLink).toBe(PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH);
      expect(event.detailPath).toBe(PRACTICE_TRANSITION_SEMINAR_PATH);
      expect(event.offerPrice).toBe(297);
      expect(event.offerPriceCurrency).toBe("USD");
    }
  });

  it("uses one seminar schedule as the source for event cards and registration", () => {
    const eventCardSeminars = rawEvents.filter(
      (event) => event.detailPath === PRACTICE_TRANSITION_SEMINAR_PATH
    );

    expect(eventCardSeminars).toHaveLength(practiceTransitionSeminarEvents.length);
    expect(eventCardSeminars.map((event) => event.date)).toEqual(
      practiceTransitionSeminarEvents.map((event) => event.date)
    );
  });

  it("archives expired seminar dates and never returns them as registrable", () => {
    const referenceDate = new Date(2026, 7, 17);

    expect(
      getUpcomingPracticeTransitionSeminarEvents(referenceDate).map(
        (event) => event.value
      )
    ).toEqual(["october-2-2026-sacramento", "march-12-2027-anaheim"]);
    expect(
      getPastPracticeTransitionSeminarEvents(referenceDate).map(
        (event) => event.value
      )
    ).toEqual(["july-17-2026-san-francisco"]);
  });

  it("switches from early-bird to standard pricing after the deadline", () => {
    const sacramento = practiceTransitionSeminarEvents.find(
      (event) => event.city === "Sacramento"
    );
    expect(sacramento).toBeDefined();
    expect(
      getSeminarRegistrationPrice(sacramento!, new Date(2026, 8, 2, 23, 59))
    ).toBe(297);
    expect(
      getSeminarRegistrationPrice(sacramento!, new Date(2026, 8, 3, 0, 1))
    ).toBe(397);
    const eventsAfterDeadline = getUpcomingRawEvents(new Date(2026, 8, 3));
    expect(
      eventsAfterDeadline.find((event) => event.date === "October 2, 2026")
        ?.offerPrice
    ).toBe(397);
  });

  it("uses confirmed venues for the 2026 San Francisco and Sacramento seminars", () => {
    const sanFrancisco = rawEvents.find((event) => event.date === "July 17, 2026");
    const sacramento = rawEvents.find((event) => event.date === "October 2, 2026");

    expect(sanFrancisco?.location).toContain("Kohan Group");
    expect(sanFrancisco?.location).toContain("490 Post St.");
    expect(sacramento?.location).toContain("TDIC Headquarters");
    expect(sacramento?.location).toContain("1201 K St");
  });

  it("uses the confirmed venue for the 2027 Anaheim seminar", () => {
    const anaheim = rawEvents.find((event) => event.date === "March 12, 2027");

    expect(anaheim?.location).toContain("The Phillips Group");
    expect(anaheim?.location).toContain("2300 E Katella Ave #405");
  });

  it("attaches the Sacramento flyer and flyer copy only to the October 2 2026 date", () => {
    const octoberDates = rawEvents.filter((event) => event.date === "October 2, 2026");
    const sacramento = octoberDates[0];
    const anaheim = rawEvents.find((event) => event.date === "March 12, 2027");
    const sanFrancisco = rawEvents.find((event) => event.date === "July 17, 2026");
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
      location: "TDIC Headquarters, 1201 K St, 14th Floor, Sacramento, CA",
      registrationLink: PRACTICE_TRANSITION_SEMINAR_REGISTER_PATH,
      detailPath: PRACTICE_TRANSITION_SEMINAR_PATH,
      flyerImage:
        "/lovable-uploads/drnjo-2026/pti-sacramento-seminar-2026-flyer.webp",
      flyerImageAlt:
        "Practice Transitions Institute Sacramento seminar flyer, October 2 2026 at TDIC Headquarters.",
    });
    expect(typeof sacramento?.description).toBe("object");
    if (typeof sacramento?.description === "object") {
      expect(sacramento.description.intro).toContain(
        "evaluate today's transition landscape"
      );
      expect(sacramento.description.intro).toContain("Special Sacramento guest: TDIC");
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
});
