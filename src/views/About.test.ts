import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { RecommendationCard } from "@/components/ui/recommendation-card";
import {
  DENTAL_TRANSITIONS_HANDBOOK_URL,
  SECOND_EDITION_KINDLE_URL,
} from "@/lib/constants";
import {
  FIRST_EDITION_COVER,
  SECOND_EDITION_COVER,
} from "@/data/handbookCover";
import { leaders } from "./About";

describe("About published resources", () => {
  it("lists the Second Edition first, then keeps the first edition", () => {
    const njo = leaders.find((leader) => leader.name === "Dr. Michael Njo");
    expect(njo?.books).toHaveLength(2);

    const [secondEdition, firstEdition] = njo!.books!;
    expect(secondEdition).toMatchObject({
      title: "Dental Practice Transitions Handbook, Second Edition",
      image: SECOND_EDITION_COVER.src,
      url: SECOND_EDITION_KINDLE_URL ?? "/resources/second-book",
    });
    expect(secondEdition.description).toContain(
      "A Blueprint for Buying and Selling Healthcare Practices in Different Economic Climates",
    );
    expect(firstEdition).toMatchObject({
      title: "Dental Practice Transitions Handbook",
      image: FIRST_EDITION_COVER.src,
      url: DENTAL_TRANSITIONS_HANDBOOK_URL,
      compact: true,
    });
    expect(secondEdition.url).not.toBe(firstEdition.url);
  });

  it("renders both Amazon links with the new cover before the first-edition wrap", () => {
    const njo = leaders.find((leader) => leader.name === "Dr. Michael Njo");
    const html = renderToStaticMarkup(
      createElement(RecommendationCard, {
        imageUrl: njo!.image,
        name: njo!.name,
        title: njo!.role,
        books: njo!.books,
      }),
    );

    expect(html).toContain("Dental Practice Transitions Handbook, Second Edition");
    expect(html).toContain(`href="${SECOND_EDITION_KINDLE_URL}"`);
    expect(html).toContain(`href="${DENTAL_TRANSITIONS_HANDBOOK_URL}"`);
    expect(html).toContain("handbook-second-edition-front-cover.webp");
    expect(html).toContain("handbook-cover-spread.webp");
    expect(html.indexOf("handbook-second-edition-front-cover.webp")).toBeLessThan(
      html.indexOf("handbook-cover-spread.webp"),
    );
    expect(html.indexOf("Second Edition")).toBeLessThan(
      html.indexOf("First edition"),
    );
  });
});
