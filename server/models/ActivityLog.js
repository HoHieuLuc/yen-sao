const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const activityLogSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        action: {
            type: String,
            required: true,
            enum: {
                values: ['create', 'update', 'delete'],
            }
        },
        onCollection: {
            type: String,
            required: true,
            enum: {
                values: ['PhieuNhap', 'PhieuXuat', 'SanPham', 'User'],
            }
        },
        onDocumentId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
        },
        description: {
            name: {
                type: String,
                required: true
            },
            value: {
                type: String,
                required: true
            }
        },
    },
    {
        timestamps: true
    }
);

activityLogSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('ActivityLog', activityLogSchema);