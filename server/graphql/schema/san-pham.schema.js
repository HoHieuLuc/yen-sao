const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { adminRequired } = require('../../middlewares/authentication');
const sanPhamController = require('../../controllers/san-pham.controller');

const typeDefs = gql`
    type SanPham {
        id: ID!
        tenSanPham: String!
        soLuong: Float!
        donGiaSi: Int!
        donGiaLe: Int!
        donGiaTuyChon: String
        moTa: String
        xuatXu: String
        anhSanPham: [String!]!
        createdAt: Date!
        updatedAt: Date!
    }

    type SanPhamsByPage {
        docs: [SanPham!]!
        pageInfo: PageInfo!
    }

    input CreateSanPhamInput {
        tenSanPham: String!
        donGiaSi: Int!
        donGiaLe: Int!
        donGiaTuyChon: String
        moTa: String
        xuatXu: String
        tags: [String]
        anhSanPham: [String!]!
    }

    input UpdateSanPhamInput {
        tenSanPham: String
        donGiaSi: Int
        donGiaLe: Int
        donGiaTuyChon: String
        moTa: String
        xuatXu: String
        tags: [String]
        anhSanPham: [String!]
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
        create(payload: CreateSanPhamInput!): SanPham
        update(
            id: ID!,
            payload: UpdateSanPhamInput!
        ): SanPham
        delete(
            id: ID!
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
        sanPham: chainMiddlewares(adminRequired,
            () => ({})
        ),
    },
    SanPhamMutations: {
        create: async (_, { payload }) =>
            sanPhamController.create(payload),
        update: async (_, { id, payload }) =>
            sanPhamController.update(id, payload),
        delete: async (_, { id }) =>
            sanPhamController.remove(id),
    },
};

module.exports = {
    typeDefs,
    resolvers
};