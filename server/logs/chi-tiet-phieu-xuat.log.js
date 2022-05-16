const logHelper = require('./helper.log');

const create = async (phieuXuat, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'PhieuXuat',
        phieuXuat._id,
        `Thêm 1 sản phẩm mới vào phiếu xuất ngày ${new Date(phieuXuat.ngayXuat)
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
        `Cập nhật 1 sản phẩm trong phiếu xuất ngày ${new Date(phieuXuat.ngayXuat)
            .toLocaleDateString('vi-VN')
        }`,
        JSON.stringify(phieuXuat),
    );
};

const remove = async (phieuXuat, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'PhieuXuat',
        phieuXuat._id,
        `Xóa 1 sản phẩm khỏi phiếu xuất ngày ${new Date(phieuXuat.ngayXuat)
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