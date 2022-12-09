const jwt = require('jsonwebtoken');
const { blogPost } = require('../services');

const { CREATED, INTERNAL_SERVER_ERROR, OK,
     NO_CONTENT, INTERNAL_ERROR } = require('../utils/errors');

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
        message: INTERNAL_ERROR, error: err.message });
}
};

const allPosts = async (req, res) => {
  try {
      const posts = await blogPost.allPosts();
      return res.status(OK).json(posts);
  } catch (err) {
    return res.status(INTERNAL_SERVER_ERROR).json({ 
        message: INTERNAL_ERROR, error: err.message });
  }  
};

const postById = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message } = await blogPost.postById(id);
        if (type) res.status(type).json({ message });
        return res.status(OK).json(message);
    } catch (err) {
      return res.status(INTERNAL_SERVER_ERROR).json({ 
          message: INTERNAL_ERROR, error: err.message });
    }  
  };

const editPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        await blogPost.editPostById(id, title, content);
        const { type, message } = await blogPost.postById(id);
        if (type) return res.status(type).json({ message });
        return res.status(OK).json(message);
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ 
            message: INTERNAL_ERROR, error: err.message });
    }
};

const deletePostById = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message } = await blogPost.deletePostById(id);
        if (type) res.status(type).json({ message });
        return res.status(NO_CONTENT).json();
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ 
            message: INTERNAL_ERROR, error: err.message });
    }
};

module.exports = {
    newPost,
    allPosts,
    postById,
    editPostById,
    deletePostById,
};
