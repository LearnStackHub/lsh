export async function fetchPublicPaymentSettings() {
  const response = await fetch('/api/payment-settings');
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.error || 'Could not load payment settings');
  }
  return payload;
}

async function adminFetch(path, options = {}) {
  const { auth } = await import('../config/firebase');
  if (!auth?.currentUser) {
    throw new Error('Sign in required');
  }
  const token = await auth.currentUser.getIdToken(true);
  const response = await fetch(path, {
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    if (response.status === 403) {
      throw new Error('You do not have permission to change payment settings.');
    }
    throw new Error(payload.error || 'Could not update payment settings.');
  }
  return payload;
}

export async function fetchAdminPaymentSettings() {
  return adminFetch('/api/admin-payment-settings');
}

export async function updateAdminPaymentGateway(activeGateway) {
  return adminFetch('/api/admin-payment-settings', {
    method: 'PUT',
    body: JSON.stringify({ activeGateway }),
  });
}
