const { UserInputError, AuthenticationError } = require('apollo-server');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const getAll = async (page, limit, search) => {
    const options = {
        page,
        limit,
        sort: '-createdAt',
    };
    return User.paginate({
        $or: [
            { username: { $regex: search, $options: 'i' } },
            { email: { $regex: search, $options: 'i' } },
            { fullname: { $regex: search, $options: 'i' } },
        ]
    }, options);
};

const getById = async (id) => {
    try {
        const user = await User.findById(id);
        return user;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new AuthenticationError('Sai tài khoản hoặc mật khẩu');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Sai tài khoản hoặc mật khẩu');
    }

    if (user.isBanned) {
        throw new AuthenticationError('Tài khoản của bạn đã bị khóa');
    }

    const token = user.createJWT();
    return {
        value: token
    };
};

const create = async (newUser) => {
    try {
        const user = await User.create(newUser);
        return user;
    } catch (error) {
        throw new UserInputError(error.message, {
            invalidArgs: newUser
        });
    }
};

const getCurrentUser = async (authHeader) => {
    if (authHeader && authHeader.toLowerCase().startsWith('bearer ')) {
        const token = authHeader.split(' ')[1];
        try {
            const payload = jwt.verify(token, JWT_SECRET);
            const currentUser = await User.findById(payload.id, '-password');
            if (currentUser.isBanned) {
                throw new AuthenticationError('Tài khoản của bạn đã bị khóa');
            }
            return { currentUser };
        } catch (error) {
            throw new AuthenticationError(error.message);
        }
    }
};

const changePassword = async (oldPassword, newPassword, currentUser) => {
    const user = await User.findById(currentUser._id);

    const isPasswordCorrect = await user.comparePassword(oldPassword);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Mật khẩu cũ không đúng');
    }

    const isSamePassword = await user.comparePassword(newPassword);
    if (isSamePassword) {
        throw new AuthenticationError('Mật khẩu mới không được giống mật khẩu cũ');
    }

    user.password = newPassword;
    await user.save();

    return user;
};

const banById = (id, isBanned) => {
    return User.findByIdAndUpdate(
        id,
        { isBanned },
        { new: true, runValidators: true }
    );
};

module.exports = {
    login,
    getAll,
    create,
    getById,
    banById,
    getCurrentUser,
    changePassword,
};