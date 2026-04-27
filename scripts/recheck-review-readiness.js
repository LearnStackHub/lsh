import indexingCandidates from '../src/config/indexingCandidates.json' with { type: 'json' };
import indexingOverrides from '../src/config/indexingOverrides.json' with { type: 'json' };

const strictEnabled = process.env.STRICT_INDEXING_POLICY === '1';

console.log('🔎 AdSense / GSC review recheck');
console.log(`Strict indexing policy: ${strictEnabled ? 'ENABLED' : 'DISABLED'}`);
console.log(`Indexable topics in policy file: ${indexingCandidates.indexableTopicsCount}`);
console.log(`Excluded topics in policy file: ${indexingCandidates.excludedTopicsCount}`);
console.log(`Force-index overrides: ${indexingOverrides.forceIndexTopicIds?.length || 0}`);
console.log('Next steps:');
console.log('1) Run: npm run generate-sitemap:review');
console.log('2) Deploy and submit refreshed sitemap in GSC.');
console.log('3) Validate sample excluded URLs return noindex.');
