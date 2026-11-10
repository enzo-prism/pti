import { describe, expect, it } from "vitest";
import {
  getAllReviewSlugs,
  getFeaturedReviews,
  getReviewBySlug,
  reviews,
} from "./reviews";

describe("reviews dataset", () => {
  it("has unique ids", () => {
    const ids = reviews.map((review) => review.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("has unique slugs", () => {
    const slugs = getAllReviewSlugs();
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("resolves every slug to a review", () => {
    for (const slug of getAllReviewSlugs()) {
      expect(getReviewBySlug(slug)?.slug).toBe(slug);
    }
  });

  it("features Craig Yarborough's letter first, then the newest undated Google review", () => {
    expect(reviews[0]?.id).toBe("internal-craig-yarborough-letter");
    expect(reviews[1]?.id).toBe("google-valentina-holina");
    expect(reviews[2]?.id).toBe("google-tanya-harris");
  });

  it("keeps Craig Yarborough's letter of recommendation source-exact", () => {
    const review = reviews.find(
      (item) => item.id === "internal-craig-yarborough-letter"
    );
    expect(review).toMatchObject({
      slug: "craig-yarborough-letter-of-recommendation",
      source: "internal",
      sourceAuthorName: "Craig S. Yarborough, DDS, MBA",
      sourceDateISO: "2026-01-06",
    });
    expect(review?.quote.split("\n\n")).toEqual([
      "To Whom It May Concern;",
      "This letter is in support of the abilities and contributions that Dr. Michael Njo voluntarily brought to University of the Pacific, Arthur A. Dugoni School of Dentistry and, in particular, the Dugoni Business Club.",
      "I am Dr. Craig Yarborough, former executive associate dean, associate dean for admissions, development and alumni relations, and director of the Center for Success at the Dugoni School which overlooked Dr. Njo's oversight with the Dugoni Business Club (DBC). Our relationship began in 2019 when former dean, Dr. Nader Nadershahi, brought him in as an asset and resource. I was fortunate to sit down with him early on to see what he could do with our fledgling but energetic and foundationally skilled DBC. The student members were educated in business and passionate but lacked focus, governance and direction. Dr. Njo immediately assessed the situation, implementing a strategic plan and the governance to sustain the consistent turnover of members that naturally occurred with graduation.",
      "His contributions were notable and impressive, organizing and creating infrastructure for success, implementing:\n- Bylaws\n- Creating roles and officers\n- Governing body - running the meeting like a \"real\" board...providing life experiences so that they are prepared to go right into leadership in their offices, communities and organized dentistry!\n- Succession plan\n- Standard Operating Procedures, SOP's, for events\n- Calendar of events",
      "This required broad communications among members and the communities they collaborated with, one of many strengths of Dr. Njo. Membership in the DBC increased six-fold, a tribute to his organizational skills, charisma, inspiration, motivation and passion for students, alumni, stakeholders and the profession.",
      "One of Michael's many strengths is his ability to collaborate and bring people together. This was represented by him establishing events and protocols such as inaugurating Dugoni Mixers at our Annual Alumni meeting, drawing initially 25 attendees in independent activity to 180 students, alumni and business entities and now sponsored by our Alumni Association. Additionally, he instituted an Annual Symposium, a kickoff for membership drive and fund raising from industry vendors to sponsor and support the club. With the increased in membership fees, speaker and sponsor contributions and other fund-raising, he encouraged and accomplished philanthropy among its members. This created a surplus of $15K, reducing membership fees and allowing the Club to adopt the habit of giving back. This started with a first-time gift of $1K to the Arthur Dugoni Scholarship with intent to make this an annual commitment.",
      "If you are looking for someone to engage your stakeholders, assess the organization's strengths and weaknesses, form a strategic plan and successfully implement it, Dr. Michael Njo is your man. I am happy to provide any additional comments upon request.",
      "Respectfully,",
    ]);
  });

  it("keeps Valentina Holina's Google review quote-only with source paragraphs", () => {
    const review = reviews.find((item) => item.id === "google-valentina-holina");
    expect(review).toMatchObject({
      slug: "valentina-holina-practice-sale",
      source: "google",
      category: "seller",
      rating: 5,
      sourceAuthorName: "Valentina Holina",
      displayAuthorName: "Valentina Holina",
      role: "Practice Seller",
      sortOrder: -2,
    });
    expect(review?.sourceUrl).toBeUndefined();
    expect(review?.sourceDateISO).toBeUndefined();
    expect(review?.quote.split("\n\n")).toEqual([
      "Michael Njo is truly a miracle worker!",
      "His dedication, connections, and incredible tenacity are what set him apart. He knows how to get things done, overcome obstacles, and guide his clients across the finish line, no matter how challenging the journey becomes.",
      "Throughout the entire process of selling my dental practice, Michael demonstrated extraordinary patience, wisdom, professionalism, and knowledge. He was always there to offer guidance, reassurance, and support, practically holding my hand every step of the way.",
      "What makes Michael truly special is that he genuinely cares about his clients and never gives up on them. His experience, determination, and ability to make things happen are simply remarkable.",
      "If you are looking for someone who will go above and beyond to get you to the finish line, Michael Njo is the person you want by your side. I cannot recommend him highly enough!",
    ]);
  });

  it("includes John Senat's full buyer testimonial near the top", () => {
    const review = getReviewBySlug("john-senat-practice-purchase");
    expect(review).toMatchObject({
      id: "internal-john-senat",
      source: "internal",
      category: "buyer",
      rating: 5,
      sourceAuthorName: "John Senat",
      displayAuthorName: "John Senat",
      role: "Practice Buyer",
    });
    expect(review?.quote).toContain(
      "I decided to bring Michael on board because, from the very beginning, he gave me a sense of confidence, reassurance, and genuine support"
    );
    expect(review?.quote).toContain(
      "Here's to a successful future and a lasting relationship built on trust, respect, and shared success!"
    );
    expect(reviews.indexOf(review!)).toBeLessThan(6);
  });

  it("features Craig Yarborough with his full UOP Dugoni letter", () => {
    const review = getReviewBySlug(
      "craig-s-yarborough-dds-mba-michael-many-thanks-for"
    );
    expect(review).toMatchObject({
      sourceAuthorName: "Craig S. Yarborough, DDS, MBA",
      displayAuthorName: "Craig S. Yarborough, DDS, MBA",
      company:
        "University of the Pacific, Arthur A. Dugoni School of Dentistry",
    });
    expect(review?.longForm?.body).toContain(
      "Membership in the DBC increased six-fold"
    );
    expect(review?.longForm?.body).toContain("Dugoni Mixers");
    expect(review?.longForm?.body).toContain("Annual Symposium");
    expect(review?.longForm?.documentUrl).toBe(
      "/documents/uop-yarborough-letter-of-recommendation-2026.pdf"
    );
    expect(reviews.indexOf(review!)).toBeLessThan(7);
  });

  it("returns featured slots in deterministic order", () => {
    const homeReviews = getFeaturedReviews("home");
    expect(homeReviews.map((review) => review.id)).toEqual([
      "google-ah-g-allen-herrera",
      "google-blaine-leeds",
      "google-tony-choi",
    ]);
  });

  it("uses distinct story titles for repeated first-name reviewers", () => {
    for (const author of ["Christina", "Lois", "Michelle"]) {
      const repeated = reviews.filter(
        (review) => review.displayAuthorName === author
      );
      expect(repeated.length).toBeGreaterThan(1);
      expect(repeated.every((review) => Boolean(review.storyTitle))).toBe(true);
      expect(new Set(repeated.map((review) => review.storyTitle)).size).toBe(
        repeated.length
      );
    }
  });
});
