const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const chiTietPhieuNhapService = require('../services/chi-tiet-phieu-nhap.service');
const sanPhamService = require('../services/san-pham.service');
const chiTietPhieuNhapLogger = require('../loggers/chi-tiet-phieu-nhap.logger');

const getBySanPhamID = async (idSanPham, page, limit, from, to, sort) => {
    return chiTietPhieuNhapService.getBySanPhamID(idSanPham, page, limit, from, to, sort);
};

const all = async (from, to) => {
    return chiTietPhieuNhapService.all(from, to);
};

const create = async (idPhieuNhap, chiTietPhieuNhap, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(chiTietPhieuNhap.maSanPham)) {
        throw new UserInputError('Mã sản phẩm không hợp lệ');
    }
    await sanPhamService.checkIfExist([chiTietPhieuNhap.maSanPham]);

    const phieuNhap = await chiTietPhieuNhapService.create(idPhieuNhap, chiTietPhieuNhap, currentUser);
    await chiTietPhieuNhapLogger.create(phieuNhap, currentUser);
    return phieuNhap;
};

const update = async (idPhieuNhap, idChiTietPhieuNhap, chiTietPhieuNhap, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuNhap)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    await sanPhamService.checkIfExist([chiTietPhieuNhap.maSanPham]);

    const result = await chiTietPhieuNhapService.update(
        idPhieuNhap,
        idChiTietPhieuNhap,
        chiTietPhieuNhap,
        currentUser
    );
    await chiTietPhieuNhapLogger.update(result.phieuNhap, currentUser);
    return result;
};

const remove = async (idPhieuNhap, idChiTietPhieuNhap, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuNhap)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }

    const result = await chiTietPhieuNhapService.remove(idPhieuNhap, idChiTietPhieuNhap, currentUser);
    await chiTietPhieuNhapLogger.remove(result.phieuNhap, currentUser);
    return result;
};

module.exports = {
    getBySanPhamID,
    create,
    update,
    remove,
    all
};