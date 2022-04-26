const checkIfDuplicateExists = (array) => {
    return new Set(array).size !== array.length;
};

const isMongooseModel = (obj) => {
    return obj.constructor.name.toLowerCase() === 'model';
};

module.exports = {
    checkIfDuplicateExists,
    isMongooseModel
};