// Script to generate sitemap.xml for Google Search Console
// Run: node scripts/generate-sitemap.js
// This will create public/sitemap.xml with all tutorial pages

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = 'https://www.learnstackhub.com';
const currentDate = new Date().toISOString().split('T')[0];

// New pages added today - only these should have today's date
const newPagesToday = [
  'http-status-codes',
  'global-exception-handling-http',
  'java-interview-questions',
  'spring-boot-introduction',
  'spring-boot-project-setup',
  'spring-boot-configuration',
  'spring-boot-rest-api',
  'spring-boot-jpa',
  'spring-boot-exception-handling',
  'spring-boot-validation',
  'spring-boot-security',
  'spring-boot-smtp',
  'spring-boot-postman-swagger',
  'spring-cloud-microservices',
  'spring-boot-testing',
  'spring-boot-deployment',
  'spring-boot-actuator',
  'spring-boot-interview-questions'
];

// Static pages
const staticPages = [
  { url: '/', priority: '1.0', changefreq: 'daily' },
  { url: '/about', priority: '0.8', changefreq: 'monthly' },
  { url: '/careers', priority: '0.8', changefreq: 'monthly' },
  { url: '/career-guidance', priority: '0.8', changefreq: 'monthly' },
  { url: '/contact', priority: '0.7', changefreq: 'monthly' },
  { url: '/privacy', priority: '0.5', changefreq: 'yearly' },
  { url: '/terms', priority: '0.5', changefreq: 'yearly' },
  { url: '/disclaimer', priority: '0.5', changefreq: 'yearly' },
  { url: '/core-java-mcq', priority: '0.8', changefreq: 'weekly' },
  { url: '/mysql-mcq', priority: '0.8', changefreq: 'weekly' },
  { url: '/jdbc-mcq', priority: '0.8', changefreq: 'weekly' },
  { url: '/spring-mcq', priority: '0.8', changefreq: 'weekly' },
  { url: '/spring-boot-mcq', priority: '0.8', changefreq: 'weekly' },
  { url: '/hibernate-mcq', priority: '0.8', changefreq: 'weekly' },
  { url: '/microservices-mcq', priority: '0.8', changefreq: 'weekly' },
];

// Function to read existing sitemap and extract old dates
function readExistingSitemap(sitemapPath) {
  const existingDates = new Map();
  
  if (fs.existsSync(sitemapPath)) {
    try {
      const content = fs.readFileSync(sitemapPath, 'utf8');
      // Extract URLs and their lastmod dates using regex
      const urlMatches = content.matchAll(/<loc>(.*?)<\/loc>\s*<lastmod>(.*?)<\/lastmod>/g);
      
      for (const match of urlMatches) {
        const url = match[1].replace(baseUrl, '');
        const lastmod = match[2];
        existingDates.set(url, lastmod);
      }
    } catch (error) {
      console.warn('Could not read existing sitemap:', error.message);
    }
  }
  
  return existingDates;
}

// Import getAllTopics from the data index
// We need to use dynamic import since we're in a Node.js script
async function generateSitemap() {
  try {
    const dataDir = path.join(__dirname, '..', 'src', 'data');
    const tutorialPages = [];
    const foundTopicIds = new Set();
    
    // Recursively read all .js files in the data directory
    function readTopicFiles(dir) {
      const files = fs.readdirSync(dir);
      
      files.forEach(file => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        
        if (stat.isDirectory()) {
          // Recursively read subdirectories
          readTopicFiles(filePath);
        } else if (file.endsWith('.js') && file !== 'index.js') {
          // Read each topic file and extract the ID
          try {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            // Look for: id: 'topic-id', or id: "topic-id",
            const idMatch = fileContent.match(/id:\s*['"]([^'"]+)['"]/);
            if (idMatch && idMatch[1]) {
              foundTopicIds.add(idMatch[1]);
            }
          } catch (error) {
            console.warn(`Warning: Could not read ${filePath}:`, error.message);
          }
        }
      });
    }
    
    // Read all topic files
    readTopicFiles(dataDir);
    
    // Convert Set to Array and create tutorial pages
    const allTopicIds = Array.from(foundTopicIds).sort();
    
    // Read existing sitemap to preserve old dates
    const projectRoot = path.join(__dirname, '..');
    const existingSitemapPath = path.join(projectRoot, 'sitemap.xml');
    const existingDates = readExistingSitemap(existingSitemapPath);
    
    // Create tutorial pages - preserve old dates, only update new pages
    allTopicIds.forEach(topicId => {
      const url = `/tutorial/${topicId}`;
      let lastmod;
      
      // If it's a new page, use today's date
      if (newPagesToday.includes(topicId)) {
        lastmod = currentDate;
      } else {
        // Otherwise, use existing date if it's NOT today's date, otherwise use old default
        const existingDate = existingDates.get(url);
        // If existing date is today's date, it means we overwrote it, so use old default
        if (existingDate && existingDate !== currentDate) {
          lastmod = existingDate;
        } else {
          // Default to old date (2026-02-18) for all old pages
          lastmod = '2026-02-18';
        }
      }
      
      tutorialPages.push({
        url: url,
        priority: '0.9',
        changefreq: 'weekly',
        lastmod: lastmod
      });
    });
    
    // Preserve old dates for static pages too
    staticPages.forEach(page => {
      const existingDate = existingDates.get(page.url);
      // If existing date is today's date, it means we overwrote it, so use old default
      if (existingDate && existingDate !== currentDate) {
        page.lastmod = existingDate;
      } else {
        page.lastmod = '2026-02-18'; // Default old date
      }
    });
    
    // Combine all pages
    const allPages = [...staticPages, ...tutorialPages];
    
    // Generate XML
    let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
`;
    
    allPages.forEach(page => {
      xml += `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>
`;
    });
    
    xml += `</urlset>`;
    
    // Write to project root (same level as package.json, index.html)
    const rootSitemapPath = path.join(projectRoot, 'sitemap.xml');
    fs.writeFileSync(rootSitemapPath, xml, 'utf8');
    
    // Also write to public directory so it gets copied to dist/ during build
    const publicDir = path.join(__dirname, '..', 'public');
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    const publicSitemapPath = path.join(publicDir, 'sitemap.xml');
    fs.writeFileSync(publicSitemapPath, xml, 'utf8');
    
    console.log(`✅ Sitemap generated successfully!`);
    console.log(`📄 Root location: ${rootSitemapPath}`);
    console.log(`📄 Public location: ${publicSitemapPath}`);
    console.log(`🌐 URL: ${baseUrl}/sitemap.xml`);
    console.log(`📊 Total URLs: ${allPages.length}`);
    console.log(`   - Static pages: ${staticPages.length}`);
    console.log(`   - Tutorial pages: ${tutorialPages.length}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
}

// Run the generator
generateSitemap();
