const express = require('express');

const blogPost = require('../controller/blogPost.controller');
const blogPostValidation = require('../middleware/blogPost.validation');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, blogPostValidation.blogPostFieldsValidation, blogPost.newPost);

module.exports = router;