import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { cert, getApps, initializeApp } from 'firebase-admin/app';

function normalizePrivateKey(key) {
  if (!key) {
    return '';
  }

  let value = String(key).trim();

  if (
    (value.startsWith('"') && value.endsWith('"')) ||
    (value.startsWith("'") && value.endsWith("'"))
  ) {
    value = value.slice(1, -1);
  }

  value = value.replace(/\\n/g, '\n');

  if (!value.endsWith('\n') && value.includes('BEGIN PRIVATE KEY')) {
    value += '\n';
  }

  return value;
}

function extractServiceAccountLoose(raw) {
  const text = String(raw);
  const projectId = text.match(/"project_id"\s*:\s*"([^"]+)"/)?.[1];
  const clientEmail = text.match(/"client_email"\s*:\s*"([^"]+)"/)?.[1];
  const pemMatch = text.match(/-----BEGIN PRIVATE KEY-----[\s\S]*?-----END PRIVATE KEY-----/);

  if (!projectId || !clientEmail || !pemMatch) {
    return null;
  }

  return {
    type: 'service_account',
    project_id: projectId,
    client_email: clientEmail,
    private_key: normalizePrivateKey(pemMatch[0]),
  };
}

function parseServiceAccount(raw) {
  if (!raw) {
    return null;
  }

  if (typeof raw === 'object' && raw !== null) {
    if (raw.client_email && raw.private_key) {
      return {
        ...raw,
        private_key: normalizePrivateKey(raw.private_key),
      };
    }
    return null;
  }

  let trimmed = String(raw).trim().replace(/^\uFEFF/, '');

  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    try {
      const unquoted = JSON.parse(trimmed);
      if (typeof unquoted === 'object' && unquoted !== null) {
        return parseServiceAccount(unquoted);
      }
      if (typeof unquoted === 'string') {
        trimmed = unquoted.trim();
      }
    } catch {
      trimmed = trimmed.slice(1, -1);
    }
  }

  const candidates = [
    trimmed,
    trimmed.replace(/\r\n/g, '\n'),
    trimmed.replace(/\r?\n/g, ''),
    trimmed.replace(/\\"/g, '"'),
    trimmed.replace(/\\'/g, "'"),
  ];

  for (const candidate of candidates) {
    if (!candidate) {
      continue;
    }

    try {
      const parsed = JSON.parse(candidate);
      if (parsed?.client_email && parsed?.private_key && parsed?.project_id) {
        return {
          ...parsed,
          private_key: normalizePrivateKey(parsed.private_key),
        };
      }
    } catch {
      // try next candidate
    }
  }

  return extractServiceAccountLoose(trimmed);
}

function readServiceAccountFile(filePath) {
  try {
    const resolved = path.isAbsolute(filePath) ? filePath : path.resolve(process.cwd(), filePath);
    if (!existsSync(resolved)) {
      console.error(`firebase admin: file not found at ${resolved}`);
      return null;
    }

    return parseServiceAccount(readFileSync(resolved, 'utf8'));
  } catch (error) {
    console.error('firebase admin: could not read service account file:', error?.message || error);
    return null;
  }
}

function readServiceAccountFromEnv() {
  const filePath = process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim();
  // File paths only work in local dev — never on Vercel/serverless.
  if (filePath && !process.env.VERCEL) {
    const fromFile = readServiceAccountFile(filePath);
    if (fromFile) {
      return fromFile;
    }
  }

  const jsonRaw = process.env.FIREBASE_SERVICE_ACCOUNT || process.env.FIREBASE_SERVICE_ACCOUNT_JSON;
  if (jsonRaw) {
    const parsed = parseServiceAccount(jsonRaw);
    if (parsed) {
      return parsed;
    }
  }

  const b64Raw =
    process.env.FIREBASE_SERVICE_ACCOUNT_B64 || process.env.FIREBASE_SERVICE_ACCOUNT_BASE64;
  if (b64Raw) {
    try {
      const decoded = Buffer.from(String(b64Raw).trim(), 'base64').toString('utf8');
      const parsed = parseServiceAccount(decoded);
      if (parsed) {
        return parsed;
      }
    } catch {
      // fall through to split vars
    }
  }

  return null;
}

function resolveProjectId(serviceAccount) {
  return (
    serviceAccount?.project_id ||
    process.env.FIREBASE_PROJECT_ID?.trim() ||
    process.env.VITE_FIREBASE_PROJECT_ID?.trim() ||
    'learnstackhub'
  );
}

function buildCredential() {
  try {
    const serviceAccount = readServiceAccountFromEnv();
    if (serviceAccount) {
      return {
        credential: cert(serviceAccount),
        projectId: resolveProjectId(serviceAccount),
      };
    }

    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL?.trim();
    const privateKey = normalizePrivateKey(process.env.FIREBASE_PRIVATE_KEY);
    const projectId = resolveProjectId();

    if (clientEmail && privateKey) {
      return {
        credential: cert({
          projectId,
          clientEmail,
          privateKey,
        }),
        projectId,
      };
    }
  } catch (error) {
    console.error('firebase credential build failed:', error?.message || error);
  }

  return null;
}

export function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const config = buildCredential();
  if (!config) {
    console.error('firebase admin: no valid credential in environment');
    return null;
  }

  try {
    return initializeApp({
      credential: config.credential,
      projectId: config.projectId,
    });
  } catch (error) {
    console.error('firebase admin init failed:', error?.message || error);
    return null;
  }
}

export async function probeFirebaseAdmin() {
  const app = getFirebaseAdminApp();
  if (!app) {
    return { appReady: false, firestoreReady: false, error: 'no_app' };
  }

  try {
    const { getFirestore } = await import('firebase-admin/firestore');
    const db = getFirestore(app);
    await db.collection('users').limit(1).get();
    return { appReady: true, firestoreReady: true };
  } catch (error) {
    return {
      appReady: true,
      firestoreReady: false,
      error: error?.code || error?.message || 'firestore_probe_failed',
    };
  }
}

export function apiErrorPayload(error) {
  const code = error?.code || error?.errorInfo?.code || 'UNKNOWN';
  if (process.env.NODE_ENV === 'production') {
    return {
      error: 'Unavailable',
      code: 'SERVICE_UNAVAILABLE',
    };
  }
  return {
    error: 'Unavailable',
    code: String(code),
    message: String(error?.message || error?.errorInfo?.message || 'Request failed').slice(0, 200),
  };
}

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getConfigStatus() {
  const sources = {
    path: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT_PATH?.trim()),
    json: Boolean(process.env.FIREBASE_SERVICE_ACCOUNT || process.env.FIREBASE_SERVICE_ACCOUNT_JSON),
    b64: Boolean(
      process.env.FIREBASE_SERVICE_ACCOUNT_B64 || process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
    ),
    split: Boolean(
      process.env.FIREBASE_CLIENT_EMAIL?.trim() && process.env.FIREBASE_PRIVATE_KEY?.trim()
    ),
  };

  const hasCredentialEnv = sources.path || sources.json || sources.b64 || sources.split;
  const credentialParses = Boolean(buildCredential());

  let fixHint = '';
  if (!hasCredentialEnv) {
    fixHint =
      'Add FIREBASE_SERVICE_ACCOUNT (one-line JSON) or FIREBASE_CLIENT_EMAIL + FIREBASE_PRIVATE_KEY in Vercel.';
  } else if (!credentialParses) {
    if (sources.path && !sources.json && !sources.b64 && !sources.split) {
      fixHint =
        'FIREBASE_SERVICE_ACCOUNT_PATH only works locally. Remove it on Vercel and add FIREBASE_SERVICE_ACCOUNT or split credentials.';
    } else if (sources.json) {
      fixHint =
        'FIREBASE_SERVICE_ACCOUNT is set but invalid. Re-paste as minified one-line JSON (run: npm run prepare:firebase-env).';
    } else if (sources.split) {
      fixHint =
        'FIREBASE_CLIENT_EMAIL or FIREBASE_PRIVATE_KEY is invalid. Ensure private key uses literal \\n between lines.';
    } else {
      fixHint = 'Firebase credential env var is present but could not be parsed.';
    }
  }

  return {
    hasCredentialEnv,
    credentialParses,
    hasAdminEmails: getAdminEmails().length > 0,
    sources,
    fixHint,
  };
}

export function getBearerToken(req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return null;
  }

  return authHeader.slice('Bearer '.length);
}

export function userFromDecodedToken(decoded) {
  const authTime = decoded.auth_time ? new Date(decoded.auth_time * 1000).toISOString() : null;

  return {
    uid: decoded.uid,
    email: decoded.email || '',
    displayName: decoded.name || decoded.email?.split('@')[0] || 'User',
    photoURL: decoded.picture || '',
    metadata: {
      lastSignInTime: authTime || new Date().toISOString(),
      creationTime: authTime,
    },
  };
}
