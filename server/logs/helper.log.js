const ActivityLog = require('../models/ActivityLog');

const create = async (
    userId,
    action,
    onCollection,
    onDocumentId,
    descriptionName,
    descriptionValue
) => {
    return ActivityLog.create({
        userId,
        action,
        onCollection,
        onDocumentId,
        description: {
            name: descriptionName,
            value: descriptionValue
        },
    });
};

module.exports = {
    create
};