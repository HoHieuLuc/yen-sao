const mongoose = require('mongoose');

const chiTietPhieuNhap = mongoose.Schema(
    {
        maPhieuNhap: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PhieuNhap',
            required: true
        },
        maSanPham: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SanPham',
            required: true
        },
        soLuongNhap: {
            type: Number,
            required: true,
            min: [1, 'Số lượng nhập phải lớn hơn 0']
        },
        donGiaNhap: {
            type: Number,
            required: true,
            min: [0, 'Giá nhập không hợp lệ']
        }
    },
    {
        timestamp: true
    }
);

module.exports = mongoose.model('ChiTietPhieuNhap', chiTietPhieuNhap);