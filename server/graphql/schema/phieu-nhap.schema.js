const phieuNhapController = require('../../controllers/phieu-nhap.controller');
const { authRequired } = require('../../middlewares/authentication');
const { generateDeletedUser } = require('../../utils/functions');
const chainMiddlewares = require('../../middlewares');
const { gql } = require('apollo-server');

const typeDefs = gql`
    type PhieuNhap {
        id: ID!
        nguoiNhap: User!
        ngayNhap: Date!
        createdAt: Date!
        updatedAt: Date!
        soMatHangNhap: Int!
        tongTien: Int!
        chiTiet: [ChiTietPhieuNhap!]!
    }

    type PhieuNhapsByPage {
        docs: [PhieuNhap!]!
        pageInfo: PageInfo!
    }

    input ChiTietPhieuNhapInput {
        maSanPham: ObjectID!
        soLuongNhap: Int!
        donGiaNhap: Int!
        ghiChu: String
    }

    input UpdatePhieuNhapInput {
        ngayNhap: Date!
    }

    enum SortPhieuNhap {
        NGAY_NHAP_ASC
        NGAY_NHAP_DESC
        TONG_TIEN_ASC
        TONG_TIEN_DESC
    }

    type PhieuNhapQueries {
        all(
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortPhieuNhap
        ): PhieuNhapsByPage!
        byID(
            id: ObjectID!
        ): PhieuNhap
    }

    extend type Query {
        phieuNhap: PhieuNhapQueries
    }

    type PhieuNhapMutations {
        create(
            ngayNhap: Date!,
            payload: [ChiTietPhieuNhapInput!]!
        ): PhieuNhap
        delete(
            id: ObjectID!
        ): PhieuNhap
        update(
            id: ObjectID!,
            payload: UpdatePhieuNhapInput!
        ): PhieuNhap
    }

    extend type Mutation {
        phieuNhap: PhieuNhapMutations
    }
`;

const resolvers = {
    PhieuNhap: {
        soMatHangNhap: (root) => root.chiTiet.length,
        nguoiNhap: (root) => root.nguoiNhap ? root.nguoiNhap : generateDeletedUser(),
    },
    SortPhieuNhap: {
        NGAY_NHAP_ASC: 'ngayNhap',
        NGAY_NHAP_DESC: '-ngayNhap',
        TONG_TIEN_ASC: 'tongTien',
        TONG_TIEN_DESC: '-tongTien'
    },
    PhieuNhapsByPage: {
        pageInfo: (root) => root
    },
    Query: {
        phieuNhap: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    PhieuNhapQueries: {
        all: async (_, { page, limit, from, to, sort }) =>
            phieuNhapController.getAll(page, limit, from, to, sort),
        byID: async (_, { id }) =>
            phieuNhapController.getById(id),
    },
    Mutation: {
        phieuNhap: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    PhieuNhapMutations: {
        create: async (_, { ngayNhap, payload }, { currentUser }) =>
            phieuNhapController.create(ngayNhap, payload, currentUser),
        delete: async (_, { id }, { currentUser }) =>
            phieuNhapController.remove(id, currentUser),
        update: async (_, { id, payload }, { currentUser }) =>
            phieuNhapController.update(id, payload, currentUser),
    },
};

module.exports = {
    typeDefs,
    resolvers
};