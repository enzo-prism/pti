"use client";

import { useEffect } from "react";
import { trackBlogPostView } from "@/lib/analytics";

interface BlogPostAnalyticsProps {
  title: string;
  category: string;
}

export function BlogPostAnalytics({ title, category }: BlogPostAnalyticsProps) {
  useEffect(() => {
    trackBlogPostView(title, category);
  }, [title, category]);

  return null;
}
