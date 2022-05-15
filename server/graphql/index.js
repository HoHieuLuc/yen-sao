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
} = require('./schema/token.schema');
const {
    typeDefs: User,
    resolvers: userResolvers
} = require('./schema/user.schema');
const {
    typeDefs: File,
    resolvers: fileResolvers
} = require('./schema/file.schema');
const {
    typeDefs: Paginatable
} = require('./schema/paginate.schema');
const {
    typeDefs: SanPham,
    resolvers: sanPhamResolvers
} = require('./schema/san-pham.schema');
const {
    typeDefs: PhieuNhap,
    resolvers: phieuNhapResolvers
} = require('./schema/phieu-nhap.schema');
const {
    typeDefs: ChiTietPhieuNhap,
    resolvers: chiTietPhieuNhapResolvers
} = require('./schema/chi-tiet-phieu-nhap.schema');
const {
    typeDefs: PhieuXuat,
    resolvers: phieuXuatResolvers
} = require('./schema/phieu-xuat.schema');
const {
    typeDefs: ChiTietPhieuXuat,
    resolvers: chiTietPhieuXuatResolvers
} = require('./schema/chi-tiet-phieu-xuat.schema');
const {
    typeDefs: Page,
    resolvers: pageResolvers
} = require('./schema/page.schema');

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
        SanPham,
        PhieuNhap,
        ChiTietPhieuNhap,
        PhieuXuat,
        ChiTietPhieuXuat,
        Page
    ],
    resolvers: merge(
        dateResolvers,
        objectResolvers,
        userResolvers,
        fileResolvers,
        sanPhamResolvers,
        phieuNhapResolvers,
        chiTietPhieuNhapResolvers,
        phieuXuatResolvers,
        chiTietPhieuXuatResolvers,
        pageResolvers
    )
});

module.exports = schema;