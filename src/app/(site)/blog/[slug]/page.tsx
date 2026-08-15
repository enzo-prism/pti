import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostView } from "@/views/BlogPost";
import { blogPosts } from "@/data/blogPosts";
import { communityImpactPosts } from "@/data/communityImpactPosts";
import { getAuthorProfile } from "@/data/authors";
import { StructuredData } from "@/components/StructuredData";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { buildBlogPostingSchema } from "@/lib/structuredData";
import { HOME_CRUMB } from "@/lib/breadcrumbs";
import { DEFAULT_OG_IMAGE } from "@/lib/siteMetadata";

type BlogParams = {
  slug: string;
};

const allBlogPosts = [...communityImpactPosts, ...blogPosts];

const getPost = (slug: string) => allBlogPosts.find((post) => post.slug === slug);

export const dynamicParams = false;

export const generateStaticParams = (): BlogParams[] =>
  allBlogPosts
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
  const modifiedTime = post.dateModified
    ? new Date(`${post.dateModified}T00:00:00Z`).toISOString()
    : publishedTime;

  return buildPageMetadata({
    title: post.metaTitle ?? post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: post.featuredImage ?? DEFAULT_OG_IMAGE,
    ogType: "article",
    author: post.author,
    article: {
      publishedTime,
      modifiedTime,
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
