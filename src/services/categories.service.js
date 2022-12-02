const { Category } = require('../models');

const newCategoryCreate = async (newCategory) => {
    const addNewCategory = await Category.create(newCategory);
    return { type: null, message: addNewCategory };
};

const allCategory = () => Category.findAll();

module.exports = {
    newCategoryCreate,
    allCategory,
};