const phieuNhapService = require('../services/phieu-nhap.service');
const { checkIfDuplicateExists } = require('../utils/functions');
const phieuNhapLogger = require('../loggers/phieu-nhap.logger');
const sanPhamService = require('../services/san-pham.service');
const { UserInputError } = require('apollo-server');

const getAll = async (page, limit, from = null, to = null, sort) => {
    return phieuNhapService.getAll(page, limit, from, to, sort);
};

const getById = async (id) => {
    return phieuNhapService.getById(id);
};


const create = async (ngayNhap, chiTietPhieuNhap, currentUser) => {
    const arrayOfSanPhamIds = chiTietPhieuNhap.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }
    await sanPhamService.checkIfExist(arrayOfSanPhamIds);

    const phieuNhap = await phieuNhapService.create(
        ngayNhap,
        chiTietPhieuNhap,
        currentUser._id
    );
    await phieuNhapLogger.create(phieuNhap, currentUser);
    return phieuNhap;
};

const update = async (id, payload, currentUser) => {
    const phieuNhap = await phieuNhapService.update(id, payload, currentUser);
    await phieuNhapLogger.update(phieuNhap, currentUser);
    return phieuNhap;
};

const remove = async (phieuNhapId, currentUser) => {
    const phieuNhap = await phieuNhapService.remove(phieuNhapId, currentUser);
    await phieuNhapLogger.remove(phieuNhap, currentUser);
    return phieuNhap;
};

module.exports = {
    getById,
    getAll,
    create,
    update,
    remove,
};