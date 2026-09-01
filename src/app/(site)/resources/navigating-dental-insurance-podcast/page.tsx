import PodcastInterview from "@/views/PodcastInterview";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildPodcastEpisodeSchema } from "@/lib/structuredData";
import { PODCAST_INTERVIEW_PATH } from "@/lib/constants";

const title = "The Right Way to Go Out of Network";
const description =
  "Dr. Michael Njo joins Ben Tuinei and Jordon Comstock on The Navigating Dental Insurance Podcast to talk about going out of network.";
const path = PODCAST_INTERVIEW_PATH;

export const metadata = buildPageMetadata({
  title,
  description,
  path,
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path,
          structuredData: buildPodcastEpisodeSchema(),
        })}
      />
      <PodcastInterview />
    </>
  );
}
