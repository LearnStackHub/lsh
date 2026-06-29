import { auth } from '../config/firebase';

async function getAuthToken() {
  if (!auth?.currentUser) {
    throw new Error('Sign in required');
  }
  return auth.currentUser.getIdToken(true);
}

async function adminFetch(path) {
  const token = await getAuthToken();
  const response = await fetch(path, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const payload = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('You do not have permission to view recruitment submissions.');
    }
    throw new Error(payload.error || 'Could not load recruitment data.');
  }

  return payload;
}

export async function fetchRecruitmentSubmissions() {
  const payload = await adminFetch('/api/recruitment-exams');
  return payload.submissions || [];
}

export async function fetchRecruitmentSubmission(id) {
  const payload = await adminFetch(`/api/recruitment-exams?id=${encodeURIComponent(id)}`);
  return payload.submission;
}

export function downloadPanPhoto(dataUrl, candidateName, submissionId) {
  if (!dataUrl) {
    return;
  }

  const safeName = String(candidateName || 'candidate')
    .trim()
    .replace(/[^\w.-]+/g, '_')
    .slice(0, 40);
  const extension = dataUrl.includes('image/png') ? 'png' : 'jpg';
  const link = document.createElement('a');
  link.href = dataUrl;
  link.download = `pan_${safeName}_${submissionId.slice(0, 8)}.${extension}`;
  document.body.appendChild(link);
  link.click();
  link.remove();
}

export function formatDuration(seconds) {
  const total = Number(seconds || 0);
  if (!total) return '—';
  const minutes = Math.floor(total / 60);
  const secs = total % 60;
  return `${minutes}m ${secs}s`;
}
