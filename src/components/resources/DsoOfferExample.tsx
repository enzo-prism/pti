import Link from "next/link";

export function DsoOfferExample() {
  return <section id="compare-offers" className="container scroll-mt-24 py-12 md:py-16"><div className="mx-auto max-w-4xl">
    <h2 className="text-2xl font-bold md:text-3xl">Compare what is payable with what is conditional</h2>
    <p className="mt-4 text-base leading-relaxed text-muted-foreground">This hypothetical example shows why the headline price alone cannot settle a DSO-versus-private-buyer decision. It is not a PTI transaction, valuation, or prediction.</p>
    <div className="mt-6 overflow-x-auto"><table className="w-full min-w-[340px] text-left text-sm sm:text-base"><caption className="sr-only">Hypothetical offer comparison in US dollars</caption><thead><tr className="border-b border-border"><th scope="col" className="p-3">Term</th><th scope="col" className="p-3">Private-buyer example</th><th scope="col" className="p-3">DSO example</th></tr></thead><tbody>{[
      ["Headline consideration", "$1,500,000", "$2,000,000"],
      ["Cash payable at closing", "$1,500,000", "$1,200,000"],
      ["Equity component", "$0", "$300,000 stated value"],
      ["Performance-based earnout", "$0", "Up to $500,000"],
      ["Post-sale employment and duties", "Review the actual agreement", "Review the actual agreement"],
    ].map((row) => <tr className="border-b border-border" key={row[0]}><th scope="row" className="p-3 font-medium">{row[0]}</th><td className="p-3 align-top">{row[1]}</td><td className="p-3 align-top">{row[2]}</td></tr>)}</tbody></table></div>
    <p className="mt-5 text-base leading-relaxed text-muted-foreground">The DSO example has a $500,000 larger headline, but $300,000 less cash at closing. The equity may be illiquid or change in value, and the earnout depends on its conditions. This comparison does not assign either component a cash-equivalent value or identify a better offer. Taxes, debt, fees, employment pay and other obligations still need separate review.</p>
    <h3 className="mt-6 text-xl font-semibold">Before signing an LOI, ask</h3>
    <ul className="mt-3 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted-foreground"><li>Which proceeds are unconditional, and when are they payable?</li><li>What can change the earnout, equity value or ability to sell the equity?</li><li>What work, compensation, decision rights and exit obligations continue after closing?</li><li>Who represents each party, and which terms need attorney and CPA review?</li></ul>
    <Link href="/blog/dental-practice-letter-of-intent" className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Work through the letter-of-intent checklist</Link>
    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Further reading: <a href="https://www.ada.org/resources/careers/career-planning/what-makes-a-successful-sale" className="text-primary underline">American Dental Association: what makes a successful sale</a>.</p>
  </div></section>;
}
