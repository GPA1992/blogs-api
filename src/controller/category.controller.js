/* const jwt = require('jsonwebtoken'); */
const { categoryService } = require('../services');
const { /* OK, */ CREATED } = require('../utils/errors');

const createCategory = async (req, res) => {
    const { body } = req;
    const addCategory = await categoryService.newCategoryCreate(body);
    return res.status(CREATED).json(addCategory.message);
};

module.exports = {
    createCategory,
};