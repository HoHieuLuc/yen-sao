const { UserInputError } = require('apollo-server');
const SanPham = require('../models/SanPham');

const getAll = async (page, limit, search, sort, isFeatured, isGuest) => {
    const options = {
        page,
        limit,
        sort: sort || '-createdAt',
    };
    const findOptions = {
        tenSanPham: {
            $regex: search,
            $options: 'i'
        },
    };
    if (isGuest) {
        findOptions.isPublic = true;
    }
    if (isFeatured) {
        findOptions.isFeatured = true;
    }
    return SanPham.paginate(findOptions, options);
};

const getById = async (id, isGuest) => {
    const findOptions = isGuest ? { isPublic: true } : {};
    return SanPham.findOne(
        {
            _id: id,
            ...findOptions
        }
    );
};

const getBySlug = async (slug, isGuest) => {
    const findOptions = isGuest ? { isPublic: true } : {};
    return SanPham.findOne({
        slug,
        ...findOptions
    });
};

const create = async (sanPhamData) => {
    try {
        const sanPham = await SanPham.create(sanPhamData);
        return sanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const update = async (id, sanPhamData) => {
    try {
        const sanPham = await SanPham.findByIdAndUpdate(
            id,
            sanPhamData,
            { new: true, runValidators: true }
        );
        return sanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const remove = async (id) => {
    return SanPham.findByIdAndRemove(id);
};

const checkIfExist = async (arrayOfIds = []) => {
    try {
        const sanPhams = await SanPham.find({ _id: { $in: arrayOfIds } });
        if (sanPhams.length !== arrayOfIds.length) {
            throw new UserInputError('Sản phẩm không tồn tại');
        }
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getAll,
    create,
    update,
    remove,
    getById,
    getBySlug,
    checkIfExist,
};