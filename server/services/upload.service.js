const { UserInputError } = require('apollo-server');
const cloudinary = require('cloudinary').v2;

const singleUpload = async (file) => {
    const { createReadStream } = await file;
    const stream = createReadStream();
    try {
        const result = await new Promise((resolve, reject) => {
            stream.pipe(
                cloudinary.uploader.upload_stream({
                    folder: 'yen-sao'
                }, (error, result) => {
                    if (error) {
                        reject(error);
                    }

                    resolve(result);
                })
            );
        });
        return result.secure_url;
    } catch (error) {
        console.log(error);
        throw new UserInputError(error.message);
    }
};

const multiUpload = async (files) => {
    const result = [];
    const arrayOfPromises = [];
    for (const file of files) {
        arrayOfPromises.push(singleUpload(file));
    }
    result.push(...await Promise.all(arrayOfPromises));
    return result;
};

module.exports = {
    singleUpload,
    multiUpload
};