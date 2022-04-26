const { UserInputError } = require('apollo-server');
const { checkIfDuplicateExists } = require('../utils/functions');
const phieuNhapService = require('../services/phieu-nhap.service');

const getAll = async (page = 1, limit = 10) => {
    return phieuNhapService.getAll(page, limit);
};

const getById = async (id) => {
    return phieuNhapService.getById(id);
};


const create = async (chiTietPhieuNhap, nguoiNhap) => {
    const arrayOfSanPhamIds = chiTietPhieuNhap.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }

    return phieuNhapService.create(chiTietPhieuNhap, nguoiNhap);
};

const remove = async (phieuNhapId) => {
    return phieuNhapService.remove(phieuNhapId);
};

module.exports = {
    getById,
    getAll,
    create,
    remove
};