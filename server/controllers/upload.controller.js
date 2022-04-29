const { UserInputError } = require('apollo-server');
const uploadService = require('../services/upload.service');

const singleUpload = async (file) => {
    return uploadService.singleUpload(file);
};

const multiUpload = async (files) => {
    if (files.length > 3) {
        throw new UserInputError('Bạn chỉ được phép upload tối đa 3 ảnh.');
    }
    return uploadService.multiUpload(files);
};

module.exports = {
    singleUpload,
    multiUpload
};