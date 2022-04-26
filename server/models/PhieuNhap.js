const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const SanPham = require('./SanPham');

const phieuNhap = mongoose.Schema(
    {
        nguoiNhap: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        ngayNhap: {
            type: Date,
            default: new Date()
        },
        tongTien: {
            type: Number,
        },
        chiTiet: [
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
                    min: 1
                },
                donGiaNhap: {
                    type: Number,
                    required: true,
                    min: 0
                }
            }
        ],
    },
    {
        timestamps: true
    }
);

phieuNhap.pre('save', function (next) {
    const { chiTiet } = this;
    this.tongTien = chiTiet.reduce(
        (sum, { soLuongNhap, donGiaNhap }) => sum + soLuongNhap * donGiaNhap, 0
    );
    next();
});

phieuNhap.plugin(mongoosePaginate);

module.exports = mongoose.model('PhieuNhap', phieuNhap);