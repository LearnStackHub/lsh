import { getRedirectResult } from 'firebase/auth';

let redirectResultPromise = null;

/** React Strict Mode runs effects twice — only consume the redirect result once. */
export function consumeRedirectResult(auth) {
  if (!auth) {
    return Promise.resolve(null);
  }

  if (!redirectResultPromise) {
    redirectResultPromise = getRedirectResult(auth).catch((error) => {
      redirectResultPromise = null;
      throw error;
    });
  }

  return redirectResultPromise;
}
