import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : '';

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const payload = jwt.verify(token, env.jwtSecret);
    req.auth = { userId: payload.userId };
    return next();
  } catch {
    return res.status(401).json({ message: 'Unauthorized' });
  }
};

export const requireOwnership = (req, res, next) => {
  if (req.auth.userId !== req.params.id) {
    return res.status(403).json({ message: 'Forbidden' });
  }
  return next();
};
