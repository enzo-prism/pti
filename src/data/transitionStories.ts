/** Summaries use only facts in the linked, already-published client accounts. */
export const transitionStories = [
  {
    slug: "tony-choi-practice-sale",
    title: "From transition seminar to practice sale",
    description: "Tony Choi describes choosing PTI after a seminar and handbook, finding a buyer, and completing his practice sale.",
    reviewSlug: "tony-choi-fast-practice-sale",
    name: "Tony Choi",
    situation: "Tony attended Michael Njo's practice transition seminar and read his book before choosing consultation support for his practice sale.",
    support: "His account describes PTI matching him with a buyer and guiding the transaction through completion.",
    outcome: "Tony reports a buyer match within two weeks and a completed transaction within 45 days. These are his reported results for that transaction, not a promised timeline for another practice.",
    questions: ["What information will a buyer need before making an offer?", "Which financing, lease and diligence milestones could affect my timeline?", "How will my team and patients be supported through the handoff?"],
    service: { label: "Selling your practice", href: "/services/selling" },
    guide: { label: "The steps in a dental practice sale", href: "/blog/how-to-sell-a-dental-practice-step-by-step" },
  },
  {
    slug: "john-senat-practice-ownership",
    title: "Finding support on the path to practice ownership",
    description: "John Senat describes the guidance and personal support that helped him prepare for dental practice ownership.",
    reviewSlug: "john-senat-practice-purchase",
    name: "John Senat",
    situation: "John was preparing to become a practice owner. The previous owner recommended Michael, and John describes building his own trust through their conversations.",
    support: "John highlights listening, guidance and availability, including support before a formal working relationship was established.",
    outcome: "John describes feeling more confident and supported as he prepared for ownership, with a trusted advisor available to help him navigate the decisions ahead.",
    questions: ["Who will help me examine the financial and operating records?", "How will the seller introduce me to the team and patients?", "Which decisions need my attorney, CPA and lender before I commit?"],
    service: { label: "Buyer and acquisition guidance", href: "/services/buying" },
    guide: { label: "Buyer due diligence checklist", href: "/blog/dental-practice-due-diligence-checklist" },
  },
  {
    slug: "lee-boese-sale-and-partnership-guidance",
    title: "Guidance through a sale and a difficult partnership",
    description: "Dr. Lee Boese describes Michael Njo's role in a practice sale and support during a contentious partnership situation.",
    reviewSlug: "dr-lee-boese-major-decisions",
    name: "Dr. Lee Boese",
    situation: "Dr. Boese describes knowing Michael since 2016, working with him on a practice sale in 2020, and seeking guidance during a contentious partnership situation.",
    support: "He highlights the valuation, a smooth sale process, and calm advice when difficult professional decisions arose.",
    outcome: "Dr. Boese reports that the valuation proved accurate and the sale process was smooth. During a later partnership conflict, he valued Michael's steady advice and perspective when weighing difficult decisions.",
    questions: ["Do the valuation and ownership terms reflect our agreed goals?", "How are decision rights, compensation and responsibilities documented?", "What process will we use if partners disagree or someone needs to exit?"],
    service: { label: "Partnership planning", href: "/services/partnerships" },
    guide: { label: "Planning a documented valuation", href: "/services/value" },
  },
] as const;

export const getTransitionStory = (slug: string) => transitionStories.find((story) => story.slug === slug);
