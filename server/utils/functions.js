const { ForbiddenError } = require('apollo-server');

const checkIfDuplicateExists = (array) => {
    return new Set(array).size !== array.length;
};

const isMongooseModel = (obj) => {
    return obj.constructor.name.toLowerCase() === 'model';
};

const escapeRegExp = (string = '') => {
    return (string || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

// 24 * 3600 * 1000 = 24h in milliseconds
const throwIfUserCantMutate = (role, createdAt, message) => {
    if (
        role === 'staff' &&
        new Date().getTime() - createdAt.getTime() > (24 * 3600 * 1000)
    ) {
        throw new ForbiddenError(message);
    }
};

module.exports = {
    checkIfDuplicateExists,
    throwIfUserCantMutate,
    isMongooseModel,
    escapeRegExp,
};