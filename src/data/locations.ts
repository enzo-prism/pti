// Service-area content for state landing pages. Each entry must carry
// genuinely distinct, accurate market context — these are not templated
// doorway pages. Icons are referenced by key and mapped to lucide-react
// components in `src/views/locations/LocationView.tsx`.

export type LocationIconKey =
  | "rules"
  | "overhead"
  | "board"
  | "buyers"
  | "tax"
  | "growth"
  | "retirees"
  | "consolidation";

export interface LocationConsideration {
  iconKey: LocationIconKey;
  title: string;
  description: string;
}

export interface LocationContent {
  slug: string;
  state: string;
  seoTitle: string;
  seoDescription: string;
  heroTitle: string;
  heroIntro: string;
  introParagraphs: string[];
  considerations: LocationConsideration[];
  regions: string[];
  summary: string; // used on the /locations hub card
}

export const LOCATIONS: LocationContent[] = [
  {
    slug: "california",
    state: "California",
    seoTitle: "Sell a Dental Practice in California",
    seoDescription:
      "California dental practice transition experts. Bay Area based, serving the whole state with valuations, sales, buy-ins, and DSO offer reviews.",
    heroTitle: "Selling or Transitioning a Dental Practice in California",
    heroIntro:
      "Based in the Bay Area and serving dentists across California, Practice Transitions Institute guides you through valuations, sales, buy-ins, and DSO decisions — with the local market knowledge these deals require.",
    introParagraphs: [
      "California is one of the most active — and most nuanced — dental transition markets in the country. Practice values, buyer demand, and deal structures here look different than they do elsewhere, and small mistakes can cost real money. Whether you are planning a sale years out, weighing an unsolicited DSO offer, or bringing on an associate who wants to buy in, the right guidance makes the difference between a good outcome and a great one.",
      "Our office is in San Mateo, and our roots run deep in California dentistry — including years teaching the next generation of dentists at the University of the Pacific and UCSF. We know this market because we are part of it.",
    ],
    considerations: [
      {
        iconKey: "rules",
        title: "Dentist-owned practice rules",
        description:
          "California restricts practice ownership to licensed dentists, so DSOs operate through management-services arrangements. That shapes how offers are structured here — and why an independent read of the deal matters.",
      },
      {
        iconKey: "overhead",
        title: "High overhead markets",
        description:
          "Bay Area and coastal rents, wages, and buildout costs run well above the national average. Overhead directly affects profitability — and therefore value — so a credible valuation has to account for your specific market.",
      },
      {
        iconKey: "board",
        title: "Dental Board of California compliance",
        description:
          "Licensing, corporate structure, and the change-of-ownership steps a transfer requires all have California-specific wrinkles that need to be handled correctly alongside your attorney and CPA.",
      },
      {
        iconKey: "buyers",
        title: "Competitive buyer pool",
        description:
          "California's metros draw strong interest from associates, private buyers, and DSO groups alike. More demand can mean a better price — if your practice is positioned and marketed to the right buyers.",
      },
    ],
    regions: [
      "San Francisco Bay Area & Peninsula",
      "San Jose & Silicon Valley",
      "Sacramento & the Central Valley",
      "Los Angeles & Orange County",
      "San Diego",
      "Inland Empire & beyond",
    ],
    summary:
      "Bay Area based, serving the whole state. Valuations, sales, buy-ins, and DSO offer reviews with California-specific market knowledge.",
  },
  {
    slug: "texas",
    state: "Texas",
    seoTitle: "Sell a Dental Practice in Texas",
    seoDescription:
      "Texas dental practice transition advisors. Valuations, sales, associate buy-ins, and DSO offer reviews across Dallas–Fort Worth, Houston, Austin, and San Antonio.",
    heroTitle: "Selling or Transitioning a Dental Practice in Texas",
    heroIntro:
      "From Dallas–Fort Worth to Houston, Austin, and San Antonio, Practice Transitions Institute helps Texas dentists value, sell, and transition their practices on their own terms.",
    introParagraphs: [
      "Texas is one of the fastest-growing dental markets in the country. Population growth across its major metros keeps new-patient demand strong, and that growth draws private buyers, associates, and well-funded DSO groups looking to acquire. For a practice owner, a strong market is an opportunity — but only with the right preparation and representation.",
      "We advise Texas dentists through every stage of a transition, from an honest valuation to a confidential sale, an associate buy-in, or a careful review of a DSO offer, working alongside your Texas attorney and CPA on the specifics.",
    ],
    considerations: [
      {
        iconKey: "growth",
        title: "Fast-growing metros",
        description:
          "DFW, Houston, Austin, and San Antonio keep adding residents, which supports patient demand and buyer interest. Well-positioned practices in growth corridors can command strong multiples.",
      },
      {
        iconKey: "tax",
        title: "No state income tax",
        description:
          "Texas has no personal state income tax, which affects how sellers model their after-tax proceeds and how buyers weigh the economics of a purchase. Deal structure and timing still matter — plan them with your CPA.",
      },
      {
        iconKey: "consolidation",
        title: "Active DSO & investor demand",
        description:
          "Texas is a focus market for dental groups and private-equity-backed platforms. That competition can lift offers — but headline numbers often hide earnouts, holdbacks, and work-back terms worth scrutinizing.",
      },
      {
        iconKey: "board",
        title: "Texas State Board of Dental Examiners",
        description:
          "Licensing, practice ownership, and the change-of-ownership steps a transfer requires follow Texas-specific rules that need to be handled correctly as part of the transaction.",
      },
    ],
    regions: [
      "Dallas–Fort Worth Metroplex",
      "Houston & the Gulf Coast",
      "Austin & Central Texas",
      "San Antonio",
      "El Paso & West Texas",
      "The Rio Grande Valley",
    ],
    summary:
      "Advising dentists across DFW, Houston, Austin, and San Antonio through valuations, sales, buy-ins, and DSO offer reviews in one of the country's fastest-growing markets.",
  },
  {
    slug: "florida",
    state: "Florida",
    seoTitle: "Sell a Dental Practice in Florida",
    seoDescription:
      "Florida dental practice transition advisors. Valuations, sales, associate buy-ins, and DSO offer reviews across Miami, Tampa, Orlando, and Jacksonville.",
    heroTitle: "Selling or Transitioning a Dental Practice in Florida",
    heroIntro:
      "Across Miami, Tampa, Orlando, Jacksonville, and Florida's coasts, Practice Transitions Institute helps dentists value, sell, and transition their practices with confidence.",
    introParagraphs: [
      "Florida is a uniquely active transition market. A large, growing, and retiree-heavy population supports steady patient demand, while a wave of dentists reaching retirement age keeps a healthy supply of practices coming to market. That combination — strong demand and steady turnover — makes preparation and positioning especially important for sellers.",
      "We help Florida dentists move through a transition the right way: an honest valuation, a confidential sale to the right buyer, a structured associate buy-in, or a clear-eyed review of a DSO offer, coordinated with your Florida attorney and CPA.",
    ],
    considerations: [
      {
        iconKey: "retirees",
        title: "Retirement-driven turnover",
        description:
          "Florida has a high concentration of dentists approaching retirement, which means more practices change hands here. Standing out to the right buyer takes a well-prepared, well-positioned practice.",
      },
      {
        iconKey: "tax",
        title: "No state income tax",
        description:
          "Like Texas, Florida has no personal state income tax — a factor sellers weigh when modeling after-tax proceeds and one reason the state attracts both buyers and relocating dentists. Structure the deal with your CPA.",
      },
      {
        iconKey: "consolidation",
        title: "Heavy DSO consolidation",
        description:
          "Florida is one of the most consolidated dental markets in the country, with active group and private-equity buyers. Strong competition can raise offers — but the structure behind the number deserves careful review.",
      },
      {
        iconKey: "board",
        title: "Florida Board of Dentistry",
        description:
          "Licensing, ownership, and change-of-ownership requirements follow Florida-specific rules that need to be handled correctly and on time within the transaction.",
      },
    ],
    regions: [
      "Miami–Fort Lauderdale & South Florida",
      "Tampa Bay & St. Petersburg",
      "Orlando & Central Florida",
      "Jacksonville & Northeast Florida",
      "Naples, Fort Myers & Southwest Florida",
      "The Panhandle & Tallahassee",
    ],
    summary:
      "Serving Miami, Tampa, Orlando, and Jacksonville. Valuations, sales, buy-ins, and DSO offer reviews in one of the nation's most active, consolidation-heavy markets.",
  },
];

export const getLocation = (slug: string): LocationContent | undefined =>
  LOCATIONS.find((location) => location.slug === slug);

export const LOCATION_SLUGS = LOCATIONS.map((location) => location.slug);
