const mongoose = require('mongoose');
const SanPham = require('./SanPham');

const chiTietPhieuXuat = mongoose.Schema(
    {
        maSanPham: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SanPham',
            required: true,
            validate: {
                validator: async (v) => {
                    const sanPham = await SanPham.findById(v);
                    return !!sanPham;
                },
                message: 'Sản phẩm không tồn tại'
            }
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