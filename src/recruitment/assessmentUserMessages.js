import { sanitizeUserMessage } from '../utils/userFacingErrors';

export const ASSESSMENT_REGISTER_FALLBACK =
  'We could not verify your registration right now. Please check your connection and try again in a few minutes.';

export const ASSESSMENT_SUBMIT_FALLBACK =
  'We could not submit your exam right now. Please try again in a few minutes. If the problem continues, contact careers@learnstackhub.com.';

export const ASSESSMENT_PHOTO_FALLBACK =
  'Could not capture your photo. Check camera permissions and try again.';

const TECHNICAL =
  /vercel|firebase|firestore|cloud function|function_invocation|503|502|504|500|internal server|ECONNREFUSED|network error|failed to fetch|fetch failed|unexpected token|syntaxerror|typeerror|referenceerror|permission denied|index required|resource_exhausted|service account|credentials|\.env|npm run|local-api|\/api\/health|ERR_|environment variable|MISSING_/i;

function isAllowedAssessmentMessage(message) {
  const text = String(message || '').trim();
  if (!text || text.length > 320) return false;
  if (TECHNICAL.test(text)) return false;

  if (text.startsWith('Assessment L1 registrations')) return true;
  if (text.includes('already registered for Assessment L1')) return true;
  if (/^Enter (a valid|your)/i.test(text)) return true;
  if (/^Select /i.test(text)) return true;
  if (/^Capture /i.test(text)) return true;
  if (text.startsWith('Photo file is too large')) return true;
  if (text.startsWith('Could not verify your registration')) return true;
  if (text.startsWith('We could not verify your registration')) return true;
  if (text.startsWith('We could not save your submission')) return true;
  if (text.startsWith('Registration is temporarily unavailable')) return true;
  if (text.startsWith('Assessment is temporarily unavailable')) return true;

  return false;
}

/** Hide Firebase/Vercel/stack traces in production; keep validation & duplicate messages. */
export function sanitizeAssessmentError(message, fallback = ASSESSMENT_REGISTER_FALLBACK) {
  if (import.meta.env.DEV) {
    return message?.trim() || fallback;
  }

  const text = String(message || '').trim();
  if (isAllowedAssessmentMessage(text)) {
    return text;
  }

  if (!text || TECHNICAL.test(text)) {
    return fallback;
  }

  return sanitizeUserMessage(text, fallback);
}
