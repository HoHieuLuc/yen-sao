const { UserInputError } = require('apollo-server');
const ChiTietPhieuXuat = require('../models/ChiTietPhieuXuat');
const PhieuXuat = require('../models/PhieuXuat');
const SanPham = require('../models/SanPham');
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

const getBySanPhamID = async (id, page, limit, from, to, sort) => {
    const options = {
        page,
        limit,
        sort: sort || '-ngayXuat'
    };
    let findOptions = {};

    if (from || to) {
        const ngayXuat = {};
        if (from) {
            ngayXuat.$gte = from;
        }
        if (to) {
            ngayXuat.$lte = to;
        }
        findOptions = {
            ngayXuat
        };
    }
    try {
        const chiTiets = await ChiTietPhieuXuat.paginate({
            maSanPham: id,
            ...findOptions
        }, options);
        return chiTiets;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const create = async (idPhieuXuat, chiTietPhieuXuat, currentUser) => {
    const session = await SanPham.startSession();
    session.startTransaction();

    const phieuXuat = await PhieuXuat.findById(idPhieuXuat);
    if (!phieuXuat) {
        throw new UserInputError('Phiếu xuất không tồn tại');
    }

    throwIfUserCantMutate(currentUser.role, phieuXuat.createdAt,
        'Nhân viên không thể cập nhật phiếu xuất đã được tạo quá 24 giờ'
    );

    // nếu tìm thấy phiếu xuất và sản phẩm trong chi tiết phiếu xuất
    // thì tức là sản phẩm đó đã tồn tại trong phiếu xuất
    const chiTietPhieuXuatExist = await ChiTietPhieuXuat.findOne({
        maPhieuXuat: idPhieuXuat,
        maSanPham: chiTietPhieuXuat.maSanPham
    });

    if (chiTietPhieuXuatExist) {
        throw new UserInputError('Sản phẩm trong 1 phiếu xuất không được trùng nhau');
    }

    try {
        // giảm số lượng sản phẩm khi xuất
        const sanPhamCanUpdate = await SanPham.findByIdAndUpdate(
            chiTietPhieuXuat.maSanPham,
            {
                $inc: {
                    soLuong: -chiTietPhieuXuat.soLuongXuat
                }
            },
            { new: true, runValidators: true, session }
        );

        if (!sanPhamCanUpdate) {
            throw new UserInputError('Sản phẩm không tồn tại');
        }

        // nếu số lượng sản phẩm sau khi giảm < 0 thì hủy transaction
        if (sanPhamCanUpdate.soLuong < 0) {
            throw new UserInputError('Số lượng sản phẩm không đủ để xuất hàng');
        }

        const createdChiTietPhieuXuat = new ChiTietPhieuXuat({
            maPhieuXuat: idPhieuXuat,
            ngayXuat: phieuXuat.ngayXuat,
            ...chiTietPhieuXuat
        });
        await createdChiTietPhieuXuat.save({ session });
        await session.commitTransaction();

        phieuXuat.chiTiet.push(createdChiTietPhieuXuat._id);
        await phieuXuat.save();

        const updatedPhieuXuat = await phieuXuat.populate(populateOptions);

        return updatedPhieuXuat;
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

/* 
- Phục hồi (tăng) số lượng sản phẩm của sản phẩm bị update dựa theo số lượng xuất
- Giảm số lượng sản phẩm trong kho của sản phẩm trong chi tiết thay thế
- Nếu số lượng sau khi giảm < 0 thì hủy transaction và báo lỗi
*/
const update = async (idPhieuXuat, idChiTietPhieuXuat, chiTietPhieuXuat, currentUser) => {
    const phieuXuat = await PhieuXuat.findOne({
        _id: idPhieuXuat,
        chiTiet: idChiTietPhieuXuat
    }).populate('chiTiet');

    if (!phieuXuat) {
        throw new UserInputError('Phiếu xuất không tồn tại');
    }

    throwIfUserCantMutate(currentUser.role, phieuXuat.createdAt,
        'Nhân viên không thể cập nhật phiếu nhập đã được tạo quá 24 giờ'
    );

    // kiểm tra sản phẩm đã tồn tại trong phiếu xuất chưa
    const chiTietPhieuXuatExist = phieuXuat.chiTiet.find(
        item => (
            item.maSanPham.toString() === chiTietPhieuXuat.maSanPham
            && item._id.toString() !== idChiTietPhieuXuat
        )
    );

    if (chiTietPhieuXuatExist) {
        throw new UserInputError('Sản phẩm trong 1 phiếu xuất không được trùng nhau');
    }

    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        // cập nhật chi tiết phiếu xuất
        // options không có new để lấy lại chi tiết trước khi cập nhật
        // chi tiết này sẽ có mã sản phẩm cũ để cập nhật lại số lượng sản phẩm
        const chiTietToBeUpdated = await ChiTietPhieuXuat.findByIdAndUpdate(
            idChiTietPhieuXuat,
            chiTietPhieuXuat,
            { runValidators: true, session }
        );

        // phục hồi (tăng) số lượng sản phẩm trong kho
        // đối với sản phẩm trong chi tiết bị cập nhật
        const prevSanPham = await SanPham.findByIdAndUpdate(
            chiTietToBeUpdated.maSanPham,
            {
                $inc: {
                    soLuong: chiTietToBeUpdated.soLuongXuat
                }
            },
            { new: true, runValidators: true, session }
        );

        // giảm số lượng sản phẩm trong kho 
        // đối với sản phẩm trong chi tiết thay thế
        const updatedSanPham = await SanPham.findByIdAndUpdate(
            chiTietPhieuXuat.maSanPham,
            {
                $inc: {
                    soLuong: -chiTietPhieuXuat.soLuongXuat
                }
            },
            { new: true, runValidators: true, session }
        );

        // sau khi giảm số lượng nếu thấy số lượng sản phẩm < 0 thì hủy transaction
        if (updatedSanPham.soLuong < 0) {
            throw new UserInputError('Số lượng sản phẩm trong kho không đủ');
        }

        await session.commitTransaction();

        await phieuXuat.save(); // trigger middleware cập nhật tổng tiền

        const updatedPhieuXuat = await phieuXuat.populate(populateOptions);

        // nếu mã sản phẩm không bị thay đổi
        // thì sanPhamBiThayDoi trả về là sản phẩm được cập nhật (updatedSanPham)
        const sanPhamBiThayDoi = prevSanPham._id.toString() === updatedSanPham._id.toString()
            ? updatedSanPham : prevSanPham;
        return {
            phieuXuat: updatedPhieuXuat,
            sanPhamBiThayDoi: sanPhamBiThayDoi // cần phải return để client tự update cache
        };
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

const remove = async (idPhieuXuat, idChiTietPhieuXuat, currentUser) => {
    const session = await SanPham.startSession();
    session.startTransaction();

    const phieuXuat = await PhieuXuat.findOne({
        _id: idPhieuXuat,
        chiTiet: idChiTietPhieuXuat
    }).populate('chiTiet');

    if (!phieuXuat) {
        // phiếu xuất hoặc chi tiết phiếu xuất không tồn tại
        throw new UserInputError('Phiếu xuất không tồn tại');
    }

    throwIfUserCantMutate(currentUser.role, phieuXuat.createdAt,
        'Nhân viên không thể cập nhật phiếu xuất đã được tạo quá 24 giờ'
    );

    try {
        const sanPhamCanUpdate = phieuXuat.chiTiet.find(
            ({ _id }) => _id.toString() === idChiTietPhieuXuat
        );

        // phục hồi số lượng sản phẩm trong kho
        const restoredSanPham = await SanPham.findByIdAndUpdate(
            sanPhamCanUpdate.maSanPham,
            {
                $inc: {
                    soLuong: sanPhamCanUpdate.soLuongXuat
                }
            },
            { new: true, runValidators: true, session }
        );

        await ChiTietPhieuXuat.findByIdAndDelete(idChiTietPhieuXuat, { session });
        await session.commitTransaction();

        phieuXuat.chiTiet.pull(idChiTietPhieuXuat);
        await phieuXuat.save();

        const updatedPhieuXuat = await phieuXuat.populate(populateOptions);

        return {
            phieuXuat: updatedPhieuXuat,
            sanPhamBiThayDoi: restoredSanPham
        };
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

module.exports = {
    getBySanPhamID,
    create,
    update,
    remove,
};