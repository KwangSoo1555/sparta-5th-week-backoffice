import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const schema = Joi.object({
  rating: Joi.number().required().messages({
    "any.required": MESSAGES.REVIEWS.COMMON.RATING.REQUIRED,
  }),
  content: Joi.string().required().messages({
    "any.required": MESSAGES.REVIEWS.COMMON.CONTENT.REQUIRED,
  }),
  imgUrl: Joi.string().required().messages({
    "any.required": MESSAGES.REVIEWS.COMMON.IMGURL.REQUIRED,
  }),
});

export const createReviewValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
