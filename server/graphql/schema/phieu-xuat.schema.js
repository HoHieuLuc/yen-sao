const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const { authRequired } = require('../../middlewares/authentication');
const phieuXuatController = require('../../controllers/phieu-xuat.controller');

const typeDefs = gql`
    type PhieuXuat {
        id: ID!
        nguoiXuat: User!
        nguoiMua: String!
        ngayXuat: Date!
        createdAt: Date!
        updatedAt: Date!
        soMatHangXuat: Int!
        tongTien: Int!
        chiTiet: [ChiTietPhieuXuat!]!
    }

    type PhieuXuatsByPage {
        docs: [PhieuXuat!]!
        pageInfo: PageInfo!
    }

    input ChiTietPhieuXuatInput {
        maSanPham: ObjectID!
        soLuongXuat: Int!
        donGiaXuat: Int!
        ghiChu: String
    }

    input UpdatePhieuXuatInput {
        ngayXuat: Date
        nguoiMua: String
    }

    enum SortPhieuXuat {
        NGAY_XUAT_ASC
        NGAY_XUAT_DESC
        TONG_TIEN_ASC
        TONG_TIEN_DESC
    }

    type PhieuXuatQueries {
        all(
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortPhieuXuat
        ): PhieuXuatsByPage!
        byID(
            id: ObjectID!
        ): PhieuXuat
    }

    extend type Query {
        phieuXuat: PhieuXuatQueries
    }

    type PhieuXuatMutations {
        create(
            nguoiMua: String!,
            ngayXuat: Date!,
            payload: [ChiTietPhieuXuatInput!]!
        ): PhieuXuat
        delete(
            id: ObjectID!
        ): PhieuXuat
        update (
            id: ObjectID!,
            payload: UpdatePhieuXuatInput!
        ): PhieuXuat
    }

    extend type Mutation {
        phieuXuat: PhieuXuatMutations
    }
`;

const resolvers = {
    PhieuXuat: {
        soMatHangXuat: (root) => root.chiTiet.length
    },
    SortPhieuXuat: {
        NGAY_XUAT_ASC: 'ngayXuat',
        NGAY_XUAT_DESC: '-ngayXuat',
        TONG_TIEN_ASC: 'tongTien',
        TONG_TIEN_DESC: '-tongTien'
    },
    PhieuXuatsByPage: {
        pageInfo: (root) => root
    },
    Query: {
        phieuXuat: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    PhieuXuatQueries: {
        all: async (_, { page, limit, from, to, sort }) =>
            phieuXuatController.getAll(page, limit, from, to, sort),
        byID: async (_, { id }) =>
            phieuXuatController.getById(id),
    },
    Mutation: {
        phieuXuat: chainMiddlewares(authRequired,
            () => ({})
        ),
    },
    PhieuXuatMutations: {
        create: async (_, { nguoiMua, ngayXuat, payload }, { currentUser }) =>
            phieuXuatController.create(
                nguoiMua,
                currentUser,
                ngayXuat,
                payload,
            ),
        delete: async (_, { id }, { currentUser }) =>
            phieuXuatController.remove(id, currentUser),
        update: async (_, { id, payload }, { currentUser }) =>
            phieuXuatController.update(id, payload, currentUser),
    },
};

module.exports = {
    typeDefs,
    resolvers
};