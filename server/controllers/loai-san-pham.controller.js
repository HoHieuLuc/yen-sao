const { UserInputError } = require('apollo-server');
const LoaiSanPham = require('../models/LoaiSanPham');

const createLoaiSanPham = async (loaiSanPham) => {
    try {
        const newLoaiSanPham = await LoaiSanPham.create(loaiSanPham);
        return newLoaiSanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = { 
    createLoaiSanPham
};