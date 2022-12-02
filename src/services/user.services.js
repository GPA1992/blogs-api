const { User } = require('../models');
const validation = require('./validation/userService.validation');

const getByEmail = async (email, password) => {
  const userByEmail = await User.findOne({ where: { email } });

  const userValidation = validation.userDataValidation(userByEmail, password);

  if (userValidation.type) return userValidation;

  return { type: null, message: userByEmail };
}; 

const getByUserId = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const createUser = async (newUser, email) => {
  const allusers = await User.findAll();
  const userValidation = await validation.newUserValidation(allusers, email);
  if (userValidation.type) return userValidation;
  const newUserAdd = await User.create(newUser);
  return { type: null, message: newUserAdd };
};

const getUSers = () => User.findAll({ attributes: { exclude: ['password'] } });

  module.exports = {
    getByEmail,
    getByUserId,
    createUser,
    getUSers,
  };