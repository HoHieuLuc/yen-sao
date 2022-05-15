const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const chiTietPhieuXuatService = require('../services/chi-tiet-phieu-xuat.service');
const sanPhamService = require('../services/san-pham.service');

const getBySanPhamID = async (id, page = 1, limit = 10, from, to, sort) => {
    return chiTietPhieuXuatService.getBySanPhamID(id, page, limit, from, to, sort);
};

const create = async (idPhieuXuat, chiTietPhieuXuat, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(chiTietPhieuXuat.maSanPham)) {
        throw new UserInputError('Mã sản phẩm không hợp lệ');
    }
    await sanPhamService.checkIfExist([chiTietPhieuXuat.maSanPham]);

    return chiTietPhieuXuatService.create(idPhieuXuat, chiTietPhieuXuat, currentUser);
};

const update = async (idPhieuXuat, idChiTietPhieuXuat, chiTietPhieuXuat, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu xuất không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuXuat)) {
        throw new UserInputError('Mã chi tiết phiếu xuất không hợp lệ');
    }

    await sanPhamService.checkIfExist([chiTietPhieuXuat.maSanPham]);

    return chiTietPhieuXuatService.update(
        idPhieuXuat,
        idChiTietPhieuXuat,
        chiTietPhieuXuat,
        currentUser
    );
};

const remove = async (idPhieuXuat, idChiTietPhieuXuat, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuXuat)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    return chiTietPhieuXuatService.remove(
        idPhieuXuat,
        idChiTietPhieuXuat,
        currentUser
    );
};

module.exports = {
    getBySanPhamID,
    create,
    update,
    remove,
};