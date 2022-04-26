const { UserInputError } = require('apollo-server');
const PhieuNhap = require('../models/PhieuNhap');
const SanPham = require('../models/SanPham');
const { checkIfDuplicateExists } = require('../utils/functions');

const populateOptions = [
    {
        path: 'chiTiet.maSanPham',
    },
    {
        path: 'nguoiNhap'
    }
];

const create = async (idPhieuNhap, chiTietPhieuNhap) => {
    try {
        const phieuNhap = await PhieuNhap.findById(idPhieuNhap);

        if(!phieuNhap) {
            throw new UserInputError('Phiếu nhập không tồn tại');
        }

        // cập nhật số lượng sản phẩm
        const sanPhamCanUpdate = await SanPham.findByIdAndUpdate(
            chiTietPhieuNhap.maSanPham,
            {
                $inc: {
                    soLuong: chiTietPhieuNhap.soLuongNhap
                }
            },
            { runValidators: true }
        );

        if (!sanPhamCanUpdate) {
            throw new UserInputError('Sản phẩm không tồn tại');
        }

        phieuNhap.chiTiet.push(chiTietPhieuNhap);
        await phieuNhap.save();

        return phieuNhap.populate(populateOptions);
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

/* 
- Tăng số lượng sản phẩm trong kho dựa theo số lượng nhập
- Giảm số lượng sản phẩm trong kho của sản phẩm bị thay đổi
- Nếu số lượng sau khi giảm < 0 thì hủy transaction và báo lỗi
*/
const update = async (idPhieuNhap, idChiTietPhieuNhap, chiTietPhieuNhap) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuNhap = await PhieuNhap.findOne({
            _id: idPhieuNhap,
            'chiTiet._id': idChiTietPhieuNhap
        }).session(session);

        if (!phieuNhap) {
            // phiếu nhập hoặc chi tiết phiếu nhập không tồn tại
            throw new UserInputError('Phiếu nhập không tồn tại');
        }

        // tăng số lượng sản phẩm trong kho
        await SanPham.findByIdAndUpdate(
            chiTietPhieuNhap.maSanPham,
            {
                $inc: {
                    soLuong: chiTietPhieuNhap.soLuongNhap
                }
            },
            { runValidators: true, session }
        );

        const sanPhamCanUpdate = phieuNhap.chiTiet.find(
            ({ _id }) => _id.toString() === idChiTietPhieuNhap
        );

        // giảm số lượng sản phẩm trong kho
        const updatedSanPham = await SanPham.findByIdAndUpdate(
            sanPhamCanUpdate.maSanPham,
            {
                $inc: {
                    soLuong: -sanPhamCanUpdate.soLuongNhap
                }
            },
            { new: true, runValidators: true, session }
        );

        // sau khi giảm số lượng nếu thấy sản phẩm < 0 thì hủy transaction
        if (updatedSanPham.soLuong < 0) {
            throw new UserInputError('Số lượng sản phẩm trong kho không đủ');
        }

        phieuNhap.chiTiet.id(idChiTietPhieuNhap).set(chiTietPhieuNhap);
        await phieuNhap.save();

        // sản phẩm trong 1 phiếu nhập không được trùng nhau
        const arrayOfSanPhamIds = phieuNhap.chiTiet.map(
            ({ maSanPham }) => maSanPham.toString()
        );
        if(checkIfDuplicateExists(arrayOfSanPhamIds)) {
            throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
        }

        await session.commitTransaction();
        const updatedPhieuNhap = await phieuNhap.populate(populateOptions);
        return {
            phieuNhap: updatedPhieuNhap,
            sanPhamBiThayDoi: updatedSanPham // cần phải return để client tự update cache
        };
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

const remove = async (idPhieuNhap, idChiTietPhieuNhap) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuNhap = await PhieuNhap.findOne({
            _id: idPhieuNhap,
            'chiTiet._id': idChiTietPhieuNhap
        }).session(session);

        if (!phieuNhap) {
            // phiếu nhập hoặc chi tiết phiếu nhập không tồn tại
            throw new UserInputError('Phiếu nhập không tồn tại');
        }

        const sanPhamCanUpdate = phieuNhap.chiTiet.find(
            ({ _id }) => _id.toString() === idChiTietPhieuNhap
        );

        // giảm số lượng sản phẩm trong kho
        const updatedSanPham = await SanPham.findByIdAndUpdate(
            sanPhamCanUpdate.maSanPham,
            {
                $inc: {
                    soLuong: -sanPhamCanUpdate.soLuongNhap
                }
            },
            { new: true, runValidators: true, session }
        );

        // sau khi giảm số lượng nếu thấy sản phẩm < 0 thì hủy transaction
        if (updatedSanPham.soLuong < 0) {
            throw new UserInputError('Số lượng sản phẩm trong kho không đủ');
        }

        phieuNhap.chiTiet.id(idChiTietPhieuNhap).remove();

        await session.commitTransaction();
        return phieuNhap.populate(populateOptions);
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

module.exports = {
    create,
    update,
    remove,
};