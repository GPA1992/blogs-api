require('dotenv/config');
const jwt = require('jsonwebtoken');
const { userService } = require('../services');
const { OK, CREATED, INTERNAL_SERVER_ERROR,
   INTERNAL_ERROR, NO_CONTENT } = require('../utils/errors');

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
    return res.status(OK).json({ token });
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ 
        message: INTERNAL_ERROR, error: err.message });
    }
};

const addNewUser = async (req, res) => {
  try {
  const { body } = req;

  const { type, message } = await userService.createUser(body, body.email);

  if (type) {
    return res.status(type).json({ message });
  }

  const jwtConfig = {
    expiresIn: '7d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ data: { userId: message.id } }, secret, jwtConfig);

    return res.status(CREATED).json({ token });
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

const getAlluser = async (_req, res) => {
  try {
    const users = await userService.getUSers();
    return res.status(OK).json(users);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, message } = await userService.getByUserIdWhitoutPassword(id);
    if (type) return res.status(type).json({ message });
    return res.status(OK).json(message);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

const deleteMainUser = async (req, res) => {
  try {
    const token = req.header('Authorization');

    const decoded = jwt.verify(token, secret);

    const { userId } = decoded.data;

    const { type, message } = userService.deleteMainUser(userId);

    if (type) return res.status(type).json({ message });

    return res.status(NO_CONTENT).json(message);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ message: INTERNAL_ERROR, error: err.message });
  }
};

module.exports = {
    loginValidation,
    addNewUser,
    getAlluser,
    getUserById,
    deleteMainUser,
};