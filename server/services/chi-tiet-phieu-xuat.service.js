const { UserInputError } = require('apollo-server');
const PhieuXuat = require('../models/PhieuXuat');
const SanPham = require('../models/SanPham');
const { checkIfDuplicateExists } = require('../utils/functions');

const populateOptions = [
    {
        path: 'chiTiet.maSanPham',
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

        if (!phieuXuat) {
            throw new UserInputError('Phiếu xuất không tồn tại');
        }

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

        phieuXuat.chiTiet.push(chiTietPhieuXuat);
        await phieuXuat.save();

        await session.commitTransaction();
        await session.endSession();

        return phieuXuat.populate(populateOptions);
    } catch (error) {
        await session.abortTransaction();
        await session.endSession();
        throw new UserInputError(error.message);
    }
};

/* 
- Tăng số lượng sản phẩm trong kho dựa theo số lượng xuất
- Giảm số lượng sản phẩm trong kho khi chi tiết xuất bị thay đổi
- Nếu số lượng sau khi giảm < 0 thì hủy transaction và báo lỗi
*/
const update = async (idPhieuXuat, idChiTietPhieuXuat, chiTietPhieuXuat) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuXuat = await PhieuXuat.findOne({
            _id: idPhieuXuat,
            'chiTiet._id': idChiTietPhieuXuat
        }).session(session);

        if (!phieuXuat) {
            // phiếu xuất hoặc chi tiết phiếu xuất không tồn tại
            throw new UserInputError('Phiếu xuất không tồn tại');
        }

        // tăng số lượng sản phẩm trong kho
        const sanPhamCanUpdate = phieuXuat.chiTiet.find(
            ({ _id }) => _id.toString() === idChiTietPhieuXuat
        );

        await SanPham.findByIdAndUpdate(
            sanPhamCanUpdate.maSanPham,
            {
                $inc: {
                    soLuong: sanPhamCanUpdate.soLuongXuat
                }
            },
            { runValidators: true, session }
        );

        // giảm số lượng sản phẩm trong kho
        const updatedSanPham = await SanPham.findByIdAndUpdate(
            chiTietPhieuXuat.maSanPham,
            {
                $inc: {
                    soLuong: -chiTietPhieuXuat.soLuongXuat
                }
            },
            { new: true, runValidators: true, session }
        );

        // sau khi giảm số lượng nếu thấy sản phẩm < 0 thì hủy transaction
        if (updatedSanPham.soLuong < 0) {
            throw new UserInputError('Số lượng sản phẩm trong kho không đủ');
        }

        phieuXuat.chiTiet.id(idChiTietPhieuXuat).set(chiTietPhieuXuat);
        await phieuXuat.save();

        // sản phẩm trong 1 phiếu xuất không được trùng nhau
        const arrayOfSanPhamIds = phieuXuat.chiTiet.map(
            ({ maSanPham }) => maSanPham.toString()
        );
        if (checkIfDuplicateExists(arrayOfSanPhamIds)) {
            throw new UserInputError('Sản phẩm trong 1 phiếu xuất không được trùng nhau');
        }

        await session.commitTransaction();
        const updatedPhieuXuat = await phieuXuat.populate(populateOptions);
        return {
            phieuXuat: updatedPhieuXuat,
            sanPhamBiThayDoi: updatedSanPham // cần phải return để client tự update cache
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
            'chiTiet._id': idChiTietPhieuXuat
        });

        if (!phieuXuat) {
            // phiếu xuất hoặc chi tiết phiếu xuất không tồn tại
            throw new UserInputError('Phiếu xuất không tồn tại');
        }

        const sanPhamCanUpdate = phieuXuat.chiTiet.find(
            ({ _id }) => _id.toString() === idChiTietPhieuXuat
        );

        // tăng số lượng sản phẩm trong kho
        await SanPham.findByIdAndUpdate(
            sanPhamCanUpdate.maSanPham,
            {
                $inc: {
                    soLuong: sanPhamCanUpdate.soLuongXuat
                }
            },
            { runValidators: true }
        );

        phieuXuat.chiTiet.id(idChiTietPhieuXuat).remove();

        await phieuXuat.save();

        return phieuXuat.populate(populateOptions);
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    create,
    update,
    remove,
};