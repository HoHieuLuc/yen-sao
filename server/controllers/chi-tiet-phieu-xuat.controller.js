const chiTietPhieuXuatService = require('../services/chi-tiet-phieu-xuat.service');
const chiTietPhieuXuatLogger = require('../loggers/chi-tiet-phieu-xuat.logger');
const sanPhamService = require('../services/san-pham.service');

const getBySanPhamID = async (id, page, limit, from, to, sort) => {
    return chiTietPhieuXuatService.getBySanPhamID(id, page, limit, from, to, sort);
};

const all = async (from, to) => {
    return chiTietPhieuXuatService.all(from, to);
};

const create = async (idPhieuXuat, chiTietPhieuXuat, currentUser) => {
    await sanPhamService.checkIfExist([chiTietPhieuXuat.maSanPham]);

    const phieuXuat = await chiTietPhieuXuatService.create(idPhieuXuat, chiTietPhieuXuat, currentUser);
    await chiTietPhieuXuatLogger.create(phieuXuat, currentUser);
    return phieuXuat;
};

const update = async (idPhieuXuat, idChiTietPhieuXuat, chiTietPhieuXuat, currentUser) => {
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