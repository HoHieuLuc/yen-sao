const mongoosePaginate = require('mongoose-paginate-v2');
const ChiTietPhieuXuat = require('./ChiTietPhieuXuat');
const mongoose = require('mongoose');

const phieuXuatSchema = mongoose.Schema(
    {
        nguoiXuat: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        nguoiMua: {
            type: String,
            required: true,
            trim: true,
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

phieuXuatSchema.pre('save', async function () {
    const allChiTiets = await ChiTietPhieuXuat.find({
        _id: {
            $in: this.chiTiet
        }
    });
    this.tongTien = allChiTiets.reduce(
        (sum, { soLuongXuat, donGiaXuat }) =>
            sum + soLuongXuat / 100 * donGiaXuat,
        0
    );
});

phieuXuatSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('PhieuXuat', phieuXuatSchema);