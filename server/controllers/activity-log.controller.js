const activityLogService = require('../services/activity-log.service');
const { UserInputError } = require('apollo-server');

const getAll = async (page, limit) => {
    return activityLogService.getAll(page, limit);
};

const getById = async (id) => {
    return activityLogService.getById(id);
};

const getByUserId = async (page, limit, userId) => {
    return activityLogService.getByUserId(page, limit, userId);
};

const getByDocumentId = async (page, limit, documentId) => {
    return activityLogService.getByDocumentId(page, limit, documentId);
};

const my = async (page, limit, currentUser) => {
    return activityLogService.my(page, limit, currentUser);
};

const remove = async (from, to) => {
    if(!from && !to) {
        throw new UserInputError('Vui lòng nhập khoảng thời gian cần xóa');
    }
    return activityLogService.remove(from, to);
};

module.exports = {
    getByDocumentId,
    getByUserId,
    getById,
    getAll,
    remove,
    my,
};