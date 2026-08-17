export interface ServiceOffering {
  title: string;
  description: string;
  url: string;
}

export const serviceOfferings: ServiceOffering[] = [
  {
    title: "Opinion of Value",
    description:
      "A documented analysis of practice financials, operations, and market context to support planning and negotiations.",
    url: "/services/value",
  },
  {
    title: "Selling a Practice",
    description:
      "Confidential preparation, buyer screening, negotiation support, and closing coordination for practice owners.",
    url: "/services/selling",
  },
  {
    title: "Selling to a DSO",
    description:
      "Independent DSO offer evaluation, valuation baselines, and negotiation support before you sign a letter of intent.",
    url: "/services/selling-to-a-dso",
  },
  {
    title: "Buying a Practice",
    description:
      "Acquisition guidance for evaluating opportunities, testing value, preparing for due diligence, and planning the ownership transition.",
    url: "/services/buying",
  },
  {
    title: "Associateships and Buy-Ins",
    description:
      "Structured pathways for associates to buy in and transition into ownership roles.",
    url: "/services/associateships",
  },
  {
    title: "Partnerships",
    description:
      "Business-term, valuation, and implementation guidance for dentists considering shared ownership.",
    url: "/services/partnerships",
  },
];
