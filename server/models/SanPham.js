const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const slugify = require('slugify');
const { nanoid } = require('nanoid');

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
            type: String,
            default: ''
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
            default: []
        },
        xuatXu: {
            type: String,
            trim: true,
            default: ''
        },
        isPublic: {
            type: Boolean,
            default: false
        },
        slug: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

sanPham.plugin(mongoosePaginate);

sanPham.pre('save', function (next) {
    const slug = slugify(
        this.tenSanPham,
        {
            lower: true,
            locale: 'vi'
        }
    );
    this.slug = `${slug}-${nanoid(5)}`;
    next();
});


sanPham.pre('findOneAndUpdate', function (next) {
    const slug = slugify(
        this._update.tenSanPham,
        {
            lower: true,
            locale: 'vi'
        }
    );
    this._update.slug = `${slug}-${nanoid(5)}`;
    next();
});

module.exports = mongoose.model('SanPham', sanPham);