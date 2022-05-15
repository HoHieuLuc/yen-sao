const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { authRequired } = require('../../middlewares/authentication');
const sanPhamController = require('../../controllers/san-pham.controller');

const sanPham = `
    tenSanPham: String!
    soLuong: Int
    donGia: Int!
    moTa: String
    anhSanPham: [String!]!
`;

const typeDefs = gql`
    type SanPham {
        id: ID!
        ${sanPham}
        createdAt: Date!
        updatedAt: Date!
    }

    type SanPhamsByPage {
        docs: [SanPham!]!
        pageInfo: PageInfo!
    }

    input SanPhamInput {
        tenSanPham: String
        soLuong: Int
        donGiaSi: Int
        donGiaLe: Int
        moTa: String
        anhSanPham: [String!]!
    }

    enum SortSanPham {
        SO_LUONG_ASC
        SO_LUONG_DESC
    }
    
    type SanPhamQueries {
        all(
            page: Int!,
            limit: Int!,
            search: String,
            sort: SortSanPham
        ): SanPhamsByPage!
        byID(id: ID!): SanPham
    }

    extend type Query {
        sanPham: SanPhamQueries
    }

    type SanPhamMutations {
        create(payload: SanPhamInput!): SanPham
        update(
            id: ID!,
            payload: SanPhamInput!
        ): SanPham
    }

    extend type Mutation {
        sanPham: SanPhamMutations
    }
`;

const resolvers = {
    SortSanPham: {
        SO_LUONG_ASC: 'soLuong',
        SO_LUONG_DESC: '-soLuong'
    },
    SanPhamsByPage: {
        pageInfo: (root) => root
    },
    Query: {
        sanPham: () => ({})
    },
    SanPhamQueries: {
        all: async (_, { page, limit, search, sort }) =>
            sanPhamController.getAll(page, limit, search, sort),
        byID: async (_, { id }) => sanPhamController.getById(id)
    },
    Mutation: {
        sanPham: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    SanPhamMutations: {
        create: async (_, { payload }) =>
            sanPhamController.create(payload),
        update: async (_, { id, payload }) =>
            sanPhamController.update(id, payload),
    },
};

module.exports = {
    typeDefs,
    resolvers
};