const { finished } = require('stream/promises');
const path = require('path');
const fs = require('fs');
const { nanoid } = require('nanoid');

const singleUpload = async (file) => {
    const { createReadStream, filename } = await file;

    const stream = createReadStream();
    const newFilename = `${nanoid()}-${filename}`;
    const pathName = path.join(
        __dirname,
        `../public/uploads/${newFilename}`
    );

    const out = fs.createWriteStream(pathName);
    stream.pipe(out);
    await finished(out);
    return `/public/uploads/${newFilename}`;
};

module.exports = {
    singleUpload
};