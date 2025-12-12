import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getUpdateBySlug } from "@/data/updates";
import { getBlogPostBySlug } from "@/data/blogPosts";
import NotFound from "./NotFound";
import SEO from "@/components/layout/SEO";
import { HOME_CRUMB } from "@/lib/breadcrumbs";

export default function UpdateDetail() {
  const { slug } = useParams<{ slug: string }>();
  
  if (!slug) {
    return <NotFound />;
  }

  const update = getUpdateBySlug(slug);

  if (!update) {
    return <NotFound />;
  }

  const matchingBlogPost = getBlogPostBySlug(update.slug);
  const canonicalPath = matchingBlogPost
    ? `/blog/${matchingBlogPost.slug}`
    : `/updates/${update.slug}`;

  // Convert markdown-style content to JSX
  const formatContent = (content: string) => {
    return content
      .split('\n\n')
      .map((paragraph, index) => {
        if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
          // Handle bold text (like dates)
          return (
            <p key={index} className="text-lg font-semibold text-primary mb-6">
              {paragraph.replace(/\*\*/g, '')}
            </p>
          );
        } else if (paragraph.startsWith('## ')) {
          // Handle h2 headings
          return (
            <h2 key={index} className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 mt-8">
              {paragraph.replace('## ', '')}
            </h2>
          );
        } else if (paragraph.startsWith('*"') && paragraph.endsWith('"*')) {
          // Handle quotes
          return (
            <blockquote key={index} className="border-l-4 border-primary pl-6 py-4 my-6 bg-gray-50 rounded-r-lg">
              <p className="text-gray-700 italic text-lg leading-relaxed">
                {paragraph.replace(/(^\*")|("\*$)/g, '')}
              </p>
            </blockquote>
          );
        } else if (paragraph.trim()) {
          // Handle regular paragraphs
          return (
            <p key={index} className="text-gray-700 leading-relaxed mb-6 text-lg">
              {paragraph}
            </p>
          );
        }
        return null;
      })
      .filter(Boolean);
  };

  return (
    <>
      <SEO
        title={`${update.title} - PTI Updates`}
        description={update.excerpt}
        image={update.featuredImage}
        path={`/updates/${update.slug}`}
        canonicalPath={canonicalPath}
        breadcrumbs={[
          HOME_CRUMB,
          { name: update.title, path: `/updates/${update.slug}` },
        ]}
      />
      
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back Button */}
          <div className="mb-8">
            <Button asChild variant="ghost" className="text-primary hover:text-primary">
              <Link to="/" className="flex items-center">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Home
              </Link>
            </Button>
          </div>

          {/* Article Header */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden mb-8">
            <img
              src={update.featuredImage}
              alt={update.title}
              className="w-full h-64 md:h-96 object-cover"
            />
            
            <div className="p-8 md:p-12">
              <div className="flex flex-wrap items-center gap-4 text-gray-500 text-sm mb-6">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{update.date}</span>
                </div>
                {update.author && (
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{update.author}</span>
                  </div>
                )}
              </div>

              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 leading-tight mb-8">
                {update.title}
              </h1>
            </div>
          </div>

          {/* Article Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {formatContent(update.content)}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-12 bg-primary rounded-xl p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Want to Learn More About Dr. Njo and PTI?
            </h3>
            <p className="text-white opacity-90 mb-6 text-lg">
              Discover how we can help you with your dental practice transition.
            </p>
            <Button asChild variant="secondary" size="lg">
              <Link to="/contact">Get in Touch</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
