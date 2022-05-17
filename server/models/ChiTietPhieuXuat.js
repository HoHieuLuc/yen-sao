const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

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
        },
        ngayXuat: {
            type: Date,
            required: true
        },
        ghiChu: {
            type: String,
            trim: true,
            default: ''
        },
    },
    {
        timestamps: true
    }
);

chiTietPhieuXuat.plugin(mongoosePaginate);

module.exports = mongoose.model('ChiTietPhieuXuat', chiTietPhieuXuat);