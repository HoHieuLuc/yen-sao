const { UserInputError } = require('apollo-server');
const PhieuNhap = require('../models/PhieuNhap');
const SanPham = require('../models/SanPham');

const getAll = async (page, limit) => {
    const paginateOptions = {
        page,
        limit,
        populate: 'nguoiNhap',
        sort: '-createdAt'
    };
    const phieuNhaps = await PhieuNhap.paginate({}, paginateOptions);
    return phieuNhaps;
};

const populateOptions = [
    {
        path: 'chiTiet.maSanPham',
        populate: {
            path: 'maLoaiSanPham'
        }
    },
    {
        path: 'nguoiNhap'
    }
];

const getById = async (id) => {
    try {
        const phieuNhap = await PhieuNhap.findById(id).populate(populateOptions);
        return phieuNhap;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const buildUpdateProductQuantityBulkOps = (chiTietPhieuNhap, isCreate = true) => {
    const multiplyConst = isCreate ? 1 : -1;
    return chiTietPhieuNhap.map(({ maSanPham, soLuongNhap }) => ({
        updateOne: {
            filter: {
                _id: maSanPham,
                soLuong: {
                    $gte: isCreate ? 0 : soLuongNhap
                }
            },
            update: {
                $inc: { soLuong: soLuongNhap * multiplyConst }
            }
        }
    }));
};

const create = async (chiTietPhieuNhap, nguoiNhap) => {
    try {
        const phieuNhap = await PhieuNhap.create({
            nguoiNhap,
            chiTiet: chiTietPhieuNhap
        });
        // Update số lượng cho từng sản phẩm sau khi nhập
        const updateProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            phieuNhap.chiTiet,
            true
        );

        await SanPham.bulkWrite(updateProductQuantityBulkOps);

        return PhieuNhap.findById(phieuNhap._id)
            .populate(populateOptions);
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const remove = async (phieuNhapId) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuNhap = await PhieuNhap.findById(phieuNhapId);
        if (!phieuNhap) {
            throw new UserInputError('Phiếu nhập không tồn tại');
        }

        //cập nhật lại số lượng sản phẩm khi xóa phiếu nhập
        const sanPhamsBulkOps = buildUpdateProductQuantityBulkOps(
            phieuNhap.chiTiet,
            false
        );
        const bulkResult = await SanPham.bulkWrite(
            sanPhamsBulkOps,
            { session }
        );

        if (bulkResult.result.nModified !== phieuNhap.chiTiet.length) {
            throw new UserInputError('Số lượng sản phẩm không đủ để xóa phiếu nhập');
        }

        const deletedPhieuNhap = await PhieuNhap.findByIdAndDelete(
            phieuNhapId,
            { session })
            .populate(populateOptions);

        await session.commitTransaction();
        return deletedPhieuNhap;
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

module.exports = {
    getById,
    getAll,
    create,
    remove
};