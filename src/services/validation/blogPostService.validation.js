const { NOT_FOUND } = require('../../utils/errors');

const blogPostValidation = async (post) => {
    if (!post) {
        return { type: NOT_FOUND, message: 'Post does not exist' };
    }
    return { type: null, message: '' };
};

const userValidation = async (post, user) => {
    if (!post) {
        return { type: NOT_FOUND, message: 'Post does not exist' };
    }
    if (post.userId !== user.id) {
        return { type: 401, message: 'Unauthorized user' };
    }
    return { type: null, message: '' };
};

module.exports = {
    blogPostValidation,
    userValidation,
};