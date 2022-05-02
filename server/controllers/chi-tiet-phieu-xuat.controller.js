const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const PhieuXuat = require('../models/PhieuXuat');
const chiTietPhieuXuatService = require('../services/chi-tiet-phieu-xuat.service');

const create = async (idPhieuXuat, chiTietPhieuXuat) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }

    if (!mongoose.isValidObjectId(chiTietPhieuXuat.maSanPham)) {
        throw new UserInputError('Mã sản phẩm không hợp lệ');
    }

    const phieuXuat = await PhieuXuat.findById(idPhieuXuat).populate('chiTiet');

    if (!phieuXuat) {
        throw new UserInputError('Phiếu xuất không tồn tại');
    }
    const chiTietPhieuXuatExist = phieuXuat.chiTiet.find(
        item => item.maSanPham.toString() === chiTietPhieuXuat.maSanPham
    );

    if (chiTietPhieuXuatExist) {
        throw new UserInputError('Sản phẩm trong 1 phiếu xuất không được trùng nhau');
    }

    return chiTietPhieuXuatService.create(idPhieuXuat, chiTietPhieuXuat);
};

const update = async (idPhieuXuat, idChiTietPhieuXuat, chiTietPhieuXuat) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu xuất không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuXuat)) {
        throw new UserInputError('Mã chi tiết phiếu xuất không hợp lệ');
    }
    return chiTietPhieuXuatService.update(
        idPhieuXuat,
        idChiTietPhieuXuat,
        chiTietPhieuXuat
    );
};

const remove = async (idPhieuXuat, idChiTietPhieuXuat) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuXuat)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    return chiTietPhieuXuatService.remove(
        idPhieuXuat,
        idChiTietPhieuXuat
    );
};

module.exports = {
    create,
    update,
    remove,
};