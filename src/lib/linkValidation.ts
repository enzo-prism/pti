import { blogPosts } from '@/data/blogPosts';

/**
 * Validates that a blog post slug exists in the blogPosts array
 */
export const validateBlogSlug = (slug: string): boolean => {
  return blogPosts.some(post => post.slug === slug);
};

/**
 * Gets all valid blog slugs for validation purposes
 */
export const getAllBlogSlugs = (): string[] => {
  return blogPosts.map(post => post.slug);
};

/**
 * Validates all internal blog links in development mode
 * Logs warnings for any broken internal links
 */
export const validateInternalBlogLinks = (): void => {
  if (!import.meta.env.DEV) return;

  const internalLinks: string[] = [];
  
  // Extract all internal blog links from blog post content
  blogPosts.forEach(post => {
    const linkMatches = post.content.match(/href="\/blog\/([^"]+)"/g);
    if (linkMatches) {
      linkMatches.forEach(match => {
        const slug = match.replace('href="/blog/', '').replace('"', '');
        internalLinks.push(slug);
      });
    }
  });

  // Validate each internal link
  const brokenLinks = internalLinks.filter(slug => !validateBlogSlug(slug));
  
  if (brokenLinks.length > 0) {
    console.warn('🔗 Internal Blog Link Validation Warnings:');
    brokenLinks.forEach(slug => {
      console.warn(`  ❌ Broken link found: /blog/${slug}`);
    });
    console.warn('Available slugs:', getAllBlogSlugs());
  } else if (internalLinks.length > 0) {
    console.log('🔗 All internal blog links validated successfully ✅');
  }
};
