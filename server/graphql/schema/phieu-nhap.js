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
        sanPham: SanPham
        soLuongNhap: Int!
        donGiaNhap: Int!
    }

    type PhieuNhapsByPage {
        phieuNhaps: [PhieuNhap!]!
        pageInfo: PageInfo!
    }

    input PhieuNhapInput {
        maSanPham: ID!
        soLuongNhap: Int!
        donGiaNhap: Int!
    }

    type PhieuNhapQueries {
        all(
            page: Int!,
            limit: Int!
        ): PhieuNhapsByPage!
        byID(
            id: ID!
        ): PhieuNhap
    }

    extend type Query {
        phieuNhap: PhieuNhapQueries
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
        ): PhieuNhap
    }

    extend type Mutation {
        phieuNhap: PhieuNhapMutations
        chiTietPhieuNhap: ChiTietPhieuNhapMutations
    }
`;

const resolvers = {
    PhieuNhap: {
        chiTiet: (root) => {
            // khi phiếu nhập được populate với sản phẩm (khi xem chi tiết 1 phiếu nhập)
            // thì trả về chi tiết phiếu nhập
            // khi phân trang phiếu nhập thì chi tiết phiếu nhập sẽ trống
            return (root.chiTiet.length > 0 && isMongooseModel(root.chiTiet[0]?.maSanPham))
                ? root.chiTiet
                : [];
        },
        soMatHangNhap: (root) => root.chiTiet.length
    },
    PhieuNhapsByPage: {
        phieuNhaps: (root) => root.docs,
        pageInfo: (root) => root
    },
    ChiTietPhieuNhap: {
        sanPham: (root) => {
            return isMongooseModel(root.maSanPham) ? root.maSanPham : null;
        }
    },
    Query: {
        phieuNhap: () => ({})
    },
    PhieuNhapQueries: {
        all: chainMiddlewares(authRequired,
            (_, { page, limit }) => phieuNhapController.getAll(page, limit)),
        byID: chainMiddlewares(authRequired,
            (_, { id }) => phieuNhapController.getById(id)),
    },
    Mutation: {
        phieuNhap: () => ({}),
        chiTietPhieuNhap: () => ({})
    },
    PhieuNhapMutations: {
        create: chainMiddlewares(authRequired,
            (_, { payload }, { currentUser }) =>
                phieuNhapController.create(payload, currentUser.id)
        ),
        delete: chainMiddlewares(authRequired,
            (_, { id }) => phieuNhapController.remove(id)
        ),
    },
    ChiTietPhieuNhapMutations: {
        create: chainMiddlewares(authRequired,
            (_, { idPhieuNhap, payload }) =>
                chiTietPhieuNhapController.create(idPhieuNhap, payload)
        ),
        update: chainMiddlewares(authRequired,
            (_, { idPhieuNhap, idChiTiet, payload }) =>
                chiTietPhieuNhapController.update(
                    idPhieuNhap,
                    idChiTiet,
                    payload,
                )
        ),
        delete: chainMiddlewares(authRequired,
            (_, { idPhieuNhap, idChiTiet }) =>
                chiTietPhieuNhapController.remove(idPhieuNhap, idChiTiet)
        ),
    }
};

module.exports = {
    typeDefs,
    resolvers
};