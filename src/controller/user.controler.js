require('dotenv/config');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const loginValidation = async (req, res) => {
    try {
    const { email, password } = req.body;
    const { type, message } = await userService.getByEmail(email, password);
    if (type) {
      return res.status(type).json({ message });
    }

    const jwtConfig = {
        expiresIn: '7d',
        algorithm: 'HS256',
      };
      const token = jwt.sign({ data: { userId: message.id } }, secret, jwtConfig);
    return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Erro interno', error: err.message });
    }
};

module.exports = {
    loginValidation,
};