const mongoose = require('mongoose');

const loaiSanPham = mongoose.Schema({
    tenLoaiSanPham: {
        type: String,
        required: true,
        trim: true
    },
    moTa: {
        type: String,
        trim: true
    },
});

module.exports = mongoose.model('LoaiSanPham', loaiSanPham);