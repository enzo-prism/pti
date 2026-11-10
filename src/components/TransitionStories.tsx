import Link from "next/link";
import { transitionStories } from "@/data/transitionStories";

export function TransitionStories() {
  return <section className="container py-12 md:py-16" aria-labelledby="client-stories-heading">
    <div className="mx-auto max-w-5xl">
      <h2 id="client-stories-heading" className="text-2xl font-bold md:text-3xl">Decisions behind the client stories</h2>
      <p className="mt-3 max-w-3xl text-base leading-relaxed text-muted-foreground">Explore how clients describe their sale, purchase and partnership decisions, then use the questions to plan your own next step.</p>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        {transitionStories.map((story) => <article key={story.slug} className="rounded-xl border border-border bg-card p-6">
          <p className="text-sm font-semibold text-primary">{story.name}</p>
          <h3 className="mt-2 text-lg font-semibold"><Link className="inline-flex min-h-11 items-center underline-offset-4 hover:underline" href={`/case-studies/${story.slug}`}>{story.title}</Link></h3>
          <p className="mt-2 text-base leading-relaxed text-muted-foreground">{story.description}</p>
        </article>)}
      </div>
      <Link href="/case-studies" className="mt-4 inline-flex min-h-11 items-center font-semibold text-primary underline underline-offset-4">View all transition stories</Link>
    </div>
  </section>;
}
