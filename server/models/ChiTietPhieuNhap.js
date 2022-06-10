const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const chiTietPhieuNhapSchema = mongoose.Schema(
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
        },
        ngayNhap: {
            type: Date,
            required: true
        },
        ghiChu: {
            type: String,
            trim: true,
            default: ''
        }
    },
    {
        timestamps: true
    }
);

chiTietPhieuNhapSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ChiTietPhieuNhap', chiTietPhieuNhapSchema);