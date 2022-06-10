const mongoosePaginate = require('mongoose-paginate-v2');
const sanitizeHtml = require('sanitize-html');
const { nanoid } = require('nanoid');
const mongoose = require('mongoose');
const slugify = require('slugify');

const sanPhamSchema = mongoose.Schema(
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
        },
        isFeatured: {
            type: Boolean,
            default: false
        }
    },
    {
        timestamps: true
    }
);

sanPhamSchema.plugin(mongoosePaginate);

sanPhamSchema.pre('save', function (next) {
    const slug = slugify(
        this.tenSanPham,
        {
            lower: true,
            locale: 'vi'
        }
    );
    this.slug = `${slug}-${nanoid(5)}`;
    this.moTa = sanitizeHtml(this.moTa, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
        allowedClasses: {
            '*': ['*']
        }
    });
    next();
});


sanPhamSchema.pre('findOneAndUpdate', async function (next) {
    const sanPhamToUpdate = await this.model.findById(this.getQuery()._id);
    
    if(sanPhamToUpdate.tenSanPham === this.getUpdate().tenSanPham) {
        return next();
    }

    const slug = slugify(
        this._update.tenSanPham,
        {
            lower: true,
            locale: 'vi'
        }
    );
    this.getUpdate().slug = `${slug}-${nanoid(5)}`;

    this.getUpdate().moTa = sanitizeHtml(this.getUpdate().moTa, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat([ 'img' ]),
        allowedClasses: {
            '*': ['*']
        }
    });

    next();
});

module.exports = mongoose.model('SanPham', sanPhamSchema);