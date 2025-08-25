import Joi from "joi";

export const createEmailSchema = Joi.object({
  to: Joi.string().email().required(),
  subject: Joi.string().min(1).max(200).required(),
  body: Joi.string().max(5000).required(),
  read: Joi.boolean().optional(),
});
