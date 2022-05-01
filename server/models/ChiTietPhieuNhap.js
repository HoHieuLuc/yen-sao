const mongoose = require('mongoose');
const SanPham = require('./SanPham');

const chiTietPhieuNhap = mongoose.Schema(
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