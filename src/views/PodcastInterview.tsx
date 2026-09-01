import Link from "next/link";
import { ExternalLink } from "lucide-react";
import {
  Section,
  SectionTitle,
  SectionSubtitle,
} from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { PODCAST_INTERVIEW } from "@/data/podcastInterview";
import { HANDBOOK_PATH } from "@/lib/constants";
import { formatLocalDate } from "@/lib/dateUtils";

const PodcastInterview = () => {
  return (
    <>
      <section className="bg-gradient-to-b from-accent to-white px-4 pt-20 pb-12 md:pt-28 md:pb-16">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
            Interview
          </p>
          <h1 className="text-3xl font-bold leading-tight md:text-5xl">
            {PODCAST_INTERVIEW.title}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-gray-700 md:text-xl">
            Dr. Michael Njo on {PODCAST_INTERVIEW.showName} with Ben Tuinei and
            Jordon Comstock.
          </p>
        </div>
      </section>

      <Section>
        <div className="mx-auto grid max-w-5xl items-start gap-10 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-6">
            <iframe
              allow="autoplay *; encrypted-media *; fullscreen *; clipboard-write"
              height={175}
              src={PODCAST_INTERVIEW.appleEmbedUrl}
              title={`${PODCAST_INTERVIEW.title} on Apple Podcasts`}
              className="w-full max-w-[660px] overflow-hidden rounded-[10px] bg-transparent"
              sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-storage-access-by-user-activation allow-top-navigation-by-user-activation"
            />
            <p className="mt-4 text-sm leading-relaxed text-gray-500">
              Official Apple Podcasts player. Published{" "}
              {formatLocalDate(PODCAST_INTERVIEW.datePublished)},{" "}
              {PODCAST_INTERVIEW.durationLabel}.
            </p>
          </div>

          <div>
            <SectionTitle className="mb-4 text-left">
              A guest conversation on going out of network
            </SectionTitle>
            <SectionSubtitle className="mb-6 text-left">
              {PODCAST_INTERVIEW.showName} invited Dr. Njo to talk through how
              practices prepare before they leave PPO networks.
            </SectionSubtitle>
            <blockquote className="mb-6 border-l-4 border-primary/40 pl-4 text-base leading-relaxed text-gray-700">
              {PODCAST_INTERVIEW.quote}
            </blockquote>
            <p className="mb-6 text-base leading-relaxed text-gray-600">
              The hosts are Ben Tuinei and Jordon Comstock. Jordon is CEO of{" "}
              <a
                href={PODCAST_INTERVIEW.boomCloudUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                BoomCloud
              </a>
              .
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a
                  href={PODCAST_INTERVIEW.appleEpisodeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Listen on Apple Podcasts
                  <ExternalLink className="ml-2 h-4 w-4" aria-hidden="true" />
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href={HANDBOOK_PATH}>View the handbook</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-gray-500">
              Also listed on{" "}
              <a
                href={PODCAST_INTERVIEW.castboxEpisodeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-primary underline-offset-4 hover:underline"
              >
                Castbox
              </a>
              .
            </p>
          </div>
        </div>
      </Section>
    </>
  );
};

export default PodcastInterview;
