const { UserInputError } = require('apollo-server');
const Post = require('../models/Post');

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
    createPost
};