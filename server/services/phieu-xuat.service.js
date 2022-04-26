const { UserInputError } = require('apollo-server');
const PhieuXuat = require('../models/PhieuXuat');
const SanPham = require('../models/SanPham');

const getAll = async (page, limit) => {
    const paginateOptions = {
        page,
        limit,
        populate: 'nguoiXuat',
        sort: '-createdAt'
    };
    const phieuXuats = await PhieuXuat.paginate({}, paginateOptions);
    return phieuXuats;
};

const populateOptions = [
    {
        path: 'chiTiet.maSanPham',
        populate: {
            path: 'maLoaiSanPham'
        }
    },
    {
        path: 'nguoiXuat'
    }
];

const getById = async (id) => {
    try {
        const phieuXuat = await PhieuXuat.findById(id).populate(populateOptions);
        return phieuXuat;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const buildUpdateProductQuantityBulkOps = (chiTietPhieuXuat, isCreate = true) => {
    // create: giảm, ngược lại tăng
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

const create = async (chiTietPhieuXuat, nguoiXuat) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        // Update số lượng cho từng sản phẩm sau khi xuất
        const updateProductQuantityBulkOps = buildUpdateProductQuantityBulkOps(
            chiTietPhieuXuat,
            true
        );

        console.log(updateProductQuantityBulkOps);

        const bulkResult = await SanPham.bulkWrite(
            updateProductQuantityBulkOps,
            { session }
        );

        // số lượng sản phẩm bị chỉnh sửa phải bằng số lượng được xuất được xuất
        // thì mới không bị lỗi hết hàng
        if (bulkResult.result.nModified !== chiTietPhieuXuat.length) {
            throw new UserInputError('Số lượng sản phẩm không đủ để xuất');
        }

        const phieuXuat = new PhieuXuat({
            nguoiXuat,
            chiTiet: chiTietPhieuXuat
        });

        await phieuXuat.save({ session });
        await session.commitTransaction();
        await session.endSession();

        return phieuXuat.populate(populateOptions);
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new UserInputError(error.message);
    }
};

const remove = async (phieuXuatId) => {
    try {
        const phieuXuat = await PhieuXuat.findById(phieuXuatId);
        if (!phieuXuat) {
            throw new UserInputError('Phiếu xuất không tồn tại');
        }
        // cập nhật lại số lượng sản phẩm khi xóa phiếu xuất
        const sanPhamsBulkOps = buildUpdateProductQuantityBulkOps(
            phieuXuat.chiTiet,
            false
        );
        await SanPham.bulkWrite(sanPhamsBulkOps);

        const deletedPhieuXuat = await PhieuXuat.findByIdAndDelete(phieuXuatId)
            .populate(populateOptions);

        return deletedPhieuXuat;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getById,
    getAll,
    create,
    remove
};