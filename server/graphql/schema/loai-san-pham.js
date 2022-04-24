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
        loaiSanPhams: [LoaiSanPham!]!
        pageInfo: PageInfo!
    }

    input LoaiSanPhamInput {
        tenLoaiSanPham: String!
        moTa: String
    }

    type LoaiSanPhamQueries {
        all(
            page: Int!,
            limit: Int!
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
        loaiSanPhams: (root) => root.docs,
        pageInfo: (root) => root
    },
    LoaiSanPhamQueries: {
        all: async (_, { page, limit }) => loaiSanPhamController.getAll(page, limit),
        byID: async (_, { id }) => loaiSanPhamController.getById(id)
    },
    Query: {
        loaiSanPham: () => ({})
    },
    LoaiSanPhamMutations: {
        create: chainMiddlewares(authRequired,
            (_, { payload }) =>
                loaiSanPhamController.create(payload)
        ),
        update: chainMiddlewares(authRequired,
            (_, { id, payload }) =>
                loaiSanPhamController.update(id, payload)
        ),
        delete: chainMiddlewares(authRequired,
            (_, {id}) => loaiSanPhamController.remove(id)
        )
    },
    Mutation: {
        loaiSanPham: () => ({})
    },
};

module.exports = {
    typeDefs,
    resolvers
};