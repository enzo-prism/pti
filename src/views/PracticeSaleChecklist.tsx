import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { BookMeetingButton } from "@/components/BookMeetingButton";
import { ChecklistSignupForm } from "@/components/resources/ChecklistSignupForm";
import { PrintChecklistButton } from "@/components/resources/PrintChecklistButton";

interface ChecklistItem {
  label: string;
  href?: string;
  linkLabel?: string;
}

interface ChecklistGroup {
  title: string;
  intro: string;
  items: ChecklistItem[];
}

const checklistGroups: ChecklistGroup[] = [
  {
    title: "1. Financial records",
    intro:
      "Serious buyers and their lenders ask for these within days of signing an NDA. Having them organized signals a well-run practice.",
    items: [
      { label: "Profit and loss statements for the last three years" },
      { label: "Business tax returns for the last three years" },
      { label: "Year-to-date production and collections reports" },
      {
        label: "Accounts receivable aging report",
        href: "/blog/accounts-receivable-when-selling-a-dental-practice",
        linkLabel: "How AR is handled in a sale",
      },
      { label: "Payer mix and insurance participation summary" },
      {
        label:
          "Notes on discretionary or one-time expenses that affect true profitability",
        href: "/blog/documents-before-selling-your-dental-practice",
        linkLabel: "Full document prep guide",
      },
    ],
  },
  {
    title: "2. Practice performance and value",
    intro:
      "Valuation is more than a revenue multiple. These numbers tell the story behind your practice's worth — and where to strengthen it before listing.",
    items: [
      { label: "Production by provider, including hygiene share" },
      { label: "Active patient count and new patients per month" },
      { label: "Procedure mix breakdown" },
      { label: "Equipment inventory with age and condition notes" },
      {
        label: "An independent opinion of value from a transition specialist",
        href: "/services/value",
        linkLabel: "PTI's Opinion of Value service",
      },
      {
        label: "A list of value improvements worth making before you sell",
        href: "/blog/improve-practice-value-before-selling",
        linkLabel: "Ways to improve value first",
      },
    ],
  },
  {
    title: "3. Legal and facility documents",
    intro:
      "Deals stall more often on leases and agreements than on price. Confirm these are current, signed, and transferable.",
    items: [
      {
        label: "Lease agreement with assignment and renewal terms",
        href: "/blog/dental-practice-lease-assignment-checklist",
        linkLabel: "Lease assignment checklist",
      },
      { label: "Corporate formation documents and ownership agreements" },
      { label: "Associate, employment, and independent contractor agreements" },
      { label: "Equipment leases and financing agreements" },
      {
        label: "A nondisclosure agreement ready before sharing financials",
        href: "/blog/what-should-a-dental-practice-nda-include-before-sharing-financials",
        linkLabel: "What your NDA should include",
      },
      { label: "Licenses, permits, and OSHA/HIPAA compliance records" },
    ],
  },
  {
    title: "4. Team, patients, and transition plan",
    intro:
      "The decisions in this section protect your legacy — and they're easier to make before a buyer is at the table.",
    items: [
      {
        label: "A realistic timeline from preparation through closing",
        href: "/blog/how-long-to-sell-a-dental-practice",
        linkLabel: "How long a sale really takes",
      },
      {
        label: "Your preferred post-sale workback period, if any",
        href: "/blog/how-long-should-a-seller-stay-after-closing-a-dental-practice-sale",
        linkLabel: "How long sellers typically stay",
      },
      {
        label: "A staff communication plan — and when to share the news",
        href: "/blog/when-to-tell-staff-youre-selling-your-dental-practice",
        linkLabel: "When to tell your team",
      },
      {
        label: "A patient communication plan for after closing",
        href: "/blog/how-should-you-tell-patients-you-are-selling-your-dental-practice",
        linkLabel: "How to tell patients",
      },
      {
        label: "Your buyer profile preferences — private buyer, associate, or DSO",
        href: "/blog/dso-vs-private-buyer-dental-practice",
        linkLabel: "DSO vs. private buyer",
      },
      { label: "Goals around legacy, continuity, and associate retention" },
    ],
  },
];

const PracticeSaleChecklist = () => {
  return (
    <>
      <section className="hero-gradient relative overflow-hidden pt-24 pb-14 md:pt-32 md:pb-16 print:hidden">
        <div className="hero-gradient-overlay absolute inset-0" />
        <div className="container relative z-10 mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-blue-100 sm:text-sm">
              Free Resource
            </p>
            <h1 className="text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
              Practice Sale Readiness Checklist
            </h1>
            <p className="mt-4 text-base leading-relaxed text-blue-100 sm:text-lg md:text-xl">
              The documents, numbers, and decisions to line up before you talk
              to buyers — compiled from the transitions PTI has guided for
              dentists across the country.
            </p>
          </div>
        </div>
      </section>

      <Section background="light" className="py-12 md:py-16">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 flex flex-col items-center justify-center gap-3 sm:flex-row print:hidden">
            <PrintChecklistButton />
            <BookMeetingButton
              location="checklist_page_hero"
              label="Talk Through Your Readiness"
              variant="default"
              size="lg"
              className="w-full sm:w-auto"
            />
          </div>

          <div id="checklist" className="scroll-mt-24 space-y-8">
            {checklistGroups.map((group) => (
              <div
                key={group.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8 print:border-gray-300 print:shadow-none"
              >
                <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
                  {group.title}
                </h2>
                <p className="mt-2 text-sm leading-relaxed text-gray-600 sm:text-base print:hidden">
                  {group.intro}
                </p>
                <ul className="mt-5 space-y-3.5">
                  {group.items.map((item) => (
                    <li key={item.label} className="flex items-start gap-3">
                      <span
                        aria-hidden="true"
                        className="mt-0.5 h-5 w-5 shrink-0 rounded border-2 border-primary/40"
                      />
                      <span className="text-sm leading-relaxed text-gray-700 sm:text-base">
                        {item.label}
                        {item.href && item.linkLabel ? (
                          <>
                            {" "}
                            <Link
                              href={item.href}
                              className="whitespace-nowrap font-medium text-primary underline-offset-4 hover:underline print:hidden"
                            >
                              {item.linkLabel} →
                            </Link>
                          </>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section background="white" className="py-12 md:py-16 print:hidden">
        <div className="mx-auto grid max-w-5xl items-start gap-8 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Not sure where you stand?
            </h2>
            <p className="mt-3 text-base leading-relaxed text-gray-700 sm:text-lg">
              Most dentists are 6–24 months away from being sale-ready when
              they first work through this list — and the gap is usually
              fixable with time. PTI can help you prioritize what to tackle
              first, from cleaning up financials to strengthening practice
              value before you go to market.
            </p>
            <div className="mt-6">
              <Button asChild variant="outline" size="lg">
                <Link
                  href="/services/selling"
                  className="flex items-center justify-center"
                >
                  How PTI Guides a Sale
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Link>
              </Button>
            </div>
          </div>
          <ChecklistSignupForm />
        </div>
      </Section>
    </>
  );
};

export default PracticeSaleChecklist;
