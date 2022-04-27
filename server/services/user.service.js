const { UserInputError, AuthenticationError } = require('apollo-server');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../utils/config');

const login = async (username, password) => {
    const user = await User.findOne({ username });
    if (!user) {
        throw new AuthenticationError('Sai tài khoản hoặc mật khẩu');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
        throw new AuthenticationError('Sai tài khoản hoặc mật khẩu');
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
            return { currentUser };
        } catch (error) {
            throw new AuthenticationError('Token không hợp lệ');
        }
    }
};

module.exports = {
    create,
    login,
    getCurrentUser
};