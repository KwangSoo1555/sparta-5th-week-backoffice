// import Joi from "joi";
// import { MESSAGES } from "../../constants/message.constant.js";

<<<<<<< HEAD

// const schema = Joi.object({
//     name: Joi.string().required().messages({
//     "any.required": MESSAGES.MENUS.COMMON.NAME.REQUIRED,
//   }),
//   price: Joi.string().required().messages({
//     "any.required": MESSAGES.MENUS.COMMON.PRICE.REQUIRED,
//   }),
//   popularity: Joi.string().required().messages({
//     "any.required": MESSAGES.MENUS.COMMON.POPULALITY.REQUIRED,
//   }),
// });
=======
const schema = Joi.object({
  name: Joi.string().required().messages({
    "any.required": MESSAGES.MENUS.COMMON.NAME.REQUIRED,
  }),
  price: Joi.string().required().messages({
    "any.required": MESSAGES.MENUS.COMMON.PRICE.REQUIRED,
  }),
  popularity: Joi.string().required().messages({
    "any.required": MESSAGES.MENUS.COMMON.POPULALITY.REQUIRED,
  }),
});
>>>>>>> a838675d7f355a5f429b1044c1e9d51df9bc4972

// export const createMenuValidator = async (req, res, next) => {
//   try {
//     await schema.validateAsync(req.body);
//     next();
//   } catch (error) {
//     next(error);
//   }
// };
