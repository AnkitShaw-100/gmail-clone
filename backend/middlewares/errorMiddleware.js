const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  const response = {
    success: false,
    error: {
      message: err.message,
    },
  };
  if (process.env.NODE_ENV === "development") {
    response.error.stack = err.stack;
  }
  res.json(response);
};

export default errorHandler;
