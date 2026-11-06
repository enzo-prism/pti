import Link from "next/link";
import { TransitionStories } from "@/components/TransitionStories";
import { StructuredData } from "@/components/StructuredData";
import { buildPageMetadata, buildPageJsonLd } from "@/lib/seo";

const title = "Dental Practice Transition Client Stories";
const description = "Explore client accounts of dental practice sales, buying and partnership decisions, with practical questions for your own transition.";
export const metadata = buildPageMetadata({ title, description, path: "/case-studies" });

export default function Page() {
  return <>
    <StructuredData data={buildPageJsonLd({ title, description, path: "/case-studies", pageType: "CollectionPage" })} />
    <div className="container pt-12 md:pt-16"><div className="mx-auto max-w-5xl"><h1 className="text-3xl font-bold md:text-5xl">Dental practice transitions in clients&apos; own words</h1><p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">Each story connects an already-published client account with the decisions involved. Results are individual experiences, and each transition requires its own plan.</p><Link href="/testimonials" className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Browse the complete testimonial library</Link></div></div>
    <TransitionStories />
  </>;
}
