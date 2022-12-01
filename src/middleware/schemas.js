const Joi = require('joi');

const userValidationJoi = Joi.object().keys({
    displayName: Joi.string().min(8).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    image: Joi.string(),
  });

const userValidate = (user) => userValidationJoi.validate(user);

module.exports = {
    userValidate,
};