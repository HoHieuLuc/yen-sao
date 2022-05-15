const { UserInputError } = require('apollo-server');
const { checkIfDuplicateExists } = require('../utils/functions');
const phieuXuatService = require('../services/phieu-xuat.service');
const sanPhamService = require('../services/san-pham.service');

const getAll = async (page = 1, limit = 10, from = null, to = null, sort) => {
    return phieuXuatService.getAll(page, limit, from, to, sort);
};

const getById = async (id) => {
    return phieuXuatService.getById(id);
};


const create = async (nguoiMua, nguoiXuat, ngayXuat, chiTietPhieuXuat) => {
    const arrayOfSanPhamIds = chiTietPhieuXuat.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu xuất không được trùng nhau');
    }
    await sanPhamService.checkIfExist(arrayOfSanPhamIds);

    return phieuXuatService.create(
        nguoiMua,
        nguoiXuat,
        ngayXuat,
        chiTietPhieuXuat,
    );
};

const update = async (id, payload, currentUser) => {
    return phieuXuatService.update(id, payload, currentUser);
};

const remove = async (phieuXuatId, currentUser) => {
    return phieuXuatService.remove(phieuXuatId, currentUser);
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};