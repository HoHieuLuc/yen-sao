const { UserInputError } = require('apollo-server');
const PhieuNhap = require('../models/PhieuNhap');
const SanPham = require('../models/SanPham');
const ChiTietPhieuNhap = require('../models/ChiTietPhieuNhap');

const populateOptions = [
    {
        path: 'chiTiet',
        populate: {
            path: 'maSanPham',
            populate: {
                path: 'maLoaiSanPham'
            }
        }
    },
    {
        path: 'nguoiNhap'
    }
];

const getAll = async (page, limit, from, to) => {
    const paginateOptions = {
        page,
        limit,
        populate: populateOptions,
        sort: '-createdAt'
    };

    let findOptions = {};

    if (from || to) {
        const createdAt = {};
        if (from ){
            createdAt.$gte = from;
        }
        if (to) {
            createdAt.$lte = to;
        }
        findOptions = {
            createdAt
        };
    }
    try {
        const phieuNhaps = await PhieuNhap.paginate(findOptions, paginateOptions);
        return phieuNhaps;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};


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
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuNhap = new PhieuNhap({
            nguoiNhap,
            chiTiet: []
        });

        await phieuNhap.save({ session });

        const createdChiTietPhieuNhaps = await ChiTietPhieuNhap.insertMany(
            chiTietPhieuNhap.map((chiTiet) => ({
                maPhieuNhap: phieuNhap._id,
                ...chiTiet
            })),
            { session }
        );

        // Update số lượng cho từng sản phẩm sau khi nhập
        const updateProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            chiTietPhieuNhap,
            true
        );
        await SanPham.bulkWrite(updateProductQuantityBulkOps, { session });
        await session.commitTransaction();

        // Tạo phiếu nhập
        phieuNhap.chiTiet = createdChiTietPhieuNhaps.map(({ _id }) => _id);
        await phieuNhap.save({ session: null });

        return phieuNhap.populate(populateOptions);
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

const remove = async (phieuNhapId) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuNhap = await PhieuNhap.findByIdAndDelete(
            phieuNhapId,
            { session }
        ).populate('chiTiet');

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

        const deletedPhieuNhap = await phieuNhap
            .populate(populateOptions);

        await ChiTietPhieuNhap.deleteMany(
            { _id: { $in: phieuNhap.chiTiet } },
            { session }
        );

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