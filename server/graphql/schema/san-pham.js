const { gql } = require('apollo-server');
const { createSanPham, getAllSanPhams } = require('../../controllers/san-pham.controller');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');

const sanPham = `
    tenSanPham: String!
    soLuong: Int
    donGia: Int!
    moTa: String
    anhSanPham: [String!]!
    createdAt: Date!
    updatedAt: Date!
`;

const typeDefs = gql`
    type SanPham {
        id: ID!
        ${sanPham}
        loaiSanPham: LoaiSanPham
    }

    type SanPhamsByPage {
        sanPhams: [SanPham!]!
        pageInfo: PageInfo!
    }

    input SanPhamInput {
        ${sanPham}
        maLoaiSanPham: ID!
    }

    extend type Query {
        allSanPhams(
            page: Int!,
            limit: Int!
        ): SanPhamsByPage!
    }

    extend type Mutation {
        createSanPham(sanPham: SanPhamInput!): SanPham
    }
`;

const resolvers = {
    SanPhamsByPage: {
        sanPhams: (root) => root.docs,
        pageInfo: (root) => root
    },
    Query: {
        allSanPhams: async (_, { page, limit }) => getAllSanPhams(page, limit),
    },
    Mutation: {
        createSanPham: chainMiddlewares(authRequired, (_, { sanPham }) => {
            return createSanPham(sanPham);
        })
    }
};

module.exports = {
    typeDefs,
    resolvers
};