const checkIfDuplicateExists = (array) => {
    return new Set(array).size !== array.length;
};

const isMongooseModel = (obj) => {
    return obj.constructor.name.toLowerCase() === 'model';
};

const escapeRegExp = (string = '') => {
    return (string || '').replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
};

module.exports = {
    checkIfDuplicateExists,
    isMongooseModel,
    escapeRegExp
};