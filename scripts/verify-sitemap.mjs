#!/usr/bin/env node

/**
 * Verify sitemap.xml exists and is well-formed after build
 */

import fs from 'fs';
import path from 'path';

const DIST_SITEMAP = path.resolve('dist', 'sitemap.xml');
const PUBLIC_SITEMAP = path.resolve('public', 'sitemap.xml');

console.log('🔍 Verifying sitemap...');

// Check if sitemap exists in dist (copied during build)
if (!fs.existsSync(DIST_SITEMAP)) {
  console.error(`❌ sitemap.xml not found in dist/ directory: ${DIST_SITEMAP}`);
  
  // Check if it exists in public/ and suggest fix
  if (fs.existsSync(PUBLIC_SITEMAP)) {
    console.error('💡 sitemap.xml exists in public/ but not copied to dist/');
    console.error('   Ensure Vite copies static files properly.');
  }
  
  process.exit(1);
}

// Read and verify file format
const sitemapBuffer = fs.readFileSync(DIST_SITEMAP);

// Check first byte is '<' (no BOM/whitespace)
if (sitemapBuffer[0] !== 60) { // '<' is ASCII 60
  console.error('❌ sitemap.xml must start with "<" (no BOM/whitespace)');
  console.error(`   First byte: ${sitemapBuffer[0]} (expected: 60)`);
  process.exit(1);
}

// Basic XML validation
const content = sitemapBuffer.toString('utf-8');
if (!content.includes('<?xml') || !content.includes('<urlset')) {
  console.error('❌ sitemap.xml does not appear to be valid XML');
  console.error('   Missing <?xml declaration or <urlset> element');
  process.exit(1);
}

// Count URLs
const urlCount = (content.match(/<url>/g) || []).length;
console.log(`✅ sitemap.xml verified successfully!`);
console.log(`   📍 Location: ${DIST_SITEMAP}`);
console.log(`   📊 URLs found: ${urlCount}`);
console.log(`   📏 File size: ${Math.round(sitemapBuffer.length / 1024)}KB`);