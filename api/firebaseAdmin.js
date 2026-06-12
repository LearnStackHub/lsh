import { cert, getApps, initializeApp } from 'firebase-admin/app';

function normalizePrivateKey(key) {
  if (!key) {
    return '';
  }

  return String(key).replace(/\\n/g, '\n');
}

function parseServiceAccount(raw) {
  if (!raw) {
    return null;
  }

  const trimmed = raw.trim();
  const candidates = [trimmed, trimmed.replace(/\r?\n/g, '')];

  for (const candidate of candidates) {
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
  const serviceAccount = parseServiceAccount(process.env.FIREBASE_SERVICE_ACCOUNT);
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

  return null;
}

export function getFirebaseAdminApp() {
  if (getApps().length > 0) {
    return getApps()[0];
  }

  const config = buildCredential();
  if (!config) {
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

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
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
