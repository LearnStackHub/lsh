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

  if (value.includes('\\n')) {
    value = value.replace(/\\n/g, '\n');
  }

  return value;
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

  return null;
}

function readServiceAccountFromEnv() {
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

export function getAdminEmails() {
  return (process.env.ADMIN_EMAILS || process.env.VITE_ADMIN_EMAILS || '')
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function getConfigStatus() {
  const hasJson = Boolean(
    process.env.FIREBASE_SERVICE_ACCOUNT ||
      process.env.FIREBASE_SERVICE_ACCOUNT_JSON ||
      process.env.FIREBASE_SERVICE_ACCOUNT_B64 ||
      process.env.FIREBASE_SERVICE_ACCOUNT_BASE64
  );
  const hasSplit = Boolean(
    process.env.FIREBASE_CLIENT_EMAIL?.trim() && process.env.FIREBASE_PRIVATE_KEY?.trim()
  );

  return {
    hasCredentialEnv: hasJson || hasSplit,
    credentialParses: Boolean(buildCredential()),
    hasAdminEmails: getAdminEmails().length > 0,
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
