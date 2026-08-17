export const RECRUITMENT_EXAM_PATH = '/assessment';

/** Set to true to reopen Assessment L1 before the next scheduled window. */
export const ASSESSMENT_FORCE_OPEN = false;

/** Registrations close at this time (IST). Format: ISO 8601 with offset. */
export const ASSESSMENT_CLOSES_AT = '2026-08-19T21:00:00+05:30';

export function isAssessmentOpen() {
  if (ASSESSMENT_FORCE_OPEN) return true;
  return Date.now() < Date.parse(ASSESSMENT_CLOSES_AT);
}

export function getAssessmentClosedMessage() {
  return 'Assessment L1 registrations are currently closed. We will reopen when the next recruitment drive is announced.';
}

export const EXAM_TIME_LIMIT = 45 * 60; // 45 minutes
export const TOTAL_QUESTIONS = 45;
export const SECURITY_WARNINGS_LIMIT = 3;
export const MAX_PAN_PHOTO_BYTES = 900_000;
export const WEBCAM_CHECK_INTERVAL_MS = 3000;
export const WEBCAM_NO_FACE_STRIKES = 2;
export const WEBCAM_MOBILE_STRIKES = 2;
export const MOBILE_DETECTION_MIN_SCORE = 0.55;
export const MAX_PROCTORING_ERROR_LOG = 60;
