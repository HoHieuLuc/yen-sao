const { UserInputError } = require('apollo-server');
const ChiTietPhieuXuat = require('../models/ChiTietPhieuXuat');
const PhieuXuat = require('../models/PhieuXuat');
const SanPham = require('../models/SanPham');

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

const create = async (idPhieuXuat, chiTietPhieuXuat) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuXuat = await PhieuXuat.findById(idPhieuXuat).session(session);

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

        const createdChiTietPhieuXuat = new ChiTietPhieuXuat(chiTietPhieuXuat);
        await createdChiTietPhieuXuat.save();

        phieuXuat.chiTiet.push(createdChiTietPhieuXuat._id);
        await phieuXuat.save();

        await session.commitTransaction();

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
- Phục hồi số lượng sản phẩm trong kho dựa theo số lượng xuất
- Giảm số lượng sản phẩm trong kho khi chi tiết xuất bị thay đổi
- Nếu số lượng sau khi giảm < 0 thì hủy transaction và báo lỗi
*/
const update = async (idPhieuXuat, idChiTietPhieuXuat, chiTietPhieuXuat) => {
    const phieuXuat = await PhieuXuat.findOne({
        _id: idPhieuXuat,
        chiTiet: idChiTietPhieuXuat
    }).populate('chiTiet');

    if (!phieuXuat) {
        throw new UserInputError('Phiếu xuất không tồn tại');
    }

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
        const chiTietToBeUpdated = await ChiTietPhieuXuat.findByIdAndUpdate(
            idChiTietPhieuXuat,
            chiTietPhieuXuat,
            { runValidators: true, session }
        );

        // phục hồi (tăng) số lượng sản phẩm trong kho
        // đối với sản phẩm trong chi tiết bị cập nhật
        const restoredSanPham = await SanPham.findByIdAndUpdate(
            chiTietToBeUpdated.maSanPham,
            {
                $inc: {
                    soLuong: chiTietToBeUpdated.soLuongXuat
                }
            },
            { new: true, runValidators: true, session }
        );

        // giảm số lượng sản phẩm trong kho 
        // đối với sản phẩm xuất
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
        return {
            phieuXuat: updatedPhieuXuat,
            sanPhamBiThayDoi: restoredSanPham // cần phải return để client tự update cache
        };
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

const remove = async (idPhieuXuat, idChiTietPhieuXuat) => {
    try {
        const phieuXuat = await PhieuXuat.findOne({
            _id: idPhieuXuat,
            chiTiet: idChiTietPhieuXuat
        }).populate('chiTiet');

        if (!phieuXuat) {
            // phiếu xuất hoặc chi tiết phiếu xuất không tồn tại
            throw new UserInputError('Phiếu xuất không tồn tại');
        }

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
            { new: true, runValidators: true }
        );

        await ChiTietPhieuXuat.findByIdAndDelete(idChiTietPhieuXuat);

        phieuXuat.chiTiet.pull(idChiTietPhieuXuat);

        await phieuXuat.save();
        const updatedPhieuXuat = await phieuXuat.populate(populateOptions);

        return {
            phieuXuat: updatedPhieuXuat,
            sanPhamBiThayDoi: restoredSanPham
        };
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    create,
    update,
    remove,
};