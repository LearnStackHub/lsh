import { FieldValue } from 'firebase-admin/firestore';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizeMobile(mobile) {
  return String(mobile || '').replace(/\D/g, '').slice(0, 10);
}

export function validateRecruitmentPayload(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }

  const name = String(body.name || '').trim();
  const email = normalizeEmail(body.email);
  const mobile = normalizeMobile(body.mobile);
  const studiedInGovt = body.studiedInGovt === 'yes' || body.studiedInGovt === true;
  const govtInstitutionName = String(body.govtInstitutionName || '').trim();
  const hasLshCertificate = body.hasLshCertificate === 'yes' || body.hasLshCertificate === true;
  const lshCertificateId = String(body.lshCertificateId || '').trim();
  const panPhotoDataUrl = String(body.panPhotoDataUrl || '').trim();

  if (name.length < 2) return { ok: false, error: 'Enter a valid name' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Enter a valid email' };
  if (!/^[6-9]\d{9}$/.test(mobile)) return { ok: false, error: 'Enter a valid mobile number' };
  if (studiedInGovt && !govtInstitutionName) {
    return { ok: false, error: 'Enter government institution name' };
  }
  if (hasLshCertificate && !lshCertificateId) {
    return { ok: false, error: 'Enter certificate ID' };
  }
  if (!panPhotoDataUrl.startsWith('data:image/')) {
    return { ok: false, error: 'PAN photo is required' };
  }
  if (panPhotoDataUrl.length > 1_200_000) {
    return { ok: false, error: 'Photo file is too large' };
  }

  const answers = body.answers && typeof body.answers === 'object' ? body.answers : {};
  const questions = Array.isArray(body.questions) ? body.questions : [];

  if (questions.length < 1) {
    return { ok: false, error: 'Exam answers missing' };
  }

  let correct = 0;
  questions.forEach((q, index) => {
    if (Number(answers[index]) === Number(q.correctAnswer)) {
      correct += 1;
    }
  });

  const total = questions.length;
  const percentage = total ? Math.round((correct / total) * 100) : 0;

  return {
    ok: true,
    data: {
      candidate: {
        name,
        email,
        mobile,
        studiedInGovt,
        govtInstitutionName: studiedInGovt ? govtInstitutionName : '',
        hasLshCertificate,
        lshCertificateId: hasLshCertificate ? lshCertificateId : '',
      },
      panPhotoDataUrl,
      answers,
      score: { correct, total, percentage },
      security: {
        tabSwitchCount: Number(body.security?.tabSwitchCount || 0),
        securityWarnings: Number(body.security?.securityWarnings || 0),
        autoSubmitted: Boolean(body.security?.autoSubmitted),
        reason: String(body.security?.reason || ''),
      },
      timeTakenSeconds: Number(body.timeTakenSeconds || 0),
    },
  };
}

export async function saveRecruitmentExam(db, payload) {
  const ref = db.collection('recruitmentExams').doc();
  const now = FieldValue.serverTimestamp();

  await ref.set({
    ...payload,
    status: 'submitted',
    submittedAt: now,
    createdAt: now,
  });

  return { id: ref.id };
}
