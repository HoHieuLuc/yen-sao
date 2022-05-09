const mongoose = require('mongoose');

const configSchema = new mongoose.Schema(
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

module.exports = mongoose.model('Config', configSchema);