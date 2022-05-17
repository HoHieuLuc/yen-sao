const logHelper = require('./helper.logger');

const create = async ({ _doc: { password: _, ...user } }, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'create',
        'User',
        user._id,
        `Tạo tài khoản ${user.username}`,
        JSON.stringify(user),
    );
};

const changePassword = async (user, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'User',
        user._id,
        `Đổi mật khẩu`,
        JSON.stringify({}),
    );
};

const banById = async (user, currentUser) => {
    await logHelper.create(
        currentUser._id,
        'update',
        'User',
        user._id,
        `${user.isBanned ? 'Khóa' : 'Mở khóa'} tài khoản ${user.username}`,
        JSON.stringify({}),
    );
};

module.exports = {
    create,
    changePassword,
    banById,
};