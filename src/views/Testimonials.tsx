"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowRight, Search, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Cta } from "@/components/ui/cta";
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
import {
  getReviewAggregate,
  reviews,
  type ReviewCategory,
  type ReviewRecord,
  type ReviewSource,
} from "@/data/reviews";

type SourceFilter = "all" | ReviewSource;
type CategoryFilter = "all" | ReviewCategory;

const sourceLabels: Record<ReviewSource, string> = {
  google: "Google",
  amazon: "Amazon",
  internal: "Client",
};

const categoryLabels: Record<ReviewCategory, string> = {
  buyer: "Buyer",
  seller: "Seller",
  workshop: "Workshop",
  valuation: "Valuation",
  book: "Book Review",
};

const sourceFilterOptions: Array<{ value: SourceFilter; label: string }> = [
  { value: "all", label: "All Sources" },
  { value: "google", label: "Google" },
  { value: "amazon", label: "Amazon" },
  { value: "internal", label: "Client" },
];

const categoryFilterOptions: Array<{ value: CategoryFilter; label: string }> = [
  { value: "all", label: "All Categories" },
  { value: "buyer", label: "Buyer" },
  { value: "seller", label: "Seller" },
  { value: "workshop", label: "Workshop" },
  { value: "valuation", label: "Valuation" },
  { value: "book", label: "Book Review" },
];

const buildExcerpt = (value: string, maxLength = 280): string => {
  if (value.length <= maxLength) return value;
  return `${value.slice(0, maxLength).trimEnd()}...`;
};

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

const Testimonials = () => {
  const [sourceFilter, setSourceFilter] = useState<SourceFilter>("all");
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("all");
  const [searchQuery, setSearchQuery] = useState("");

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
  }, [categoryFilter, searchQuery, sourceFilter]);

  const aggregate = useMemo(() => getReviewAggregate(reviews), []);
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
      <section className="pt-24 md:pt-32 pb-10 md:pb-14 bg-gradient-to-b from-accent to-white">
        <div className="container max-w-5xl">
          <Breadcrumb className="mb-6">
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

          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Client Reviews
            </h1>
            <p className="text-lg text-gray-700 leading-relaxed">
              Browse buyer, seller, workshop, valuation, and book feedback in a
              searchable review directory. Every review has a dedicated page for
              full context and machine-readable metadata.
            </p>
            <p className="mt-5 inline-flex items-center gap-2 text-sm text-gray-600">
              <span className="inline-flex items-center gap-1 rounded-full bg-white px-2.5 py-1 border border-gray-200">
                <Star className="h-3.5 w-3.5 text-amber-500 fill-amber-500" />
                {aggregate.ratingValue}/5
              </span>
              <span>{aggregate.reviewCount} total reviews</span>
            </p>
          </div>
        </div>
      </section>

      <Section>
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-white to-blue-50/40 shadow-sm p-4 md:p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-sm font-semibold tracking-wide text-gray-700 uppercase">
                Review Explorer
              </p>
              <div className="flex items-center gap-2 text-xs md:text-sm text-gray-600">
                <span>
                  Showing {filteredReviews.length} of {reviews.length}
                </span>
                {hasActiveFilters && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="h-8 px-2.5 text-xs md:text-sm"
                  >
                    Clear filters
                  </Button>
                )}
              </div>
            </div>

            <div className="grid gap-3 lg:grid-cols-[1.4fr_1fr_1fr]">
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Search
                </label>
                <div className="relative">
                  <Search className="h-4 w-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <Input
                    value={searchQuery}
                    onChange={(event) => setSearchQuery(event.target.value)}
                    placeholder="Reviewer, quote, role, source, or category"
                    className="pl-9 h-11 rounded-lg border-gray-300 bg-white focus-visible:ring-primary/20"
                    aria-label="Search reviews"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Source
                </label>
                <select
                  value={sourceFilter}
                  onChange={(event) =>
                    setSourceFilter(event.target.value as SourceFilter)
                  }
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  aria-label="Filter by source"
                >
                  {sourceFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  Category
                </label>
                <select
                  value={categoryFilter}
                  onChange={(event) =>
                    setCategoryFilter(event.target.value as CategoryFilter)
                  }
                  className="h-11 w-full rounded-lg border border-gray-300 bg-white px-3 text-sm text-gray-800 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
                  aria-label="Filter by category"
                >
                  {categoryFilterOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {filteredReviews.map((review) => (
              <Card
                key={review.id}
                className="border border-gray-200/90 bg-white shadow-sm transition-all hover:shadow-md hover:border-blue-200"
              >
                <CardContent className="p-6">
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    <div className="flex items-center text-amber-500">
                      {Array.from({ length: 5 }).map((_, index) => (
                        <Star
                          key={`${review.id}-${index}`}
                          className={`h-4 w-4 ${
                            index < review.rating ? "fill-current" : ""
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {review.rating}.0
                      </span>
                    </div>
                    <Badge variant="secondary">{sourceLabels[review.source]}</Badge>
                    <Badge variant="outline">{categoryLabels[review.category]}</Badge>
                  </div>

                  <h2 className="text-xl font-semibold text-gray-900 mb-1">
                    <Link
                      href={`/testimonials/${review.slug}`}
                      className="hover:text-primary transition-colors"
                    >
                      {review.displayAuthorName}
                    </Link>
                  </h2>

                  {(review.role || review.company) && (
                    <p className="text-sm text-gray-600 mb-3">
                      {review.role}
                      {review.role && review.company ? " • " : ""}
                      {review.company}
                    </p>
                  )}

                  <p className="text-gray-700 whitespace-pre-line mb-5">
                    {buildExcerpt(review.quote)}
                  </p>

                  <Link
                    href={`/testimonials/${review.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Read full review
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </CardContent>
              </Card>
            ))}

            {filteredReviews.length === 0 && (
              <Card className="border border-dashed border-gray-300">
                <CardContent className="p-8 text-center text-gray-600">
                  No reviews matched your filters. Try a broader search.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Section>

      <Section className="mb-8">
        <Cta
          title="Ready to plan your transition?"
          description="Talk with PTI about your goals and timeline."
          buttonText="Schedule a Consultation"
          buttonUrl="/contact"
        />
      </Section>
    </>
  );
};

export default Testimonials;
