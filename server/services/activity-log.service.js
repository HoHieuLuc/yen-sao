const ActivityLog = require('../models/ActivityLog');

const paginateOptions = (page, limit) => ({
    page,
    limit,
    sort: '-createdAt',
    populate: 'userId'
});

const getAll = async (page, limit) => {
    return ActivityLog.paginate({}, paginateOptions(page, limit));
};

const getByUserId = async (page, limit, userId) => {
    return ActivityLog.paginate({
        userId
    }, paginateOptions(page, limit));
};

const getByDocumentId = async (page, limit, documentId) => {
    return ActivityLog.paginate({
        onDocumentId: documentId
    }, paginateOptions(page, limit));
};

const my = async (page, limit, currentUser) => {
    return getByUserId(page, limit, currentUser._id);
};

const remove = async (from, to) => {
    let findOptions = {};

    const createdAt = {};
    if (from) {
        createdAt.$gte = from;
    }
    if (to) {
        createdAt.$lte = to;
    }
    findOptions = {
        createdAt
    };

    await ActivityLog.deleteMany(findOptions);
    return true;
};

module.exports = {
    getByDocumentId,
    getByUserId,
    getAll,
    remove,
    my,
};