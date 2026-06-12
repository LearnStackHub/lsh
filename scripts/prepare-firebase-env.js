/**
 * Prepare Firebase service account values for Vercel env vars.
 *
 * Usage:
 *   node scripts/prepare-firebase-env.js path/to/service-account.json
 *
 * Paste ONE of the printed values into Vercel (Production + Preview), then redeploy.
 * Do not commit the JSON key file or paste output into git.
 */

import { readFileSync } from 'node:fs';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Usage: node scripts/prepare-firebase-env.js path/to/service-account.json');
  process.exit(1);
}

const raw = readFileSync(filePath, 'utf8');
const parsed = JSON.parse(raw);
const oneLine = JSON.stringify(parsed);
const base64 = Buffer.from(oneLine, 'utf8').toString('base64');

console.log('\nOption A — FIREBASE_SERVICE_ACCOUNT (one line, recommended):\n');
console.log(oneLine);
console.log('\nOption B — FIREBASE_SERVICE_ACCOUNT_B64 (base64, also reliable):\n');
console.log(base64);
console.log('\nAlso set ADMIN_EMAILS for Production and Preview, then redeploy.\n');
