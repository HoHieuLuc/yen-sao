const userService = require('../services/user.service');
const { escapeRegExp } = require('../utils/functions');
const { ForbiddenError, UserInputError } = require('apollo-server');
const mongoose = require('mongoose');
const userLogger = require('../logs/user.log');

const getAll = async (page, limit, search = '') => {
    return userService.getAll(page, limit, escapeRegExp(search));
};

const getById = async (id) => {
    return userService.getById(id);
};

const login = async (username, password) => {
    return userService.login(username, password);
};

const create = async (newUser, currentUser) => {
    const user = await userService.create(newUser);
    await userLogger.create(user, currentUser);
    return user;
};

const getCurrentUser = async (authHeader) => {
    return userService.getCurrentUser(authHeader);
};

const changePassword = async (oldPassword, newPassword, currentUser) => {
    const user = await userService.changePassword(oldPassword, newPassword, currentUser);
    await userLogger.changePassword(user, currentUser);
    return user;
};

const banById = async (id, isBanned, currentUser) => {
    if (!mongoose.isValidObjectId(id)) {
        throw new UserInputError('Mã người dùng không hợp lệ');
    }
    if (currentUser._id.toString() === id.toString()) {
        throw new ForbiddenError('Bạn không thể làm điều này');
    }
    const user = await userService.banById(id, isBanned);
    await userLogger.banById(user, currentUser);
    return user;
};

module.exports = {
    login,
    create,
    getAll,
    getById,
    banById,
    getCurrentUser,
    changePassword,
};