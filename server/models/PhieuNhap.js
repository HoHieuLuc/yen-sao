const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');
const ChiTietPhieuNhap = require('./ChiTietPhieuNhap');

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
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ChiTietPhieuNhap',
                required: true,
            }
        ],
    },
    {
        timestamps: true
    }
);

phieuNhap.pre('save', async function () {
    const allChiTiets = await ChiTietPhieuNhap.find({
        _id: {
            $in: this.chiTiet
        }
    });
    this.tongTien = allChiTiets.reduce(
        (sum, { soLuongNhap, donGiaNhap }) =>
            sum + soLuongNhap / 100 * donGiaNhap,
        0
    );
});

phieuNhap.plugin(mongoosePaginate);

module.exports = mongoose.model('PhieuNhap', phieuNhap);