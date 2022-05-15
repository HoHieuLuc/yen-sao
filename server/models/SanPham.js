const mongoose = require('mongoose');
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
            min: 0,
            default: 0
        },
        donGiaSi: {
            type: Number,
            required: true,
            min: 0
        },
        donGiaLe: {
            type: Number,
            required: true,
            min: 0
        },
        donGiaTuyChon: {
            type: String
        },
        moTa: {
            type: String,
            trim: true
        },
        anhSanPham: {
            type: [String],
            required: true,
            validate: {
                validator: function (v) {
                    return v.length > 0 && v.length <= 5;
                },
                message: 'Ảnh sản phẩm phải có ít nhất 1 ảnh và nhiều nhất 5 ảnh'
            }
        },
        tags: {
            type: [String],
        },
        xuatXu: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

sanPham.plugin(mongoosePaginate);

module.exports = mongoose.model('SanPham', sanPham);