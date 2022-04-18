const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const Post = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        }
    },
    {
        timestamps: true
    }
);

Post.plugin(mongoosePaginate);

module.exports = mongoose.model('Post', Post);