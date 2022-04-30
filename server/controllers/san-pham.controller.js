const sanPhamService = require('../services/san-pham.service');
const { escapeRegExp } = require('../utils/functions');

const getAll = async (page = 1, limit = 10, search = '') => {
    return sanPhamService.getAll(page, limit, escapeRegExp(search));
};

const getById = async (id) => {
    return sanPhamService.getById(id);
};

const create = async (sanPhamData) => {
    console.log(sanPhamData);
    return sanPhamService.create(sanPhamData);
};

const update = async (id, sanPhamData) => {
    return sanPhamService.update(id, sanPhamData);
};

module.exports = {
    getById,
    getAll,
    create,
    update,
};