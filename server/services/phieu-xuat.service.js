const { UserInputError } = require('apollo-server');
const PhieuXuat = require('../models/PhieuXuat');
const SanPham = require('../models/SanPham');
const ChiTietPhieuXuat = require('../models/ChiTietPhieuXuat');
const { throwIfUserCantMutate } = require('../utils/functions');

const populateOptions = [
    {
        path: 'chiTiet',
        populate: {
            path: 'maSanPham',
        }
    },
    {
        path: 'nguoiXuat'
    }
];

const getAll = async (page, limit, from, to, sort) => {
    const paginateOptions = {
        page,
        limit,
        populate: populateOptions,
        sort: sort || '-createdAt'
    };

    let findOptions = {};
    if (from || to) {
        const createdAt = {};
        if (from) {
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
        const phieuXuats = await PhieuXuat.paginate(findOptions, paginateOptions);
        return phieuXuats;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const getById = async (id) => {
    try {
        const phieuXuat = await PhieuXuat.findById(id).populate(populateOptions);
        return phieuXuat;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const buildUpdateProductQuantityBulkOps = (chiTietPhieuXuat, isCreate = true) => {
    // tạo phiếu xuất: giảm số lượng tồn
    // xóa phiếu xuất: tăng (phục hồi) số lượng tồn
    const multiplyConst = isCreate ? -1 : 1;
    return chiTietPhieuXuat.map(({ maSanPham, soLuongXuat }) => ({
        updateOne: {
            filter: {
                _id: maSanPham,
                soLuong: {
                    // số lượng tồn lớn hơn số lượng xuất mới cập nhật
                    $gte: isCreate ? soLuongXuat : 0
                }
            },
            update: {
                $inc: { soLuong: soLuongXuat * multiplyConst }
            }
        }
    }));
};

const create = async (nguoiMua, nguoiXuat, ngayXuat, chiTietPhieuXuat) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuXuat = new PhieuXuat({
            nguoiMua,
            nguoiXuat,
            ngayXuat,
            chiTiet: []
        });

        await phieuXuat.save({ session });

        const createdChiTietPhieuXuats = await ChiTietPhieuXuat.insertMany(
            chiTietPhieuXuat.map(chiTiet => ({
                maPhieuXuat: phieuXuat._id,
                ngayXuat,
                ...chiTiet
            })),
            { session }
        );

        // Update số lượng cho từng sản phẩm sau khi xuất
        const updateProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            chiTietPhieuXuat,
            true
        );

        const bulkResult = await SanPham.bulkWrite(
            updateProductQuantityBulkOps,
            { session }
        );

        // số lượng sản phẩm bị chỉnh sửa phải bằng số lượng sản phẩm được xuất
        // thì mới không bị lỗi hết hàng
        if (bulkResult.result.nModified !== chiTietPhieuXuat.length) {
            throw new UserInputError('Số lượng sản phẩm không đủ để xuất');
        }
        await session.commitTransaction();

        phieuXuat.chiTiet = createdChiTietPhieuXuats.map(({ _id }) => _id);
        await phieuXuat.save({ session: null });

        const createdPhieuXuat = await phieuXuat.populate(populateOptions);
        return createdPhieuXuat;
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

const update = async (id, payload, currentUser) => {
    try {
        const phieuXuat = await PhieuXuat.findById(id).populate(populateOptions);

        if (!phieuXuat) {
            throw new UserInputError('Phiếu xuất không tồn tại');
        }

        throwIfUserCantMutate(currentUser.role, phieuXuat.createdAt,
            'Nhân viên không thể sửa phiếu xuất đã được tạo quá 24 giờ'
        );
        phieuXuat.set(payload);
        await phieuXuat.save();
        await ChiTietPhieuXuat.updateMany(
            { 
                maPhieuXuat: phieuXuat._id 
            },
            {
                ...payload
            }
        );
        return phieuXuat;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const remove = async (phieuXuatId, currentUser) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuXuat = await PhieuXuat.findByIdAndDelete(
            phieuXuatId,
            { session }
        ).populate('chiTiet');

        if (!phieuXuat) {
            throw new UserInputError('Phiếu xuất không tồn tại');
        }
        throwIfUserCantMutate(currentUser.role, phieuXuat.createdAt,
            'Nhân viên không thể xóa phiếu xuất đã được tạo quá 24 giờ'
        );

        // cập nhật lại số lượng sản phẩm khi xóa phiếu xuất
        const sanPhamsBulkOps = buildUpdateProductQuantityBulkOps(
            phieuXuat.chiTiet,
            false
        );
        await SanPham.bulkWrite(sanPhamsBulkOps, { session });

        const deletedPhieuXuat = await phieuXuat.populate(populateOptions);

        await ChiTietPhieuXuat.deleteMany(
            { _id: { $in: phieuXuat.chiTiet } },
            { session }
        );

        await session.commitTransaction();

        return deletedPhieuXuat;
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
    update,
    remove,
};