const jwt = require('jsonwebtoken');
const { BAD_REQUEST } = require('../utils/errors');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const blogPostFieldsValidation = (req, res, next) => {
    const { title, content } = req.body;
    if (!title || !content) {
        return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
    }
    return next();
};

const validateUser = async (req, res, next) => {
  try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, secret);

    if (decoded.data.userId !== 1) {
      return res.status(401).json({ message: 'Unauthorized user' });
    }
    
    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};

module.exports = {
    blogPostFieldsValidation,
    validateUser,
};