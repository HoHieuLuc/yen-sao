const sanPhamService = require('../services/san-pham.service');

const getAll = async (page = 1, limit = 10) => {
    return sanPhamService.getAll(page, limit);
};

const getById = async (id) => {
    return sanPhamService.getById(id);
};

const create = async (sanPhamData) => {
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