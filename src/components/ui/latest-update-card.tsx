import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatLocalDate } from "@/lib/dateUtils";
import {
  getFeaturedImageShape,
  getIntrinsicFeaturedSize,
  INTRINSIC_FEATURED_IMAGE_CLASS,
  shouldContainFeaturedImage,
} from "@/lib/featuredImage";
import type { BlogPost } from "@/data/blogPosts";

interface LatestUpdateCardProps {
  post: BlogPost;
  className?: string;
}

export function LatestUpdateCard({ post, className }: LatestUpdateCardProps) {
  const targetHref = `/blog/${post.slug}`;
  const featuredImage = post.featuredImage || "/lovable-uploads/26ea1640-396f-4e68-b342-d7cc429029fa.png";
  const isIntrinsic = getFeaturedImageShape(post) !== "landscape";
  const isContained = shouldContainFeaturedImage(post);
  const intrinsicSize = getIntrinsicFeaturedSize(post);

  return (
    <div className={cn(
      "bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover-scale",
      className
    )}>
      <div className="grid md:grid-cols-2 gap-6 md:gap-8">
        <div
          className={cn(
            "relative",
            isIntrinsic
              ? "flex min-h-[16rem] items-center justify-center bg-slate-100 p-4 sm:p-6 md:min-h-[22rem]"
              : cn("h-64 md:h-full min-h-[16rem]", isContained && "bg-slate-100")
          )}
        >
          {isIntrinsic ? (
            <Image
              src={featuredImage}
              alt={post.featuredImageAlt || post.title}
              width={intrinsicSize.width}
              height={intrinsicSize.height}
              sizes="(min-width: 768px) 40vw, 100vw"
              className={INTRINSIC_FEATURED_IMAGE_CLASS}
            />
          ) : (
            <Image
              src={featuredImage}
              alt={post.featuredImageAlt || post.title}
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className={isContained ? "object-contain" : "object-cover"}
            />
          )}
          <div className="absolute top-4 left-4">
            <span className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
              Latest Update
            </span>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col justify-center">
          <div className="mb-3 flex items-center text-sm text-gray-700">
            <Calendar className="mr-2 h-4 w-4" aria-hidden="true" />
            <time dateTime={post.date}>
              {formatLocalDate(post.date, { month: "long", day: "numeric", year: "numeric" })}
            </time>
          </div>

          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-4 leading-tight">
            {post.title}
          </h3>

          <p className="mb-6 line-clamp-3 leading-relaxed text-gray-700">
            {post.excerpt}
          </p>

          <Button asChild variant="outline" className="w-fit">
            <Link href={targetHref} className="flex items-center">
              Read Full Story <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
