export function notFound(req, res, next) {
  const error = new Error("Requested resource not found");
  res.status(404).json({ message: error.message });
  next(error);
}

export function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode ? res.statusCode : 500;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
}
