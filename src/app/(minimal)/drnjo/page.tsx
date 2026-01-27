import DrNjo from "@/views/DrNjo";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildPersonSchema } from "@/lib/structuredData";

const title = "Dr. Michael Njo - Dental Practice Transition Expert";
const description =
  "Learn about Dr. Michael Njo's experience guiding dentists through practice valuations, sales, and transitions.";

const personSchema = buildPersonSchema({
  name: "Dr. Michael Njo",
  jobTitle: "Founder & Transition Consultant",
  description:
    "Dr. Michael Njo is a dental practice transition expert with decades of clinical and consulting experience.",
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
