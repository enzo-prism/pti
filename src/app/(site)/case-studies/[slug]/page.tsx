import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import { getTransitionStory, transitionStories } from "@/data/transitionStories";
import { getReviewBySlug } from "@/data/reviews";
import { REVIEW_SOURCE_LABELS } from "@/data/reviewLabels";
import { buildPageMetadata, buildPageJsonLd } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };
export const generateStaticParams = () => transitionStories.map(({ slug }) => ({ slug }));
export async function generateMetadata({ params }: Props) {
  const story = getTransitionStory((await params).slug);
  if (!story) notFound();
  return buildPageMetadata({ title: story.title, description: story.description, path: `/case-studies/${story.slug}` });
}
export default async function Page({ params }: Props) {
  const story = getTransitionStory((await params).slug);
  if (!story) notFound();
  const review = getReviewBySlug(story.reviewSlug);
  if (!review) notFound();
  const path = `/case-studies/${story.slug}`;
  return <>
    <StructuredData data={buildPageJsonLd({ title: story.title, description: story.description, path })} />
    <article className="container py-12 md:py-16"><div className="mx-auto max-w-3xl">
      <Link className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4" href="/case-studies">All client stories</Link>
      <p className="mt-5 text-sm font-semibold uppercase tracking-wide text-primary">{story.name} · Client-reported experience</p>
      <h1 className="mt-3 text-3xl font-bold leading-tight md:text-5xl">{story.title}</h1>
      {[{ heading: "The starting point", text: story.situation }, { heading: "The support described", text: story.support }, { heading: "What the client reported", text: story.outcome }].map((section) => <section className="mt-8" key={section.heading}><h2 className="text-2xl font-semibold">{section.heading}</h2><p className="mt-3 text-base leading-relaxed text-muted-foreground">{section.text}</p></section>)}
      <section className="mt-8 rounded-xl border border-border bg-accent/40 p-6"><h2 className="text-2xl font-semibold">The original account</h2><blockquote className="mt-4 whitespace-pre-line text-base leading-relaxed">{review.quote}</blockquote><p className="mt-4 text-sm text-muted-foreground">{review.displayAuthorName} · {REVIEW_SOURCE_LABELS[review.source]}</p><Link className="mt-2 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4" href={`/testimonials/${review.slug}`}>View the source testimonial</Link></section>
      <section className="mt-8"><h2 className="text-2xl font-semibold">Questions for your own transition</h2><ul className="mt-3 list-disc space-y-3 pl-6 text-base leading-relaxed text-muted-foreground">{story.questions.map((question) => <li key={question}>{question}</li>)}</ul><p className="mt-4 text-base leading-relaxed text-muted-foreground">A client story can help frame questions. Your practice, counterparties, financing and terms determine your own outcome.</p></section>
      <nav aria-label="Plan your transition" className="mt-8 flex flex-col items-start gap-2 border-t border-border pt-6">{[story.service, story.guide, { label: "Discuss your transition confidentially", href: "/contact" }].map((link) => <Link key={link.href} href={link.href} className="inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">{link.label}</Link>)}</nav>
    </div></article>
  </>;
}
