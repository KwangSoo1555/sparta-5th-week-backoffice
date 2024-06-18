import Joi from "joi";
import { MESSAGES } from "../../constants/message.constant.js";

const schema = Joi.object({
  rating: Joi.string().messages({
    "any.required": MESSAGES.REVIEWS.COMMON.RATING.REQUIRED,
  }),
  content: Joi.string().messages({
    "any.required": MESSAGES.REVIEWS.COMMON.CONTENT.REQUIRED,
  }),
  imgUrl: Joi.string().messages({
    "any.required": MESSAGES.REVIEWS.COMMON.IMGURL.REQUIRED,
  }),
});

export const updateReviewValidator = async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    next();
  } catch (error) {
    next(error);
  }
};
