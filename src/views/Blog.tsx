"use client";

import { startTransition, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { Section, SectionTitle, SectionSubtitle } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowRight, ClipboardCheck, Search, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { BlogPostSummary } from "@/data/blogPosts";
import { PRACTICE_SALE_CHECKLIST_PATH } from "@/lib/constants";
import { formatLocalDate } from "@/lib/dateUtils";
import {
  getFeaturedImageShape,
  getFeaturedListingFrameClass,
  getFeaturedListingImageClass,
  getIntrinsicFeaturedSize,
  INTRINSIC_FEATURED_IMAGE_CLASS,
  shouldContainFeaturedImage,
} from "@/lib/featuredImage";
import { cn } from "@/lib/utils";

interface BlogProps {
  posts: BlogPostSummary[];
}

const readFiltersFromLocation = () => {
  if (typeof window === "undefined") return { search: "", topic: "All" };
  const params = new URLSearchParams(window.location.search);
  return {
    search: params.get("search") ?? "",
    topic: params.get("topic") ?? "All",
  };
};

const Blog = ({ posts }: BlogProps) => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTopic, setSelectedTopic] = useState("All");

  // The route is statically generated, so ?search= deep links are applied
  // after hydration (and on history navigation) instead of via searchParams.
  useEffect(() => {
    const syncFromLocation = () => {
      const filters = readFiltersFromLocation();
      setSearchQuery(filters.search);
      setSelectedTopic(filters.topic);
    };
    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    return () => window.removeEventListener("popstate", syncFromLocation);
  }, []);

  const updateFilters = ({ search, topic }: { search: string; topic: string }) => {
    setSearchQuery(search);
    setSelectedTopic(topic);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    if (topic !== "All") params.set("topic", topic);
    const query = params.toString();
    startTransition(() => {
      router.replace(query ? `/blog?${query}` : "/blog", { scroll: false });
    });
  };

  const updateSearchQuery = (value: string) =>
    updateFilters({ search: value, topic: selectedTopic });

  const updateTopic = (topic: string) =>
    updateFilters({ search: searchQuery, topic });

  // Sort posts by date (most recent first)
  const sortedPosts = useMemo(
    () =>
      [...posts].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ),
    [posts]
  );

  const topicLinks = useMemo(
    () => ["All", ...Array.from(new Set(posts.map((post) => post.category))).sort()],
    [posts]
  );

  // Filter posts based on search query
  const filteredPosts = sortedPosts.filter(post => {
    if (selectedTopic !== "All" && post.category !== selectedTopic) return false;
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

  const topicLabel = (category: string) =>
    category === "Community Impact" ? "News & Community" : category;

  return (
    <>
      {/* Enhanced Hero Section */}
      <section className="relative pt-10 pb-12 md:pt-16 md:pb-20 hero-gradient overflow-hidden">
        <div className="hero-gradient-overlay absolute inset-0"></div>
        <div className="container relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Logo and Title - Mobile Optimized */}
            <div className="flex flex-col md:flex-row items-center justify-center mb-8 md:mb-12 text-center md:text-left">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4 mb-4 md:mb-0 md:mr-6">
                <Image
                  src="/lovable-uploads/pti-logo.webp"
                  alt="Practice Transitions Institute logo"
                  width={480}
                  height={466}
                  className="w-12 h-12 md:w-16 md:h-16 object-contain"
                  sizes="(min-width: 768px) 64px, 48px"
                  priority
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
                  aria-label="Search PTI articles"
                  placeholder="Search articles, topics, or categories..."
                  value={searchQuery}
                  onChange={(e) => updateSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-12 py-3 md:py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-white/30 focus:border-transparent text-base md:text-lg"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={handleClearSearch}
                    aria-label="Clear article search"
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors p-1"
                  >
                    <X className="h-5 w-5" />
                  </button>
                )}
              </div>
              {searchQuery && (
                <p className="text-center text-blue-200 mt-4" aria-live="polite">
                  {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                </p>
              )}
              <div
                className="mt-6 flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm"
                aria-label="Filter articles by topic"
              >
                {topicLinks.map((category) => {
                  const isActive = selectedTopic === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => updateTopic(category)}
                      aria-pressed={isActive}
                      className={cn(
                        "rounded-full border border-white/30 px-3 py-1.5 text-blue-100 transition hover:border-white/60 hover:text-white",
                        isActive && "bg-white/15 text-white"
                      )}
                    >
                      {category === "All" ? "All articles" : topicLabel(category)}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Article */}
      <Section>
        {filteredPosts.length === 0 ? (
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
                  <SectionTitle>{searchQuery || selectedTopic !== "All" ? 'Top Result' : 'Latest Update'}</SectionTitle>
                  <SectionSubtitle className="mb-0">
                    {searchQuery || selectedTopic !== "All" ? 'The newest article matching your filters' : 'The newest insight or community update from PTI'}
                  </SectionSubtitle>
                </div>
                {!searchQuery && selectedTopic === "All" && (
                  <Badge variant="outline" className="hidden md:flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Latest published
                  </Badge>
                )}
              </div>
          
          <Card className="overflow-hidden hover-lift group">
            <Link href={`/blog/${featuredPost.slug}`}>
              <div className="md:flex lg:flex">
                {(() => {
                  const shape = getFeaturedImageShape(featuredPost);
                  const isIntrinsic = shape !== "landscape";
                  const isContained = shouldContainFeaturedImage(featuredPost);
                  const intrinsicSize = getIntrinsicFeaturedSize(featuredPost);
                  return (
                <div
                  className={cn(
                    "relative md:w-2/5 lg:w-2/5",
                    isIntrinsic
                      ? "flex min-h-[16rem] items-center justify-center bg-slate-100 p-4 md:min-h-[22rem]"
                      : cn(
                          "aspect-video md:aspect-auto md:min-h-[16rem]",
                          isContained && "bg-slate-100"
                        )
                  )}
                >
                  {featuredPost.featuredImage ? (
                    isIntrinsic ? (
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.featuredImageAlt ?? featuredPost.title}
                        width={intrinsicSize.width}
                        height={intrinsicSize.height}
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className={INTRINSIC_FEATURED_IMAGE_CLASS}
                        priority
                      />
                    ) : (
                      <Image
                        src={featuredPost.featuredImage}
                        alt={featuredPost.featuredImageAlt ?? featuredPost.title}
                        fill
                        sizes="(min-width: 1024px) 40vw, 100vw"
                        className={isContained ? "object-contain" : "object-cover"}
                        priority
                      />
                    )
                  ) : (
                    <div className={`w-full h-full ${featuredPost.gradient}`} />
                  )}
                  {!isContained ? (
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors duration-300"></div>
                  ) : null}
                  <div className="absolute bottom-4 left-4">
                    <Badge className="bg-white/90 text-primary hover:bg-white">
                      {featuredPost.category}
                    </Badge>
                  </div>
                </div>
                  );
                })()}
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
                      <Image
                        src="/lovable-uploads/0fbfd01f-6249-49ce-baea-1b42e6bd44f4.png"
                        alt="Michael Njo, DDS"
                        width={40}
                        height={40}
                        className="w-10 h-10 rounded-full object-cover mr-3"
                        sizes="40px"
                      />
                      <div>
                        <p className="font-medium text-gray-900">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">Practice Transitions Expert</p>
                      </div>
                    </div>
                    
                    <span className="inline-flex min-h-10 w-full items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform group-hover:translate-x-1 sm:w-auto">
                      Read Article
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </span>
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
                  <SectionTitle>{searchQuery || selectedTopic !== "All" ? 'More Results' : 'Latest Articles'}</SectionTitle>
                  <SectionSubtitle>
                    {searchQuery || selectedTopic !== "All" ? 'Additional articles matching your filters' : 'Expert insights, practical guidance, and PTI community news'}
                  </SectionSubtitle>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {regularPosts.map((post, index) => {
                    const listingIsContained = shouldContainFeaturedImage(post);
                    return (
            <Card key={post.id} className="overflow-hidden hover-lift group" style={{ animationDelay: `${index * 100}ms` }}>
              <Link href={`/blog/${post.slug}`}>
                <div
                  className={cn(
                    "relative overflow-hidden",
                    getFeaturedListingFrameClass(post)
                  )}
                >
                  {post.featuredImage ? (
                    <Image
                      src={post.featuredImage}
                      alt={post.featuredImageAlt ?? post.title}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                      className={getFeaturedListingImageClass(post)}
                    />
                  ) : (
                    <div className={`w-full h-full ${post.gradient}`} />
                  )}
                  {!listingIsContained ? (
                    <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300"></div>
                  ) : null}
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/90 text-primary">
                      {post.category}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 right-4">
                    <div
                      className={cn(
                        "flex items-center rounded-full px-3 py-1 text-sm",
                        listingIsContained
                          ? "bg-white/95 text-slate-700 shadow-sm"
                          : "bg-black/50 text-white backdrop-blur-sm"
                      )}
                    >
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
                  
                  <span className="mt-4 inline-flex h-auto items-center p-0 text-sm font-medium text-primary transition-all duration-200 group-hover:translate-x-1">
                    Read More 
                    <ArrowRight className="ml-1 h-3 w-3" />
                  </span>
                </CardContent>
              </Link>
            </Card>
                    );
                  })}
                </div>
              </>
            )}
          </>
        )}
      </Section>

      {/* Lead magnet CTA */}
      <Section background="primary">
        <div className="max-w-3xl mx-auto text-center">
          <ClipboardCheck className="mx-auto mb-6 h-12 w-12 text-white/80" aria-hidden="true" />
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Thinking about selling in the next few years?
          </h3>
          <p className="text-blue-100 text-lg leading-relaxed mb-8">
            Start with our free Practice Sale Readiness Checklist — the
            documents, numbers, and decisions to line up before you ever talk
            to a buyer.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="!bg-white text-primary hover:!bg-white/90"
          >
            <Link href={PRACTICE_SALE_CHECKLIST_PATH}>
              Get the Free Checklist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

export default Blog;
