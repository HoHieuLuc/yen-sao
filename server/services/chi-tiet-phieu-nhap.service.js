const { UserInputError } = require('apollo-server');
const ChiTietPhieuNhap = require('../models/ChiTietPhieuNhap');
const PhieuNhap = require('../models/PhieuNhap');
const SanPham = require('../models/SanPham');

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
        const chiTiets = await ChiTietPhieuNhap.paginate({
            maSanPham: id,
            ...findOptions
        }, options);
        return chiTiets;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const create = async (idPhieuNhap, chiTietPhieuNhap) => {
    const session = await SanPham.startSession();
    session.startTransaction();

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
        const phieuNhap = await PhieuNhap.findById(idPhieuNhap).session(session);

        if (!phieuNhap) {
            throw new UserInputError('Phiếu nhập không tồn tại');
        }

        // cập nhật số lượng sản phẩm
        await SanPham.findByIdAndUpdate(
            chiTietPhieuNhap.maSanPham,
            {
                $inc: {
                    soLuong: chiTietPhieuNhap.soLuongNhap
                }
            },
            { new: true, runValidators: true, session }
        );

        const createdChiTietPhieuNhap = new ChiTietPhieuNhap({
            maPhieuNhap: idPhieuNhap,
            ...chiTietPhieuNhap,
        });
        await createdChiTietPhieuNhap.save();

        phieuNhap.chiTiet.push(createdChiTietPhieuNhap._id);
        await phieuNhap.save();

        await session.commitTransaction();

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
const update = async (idPhieuNhap, idChiTietPhieuNhap, chiTietPhieuNhap) => {
    const phieuNhap = await PhieuNhap.findOne({
        _id: idPhieuNhap,
        chiTiet: idChiTietPhieuNhap
    }).populate('chiTiet');

    if (!phieuNhap) {
        throw new UserInputError('Phiếu nhập không tồn tại');
    }

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

const remove = async (idPhieuNhap, idChiTietPhieuNhap) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        // kiểm tra xem phiếu nhập và chi tiết phiếu nhập có tồn tại hay không
        const phieuNhap = await PhieuNhap.findOne({
            _id: idPhieuNhap,
            chiTiet: idChiTietPhieuNhap
        }).populate('chiTiet').session(session);

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

        await ChiTietPhieuNhap.findByIdAndDelete(idChiTietPhieuNhap);

        phieuNhap.chiTiet.pull(idChiTietPhieuNhap);
        await phieuNhap.save();

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

module.exports = {
    getBySanPhamID,
    create,
    update,
    remove,
};