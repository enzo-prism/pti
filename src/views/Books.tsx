import Image from "next/image";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SECOND_EDITION_COVER } from "@/data/handbookCover";
import { PHONE_NUMBER, PHONE_NUMBER_TEL, SECOND_EDITION_KINDLE_PRICE, SECOND_EDITION_KINDLE_URL } from "@/lib/constants";
import { SITE_CONTACT_EMAIL } from "@/lib/siteMetadata";

const guides = [
  { title: "Prepare Your Practice for a Sale", href: "/resources/practice-sale-readiness-checklist", text: "Learn what to do now to make your practice more attractive to potential buyers." },
  { title: "Understand Your Practice Value", href: "/resources/how-much-is-my-dental-practice-worth", text: "Discover the factors that influence what your practice is worth." },
  { title: "Review the Letter of Intent", href: "/blog/dental-practice-letter-of-intent", text: "Understand the key terms and considerations before moving forward with a proposed sale." },
];

export default function Books() {
  return (
    <>
      <Section background="light" padding="compact">
        <div className="mx-auto max-w-5xl">
          <header className="mb-7">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-primary">Books by Dr. Michael Njo</p>
            <h1 className="text-3xl font-bold leading-tight md:text-5xl">Dental Practice Transitions Handbook</h1>
            <p className="mt-3 text-base text-slate-700 md:text-lg">A Blueprint for Buying and Selling Healthcare Practices in Different Economic Climates</p>
          </header>
          <div className="grid items-center gap-5 sm:grid-cols-[minmax(0,1fr)_minmax(0,2.7fr)] md:gap-10">
            <Image src={SECOND_EDITION_COVER.src} width={SECOND_EDITION_COVER.width} height={SECOND_EDITION_COVER.height} alt={SECOND_EDITION_COVER.alt} priority sizes="(min-width: 640px) 225px, 135px" className="mx-auto h-auto w-[135px] rounded-sm shadow-lg sm:w-full sm:max-w-[225px]" />
            <figure className="relative isolate flex aspect-video items-end overflow-hidden rounded-xl bg-slate-900 text-white">
              <Image src="/lovable-uploads/d30c74a1-48bb-404e-9e9d-bc93119a695d.png" alt="" fill sizes="(min-width: 1024px) 720px, 95vw" className="object-contain object-right" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-transparent" />
              <figcaption className="relative max-w-[65%] p-4 sm:p-6 md:p-9">
                <p className="text-lg font-semibold leading-tight sm:text-2xl md:text-3xl">A word from Dr. Njo</p>
                <p className="mt-2 text-xs leading-relaxed text-slate-200 sm:text-sm">Preview: Dr. Njo’s personal recording will appear here.</p>
              </figcaption>
            </figure>
          </div>
        </div>
      </Section>

      <Section padding="compact">
        <article className="mx-auto max-w-3xl space-y-5 leading-relaxed text-slate-700">
          <h2 className="text-2xl font-bold text-slate-900 md:text-3xl">The Second Edition</h2>
          <p className="text-lg font-medium text-slate-900">The title and subtitle remain the same. The content? A whole new story.</p>
          <p>This is a substantially expanded and rewritten edition of the handbook, designed to help dental professionals navigate the complexities of buying and selling a practice in today’s ever-changing economic environment.</p>
          <p>Packed with updated insights, practical guidance, and real-world resources, this edition features:</p>
          <ul className="list-disc space-y-2 pl-5 marker:text-primary">
            <li>Expanded insights and contributions from industry advisors</li>
            <li>New appendices filled with practical checklists, tools, and reference materials relevant to today’s marketplace</li>
            <li>Updated content to help buyers and sellers make informed decisions with greater confidence</li>
          </ul>
          <p>We’re incredibly grateful to everyone who purchased the book so quickly and helped make its launch such a success. Thanks to your support, it reached #1 Best Seller in Dentistry on Amazon shortly after its release. The Kindle edition is currently {SECOND_EDITION_KINDLE_PRICE}.</p>
          {SECOND_EDITION_KINDLE_URL && <Button asChild size="lg"><a href={SECOND_EDITION_KINDLE_URL} target="_blank" rel="noopener noreferrer">Get the book on Amazon <ExternalLink className="ml-2 size-4" aria-hidden="true" /></a></Button>}
          <h2 className="pt-5 text-2xl font-semibold text-slate-900">A Special Thank You</h2>
          <p>A book like this doesn’t come together without the knowledge, generosity, and hard work of many people. Thank you to Dr. Glenn Vo, our contributing advisors, editor Catrise Austin, and everyone who shared their expertise and helped bring this expanded edition to life. Your contributions have made this a more valuable resource for the healthcare community.</p>
          <Link className="inline-block font-semibold text-primary underline underline-offset-4" href="/about#handbook-editions">See both editions on the About page</Link>
        </article>
      </Section>

      <Section background="light" padding="compact">
        <div className="mx-auto max-w-5xl">
          <h2 className="text-2xl font-bold md:text-3xl">Thinking About Buying or Selling a Practice?</h2>
          <p className="mt-3 max-w-3xl leading-relaxed text-slate-700">Reading is a great place to start, but sometimes you need guidance tailored to your own situation. That’s where we come in! Get a head start with our complimentary guides:</p>
          <ul className="my-6 grid gap-4 lg:grid-cols-3">
            {guides.map(({ title, href, text }) => (
              <li key={href} className="rounded-lg border bg-white p-4">
                <Link href={href} className="font-semibold text-primary underline underline-offset-4">{title}</Link>
                <p className="mt-2 text-sm leading-relaxed text-slate-700">{text}</p>
              </li>
            ))}
          </ul>
          <p className="max-w-3xl leading-relaxed text-slate-700">When you’re ready to talk through your own questions, the Practice Transitions Institute team is here to help. Let’s start a conversation! Contact us to schedule a complimentary, no-obligation consultation.</p>
          <p className="mt-3"><a href={`mailto:${SITE_CONTACT_EMAIL}`} className="font-semibold text-primary underline">Email us</a> or call <a href={`tel:${PHONE_NUMBER_TEL}`} className="font-semibold text-primary underline">{PHONE_NUMBER}</a>.</p>
        </div>
      </Section>
    </>
  );
}
