const Sequelize = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory } = require('../models');
const validation = require('./validation/categoriesService.validation');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const addNewPost = async (title, content, categoryIds, userId) => {
    const categoriesValidation = await validation.categoriesValidation(categoryIds);
    if (categoriesValidation.type) return categoriesValidation;
    try {
        const result = await sequelize.transaction(async (t) => {
            const newPost = await BlogPost.create({ 
                title, content, userId },
                { transaction: t });

            const categories = categoryIds.map((categorieId) => PostCategory.create({ 
                categoryId: categorieId, postId: newPost.id }, { transaction: t }));
            await Promise.all(categories);
            
            return newPost;
        });
        return { type: null, message: result };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

module.exports = {
    addNewPost,
};