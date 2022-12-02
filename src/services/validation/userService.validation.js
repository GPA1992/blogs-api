const { BAD_REQUEST, CONFLICT } = require('../../utils/errors');
/* const service = require('../user.services'); */

const userDataValidation = (user, password) => {
    if (!user) {
        return { type: BAD_REQUEST, message: 'Invalid fields' };
    }
    if (user.password !== password) {
        return { type: BAD_REQUEST, message: 'Invalid fields' };
    }
    return { type: null, message: '' };
};

const newUserValidation = async (allUser, email) => {
    const ifEmailAlreadyExists = allUser.some((user) => user.email === email);
    if (ifEmailAlreadyExists) {
        return { type: CONFLICT, message: 'User already registered' };
    }
    return { type: null, message: '' };
};

module.exports = {
    userDataValidation,
    newUserValidation,
};
