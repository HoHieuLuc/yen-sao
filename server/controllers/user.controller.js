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

module.exports = {
    create,
    login,
    getCurrentUser
};