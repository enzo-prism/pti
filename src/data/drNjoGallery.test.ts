import { describe, expect, it } from "vitest";
import {
  drNjoGalleryImages,
  eventsSpeakingHighlightImages,
} from "./drNjoGallery";

const byId = (id: string) =>
  drNjoGalleryImages.find((image) => image.id === id);

describe("Dr. Njo gallery leadership copy", () => {
  it("names Dr. Allen Budenz on the tuxedo-and-medallion portrait", () => {
    const portrait = byId("blackTieMedalPortrait");

    expect(portrait?.names).toEqual(["Dr. Michael Njo", "Dr. Allen Budenz"]);
    expect(portrait?.alt).toMatch(/Allen Budenz/);
    expect(portrait?.caption).toMatch(/Dr\. Allen Budenz/);
    expect(JSON.stringify(portrait)).not.toMatch(/Allan Budenz|Alan Budenz/);
  });

  it("uses Mike's AI-startup caption without naming a company", () => {
    const photo = byId("officeSelfieGroup");

    expect(photo?.caption).toBe(
      "On the board of an AI startup (in stealth mode): with the founder and board of directors, notably our former Dean of University of the Pacific School of Dentistry, Nader Nadershahi, and Interim Dean Dr. Chavez.",
    );
    expect(photo?.names).toEqual([
      "Dr. Michael Njo",
      "Nader Nadershahi, former Dean, University of the Pacific School of Dentistry",
      "Dr. Chavez, Interim Dean",
    ]);
    expect(photo?.caption.toLowerCase()).not.toContain("openai");
    expect(photo?.caption).not.toMatch(/\b[A-Z][a-zA-Z]+(?:AI|Labs|Ventures)\b/);
  });

  it("replaces old speaking-highlight flyers with recent Panel of Experts photos", () => {
    const ids = eventsSpeakingHighlightImages.map((image) => image.id);

    expect(ids).toEqual([
      "panelDinnerGroup",
      "poeRosevilleCollage",
      "sfSeminarPresenting",
    ]);
    expect(ids).not.toContain("bluePrintFlyer");
    expect(ids).not.toContain("publicationSpread");
    expect(eventsSpeakingHighlightImages[0]?.caption).toMatch(/Los Angeles/i);
    expect(eventsSpeakingHighlightImages[1]?.caption).toMatch(/Roseville/i);
    expect(eventsSpeakingHighlightImages[2]?.caption).toMatch(/San Francisco/i);
  });

  it("leaves unidentified faces unlabeled", () => {
    const unlabeled = ["standingTrio", "mayflowerTrio", "conferenceRoomMeeting"];

    for (const id of unlabeled) {
      expect(byId(id)?.names).toBeUndefined();
    }
  });
});
