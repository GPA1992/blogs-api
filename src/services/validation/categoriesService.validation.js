const { BAD_REQUEST } = require('../../utils/errors');
const allCategories = require('../categories.service');

const categoriesValidation = async (categoriesIds) => {
    const categories = await allCategories.allCategory();
    const validation = categoriesIds.every((id) => (
        categories.some((category) => category.id === id)
    ));
    if (!validation) {
        return { type: BAD_REQUEST, message: 'one or more "categoryIds" not found' };
    }
    return { type: null, message: '' };
};

module.exports = {
    categoriesValidation,
};