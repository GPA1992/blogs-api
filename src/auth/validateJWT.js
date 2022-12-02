const jwt = require('jsonwebtoken');
const { User } = require('../models');
require('dotenv/config');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
const token = req.header('Authorization');
if (!token) {
    return res.status(401).json({ message: 'Token not found' });
}
  try {
    const decoded = jwt.verify(token, secret);
    const user = await User.findByPk(decoded.data.userId);
    req.user = user;

    return next();
  } catch (err) {
    return res.status(401).json({ message: 'Expired or invalid token' });
  }
};