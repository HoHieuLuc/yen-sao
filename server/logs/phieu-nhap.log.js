const logHelper = require('./helper.log');

const create = async (phieuNhap, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'create',
        'PhieuNhap',
        phieuNhap._id,
        `Tạo phiếu nhập ngày ${new Date(phieuNhap.ngayNhap)
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
        `Cập nhật phiếu nhập ngày ${new Date(phieuNhap.ngayNhap)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuNhap),
    );
};

const remove = async (phieuNhap, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'delete',
        'PhieuNhap',
        phieuNhap._id,
        `Xóa phiếu nhập ngày ${new Date(phieuNhap.ngayNhap)
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