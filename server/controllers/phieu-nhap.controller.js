const { UserInputError } = require('apollo-server');
const { checkIfDuplicateExists } = require('../utils/functions');
const PhieuNhap = require('../models/PhieuNhap');
const SanPham = require('../models/SanPham');

const getAllPhieuNhaps = async (page = 1, limit = 10) => {
    const paginateOptions = {
        page,
        limit,
        populate: 'nguoiNhap',
        sort: '-createdAt'
    };
    const phieuNhaps = await PhieuNhap.paginate({}, paginateOptions);
    return phieuNhaps;
};

const getPhieuNhapById = async (id) => {
    try {
        const populateOptions = [
            {
                path: 'chiTiet.maSanPham',
                populate: {
                    path: 'loaiSanPham'
                }
            },
            {
                path: 'nguoiNhap'
            }
        ];
        const phieuNhap = await PhieuNhap.findById(id).populate(populateOptions);
        return phieuNhap;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const buildUpdateProductQuantityBulkOps = (chiTietPhieuNhap, type) => {
    // create: tăng, ngược lại giảm
    const multiplyConst = type === 'create' ? 1 : -1;
    return chiTietPhieuNhap.map(({ maSanPham, soLuongNhap }) => ({
        updateOne: {
            filter: { _id: maSanPham },
            update: {
                $inc: { soLuong: soLuongNhap * multiplyConst }
            }
        }
    }));
};

const createPhieuNhap = async (chiTietPhieuNhap, nguoiNhap) => {
    const arrayOfSanPhamIds = chiTietPhieuNhap.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }

    try {
        const newPhieuNhap = await PhieuNhap.create({
            nguoiNhap,
            chiTiet: chiTietPhieuNhap
        });
        // Update số lượng cho từng sản phẩm sau khi nhập
        const updateProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            newPhieuNhap.chiTiet,
            'create'
        );

        await SanPham.bulkWrite(updateProductQuantityBulkOps);

        const addedPhieuNhap = await PhieuNhap.findById(newPhieuNhap._id)
            .populate('chiTiet.maSanPham')
            .populate('nguoiNhap');
        return addedPhieuNhap;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const editPhieuNhap = async (phieuNhapId, chiTietPhieuNhap) => {
    const arrayOfSanPhamIds = chiTietPhieuNhap.map(({ maSanPham }) => maSanPham);
    if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }
    const session = await PhieuNhap.startSession();
    session.startTransaction();
    try {
        const oldPhieuNhap = await PhieuNhap.findById(phieuNhapId);

        // khôi phục số lượng của sản phẩm
        // dựa vào chi tiết phiếu nhập cũ
        const restoreProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            oldPhieuNhap.chiTiet,
            'restore'
        );
        // cập nhật số lượng sản phẩm
        // theo chi tiết phiếu nhập mới
        const updateProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            chiTietPhieuNhap,
            'create'
        );
        await SanPham.bulkWrite(
            restoreProductQuantityBulkOps.concat(updateProductQuantityBulkOps),
            { session }
        );

        const updatedPhieuNhap = await PhieuNhap.findByIdAndUpdate(
            phieuNhapId,
            { chiTiet: chiTietPhieuNhap },
            { new: true, runValidators: true, session }
        )
            .populate('chiTiet.maSanPham')
            .populate('nguoiNhap');

        await session.commitTransaction();

        return updatedPhieuNhap;
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        session.endSession();
    }
};

const deletePhieuNhap = async (phieuNhapId) => {
    try {
        const phieuNhap = await PhieuNhap.findById(phieuNhapId);
        if (!phieuNhap) {
            throw new UserInputError('Phiếu nhập không tồn tại');
        }
        // cập nhật lại số lượng sản phẩm khi xóa phiếu nhập
        const sanPhamsBulkOps = phieuNhap.chiTiet.map(({ maSanPham, soLuongNhap }) => ({
            updateOne: {
                filter: { _id: maSanPham },
                update: {
                    $inc: { soLuong: -soLuongNhap }
                }
            }
        }));
        await SanPham.bulkWrite(sanPhamsBulkOps);
        const deletedPhieuNhap = await PhieuNhap.findByIdAndDelete(phieuNhapId)
            .populate('chiTiet.maSanPham')
            .populate('nguoiNhap');
        return deletedPhieuNhap;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getPhieuNhapById,
    getAllPhieuNhaps,
    createPhieuNhap,
    editPhieuNhap,
    deletePhieuNhap
};