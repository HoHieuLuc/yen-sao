const mongoose = require('mongoose');
const LoaiSanPham = require('./LoaiSanPham');
const mongoosePaginate = require('mongoose-paginate-v2');

const sanPham = mongoose.Schema(
    {
        tenSanPham: {
            type: String,
            required: true,
            trim: true
        },
        soLuong: {
            type: Number,
            required: true,
            min: 0
        },
        donGia: {
            type: Number,
            required: true,
            min: 0
        },
        moTa: {
            type: String,
            trim: true
        },
        anhSanPham: {
            type: [String],
        },
        loaiSanPham: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LoaiSanPham',
            required: true,
            validate: {
                validator: async (v) => {
                    const loaiSanPham = await LoaiSanPham.findById(v);
                    return !!loaiSanPham;
                },
                message: 'Loại sản phẩm không tồn tại'
            }
        }
    },
    {
        timestamps: true
    }
);

sanPham.plugin(mongoosePaginate);

module.exports = mongoose.model('SanPham', sanPham);