import { FieldValue } from 'firebase-admin/firestore';

function normalizeEmail(email) {
  return String(email || '').trim().toLowerCase();
}

function normalizeMobile(mobile) {
  return String(mobile || '').replace(/\D/g, '').slice(0, 10);
}

function sanitizeProctoringErrors(items, maxItems = 60) {
  if (!Array.isArray(items)) return [];

  return items.slice(0, maxItems).map((item) => {
    const entry = {
      type: String(item?.type || '').slice(0, 40),
      message: String(item?.message || '').slice(0, 240),
      at: String(item?.at || ''),
    };

    if (item?.faceCount != null && Number.isFinite(Number(item.faceCount))) {
      entry.faceCount = Number(item.faceCount);
    }
    if (item?.confidence != null && Number.isFinite(Number(item.confidence))) {
      entry.confidence = Math.round(Number(item.confidence) * 100) / 100;
    }
    if (item?.strike != null && Number.isFinite(Number(item.strike))) {
      entry.strike = Number(item.strike);
    }
    if (item?.warningIssued === true) {
      entry.warningIssued = true;
    }

    return entry;
  }).filter((item) => item.type && item.message);
}

function normalizeWebcamSecurity(webcam) {
  const source = webcam && typeof webcam === 'object' ? webcam : {};

  return {
    checks: Number(source.checks || 0),
    faceVisibleChecks: Number(source.faceVisibleChecks || 0),
    noFaceEvents: Number(source.noFaceEvents || 0),
    multipleFaceEvents: Number(source.multipleFaceEvents || 0),
    cameraOffEvents: Number(source.cameraOffEvents || 0),
    darkFrameEvents: Number(source.darkFrameEvents || 0),
    mobileDetectedEvents: Number(source.mobileDetectedEvents || 0),
    faceErrors: sanitizeProctoringErrors(source.faceErrors),
    mobileErrors: sanitizeProctoringErrors(source.mobileErrors),
  };
}

export function validateRecruitmentPayload(body) {
  if (!body || typeof body !== 'object') {
    return { ok: false, error: 'Invalid request body' };
  }

  const name = String(body.name || '').trim();
  const email = normalizeEmail(body.email);
  const mobile = normalizeMobile(body.mobile);
  const experience = String(body.experience || '').trim();
  const studiedInGovt = body.studiedInGovt === 'yes' || body.studiedInGovt === true;
  const govtInstitutionName = String(body.govtInstitutionName || '').trim();
  const hasLshCertificate = body.hasLshCertificate === 'yes' || body.hasLshCertificate === true;
  const lshCertificateId = String(body.lshCertificateId || '').trim();
  const panPhotoDataUrl = String(body.panPhotoDataUrl || '').trim();

  if (name.length < 2) return { ok: false, error: 'Enter a valid name' };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, error: 'Enter a valid email' };
  if (!/^[6-9]\d{9}$/.test(mobile)) return { ok: false, error: 'Enter a valid mobile number' };
  const allowedExperience = ['fresher', '0-1', '1-2', '2-3', '3-5', '5+'];
  if (!allowedExperience.includes(experience)) {
    return { ok: false, error: 'Select a valid experience range' };
  }
  if (studiedInGovt && !govtInstitutionName) {
    return { ok: false, error: 'Enter government institution name' };
  }
  if (hasLshCertificate && !lshCertificateId) {
    return { ok: false, error: 'Enter certificate ID' };
  }
  if (!panPhotoDataUrl.startsWith('data:image/')) {
    return { ok: false, error: 'PAN photo is required' };
  }
  if (panPhotoDataUrl.length > 480_000) {
    return { ok: false, error: 'Photo file is too large. Retake or upload a smaller image.' };
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
        experience,
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
        webcam: normalizeWebcamSecurity(body.security?.webcam),
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

function toIsoString(value) {
  if (!value) return null;
  if (typeof value.toDate === 'function') {
    return value.toDate().toISOString();
  }
  if (value instanceof Date) {
    return value.toISOString();
  }
  return null;
}

export function mapSubmissionSummary(id, data) {
  const candidate = data.candidate || {};
  const score = data.score || {};

  return {
    id,
    name: candidate.name || '',
    email: candidate.email || '',
    mobile: candidate.mobile || '',
    experience: candidate.experience || '',
    studiedInGovt: Boolean(candidate.studiedInGovt),
    govtInstitutionName: candidate.govtInstitutionName || '',
    hasLshCertificate: Boolean(candidate.hasLshCertificate),
    lshCertificateId: candidate.lshCertificateId || '',
    scoreCorrect: Number(score.correct || 0),
    scoreTotal: Number(score.total || 0),
    scorePercentage: Number(score.percentage || 0),
    timeTakenSeconds: Number(data.timeTakenSeconds || 0),
    tabSwitchCount: Number(data.security?.tabSwitchCount || 0),
    securityWarnings: Number(data.security?.securityWarnings || 0),
    autoSubmitted: Boolean(data.security?.autoSubmitted),
    securityReason: data.security?.reason || '',
    webcamChecks: Number(data.security?.webcam?.checks || 0),
    webcamFaceVisible: Number(data.security?.webcam?.faceVisibleChecks || 0),
    webcamNoFaceEvents: Number(data.security?.webcam?.noFaceEvents || 0),
    webcamMultipleFaceEvents: Number(data.security?.webcam?.multipleFaceEvents || 0),
    webcamCameraOffEvents: Number(data.security?.webcam?.cameraOffEvents || 0),
    webcamMobileEvents: Number(data.security?.webcam?.mobileDetectedEvents || 0),
    webcamFaceErrorLogCount: Array.isArray(data.security?.webcam?.faceErrors)
      ? data.security.webcam.faceErrors.length
      : 0,
    webcamMobileErrorLogCount: Array.isArray(data.security?.webcam?.mobileErrors)
      ? data.security.webcam.mobileErrors.length
      : 0,
    status: data.status || 'submitted',
    submittedAt: toIsoString(data.submittedAt) || toIsoString(data.createdAt),
    hasPanPhoto: Boolean(data.panPhotoDataUrl),
  };
}

export function mapSubmissionDetail(id, data) {
  const webcam = data.security?.webcam || {};

  return {
    ...mapSubmissionSummary(id, data),
    answers: data.answers || {},
    securityReason: data.security?.reason || '',
    panPhotoDataUrl: data.panPhotoDataUrl || '',
    webcamFaceErrors: Array.isArray(webcam.faceErrors) ? webcam.faceErrors : [],
    webcamMobileErrors: Array.isArray(webcam.mobileErrors) ? webcam.mobileErrors : [],
  };
}

export async function listRecruitmentExams(db, limit = 200) {
  const mapDocs = (snapshot) =>
    snapshot.docs.map((entry) => mapSubmissionSummary(entry.id, entry.data()));

  try {
    const snapshot = await db
      .collection('recruitmentExams')
      .orderBy('submittedAt', 'desc')
      .limit(limit)
      .get();

    return mapDocs(snapshot);
  } catch (error) {
    const code = String(error?.code || '');
    if (code !== '9' && code !== 'failed-precondition') {
      throw error;
    }

    const snapshot = await db.collection('recruitmentExams').limit(limit).get();
    return mapDocs(snapshot).sort((a, b) => {
      const aTime = a.submittedAt ? Date.parse(a.submittedAt) : 0;
      const bTime = b.submittedAt ? Date.parse(b.submittedAt) : 0;
      return bTime - aTime;
    });
  }
}

export async function getRecruitmentExamById(db, id) {
  const snapshot = await db.collection('recruitmentExams').doc(id).get();
  if (!snapshot.exists) {
    return null;
  }
  return mapSubmissionDetail(snapshot.id, snapshot.data());
}
