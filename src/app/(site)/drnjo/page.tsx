import DrNjo from "@/views/DrNjo";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildPersonId, buildPersonSchema } from "@/lib/structuredData";
import { MICHAEL_NJO_WEBSITE_URL } from "@/lib/constants";

const title = "Michael Njo, DDS: Author & Practice Transition Expert";
const description =
  "How Michael Njo, DDS, author of Dental Practice Transitions Handbook, guides dentists through practice valuations, ownership transitions, and GPR education.";

const personSchema = buildPersonSchema({
  url: "/drnjo",
  name: "Michael Njo, DDS",
  jobTitle: "Founder, Author, Lecturer & Transition Consultant",
  description:
    "Michael Njo, DDS is a dental practice transition expert, author, and lecturer with decades of clinical and consulting experience supporting dentists, students, and GPR residents.",
  image: "/lovable-uploads/d30c74a1-48bb-404e-9e9d-bc93119a695d.png",
  sameAs: [MICHAEL_NJO_WEBSITE_URL],
});

export const metadata = buildPageMetadata({
  title,
  description,
  path: "/drnjo",
});

export default function Page() {
  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title,
          description,
          path: "/drnjo",
          pageType: "ProfilePage",
          pageProperties: { mainEntity: { "@id": buildPersonId("/drnjo") } },
          structuredData: personSchema,
        })}
      />
      <DrNjo />
    </>
  );
}
