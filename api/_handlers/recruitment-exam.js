export const config = {
  maxDuration: 30,
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
    const { validateRecruitmentPayload, saveRecruitmentExam, findRecruitmentDuplicate } = await import('../_lib/recruitmentExams.js');

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Assessment is temporarily unavailable. Please try again shortly.' });
      return;
    }

    const body = parseJsonBody(req);
    const validation = validateRecruitmentPayload(body);
    if (!validation.ok) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const db = getFirestore(app);
    const duplicate = await findRecruitmentDuplicate(
      db,
      validation.data.candidate.email,
      validation.data.candidate.mobile
    );
    if (duplicate) {
      res.status(409).json({ error: duplicate.error, field: duplicate.field });
      return;
    }

    const saved = await saveRecruitmentExam(db, validation.data);

    res.status(200).json({ ok: true, submissionId: saved.id });
  } catch (error) {
    const message = String(error?.message || error || '');
    console.error('recruitment-exam failed:', message);

    if (/longer than \d+ bytes|maximum allowed size|entity too large/i.test(message)) {
      res.status(400).json({ error: 'Photo file is too large. Retake or upload a smaller image.' });
      return;
    }

    res.status(503).json({
      error: 'We could not save your submission. Please try again in a few minutes.',
    });
  }
}
