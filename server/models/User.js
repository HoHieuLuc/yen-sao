const mongoose = require('mongoose');
const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_LIFETIME } = require('../utils/config');

const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    password: {
        type: String,
        required: true,
        minlength: 8
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(.+)@(\S+)$/, 'Please provide a valid email']
    },
    fullname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'staff'
    }
});

UserSchema.pre('save', async function () {
    const salt = await bscrypt.genSalt(10);
    this.password = await bscrypt.hash(this.password, salt);
});

UserSchema.methods.comparePassword = async function (candidatePassword) {
    return bscrypt.compare(candidatePassword, this.password);
};

UserSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            id: this._id
        },
        JWT_SECRET,
        {
            expiresIn: JWT_LIFETIME
        }
    );
};

module.exports = mongoose.model('User', UserSchema);