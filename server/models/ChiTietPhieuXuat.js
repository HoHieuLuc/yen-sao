const mongoose = require('mongoose');

const chiTietPhieuXuat = mongoose.Schema(
    {
        maPhieuXuat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'PhieuXuat',
            required: true
        },
        maSanPham: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SanPham',
            required: true
        },
        soLuongXuat: {
            type: Number,
            required: true,
            min: [1, 'Số lượng xuất phải lớn hơn 0']
        },
        donGiaXuat: {
            type: Number,
            required: true,
            min: [0, 'Giá xuất không hợp lệ']
        }
    },
    {
        timestamp: true
    }
);

module.exports = mongoose.model('ChiTietPhieuXuat', chiTietPhieuXuat);