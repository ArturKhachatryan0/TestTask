import Joi from "joi";

const signInSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

const signUpSchema = Joi.object({
  body: Joi.object({
    id: Joi.string().required(),
    password: Joi.string().required(),
  }),
});

export default {
  signInSchema,
  signUpSchema,
};
