const mongoose = require('mongoose');

const pageSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true
        },
        content: {
            type: String,
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('Page', pageSchema);