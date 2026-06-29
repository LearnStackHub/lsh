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
