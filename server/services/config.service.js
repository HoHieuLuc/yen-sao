const { UserInputError } = require('apollo-server');
const Config = require('../models/Config');

const getByName = async (name) => {
    return Config.findOne({
        name: name
    });
};

const createOrUpdate = async (name, content) => {
    try {
        const updatedConfig = await Config.findOneAndUpdate(
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
        return updatedConfig;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getByName,
    createOrUpdate
};