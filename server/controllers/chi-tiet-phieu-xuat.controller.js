const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const chiTietPhieuXuatService = require('../services/chi-tiet-phieu-xuat.service');
const sanPhamService = require('../services/san-pham.service');
const chiTietPhieuXuatLogger = require('../loggers/chi-tiet-phieu-xuat.logger');

const getBySanPhamID = async (id, page, limit, from, to, sort) => {
    return chiTietPhieuXuatService.getBySanPhamID(id, page, limit, from, to, sort);
};

const all = async (from, to) => {
    return chiTietPhieuXuatService.all(from, to);
};

const create = async (idPhieuXuat, chiTietPhieuXuat, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(chiTietPhieuXuat.maSanPham)) {
        throw new UserInputError('Mã sản phẩm không hợp lệ');
    }
    await sanPhamService.checkIfExist([chiTietPhieuXuat.maSanPham]);

    const phieuXuat = await chiTietPhieuXuatService.create(idPhieuXuat, chiTietPhieuXuat, currentUser);
    await chiTietPhieuXuatLogger.create(phieuXuat, currentUser);
    return phieuXuat;
};

const update = async (idPhieuXuat, idChiTietPhieuXuat, chiTietPhieuXuat, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu xuất không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuXuat)) {
        throw new UserInputError('Mã chi tiết phiếu xuất không hợp lệ');
    }

    await sanPhamService.checkIfExist([chiTietPhieuXuat.maSanPham]);

    const result = await chiTietPhieuXuatService.update(
        idPhieuXuat,
        idChiTietPhieuXuat,
        chiTietPhieuXuat,
        currentUser
    );
    await chiTietPhieuXuatLogger.update(result.phieuXuat, currentUser);
    return result;
};

const remove = async (idPhieuXuat, idChiTietPhieuXuat, currentUser) => {
    if (!mongoose.isValidObjectId(idPhieuXuat)) {
        throw new UserInputError('Mã phiếu nhập không hợp lệ');
    }
    if (!mongoose.isValidObjectId(idChiTietPhieuXuat)) {
        throw new UserInputError('Mã chi tiết phiếu nhập không hợp lệ');
    }
    
    const result = await chiTietPhieuXuatService.remove(
        idPhieuXuat,
        idChiTietPhieuXuat,
        currentUser
    );
    await chiTietPhieuXuatLogger.remove(result.phieuXuat, currentUser);
    return result;
};

module.exports = {
    getBySanPhamID,
    create,
    update,
    remove,
    all
};