const { UserInputError } = require('apollo-server');
const ChiTietPhieuNhap = require('../models/ChiTietPhieuNhap');
const PhieuNhap = require('../models/PhieuNhap');
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
        path: 'nguoiNhap'
    }
];

const getBySanPhamID = async (id, page, limit, from, to, sort) => {
    const options = {
        page,
        limit,
        sort: sort || '-ngayNhap'
    };
    let findOptions = {};

    if (from || to) {
        const ngayNhap = {};
        if (from) {
            ngayNhap.$gte = from;
        }
        if (to) {
            ngayNhap.$lte = to;
        }
        findOptions = {
            ngayNhap
        };
    }
    try {
        const chiTiets = await ChiTietPhieuNhap.paginate({
            maSanPham: id,
            ...findOptions
        }, options);
        return chiTiets;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const create = async (idPhieuNhap, chiTietPhieuNhap, currentUser) => {
    const session = await SanPham.startSession();
    session.startTransaction();

    const phieuNhap = await PhieuNhap.findById(idPhieuNhap);

    if (!phieuNhap) {
        throw new UserInputError('Phiếu nhập không tồn tại');
    }

    throwIfUserCantMutate(currentUser.role, phieuNhap.createdAt,
        'Nhân viên không thể cập nhật phiếu nhập đã được tạo quá 24 giờ'
    );

    // nếu tìm thấy phiếu nhập và sản phẩm trong chi tiết phiếu nhập
    // thì tức là sản phẩm đó đã tồn tại trong phiếu nhập
    const chiTietPhieuNhapExist = await ChiTietPhieuNhap.findOne({
        maPhieuNhap: idPhieuNhap,
        maSanPham: chiTietPhieuNhap.maSanPham
    });

    if (chiTietPhieuNhapExist) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }
    try {
        // cập nhật số lượng sản phẩm
        await SanPham.findByIdAndUpdate(
            chiTietPhieuNhap.maSanPham,
            {
                $inc: {
                    soLuong: chiTietPhieuNhap.soLuongNhap
                }
            },
            { runValidators: true, session }
        );

        const createdChiTietPhieuNhap = new ChiTietPhieuNhap({
            maPhieuNhap: idPhieuNhap,
            ngayNhap: phieuNhap.ngayNhap,
            ...chiTietPhieuNhap,
        });
        await createdChiTietPhieuNhap.save({ session });
        await session.commitTransaction();

        phieuNhap.chiTiet.push(createdChiTietPhieuNhap._id);
        await phieuNhap.save();

        const updatedPhieuNhap = await phieuNhap.populate(populateOptions);

        return updatedPhieuNhap;
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message);
    } finally {
        await session.endSession();
    }
};

/* 
- Tăng số lượng sản phẩm trong kho dựa theo số lượng nhập
- Giảm số lượng sản phẩm trong kho của sản phẩm bị thay đổi
- Nếu số lượng sau khi giảm < 0 thì hủy transaction và báo lỗi
*/
const update = async (idPhieuNhap, idChiTietPhieuNhap, chiTietPhieuNhap, currentUser) => {
    const phieuNhap = await PhieuNhap.findOne({
        _id: idPhieuNhap,
        chiTiet: idChiTietPhieuNhap
    }).populate('chiTiet');

    if (!phieuNhap) {
        throw new UserInputError('Phiếu nhập không tồn tại');
    }

    throwIfUserCantMutate(currentUser.role, phieuNhap.createdAt,
        'Nhân viên không thể cập nhật phiếu nhập đã được tạo quá 24 giờ'
    );

    // kiểm tra sản phẩm đã tồn tại trong phiếu nhập chưa
    const chiTietPhieuNhapExist = phieuNhap.chiTiet.find(
        item => (
            item.maSanPham.toString() === chiTietPhieuNhap.maSanPham
            && item._id.toString() !== idChiTietPhieuNhap
        )
    );

    if (chiTietPhieuNhapExist) {
        throw new UserInputError('Sản phẩm trong 1 phiếu nhập không được trùng nhau');
    }

    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        // cập nhật chi tiết phiếu nhập
        // options không có new để lấy lại chi tiết trước khi cập nhật
        // chi tiết này sẽ có mã sản phẩm cũ để cập nhật lại số lượng sản phẩm
        const chiTietToBeUpdated = await ChiTietPhieuNhap.findByIdAndUpdate(
            idChiTietPhieuNhap,
            chiTietPhieuNhap,
            { runValidators: true, session }
        );

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

        // phục hồi (giảm) số lượng sản phẩm trong kho
        // đối với sản phẩm trong chi tiết bị cập nhật
        const updatedSanPham = await SanPham.findByIdAndUpdate(
            chiTietToBeUpdated.maSanPham,
            {
                $inc: {
                    soLuong: -chiTietToBeUpdated.soLuongNhap
                }
            },
            { new: true, runValidators: true, session }
        );

        // sau khi giảm số lượng nếu thấy sản phẩm < 0 thì hủy transaction
        if (updatedSanPham.soLuong < 0) {
            throw new UserInputError('Số lượng sản phẩm trong kho không đủ');
        }

        await session.commitTransaction();

        await phieuNhap.save(); // trigger middleware cập nhật tổng tiền

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

const remove = async (idPhieuNhap, idChiTietPhieuNhap, currentUser) => {
    const session = await SanPham.startSession();
    session.startTransaction();

    // kiểm tra xem phiếu nhập và chi tiết phiếu nhập có tồn tại hay không
    const phieuNhap = await PhieuNhap.findOne({
        _id: idPhieuNhap,
        chiTiet: idChiTietPhieuNhap
    }).populate('chiTiet');

    if (!phieuNhap) {
        // phiếu nhập hoặc chi tiết phiếu nhập không tồn tại
        throw new UserInputError('Phiếu nhập không tồn tại');
    }

    throwIfUserCantMutate(currentUser.role, phieuNhap.createdAt,
        'Nhân viên không thể cập nhật phiếu nhập đã được tạo quá 24 giờ'
    );

    try {
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

        await ChiTietPhieuNhap.findByIdAndDelete(idChiTietPhieuNhap);
        await session.commitTransaction();

        phieuNhap.chiTiet.pull(idChiTietPhieuNhap);
        await phieuNhap.save();

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

module.exports = {
    getBySanPhamID,
    create,
    update,
    remove,
};