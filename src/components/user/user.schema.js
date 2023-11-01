const Joi = require("joi");

exports.createUserSchema = Joi.object({
  userID: Joi.string().email().required(),
  name: Joi.string().required(),
  password: Joi.string().required(),
});

exports.deleteUserSchema = Joi.object({
  id: Joi.string().email().required(),
});
