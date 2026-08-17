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
  firstStep: {
    title: string;
    description: string;
  };
  considerations: LocationConsideration[];
  regions: string[];
  officialReferences: Array<{ label: string; url: string }>;
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
      "Based in the Bay Area, PTI helps California dentists prepare for sales, acquisitions, buy-ins, valuations, and DSO decisions with attention to local practice economics and ownership requirements.",
    introParagraphs: [
      "California transitions can involve high facility costs, address-specific permits, corporate-practice rules, and wide differences between local markets. Those details affect how a practice is valued, marketed, financed, and transferred.",
      "PTI's San Mateo base makes California the firm's home market. We help owners and buyers build the business plan, then coordinate state-specific legal, tax, and licensing questions with the appropriate professionals.",
    ],
    firstStep: {
      title: "Start with the practice, lease, and ownership structure",
      description:
        "Gather three years of financial statements, the current lease and options, entity documents, permits used by the practice, and your target timeline. These records reveal the California-specific issues to address first.",
    },
    considerations: [
      {
        iconKey: "rules",
        title: "Dentist-owned practice rules",
        description:
          "California rules address who owns and controls a dental practice and how a practice may operate under a fictitious name. Have a California dental attorney review the structure of any buyer or DSO proposal.",
      },
      {
        iconKey: "overhead",
        title: "High overhead markets",
        description:
          "Rent, wages, buildout obligations, and lease options can materially affect cash flow and buyer financing. A valuation should use the practice's actual local costs instead of a generic benchmark.",
      },
      {
        iconKey: "board",
        title: "Dental Board of California compliance",
        description:
          "Licensing, entity, permit, and change-of-practice details should be mapped early with your California attorney, CPA, and the relevant agencies.",
      },
      {
        iconKey: "buyers",
        title: "Competitive buyer pool",
        description:
          "Buyer interest differs by metro, specialty, collections, profitability, facility, and financing. Compare buyer fit and deal certainty alongside price.",
      },
    ],
    regions: [
      "San Francisco Bay Area and Peninsula",
      "San Jose and Silicon Valley",
      "Sacramento and the Central Valley",
      "Los Angeles and Orange County",
      "San Diego",
      "Inland Empire and other California communities",
    ],
    officialReferences: [
      {
        label: "Dental Board of California laws and regulations",
        url: "https://www.dbc.ca.gov/about_us/lawsregs/laws.shtml",
      },
      {
        label: "Dental Board of California fictitious-name permits",
        url: "https://www.dbc.ca.gov/licensees/dds/permits/fictitious_name.shtml",
      },
    ],
    summary:
      "Bay Area based, serving the whole state. Valuations, sales, buy-ins, and DSO offer reviews with California-specific market knowledge.",
  },
  {
    slug: "texas",
    state: "Texas",
    seoTitle: "Sell a Dental Practice in Texas",
    seoDescription:
      "Texas dental practice transition advisors. Valuations, sales, associate buy-ins, and DSO offer reviews across Dallas-Fort Worth, Houston, Austin, and San Antonio.",
    heroTitle: "Selling or Transitioning a Dental Practice in Texas",
    heroIntro:
      "PTI helps Texas dentists compare acquisition and sale options across the state's major metros, with focused review of practice economics, financing readiness, and deal structure.",
    introParagraphs: [
      "Texas is not one dental market. A practice in Dallas-Fort Worth, Houston, Austin, San Antonio, El Paso, or the Rio Grande Valley can face different rent, staffing, competition, buyer, and lending conditions.",
      "PTI helps clients compare those local economics, the certainty of financing, and the obligations inside private-buyer and DSO proposals. Texas legal and tax questions remain with the client's licensed advisors.",
    ],
    firstStep: {
      title: "Start with metro-level economics and buyer readiness",
      description:
        "Build a clean financial package, identify the metro and patient-demand assumptions behind the valuation, and confirm how a likely buyer would finance the practice before setting a price or signing an offer.",
    },
    considerations: [
      {
        iconKey: "growth",
        title: "Fast-growing metros",
        description:
          "Population and development patterns differ across DFW, Houston, Austin, and San Antonio. Test the practice's actual patient flow, competition, lease, and referral base instead of relying on statewide growth assumptions.",
      },
      {
        iconKey: "tax",
        title: "No state income tax",
        description:
          "State and federal tax treatment, entity structure, asset allocation, and seller residence can affect proceeds. Model the specific transaction with a Texas-qualified CPA or tax attorney.",
      },
      {
        iconKey: "consolidation",
        title: "DSO and private-buyer comparison",
        description:
          "A DSO and a private buyer may propose different cash timing, work-back duties, contingencies, and control. Compare the complete structure rather than assuming one buyer type is better.",
      },
      {
        iconKey: "board",
        title: "Texas State Board of Dental Examiners",
        description:
          "Dentist licensing, records, entity, and practice-transfer questions should be assigned to the relevant Texas agencies and the client's attorney before closing.",
      },
    ],
    regions: [
      "Dallas-Fort Worth Metroplex",
      "Houston and the Gulf Coast",
      "Austin and Central Texas",
      "San Antonio",
      "El Paso and West Texas",
      "The Rio Grande Valley",
    ],
    officialReferences: [
      {
        label: "Texas State Board of Dental Examiners laws and rules",
        url: "https://tsbde.texas.gov/laws-rules/",
      },
      {
        label: "Texas State Board of Dental Examiners records guidance",
        url: "https://tsbde.texas.gov/licensing/designation-of-records/",
      },
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
      "PTI helps Florida dentists plan for ownership changes across the state's distinct metro, coastal, and retirement-driven communities, with attention to continuity, records, and transaction structure.",
    introParagraphs: [
      "Florida's dental markets vary widely between South Florida, Tampa Bay, Orlando, Jacksonville, Southwest Florida, and the Panhandle. Payer mix, seasonal patient patterns, facility exposure, storm planning, and buyer profile can all affect diligence and handoff planning.",
      "PTI helps sellers and buyers organize those business questions and plan for team, patient, and records continuity. A Florida attorney and CPA should confirm the legal and tax details of the transaction.",
    ],
    firstStep: {
      title: "Start with continuity and operational risk",
      description:
        "Review insurance coverage, facility obligations, records custody, team continuity, seasonal cash flow, and the seller's intended handoff. These items help define diligence and transition priorities before price negotiations advance.",
    },
    considerations: [
      {
        iconKey: "retirees",
        title: "Owner and patient continuity",
        description:
          "When an owner is retiring or relocating, the plan should address patient communication, records, referral relationships, team retention, and the seller's clinical handoff.",
      },
      {
        iconKey: "tax",
        title: "No state income tax",
        description:
          "Entity, residency, federal tax, asset allocation, and real-estate questions can affect transaction economics. Model the actual structure with a Florida-qualified CPA or tax attorney.",
      },
      {
        iconKey: "consolidation",
        title: "Corporate and private-buyer options",
        description:
          "Compare cash at closing, contingencies, employment terms, equity, control, team plans, and transition duties across buyer types before choosing a path.",
      },
      {
        iconKey: "board",
        title: "Florida Board of Dentistry",
        description:
          "Florida's dental laws address ownership, dentist-of-record, advertising, records, and other practice duties. Assign each requirement to the appropriate agency or attorney early in diligence.",
      },
    ],
    regions: [
      "Miami-Fort Lauderdale and South Florida",
      "Tampa Bay and St. Petersburg",
      "Orlando and Central Florida",
      "Jacksonville and Northeast Florida",
      "Naples, Fort Myers, and Southwest Florida",
      "The Panhandle and Tallahassee",
    ],
    officialReferences: [
      {
        label: "Florida Board of Dentistry laws and rules",
        url: "https://floridasdentistry.gov/Forms/laws-and-rules-dentistry.pdf",
      },
      {
        label: "Florida Board of Dentistry dentist-of-record guidance",
        url: "https://floridasdentistry.gov/add-dentist-of-record/",
      },
    ],
    summary:
      "Serving Miami, Tampa, Orlando, and Jacksonville. Valuations, sales, buy-ins, and DSO offer reviews in one of the nation's most active, consolidation-heavy markets.",
  },
];

export const getLocation = (slug: string): LocationContent | undefined =>
  LOCATIONS.find((location) => location.slug === slug);

export const LOCATION_SLUGS = LOCATIONS.map((location) => location.slug);
