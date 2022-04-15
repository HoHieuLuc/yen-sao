const { UserInputError, AuthenticationError } = require('apollo-server');
const User = require('../models/User');
const Test = require('../models/Test');
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

const createUser = async (newUser) => {
    const session = await Test.startSession();
    try {
        session.startTransaction();
        const user = await User.create([newUser], { session });
        await Test.create([{ value: 12 }], { session });
        await session.commitTransaction();
        console.log(user);
        return user[0];
    } catch (error) {
        await session.abortTransaction();
        throw new UserInputError(error.message, {
            invalidArgs: newUser
        });
    } finally {
        session.endSession();
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
    createUser,
    login,
    getCurrentUser
};