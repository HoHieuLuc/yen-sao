const { makeExecutableSchema } = require('@graphql-tools/schema');
const { merge } = require('lodash');
const { gql } = require('apollo-server');

const {
    typeDefs: dateScalar,
    resolvers: dateResolvers
} = require('./scalar/date');
const {
    typeDefs: objectScalar,
    resolvers: objectResolvers
} = require('./scalar/object');
const {
    typeDefs: Token
} = require('./schema/token');
const {
    typeDefs: User,
    resolvers: userResolvers
} = require('./schema/user');
const {
    typeDefs: File,
    resolvers: fileResolvers
} = require('./schema/file');
const {
    typeDefs: Post,
    resolvers: postResolvers
} = require('./schema/post');
const {
    typeDefs: Paginatable
} = require('./schema/paginate');
const {
    typeDefs: SanPham,
    resolvers: sanPhamResolvers
} = require('./schema/san-pham');
const {
    typeDefs: LoaiSanPham,
    resolvers: loaiSanPhamResolvers
} = require('./schema/loai-san-pham');
const {
    typeDefs: PhieuNhap,
    resolvers: phieuNhapResolvers
} = require('./schema/phieu-nhap');
const {
    typeDefs: PhieuXuat,
    resolvers: phieuXuatResolvers
} = require('./schema/phieu-xuat');
const {
    typeDefs: Config,
    resolvers: configResolvers
} = require('./schema/config');

const defaultSchema = gql`
    type Query {
        _empty: String
    }

    type Mutation {
        _empty: String
    }
`;

const schema = makeExecutableSchema({
    typeDefs: [
        defaultSchema,
        dateScalar,
        objectScalar,
        Paginatable,
        User,
        Token,
        File,
        Post,
        SanPham,
        LoaiSanPham,
        PhieuNhap,
        PhieuXuat,
        Config
    ],
    resolvers: merge(
        dateResolvers,
        objectResolvers,
        userResolvers,
        fileResolvers,
        postResolvers,
        sanPhamResolvers,
        loaiSanPhamResolvers,
        phieuNhapResolvers,
        phieuXuatResolvers,
        configResolvers
    )
});

module.exports = schema;