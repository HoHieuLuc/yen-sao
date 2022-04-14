const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    value: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model('Test', UserSchema);