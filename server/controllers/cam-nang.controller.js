const camNangService = require('../services/cam-nang.service');
const camNangLogger = require('../loggers/cam-nang.logger');
const { escapeRegExp } = require('../utils/functions');
const { ForbiddenError } = require('apollo-server');
const CamNang = require('../models/CamNang');

const getAll = async (page, limit, search = '', currentUser) => {
    return camNangService.getAll(
        page,
        limit,
        escapeRegExp(search),
        !currentUser
    );
};

const getById = async (id) => {
    return camNangService.getById(id);
};

const getBySlug = async (slug) => {
    return camNangService.getBySlug(slug);
};

const create = async (payload, currentUser) => {
    if (currentUser.role !== 'admin') {
        payload.isPublic = false;
    }
    const camNang = await camNangService.create(payload);
    await camNangLogger.create(camNang, currentUser);
    return camNang;
};

const update = async (id, payload, currentUser) => {
    const camNangToCheck = await CamNang.findById(id);
    if (camNangToCheck.isPublic === true && currentUser.role !== 'admin') {
        throw new ForbiddenError('Nhân viên chỉ có thể cập nhật cẩm nang không công khai');
    }
    const camNang = await camNangService.update(id, payload);
    await camNangLogger.update(camNang, currentUser);
    return camNang;
};

const remove = async (id, currentUser) => {
    const camNang = await camNangService.remove(id);
    await camNangLogger.remove(camNang, currentUser);
    return camNang;
};

module.exports = {
    getAll,
    getById,
    getBySlug,
    create,
    update,
    remove
};