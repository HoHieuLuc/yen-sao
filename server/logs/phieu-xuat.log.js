const logHelper = require('./helper.log');

const create = async (phieuXuat, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'create',
        'PhieuXuat',
        phieuXuat._id,
        `Tạo phiếu xuất ngày ${new Date(phieuXuat.ngayXuat)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuXuat),
    );
};

const update = async (phieuXuat, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'PhieuXuat',
        phieuXuat._id,
        `Cập nhật phiếu xuất ngày ${new Date(phieuXuat.ngayXuat)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuXuat),
    );
};

const remove = async (phieuXuat, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'delete',
        'PhieuXuat',
        phieuXuat._id,
        `Xóa phiếu xuất ngày ${new Date(phieuXuat.ngayXuat)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuXuat),
    );
};

module.exports = {
    create,
    update,
    remove
};