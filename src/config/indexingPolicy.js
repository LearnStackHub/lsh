import indexingCandidates from './indexingCandidates.json';
import indexingOverrides from './indexingOverrides.json';

const normalizeFlag = (value) => String(value || '').trim().toLowerCase();

/**
 * Enable strict indexability gating only when explicitly requested.
 * Default stays permissive so we don't unexpectedly deindex content mid-review.
 */
export const isStrictIndexingPolicyEnabled = () => {
  const raw = import.meta.env.VITE_STRICT_INDEXING_POLICY;
  return ['1', 'true', 'yes', 'on'].includes(normalizeFlag(raw));
};

export const getIndexableTopicSet = () => {
  const merged = [
    ...(indexingCandidates.indexableTopicIds || []),
    ...(indexingOverrides.forceIndexTopicIds || []),
  ];
  return new Set(merged);
};
