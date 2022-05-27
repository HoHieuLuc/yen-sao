const { UserInputError } = require('apollo-server');
const sanPhamService = require('../services/san-pham.service');
const ChiTietPhieuNhap = require('../models/ChiTietPhieuNhap');
const ChiTietPhieuXuat = require('../models/ChiTietPhieuXuat');
const { escapeRegExp } = require('../utils/functions');
const sanPhamLogger = require('../loggers/san-pham.logger');

const getAll = async (page, limit, search = '', sort = '-createdAt', isFeatured, currentUser) => {
    return sanPhamService.getAll(
        page,
        limit,
        escapeRegExp(search),
        sort,
        isFeatured,
        !currentUser
    );
};

const getById = async (id, currentUser) => {
    return sanPhamService.getById(id, !currentUser);
};

const getBySlug = async (slug, currentUser) => {
    return sanPhamService.getBySlug(slug, !currentUser);
};

const create = async (sanPhamData, currentUser) => {
    const sanPham = await sanPhamService.create(sanPhamData);
    await sanPhamLogger.create(sanPham, currentUser);
    return sanPham;
};

const update = async (id, sanPhamData, currentUser) => {
    const sanPham = await sanPhamService.update(id, sanPhamData);
    if (!sanPham) {
        throw new UserInputError('Sản phẩm không tồn tại');
    }
    await sanPhamLogger.update(sanPham, currentUser);
    return sanPham;
};

const remove = async (id, currentUser) => {
    try {
        const phieuNhaps = await ChiTietPhieuNhap.exists({ maSanPham: id });
        const phieuXuats = await ChiTietPhieuXuat.exists({ maSanPham: id });
        if (phieuNhaps || phieuXuats) {
            throw new UserInputError('Bạn không thể xóa sản phẩm này');
        }
        const sanPham = await sanPhamService.remove(id);
        if (!sanPham) {
            throw new UserInputError('Sản phẩm không tồn tại');
        }
        await sanPhamLogger.remove(sanPham, currentUser);
        return sanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById,
    getBySlug,
};