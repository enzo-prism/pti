import Link from "next/link";
import { notFound } from "next/navigation";
import { StructuredData } from "@/components/StructuredData";
import PracticeTransitionSeminar from "@/views/PracticeTransitionSeminar";
import { buildPageMetadata, buildPageJsonLd } from "@/lib/seo";
import { buildEventSchema } from "@/lib/structuredData";
import { isEventUpcoming } from "@/lib/dateUtils";
import { buildSeminarStructuredEvent, getSeminarDetailPath, getPracticeTransitionSeminarEvent } from "@/data/practiceTransitionSeminar";

export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props) {
  const event = getPracticeTransitionSeminarEvent((await params).slug);
  if (!event) notFound();
  return buildPageMetadata({
    title: `Dental Transition Seminar: ${event.city} | PTI`,
    description: `PTI's dental practice transition seminar in ${event.city} on ${event.date}. Explore the program, current pricing and callback registration.`,
    path: getSeminarDetailPath(event),
  });
}

export default async function Page({ params }: Props) {
  const event = getPracticeTransitionSeminarEvent((await params).slug);
  if (!event) notFound();
  const now = new Date();
  const upcoming = isEventUpcoming(event.date, now);
  return <>
    <StructuredData data={buildPageJsonLd({
      title: `Dental Practice Transition Seminar in ${event.city}`,
      description: `Dental practice transition education in ${event.city} on ${event.date}.`,
      path: getSeminarDetailPath(event),
      structuredData: [buildEventSchema(buildSeminarStructuredEvent(event, now))],
    })} />
    {upcoming ? <PracticeTransitionSeminar events={[event]} referenceDateIso={now.toISOString()} selectedEvent={event} /> :
      <section id="register" className="container py-12"><div className="mx-auto max-w-3xl"><h1 className="text-3xl font-bold">{event.city} dental practice transition seminar</h1><p className="mt-4 text-lg">This seminar took place on {event.date}. Registration for this date is closed.</p><Link href="/events/practice-transition-seminar" className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">Explore current seminar dates</Link></div></section>}
  </>;
}
