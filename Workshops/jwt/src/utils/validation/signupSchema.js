const Joi = require('joi');

module.exports = Joi.object({
  name: Joi.string().min(3).max(30).required(),
  password: Joi.string()
    .min(6)
    .max(30)
    .regex(/^[a-zA-Z0-9]{3,30}$/)
    .required(),
  email: Joi.string().email().required(),
});
