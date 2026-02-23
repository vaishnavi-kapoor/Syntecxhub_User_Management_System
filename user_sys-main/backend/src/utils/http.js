import { CORS_HEADERS } from '../config/constants.js';

export const sendJson = (res, statusCode, body) => {
  res.writeHead(statusCode, {
    ...CORS_HEADERS,
    'Content-Type': 'application/json',
  });
  res.end(JSON.stringify(body));
};

export const sendEmpty = (res, statusCode) => {
  res.writeHead(statusCode, CORS_HEADERS);
  res.end();
};

export const parseBody = async (req) => {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);

  if (!chunks.length) return {};

  try {
    return JSON.parse(Buffer.concat(chunks).toString('utf8'));
  } catch {
    return {};
  }
};
