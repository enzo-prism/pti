import { BlogPost } from "@/data/blogPosts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface SeriesNavigationProps {
  currentPost: BlogPost;
  seriesPosts: BlogPost[];
}

export function SeriesNavigation({ currentPost, seriesPosts }: SeriesNavigationProps) {
  if (!currentPost.series) return null;

  const currentIndex = seriesPosts.findIndex(post => post.id === currentPost.id);
  const previousPost = currentIndex > 0 ? seriesPosts[currentIndex - 1] : null;
  const nextPost = currentIndex < seriesPosts.length - 1 ? seriesPosts[currentIndex + 1] : null;

  const getPartFocus = (part: number, seriesId?: string): string => {
    if (seriesId === "creating-culture-series") {
      switch (part) {
        case 1: return "Leadership";
        case 2: return "Gratitude";
        case 3: return "Team";
        case 4: return "Attitude & Mindset";
        default: return "";
      }
    } else if (seriesId === "debugging-myths") {
      switch (part) {
        case 1:
          return "Timeline & Planning Myths";
        case 2:
          return "Advisory Team & Process";
        case 3:
          return "Valuation Myths";
        case 4:
          return "Transition Planning Requirements";
        default:
          return "";
      }
    }
    return "";
  };

  return (
    <div className="space-y-4 sm:space-y-6 mb-6 sm:mb-8">
      {/* Series Header */}
      <Card className="p-4 sm:p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
          <div className="w-full sm:w-auto">
            <Badge variant="secondary" className="mb-2 text-xs sm:text-sm">
              Part {currentPost.series.part} of {currentPost.series.total}
            </Badge>
            <h3 className="text-base sm:text-lg font-semibold text-foreground leading-tight">
              {currentPost.series.title}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1 leading-relaxed">
              Focus: {getPartFocus(currentPost.series.part, currentPost.series.id)}
            </p>
          </div>
        </div>
      </Card>

      {/* Series Overview */}
      <Card className="p-4 sm:p-6">
        <h4 className="font-semibold mb-3 sm:mb-4 text-sm sm:text-base">Complete Series</h4>
        <div className="grid gap-2 sm:gap-3">
          {seriesPosts.map((post) => (
            <div
              key={post.id}
              className={`flex items-center justify-between p-3 sm:p-4 rounded-lg transition-colors min-h-[60px] ${
                post.id === currentPost.id
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <Badge 
                  variant={post.id === currentPost.id ? "default" : "outline"}
                  className="text-xs shrink-0"
                >
                  Part {post.series?.part}
                </Badge>
                <div className="min-w-0 flex-1">
                  <p className={`text-xs sm:text-sm font-medium leading-tight ${
                    post.id === currentPost.id ? "text-primary" : "text-foreground"
                  }`}>
                    {getPartFocus(post.series?.part || 0, post.series?.id)}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {post.readTime}
                  </p>
                </div>
              </div>
              {post.id !== currentPost.id && (
                <Button asChild variant="ghost" size="sm" className="ml-2 shrink-0 min-h-[44px] min-w-[44px]">
                  <Link to={`/blog/${post.slug}`}>
                    <span className="hidden sm:inline">Read</span>
                    <span className="sm:hidden">→</span>
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      {(previousPost || nextPost) && (
        <div className="flex flex-col sm:flex-row justify-between gap-3 sm:gap-4">
          {previousPost ? (
            <Button asChild variant="outline" className="flex-1 min-h-[64px] p-3">
              <Link to={`/blog/${previousPost.slug}`} className="flex items-center gap-2 sm:gap-3 text-left">
                <ChevronLeft className="h-4 w-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-xs sm:text-sm font-medium leading-tight">
                    Part {previousPost.series?.part}: {getPartFocus(previousPost.series?.part || 0, previousPost.series?.id)}
                  </p>
                </div>
              </Link>
            </Button>
          ) : (
            <div className="flex-1 hidden sm:block" />
          )}
          
          {nextPost ? (
            <Button asChild variant="outline" className="flex-1 min-h-[64px] p-3">
              <Link to={`/blog/${nextPost.slug}`} className="flex items-center gap-2 sm:gap-3 justify-end text-right">
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="text-xs sm:text-sm font-medium leading-tight">
                    Part {nextPost.series?.part}: {getPartFocus(nextPost.series?.part || 0, nextPost.series?.id)}
                  </p>
                </div>
                <ChevronRight className="h-4 w-4 shrink-0" />
              </Link>
            </Button>
          ) : (
            <div className="flex-1 hidden sm:block" />
          )}
        </div>
      )}
    </div>
  );
}