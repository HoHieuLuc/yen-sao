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


const create = async (ngayNhap, chiTietPhieuNhap, nguoiNhap) => {
    const arrayOfSanPhamIds = chiTietPhieuNhap.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }
    await sanPhamService.checkIfExist(arrayOfSanPhamIds);

    return phieuNhapService.create(ngayNhap, chiTietPhieuNhap, nguoiNhap);
};

const update = async (id, payload, currentUser) => {
    return phieuNhapService.update(id, payload, currentUser);
};

const remove = async (phieuNhapId, currentUser) => {
    return phieuNhapService.remove(phieuNhapId, currentUser);
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};