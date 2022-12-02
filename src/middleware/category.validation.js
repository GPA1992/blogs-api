const { BAD_REQUEST } = require('../utils/errors');

const categoryFieldsValidation = (req, res, next) => {
    const { name } = req.body;
    if (!name) return res.status(BAD_REQUEST).json({ message: '"name" is required' });
    return next();
};

module.exports = {
    categoryFieldsValidation,
};