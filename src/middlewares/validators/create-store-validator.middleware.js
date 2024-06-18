import Joi from "joi";
// import { MESSAGES } from "../../constants/message.constant.js";

const createStoreSchema = Joi.object({
  storeId: Joi.number().required().messages({
    "any.required": "MESSAGES.STORES.COMMON.STOREID.REQURIED",
  }),
  name: Joi.string().trim().required().messages({
    "any.required": "MESSAGES.STORES.COMMON.NAME.REQURIED",
  }),
  category: Joi.string().trim(),
  address: Joi.string(),
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
