import { useEffect, useState } from "react";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Calendar, Clock, ArrowRight, Search, X } from "lucide-react";
import { Link, useSearchParams } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import { blogPosts } from "@/data/blogPosts";
import { formatLocalDate } from "@/lib/dateUtils";

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("search") ?? "";
  const [searchQuery, setSearchQuery] = useState(initialQuery);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setSearchQuery(initialQuery);
  }, [initialQuery]);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 120);
    return () => clearTimeout(timeout);
  }, []);

  const updateSearchQuery = (value: string) => {
    setSearchQuery(value);
    if (value) {
      setSearchParams({ search: value });
    } else {
      setSearchParams({});
    }
  };

  // Sort posts by date (most recent first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Filter posts based on search query
  const filteredPosts = sortedPosts.filter(post => {
    if (!searchQuery.trim()) return true;
    
    const query = searchQuery.toLowerCase();
    return (
      post.title.toLowerCase().includes(query) ||
      post.excerpt.toLowerCase().includes(query) ||
      post.category.toLowerCase().includes(query) ||
      post.author.toLowerCase().includes(query)
    );
  });
  
  const featuredPost = filteredPosts[0]; // First filtered post as featured
  const regularPosts = filteredPosts.slice(1); // Rest of the filtered posts
  
  const handleClearSearch = () => {
    updateSearchQuery('');
  };

  const BlogPostsSkeleton = () => (
    <div className="space-y-12">
      <div className="space-y-3">
        <Skeleton className="h-6 w-48" />
        <Skeleton className="h-4 w-80" />
      </div>

      <Card className="overflow-hidden">
        <div className="md:flex lg:flex">
          <Skeleton className="h-56 w-full md:h-auto md:w-2/5 lg:w-2/5" />
          <div className="p-4 md:p-6 lg:p-8 md:w-3/5 lg:w-3/5 space-y-4">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-4 w-20" />
            </div>
            <Skeleton className="h-7 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <Skeleton className="h-10 w-44" />
              <Skeleton className="h-10 w-28" />
            </div>
          </div>
        </div>
      </Card>

      <div className="space-y-3">
        <Skeleton className="h-6 w-40" />
        <Skeleton className="h-4 w-72" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={`blog-skeleton-${index}`} className="overflow-hidden">
            <Skeleton className="h-40 w-full" />
            <div className="p-4 md:p-6 space-y-3">
              <Skeleton className="h-5 w-5/6" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-4/5" />
              <Skeleton className="h-4 w-24" />
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  return (
    <>
      <SEO 
        title="Dental Practice Transitions Blog"
        description="Stay informed with expert insights on dental practice transitions, valuations, and business strategies. Get the latest tips and trends from industry professionals."
        path="/blog"
      />

      {/* Enhanced Hero Section */}
      <section className="relative pt-24 pb-16 md:pt-32 md:pb-20 hero-gradient overflow-hidden">
        <div className="hero-gradient-overlay absolute inset-0"></div>
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Logo and Title - Mobile Optimized */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-8 md:mb-12 text-center md:text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 mb-4 md:mb-0 md:mr-6">
                <img 
                  src="/lovable-uploads/18b2244b-dbb5-4dd6-a1ca-c6a28fed53c6.png" 
                  alt="PTI Logo" 
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-2 animate-fade-in leading-tight">
                  Expert Insights
                </h1>
                <p className="text-lg md:text-xl lg:text-2xl text-blue-100 animate-fade-in animate-delay-100">
                  For Dental Practice Success
                </p>
              </div>
            </div>

            {/* Search Bar - Mobile Optimized */}
            <div className="max-w-2xl mx-auto px-4 md:px-0">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search articles, topics, or categories..."
                  value={searchQuery}
                  onChange={(e) => updateSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base md:text-lg"
                />
                {searchQuery && (
                  <button
                    onClick={handleClearSearch}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-center text-blue-200 mt-4">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <Section>
        {isLoading ? (
          <BlogPostsSkeleton />
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-16">
            <Search className="h-16 w-16 text-gray-300 mx-auto mb-6" />
            <h3 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your search terms or browse all articles below.
            </p>
            <Button onClick={handleClearSearch} variant="outline">
              Clear Search
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-16">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <SectionTitle>{searchQuery ? 'Top Result' : 'Featured Article'}</SectionTitle>
                  <SectionSubtitle className="mb-0">
                    {searchQuery ? 'Most relevant article for your search' : 'Our latest insights on dental practice transitions'}
                  </SectionSubtitle>
                </div>
                {!searchQuery && (
                  <Badge variant="outline" className="hidden md:flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Latest
                  </Badge>
                )}
              </div>
          
          <Card className="overflow-hidden hover-lift group">
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="md:flex lg:flex">
                <div className="md:w-2/5 lg:w-2/5 aspect-video md:aspect-auto relative">
                  {featuredPost.featuredImage ? (
                    <img 
                      src={featuredPost.featuredImage} 
                      alt={featuredPost.featuredImageAlt ?? featuredPost.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${featuredPost.gradient}`} />
                  )}
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>
                <div className="md:w-3/5 lg:w-3/5 p-4 md:p-6 lg:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatLocalDate(featuredPost.date, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <CardTitle className="text-xl md:text-2xl lg:text-3xl mb-3 md:mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </CardTitle>
                  
                  <p className="text-gray-600 mb-4 md:mb-6 leading-relaxed text-base md:text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center">
                      <img 
                        src="/lovable-uploads/0fbfd01f-6249-49ce-baea-1b42e6bd44f4.png" 
                        alt="Michael Njo, DDS" 
                        className="w-10 h-10 rounded-full object-cover mr-3"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">Practice Transitions Expert</p>
                      </div>
                    </div>
                    
                    <Button className="group-hover:translate-x-1 transition-transform w-full sm:w-auto">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
            </div>

            {/* Additional Articles Grid */}
            {regularPosts.length > 0 && (
              <>
                <div className="mb-12">
                  <SectionTitle>{searchQuery ? 'More Results' : 'Latest Articles'}</SectionTitle>
                  <SectionSubtitle>
                    {searchQuery ? 'Additional articles matching your search' : 'Expert insights and practical guidance for dental practice owners'}
                  </SectionSubtitle>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {regularPosts.map((post, index) => (
            <Card key={post.id} className="overflow-hidden hover-lift group" style={{ animationDelay: `${index * 100}ms` }}>
              <Link to={`/blog/${post.slug}`}>
                <div className="aspect-video relative overflow-hidden">
                  {post.featuredImage ? (
                    <img 
                      src={post.featuredImage} 
                      alt={post.featuredImageAlt ?? post.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className={`w-full h-full ${post.gradient}`} />
                  )}
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-primary">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div className="flex items-center text-white bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 text-sm">
                      <Clock className="h-3 w-3 mr-1" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
                
                <CardHeader className="p-4 md:p-6 pb-3">
                  <CardTitle className="text-base md:text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mt-2">
                    {post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="p-4 md:p-6 pt-0">
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
                    className="mt-4 p-0 h-auto text-primary hover:text-primary group-hover:translate-x-1 transition-all duration-200"
                  >
                    Read More 
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </Button>
                </CardContent>
              </Link>
            </Card>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </Section>

      {/* Newsletter Signup */}
      <Section background="primary">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Ahead of the Curve</h3>
            <p className="text-blue-100 text-lg leading-relaxed">
              Join thousands of dental professionals who trust our insights. Get the latest strategies, market trends, and expert guidance delivered to your inbox weekly.
            </p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-4 md:px-6 py-3 md:py-4 bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-base md:text-lg"
              />
              <Button size="lg" variant="secondary" className="whitespace-nowrap px-6 md:px-8 py-3 md:py-4">
                Subscribe Now
              </Button>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-blue-200 text-sm">
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Weekly insights
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              No spam, ever
            </div>
            <div className="flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
              Unsubscribe anytime
            </div>
          </div>
        </div>
      </Section>
    </>
  );
};

export default Blog;
