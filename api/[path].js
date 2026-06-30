import { dispatchApi, resolveApiPath } from './_dispatch.js';

export const config = {
  maxDuration: 30,
};

export default async function handler(req, res) {
  const apiPath = resolveApiPath(req);
  await dispatchApi(req, res, apiPath);
}
