const { gql } = require('apollo-server');
const loaiSanPhamController = require('../../controllers/loai-san-pham.controller');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');

const typeDefs = gql`
    type LoaiSanPham {
        id: ID!
        tenLoaiSanPham: String!
        moTa: String
    }

    type LoaiSanPhamsByPage {
        docs: [LoaiSanPham!]!
        pageInfo: PageInfo!
    }

    input LoaiSanPhamInput {
        tenLoaiSanPham: String!
        moTa: String
    }

    type LoaiSanPhamQueries {
        all(
            page: Int!,
            limit: Int!,
            search: String
        ): LoaiSanPhamsByPage!
        byID(id: ID!): LoaiSanPham
    }

    extend type Query {
        loaiSanPham: LoaiSanPhamQueries
    }

    type LoaiSanPhamMutations {
        create(payload: LoaiSanPhamInput!): LoaiSanPham
        update(
            id: ID!,
            payload: LoaiSanPhamInput!
        ): LoaiSanPham
        delete(id: ID!): LoaiSanPham
    }

    extend type Mutation {
        loaiSanPham: LoaiSanPhamMutations
    }
`;

const resolvers = {
    LoaiSanPhamsByPage: {
        pageInfo: (root) => root
    },
    Query: {
        loaiSanPham: () => ({})
    },
    LoaiSanPhamQueries: {
        all: async (_, { page, limit, search }) => loaiSanPhamController.getAll(page, limit, search),
        byID: async (_, { id }) => loaiSanPhamController.getById(id)
    },
    Mutation: {
        loaiSanPham: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    LoaiSanPhamMutations: {
        create: async (_, { payload }) =>
            loaiSanPhamController.create(payload),
        update: async (_, { id, payload }) =>
            loaiSanPhamController.update(id, payload),
        delete: async (_, { id }) =>
            loaiSanPhamController.remove(id)
    },
};

module.exports = {
    typeDefs,
    resolvers
};