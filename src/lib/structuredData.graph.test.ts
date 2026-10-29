import { describe, expect, it } from "vitest";
import { serializeJsonLd } from "@/components/StructuredData";
import { blogPosts } from "@/data/blogPosts";
import { getAuthorProfile } from "@/data/authors";
import { buildPageJsonLd } from "./seo";
import {
  BUSINESS_ID,
  buildBlogPostingSchema,
  buildImageGalleryProperties,
  buildPersonId,
  type JsonLdShape,
} from "./structuredData";

const graphOf = (jsonLd: JsonLdShape) => jsonLd["@graph"] as JsonLdShape[];

describe("page JSON-LD graph", () => {
  it("types the shared business node the same way on every page", () => {
    const home = graphOf(
      buildPageJsonLd({
        title: "Home",
        description: "Home",
        path: "/",
      })
    );
    const texas = graphOf(
      buildPageJsonLd({ title: "Texas", description: "Texas", path: "/locations/texas" })
    );

    const homeBusiness = home.find((node) => node["@id"] === BUSINESS_ID);
    const texasBusiness = texas.find((node) => node["@id"] === BUSINESS_ID);

    expect(homeBusiness?.["@type"]).toBe("ProfessionalService");
    expect(texasBusiness?.["@type"]).toBe("ProfessionalService");
    const contact = graphOf(
      buildPageJsonLd({ title: "Contact", description: "Contact", path: "/contact" })
    );
    const contactBusiness = contact.find((node) => node["@id"] === BUSINESS_ID);
    for (const business of [homeBusiness, contactBusiness, texasBusiness]) {
      expect(business?.address).toMatchObject({
        "@type": "PostalAddress",
        name: "Mailing address",
        streetAddress: "3182 Campus Drive #274",
      });
      for (const field of ["geo", "openingHoursSpecification", "hasMap", "priceRange"]) {
        expect(business).not.toHaveProperty(field);
      }
    }
    expect(homeBusiness?.logo).toMatchObject({
      url: "https://practicetransitionsinstitute.com/lovable-uploads/pti-mark-gold-website-blue.png",
      width: 3000,
      height: 1961,
    });
  });

  it("does not advertise the retired sitelinks search box", () => {
    const graph = graphOf(buildPageJsonLd({ title: "Blog", description: "Blog", path: "/blog" }));
    const website = graph.find((node) => node["@type"] === "WebSite");
    expect(website).toBeDefined();
    expect(website).not.toHaveProperty("potentialAction");
  });

  it("describes a page with one node of the declared type", () => {
    const graph = graphOf(
      buildPageJsonLd({
        title: "Gallery",
        description: "Photos",
        path: "/gallery",
        pageType: "ImageGallery",
        pageProperties: buildImageGalleryProperties([
          { src: "/lovable-uploads/example.webp", alt: "Example", width: 800, height: 600 },
        ]),
      })
    );

    const pageNodes = graph.filter(
      (node) => node.url === "https://practicetransitionsinstitute.com/gallery"
    );
    expect(pageNodes).toHaveLength(1);
    expect(pageNodes[0]).toMatchObject({
      "@type": "ImageGallery",
      "@id": "https://practicetransitionsinstitute.com/gallery#webpage",
      associatedMedia: [
        {
          "@type": "ImageObject",
          contentUrl: "https://practicetransitionsinstitute.com/lovable-uploads/example.webp",
          name: "Example",
        },
      ],
    });
  });

  it("links Dr. Njo's posts to his Person node", () => {
    const post = blogPosts.find((candidate) => candidate.author === "Michael Njo, DDS");
    expect(post).toBeDefined();

    const schema = buildBlogPostingSchema(post!, {
      authorProfile: getAuthorProfile(post!.author),
    });

    expect(schema.author).toMatchObject({
      "@type": "Person",
      "@id": buildPersonId("/drnjo"),
      name: "Michael Njo, DDS",
    });
  });
});

describe("JSON-LD serialization", () => {
  it("cannot close the surrounding script element", () => {
    const serialized = serializeJsonLd({ reviewBody: "Great</script><script>alert(1)" });
    expect(serialized).not.toContain("</script>");
    expect(JSON.parse(serialized)).toEqual({
      reviewBody: "Great</script><script>alert(1)",
    });
  });
});
