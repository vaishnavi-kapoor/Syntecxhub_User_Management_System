export const notFoundHandler = (_req, res) => {
  res.status(404).json({ message: 'Not found' });
};

export const errorHandler = (err, _req, res, _next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  if (statusCode >= 500) {
    console.error('[error]', err);
  }

  res.status(statusCode).json({ message });
};
