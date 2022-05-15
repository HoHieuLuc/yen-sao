const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { authRequired } = require('../../middlewares/authentication');
const phieuXuatController = require('../../controllers/phieu-xuat.controller');
const chiTietPhieuXuatController = require('../../controllers/chi-tiet-phieu-xuat.controller');
const { isMongooseModel } = require('../../utils/functions');

const phieuXuat = `
    id: ID!
    nguoiXuat: User!
    createdAt: Date!
    updatedAt: Date!
    soMatHangXuat: Int!
    tongTien: Int!
`;

const typeDefs = gql`
    type PhieuXuat {
        ${phieuXuat}
        chiTiet: [ChiTietPhieuXuat!]!
    }

    type ChiTietPhieuXuat {
        id: ID!
        maPhieuXuat: String!
        sanPham: SanPham
        soLuongXuat: Int!
        donGiaXuat: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type PhieuXuatsByPage {
        docs: [PhieuXuat!]!
        pageInfo: PageInfo!
    }

    input PhieuXuatInput {
        maSanPham: ID!
        soLuongXuat: Int!
        donGiaXuat: Int!
    }

    enum SortPhieuXuat {
        NGAY_XUAT_ASC
        NGAY_XUAT_DESC
        TONG_TIEN_ASC
        TONG_TIEN_DESC
    }

    type PhieuXuatQueries {
        all(
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortPhieuXuat
        ): PhieuXuatsByPage!
        byID(
            id: ID!
        ): PhieuXuat
    }

    type ChiTietPhieuXuatByPage {
        docs: [ChiTietPhieuXuat!]!
        pageInfo: PageInfo
    }

    enum SortChiTietPhieuXuat {
        NGAY_XUAT_ASC
        NGAY_XUAT_DESC
        SO_LUONG_ASC
        SO_LUONG_DESC
        DON_GIA_ASC
        DON_GIA_DESC
    }

    type ChiTietPhieuXuatQueries {
        bySanPhamID(
            id: ID!,
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortChiTietPhieuXuat
        ): ChiTietPhieuXuatByPage
    }

    extend type Query {
        phieuXuat: PhieuXuatQueries
        chiTietPhieuXuat: ChiTietPhieuXuatQueries
    }

    type PhieuXuatMutations {
        create(
            payload: [PhieuXuatInput!]!
        ): PhieuXuat
        delete(
            id: ID!
        ): PhieuXuat
    }

    type ChiTietPhieuXuatMutationsResponse {
        phieuXuat: PhieuXuat!
        sanPhamBiThayDoi: SanPham!
    }

    type ChiTietPhieuXuatMutations {
        create(
            idPhieuXuat: ID!
            payload: PhieuXuatInput!
        ): PhieuXuat
        update(
            idPhieuXuat: ID!
            idChiTiet: ID!
            payload: PhieuXuatInput!
        ): ChiTietPhieuXuatMutationsResponse
        delete(
            idPhieuXuat: ID!
            idChiTiet: ID!
        ): ChiTietPhieuXuatMutationsResponse
    }

    extend type Mutation {
        phieuXuat: PhieuXuatMutations
        chiTietPhieuXuat: ChiTietPhieuXuatMutations
    }
`;

const resolvers = {
    PhieuXuat: {
        soMatHangXuat: (root) => root.chiTiet.length
    },
    SortPhieuXuat: {
        NGAY_XUAT_ASC: 'createdAt',
        NGAY_XUAT_DESC: '-createdAt',
        TONG_TIEN_ASC: 'tongTien',
        TONG_TIEN_DESC: '-tongTien'
    },
    PhieuXuatsByPage: {
        pageInfo: (root) => root
    },
    SortChiTietPhieuXuat: {
        NGAY_XUAT_ASC: 'createdAt',
        NGAY_XUAT_DESC: '-createdAt',
        SO_LUONG_ASC: 'soLuongXuat',
        SO_LUONG_DESC: '-soLuongXuat',
        DON_GIA_ASC: 'donGiaXuat',
        DON_GIA_DESC: '-donGiaXuat'
    },
    ChiTietPhieuXuat: {
        sanPham: (root) => {
            return isMongooseModel(root.maSanPham) ? root.maSanPham : null;
        }
    },
    ChiTietPhieuXuatByPage: {
        pageInfo: (root) => root
    },
    Query: {
        phieuXuat: chainMiddlewares(authRequired,
            () => ({})
        ),
        chiTietPhieuXuat: chainMiddlewares(authRequired,
            () => ({})
        )
    },
    PhieuXuatQueries: {
        all: async (_, { page, limit, from, to, sort }) =>
            phieuXuatController.getAll(page, limit, from, to, sort),
        byID: async (_, { id }) =>
            phieuXuatController.getById(id),
    },
    ChiTietPhieuXuatQueries: {
        bySanPhamID: async (_, { id, page, limit, from, to, sort }) =>
            chiTietPhieuXuatController.getBySanPhamID(id, page, limit, from, to, sort)
    },
    Mutation: {
        phieuXuat: chainMiddlewares(authRequired,
            () => ({})
        ),
        chiTietPhieuXuat: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    PhieuXuatMutations: {
        create: async (_, { payload }, { currentUser }) =>
            phieuXuatController.create(payload, currentUser.id),
        delete: async (_, { id }) =>
            phieuXuatController.remove(id)
    },
    ChiTietPhieuXuatMutations: {
        create: async (_, { idPhieuXuat, payload }) =>
            chiTietPhieuXuatController.create(idPhieuXuat, payload),
        update: async (_, { idPhieuXuat, idChiTiet, payload }) =>
            chiTietPhieuXuatController.update(
                idPhieuXuat,
                idChiTiet,
                payload,
            ),
        delete: async (_, { idPhieuXuat, idChiTiet }) =>
            chiTietPhieuXuatController.remove(idPhieuXuat, idChiTiet),
    }
};

module.exports = {
    typeDefs,
    resolvers
};