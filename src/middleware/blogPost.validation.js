const jwt = require('jsonwebtoken');
const { BAD_REQUEST, INTERNAL_ERROR, INTERNAL_SERVER_ERROR, OK } = require('../utils/errors');
const { blogPost } = require('../services');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const blogPostFieldsValidation = (req, res, next) => {
  try {
    const { title, content } = req.body;
    if (!title || !content) {
      return res.status(BAD_REQUEST).json({ message: 'Some required fields are missing' });
    }
    return next();
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error: err.message });
  }
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

const searchQueryValidate = async (req, res, next) => {
  const { q } = req.query;
    if (!q) return res.status(OK).json(await blogPost.allPosts());
    return next();
};

module.exports = {
    blogPostFieldsValidation,
    validateUser,
    searchQueryValidate,
};