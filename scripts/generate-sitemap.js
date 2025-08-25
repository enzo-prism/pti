#!/usr/bin/env node

/**
 * Generate sitemap.xml for the Practice Transitions Institute website
 * This script should be run before building the application
 */

import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

// ES modules compatibility
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Import sitemap generation functions
// Note: This requires the project to be built or use a loader for TypeScript
const sitemapPath = join(__dirname, '../dist/lib/sitemap.js');

async function generateSitemap() {
  try {
    console.log('🚀 Generating sitemap.xml...');
    
    // For development, we'll create a simple sitemap without importing the TS file
    // In production, this would import the compiled JS version
    const BASE_URL = 'https://practicetransitionsinstitute.com';
    const currentDate = new Date().toISOString().split('T')[0];
    
    // Static routes
    const staticRoutes = [
      { loc: `${BASE_URL}/`, priority: 1.0, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/services`, priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/services/selling`, priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/services/partnerships`, priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/services/associateships`, priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/services/value`, priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/transitions`, priority: 0.9, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/blog`, priority: 0.8, changefreq: 'daily', lastmod: currentDate },
      { loc: `${BASE_URL}/about`, priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
      { loc: `${BASE_URL}/dr-njo`, priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
      { loc: `${BASE_URL}/events`, priority: 0.7, changefreq: 'weekly', lastmod: currentDate },
      { loc: `${BASE_URL}/testimonials`, priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
      { loc: `${BASE_URL}/faq`, priority: 0.7, changefreq: 'monthly', lastmod: currentDate },
      { loc: `${BASE_URL}/contact`, priority: 0.7, changefreq: 'monthly', lastmod: currentDate }
    ];

    // Import blog posts data directly (since we can't easily import TS at build time)
    const blogPosts = [
      { slug: 'so-much-to-be-thankful-for', date: '2024-11-28' },
      { slug: 'staying-connected-in-your-business', date: '2024-11-25' },
      { slug: 'understanding-the-true-value-of-your-practice', date: '2024-11-22' },
      { slug: 'the-transition-timeline-series-part-1', date: '2024-11-19' },
      { slug: 'the-transition-timeline-series-part-2', date: '2024-11-16' },
      { slug: 'the-transition-timeline-series-part-3', date: '2024-11-13' },
      { slug: 'the-transition-timeline-series-part-4', date: '2024-11-10' },
      { slug: 'the-transition-timeline-series-part-5', date: '2024-11-07' },
      { slug: 'transitioning-into-practice-ownership-challenges-and-rewards', date: '2024-11-04' },
      { slug: 'maximizing-practice-value-before-selling', date: '2024-11-01' },
      { slug: 'finding-the-right-associate-key-qualities-to-look-for', date: '2024-10-29' },
      { slug: 'partnership-vs-associateship-which-path-is-right-for-you', date: '2024-10-26' },
      { slug: 'preparing-for-retirement-a-comprehensive-guide-for-dentists', date: '2024-10-23' }
    ];

    const blogRoutes = blogPosts.map(post => ({
      loc: `${BASE_URL}/blog/${post.slug}`,
      lastmod: post.date,
      priority: 0.6,
      changefreq: 'monthly'
    }));

    const allRoutes = [...staticRoutes, ...blogRoutes];

    // Generate XML
    const urlsXml = allRoutes.map(route => {
      let urlXml = `  <url>\n    <loc>${route.loc}</loc>`;
      urlXml += `\n    <lastmod>${route.lastmod || currentDate}</lastmod>`;
      urlXml += `\n    <changefreq>${route.changefreq}</changefreq>`;
      urlXml += `\n    <priority>${route.priority}</priority>`;
      urlXml += '\n  </url>';
      return urlXml;
    }).join('\n');

    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;

    // Ensure public directory exists
    const publicDir = join(__dirname, '../public');
    if (!existsSync(publicDir)) {
      mkdirSync(publicDir, { recursive: true });
    }

    // Write sitemap.xml to public directory
    const sitemapPath = join(publicDir, 'sitemap.xml');
    writeFileSync(sitemapPath, sitemapXml, 'utf8');

    console.log('✅ Sitemap generated successfully at:', sitemapPath);
    console.log(`📄 Generated ${allRoutes.length} URLs in sitemap`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the script
generateSitemap();