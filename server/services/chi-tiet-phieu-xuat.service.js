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

const getBySanPhamID = async (id, page, limit) => {
    const options = {
        page,
        limit,
        sort: '-createdAt'
    };
    try {
        const chiTiets = await ChiTietPhieuXuat.paginate({
            maSanPham: id
        }, options);
        return chiTiets;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

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

        const createdChiTietPhieuXuat = new ChiTietPhieuXuat({
            maPhieuXuat: idPhieuXuat,
            ...chiTietPhieuXuat
        });
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

        // nếu sản phẩm trước khi cập nhật cũng là sản phẩm được cập nhật
        // tức là chỉ cập nhật số lượng hoặc đơn giá xuất (mã sản phẩm không đổi)
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

const remove = async (idPhieuXuat, idChiTietPhieuXuat) => {
    const session = await SanPham.startSession();
    session.startTransaction();
    try {
        const phieuXuat = await PhieuXuat.findOne({
            _id: idPhieuXuat,
            chiTiet: idChiTietPhieuXuat
        }).populate('chiTiet').session(session);

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
            { new: true, runValidators: true, session }
        );

        await ChiTietPhieuXuat.findByIdAndDelete(idChiTietPhieuXuat, { session });
        
        phieuXuat.chiTiet.pull(idChiTietPhieuXuat);
        await phieuXuat.save();
        await session.commitTransaction();

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