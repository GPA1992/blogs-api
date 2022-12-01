const jwt = require('jsonwebtoken');

require('dotenv/config');

/* const { UserService } = require('../services'); */

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

module.exports = async (req, res, next) => {
const token = req.header('Authorization');
if (!token) {
    return res.status(401).json({ error: 'Token não encontrado' });
}
  try {
    const decoded = jwt.verify(token, secret);
  
    if (!decoded) {
      return res.status(401).json({ message: 'Erro ao procurar usuário do token.' });
    }

    req.user = decoded;

    return next();
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};