const Joi = require("joi");

const schema = Joi.object({
  userID: Joi.string().email().required(),
  password: Joi.string().min(5).required(),
});

module.exports = (req, res, next) => {
  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  next();
};
