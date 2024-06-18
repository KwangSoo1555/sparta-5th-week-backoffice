import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const createStoreSchema = Joi.object({
name: Joi.string().trim().required().messages({
    "any.required": MESSAGES.STORES.COMMON.TITLE.REQUIRED,
}),
category: Joi.string().trim(),
  address: Joi.string().trim(),
  store_picture_url: Joi.string().uri(),
  phone: Joi.string().trim(),
  content: Joi.string().trim(),
  dibs_count: Joi.number().integer().min(0),
  review_count: Joi.number().integer().min(0),
  created_date: Joi.date().iso(),
  updated_date: Joi.date().iso(),
  status: Joi.string().valid("active", "inactive"),
  rating: Joi.number().min(0).max(5),
});

export const validateCreateStore = async (req, res, next) => {
  try {
    await createStoreSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
