const userService = require('../services/user.service');

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

module.exports = {
    create,
    login,
    getCurrentUser,
    changePassword
};