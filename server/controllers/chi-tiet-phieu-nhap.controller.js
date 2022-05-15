const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const chiTietPhieuNhapService = require('../services/chi-tiet-phieu-nhap.service');
const sanPhamService = require('../services/san-pham.service');

const getBySanPhamID = async (idSanPham, page = 1, limit = 10, from, to, sort) => {
    return chiTietPhieuNhapService.getBySanPhamID(idSanPham, page, limit, from, to, sort);
};

const create = async (idPhieuNhap, chiTietPhieuNhap, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(chiTietPhieuNhap.maSanPham)) {
        throw new UserInputError('Mã sản phẩm không hợp lệ');
    }
    await sanPhamService.checkIfExist([chiTietPhieuNhap.maSanPham]);

    return chiTietPhieuNhapService.create(idPhieuNhap, chiTietPhieuNhap, currentUser);
};

const update = async (idPhieuNhap, idChiTietPhieuNhap, chiTietPhieuNhap, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuNhap)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    await sanPhamService.checkIfExist([chiTietPhieuNhap.maSanPham]);

    return chiTietPhieuNhapService.update(
        idPhieuNhap,
        idChiTietPhieuNhap,
        chiTietPhieuNhap,
        currentUser
    );
};

const remove = async (idPhieuNhap, idChiTietPhieuNhap, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuNhap)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    return chiTietPhieuNhapService.remove(idPhieuNhap, idChiTietPhieuNhap, currentUser);
};

module.exports = {
    getBySanPhamID,
    create,
    update,
    remove,
};