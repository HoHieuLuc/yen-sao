const { UserInputError } = require('apollo-server');
const PhieuNhap = require('../models/PhieuNhap');
const SanPham = require('../models/SanPham');
const ChiTietPhieuNhap = require('../models/ChiTietPhieuNhap');
const { throwIfUserCantMutate } = require('../utils/functions');

const populateOptions = [
    {
        path: 'chiTiet',
        populate: {
            path: 'maSanPham',
        }
    },
    {
        path: 'nguoiNhap'
    }
];

const getAll = async (page, limit, from, to, sort) => {
    const paginateOptions = {
        page,
        limit,
        populate: populateOptions,
        sort: sort || '-ngayNhap'
    };

    const findOptions = {};

    if (from || to) {
        const ngayNhap = {};
        if (from) {
            ngayNhap.$gte = from;
        }
        if (to) {
            ngayNhap.$lte = to;
        }
        findOptions.ngayNhap = ngayNhap;
    }
    
    return PhieuNhap.paginate(findOptions, paginateOptions);
};

const getById = async (id) => {
    return PhieuNhap.findById(id).populate(populateOptions);
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

const create = async (ngayNhap, chiTietPhieuNhap, nguoiNhap) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuNhap = new PhieuNhap({
            nguoiNhap,
            ngayNhap,
            chiTiet: []
        });

        await phieuNhap.save({ session });

        const createdChiTietPhieuNhaps = await ChiTietPhieuNhap.insertMany(
            chiTietPhieuNhap.map((chiTiet) => ({
                maPhieuNhap: phieuNhap._id,
                ngayNhap,
                ...chiTiet
            })),
            { session }
        );

        // l???y ra chi ti???t phi???u nh???p ???? ho??n th??nh
        const completedChiTietPhieuNhaps = chiTietPhieuNhap.filter((chiTiet) => chiTiet.isCompleted);

        // T??ng s??? l?????ng cho t???ng s???n ph???m sau khi nh???p
        const updateProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            completedChiTietPhieuNhaps,
            true
        );
        await SanPham.bulkWrite(updateProductQuantityBulkOps, { session });
        await session.commitTransaction();

        // T???o phi???u nh???p
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

const update = async (id, payload, currentUser) => {
    try {
        const phieuNhap = await PhieuNhap.findById(id).populate(populateOptions);

        if (!phieuNhap) {
            throw new UserInputError('Phi???u nh???p kh??ng t???n t???i');
        }

        throwIfUserCantMutate(currentUser.role, phieuNhap.createdAt,
            'Nh??n vi??n kh??ng th??? s???a phi???u nh???p ???? ???????c t???o qu?? 24 gi???'
        );
        phieuNhap.set(payload);
        await phieuNhap.save();
        await ChiTietPhieuNhap.updateMany(
            {
                maPhieuNhap: id
            },
            {
                ...payload
            }
        );
        return phieuNhap;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const remove = async (phieuNhapId, currentUser) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuNhap = await PhieuNhap.findByIdAndDelete(
            phieuNhapId,
            { session }
        ).populate('chiTiet');

        if (!phieuNhap) {
            throw new UserInputError('Phi???u nh???p kh??ng t???n t???i');
        }

        throwIfUserCantMutate(currentUser.role, phieuNhap.createdAt,
            'Nh??n vi??n kh??ng th??? x??a phi???u nh???p ???? ???????c t???o qu?? 24 gi???'
        );

        const completedChiTietPhieuNhaps = phieuNhap.chiTiet.filter((chiTiet) => chiTiet.isCompleted);

        //c???p nh???t l???i s??? l?????ng s???n ph???m khi x??a phi???u nh???p ?????i v???i s???n ph???m ???? nh???p th??nh c??ng
        const sanPhamsBulkOps = buildUpdateProductQuantityBulkOps(
            completedChiTietPhieuNhaps,
            false
        );
        const bulkResult = await SanPham.bulkWrite(
            sanPhamsBulkOps,
            { session }
        );

        if (bulkResult.result.nModified !== completedChiTietPhieuNhaps.length) {
            throw new UserInputError('S??? l?????ng s???n ph???m kh??ng ????? ????? x??a phi???u nh???p');
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
    update,
    remove,
};