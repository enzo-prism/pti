import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, Search } from "lucide-react";
import { Link } from "react-router-dom";
import SEO from "@/components/layout/SEO";
import { blogPosts } from "@/data/blogPosts";
import { formatLocalDate } from "@/lib/dateUtils";

const Blog = () => {
  // Sort posts by date (most recent first)
  const sortedPosts = [...blogPosts].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  const featuredPost = sortedPosts[0]; // Most recent post as featured
  const regularPosts = sortedPosts.slice(1); // Rest of the posts

  return (
    <>
      <SEO 
        title="Blog - Practice Transitions Institute | Dental Practice Insights & Expert Guidance"
        description="Stay informed with expert insights on dental practice transitions, valuations, and business strategies. Get the latest tips and trends from industry professionals."
      />

      {/* Enhanced Hero Section */}
      <section className="relative pt-20 pb-16 md:pt-28 md:pb-20 hero-gradient overflow-hidden">
        <div className="hero-gradient-overlay absolute inset-0"></div>
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Logo and Title */}
            <div className="flex items-center justify-center mb-12">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mr-6">
                <img 
                  src="/lovable-uploads/18b2244b-dbb5-4dd6-a1ca-c6a28fed53c6.png" 
                  alt="PTI Logo" 
                  className="w-16 h-16 object-contain"
                />
              </div>
              <div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 animate-fade-in">
                  Expert Insights
                </h1>
                <p className="text-xl md:text-2xl text-blue-100 animate-fade-in animate-delay-100">
                  For Dental Practice Success
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2  transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input 
                  type="text" 
                  placeholder="Search articles, topics, or categories..."
                  className="w-full pl-12 pr-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <Section>
        <div className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <SectionTitle>Featured Article</SectionTitle>
              <SectionSubtitle className="mb-0">
                Our latest insights on dental practice transitions
              </SectionSubtitle>
            </div>
            <Badge variant="outline" className="hidden md:flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              Latest
            </Badge>
          </div>
          
          <Card className="overflow-hidden hover-lift group">
            <Link to={`/blog/${featuredPost.slug}`}>
              <div className="lg:flex">
                <div className={`lg:w-2/5 aspect-video lg:aspect-auto ${featuredPost.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>
                <div className="lg:w-3/5 p-8">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {formatLocalDate(featuredPost.date, { month: 'long', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {featuredPost.readTime}
                    </div>
                  </div>
                  
                  <CardTitle className="text-2xl lg:text-3xl mb-4 group-hover:text-primary transition-colors leading-tight">
                    {featuredPost.title}
                  </CardTitle>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed text-lg">
                    {featuredPost.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between">
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
                    
                    <Button className="group-hover:translate-x-1 transition-transform">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </Link>
          </Card>
        </div>

        {/* Latest Articles Grid */}
        <div className="mb-12">
          <SectionTitle>Latest Articles</SectionTitle>
          <SectionSubtitle>
            Expert insights and practical guidance for dental practice owners
          </SectionSubtitle>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <Card key={post.id} className="overflow-hidden hover-lift group" style={{ animationDelay: `${index * 100}ms` }}>
              <Link to={`/blog/${post.slug}`}>
                <div className={`aspect-video relative ${post.gradient}`}>
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
                
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </CardTitle>
                  <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mt-2">
                    {post.excerpt}
                  </p>
                </CardHeader>
                
                <CardContent className="pt-0">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-xs text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {formatLocalDate(post.date, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </div>
                    <div className="text-xs text-gray-600">
                      By {post.author.split(' ')[0]}
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
          
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 mb-8">
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 bg-white rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 text-lg"
              />
              <Button size="lg" variant="secondary" className="whitespace-nowrap px-8">
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