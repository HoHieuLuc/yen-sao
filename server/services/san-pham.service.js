const { UserInputError } = require('apollo-server');
const SanPham = require('../models/SanPham');

const getAll = async (page, limit, search, sort) => {
    const options = {
        page,
        limit,
        sort: sort || '-createdAt',
    };
    const sanPhams = await SanPham.paginate({
        tenSanPham: { 
            $regex: search, 
            $options: 'i' 
        },
    }, options);
    return sanPhams;
};

const getById = async (id) => {
    try {
        const sanPham = await SanPham.findById(id);
        return sanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
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
    getById,
    getAll,
    create,
    update,
    checkIfExist
};