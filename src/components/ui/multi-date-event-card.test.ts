import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { buildEventListing } from "@/data/events";
import { MultiDateEventCard } from "@/components/ui/multi-date-event-card";

describe("grouped Panel of Experts card", () => {
  it.each(["2026-11-09T12:00:00-08:00", "2027-10-01T12:00:00-07:00"])(
    "keeps neutral copy and availability actions as of %s",
    (referenceDate) => {
      const group = buildEventListing(new Date(referenceDate)).find(
        (event) => event.isEventGroup && event.title === "Panel of Experts Dinner"
      );
      expect(group).toBeDefined();
      if (!group) throw new Error("Missing grouped Panel of Experts dinner");

      expect(group.description).toBe(
        "A Panel of Experts dinner. Contact PTI for the time, program, and reservation details."
      );
      expect(group.description).not.toMatch(
        /Sacramento|Los Angeles|Orange County|Thousand Oaks|Pasadena|El Segundo|Bakersfield|January/i
      );
      expect(group.registrationLink).toBe(
        "mailto:info@practicetransitionsinstitute.com?subject=Panel%20of%20Experts%20Dinner%202027"
      );

      const markup = renderToStaticMarkup(createElement(MultiDateEventCard, {
        title: group.title,
        description: group.description,
        type: group.type,
        registrationLink: group.registrationLink,
        eventDates: group.eventDates!,
        isPast: group.isPast,
        getEventTypeColor: () => "",
      }));
      const links = [...markup.matchAll(/<a\b[^>]*href="([^"]*)"[^>]*>([\s\S]*?)<\/a>/g)]
        .map(([, href, content]) => ({ href, label: content.replace(/<[^>]*>/g, "").trim() }));
      expect(links).toContainEqual({
        href: group.registrationLink,
        label: "Confirm Availability",
      });
      expect(links).toContainEqual({ href: "tel:+18337841121", label: "Call PTI" });
      expect(markup).not.toMatch(/Email us to register|Alternative Email/);
    }
  );
});
