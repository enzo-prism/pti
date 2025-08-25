import { blogPosts } from '../data/blogPosts';

// Define the base URL for the site
const BASE_URL = 'https://practicetransitionsinstitute.com';

export interface SitemapUrl {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

// Static routes configuration
export const getStaticRoutes = (): SitemapUrl[] => {
  const currentDate = new Date().toISOString().split('T')[0];
  
  return [
    {
      loc: `${BASE_URL}/`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 1.0
    },
    {
      loc: `${BASE_URL}/services`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/services/selling`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/services/partnerships`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/services/associateships`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/services/value`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/transitions`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.9
    },
    {
      loc: `${BASE_URL}/blog`,
      lastmod: currentDate,
      changefreq: 'daily',
      priority: 0.8
    },
    {
      loc: `${BASE_URL}/about`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/dr-njo`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/events`,
      lastmod: currentDate,
      changefreq: 'weekly',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/testimonials`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/faq`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    },
    {
      loc: `${BASE_URL}/contact`,
      lastmod: currentDate,
      changefreq: 'monthly',
      priority: 0.7
    }
  ];
};

// Generate blog post URLs
export const getBlogRoutes = (): SitemapUrl[] => {
  return blogPosts.map(post => ({
    loc: `${BASE_URL}/blog/${post.slug}`,
    lastmod: post.date,
    changefreq: 'monthly' as const,
    priority: 0.6
  }));
};

// Generate complete sitemap URLs
export const getAllSitemapUrls = (): SitemapUrl[] => {
  return [...getStaticRoutes(), ...getBlogRoutes()];
};

// Generate XML sitemap content
export const generateSitemapXml = (): string => {
  const urls = getAllSitemapUrls();
  
  const urlsXml = urls.map(url => {
    let urlXml = `  <url>\n    <loc>${url.loc}</loc>`;
    
    if (url.lastmod) {
      urlXml += `\n    <lastmod>${url.lastmod}</lastmod>`;
    }
    
    if (url.changefreq) {
      urlXml += `\n    <changefreq>${url.changefreq}</changefreq>`;
    }
    
    if (url.priority !== undefined) {
      urlXml += `\n    <priority>${url.priority}</priority>`;
    }
    
    urlXml += '\n  </url>';
    
    return urlXml;
  }).join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlsXml}
</urlset>`;
};

// Utility function to get all blog slugs
export const getAllBlogSlugs = (): string[] => {
  return blogPosts.map(post => post.slug);
};