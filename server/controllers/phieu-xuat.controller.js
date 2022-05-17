const { UserInputError } = require('apollo-server');
const { checkIfDuplicateExists } = require('../utils/functions');
const phieuXuatService = require('../services/phieu-xuat.service');
const sanPhamService = require('../services/san-pham.service');
const phieuXuatLogger = require('../loggers/phieu-xuat.logger');

const getAll = async (page = 1, limit = 10, from = null, to = null, sort) => {
    return phieuXuatService.getAll(page, limit, from, to, sort);
};

const getById = async (id) => {
    return phieuXuatService.getById(id);
};


const create = async (nguoiMua, currentUser, ngayXuat, chiTietPhieuXuat) => {
    const arrayOfSanPhamIds = chiTietPhieuXuat.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu xuất không được trùng nhau');
    }
    await sanPhamService.checkIfExist(arrayOfSanPhamIds);

    const phieuXuat = await phieuXuatService.create(
        nguoiMua,
        currentUser._id,
        ngayXuat,
        chiTietPhieuXuat,
    );
    await phieuXuatLogger.create(phieuXuat, currentUser);
    return phieuXuat;
};

const update = async (id, payload, currentUser) => {
    const phieuXuat = await phieuXuatService.update(id, payload, currentUser);
    await phieuXuatLogger.update(phieuXuat, currentUser);
    return phieuXuat;
};

const remove = async (phieuXuatId, currentUser) => {
    const phieuXuat = await phieuXuatService.remove(phieuXuatId, currentUser);
    await phieuXuatLogger.remove(phieuXuat, currentUser);
    return phieuXuat;
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};