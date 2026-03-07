// Generate sitemap.xml for SEO
import { getAllTopics } from '../data';

export const generateSitemap = () => {
  const baseUrl = 'https://learnstackhub.com';
  const currentDate = new Date().toISOString().split('T')[0];
  
  // Static pages
  const staticPages = [
    { url: '/', priority: '1.0', changefreq: 'daily' },
    { url: '/about', priority: '0.8', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/career-guidance', priority: '0.9', changefreq: 'monthly' },
    { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
    { url: '/terms', priority: '0.5', changefreq: 'yearly' },
  ];

  // New pages added today - update with today's date
  const newPagesToday = [
    'http-status-codes',
    'global-exception-handling-http'
  ];

  // Tutorial pages
  const allTopics = getAllTopics();
  const tutorialPages = allTopics.map(topic => {
    // Use today's date for new pages, otherwise use current date (which is today for all)
    // This allows us to track which pages were added/updated today
    const lastmod = newPagesToday.includes(topic.id) ? currentDate : currentDate;
    
    return {
      url: `/tutorial/${topic.id}`,
      priority: '0.9',
      changefreq: 'weekly',
      lastmod: lastmod
    };
  });

  // Combine all pages
  const allPages = [...staticPages, ...tutorialPages];

  // Generate XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;

  allPages.forEach(page => {
    xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod || currentDate}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
  });

  xml += `</urlset>`;

  return xml;
};

