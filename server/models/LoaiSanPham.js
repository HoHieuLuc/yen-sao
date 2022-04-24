const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const loaiSanPham = mongoose.Schema(
    {
        tenLoaiSanPham: {
            type: String,
            required: true,
            trim: true
        },
        moTa: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

loaiSanPham.plugin(mongoosePaginate);

module.exports = mongoose.model('LoaiSanPham', loaiSanPham);