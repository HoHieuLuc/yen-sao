const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { adminRequired } = require('../../middlewares/authentication');
const sanPhamController = require('../../controllers/san-pham.controller');

const typeDefs = gql`
    type SanPham {
        id: ID!
        tenSanPham: String!
        soLuong: Int!
        donGiaSi: Int!
        donGiaLe: Int!
        donGiaTuyChon: String
        moTa: String
        xuatXu: String
        tags: [String]
        anhSanPham: [String!]!
        isPublic: Boolean!
        slug: String!
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
        isPublic: Boolean!
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
        isPublic: Boolean
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
        byID(
            id: ObjectID!
        ): SanPham
        bySlug(
            slug: String!
        ): SanPham
    }

    extend type Query {
        sanPham: SanPhamQueries
    }

    type SanPhamMutations {
        create(
            payload: CreateSanPhamInput!
        ): SanPham
        update(
            id: ObjectID!,
            payload: UpdateSanPhamInput!
        ): SanPham
        delete(
            id: ObjectID!
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
        all: async (_, { page, limit, search, sort }, { currentUser }) =>
            sanPhamController.getAll(page, limit, search, sort, currentUser),
        byID: async (_, { id }, { currentUser }) =>
            sanPhamController.getById(id, currentUser),
        bySlug: async (_, { slug }, { currentUser }) =>
            sanPhamController.getBySlug(slug, currentUser)
    },
    Mutation: {
        sanPham: chainMiddlewares(adminRequired,
            () => ({})
        ),
    },
    SanPhamMutations: {
        create: async (_, { payload }, { currentUser }) =>
            sanPhamController.create(payload, currentUser),
        update: async (_, { id, payload }, { currentUser }) =>
            sanPhamController.update(id, payload, currentUser),
        delete: async (_, { id }, { currentUser }) =>
            sanPhamController.remove(id, currentUser),
    },
};

module.exports = {
    typeDefs,
    resolvers
};