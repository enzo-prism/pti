#!/usr/bin/env tsx

/**
 * Generate sitemap.xml for Practice Transitions Institute
 * Auto-detects routes and blog posts from single source of truth
 */

import { SitemapStream, streamToPromise } from 'sitemap';
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

// Determine base URL from environment or fallback
const BASE_URL = (
  process.env.SITEMAP_BASE_URL ?? 
  process.env.PUBLIC_BASE_URL ?? 
  'https://practicetransitionsinstitute.com'
).replace(/\/$/, '');

console.log(`🌐 Generating sitemap for: ${BASE_URL}`);

// Static routes from React Router (CORRECTED /drnjo not /dr-njo)
const staticRoutes = [
  { url: '/', changefreq: 'weekly', priority: 1.0 },
  { url: '/services', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/value', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/selling', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/associateships', changefreq: 'weekly', priority: 0.9 },
  { url: '/services/partnerships', changefreq: 'weekly', priority: 0.9 },
  { url: '/blog', changefreq: 'daily', priority: 0.8 },
  { url: '/about', changefreq: 'monthly', priority: 0.7 },
  { url: '/drnjo', changefreq: 'monthly', priority: 0.7 }, // CORRECTED
  { url: '/events', changefreq: 'weekly', priority: 0.7 },
  { url: '/testimonials', changefreq: 'monthly', priority: 0.7 },
  { url: '/faq', changefreq: 'monthly', priority: 0.7 },
  { url: '/contact', changefreq: 'monthly', priority: 0.7 },
  { url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 },
  { url: '/terms-of-service', changefreq: 'yearly', priority: 0.3 }
] as const;

// Blog post routes
const blogRoutes = blogPosts.map(post => ({
  url: `/blog/${post.slug}`,
  changefreq: 'monthly',
  priority: 0.6,
  lastmod: post.date || post.lastmod
}));

// Combine all URLs
const allUrls = [...staticRoutes, ...blogRoutes];
console.log(`📄 Found ${staticRoutes.length} static routes + ${blogRoutes.length} blog posts = ${allUrls.length} total URLs`);

async function generateSitemap() {
  try {
    // Ensure public directory exists
    fs.mkdirSync('public', { recursive: true });

    // Create sitemap stream
    const sitemap = new SitemapStream({ hostname: BASE_URL });
    
    // Add all URLs
    allUrls.forEach(urlData => {
      sitemap.write(urlData);
    });
    
    sitemap.end();

    // Convert to XML buffer
    const xmlBuffer = await streamToPromise(sitemap);
    
    // Write to public/sitemap.xml (no BOM, clean XML)
    const outputPath = path.resolve('public', 'sitemap.xml');
    fs.writeFileSync(outputPath, xmlBuffer);
    
    console.log('✅ Sitemap generated successfully!');
    console.log(`   📍 Location: ${outputPath}`);
    console.log(`   📊 URLs: ${allUrls.length}`);
    
    // Verify first byte is '<' (no BOM)
    const firstByte = fs.readFileSync(outputPath)[0];
    if (firstByte !== 60) { // '<' is ASCII 60
      console.error('❌ WARNING: sitemap.xml does not start with "<" - possible BOM issue');
    } else {
      console.log('✅ XML format verified (starts with "<")');
    }
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === new URL(import.meta.resolve('./generate-sitemap.ts')).href) {
  generateSitemap();
}
