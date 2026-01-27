import Link from "next/link";
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { getRelatedPosts, getSeriesPosts, type BlogPost } from "@/data/blogPosts";
import { formatLocalDate } from "@/lib/dateUtils";
import { SeriesNavigation } from "@/components/ui/series-navigation";
import { marked } from "marked";
import { cn } from "@/lib/utils";
import { getAuthorProfile } from "@/data/authors";
import { buildAbsoluteUrl } from "@/lib/siteMetadata";
import { BlogPostAnalytics } from "@/components/blog/BlogPostAnalytics";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

interface BlogPostViewProps {
  post: BlogPost;
}

export const BlogPostView = ({ post }: BlogPostViewProps) => {
  const authorProfile = getAuthorProfile(post.author);
  const authorName = authorProfile?.name ?? post.author;
  const authorRole = authorProfile?.role;
  const authorBio = authorProfile?.bio ??
    (authorProfile?.type === "Organization"
      ? `${authorName} shares guidance for dentists navigating valuations, transitions, and practice ownership decisions.`
      : `${authorName} is a dental practice transition expert with extensive experience helping dentists navigate career changes, practice sales, and business strategies.`);
  const authorImage = authorProfile?.image;
  const authorUrl = authorProfile?.url;

  const relatedPosts = getRelatedPosts(post.id, post.category, 2);
  const seriesPosts = post.series ? getSeriesPosts(post.series.id) : [];
  const metaItems = [
    { icon: User, label: authorName, helper: "Author" },
    { icon: Calendar, label: formatLocalDate(post.date), helper: "Published" },
    { icon: Clock, label: post.readTime, helper: "Read time" },
  ];
  const currentUrl = buildAbsoluteUrl(`/blog/${post.slug}`);
  const emailShareHref = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(
      `I thought you'd enjoy this PTI article: ${currentUrl}`
  )}`;
  const articleSections = post.content
    .split("\n\n")
    .map((segment, index) => {
      if (!segment.trim()) return null;
      const hasHtmlTags = /<[^>]+>/.test(segment);
      const key = `${post.slug}-${index}`;
      if (hasHtmlTags) {
        return (
          <div
            key={key}
            dangerouslySetInnerHTML={{ __html: segment }}
          />
        );
      }
      const htmlContent = marked(segment.trim());
      return (
        <div
          key={key}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      );
    })
    .filter(Boolean);

  const QuickFactsCard = ({ className = "" }: { className?: string }) => (
    <div
      className={cn(
        "rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-sm sm:px-6 sm:py-7 md:px-7 md:py-8",
        className
      )}
    >
      <p className="text-[0.7rem] font-semibold uppercase tracking-[0.32em] text-slate-500 sm:text-xs">At-a-glance</p>
      <ul className="mt-5 space-y-4 md:mt-6 md:space-y-5">
        {metaItems.map((item) => (
          <li key={`aside-${item.helper}`} className="flex items-start gap-3 md:gap-4">
            <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary/10 text-primary sm:h-10 sm:w-10">
              <item.icon className="h-4 w-4 sm:h-5 sm:w-5" />
            </span>
            <div className="space-y-1">
              <p className="text-sm font-semibold leading-tight text-slate-900 md:text-base">{item.label}</p>
              <p className="text-[0.65rem] uppercase tracking-[0.3em] text-slate-500 sm:text-xs">{item.helper}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );

  const ContinueLearningCard = ({ className = "" }: { className?: string }) => (
    <div
      className={cn(
        "rounded-3xl border border-primary/15 bg-gradient-to-br from-primary to-primary/90 px-5 py-6 text-white shadow-md sm:px-6 sm:py-7 md:px-7 md:py-8",
        className
      )}
    >
      <p className="text-[0.65rem] font-semibold uppercase tracking-[0.32em] text-white/70 sm:text-xs">Continue learning</p>
      <h3 className="mt-3 text-lg font-semibold leading-tight text-white sm:text-xl">Bring PTI to your journey</h3>
      <p className="mt-2 text-sm leading-relaxed text-white/85 md:text-base">
        Join our upcoming workshops, explore transition services, or share this article with a colleague planning their next move.
      </p>
      <div className="mt-5 grid gap-3 sm:grid-cols-2 md:grid-cols-1">
        <Button
          asChild
          variant="secondary"
          className="w-full justify-center rounded-full bg-white text-primary hover:bg-slate-100 sm:flex-1"
        >
          <Link href="/events" className="flex items-center justify-center gap-2 text-sm font-semibold md:text-base">
            Browse PTI Events <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <Button
          asChild
          variant="secondary"
          className="w-full justify-center rounded-full bg-white text-primary hover:bg-slate-100 sm:flex-1"
        >
          <Link href="/services" className="flex items-center justify-center gap-2 text-sm font-semibold md:text-base">
            Explore PTI Services <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
        <a
          href={emailShareHref}
          className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10 sm:col-span-2 md:col-span-1"
        >
          <Share2 className="h-4 w-4" /> Share via Email
        </a>
      </div>
    </div>
  );

  return (
    <>
      <BlogPostAnalytics title={post.title} category={post.category} />
      {/* Header Section */}
      <section className="bg-white pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <Breadcrumb className="w-full">
              <BreadcrumbList className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground sm:text-sm">
                <BreadcrumbItem className="flex-shrink-0">
                  <BreadcrumbLink asChild className="min-h-[32px] sm:min-h-[44px] flex items-center">
                    <Link href="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="flex-shrink-0" />
                <BreadcrumbItem className="flex-shrink-0">
                  <BreadcrumbLink asChild className="min-h-[32px] sm:min-h-[44px] flex items-center">
                    <Link href="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="flex-shrink-0" />
                <BreadcrumbPage className="min-w-0 flex-1">
                  <span className="inline-flex max-w-full items-center rounded-full bg-slate-100/80 px-3 py-1.5 text-xs font-medium text-slate-600 shadow-inner sm:text-sm">
                    <span className="truncate">{post.title}</span>
                  </span>
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <Button variant="ghost" asChild className="inline-flex min-h-[44px] items-center gap-2 px-0 text-sm text-muted-foreground hover:text-primary">
              <Link href="/blog">
                <ArrowLeft className="h-4 w-4" />
                Back to blog
              </Link>
            </Button>
            <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
              {metaItems.map((item) => (
                <div key={`inline-${item.helper}`} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <Badge variant="outline" className="text-xs sm:text-sm">
              {post.category}
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-slate-900">
              {post.title}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-3xl">
              {post.excerpt}
            </p>
            <div className="sm:hidden mt-5 grid gap-3 text-sm text-muted-foreground">
              {metaItems.map((item) => (
                <div key={`mobile-${item.helper}`} className="flex items-center gap-2">
                  <item.icon className="h-4 w-4 text-primary" />
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      {(post.featuredImage || post.gradient) && (
        <Section padding="none" className="pb-12">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={cn(
                "w-full overflow-hidden rounded-2xl shadow-2xl ring-1 ring-black/5 sm:rounded-[2.25rem] md:rounded-[2.75rem]",
                post.featuredImage
                  ? "bg-white flex items-center justify-center"
                  : "aspect-[4/3] sm:aspect-[16/10] md:aspect-[16/9]"
              )}
            >
              {post.featuredImage ? (
                <img
                  src={post.featuredImage}
                  alt={post.featuredImageAlt ?? post.title}
                  className={cn(
                    "w-full h-auto max-h-[70vh] object-contain",
                    post.featuredImageFit === "cover" && "object-cover h-full w-full"
                  )}
                  decoding="async"
                  loading="eager"
                />
              ) : (
                <div className={`h-full w-full ${post.gradient}`} />
              )}
            </div>
            <p className="mt-6 text-center text-sm italic text-slate-600 sm:text-base">
              "As a man thinketh in his heart, so is he." — Proverbs 23:7
            </p>
          </div>
        </Section>
      )}

      {/* Article Content */}
      <Section padding="none" className="bg-slate-50/80 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 md:gap-12 lg:grid-cols-[minmax(0,1fr)_300px] xl:grid-cols-[minmax(0,1fr)_340px]">
            <article className="blog-prose min-w-0 px-1 py-0 sm:rounded-3xl sm:border sm:border-white/80 sm:bg-white sm:px-8 sm:py-10 sm:shadow-sm md:px-12 md:py-12">
              <div className="space-y-8">
                {articleSections}
              </div>

              {post.series && seriesPosts.length > 1 && (
                <div className="mt-14">
                  <SeriesNavigation currentPost={post} seriesPosts={seriesPosts} />
                </div>
              )}

              <div className="mt-12 grid gap-6 lg:hidden">
                <QuickFactsCard />
                <ContinueLearningCard />
              </div>

              <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900">About the Author</h3>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center">
                  {authorImage && (
                    <div className="h-16 w-16 overflow-hidden rounded-full ring-2 ring-white shadow-sm">
                      <Image
                        src={authorImage}
                        alt={authorName}
                        width={64}
                        height={64}
                        className="h-full w-full object-cover"
                        sizes="64px"
                      />
                    </div>
                  )}
                  <div className="space-y-1">
                    {authorUrl ? (
                      authorUrl.startsWith("/") ? (
                        <Link href={authorUrl} className="text-base font-semibold text-slate-900 hover:text-primary">
                          {authorName}
                        </Link>
                      ) : (
                        <a
                          href={authorUrl}
                          className="text-base font-semibold text-slate-900 hover:text-primary"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {authorName}
                        </a>
                      )
                    ) : (
                      <p className="text-base font-semibold text-slate-900">{authorName}</p>
                    )}
                    {authorRole && (
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">{authorRole}</p>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
                  {authorBio}
                </p>
                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-500">
                  <span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 shadow-sm ring-1 ring-slate-200">
                    <User className="h-4 w-4 text-primary" />
                    Practice Transitions Institute
                  </span>
                  <Button asChild variant="outline" className="rounded-full border-primary/40 text-primary hover:bg-primary/5">
                    <a href="mailto:dentalstrategies@gmail.com">Email the PTI team</a>
                  </Button>
                </div>
              </div>
            </article>

            <aside className="hidden lg:block">
              <div className="sticky top-28 flex flex-col gap-6 xl:top-32 xl:gap-7">
                <QuickFactsCard />
                <ContinueLearningCard />
              </div>
            </aside>
          </div>
        </div>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section background="white" className="py-16">
          <div className="max-w-6xl mx-auto">
            <SectionTitle centered className="mb-2">Related Articles</SectionTitle>
            <SectionSubtitle centered className="text-base text-muted-foreground mb-8">
              Explore more stories guiding dentists through career-defining transitions.
            </SectionSubtitle>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link href={`/blog/${relatedPost.slug}`} className="block h-full">
                    <div
                      className={cn(
                        "relative aspect-[16/10] overflow-hidden",
                        relatedPost.featuredImageFit === "contain" && "flex items-center justify-center bg-slate-100"
                      )}
                    >
                      {relatedPost.featuredImage ? (
                        <Image
                          src={relatedPost.featuredImage}
                          alt={relatedPost.featuredImageAlt ?? relatedPost.title}
                          fill
                          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                          className={cn(
                            "object-cover transition duration-500 group-hover:scale-105",
                            relatedPost.featuredImageFit === "contain" && "object-contain group-hover:scale-100"
                          )}
                        />
                      ) : (
                        <div className={`h-full w-full ${relatedPost.gradient}`} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/0" />
                      <Badge className="absolute left-4 top-4 bg-white/90 text-primary">
                        {relatedPost.category}
                      </Badge>
                    </div>

                    <CardHeader className="space-y-3 px-5 py-5">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>{formatLocalDate(relatedPost.date, { month: "long", day: "numeric", year: "numeric" })}</span>
                        <span className="inline-flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {relatedPost.readTime}
                        </span>
                      </div>
                      <CardTitle className="text-lg font-semibold leading-tight text-slate-900 transition-colors group-hover:text-primary">
                        {relatedPost.title}
                      </CardTitle>
                      <p className="text-sm leading-relaxed text-slate-600 line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                    </CardHeader>

                    <CardContent className="px-5 pb-6 pt-0">
                      <div className="flex items-center justify-between text-xs text-slate-500">
                        <span>By {relatedPost.author}</span>
                        <span className="inline-flex items-center gap-1 text-primary font-medium">
                          Read more
                          <ArrowRight className="h-3 w-3" />
                        </span>
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="text-center mt-6 sm:mt-8">
              <Button asChild variant="outline" className="min-h-[44px] px-6">
                <Link href="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
};
