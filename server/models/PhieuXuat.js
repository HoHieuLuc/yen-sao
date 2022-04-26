const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const SanPham = require('./SanPham');

const phieuXuat = mongoose.Schema(
    {
        nguoiXuat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        ngayXuat: {
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
                soLuongXuat: {
                    type: Number,
                    required: true,
                    min: 1
                },
                donGiaXuat: {
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

phieuXuat.pre('save', function (next) {
    const { chiTiet } = this;
    this.tongTien = chiTiet.reduce(
        (sum, { soLuongXuat, donGiaXuat }) => sum + soLuongXuat * donGiaXuat, 0
    );
    next();
});

phieuXuat.plugin(mongoosePaginate);

module.exports = mongoose.model('PhieuXuat', phieuXuat);