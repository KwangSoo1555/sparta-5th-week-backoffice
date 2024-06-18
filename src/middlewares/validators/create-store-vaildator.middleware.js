import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const createStoreSchema = Joi.object({
storeid: Joi.number().trim().required().messages({
     "any.required": MESSAGES.STORES.COMMON.TITLE.REQUIRED,
}),
name: Joi.string().trim().required().messages({
    "any.required": MESSAGES.STORES.COMMON.TITLE.REQUIRED,
}),
category: Joi.string().trim(),
  address: Joi.string().trim(),
  storepictureurl: Joi.string().uri(),
  phone: Joi.string().trim(),
  content: Joi.string().trim(),
  dibscount: Joi.number().integer().min(0),
  reviewcount: Joi.number().integer().min(0),
  createddate: Joi.date().iso(),
  updateddate: Joi.date().iso(),
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
