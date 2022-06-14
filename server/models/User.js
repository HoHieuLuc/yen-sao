const { JWT_SECRET, JWT_LIFETIME } = require('../utils/config');
const mongoosePaginate = require('mongoose-paginate-v2');
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');
const bscrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: [6, 'Tên tài khoản phải từ 6 kí tự trở lên'],
        validate: {
            validator: function (v) {
                return /^[a-zA-Z0-9]+$/.test(v);
            },
            message: 'Tài khoản không hợp lệ'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: [8, 'Mật khẩu phải từ 8 kí tự trở lên']
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^(.+)@(\S+)$/, 'Email không hợp lệ']
    },
    fullname: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'staff',
        enum: {
            values: ['staff', 'admin'],
            message: '{VALUE} không phải là quyền hợp lệ'
        }
    },
    isBanned: {
        type: Boolean,
        default: false
    },
    secret: {
        type: String,
        default: nanoid(10)
    }
});

userSchema.pre('save', async function () {
    const salt = await bscrypt.genSalt(10);
    this.password = await bscrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    return bscrypt.compare(candidatePassword, this.password);
};

userSchema.methods.createJWT = function () {
    return jwt.sign(
        {
            id: this._id,
            secret: this.secret
        },
        JWT_SECRET,
        {
            expiresIn: JWT_LIFETIME
        }
    );
};

userSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('User', userSchema);