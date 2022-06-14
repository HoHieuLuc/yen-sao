const chiTietPhieuNhapController = require('../../controllers/chi-tiet-phieu-nhap.controller');
const { authRequired } = require('../../middlewares/authentication');
const { isMongooseModel } = require('../../utils/functions');
const chainMiddlewares = require('../../middlewares');
const { gql } = require('apollo-server');

const typeDefs = gql`
    type ChiTietPhieuNhap {
        id: ID!
        maPhieuNhap: String!
        sanPham: SanPham
        soLuongNhap: Int!
        donGiaNhap: Int!
        thanhTien: Int!
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
            id: ObjectID!,
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortChiTietPhieuNhap
        ): ChiTietPhieuNhapByPage
        all(
            from: Date!,
            to: Date!
        ): [ChiTietPhieuNhap!]!
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
            idPhieuNhap: ObjectID!
            payload: ChiTietPhieuNhapInput!
        ): PhieuNhap
        update(
            idPhieuNhap: ObjectID!
            idChiTiet: ObjectID!
            payload: ChiTietPhieuNhapInput!
        ): ChiTietPhieuNhapMutationsResponse
        delete(
            idPhieuNhap: ObjectID!
            idChiTiet: ObjectID!
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
        },
        thanhTien: (root) => root.soLuongNhap / 100 * root.donGiaNhap
    },
    SortChiTietPhieuNhap: {
        NGAY_NHAP_ASC: 'ngayNhap',
        NGAY_NHAP_DESC: '-ngayNhap',
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
            chiTietPhieuNhapController.getBySanPhamID(id, page, limit, from, to, sort),
        all: async(_, { from, to }) => 
            chiTietPhieuNhapController.all(from, to),
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