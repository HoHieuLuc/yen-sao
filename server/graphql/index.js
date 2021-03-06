const { makeExecutableSchema } = require('@graphql-tools/schema');
const { gql } = require('apollo-server');
const { merge } = require('lodash');

const {
    typeDefs: DateScalar,
    resolvers: dateResolvers
} = require('./scalar/Date.scalar');
const {
    typeDefs: ObjectScalar,
    resolvers: objectResolvers
} = require('./scalar/Object.scalar');
const {
    typeDefs: ObjectIDScalar,
    resolvers: objectIDResolvers
} = require('./scalar/ObjectID.scalar');
const {
    typeDefs: Token,
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
const {
    typeDefs: ActivityLog,
    resolvers: activityLogResolvers
} = require('./schema/activity-log.schema');
const {
    typeDefs: ThongKe,
    resolvers: thongKeResolvers
} = require('./schema/thong-ke.schema');
const {
    typeDefs: CamNang,
    resolvers: camNangResolvers
} = require('./schema/cam-nang.schema');

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
        DateScalar,
        ObjectScalar,
        ObjectIDScalar,
        Paginatable,
        User,
        Token,
        File,
        SanPham,
        PhieuNhap,
        ChiTietPhieuNhap,
        PhieuXuat,
        ChiTietPhieuXuat,
        Page,
        ActivityLog,
        ThongKe,
        CamNang
    ],
    resolvers: merge(
        dateResolvers,
        objectResolvers,
        objectIDResolvers,
        userResolvers,
        fileResolvers,
        sanPhamResolvers,
        phieuNhapResolvers,
        chiTietPhieuNhapResolvers,
        phieuXuatResolvers,
        chiTietPhieuXuatResolvers,
        pageResolvers,
        activityLogResolvers,
        thongKeResolvers,
        camNangResolvers
    )
});

module.exports = schema;