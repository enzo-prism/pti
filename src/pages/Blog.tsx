import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import { blogPosts } from "@/data/blogPosts";
import { formatLocalDate } from "@/lib/dateUtils";

const Blog = () => {
  // Sort posts by date (most recent first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <>
      <SEO 
        title="Blog - Practice Transitions Institute | Dental Practice Insights & Expert Guidance"
        description="Stay informed with expert insights on dental practice transitions, valuations, and business strategies. Get the latest tips and trends from industry professionals."
      />

      {/* Hero Section */}
      <section className="pt-20 pb-12 md:pt-28 md:pb-16 bg-gradient-to-b from-accent to-white">
        <div className="container px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6 animate-fade-in leading-tight">
              Dental Practice Insights & Expert Guidance
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-8 animate-fade-in animate-delay-100 leading-relaxed">
              Stay informed with the latest trends, strategies, and insights for successful dental practice transitions
            </p>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <Section>
        <SectionTitle centered>Latest Articles</SectionTitle>
        <SectionSubtitle centered>
          Expert insights and practical guidance for dental practice owners
        </SectionSubtitle>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          {sortedPosts.map((post) => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
              <Link to={`/blog/${post.slug}`}>
                <div className={`aspect-video overflow-hidden ${post.gradient}`}>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline">{post.category}</Badge>
                    <div className="flex items-center text-xs text-gray-500">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatLocalDate(post.date, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-600">
                      By {post.author}
                    </div>
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="mt-3 p-0 h-auto text-primary hover:text-primary-dark"
                    asChild
                  >
                    <span>
                      Read More 
                      <ArrowRight className="ml-1 h-3 w-3" />
                    </span>
                  </Button>
                </CardContent>
              </Link>
            </Card>
          ))}
        </div>
      </Section>

      {/* Newsletter Signup */}
      <Section background="light">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">Stay Informed</h3>
          <p className="text-gray-600 mb-8 leading-relaxed">
            Subscribe to our newsletter for the latest insights on dental practice transitions, valuations, and industry trends delivered directly to your inbox.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email address"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <Button className="whitespace-nowrap">
              Subscribe Now
            </Button>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Blog;