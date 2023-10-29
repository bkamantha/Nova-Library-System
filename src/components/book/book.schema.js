const Joi = require("joi");

const createbookSchema = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  totalCopies: Joi.number().integer().min(1).required(),
});

const updatebookSchema = Joi.object({
  id: Joi.string().required(),
  name: Joi.string().min(3).max(30),
  totalCopies: Joi.number().integer().min(1),
});

module.exports = { createbookSchema, updatebookSchema };
