const pageService = require('../services/page.service');

const getByName = async (name) => {
    return pageService.getByName(name);
};

const createOrUpdate = async (name, content) => { 
    return pageService.createOrUpdate(name, content);
};

module.exports = {
    getByName,
    createOrUpdate, 
};