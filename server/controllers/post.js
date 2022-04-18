const { UserInputError } = require('apollo-server');
const Post = require('../models/Post');

const getAllPost = async (page, limit) => {
    const options = {
        page,
        limit,
        populate: 'createdBy',
        sort: '-createdAt'
    };
    const allPosts = await Post.paginate({}, options);
    return allPosts;
};

const createPost = async (newPost, userId) => {
    try {
        const post = await Post.create({
            ...newPost,
            createdBy: userId
        });
        const addedPost = await Post.findById(post._id).populate('createdBy');
        return addedPost;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    createPost,
    getAllPost
};