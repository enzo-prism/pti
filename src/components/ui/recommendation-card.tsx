import { ExternalLink } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { BookMeetingButton } from "@/components/BookMeetingButton";
import { BookReviewCard } from "./book-review-card";
import { amazonBookReviews } from "@/data/amazonReviews";
import Image from "next/image";

export type PublishedBook = {
  image: string;
  imageWidth: number;
  imageHeight: number;
  title: string;
  description: string;
  url: string;
  eyebrow?: string;
  compact?: boolean;
};

interface RecommendationCardProps {
  className?: string;
  imageUrl: string;
  name: string;
  title: string;
  subtitle?: string;
  bio?: string[];
  hasNewInfo?: boolean;
  quote?: string;
  videoUrl?: string;
  websiteUrl?: string;
  websiteLabel?: string;
  bookingUrl?: string;
  books?: PublishedBook[];
  bookUrl?: string;
  bookImage?: string;
  bookTitle?: string;
  bookDescription?: string;
  showAmazonReviews?: boolean;
}

export function RecommendationCard({
  className,
  imageUrl,
  name,
  title,
  subtitle,
  bio = [],
  hasNewInfo = false,
  quote,
  videoUrl,
  websiteUrl,
  websiteLabel = "Visit Website",
  bookingUrl,
  books,
  bookUrl,
  bookImage,
  bookTitle,
  bookDescription,
  showAmazonReviews = false,
}: RecommendationCardProps) {
  const publishedBooks: PublishedBook[] =
    books ??
    (bookImage && bookUrl
      ? [
          {
            image: bookImage,
            imageWidth: 560,
            imageHeight: 360,
            title: bookTitle || "Book cover",
            description: bookDescription || "",
            url: bookUrl,
          },
        ]
      : []);

  return (
    <div className={cn("bg-white rounded-lg shadow-sm p-6 md:p-8", className)}>
      <div className="flex flex-col gap-6">
        <Image
          src={imageUrl}
          alt={name}
          width={160}
          height={192}
          className="h-48 w-40 rounded-lg bg-slate-100 object-contain object-top shadow-md mx-auto"
          sizes="160px"
        />
        <div className="flex-1">
          <h3 className="text-2xl md:text-3xl font-semibold mb-1">{name}</h3>
          <p className="text-gray-700 font-medium mb-1">{title}</p>
          {subtitle && (
            <p className="text-primary font-medium mb-4">{subtitle}</p>
          )}

          {bio && bio.length > 0 && (
            <div className="space-y-4 mb-4">
              {bio.map((paragraph, index) => (
                <p
                  key={index}
                  className={cn(
                    "text-gray-600 text-base leading-relaxed",
                    index === 1 &&
                      hasNewInfo &&
                      "bg-accent/20 border-l-4 border-primary p-2 rounded",
                  )}
                >
                  {paragraph}
                </p>
              ))}
            </div>
          )}

          {quote && (
            <blockquote className="text-gray-600 italic text-lg leading-relaxed mb-4">
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          {(bookingUrl || videoUrl || websiteUrl) && (
            <div className="flex flex-col gap-3 mb-4 sm:flex-row">
              {bookingUrl && (
                <BookMeetingButton
                  href={bookingUrl}
                  location="about_leader_card"
                  label="Schedule a 30-Min Meeting"
                  size="default"
                  className="w-full sm:w-auto"
                />
              )}
              {videoUrl && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a
                    href={videoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-play"
                    >
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    Watch the Interview
                  </a>
                </Button>
              )}
              {websiteUrl && (
                <Button asChild variant="outline" className="w-full sm:w-auto">
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    {websiteLabel}
                  </a>
                </Button>
              )}
            </div>
          )}

          {publishedBooks.length > 0 && (
            <div className="mt-6 space-y-4">
              {publishedBooks.map((book) => (
                <PublishedBookCard key={book.url} book={book} />
              ))}

              {showAmazonReviews && amazonBookReviews.length > 0 && (
                <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
                  <h5 className="mb-4 text-md font-semibold text-gray-900">
                    What Amazon Readers Say
                  </h5>
                  <div className="grid gap-4">
                    {amazonBookReviews.slice(0, 2).map((review) => (
                      <BookReviewCard
                        key={review.id}
                        review={review}
                        className="bg-white"
                      />
                    ))}
                  </div>
                  <div className="mt-4 text-center">
                    <a
                      href={
                        publishedBooks[publishedBooks.length - 1]?.url ??
                        bookUrl
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm font-medium text-primary hover:text-primary/80"
                    >
                      Read all reviews on Amazon →
                    </a>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function PublishedBookCard({ book }: { book: PublishedBook }) {
  const amazonLink = book.url.startsWith("http");
  const eyebrow = book.eyebrow ?? "Published Resource";

  return (
    <div className="rounded-2xl border border-gray-200 bg-gray-50 p-4 sm:p-5">
      <div
        className={cn(
          "grid items-center",
          book.compact
            ? "gap-4 sm:grid-cols-[7.5rem_minmax(0,1fr)]"
            : "gap-5 md:grid-cols-[minmax(0,0.38fr)_minmax(0,0.62fr)]",
        )}
      >
        <div
          className={cn(
            "mx-auto w-full",
            book.compact
              ? "max-w-[11rem] sm:max-w-none"
              : "max-w-[220px] md:max-w-none",
          )}
        >
          <Image
            src={book.image}
            alt={book.title}
            width={book.imageWidth}
            height={book.imageHeight}
            className={cn(
              "h-auto w-full border border-gray-200 bg-white object-contain shadow-sm",
              book.compact ? "rounded-lg p-1" : "rounded-xl",
            )}
            sizes={book.compact ? "120px" : "(min-width: 768px) 200px, 220px"}
          />
        </div>
        <div
          className={cn(
            "text-center",
            book.compact ? "sm:text-left" : "md:text-left",
          )}
        >
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.22em] text-primary/80">
            {eyebrow}
          </p>
          <h4
            className={cn(
              "mb-2 font-semibold text-gray-900",
              book.compact ? "text-lg" : "text-xl",
            )}
          >
            {book.title}
          </h4>
          <p
            className={cn(
              "text-sm leading-relaxed text-gray-600",
              book.compact ? "mb-3" : "mb-4",
            )}
          >
            {book.description}
          </p>
          <Button
            asChild
            variant={book.compact ? "outline" : "default"}
            size="sm"
            className="w-full sm:w-auto"
          >
            <a
              href={book.url}
              target={amazonLink ? "_blank" : undefined}
              rel={amazonLink ? "noopener noreferrer" : undefined}
            >
              View on Amazon
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
}
