/* const jwt = require('jsonwebtoken'); */
const { categoryService } = require('../services');
const { OK, CREATED, INTERNAL_SERVER_ERROR } = require('../utils/errors');

const createCategory = async (req, res) => {
    try {
        const { body } = req;
        const addCategory = await categoryService.newCategoryCreate(body);
        return res.status(CREATED).json(addCategory.message);
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ 
            message: 'Erro interno', error: err.message });
    }
};

const allCategory = async (req, res) => {
    try {
    const categories = await categoryService.allCategory();
    return res.status(OK).json(categories);
    } catch (err) {
        return res.status(INTERNAL_SERVER_ERROR).json({ 
            message: 'Erro interno', error: err.message });
    }
};

module.exports = {
    createCategory,
    allCategory,
};