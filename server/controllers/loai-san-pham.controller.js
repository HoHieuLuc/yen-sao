const loaiSanPhamService = require('../services/loai-san-pham.service');

const getAll = async (page = 1, limit = 10) => {
    return loaiSanPhamService.getAll(page, limit);
};

const getById = async (id) => {
    return loaiSanPhamService.getById(id);
};

const create = async (loaiSanPhamData) => {
    return loaiSanPhamService.create(loaiSanPhamData);
};

const update = async (id, loaiSanPhamData) => {
    return loaiSanPhamService.update(id, loaiSanPhamData);
};

const remove = async (id) => {
    return loaiSanPhamService.remove(id);
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};