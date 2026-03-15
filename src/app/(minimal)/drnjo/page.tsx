import DrNjo from "@/views/DrNjo";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildPersonSchema } from "@/lib/structuredData";

const title = "Michael Njo, DDS | Author, Lecturer & Dental Practice Transition Expert";
const description =
  "Learn how Michael Njo, DDS guides dentists through practice valuations, ownership transitions, and GPR resident education as the author of Dental Practice Transitions Handbook.";

const personSchema = buildPersonSchema({
  name: "Michael Njo, DDS",
  jobTitle: "Founder, Author, Lecturer & Transition Consultant",
  description:
    "Michael Njo, DDS is a dental practice transition expert, author, and lecturer with decades of clinical and consulting experience supporting dentists, students, and GPR residents.",
  image: "/lovable-uploads/d30c74a1-48bb-404e-9e9d-bc93119a695d.png",
  url: "/drnjo",
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
          structuredData: personSchema,
        })}
      />
      <DrNjo />
    </>
  );
}
