const { NOT_FOUND } = require('../../utils/errors');

const blogPostValidation = async (post) => {
    if (!post) {
        return { type: NOT_FOUND, message: 'Post does not exist' };
    }
    return { type: null, message: '' };
};

module.exports = {
    blogPostValidation,
};