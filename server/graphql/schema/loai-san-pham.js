const { gql } = require('apollo-server');
const { createLoaiSanPham } = require('../../controllers/loai-san-pham.controller');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');

const typeDefs = gql`
    type LoaiSanPham {
        id: ID!
        tenLoaiSanPham: String!
        moTa: String
    }

    input LoaiSanPhamInput {
        tenLoaiSanPham: String!
        moTa: String
    }

    extend type Query {
        allLoaiSanPhams: [LoaiSanPham!]!
    }

    extend type Mutation {
        createLoaiSanPham(loaiSanPham: LoaiSanPhamInput!): LoaiSanPham
    }
`;

const resolvers = {
    Query: {
        allLoaiSanPhams: () => [],
    },
    Mutation: {
        createLoaiSanPham: chainMiddlewares(authRequired, (_, { loaiSanPham }) => { 
            return createLoaiSanPham(loaiSanPham);
        })
    }
};

module.exports = {
    typeDefs,
    resolvers
};