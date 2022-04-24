const { gql } = require('apollo-server');
const { createPhieuNhap, getAllPhieuNhaps, getPhieuNhapById, editPhieuNhap, deletePhieuNhap } = require('../../controllers/phieu-nhap.controller');
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

    extend type Query {
        allPhieuNhaps(
            page: Int!,
            limit: Int!
        ): PhieuNhapsByPage!
        phieuNhapByID(
            id: ID!
        ): PhieuNhap
    }

    extend type Mutation {
        createPhieuNhap(
            chiTietPhieuNhap: [PhieuNhapInput!]!
        ): PhieuNhap
        editPhieuNhap(
            phieuNhapId: ID!,
            chiTietPhieuNhap: [PhieuNhapInput!]!
        ): PhieuNhap
        deletePhieuNhap(
            phieuNhapId: ID!
        ): PhieuNhap
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
        allPhieuNhaps: chainMiddlewares(authRequired,
            (_, { page, limit }) => getAllPhieuNhaps(page, limit)),
        phieuNhapByID: chainMiddlewares(authRequired,
            (_, { id }) => getPhieuNhapById(id))
    },
    Mutation: {
        createPhieuNhap: chainMiddlewares(authRequired,
            (_, { chiTietPhieuNhap }, { currentUser }) =>
                createPhieuNhap(chiTietPhieuNhap, currentUser.id)
        ),
        editPhieuNhap: chainMiddlewares(authRequired,
            (_, { phieuNhapId, chiTietPhieuNhap }, { currentUser }) =>
                editPhieuNhap(phieuNhapId, chiTietPhieuNhap, currentUser.id)
        ),
        deletePhieuNhap: chainMiddlewares(authRequired,
            (_, { phieuNhapId }) => deletePhieuNhap(phieuNhapId)
        )
    }
};

module.exports = {
    typeDefs,
    resolvers
};