const mongoosePaginate = require('mongoose-paginate-v2');
const sanitizeHtml = require('sanitize-html');
const mongoose = require('mongoose');
const { nanoid } = require('nanoid');
const slugify = require('slugify');

const camNangSchema = mongoose.Schema(
    {
        tieuDe: {
            type: String,
            required: true
        },
        noiDung: {
            type: String,
            required: true
        },
        isPublic: {
            type: Boolean,
            required: true
        },
        slug: {
            type: String,
        },
        anhDaiDien: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);

camNangSchema.pre('save', function (next) {
    const slug = slugify(
        this.tieuDe,
        {
            lower: true,
            locale: 'vi'
        }
    );
    this.slug = `${slug}-${nanoid(5)}`;
    this.noiDung = sanitizeHtml(this.noiDung, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedClasses: {
            '*': ['*']
        }
    });
    next();
});

camNangSchema.pre('findOneAndUpdate', async function (next) {
    this.getUpdate().noiDung = sanitizeHtml(this.getUpdate().noiDung, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedClasses: {
            '*': ['*']
        }
    });

    const camNangToUpdate = await this.model.findById(this.getQuery()._id);

    if (!this.getUpdate().tieuDe || camNangToUpdate.tieuDe === this.getUpdate().tieuDe) {
        return next();
    }

    const slug = slugify(
        this._update.tieuDe,
        {
            lower: true,
            locale: 'vi'
        }
    );
    this.getUpdate().slug = `${slug}-${nanoid(5)}`;
});

camNangSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('CamNang', camNangSchema);