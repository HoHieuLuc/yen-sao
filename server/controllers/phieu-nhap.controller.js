const { UserInputError } = require('apollo-server');
const { checkIfDuplicateExists } = require('../utils/functions');
const phieuNhapService = require('../services/phieu-nhap.service');
const sanPhamService = require('../services/san-pham.service');

const getAll = async (page = 1, limit = 10, from = null, to = null, sort) => {
    return phieuNhapService.getAll(page, limit, from, to, sort);
};

const getById = async (id) => {
    return phieuNhapService.getById(id);
};


const create = async (chiTietPhieuNhap, nguoiNhap) => {
    const arrayOfSanPhamIds = chiTietPhieuNhap.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }
    await sanPhamService.checkIfExist(arrayOfSanPhamIds);

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