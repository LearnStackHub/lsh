export async function checkRecruitmentRegistration({ email, mobile }) {
  const response = await fetch('/api/recruitment-register-check', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, mobile }),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(
        import.meta.env.DEV
          ? 'Registration API is not running or is outdated. Stop the dev server (Ctrl+C) and run npm run dev again.'
          : 'Could not verify your registration details. Please try again.'
      );
    }
    throw new Error(data.error || 'Could not verify your registration details. Please try again.');
  }

  return data;
}

export async function submitRecruitmentExam(payload) {
  const response = await fetch('/api/recruitment-exam', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || 'Could not submit exam. Please try again.');
  }

  return data;
}
