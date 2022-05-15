const { UserInputError } = require('apollo-server');
const Page = require('../models/Page');

const getByName = async (name) => {
    return Page.findOne({
        name
    });
};

const createOrUpdate = async (name, content) => {
    try {
        const updatedPage = await Page.findOneAndUpdate(
            {
                name,
            },
            {
                content: JSON.stringify(content)
            },
            {
                upsert: true, new: true, runValidators: true
            }
        );
        return updatedPage;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getByName,
    createOrUpdate
};