import { useParams, Link, Navigate } from "react-router-dom";
import { useEffect, type JSX } from "react";
import { ArrowLeft, Calendar, Clock, User, Share2, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { getBlogPostBySlug, getRelatedPosts, getSeriesPosts } from "@/data/blogPosts";
import SEO from "@/components/layout/SEO";
import { formatLocalDate } from "@/lib/dateUtils";
import { SeriesNavigation } from "@/components/ui/series-navigation";
import { marked } from "marked";
import { trackBlogPostView } from "@/lib/analytics";
import { cn } from "@/lib/utils";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <Navigate to="/blog" replace />;
  }

  const post = getBlogPostBySlug(slug);
  
  if (!post) {
    return <Navigate to="/blog" replace />;
  }
  
  // Track blog post view
  useEffect(() => {
    if (post) {
      trackBlogPostView(post.title, post.category);
    }
  }, [post]);

  const relatedPosts = getRelatedPosts(post.id, post.category, 2);
  const seriesPosts = post.series ? getSeriesPosts(post.series.id) : [];
  const metaItems = [
    { icon: User, label: post.author, helper: "Author" },
    { icon: Calendar, label: formatLocalDate(post.date), helper: "Published" },
    { icon: Clock, label: post.readTime, helper: "Read time" },
  ];
  const currentUrl = typeof window !== "undefined"
    ? window.location.href
    : `https://practicetransitionsinstitute.com/blog/${post.slug}`;
  const emailShareHref = `mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(
    `I thought you'd enjoy this PTI article: ${currentUrl}`
  )}`;
  const articleSections = post.content
    .split('\n\n')
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
    .filter(Boolean) as JSX.Element[];

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      {/* Header Section */}
      <section className="bg-white pt-24 pb-8 md:pt-28 md:pb-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Breadcrumb className="mb-4 sm:mb-6">
            <BreadcrumbList className="text-sm text-muted-foreground">
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="min-h-[44px] flex items-center">
                  <Link to="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild className="min-h-[44px] flex items-center">
                  <Link to="/blog">Blog</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbPage className="max-w-[240px] sm:max-w-none truncate text-foreground">
                {post.title}
              </BreadcrumbPage>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="flex items-center justify-between flex-wrap gap-3">
            <Button variant="ghost" asChild className="inline-flex min-h-[44px] items-center gap-2 px-0 text-sm text-muted-foreground hover:text-primary">
              <Link to="/blog">
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
            <div className="sm:hidden flex items-center gap-4 text-sm text-muted-foreground">
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
                "w-full overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5",
                post.featuredImage
                  ? "bg-white flex items-center justify-center"
                  : "aspect-[16/9]"
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
                />
              ) : (
                <div className={`h-full w-full ${post.gradient}`} />
              )}
            </div>
          </div>
        </Section>
      )}

      {/* Article Content */}
      <Section padding="none" className="bg-slate-50/80 py-14 md:py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_280px]">
            <article className="blog-prose rounded-3xl border border-white/80 bg-white px-5 py-8 shadow-sm sm:px-8 sm:py-10 md:px-12 md:py-12">
              <div className="space-y-8">
                {articleSections}
              </div>

              {post.series && seriesPosts.length > 1 && (
                <div className="mt-14">
                  <SeriesNavigation currentPost={post} seriesPosts={seriesPosts} />
                </div>
              )}

              <div className="mt-14 rounded-2xl border border-slate-200 bg-slate-50 p-6 sm:p-8">
                <h3 className="text-lg font-semibold text-slate-900">About the Author</h3>
                <p className="mt-2 text-sm sm:text-base leading-relaxed text-slate-600">
                  <strong className="font-semibold text-slate-900">{post.author}</strong> is a dental practice transition expert with extensive experience helping dentists navigate career changes, practice sales, and business strategies.
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
              <div className="sticky top-28 flex flex-col gap-6">
                <div className="rounded-3xl border border-slate-200 bg-white px-6 py-6 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">At-a-glance</p>
                  <ul className="mt-5 space-y-4">
                    {metaItems.map((item) => (
                      <li key={`aside-${item.helper}`} className="flex items-start gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          <item.icon className="h-5 w-5" />
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 leading-tight">{item.label}</p>
                          <p className="text-xs uppercase tracking-wide text-slate-500">{item.helper}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl border border-primary/15 bg-gradient-to-br from-primary to-primary/90 px-6 py-7 text-white shadow-md">
                  <p className="text-sm uppercase tracking-[0.32em] text-white/70">Continue learning</p>
                  <h3 className="mt-3 text-lg font-semibold leading-tight text-white">Bring PTI to your journey</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/85">
                    Join our upcoming workshops or share this article with a colleague who is planning their next transition.
                  </p>
                  <div className="mt-5 space-y-3">
                    <Button asChild variant="secondary" className="w-full justify-center rounded-full bg-white text-primary hover:bg-slate-100">
                      <Link to="/events" className="flex items-center justify-center gap-2">
                        Browse PTI Events <ArrowRight className="h-4 w-4" />
                      </Link>
                    </Button>
                    <a
                      href={emailShareHref}
                      className="flex items-center justify-center gap-2 rounded-full border border-white/40 px-4 py-2.5 text-sm font-medium text-white/90 transition hover:bg-white/10"
                    >
                      <Share2 className="h-4 w-4" /> Share via Email
                    </a>
                  </div>
                </div>
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
            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost) => (
                <Card
                  key={relatedPost.id}
                  className="group overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <Link to={`/blog/${relatedPost.slug}`} className="block h-full">
                    <div
                      className={cn(
                        "relative aspect-[16/10] overflow-hidden",
                        relatedPost.featuredImageFit === "contain" && "flex items-center justify-center bg-slate-100"
                      )}
                    >
                      {relatedPost.featuredImage ? (
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.featuredImageAlt ?? relatedPost.title}
                          className={cn(
                            "h-full w-full object-cover transition duration-500 group-hover:scale-105",
                            relatedPost.featuredImageFit === "contain" && "h-auto w-auto max-h-full max-w-full object-contain group-hover:scale-100"
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
                <Link to="/blog">View All Articles</Link>
              </Button>
            </div>
          </div>
        </Section>
      )}
    </>
  );
};

export default BlogPost;
