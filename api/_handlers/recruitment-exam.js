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

    const { getFirebaseAdminApp } = await import('../_lib/firebaseAdmin.js');
    const { getFirestore } = await import('firebase-admin/firestore');
    const { parseJsonBody } = await import('../_lib/razorpay.js');
    const { validateRecruitmentPayload, saveRecruitmentExam } = await import('../_lib/recruitmentExams.js');

    const app = getFirebaseAdminApp();
    if (!app) {
      res.status(503).json({ error: 'Service unavailable' });
      return;
    }

    const body = parseJsonBody(req);
    const validation = validateRecruitmentPayload(body);
    if (!validation.ok) {
      res.status(400).json({ error: validation.error });
      return;
    }

    const db = getFirestore(app);
    const saved = await saveRecruitmentExam(db, validation.data);

    res.status(200).json({ ok: true, submissionId: saved.id });
  } catch (error) {
    const message = String(error?.message || error || '');
    console.error('recruitment-exam failed:', message);

    if (/longer than \d+ bytes|maximum allowed size|entity too large/i.test(message)) {
      res.status(400).json({ error: 'Photo file is too large. Retake or upload a smaller image.' });
      return;
    }

    res.status(503).json({ error: 'Could not save submission' });
  }
}
