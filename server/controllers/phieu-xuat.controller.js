const { UserInputError } = require('apollo-server');
const { checkIfDuplicateExists } = require('../utils/functions');
const phieuXuatService = require('../services/phieu-xuat.service');

const getAll = async (page = 1, limit = 10) => {
    return phieuXuatService.getAll(page, limit);
};

const getById = async (id) => {
    return phieuXuatService.getById(id);
};


const create = async (chiTietPhieuXuat, nguoiXuat) => {
    const arrayOfSanPhamIds = chiTietPhieuXuat.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu xuất không được trùng nhau');
    }

    return phieuXuatService.create(chiTietPhieuXuat, nguoiXuat);
};

const remove = async (phieuXuatId) => {
    return phieuXuatService.remove(phieuXuatId);
};

module.exports = {
    getById,
    getAll,
    create,
    remove
};