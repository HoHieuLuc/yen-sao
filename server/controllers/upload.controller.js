const uploadService = require('../services/upload.service');

const singleUpload = async (file) => {
    return uploadService.singleUpload(file);
};

module.exports = {
    singleUpload
};