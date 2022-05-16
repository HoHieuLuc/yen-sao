const activityLogService = require('../services/activity-log.service');
const { UserInputError } = require('apollo-server');
const mongoose = require('mongoose');

const getAll = async (page, limit) => {
    return activityLogService.getAll(page, limit);
};

const getByUserId = async (page, limit, userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new UserInputError('Mã người dùng không hợp lệ');
    }
    return activityLogService.getByUserId(page, limit, userId);
};

const getByDocumentId = async (page, limit, documentId) => {
    if (!mongoose.Types.ObjectId.isValid(documentId)) {
        throw new UserInputError('Mã tài liệu không hợp lệ');
    }
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
    getAll,
    remove,
    my,
};