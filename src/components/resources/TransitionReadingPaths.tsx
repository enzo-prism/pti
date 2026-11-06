import Link from "next/link";
import { Section, SectionTitle } from "@/components/ui/section";
const guides = {
  seller: [["/resources/practice-sale-readiness-checklist", "Prepare your practice for a sale"], ["/resources/how-much-is-my-dental-practice-worth", "Understand practice value"], ["/blog/dental-practice-letter-of-intent", "Review the letter of intent"]],
  buyer: [["/blog/dental-practice-due-diligence-checklist", "Work through buyer due diligence"], ["/blog/dental-practice-lease-assignment-checklist", "Review the lease and assignment questions"], ["/blog/dental-practice-letter-of-intent", "Prepare for the letter of intent"]],
  dso: [["/blog/dso-vs-private-buyer-dental-practice", "Compare a DSO and a private buyer"], ["/blog/dental-practice-letter-of-intent", "Identify LOI questions before signing"], ["/resources/how-much-is-my-dental-practice-worth", "Understand the valuation assumptions"]],
} as const;
export function TransitionReadingPaths({ audience = "seller" }: { audience?: keyof typeof guides }) {
  return <Section background="light"><div className="mx-auto max-w-4xl"><SectionTitle>Prepare for your next decision</SectionTitle><p className="mb-5 leading-relaxed text-gray-600">Use these guides to organize your questions, then discuss the business terms with PTI and the legal and tax details with your independent advisors.</p><ul className="grid gap-3 sm:grid-cols-3">{guides[audience].map(([href, title]) => <li key={href}><Link className="flex min-h-11 items-center py-2 font-semibold text-primary underline underline-offset-4" href={href}>{title}</Link></li>)}</ul><p className="mt-5"><Link className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4" href="/books">Read Dental Practice Transitions Handbook by Dr. Michael Njo</Link></p></div></Section>;
}
