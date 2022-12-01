const { User } = require('../models');
const validation = require('./validation/userService.validation');

const getByEmail = async (email, password) => {
   const userByEmail = await User.findOne({ where: { email } });
   const userValidation = validation.userDataValidation(userByEmail, password);
  if (userValidation.type) return userValidation;
   return { type: null, message: userByEmail };
}; 

  module.exports = {
    getByEmail,
  };