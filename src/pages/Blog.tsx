import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import SEO from "@/components/layout/SEO";
import { blogPosts, categories } from "@/data/blogPosts";

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");

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

      {/* Categories Filter */}
      <Section className="py-8">
        <div className="flex flex-wrap justify-center gap-3 mb-8 px-4">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`
                px-4 py-2.5 md:px-6 md:py-3 rounded-full text-sm md:text-base font-medium 
                transition-all duration-200 min-h-[44px] min-w-[60px]
                border-2 hover:scale-105 active:scale-95
                ${selectedCategory === category 
                  ? 'bg-primary text-white border-primary shadow-lg' 
                  : 'bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary hover:shadow-md'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>
      </Section>

      {/* Featured Post */}
      {(selectedCategory === "All" || blogPosts[0].category === selectedCategory) && (
        <Section className="py-0">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-12">
              <div className="grid md:grid-cols-2 gap-0">
                <div className={`aspect-video md:aspect-square ${blogPosts[0].gradient}`}>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <Badge className="mb-4 w-fit">{blogPosts[0].category}</Badge>
                  <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight">
                    {blogPosts[0].title}
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {blogPosts[0].excerpt}
                  </p>
                  <div className="flex items-center text-sm text-gray-500 mb-6">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="mr-4">{new Date(blogPosts[0].date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    <Clock className="h-4 w-4 mr-2" />
                    <span>{blogPosts[0].readTime}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-6">
                    By {blogPosts[0].author}
                  </div>
                  <Button asChild className="w-fit group">
                    <Link to={`/blog/${blogPosts[0].slug}`}>
                      Read Full Article
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Section>
      )}

      {/* Blog Posts Grid - Only show if there are additional posts beyond the featured one */}
      {blogPosts.slice(1).filter(post => selectedCategory === "All" || post.category === selectedCategory).length > 0 && (
        <Section>
          <SectionTitle centered>Latest Articles</SectionTitle>
          <SectionSubtitle centered>
            Expert insights and practical guidance for dental practice owners
          </SectionSubtitle>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {blogPosts.slice(1).filter(post => selectedCategory === "All" || post.category === selectedCategory).map((post) => (
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
                        {new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="p-0 h-auto text-primary hover:text-primary-dark"
                        asChild
                      >
                        <span>
                          Read More 
                          <ArrowRight className="ml-1 h-3 w-3" />
                        </span>
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </Section>
      )}

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