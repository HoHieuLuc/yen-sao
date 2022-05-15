const userService = require('../services/user.service');
const { escapeRegExp } = require('../utils/functions');
const { ForbiddenError } = require('apollo-server');

const getAll = async (page, limit, search = '') => {
    return userService.getAll(page, limit, escapeRegExp(search));
};

const getById = async (id) => {
    return userService.getById(id);
};

const login = async (username, password) => {
    return userService.login(username, password);
};

const create = async (newUser) => {
    return userService.create(newUser);
};

const getCurrentUser = async (authHeader) => {
    return userService.getCurrentUser(authHeader);
};

const changePassword = async (username, oldPassword, newPassword) => {
    return userService.changePassword(username, oldPassword, newPassword);
};

const banById = async (id, isBanned, currentUserId) => {
    if (currentUserId.toString() !== id.toString()) {
        return userService.banById(id, isBanned);
    }
    throw new ForbiddenError('Bạn không thể làm điều này');
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