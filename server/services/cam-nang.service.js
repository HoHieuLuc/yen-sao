const { UserInputError } = require('apollo-server');
const CamNang = require('../models/CamNang');

const getAll = async (page, limit, search, isGuest) => {
    const options = {
        page,
        limit,
        sort: '-createdAt',
    };
    const findOptions = {
        tieuDe: {
            $regex: search,
            $options: 'i'
        }
    };
    if (isGuest) {
        findOptions.isPublic = true;
    }
    return CamNang.paginate(findOptions, options);
};

const getById = async (id) => {
    return CamNang.findById(id);
};

const getBySlug = async (slug) => {
    return CamNang.findOne({ slug });
};

const create = async (camNangData) => {
    try {
        const camNang = await CamNang.create(camNangData);
        return camNang;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const update = async (id, camNangData) => {
    try {
        const camNang = await CamNang.findByIdAndUpdate(
            id,
            camNangData,
            {
                new: true,
                runValidators: true
            }
        );
        return camNang;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const remove = async (id) => {
    return CamNang.findByIdAndDelete(id);
};

module.exports = {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    remove
};