import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/views/BlogPost";
import { blogPosts } from "@/data/blogPosts";
import { getAuthorProfile } from "@/data/authors";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildBlogPostingSchema } from "@/lib/structuredData";
import { HOME_CRUMB } from "@/lib/breadcrumbs";
import { DEFAULT_OG_IMAGE } from "@/lib/siteMetadata";

type BlogParams = {
  slug: string;
};

const getPost = (slug: string) => blogPosts.find((post) => post.slug === slug);

export const dynamicParams = false;

export const generateStaticParams = (): BlogParams[] =>
  blogPosts
    .filter((post) => post.slug)
    .map((post) => ({ slug: post.slug }));

export function generateMetadata({
  params,
}: {
  params: BlogParams;
}): Metadata {
  const post = getPost(params.slug);
  if (!post) {
    return buildPageMetadata({
      title: "Blog Post Not Found",
      description: "The requested blog post could not be found.",
      path: "/blog",
      noindex: true,
    });
  }

  const publishedTime = new Date(`${post.date}T00:00:00Z`).toISOString();

  return buildPageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage ?? DEFAULT_OG_IMAGE,
    ogType: "article",
    author: post.author,
    article: {
      publishedTime,
      modifiedTime: publishedTime,
      author: post.author,
      section: post.category,
    },
  });
}

export default function Page({ params }: { params: BlogParams }) {
  const post = getPost(params.slug);
  if (!post) notFound();

  const authorProfile = getAuthorProfile(post.author);
  const breadcrumbs = [
    HOME_CRUMB,
    { name: "Blog", path: "/blog" },
    { name: post.title },
  ];
  const blogSchema = buildBlogPostingSchema(post, {
    category: post.category,
    authorProfile,
  });

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title: post.title,
          description: post.excerpt,
          path: `/blog/${post.slug}`,
          image: post.featuredImage ?? DEFAULT_OG_IMAGE,
          breadcrumbs,
          structuredData: blogSchema,
        })}
      />
      <BlogPostView post={post} />
    </>
  );
}
