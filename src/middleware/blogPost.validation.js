const { BAD_REQUEST } = require('../utils/errors');

const blogPostFieldsValidation = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
    }
    return next();
};

module.exports = {
    blogPostFieldsValidation,
};