const { gql } = require('apollo-server');
const phieuNhapController = require('../../controllers/phieu-nhap.controller');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');

const phieuNhap = `
    id: ID!
    nguoiNhap: User!
    createdAt: Date!
    updatedAt: Date!
    tongTien: Int!
`;

const typeDefs = gql`
    type PhieuNhap {
        ${phieuNhap}
        chiTiet: [ChiTietPhieuNhap!]!
    }

    type ChiTietPhieuNhap {
        sanPham: SanPham!
        soLuongNhap: Int!
        donGiaNhap: Int!
    }

    type PhieuNhapCompact {
        ${phieuNhap}
    }

    type PhieuNhapsByPage {
        phieuNhaps: [PhieuNhapCompact!]!
        pageInfo: PageInfo
    }

    input PhieuNhapInput {
        maSanPham: ID!
        soLuongNhap: Int!
        donGiaNhap: Int!
    }

    type PhieuNhapQueries {
        all(
            page: Int!,
            limit: Int!
        ): PhieuNhapsByPage!
        byID(
            id: ID!
        ): PhieuNhap
    }

    extend type Query {
        phieuNhap: PhieuNhapQueries
    }

    type PhieuNhapMutations {
        create(
            payload: [PhieuNhapInput!]!
        ): PhieuNhap
        update(
            id: ID!,
            payload: [PhieuNhapInput!]!
        ): PhieuNhap
        delete(
            id: ID!
        ): PhieuNhap
    }

    extend type Mutation {
        phieuNhap: PhieuNhapMutations
    }
`;

const resolvers = {
    PhieuNhapsByPage: {
        phieuNhaps: (root) => root.docs,
        pageInfo: (root) => root
    },
    ChiTietPhieuNhap: {
        sanPham: (root) => root.maSanPham
    },
    Query: {
        phieuNhap: () => ({})
    },
    PhieuNhapQueries: {
        all: chainMiddlewares(authRequired,
            (_, { page, limit }) => phieuNhapController.getAll(page, limit)),
        byID: chainMiddlewares(authRequired,
            (_, { id }) => phieuNhapController.getById(id)),
    },
    Mutation: {
        phieuNhap: () => ({})
    },
    PhieuNhapMutations: {
        create: chainMiddlewares(authRequired,
            (_, { payload }, { currentUser }) =>
                phieuNhapController.create(payload, currentUser.id)
        ),
        update: chainMiddlewares(authRequired,
            (_, { id, payload }) =>
                phieuNhapController.update(id, payload)
        ),
        delete: chainMiddlewares(authRequired,
            (_, { id }) => phieuNhapController.remove(id)
        ),
    },
};

module.exports = {
    typeDefs,
    resolvers
};