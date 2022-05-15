const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ChiTietPhieuXuat = require('./ChiTietPhieuXuat');

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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ChiTietPhieuXuat',
                required: true,
            }
        ],
    },
    {
        timestamps: true
    }
);

phieuXuat.pre('save', async function () {
    const allChiTiets = await ChiTietPhieuXuat.find({
        _id: {
            $in: this.chiTiet
        }
    });
    this.tongTien = allChiTiets.reduce(
        (sum, { soLuongXuat, donGiaXuat }) => sum + soLuongXuat * donGiaXuat, 0
    );
});

phieuXuat.plugin(mongoosePaginate);

module.exports = mongoose.model('PhieuXuat', phieuXuat);