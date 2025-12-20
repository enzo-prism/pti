#!/usr/bin/env tsx

/**
 * Generate sitemap.xml for Practice Transitions Institute
 * Auto-detects routes and blog posts from single source of truth
 */

import { SitemapStream, streamToPromise } from 'sitemap';
import fs from 'fs';
import path from 'path';
import { STATIC_ROUTES, getBlogPosts } from './route-config';

const blogPosts = await getBlogPosts();

// Determine base URL from environment or fallback
const BASE_URL = (
  process.env.SITEMAP_BASE_URL ?? 
  process.env.PUBLIC_BASE_URL ?? 
  'https://practicetransitionsinstitute.com'
).replace(/\/$/, '');

console.log(`🌐 Generating sitemap for: ${BASE_URL}`);

const staticRoutes = STATIC_ROUTES.map((route) => ({
  url: route.path,
  changefreq: route.changefreq,
  priority: route.priority,
})) as const;

// Blog post routes
const blogRoutes = blogPosts
  .filter((post) => post?.slug)
  .map(post => ({
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
