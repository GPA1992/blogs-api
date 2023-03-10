const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../config/config');
const { BlogPost, PostCategory, User, Category } = require('../models');
const validation = require('./validation/blogPostService.validation');
const categoryValidation = require('./validation/categoriesService.validation');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);

const addNewPost = async (title, content, categoryIds, userId) => {
    const categoriesValidation = await categoryValidation.categoriesValidation(categoryIds);
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

const allPosts = () => {
try {
    const post = BlogPost.findAll({ 
        include: [
            { 
                model: User,
            as: 'user',
            attributes: { exclude: ['password'] },
        },
        { 
            model: Category,
            as: 'categories',
        },
    ] });
    
    return post;
} catch (err) {
    console.log(err);
    throw err;
}
};

const postById = async (postId) => {
    try {
        const post = await BlogPost.findOne({ 
            include: [{ 
                    model: User,
                    as: 'user',
                    attributes: { exclude: ['password'] },
                    where: { id: postId },
                },
                { model: Category,
                    as: 'categories' }],
                });
            const postValidation = await validation.blogPostValidation(post);
            if (postValidation.type) return postValidation;
           return { type: null, message: post };
    } catch (err) {
            console.log(err);
            throw err;
    }
   };
 
const editPostById = async (id, title, content) => {
    try {
    const post = await BlogPost.update({ title, content }, { where: { id } });
    
     return { type: null, message: post };
    } catch (err) {
        console.log(err);
        throw err;
    }
};  

const deletePostById = async (id, user) => {
    try {
    const post = await BlogPost.findOne({ where: { id } });    
    console.log(post);
    const postValidation = await validation.userValidation(post, user);
    if (postValidation.type) return postValidation;
    await BlogPost.destroy({ where: { id } });    
    return { type: null, message: '' };
    } catch (err) {
        console.log(err);
        throw err;
    }
};

const searchPost = async (anyPost) => {
    try {
        const post = await BlogPost.findAll({ where: { [Op.or]: [
                { title: { [Op.like]: `%${anyPost}%` } },
                { content: { [Op.like]: `%${anyPost}%` } },
            ] }, 
            include: [{ 
                model: User, as: 'user', attributes: { exclude: ['password'] } },
                {
                model: Category, as: 'categories' }] });
        return post;
    } catch (err) {
        console.log(err);
        throw err; 
    }
    };

module.exports = {
    addNewPost,
    allPosts,
    postById,
    editPostById,
    deletePostById,
    searchPost,
};