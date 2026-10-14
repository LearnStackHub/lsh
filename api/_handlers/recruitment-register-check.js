export const config = {
  maxDuration: 15,
};

export default async function handler(req, res) {
  res.setHeader('Content-Type', 'application/json');

  try {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' });
      return;
    }

    const { getAssessmentClosedMessage, isAssessmentOpen } = await import(
      '../../src/recruitment/config.js'
    );
    if (!isAssessmentOpen()) {
      res.status(403).json({ error: getAssessmentClosedMessage() });
      return;
    }

    const { getFirebaseAdminApp } = await import('../_lib/firebaseAdmin.js');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { parseJsonBody } = await import('../_lib/razorpay.js');
    const { findRecruitmentDuplicate, validateRegistrationContact } = await import(
      '../_lib/recruitmentExams.js'
    );

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Registration is temporarily unavailable. Please try again shortly.' });
      return;
    }

    const body = parseJsonBody(req);
    const validation = validateRegistrationContact(body);
    if (!validation.ok) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const db = getFirestore(app);
    const duplicate = await findRecruitmentDuplicate(db, validation.email, validation.mobile);
    if (duplicate) {
      res.status(409).json({ error: duplicate.error, field: duplicate.field });
      return;
    }

    res.status(200).json({ ok: true });
  } catch (error) {
    console.error('recruitment-register-check failed:', error?.message || error);
    res.status(503).json({
      error: 'We could not verify your registration right now. Please try again shortly.',
    });
  }
}
