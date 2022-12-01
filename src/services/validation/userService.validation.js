const { BAD_REQUEST } = require('../../utils/errors');

const userDataValidation = (user, password) => {
    if (!user) {
        return { type: BAD_REQUEST, message: 'Invalid fields' };
    }
    if (user.password !== password) {
        return { type: BAD_REQUEST, message: 'Invalid fields' };
    }
    return { type: null, message: '' };
};

module.exports = {
    userDataValidation,
};
