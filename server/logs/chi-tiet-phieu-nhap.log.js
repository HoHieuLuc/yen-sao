const logHelper = require('./helper.log');

const create = async (phieuNhap, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'PhieuNhap',
        phieuNhap._id,
        `Thêm 1 sản phẩm mới vào phiếu nhập ngày ${new Date(phieuNhap.ngayNhap)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuNhap),
    );
};

const update = async (phieuNhap, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'PhieuNhap',
        phieuNhap._id,
        `Cập nhật 1 sản phẩm trong phiếu nhập ngày ${new Date(phieuNhap.ngayNhap)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuNhap),
    );
};

const remove = async (phieuNhap, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'PhieuNhap',
        phieuNhap._id,
        `Xóa 1 sản phẩm khỏi phiếu nhập ngày ${new Date(phieuNhap.ngayNhap)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuNhap),
    );
};

module.exports = {
    create,
    update,
    remove
};