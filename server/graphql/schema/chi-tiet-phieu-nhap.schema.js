const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { authRequired } = require('../../middlewares/authentication');
const chiTietPhieuNhapController = require('../../controllers/chi-tiet-phieu-nhap.controller');
const { isMongooseModel } = require('../../utils/functions');

const typeDefs = gql`
    type ChiTietPhieuNhap {
        id: ID!
        maPhieuNhap: String!
        sanPham: SanPham
        soLuongNhap: Float!
        donGiaNhap: Int!
        ngayNhap: Date!
        ghiChu: String
        createdAt: Date!
        updatedAt: Date!
    }

    type ChiTietPhieuNhapByPage {
        docs: [ChiTietPhieuNhap!]!
        pageInfo: PageInfo
    }

    enum SortChiTietPhieuNhap {
        NGAY_NHAP_ASC
        NGAY_NHAP_DESC
        SO_LUONG_ASC
        SO_LUONG_DESC
        DON_GIA_ASC
        DON_GIA_DESC
    }

    type ChiTietPhieuNhapQueries {
        bySanPhamID(
            id: ID!,
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortChiTietPhieuNhap
        ): ChiTietPhieuNhapByPage
    }

    extend type Query {
        chiTietPhieuNhap: ChiTietPhieuNhapQueries
    }

    type ChiTietPhieuNhapMutationsResponse {
        phieuNhap: PhieuNhap!
        sanPhamBiThayDoi: SanPham!
    }

    type ChiTietPhieuNhapMutations {
        create(
            idPhieuNhap: ID!
            payload: ChiTietPhieuNhapInput!
        ): PhieuNhap
        update(
            idPhieuNhap: ID!
            idChiTiet: ID!
            payload: ChiTietPhieuNhapInput!
        ): ChiTietPhieuNhapMutationsResponse
        delete(
            idPhieuNhap: ID!
            idChiTiet: ID!
        ): ChiTietPhieuNhapMutationsResponse
    }

    extend type Mutation {
        chiTietPhieuNhap: ChiTietPhieuNhapMutations
    }
`;

const resolvers = {
    ChiTietPhieuNhap: {
        sanPham: (root) => {
            return isMongooseModel(root.maSanPham) ? root.maSanPham : null;
        }
    },
    SortChiTietPhieuNhap: {
        NGAY_NHAP_ASC: 'createdAt',
        NGAY_NHAP_DESC: '-createdAt',
        SO_LUONG_ASC: 'soLuongNhap',
        SO_LUONG_DESC: '-soLuongNhap',
        DON_GIA_ASC: 'donGiaNhap',
        DON_GIA_DESC: '-donGiaNhap'
    },
    ChiTietPhieuNhapByPage: {
        pageInfo: (root) => root
    },
    Query: {
        chiTietPhieuNhap: chainMiddlewares(authRequired,
            () => ({})
        )
    },
    ChiTietPhieuNhapQueries: {
        bySanPhamID: async (_, { id, page, limit, from, to, sort }) =>
            chiTietPhieuNhapController.getBySanPhamID(id, page, limit, from, to, sort)
    },
    Mutation: {
        chiTietPhieuNhap: chainMiddlewares(authRequired,
            () => ({})
        )
    },
    ChiTietPhieuNhapMutations: {
        create: async (_, { idPhieuNhap, payload }, { currentUser }) =>
            chiTietPhieuNhapController.create(
                idPhieuNhap,
                payload,
                currentUser
            ),
        update: async (_, { idPhieuNhap, idChiTiet, payload }, { currentUser }) =>
            chiTietPhieuNhapController.update(
                idPhieuNhap,
                idChiTiet,
                payload,
                currentUser
            ),
        delete: async (_, { idPhieuNhap, idChiTiet }, { currentUser }) =>
            chiTietPhieuNhapController.remove(
                idPhieuNhap,
                idChiTiet,
                currentUser
            )
    }
};

module.exports = {
    typeDefs,
    resolvers
};