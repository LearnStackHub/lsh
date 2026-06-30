import { dispatchApi, normalizeApiPath } from './_dispatch.js';

export const config = {
  maxDuration: 30,
};

export default async function handler(req, res) {
  const apiPath = normalizeApiPath(req.query?.slug);
  await dispatchApi(req, res, apiPath);
}
