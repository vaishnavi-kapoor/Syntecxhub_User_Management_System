export const sendSuccess = (res, statusCode, data) => {
  res.status(statusCode).json(data);
};
