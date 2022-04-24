const { UserInputError } = require('apollo-server');
const SanPham = require('../models/SanPham');

const getAllSanPhams = async (page, limit) => {
    const options = {
        page,
        limit,
        populate: 'loaiSanPham',
        sort: '-updatedAt'
    };
    const sanPhams = await SanPham.paginate({}, options);
    return sanPhams;
};

const createSanPham = async (sanPham) => {
    try {
        const newSanPham = await SanPham.create({
            ...sanPham,
            loaiSanPham: sanPham.maLoaiSanPham
        });
        const addedSanPham = await SanPham.findById(newSanPham._id).populate('loaiSanPham');
        return addedSanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    createSanPham,
    getAllSanPhams
};