export const config = {
  maxDuration: 30,
};

async function verifyAdminRequest(req) {
  const authHeader = req.headers.authorization || '';
  if (!authHeader.startsWith('Bearer ')) {
    return { error: { status: 401, body: { error: 'Unauthorized' } } };
  }

  const { getAdminEmails, getConfigStatus, getFirebaseAdminApp } = await import('../_lib/firebaseAdmin.js');
  const allowedEmails = getAdminEmails();
  if (allowedEmails.length === 0) {
    return { error: { status: 503, body: { error: 'Not configured', code: 'MISSING_ADMIN_EMAILS' } } };
  }

  const app = getFirebaseAdminApp();
  if (!app) {
    const status = getConfigStatus();
    return {
      error: {
        status: 503,
        body: {
          error: 'Not configured',
          code: status.hasCredentialEnv ? 'INVALID_FIREBASE_CREDENTIAL' : 'MISSING_FIREBASE_CREDENTIAL',
        },
      },
    };
  }

  const { getAuth } = await import('firebase-admin/auth');
  const token = authHeader.slice('Bearer '.length);
  const auth = getAuth(app);
  const decoded = await auth.verifyIdToken(token);
  const email = decoded.email?.toLowerCase() || '';

  if (!allowedEmails.includes(email)) {
    return { error: { status: 403, body: { error: 'Forbidden' } } };
  }

  const { getFirestore } = await import('firebase-admin/firestore');
  return { app, db: getFirestore(app) };
}

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'GET') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const verified = await verifyAdminRequest(req);
    if (verified.error) {
      res.status(verified.error.status).json(verified.error.body);
      return;
    }

    const { listRecruitmentExamsForAdmin, getRecruitmentExamById } = await import(
      '../_lib/recruitmentExams.js'
    );
    const submissionId = String(req.query?.id || '').trim();

    if (submissionId) {
      const submission = await getRecruitmentExamById(verified.db, submissionId);
      if (!submission) {
        res.status(404).json({ error: 'Submission not found' });
        return;
      }
      res.status(200).json({ submission });
      return;
    }

    const result = await listRecruitmentExamsForAdmin(verified.db);
    res.status(200).json({
      submissions: result.submissions,
      count: result.submissions.length,
      totalCount: result.totalCount,
      truncated: result.truncated,
      limit: result.limit,
    });
  } catch (error) {
    const code = error?.code || '';
    if (code.startsWith('auth/')) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }

    console.error('recruitment-exams list failed:', error?.message || error, error?.code || '');
    if (String(error?.code || '') === '9' || String(error?.code || '') === 'failed-precondition') {
      res.status(503).json({
        error: 'Firestore index required for recruitment submissions. Check server logs.',
        code: 'MISSING_FIRESTORE_INDEX',
      });
      return;
    }

    res.status(503).json({ error: 'Unavailable' });
  }
}
