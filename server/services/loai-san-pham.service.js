const { UserInputError } = require('apollo-server');
const LoaiSanPham = require('../models/LoaiSanPham');
const SanPham = require('../models/SanPham');

const getAll = async (page, limit, search) => {
    const options = {
        page,
        limit,
        sort: '-createdAt'
    };
    return LoaiSanPham.paginate({
        tenLoaiSanPham: {
            $regex: search,
            $options: 'i'
        }
    }, options);
};

const getById = async (id) => {
    try {
        const loaiSanPham = await LoaiSanPham.findById(id);
        return loaiSanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const create = async (loaiSanPhamData) => {
    try {
        const loaiSanPham = await LoaiSanPham.create(loaiSanPhamData);
        return loaiSanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const update = async (id, loaiSanPhamData) => {
    try {
        const updatedLoaiSanPham = await LoaiSanPham.findByIdAndUpdate(
            id,
            loaiSanPhamData,
            {
                new: true, runValidators: true
            }
        );
        return updatedLoaiSanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

const remove = async (id) => {
    try {
        // kiểm tra xem có sản phẩm nào thuộc loại sản phẩm này không
        const countSanPham = await SanPham.countDocuments({ maLoaiSanPham: id });
        if (countSanPham > 0) {
            throw new UserInputError(
                'Bạn không thể xóa loại sản phẩm này vì có sản phẩm thuộc loại sản phẩm này'
            );
        }
        const loaiSanPham = await LoaiSanPham.findByIdAndDelete(id);
        return loaiSanPham;
    } catch (error) {
        throw new UserInputError(error.message);
    }
};

module.exports = {
    getAll,
    getById,
    create,
    update,
    remove
};