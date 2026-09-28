import { createElement as h } from "react";
import { renderToString } from "react-dom/server";
import { describe, expect, it } from "vitest";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./accordion";

describe("Accordion", () => {
  it("server-renders closed answers so FAQ content is indexable", () => {
    const html = renderToString(
      h(
        Accordion,
        { type: "single", collapsible: true },
        h(
          AccordionItem,
          { value: "item-1" },
          h(AccordionTrigger, null, "How is a practice valued?"),
          h(AccordionContent, null, "Valuation weighs collections and cash flow.")
        )
      )
    );

    expect(html).toContain("Valuation weighs collections and cash flow.");
    expect(html).toMatch(/data-state="closed"[^>]*data-\[state=closed\]:hidden|data-\[state=closed\]:hidden[^>]*data-state="closed"/);
  });
});
