/**
 * Print a one-line FIREBASE_SERVICE_ACCOUNT value for Vercel.
 * Usage: node scripts/prepare-firebase-vercel-env.mjs path/to/service-account.json
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const inputPath = process.argv[2] || process.env.FIREBASE_SERVICE_ACCOUNT_PATH || './firebase-service-account.json';

try {
  const raw = readFileSync(resolve(inputPath), 'utf8');
  const parsed = JSON.parse(raw);

  if (!parsed.client_email || !parsed.private_key || !parsed.project_id) {
    console.error('Invalid service account JSON: missing client_email, private_key, or project_id.');
    process.exit(1);
  }

  console.log('\nOption A — paste as FIREBASE_SERVICE_ACCOUNT in Vercel:\n');
  console.log(JSON.stringify(parsed));

  const b64 = Buffer.from(JSON.stringify(parsed), 'utf8').toString('base64');
  console.log('\nOption B (safer on Vercel) — paste as FIREBASE_SERVICE_ACCOUNT_B64:\n');
  console.log(b64);

  console.log('\nDelete FIREBASE_SERVICE_ACCOUNT_PATH from Vercel if present.\n');
} catch (error) {
  console.error('Could not read or parse service account file:', error.message);
  console.error('\nDownload JSON from Firebase Console → Project settings → Service accounts → Generate new private key');
  process.exit(1);
}
