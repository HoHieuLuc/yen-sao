const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { authRequired } = require('../../middlewares/authentication');
const chiTietPhieuXuatController = require('../../controllers/chi-tiet-phieu-xuat.controller');
const { isMongooseModel } = require('../../utils/functions');

const typeDefs = gql`
    type ChiTietPhieuXuat {
        id: ID!
        maPhieuXuat: String!
        sanPham: SanPham
        soLuongXuat: Int!
        donGiaXuat: Int!
        ngayXuat: Date!
        ghiChu: String
        createdAt: Date!
        updatedAt: Date!
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
        chiTietPhieuXuat: ChiTietPhieuXuatQueries
    }

    type ChiTietPhieuXuatMutationsResponse {
        phieuXuat: PhieuXuat!
        sanPhamBiThayDoi: SanPham!
    }

    type ChiTietPhieuXuatMutations {
        create(
            idPhieuXuat: ID!
            payload: ChiTietPhieuXuatInput!
        ): PhieuXuat
        update(
            idPhieuXuat: ID!
            idChiTiet: ID!
            payload: ChiTietPhieuXuatInput!
        ): ChiTietPhieuXuatMutationsResponse
        delete(
            idPhieuXuat: ID!
            idChiTiet: ID!
        ): ChiTietPhieuXuatMutationsResponse
    }

    extend type Mutation {
        chiTietPhieuXuat: ChiTietPhieuXuatMutations
    }
`;

const resolvers = {
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
        chiTietPhieuXuat: chainMiddlewares(authRequired,
            () => ({})
        )
    },
    ChiTietPhieuXuatQueries: {
        bySanPhamID: async (_, { id, page, limit, from, to, sort }) =>
            chiTietPhieuXuatController.getBySanPhamID(id, page, limit, from, to, sort)
    },
    Mutation: {
        chiTietPhieuXuat: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    ChiTietPhieuXuatMutations: {
        create: async (_, { idPhieuXuat, payload }, { currentUser }) =>
            chiTietPhieuXuatController.create(idPhieuXuat, payload, currentUser),
        update: async (_, { idPhieuXuat, idChiTiet, payload }, { currentUser }) =>
            chiTietPhieuXuatController.update(
                idPhieuXuat,
                idChiTiet,
                payload,
                currentUser
            ),
        delete: async (_, { idPhieuXuat, idChiTiet }, { currentUser }) =>
            chiTietPhieuXuatController.remove(
                idPhieuXuat,
                idChiTiet,
                currentUser
            ),
    }
};

module.exports = {
    typeDefs,
    resolvers
};