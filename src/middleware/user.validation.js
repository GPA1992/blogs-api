const { BAD_REQUEST } = require('../utils/errors');

const loginFieldsValidation = (req, res, next) => {
    const { email, password } = req.body;
    const data = email && password;
    if (!data) return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
    return next();
};

module.exports = {
    loginFieldsValidation,
};