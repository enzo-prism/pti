"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Star, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "@/components/ui/section";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import type {
  ReviewCategory,
  ReviewRecord,
  ReviewSource,
} from "@/data/reviews";
import { trackSelectCta } from "@/lib/analytics";
import { cn } from "@/lib/utils";

type SourceFilter = "all" | ReviewSource;
type CategoryFilter = "all" | ReviewCategory;

const GOOGLE_REVIEW_URL = "https://g.page/r/CedyctFdKTRNEAE/review";

const sourceLabels: Record<ReviewSource, string> = {
  google: "Google",
  amazon: "Amazon",
  alignable: "Alignable",
  internal: "Provided directly",
};

const categoryLabels: Record<ReviewCategory, string> = {
  buyer: "Buyer",
  seller: "Seller",
  workshop: "Workshop",
  valuation: "Valuation",
  consulting: "Consulting",
  book: "Book Review",
};

const CATEGORY_ORDER: ReviewCategory[] = [
  "buyer",
  "seller",
  "workshop",
  "valuation",
  "consulting",
  "book",
];
const SOURCE_ORDER: ReviewSource[] = ["google", "alignable", "amazon", "internal"];

const matchesSearch = (review: ReviewRecord, query: string): boolean => {
  if (!query) return true;

  const haystack = [
    review.quote,
    review.sourceAuthorName,
    review.displayAuthorName,
    review.role,
    review.company,
    sourceLabels[review.source],
    categoryLabels[review.category],
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
};

const getInitials = (name: string): string =>
  name
    .replace(/[^A-Za-z\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() ?? "")
    .join("") || "PTI";

const GoogleMapsPinIcon = ({ className }: { className?: string }) => (
  // Google Maps pin mark. The original asset shipped with a stray <script/>
  // element, which is intentionally omitted here.
  <svg
    viewBox="0 0 92.3 132.3"
    className={className}
    role="img"
    aria-label="Google Maps"
  >
    <path
      fill="#1a73e8"
      d="M60.2 2.2C55.8.8 51 0 46.1 0 32 0 19.3 6.4 10.8 16.5l21.8 18.3L60.2 2.2z"
    />
    <path
      fill="#ea4335"
      d="M10.8 16.5C4.1 24.5 0 34.9 0 46.1c0 8.7 1.7 15.7 4.6 22l28-33.3-21.8-18.3z"
    />
    <path
      fill="#4285f4"
      d="M46.2 28.5c9.8 0 17.7 7.9 17.7 17.7 0 4.3-1.6 8.3-4.2 11.4 0 0 13.9-16.6 27.5-32.7-5.6-10.8-15.3-19-27-22.7L32.6 34.8c3.3-3.8 8.1-6.3 13.6-6.3"
    />
    <path
      fill="#fbbc04"
      d="M46.2 63.8c-9.8 0-17.7-7.9-17.7-17.7 0-4.3 1.5-8.3 4.1-11.3l-28 33.3c4.8 10.6 12.8 19.2 21 29.9l34.1-40.5c-3.3 3.9-8.1 6.3-13.5 6.3"
    />
    <path
      fill="#34a853"
      d="M59.1 109.2c15.4-24.1 33.3-35 33.3-63 0-7.7-1.9-14.9-5.2-21.3L25.6 98c2.6 3.4 5.3 7.3 7.9 11.3 9.4 14.5 6.8 23.1 12.8 23.1s3.4-8.7 12.8-23.2"
    />
  </svg>
);

const GoogleReviewButton = ({
  location,
  className,
}: {
  location: string;
  className?: string;
}) => (
  <a
    href={GOOGLE_REVIEW_URL}
    target="_blank"
    rel="noopener noreferrer"
    onClick={() => trackSelectCta("leave_google_review", location)}
    className={cn(
      "inline-flex items-center justify-center gap-2.5 rounded-full border border-gray-300 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 shadow-sm transition hover:border-gray-400 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2",
      className
    )}
  >
    <GoogleMapsPinIcon className="h-[18px] w-auto shrink-0" />
    Leave a Google review
  </a>
);

const Stars = ({
  rating,
  size = "h-4 w-4",
}: {
  rating: number;
  size?: string;
}) => (
  <div
    className="flex items-center"
    role="img"
    aria-label={`${rating} out of 5 stars`}
  >
    {Array.from({ length: 5 }).map((_, index) => (
      <Star
        key={index}
        aria-hidden="true"
        className={cn(
          size,
          index < rating
            ? "fill-amber-400 text-amber-400"
            : "fill-gray-200 text-gray-200"
        )}
      />
    ))}
  </div>
);

interface TestimonialsProps {
  reviews: ReviewRecord[];
}

const Testimonials = ({ reviews }: TestimonialsProps) => {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const { categoryCounts, sourceCounts } = useMemo(() => {
    const categoryCounts = {} as Record<ReviewCategory, number>;
    const sourceCounts = {} as Record<ReviewSource, number>;
    for (const review of reviews) {
      categoryCounts[review.category] =
        (categoryCounts[review.category] ?? 0) + 1;
      sourceCounts[review.source] = (sourceCounts[review.source] ?? 0) + 1;
    }
    return { categoryCounts, sourceCounts };
  }, [reviews]);

  const availableCategories = CATEGORY_ORDER.filter(
    (category) => (categoryCounts[category] ?? 0) > 0
  );
  const availableSources = SOURCE_ORDER.filter(
    (source) => (sourceCounts[source] ?? 0) > 0
  );

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      if (sourceFilter !== "all" && review.source !== sourceFilter) {
        return false;
      }
      if (categoryFilter !== "all" && review.category !== categoryFilter) {
        return false;
      }
      return matchesSearch(review, searchQuery);
    });
  }, [reviews, categoryFilter, searchQuery, sourceFilter]);

  const hasActiveFilters =
    searchQuery.trim().length > 0 ||
    sourceFilter !== "all" ||
    categoryFilter !== "all";

  const clearFilters = () => {
    setSearchQuery("");
    setSourceFilter("all");
    setCategoryFilter("all");
  };

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-accent to-white pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container max-w-5xl">
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Testimonials</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mx-auto max-w-3xl text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-primary/80 sm:text-sm">
              Client Reviews
            </p>
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              Dentists trust PTI with their life&apos;s work
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg">
              Real feedback from buyers, sellers, and workshop attendees who
              navigated a major transition with our team.
            </p>

              <div className="mx-auto mt-7 max-w-2xl rounded-2xl border border-blue-100 bg-white/80 p-5 text-left shadow-sm">
                <p className="text-sm leading-relaxed text-gray-700">
                  This library includes public Google, Alignable, and Amazon book
                  reviews plus feedback provided directly to PTI. Source and
                  context are labeled on each entry. We do not combine these
                  different review types into one satisfaction score.
                </p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
                  {SOURCE_ORDER.map((source) => (
                    <div key={source} className="rounded-lg bg-gray-50 px-2 py-3">
                      <dt className="text-xs text-gray-500">{sourceLabels[source]}</dt>
                      <dd className="mt-1 text-lg font-bold text-gray-900">
                        {sourceCounts[source] ?? 0}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

            <div className="mt-7 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <GoogleReviewButton
                location="testimonials_hero"
                className="w-full sm:w-auto"
              />
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto"
              >
                <Link href="/contact">Talk With Our Team</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <Section className="pt-4 md:pt-6">
        <div className="mx-auto max-w-6xl space-y-8">
          {/* Filter bar */}
          <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm md:p-6">
            <div className="relative">
              <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search by name, role, keyword, or source"
                className="h-12 rounded-xl border-gray-300 bg-white pl-10 focus-visible:ring-primary/20"
                aria-label="Search reviews"
              />
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <FilterPill
                active={categoryFilter === "all"}
                onClick={() => setCategoryFilter("all")}
                label="All"
                count={reviews.length}
              />
              {availableCategories.map((category) => (
                <FilterPill
                  key={category}
                  active={categoryFilter === category}
                  onClick={() => setCategoryFilter(category)}
                  label={categoryLabels[category]}
                  count={categoryCounts[category]}
                />
              ))}
            </div>

            {availableSources.length > 1 && (
              <div className="mt-3 flex flex-wrap items-center gap-2">
                <span className="mr-1 text-xs font-medium uppercase tracking-wide text-gray-400">
                  Source
                </span>
                <FilterPill
                  active={sourceFilter === "all"}
                  onClick={() => setSourceFilter("all")}
                  label="All"
                  size="sm"
                />
                {availableSources.map((source) => (
                  <FilterPill
                    key={source}
                    active={sourceFilter === source}
                    onClick={() => setSourceFilter(source)}
                    label={sourceLabels[source]}
                    count={sourceCounts[source]}
                    size="sm"
                  />
                ))}
              </div>
            )}

            <div className="mt-4 flex items-center justify-between gap-3 border-t border-gray-100 pt-4">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">
                  {filteredReviews.length}
                </span>{" "}
                of {reviews.length}
              </p>
              {hasActiveFilters && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="h-8 gap-1.5 px-2.5 text-sm text-gray-600 hover:text-primary"
                >
                  <X className="h-3.5 w-3.5" />
                  Clear
                </Button>
              )}
            </div>
          </div>

          {/* Masonry wall */}
          {filteredReviews.length > 0 ? (
            <div className="gap-5 [column-fill:_balance] sm:columns-2 sm:gap-6 xl:columns-3">
              {filteredReviews.map((review) => (
                <article
                  key={review.id}
                  className="mb-5 break-inside-avoid rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md sm:mb-6"
                >
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <Stars rating={review.rating} />
                    <Badge
                      variant="secondary"
                      className="rounded-full font-medium"
                    >
                      {categoryLabels[review.category]}
                    </Badge>
                  </div>

                  <blockquote className="text-[0.95rem] leading-relaxed text-gray-700">
                    <span
                      aria-hidden="true"
                      className="mr-0.5 font-serif text-xl leading-none text-primary/30"
                    >
                      &ldquo;
                    </span>
                    <span className="line-clamp-[10]">{review.quote}</span>
                  </blockquote>

                  <Link
                    href={`/testimonials/${review.slug}`}
                    className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Read full review
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>

                  <footer className="mt-5 flex items-center gap-3 border-t border-gray-100 pt-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                      {getInitials(review.displayAuthorName)}
                    </span>
                    <div className="min-w-0">
                      <Link
                        href={`/testimonials/${review.slug}`}
                        className="block truncate font-semibold text-gray-900 transition-colors hover:text-primary"
                      >
                        {review.storyTitle ?? review.displayAuthorName}
                      </Link>
                      {(review.role || review.company) && (
                        <p className="truncate text-sm text-gray-500">
                          {review.role}
                          {review.role && review.company ? " • " : ""}
                          {review.company}
                        </p>
                      )}
                    </div>
                    <span className="ml-auto shrink-0 self-start text-xs font-medium text-gray-400">
                      {sourceLabels[review.source]}
                    </span>
                  </footer>
                </article>
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center">
              <p className="text-gray-600">
                No reviews matched your filters.
              </p>
              <Button
                type="button"
                variant="outline"
                onClick={clearFilters}
                className="mt-4"
              >
                Clear filters
              </Button>
            </div>
          )}

          {/* Leave-a-review prompt */}
          <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-gradient-to-br from-blue-50/60 to-white p-6 text-center shadow-sm sm:p-8">
            <h2 className="text-xl font-bold text-gray-900 sm:text-2xl">
              Worked with PTI?
            </h2>
            <p className="max-w-xl text-sm text-gray-600 sm:text-base">
              Your experience helps other dentists make confident decisions about
              their own transition. It takes about a minute.
            </p>
            <GoogleReviewButton location="testimonials_footer" />
          </div>
        </div>
      </Section>

      {/* Bottom CTA */}
      <Section background="primary" className="py-10 md:py-14">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to plan your transition?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-white/90">
            Talk with PTI about your goals and timeline. No pressure, just clear
            guidance.
          </p>
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="mt-6 !bg-white text-primary hover:!bg-white"
          >
            <Link href="/contact">Schedule a Consultation</Link>
          </Button>
        </div>
      </Section>
    </>
  );
};

const FilterPill = ({
  active,
  onClick,
  label,
  count,
  size = "md",
}: {
  active: boolean;
  onClick: () => void;
  label: string;
  count?: number;
  size?: "sm" | "md";
}) => (
  <button
    type="button"
    onClick={onClick}
    aria-pressed={active}
    className={cn(
      "inline-flex items-center rounded-full border font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-1",
      size === "sm" ? "px-3 py-1 text-xs" : "px-3.5 py-1.5 text-sm",
      active
        ? "border-primary bg-primary text-white shadow-sm"
        : "border-gray-300 bg-white text-gray-700 hover:border-primary/40 hover:text-primary"
    )}
  >
    {label}
    {typeof count === "number" && (
      <span
        className={cn(
          "ml-1.5 tabular-nums",
          active ? "text-white/70" : "text-gray-400"
        )}
      >
        {count}
      </span>
    )}
  </button>
);

export default Testimonials;
