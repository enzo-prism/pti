#!/usr/bin/env tsx

/**
 * Generate the react-snap routes array for package.json
 * This script outputs the routes that should be pre-rendered
 */

// Import blog posts from data source
let blogPosts: any[] = [];
try {
  const blogData = await import('../src/data/blogPosts.js');
  blogPosts = blogData.blogPosts || blogData.default || [];
} catch (error) {
  console.warn('⚠️  Could not import blog posts, using empty array');
}

// Static routes from React Router
const staticRoutes = [
  '/',
  '/about',
  '/services',
  '/services/value',
  '/services/selling',
  '/services/associateships',
  '/services/partnerships',
  '/blog',
  '/faq',
  '/testimonials',
  '/events',
  '/contact',
  '/privacy-policy',
  '/terms-of-service',
  '/drnjo',
  '/404'
];

// Blog post routes
const blogRoutes = blogPosts.map(post => `/blog/${post.slug}`);

// Combine all URLs
const allRoutes = [...staticRoutes, ...blogRoutes];

console.log('React-snap routes for package.json:');
console.log(JSON.stringify(allRoutes, null, 2));
console.log(`\nTotal routes: ${allRoutes.length}`);
