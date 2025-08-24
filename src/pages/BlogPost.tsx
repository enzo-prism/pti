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
            <Breadcrumb className="mb-6">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/">Home</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to="/blog">Blog</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbPage>{post.title}</BreadcrumbPage>
              </BreadcrumbList>
            </Breadcrumb>

            {/* Back to Blog Button */}
            <Button variant="ghost" asChild className="mb-6 -ml-4">
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Blog
              </Link>
            </Button>

            {/* Post Header */}
            <div className="space-y-4">
              <Badge className="text-sm">{post.category}</Badge>
              <h1 className="text-3xl md:text-5xl font-bold leading-tight animate-fade-in">
                {post.title}
              </h1>
              <p className="text-lg md:text-xl text-gray-700 leading-relaxed animate-fade-in animate-delay-100">
                {post.excerpt}
              </p>
              
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  {post.author}
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  {formatLocalDate(post.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  {post.readTime}
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
          <article className="prose prose-lg prose-slate max-w-none prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80">
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
            <div className="mt-12">
              <SeriesNavigation currentPost={post} seriesPosts={seriesPosts} />
            </div>
          )}

          {/* Author Contact */}
          <div className="mt-12 p-6 bg-gray-50 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">About the Author</h3>
            <p className="text-gray-700 mb-4">
              <strong>{post.author}</strong> is a dental practice transition expert with extensive experience 
              helping dentists navigate career changes, practice sales, and business strategies.
            </p>
            <p className="text-sm text-gray-600">
              Have questions or topics you'd like to see covered? Email at{' '}
              <a href="mailto:dentalstrategies@gmail.com" className="text-primary hover:underline">
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
            
            <div className="grid md:grid-cols-2 gap-8 mt-8">
              {relatedPosts.map((relatedPost) => (
                <Card key={relatedPost.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <div className={`aspect-video overflow-hidden ${relatedPost.gradient}`}>
                    </div>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="outline">{relatedPost.category}</Badge>
                        <div className="flex items-center text-xs text-gray-500">
                          <Clock className="h-3 w-3 mr-1" />
                          {relatedPost.readTime}
                        </div>
                      </div>
                      <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                        {relatedPost.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {relatedPost.excerpt}
                      </p>
                      <div className="flex items-center text-xs text-gray-500 mt-4">
                        <Calendar className="h-3 w-3 mr-1" />
                        {formatLocalDate(relatedPost.date, { 
                          month: 'short', 
                          day: 'numeric', 
                          year: 'numeric' 
                        })}
                      </div>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>

            <div className="text-center mt-8">
              <Button asChild variant="outline">
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