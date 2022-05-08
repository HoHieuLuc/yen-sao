const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');
const phieuNhapController = require('../../controllers/phieu-nhap.controller');
const chiTietPhieuNhapController = require('../../controllers/chi-tiet-phieu-nhap.controller');
const { isMongooseModel } = require('../../utils/functions');

const phieuNhap = `
    id: ID!
    nguoiNhap: User!
    createdAt: Date!
    updatedAt: Date!
    soMatHangNhap: Int!
    tongTien: Int!
`;

const typeDefs = gql`
    type PhieuNhap {
        ${phieuNhap}
        chiTiet: [ChiTietPhieuNhap!]!
    }

    type ChiTietPhieuNhap {
        id: ID!
        maPhieuNhap: String!
        sanPham: SanPham
        soLuongNhap: Int!
        donGiaNhap: Int!
        createdAt: Date!
        updatedAt: Date!
    }

    type PhieuNhapsByPage {
        docs: [PhieuNhap!]!
        pageInfo: PageInfo!
    }

    input PhieuNhapInput {
        maSanPham: ID!
        soLuongNhap: Int!
        donGiaNhap: Int!
    }

    enum SortPhieuNhap {
        NGAY_NHAP_ASC
        NGAY_NHAP_DESC
        TONG_TIEN_ASC
        TONG_TIEN_DESC
    }

    type PhieuNhapQueries {
        all(
            page: Int!,
            limit: Int!,
            from: Date,
            to: Date,
            sort: SortPhieuNhap
        ): PhieuNhapsByPage!
        byID(
            id: ID!
        ): PhieuNhap
    }

    type ChiTietPhieuNhapByPage {
        docs: [ChiTietPhieuNhap!]!
        pageInfo: PageInfo
    }

    type ChiTietPhieuNhapQueries {
        bySanPhamID(
            id: ID!,
            page: Int!,
            limit: Int!
        ): ChiTietPhieuNhapByPage
    }

    extend type Query {
        phieuNhap: PhieuNhapQueries
        chiTietPhieuNhap: ChiTietPhieuNhapQueries
    }

    type PhieuNhapMutations {
        create(
            payload: [PhieuNhapInput!]!
        ): PhieuNhap
        delete(
            id: ID!
        ): PhieuNhap
    }

    type ChiTietPhieuNhapMutationsResponse {
        phieuNhap: PhieuNhap!
        sanPhamBiThayDoi: SanPham!
    }

    type ChiTietPhieuNhapMutations {
        create(
            idPhieuNhap: ID!
            payload: PhieuNhapInput!
        ): PhieuNhap
        update(
            idPhieuNhap: ID!
            idChiTiet: ID!
            payload: PhieuNhapInput!
        ): ChiTietPhieuNhapMutationsResponse
        delete(
            idPhieuNhap: ID!
            idChiTiet: ID!
        ): ChiTietPhieuNhapMutationsResponse
    }

    extend type Mutation {
        phieuNhap: PhieuNhapMutations
        chiTietPhieuNhap: ChiTietPhieuNhapMutations
    }
`;

const resolvers = {
    PhieuNhap: {
        soMatHangNhap: (root) => root.chiTiet.length
    },
    SortPhieuNhap: {
        NGAY_NHAP_ASC: 'createdAt',
        NGAY_NHAP_DESC: '-createdAt',
        TONG_TIEN_ASC: 'tongTien',
        TONG_TIEN_DESC: '-tongTien'
    },
    PhieuNhapsByPage: {
        pageInfo: (root) => root
    },
    ChiTietPhieuNhap: {
        sanPham: (root) => {
            return isMongooseModel(root.maSanPham) ? root.maSanPham : null;
        }
    },
    ChiTietPhieuNhapByPage: {
        pageInfo: (root) => root
    },
    Query: {
        phieuNhap: chainMiddlewares(authRequired,
            () => ({})
        ),
        chiTietPhieuNhap: chainMiddlewares(authRequired,
            () => ({})
        )
    },
    PhieuNhapQueries: {
        all: async (_, { page, limit, from, to, sort }) =>
            phieuNhapController.getAll(page, limit, from, to, sort),
        byID: async (_, { id }) =>
            phieuNhapController.getById(id),
    },
    ChiTietPhieuNhapQueries: {
        bySanPhamID: async (_, { id, page, limit }) => 
            chiTietPhieuNhapController.getBySanPhamID(id, page, limit)
    },
    Mutation: {
        phieuNhap: chainMiddlewares(authRequired,
            () => ({})
        ),
        chiTietPhieuNhap: chainMiddlewares(authRequired,
            () => ({})
        )
    },
    PhieuNhapMutations: {
        create: async (_, { payload }, { currentUser }) =>
            phieuNhapController.create(payload, currentUser.id),
        delete: async (_, { id }) =>
            phieuNhapController.remove(id)
    },
    ChiTietPhieuNhapMutations: {
        create: async (_, { idPhieuNhap, payload }) =>
            chiTietPhieuNhapController.create(idPhieuNhap, payload),

        update: async (_, { idPhieuNhap, idChiTiet, payload }) =>
            chiTietPhieuNhapController.update(
                idPhieuNhap,
                idChiTiet,
                payload,
            ),
        delete: async (_, { idPhieuNhap, idChiTiet }) =>
            chiTietPhieuNhapController.remove(idPhieuNhap, idChiTiet)
    }
};

module.exports = {
    typeDefs,
    resolvers
};