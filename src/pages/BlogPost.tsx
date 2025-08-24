import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Section, SectionTitle } from "@/components/ui/section";
import { getBlogPostBySlug, getRelatedPosts, getSeriesPosts } from "@/data/blogPosts";
import SEO from "@/components/layout/SEO";
import { formatLocalDate } from "@/lib/dateUtils";
import { SeriesNavigation } from "@/components/ui/series-navigation";
import { marked } from "marked";
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

  const relatedPosts = getRelatedPosts(post.id, post.category, 2);
  const seriesPosts = post.series ? getSeriesPosts(post.series.id) : [];

  return (
    <>
      <SEO 
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />

      {/* Header Section */}
      <section className="pt-20 pb-8 md:pt-28 md:pb-12 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumbs */}
            <Breadcrumb className="mb-4 sm:mb-6">
              <BreadcrumbList className="text-sm">
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
                <BreadcrumbPage className="max-w-[200px] sm:max-w-none truncate">
                  {post.title}
                </BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Back to Blog Button */}
            <Button variant="ghost" asChild className="mb-4 sm:mb-6 -ml-2 sm:-ml-4 min-h-[44px]">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">Back to Blog</span>
                <span className="sm:hidden">Back</span>
              </Link>
            </Button>

            {/* Post Header */}
            <div className="space-y-3 sm:space-y-4">
              <Badge className="text-xs sm:text-sm">{post.category}</Badge>
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight animate-fade-in">
                {post.title}
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in animate-delay-100">
                {post.excerpt}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6 text-xs sm:text-sm text-gray-600 pt-3 sm:pt-4 border-t border-gray-200">
                <div className="flex items-center min-h-[44px] sm:min-h-0">
                  <User className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">{post.author}</span>
                </div>
                <div className="flex items-center min-h-[44px] sm:min-h-0">
                  <Calendar className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">{formatLocalDate(post.date)}</span>
                </div>
                <div className="flex items-center min-h-[44px] sm:min-h-0">
                  <Clock className="h-4 w-4 mr-2 shrink-0" />
                  <span className="truncate">{post.readTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Image */}
      <Section className="py-0">
        <div className="max-w-4xl mx-auto">
          <div className={`aspect-video rounded-lg mb-8 ${post.gradient}`}>
          </div>
        </div>
      </Section>

      {/* Article Content */}
      <Section>
        <div className="max-w-4xl mx-auto">
          <article className="prose prose-sm sm:prose-base lg:prose-lg prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:leading-tight prose-p:leading-relaxed">
            {post.content.split('\n\n').map((segment, index) => {
              // Skip empty segments
              if (!segment.trim()) return null;
              
              // Check if the segment contains HTML tags
              const hasHtmlTags = /<[^>]+>/.test(segment);
              
              if (hasHtmlTags) {
                // Render HTML content directly
                return (
                  <div 
                    key={index} 
                    dangerouslySetInnerHTML={{ __html: segment }}
                  />
                );
              } else {
                // Parse markdown and render as HTML
                const htmlContent = marked(segment.trim());
                return (
                  <div 
                    key={index} 
                    dangerouslySetInnerHTML={{ __html: htmlContent }}
                  />
                );
              }
            })}
          </article>

          {/* Series Navigation */}
          {post.series && seriesPosts.length > 1 && (
            <div className="mt-8 sm:mt-12">
              <SeriesNavigation currentPost={post} seriesPosts={seriesPosts} />
            </div>
          )}

          {/* Author Contact */}
          <div className="mt-8 sm:mt-12 p-4 sm:p-6 bg-gray-50 rounded-lg">
            <h3 className="text-base sm:text-lg font-semibold mb-2">About the Author</h3>
            <p className="text-sm sm:text-base text-gray-700 mb-4 leading-relaxed">
              <strong>{post.author}</strong> is a dental practice transition expert with extensive experience 
              helping dentists navigate career changes, practice sales, and business strategies.
            </p>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              Have questions or topics you'd like to see covered? Email at{' '}
              <a 
                href="mailto:dentalstrategies@gmail.com" 
                className="text-primary hover:underline min-h-[44px] inline-flex items-center"
              >
                dentalstrategies@gmail.com
              </a>
            </p>
          </div>
        </div>
      </Section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <Section background="light">
          <div className="max-w-6xl mx-auto">
            <SectionTitle centered>Related Articles</SectionTitle>
            
            <div className="grid gap-6 md:grid-cols-2 mt-6 sm:mt-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <Link to={`/blog/${relatedPost.slug}`} className="block min-h-[44px]">
                    <div className={`aspect-video overflow-hidden ${relatedPost.gradient}`}>
                    </div>
                    <CardHeader className="pb-3 p-4 sm:p-6">
                      <div className="flex items-center justify-between mb-2 gap-2">
                        <Badge variant="outline" className="text-xs shrink-0">{relatedPost.category}</Badge>
                        <div className="flex items-center text-xs text-gray-500 shrink-0">
                          <Clock className="h-3 w-3 mr-1" />
                          {relatedPost.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-base sm:text-lg leading-tight group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0 p-4 sm:p-6 sm:pt-0">
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-3 sm:mt-4">
                        <Calendar className="h-3 w-3 mr-1 shrink-0" />
                        <span className="truncate">
                          {formatLocalDate(relatedPost.date, { 
                            month: 'short', 
                            day: 'numeric', 
                            year: 'numeric' 
                          })}
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