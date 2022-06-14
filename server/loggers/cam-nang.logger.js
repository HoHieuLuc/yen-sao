const logHelper = require('./helper.logger');

const create = async (camNang, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'create',
        'CamNang',
        camNang._id,
        `Thêm cẩm nang ${camNang.tieuDe}`,
        JSON.stringify(camNang),
    );
};

const update = async (camNang, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'CamNang',
        camNang._id,
        `Cập nhật cẩm nang ${camNang.tieuDe}`,
        JSON.stringify(camNang),
    );
};

const remove = async (camNang, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'delete',
        'CamNang',
        camNang._id,
        `Xóa cẩm nang ${camNang.tieuDe}`,
        JSON.stringify(camNang),
    );
};

module.exports = {
    create,
    update,
    remove
};