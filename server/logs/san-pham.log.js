const logHelper = require('./helper.log');

const create = async (sanPham, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'create',
        'SanPham',
        sanPham._id,
        `Thêm sản phẩm ${sanPham.tenSanPham}`,
        JSON.stringify(sanPham),
    );
};

const update = async (sanPham, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'SanPham',
        sanPham._id,
        `Cập nhật sản phẩm ${sanPham.tenSanPham}`,
        JSON.stringify(sanPham),
    );
};

const remove = async (sanPham, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'delete',
        'SanPham',
        sanPham._id,
        `Xóa sản phẩm ${sanPham.tenSanPham}`,
        JSON.stringify(sanPham),
    );
};

module.exports = {
    create,
    update,
    remove
};