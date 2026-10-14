import {
  ASSESSMENT_REGISTER_FALLBACK,
  ASSESSMENT_SUBMIT_FALLBACK,
  sanitizeAssessmentError,
} from '../recruitment/assessmentUserMessages';

function messageFromResponse(data, response, kind) {
  const fallback = kind === 'submit' ? ASSESSMENT_SUBMIT_FALLBACK : ASSESSMENT_REGISTER_FALLBACK;
  const serverMessage = typeof data?.error === 'string' ? data.error.trim() : '';

  if (response.status === 409 || response.status === 403) {
    return sanitizeAssessmentError(serverMessage || fallback, fallback);
  }

  if (response.status === 400 && serverMessage) {
    return sanitizeAssessmentError(serverMessage, fallback);
  }

  if (response.status === 404) {
    return import.meta.env.DEV
      ? 'Registration API is not running or is outdated. Stop the dev server (Ctrl+C) and run npm run dev again.'
      : ASSESSMENT_REGISTER_FALLBACK;
  }

  return sanitizeAssessmentError(serverMessage || fallback, fallback);
}

export async function checkRecruitmentRegistration({ email, mobile }) {
  let response;
  try {
    response = await fetch('/api/recruitment-register-check', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, mobile }),
    });
  } catch {
    throw new Error(ASSESSMENT_REGISTER_FALLBACK);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(messageFromResponse(data, response, 'register'));
  }

  return data;
}

export async function submitRecruitmentExam(payload) {
  let response;
  try {
    response = await fetch('/api/recruitment-exam', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error(ASSESSMENT_SUBMIT_FALLBACK);
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(messageFromResponse(data, response, 'submit'));
  }

  return data;
}
