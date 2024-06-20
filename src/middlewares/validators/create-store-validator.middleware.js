import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const createStoreSchema = Joi.object({
  name: Joi.string().trim().required().messages({
    "any.required": MESSAGES.STORES.COMMON.NAME.REQURIED,
  }),
  category: Joi.string().trim(),
  address: Joi.string(),
  storePictureUrl: Joi.string().uri(),
  phone: Joi.string().trim(),
  content: Joi.string().trim(),
});

export const validateCreateStore = async (req, res, next) => {
  try {
    await createStoreSchema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
