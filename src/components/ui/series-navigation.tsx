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
    } else if (seriesId === "debugging-myths-transitions") {
      switch (part) {
        case 1: return "Timeline & Planning Myths";
        case 2: return "Advisory Team & Process";
        default: return "";
      }
    }
    return "";
  };

  return (
    <div className="space-y-6 mb-8">
      {/* Series Header */}
      <Card className="p-6 bg-gradient-to-r from-primary/5 to-primary/10 border-primary/20">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <Badge variant="secondary" className="mb-2">
              Part {currentPost.series.part} of {currentPost.series.total}
            </Badge>
            <h3 className="text-lg font-semibold text-foreground">
              {currentPost.series.title}
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Focus: {getPartFocus(currentPost.series.part, currentPost.series.id)}
            </p>
          </div>
        </div>
      </Card>

      {/* Series Overview */}
      <Card className="p-6">
        <h4 className="font-semibold mb-4">Complete Series</h4>
        <div className="grid gap-3">
          {seriesPosts.map((post) => (
            <div
              key={post.id}
              className={`flex items-center justify-between p-3 rounded-lg transition-colors ${
                post.id === currentPost.id
                  ? "bg-primary/10 border border-primary/20"
                  : "bg-muted/30 hover:bg-muted/50"
              }`}
            >
              <div className="flex items-center gap-3">
                <Badge 
                  variant={post.id === currentPost.id ? "default" : "outline"}
                  className="text-xs"
                >
                  Part {post.series?.part}
                </Badge>
                <div>
                  <p className={`text-sm font-medium ${
                    post.id === currentPost.id ? "text-primary" : "text-foreground"
                  }`}>
                    {getPartFocus(post.series?.part || 0, post.series?.id)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {post.readTime}
                  </p>
                </div>
              </div>
              {post.id !== currentPost.id && (
                <Button asChild variant="ghost" size="sm">
                  <Link to={`/blog/${post.slug}`}>
                    Read
                  </Link>
                </Button>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* Navigation */}
      {(previousPost || nextPost) && (
        <div className="flex justify-between gap-4">
          {previousPost ? (
            <Button asChild variant="outline" className="flex-1">
              <Link to={`/blog/${previousPost.slug}`} className="flex items-center gap-2">
                <ChevronLeft className="h-4 w-4" />
                <div className="text-left">
                  <p className="text-xs text-muted-foreground">Previous</p>
                  <p className="text-sm font-medium">Part {previousPost.series?.part}: {getPartFocus(previousPost.series?.part || 0, previousPost.series?.id)}</p>
                </div>
              </Link>
            </Button>
          ) : (
            <div className="flex-1" />
          )}
          
          {nextPost ? (
            <Button asChild variant="outline" className="flex-1">
              <Link to={`/blog/${nextPost.slug}`} className="flex items-center gap-2 justify-end">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Next</p>
                  <p className="text-sm font-medium">Part {nextPost.series?.part}: {getPartFocus(nextPost.series?.part || 0, nextPost.series?.id)}</p>
                </div>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          ) : (
            <div className="flex-1" />
          )}
        </div>
      )}
    </div>
  );
}