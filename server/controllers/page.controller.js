const pageService = require('../services/page.service');

const getAll = async () => {
    const allPages = await pageService.getAll();
    const allPagesWithKeyValue = allPages.map(item => ({
        [item.name]: item
    }));
    let data = {};
    allPagesWithKeyValue.forEach(item => {
        data = Object.assign(item, data);
    });
    return data;
};

const getByName = async (name) => {
    return pageService.getByName(name);
};

const createOrUpdate = async (name, content) => {
    return pageService.createOrUpdate(name, content);
};

module.exports = {
    getAll,
    getByName,
    createOrUpdate,
};