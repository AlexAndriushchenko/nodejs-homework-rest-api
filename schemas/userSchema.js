const Joi = require("joi");

const signupSchema = Joi.object({
  password: Joi.string().min(3).max(10).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
  subscription: Joi.string().valid("starter", "pro", "business").optional(),
  token: Joi.string().optional(),
});

const emailSchema = Joi.object({
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

const loginSchema = Joi.object({
  password: Joi.string().min(3).max(10).required(),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required(),
});

const subscriptionSchema = Joi.object({
  subscription: Joi.string().valid("starter", "pro", "business").required(),
});

module.exports = { signupSchema, emailSchema, loginSchema, subscriptionSchema };
