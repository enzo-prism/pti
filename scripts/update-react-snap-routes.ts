#!/usr/bin/env tsx

/**
 * Pre-build script that updates package.json react-snap include list
 * with all blog post routes dynamically.
 * 
 * Run this before react-snap to ensure all routes are pre-rendered.
 */

import fs from 'fs';
import path from 'path';

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
const blogRoutes = blogPosts.map((post: any) => `/blog/${post.slug}`);

// Combine all URLs
const allRoutes = [...staticRoutes, ...blogRoutes];

// Read current package.json
const packageJsonPath = path.resolve('package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

// Update react-snap include list
if (!packageJson.reactSnap) {
  packageJson.reactSnap = {};
}
packageJson.reactSnap.include = allRoutes;

// Write updated package.json
fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2) + '\n');

console.log(`✅ Updated react-snap include list with ${allRoutes.length} routes`);
console.log(`   📄 Static routes: ${staticRoutes.length}`);
console.log(`   📝 Blog routes: ${blogRoutes.length}`);
