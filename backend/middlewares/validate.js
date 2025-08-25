export const validateBody = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    res.status(400);
    return next(new Error(error.details.map((d) => d.message).join(", ")));
  }
  next();
};
