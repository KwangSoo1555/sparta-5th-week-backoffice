import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const schema = Joi.object({
  email: Joi.string().messages({
    "any.required": MESSAGES
  }),
  name: Joi.string().messages({
    "any.required": MESSAGES
  }),
  currentPassword: Joi.string().messages({
    "any.required": MESSAGES
  }),
  newPassword: Joi.string().messages({
    "any.required": MESSAGES
  }),
  phone: Joi.string().messages({
    "any.required": MESSAGES
  }),
  address: Joi.string().messages({
    "any.required": MESSAGES
  }),
});

export const updateMenuValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
