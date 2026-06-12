// Admin emails are configured via VITE_ADMIN_EMAILS in .env (local) and Vercel env vars (production).
// Never expose this list in the UI — access is checked silently on the client and enforced in Firestore/API.

export function getAdminEmails() {
  const configured = import.meta.env.VITE_ADMIN_EMAILS || '';
  return configured
    .split(',')
    .map((email) => email.trim().toLowerCase())
    .filter(Boolean);
}

export function isAdminEmail(email) {
  if (!email) {
    return false;
  }

  const admins = getAdminEmails();
  if (admins.length === 0) {
    return false;
  }

  return admins.includes(email.trim().toLowerCase());
}
