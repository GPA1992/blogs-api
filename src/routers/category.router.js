const express = require('express');

const category = require('../controller/category.controller');
const categoryValidation = require('../middleware/category.validation');
const validateJWT = require('../auth/validateJWT');

const router = express.Router();

router.post('/', validateJWT, categoryValidation.categoryFieldsValidation, category.createCategory);
router.get('/', validateJWT, category.allCategory);
module.exports = router;