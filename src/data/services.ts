export interface ServiceOffering {
  title: string;
  description: string;
  url: string;
}

export const serviceOfferings: ServiceOffering[] = [
  {
    title: "Opinion of Value",
    description:
      "Comprehensive valuation services to determine the true market value of your dental practice.",
    url: "/services/value",
  },
  {
    title: "Selling a Practice",
    description:
      "Strategic guidance and support for selling your practice to achieve maximum value.",
    url: "/services/selling",
  },
  {
    title: "Associateships/Buy In",
    description:
      "Structured pathways for associates to buy in and transition into ownership roles.",
    url: "/services/associateships",
  },
  {
    title: "Partnerships",
    description:
      "Creating equitable partnership arrangements that benefit all parties involved.",
    url: "/services/partnerships",
  },
];
