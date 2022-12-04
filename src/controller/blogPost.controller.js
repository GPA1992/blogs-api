const jwt = require('jsonwebtoken');
const { blogPost } = require('../services');

const { CREATED, INTERNAL_SERVER_ERROR } = require('../utils/errors');

const secret = process.env.JWT_SECRET || 'seusecretdetoken';

const newPost = async (req, res) => {
try {
    const token = req.header('Authorization');
    const decoded = jwt.verify(token, secret);
    const id = decoded.data.userId;
    const { title, content, categoryIds } = req.body;
     
    const { type, message } = await blogPost.addNewPost(title, content, categoryIds, id);
    if (type) return res.status(type).json({ message });
    return res.status(CREATED).json(message);
} catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ 
        message: 'Erro interno', error: err.message });
}
};

module.exports = {
    newPost,
};
