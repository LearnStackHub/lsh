function escapeCsv(value) {
  const str = String(value ?? '');
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function formatSubmissionTypeForExport(row) {
  if (row.autoSubmitted) {
    const reason = String(row.securityReason || '').trim();
    return reason ? `Auto-submitted — ${reason}` : 'Auto-submitted';
  }
  return 'Manual';
}

/**
 * Excel-compatible CSV download (UTF-8 BOM).
 */
export function downloadRecruitmentExcel(rows, { formatExperience, formatDate, formatDuration }) {
  const columns = [
    { label: 'Name', get: (r) => r.name },
    { label: 'Email', get: (r) => r.email },
    { label: 'Mobile', get: (r) => r.mobile },
    { label: 'Experience', get: (r) => formatExperience(r.experience) },
    { label: 'Score', get: (r) => `${r.scoreCorrect}/${r.scoreTotal}` },
    { label: 'Score %', get: (r) => r.scorePercentage },
    { label: 'Time taken', get: (r) => formatDuration(r.timeTakenSeconds) },
    { label: 'Govt institute', get: (r) => (r.studiedInGovt ? 'Yes' : 'No') },
    { label: 'Institution name', get: (r) => r.govtInstitutionName || '' },
    { label: 'LSH certificate', get: (r) => (r.hasLshCertificate ? 'Yes' : 'No') },
    { label: 'Certificate ID', get: (r) => r.lshCertificateId || '' },
    { label: 'Submission type', get: (r) => formatSubmissionTypeForExport(r) },
    { label: 'Security warnings', get: (r) => r.securityWarnings ?? 0 },
    { label: 'Tab switches', get: (r) => r.tabSwitchCount ?? 0 },
    { label: 'Face error log', get: (r) => r.webcamFaceErrorLogCount ?? 0 },
    { label: 'Mobile error log', get: (r) => r.webcamMobileErrorLogCount ?? 0 },
    { label: 'Submitted at', get: (r) => formatDate(r.submittedAt) },
    { label: 'Submission ID', get: (r) => r.id },
  ];

  const lines = [
    columns.map((col) => escapeCsv(col.label)).join(','),
    ...rows.map((row) => columns.map((col) => escapeCsv(col.get(row))).join(',')),
  ];

  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([`\uFEFF${lines.join('\r\n')}`], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `assessment-l1-submissions-${stamp}.csv`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}
