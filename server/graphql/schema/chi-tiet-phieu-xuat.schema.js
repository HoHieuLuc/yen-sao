const chiTietPhieuXuatController = require('../../controllers/chi-tiet-phieu-xuat.controller');
const { authRequired } = require('../../middlewares/authentication');
const { isMongooseModel } = require('../../utils/functions');
const chainMiddlewares = require('../../middlewares');
const { gql } = require('apollo-server');

const typeDefs = gql`
    type ChiTietPhieuXuat {
        id: ID!
        maPhieuXuat: String!
        sanPham: SanPham
        soLuongXuat: Int!
        donGiaXuat: Int!
        thanhTien: Int!
        ngayXuat: Date!
        ghiChu: String
        createdAt: Date!
        updatedAt: Date!
    }

    type ChiTietPhieuXuatByPage {
        docs: [ChiTietPhieuXuat!]!
        pageInfo: PageInfo
    }

    enum SortChiTietPhieuXuat {
        NGAY_XUAT_ASC
        NGAY_XUAT_DESC
        SO_LUONG_ASC
        SO_LUONG_DESC
        DON_GIA_ASC
        DON_GIA_DESC
    }

    type ChiTietPhieuXuatQueries {
        bySanPhamID(
            id: ObjectID!,
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortChiTietPhieuXuat
        ): ChiTietPhieuXuatByPage
        all(
            from: Date!,
            to: Date!
        ): [ChiTietPhieuXuat!]!
    }

    extend type Query {
        chiTietPhieuXuat: ChiTietPhieuXuatQueries
    }

    type ChiTietPhieuXuatMutationsResponse {
        phieuXuat: PhieuXuat!
        sanPhamBiThayDoi: SanPham!
    }

    type ChiTietPhieuXuatMutations {
        create(
            idPhieuXuat: ObjectID!
            payload: ChiTietPhieuXuatInput!
        ): PhieuXuat
        update(
            idPhieuXuat: ObjectID!
            idChiTiet: ObjectID!
            payload: ChiTietPhieuXuatInput!
        ): ChiTietPhieuXuatMutationsResponse
        delete(
            idPhieuXuat: ObjectID!
            idChiTiet: ObjectID!
        ): ChiTietPhieuXuatMutationsResponse
    }

    extend type Mutation {
        chiTietPhieuXuat: ChiTietPhieuXuatMutations
    }
`;

const resolvers = {
    SortChiTietPhieuXuat: {
        NGAY_XUAT_ASC: 'ngayXuat',
        NGAY_XUAT_DESC: '-ngayXuat',
        SO_LUONG_ASC: 'soLuongXuat',
        SO_LUONG_DESC: '-soLuongXuat',
        DON_GIA_ASC: 'donGiaXuat',
        DON_GIA_DESC: '-donGiaXuat'
    },
    ChiTietPhieuXuat: {
        sanPham: (root) => {
            return isMongooseModel(root.maSanPham) ? root.maSanPham : null;
        },
        thanhTien: (root) => root.soLuongXuat / 100 * root.donGiaXuat
    },
    ChiTietPhieuXuatByPage: {
        pageInfo: (root) => root
    },
    Query: {
        chiTietPhieuXuat: chainMiddlewares(authRequired,
            () => ({})
        )
    },
    ChiTietPhieuXuatQueries: {
        bySanPhamID: async (_, { id, page, limit, from, to, sort }) =>
            chiTietPhieuXuatController.getBySanPhamID(id, page, limit, from, to, sort),
        all: async(_, { from, to }) =>
            chiTietPhieuXuatController.all(from, to),
    },
    Mutation: {
        chiTietPhieuXuat: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    ChiTietPhieuXuatMutations: {
        create: async (_, { idPhieuXuat, payload }, { currentUser }) =>
            chiTietPhieuXuatController.create(idPhieuXuat, payload, currentUser),
        update: async (_, { idPhieuXuat, idChiTiet, payload }, { currentUser }) =>
            chiTietPhieuXuatController.update(
                idPhieuXuat,
                idChiTiet,
                payload,
                currentUser
            ),
        delete: async (_, { idPhieuXuat, idChiTiet }, { currentUser }) =>
            chiTietPhieuXuatController.remove(
                idPhieuXuat,
                idChiTiet,
                currentUser
            ),
    }
};

module.exports = {
    typeDefs,
    resolvers
};