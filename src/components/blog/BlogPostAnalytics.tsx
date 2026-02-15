"use client";

import { useEffect } from "react";
import { trackBlogPostView } from "@/lib/analytics";

interface BlogPostAnalyticsProps {
  title: string;
  category: string;
  slug: string;
}

export function BlogPostAnalytics({ title, category, slug }: BlogPostAnalyticsProps) {
  useEffect(() => {
    trackBlogPostView(title, category, slug);
  }, [title, category, slug]);

  return null;
}
