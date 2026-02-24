import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');
const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
const foundTopicIds = new Set();
const sitemapTopicIds = new Set();

// Read all topic files
function readTopicFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      readTopicFiles(filePath);
    } else if (file.endsWith('.js') && file !== 'index.js') {
      try {
        const fileContent = fs.readFileSync(filePath, 'utf8');
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

// Read sitemap and extract topic IDs
function readSitemap() {
  if (!fs.existsSync(sitemapPath)) {
    console.log('Sitemap not found!');
    return;
  }
  
  const content = fs.readFileSync(sitemapPath, 'utf8');
  const matches = content.matchAll(/\/tutorial\/([^<]+)</g);
  
  for (const match of matches) {
    sitemapTopicIds.add(match[1]);
  }
}

// Main
readTopicFiles(dataDir);
readSitemap();

console.log(`\n📊 Sitemap Check Results:\n`);
console.log(`Total topics in data: ${foundTopicIds.size}`);
console.log(`Total topics in sitemap: ${sitemapTopicIds.size}\n`);

// Find missing topics
const allTopicIds = Array.from(foundTopicIds).sort();
const sitemapIds = Array.from(sitemapTopicIds).sort();

const missingInSitemap = allTopicIds.filter(id => !sitemapTopicIds.has(id));
const extraInSitemap = sitemapIds.filter(id => !foundTopicIds.has(id));

if (missingInSitemap.length > 0) {
  console.log(`❌ Missing in sitemap (${missingInSitemap.length}):`);
  missingInSitemap.forEach(id => console.log(`   - ${id}`));
} else {
  console.log(`✅ All topics are in sitemap!`);
}

if (extraInSitemap.length > 0) {
  console.log(`\n⚠️  Extra in sitemap (not in data) (${extraInSitemap.length}):`);
  extraInSitemap.forEach(id => console.log(`   - ${id}`));
}

console.log(`\n✅ Check complete!`);



