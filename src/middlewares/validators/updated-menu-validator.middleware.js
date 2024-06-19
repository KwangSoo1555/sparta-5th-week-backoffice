import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": MESSAGES.MENUS.COMMON.NAME.REQUIRED,
  }),
  price: Joi.number().required().messages({
    "any.required": MESSAGES.MENUS.COMMON.PRICE.REQUIRED,
  }),
  popularity: Joi.number().required().messages({
    "any.required": MESSAGES.MENUS.COMMON.POPULALITY.REQUIRED,
  }),
  imgUrl: Joi.string().required().messages({
    "any.required": MESSAGES.MENUS.COMMON.POPULALITY.REQUIRED,
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
