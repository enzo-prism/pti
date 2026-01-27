import type { JsonLdShape } from "@/lib/structuredData";

interface StructuredDataProps {
  data?: JsonLdShape | null;
  id?: string;
}

export const StructuredData = ({ data, id }: StructuredDataProps) => {
  if (!data) return null;

  return (
    <script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
