const { BAD_REQUEST } = require('../utils/errors');
const { userValidate } = require('./schemas');

const loginFieldsValidation = (req, res, next) => {
    const { email, password } = req.body;
    const data = email && password;
    if (!data) return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
    return next();
};

const newUserValidation = (req, res, next) => {
    const { body } = req;
    const { error } = userValidate(body);
    if (error) return res.status(BAD_REQUEST).json({ message: error.details[0].message });
    return next();
};

module.exports = {
    loginFieldsValidation,
    newUserValidation,
};