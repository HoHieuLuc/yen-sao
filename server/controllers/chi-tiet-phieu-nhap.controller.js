const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const PhieuNhap = require('../models/PhieuNhap');
const chiTietPhieuNhapService = require('../services/chi-tiet-phieu-nhap.service');

const create = async (idPhieuNhap, chiTietPhieuNhap) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }

    if (!mongoose.isValidObjectId(chiTietPhieuNhap.maSanPham)) {
        throw new UserInputError('Mã sản phẩm không hợp lệ');
    }

    // nếu tìm thấy phiếu nhập và sản phẩm trong phiếu nhập
    // thì tức là sản phẩm đó đã tồn tại trong phiếu nhập
    const phieuNhap = await PhieuNhap.findOne({
        _id: idPhieuNhap,
        'chiTiet.maSanPham': chiTietPhieuNhap.maSanPham
    });

    if (phieuNhap) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }

    return chiTietPhieuNhapService.create(idPhieuNhap, chiTietPhieuNhap);
};

const update = async (idPhieuNhap, idChiTietPhieuNhap, chiTietPhieuNhap) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuNhap)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    return chiTietPhieuNhapService.update(idPhieuNhap, idChiTietPhieuNhap, chiTietPhieuNhap);
};

const remove = async (idPhieuNhap, idChiTietPhieuNhap) => {
    if (!mongoose.isValidObjectId(idPhieuNhap)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuNhap)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    return chiTietPhieuNhapService.remove(idPhieuNhap, idChiTietPhieuNhap);
};

module.exports = {
    create,
    update,
    remove,
};