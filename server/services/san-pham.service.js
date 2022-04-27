const { UserInputError } = require('apollo-server');
const SanPham = require('../models/SanPham');

const getAll = async (page, limit) => {
    const options = {
        page,
        limit,
        populate: 'maLoaiSanPham',
        sort: '-updatedAt'
    };
    const sanPhams = await SanPham.paginate({}, options);
    return sanPhams;
};

const getById = async (id) => {
    try {
        const sanPham = await SanPham.findById(id).populate('maLoaiSanPham');
        return sanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const create = async (sanPhamData) => {
    try {
        const sanPham = await SanPham.create(sanPhamData);
        return SanPham.findById(sanPham._id).populate('maLoaiSanPham');
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
        ).populate('maLoaiSanPham');
        return sanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getById,
    getAll,
    create,
    update,
};