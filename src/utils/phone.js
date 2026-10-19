/** Client-side Indian mobile normalization (10 digits). */
export function normalizeIndianPhone(value) {
  const digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 && digits.startsWith('91')) {
    return digits.slice(2);
  }
  if (digits.length === 11 && digits.startsWith('0')) {
    return digits.slice(1);
  }
  if (digits.length === 10) {
    return digits;
  }
  return '';
}

export function isValidIndianPhone(value) {
  return normalizeIndianPhone(value).length === 10;
}
