const { UserInputError } = require('apollo-server');
const sanPhamService = require('../services/san-pham.service');
const ChiTietPhieuNhap = require('../models/ChiTietPhieuNhap');
const ChiTietPhieuXuat = require('../models/ChiTietPhieuXuat');
const { escapeRegExp } = require('../utils/functions');

const getAll = async (page = 1, limit = 10, search = '', sort = '-createdAt') => {
    return sanPhamService.getAll(page, limit, escapeRegExp(search), sort);
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

const remove = async (id) => {
    try {
        // kiểm tra xem sản phẩm có phiếu nhập hay phiếu xuất không
        const phieuNhaps = await ChiTietPhieuNhap.find({ maSanPham: id });
        const phieuXuats = await ChiTietPhieuXuat.find({ maSanPham: id });
        if (phieuNhaps.length > 0 || phieuXuats.length > 0) {
            throw new UserInputError('Bạn không thể xóa sản phẩm này');
        }
        return sanPhamService.remove(id);
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove
};