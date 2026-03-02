import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { StructuredData } from "@/components/StructuredData";
import { Badge } from "@/components/ui/badge";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Section } from "@/components/ui/section";
import {
  getAdjacentReviewsBySlug,
  getAllReviewSlugs,
  getReviewBySlug,
  type ReviewCategory,
  type ReviewSource,
} from "@/data/reviews";
import { buildPageJsonLd, buildPageMetadata } from "@/lib/seo";
import { HOME_CRUMB } from "@/lib/breadcrumbs";
import { buildReviewSchema } from "@/lib/structuredData";

type Params = {
  slug: string;
};

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

const toDescription = (value: string): string => {
  const normalized = value.replace(/\s+/g, " ").trim();
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157)}...`;
};

export const dynamicParams = false;

export const generateStaticParams = (): Params[] =>
  getAllReviewSlugs().map((slug) => ({ slug }));

export function generateMetadata({ params }: { params: Params }): Metadata {
  const review = getReviewBySlug(params.slug);
  if (!review) {
    return buildPageMetadata({
      title: "Review Not Found",
      description: "The requested review page could not be found.",
      path: "/testimonials",
      noindex: true,
    });
  }

  return buildPageMetadata({
    title: `${review.displayAuthorName} Review`,
    description: toDescription(review.quote),
    path: `/testimonials/${review.slug}`,
  });
}

export default function Page({ params }: { params: Params }) {
  const review = getReviewBySlug(params.slug);
  if (!review) notFound();

  const path = `/testimonials/${review.slug}`;
  const reviewSchema = buildReviewSchema(review, path);
  const adjacent = getAdjacentReviewsBySlug(review.slug);
  const breadcrumbs = [
    HOME_CRUMB,
    { name: "Testimonials", path: "/testimonials" },
    { name: review.displayAuthorName },
  ];

  return (
    <>
      <StructuredData
        data={buildPageJsonLd({
          title: `${review.displayAuthorName} Review`,
          description: toDescription(review.quote),
          path,
          breadcrumbs,
          structuredData: reviewSchema,
        })}
      />

      <section className="pt-24 md:pt-32 pb-8 bg-gradient-to-b from-accent to-white">
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
                <BreadcrumbLink asChild>
                  <Link href="/testimonials">Testimonials</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{review.displayAuthorName}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to all reviews
          </Link>
        </div>
      </section>

      <Section>
        <div className="max-w-5xl mx-auto space-y-8">
          <header className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="secondary">{sourceLabels[review.source]}</Badge>
              <Badge variant="outline">{categoryLabels[review.category]}</Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
              {review.displayAuthorName}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-amber-500">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star
                  key={`${review.id}-${index}`}
                  className={`h-5 w-5 ${index < review.rating ? "fill-current" : ""}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-1">{review.rating}.0</span>
            </div>

            {(review.role || review.company) && (
              <p className="text-base text-gray-600">
                {review.role}
                {review.role && review.company ? " • " : ""}
                {review.company}
              </p>
            )}
          </header>

          <Card className="border border-gray-200 shadow-sm">
            <CardContent className="p-8">
              <blockquote className="text-gray-800 whitespace-pre-line leading-relaxed text-lg">
                {review.quote}
              </blockquote>
            </CardContent>
          </Card>

          <Card className="border border-gray-100 bg-gray-50">
            <CardContent className="p-5">
              <p className="text-sm text-gray-700">
                <span className="font-semibold">Reviewer:</span> {review.displayAuthorName}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                Source author record: {review.sourceAuthorName}
              </p>
            </CardContent>
          </Card>

          <div className="grid gap-3 sm:grid-cols-2">
            {adjacent.previous ? (
              <Link
                href={`/testimonials/${adjacent.previous.slug}`}
                className="rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors inline-flex items-center gap-2"
              >
                <ChevronLeft className="h-4 w-4" />
                {adjacent.previous.displayAuthorName}
              </Link>
            ) : (
              <div />
            )}

            {adjacent.next ? (
              <Link
                href={`/testimonials/${adjacent.next.slug}`}
                className="rounded-md border border-gray-200 px-4 py-3 text-sm text-gray-700 hover:border-primary hover:text-primary transition-colors inline-flex items-center justify-end gap-2"
              >
                {adjacent.next.displayAuthorName}
                <ChevronRight className="h-4 w-4" />
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>
      </Section>
    </>
  );
}
