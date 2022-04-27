const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');
const sanPhamController = require('../../controllers/san-pham.controller');
const loaiSanPhamController = require('../../controllers/loai-san-pham.controller');
const { isMongooseModel } = require('../../utils/functions');

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
        loaiSanPham: LoaiSanPham
    }

    type SanPhamsByPage {
        sanPhams: [SanPham!]!
        pageInfo: PageInfo!
    }

    input SanPhamInput {
        tenSanPham: String
        soLuong: Int
        donGia: Int
        moTa: String
        anhSanPham: [String!]
        maLoaiSanPham: ID
    }
    
    type SanPhamQueries {
        all(
            page: Int!,
            limit: Int!
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
    SanPham: {
        loaiSanPham: async (root) => {
            return isMongooseModel(root.maLoaiSanPham)
                ? root.maLoaiSanPham
                : loaiSanPhamController.getById(root.maLoaiSanPham);
        }
    },
    SanPhamsByPage: {
        sanPhams: (root) => root.docs,
        pageInfo: (root) => root
    },
    Query: {
        sanPham: () => ({})
    },
    SanPhamQueries: {
        all: async (_, { page, limit }) => sanPhamController.getAll(page, limit),
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