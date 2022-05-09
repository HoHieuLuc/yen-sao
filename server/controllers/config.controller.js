const configService = require('../services/config.service');

const getByName = async (name) => {
    return configService.getByName(name);
};

const createOrUpdate = async (name, content) => { 
    return configService.createOrUpdate(name, content);
};

module.exports = {
    getByName,
    createOrUpdate, 
};