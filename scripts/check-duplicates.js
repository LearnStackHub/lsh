// Script to check for duplicate topic IDs and duplicate SEO titles
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataDir = path.join(__dirname, '..', 'src', 'data');
const seoHelpersPath = path.join(__dirname, '..', 'src', 'utils', 'seoHelpers.js');

// Track topic IDs and their file locations
const topicIdMap = new Map(); // id -> [file paths]
const topicTitleMap = new Map(); // title -> [file paths]

// Read all topic files and extract IDs and titles
function readTopicFiles(dir) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      readTopicFiles(filePath);
    } else if (file.endsWith('.js') && file !== 'index.js') {
      try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Extract ID
        const idMatch = content.match(/id:\s*['"]([^'"]+)['"]/);
        if (idMatch && idMatch[1]) {
          const topicId = idMatch[1];
          if (!topicIdMap.has(topicId)) {
            topicIdMap.set(topicId, []);
          }
          topicIdMap.get(topicId).push(filePath);
        }
        
        // Extract title
        const titleMatch = content.match(/title:\s*['"]([^'"]+)['"]/);
        if (titleMatch && titleMatch[1]) {
          const title = titleMatch[1];
          if (!topicTitleMap.has(title)) {
            topicTitleMap.set(title, []);
          }
          topicTitleMap.get(title).push(filePath);
        }
      } catch (error) {
        console.warn(`Warning: Could not read ${filePath}:`, error.message);
      }
    }
  });
}

// Read SEO helpers and check for duplicate SEO titles
function checkSEODuplicates() {
  try {
    const content = fs.readFileSync(seoHelpersPath, 'utf8');
    
    // Extract seoTitles object
    const seoTitlesMatch = content.match(/const seoTitles = \{([\s\S]*?)\};/);
    if (!seoTitlesMatch) {
      console.log('⚠️  Could not find seoTitles object in seoHelpers.js');
      return [];
    }
    
    const seoTitlesContent = seoTitlesMatch[1];
    const titleToSEOTitle = new Map();
    const seoTitleToTitles = new Map();
    
    // Parse each entry: 'Title': 'SEO Title',
    const entries = seoTitlesContent.matchAll(/'([^']+)':\s*'([^']+)'/g);
    
    for (const entry of entries) {
      const originalTitle = entry[1];
      const seoTitle = entry[2];
      
      titleToSEOTitle.set(originalTitle, seoTitle);
      
      if (!seoTitleToTitles.has(seoTitle)) {
        seoTitleToTitles.set(seoTitle, []);
      }
      seoTitleToTitles.get(seoTitle).push(originalTitle);
    }
    
    // Find duplicates (same SEO title for different original titles)
    const duplicates = [];
    for (const [seoTitle, titles] of seoTitleToTitles.entries()) {
      if (titles.length > 1) {
        duplicates.push({
          seoTitle,
          originalTitles: titles
        });
      }
    }
    
    return duplicates;
  } catch (error) {
    console.error('Error reading SEO helpers:', error.message);
    return [];
  }
}

// Main check function
function checkDuplicates() {
  console.log('🔍 Checking for duplicate topic IDs and SEO titles...\n');
  
  // Read all topic files
  readTopicFiles(dataDir);
  
  // Check for duplicate topic IDs
  console.log('📋 Checking duplicate topic IDs:');
  const duplicateIds = [];
  for (const [topicId, filePaths] of topicIdMap.entries()) {
    if (filePaths.length > 1) {
      duplicateIds.push({ id: topicId, files: filePaths });
    }
  }
  
  if (duplicateIds.length === 0) {
    console.log('✅ No duplicate topic IDs found!\n');
  } else {
    console.log(`❌ Found ${duplicateIds.length} duplicate topic ID(s):\n`);
    duplicateIds.forEach(({ id, files }) => {
      console.log(`   ID: "${id}"`);
      files.forEach(file => {
        const relativePath = path.relative(path.join(__dirname, '..'), file);
        console.log(`      - ${relativePath}`);
      });
      console.log('');
    });
  }
  
  // Check for duplicate topic titles
  console.log('📋 Checking duplicate topic titles:');
  const duplicateTitles = [];
  for (const [title, filePaths] of topicTitleMap.entries()) {
    if (filePaths.length > 1) {
      duplicateTitles.push({ title, files: filePaths });
    }
  }
  
  if (duplicateTitles.length === 0) {
    console.log('✅ No duplicate topic titles found!\n');
  } else {
    console.log(`⚠️  Found ${duplicateTitles.length} duplicate topic title(s) (may be intentional):\n`);
    duplicateTitles.forEach(({ title, files }) => {
      console.log(`   Title: "${title}"`);
      files.forEach(file => {
        const relativePath = path.relative(path.join(__dirname, '..'), file);
        console.log(`      - ${relativePath}`);
      });
      console.log('');
    });
  }
  
  // Check for duplicate SEO titles
  console.log('📋 Checking duplicate SEO titles:');
  const seoDuplicates = checkSEODuplicates();
  
  if (seoDuplicates.length === 0) {
    console.log('✅ No duplicate SEO titles found!\n');
  } else {
    console.log(`❌ Found ${seoDuplicates.length} duplicate SEO title(s):\n`);
    seoDuplicates.forEach(({ seoTitle, originalTitles }) => {
      console.log(`   SEO Title: "${seoTitle}"`);
      console.log(`   Maps from ${originalTitles.length} original title(s):`);
      originalTitles.forEach(title => {
        console.log(`      - "${title}"`);
      });
      console.log('');
    });
  }
  
  // Summary
  console.log('\n📊 Summary:');
  console.log(`   Total unique topic IDs: ${topicIdMap.size}`);
  console.log(`   Total unique topic titles: ${topicTitleMap.size}`);
  console.log(`   Duplicate topic IDs: ${duplicateIds.length}`);
  console.log(`   Duplicate topic titles: ${duplicateTitles.length}`);
  console.log(`   Duplicate SEO titles: ${seoDuplicates.length}`);
  
  if (duplicateIds.length > 0 || seoDuplicates.length > 0) {
    console.log('\n❌ Issues found! Please fix before pushing.');
    process.exit(1);
  } else {
    console.log('\n✅ All checks passed! Safe to push.');
  }
}

// Run the check
checkDuplicates();

