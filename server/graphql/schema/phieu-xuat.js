const { gql } = require('apollo-server');
const chainMiddlewares = require('../../middlewares');
const authRequired = require('../../middlewares/authentication');
const phieuXuatController = require('../../controllers/phieu-xuat.controller');
const chiTietPhieuXuatController = require('../../controllers/chi-tiet-phieu-xuat.controller');
const { isMongooseModel } = require('../../utils/functions');

const phieuXuat = `
    id: ID!
    nguoiXuat: User!
    createdAt: Date!
    updatedAt: Date!
    soMatHangXuat: Int!
    tongTien: Int!
`;

const typeDefs = gql`
    type PhieuXuat {
        ${phieuXuat}
        chiTiet: [ChiTietPhieuXuat!]!
    }

    type ChiTietPhieuXuat {
        id: ID!
        sanPham: SanPham
        soLuongXuat: Int!
        donGiaXuat: Int!
    }

    type PhieuXuatsByPage {
        phieuXuats: [PhieuXuat!]!
        pageInfo: PageInfo!
    }

    input PhieuXuatInput {
        maSanPham: ID!
        soLuongXuat: Int!
        donGiaXuat: Int!
    }

    type PhieuXuatQueries {
        all(
            page: Int!,
            limit: Int!
        ): PhieuXuatsByPage!
        byID(
            id: ID!
        ): PhieuXuat
    }

    extend type Query {
        phieuXuat: PhieuXuatQueries
    }

    type PhieuXuatMutations {
        create(
            payload: [PhieuXuatInput!]!
        ): PhieuXuat
        delete(
            id: ID!
        ): PhieuXuat
    }

    type ChiTietPhieuXuatMutationsResponse {
        phieuXuat: PhieuXuat!
        sanPhamBiThayDoi: SanPham!
    }

    type ChiTietPhieuXuatMutations {
        create(
            idPhieuXuat: ID!
            payload: PhieuXuatInput!
        ): PhieuXuat
        update(
            idPhieuXuat: ID!
            idChiTiet: ID!
            payload: PhieuXuatInput!
        ): ChiTietPhieuXuatMutationsResponse
        delete(
            idPhieuXuat: ID!
            idChiTiet: ID!
        ): PhieuXuat
    }

    extend type Mutation {
        phieuXuat: PhieuXuatMutations
        chiTietPhieuXuat: ChiTietPhieuXuatMutations
    }
`;

const resolvers = {
    PhieuXuat: {
        chiTiet: (root) => {
            // - khi phiếu xuất được populate với sản phẩm (khi xem chi tiết 1 phiếu xuất)
            // thì trả về chi tiết phiếu xuất
            // - khi phân trang phiếu xuất thì chi tiết phiếu xuất sẽ trống
            return (root.chiTiet.length > 0 && isMongooseModel(root.chiTiet[0]?.maSanPham))
                ? root.chiTiet
                : [];
        },
        soMatHangXuat: (root) => root.chiTiet.length
    },
    PhieuXuatsByPage: {
        phieuXuats: (root) => root.docs,
        pageInfo: (root) => root
    },
    ChiTietPhieuXuat: {
        sanPham: (root) => root.maSanPham
    },
    Query: {
        phieuXuat: () => ({})
    },
    PhieuXuatQueries: {
        all: chainMiddlewares(authRequired,
            (_, { page, limit }) => phieuXuatController.getAll(page, limit)),
        byID: chainMiddlewares(authRequired,
            (_, { id }) => phieuXuatController.getById(id)),
    },
    Mutation: {
        phieuXuat: () => ({}),
        chiTietPhieuXuat: () => ({})
    },
    PhieuXuatMutations: {
        create: chainMiddlewares(authRequired,
            (_, { payload }, { currentUser }) =>
                phieuXuatController.create(payload, currentUser.id)
        ),
        delete: chainMiddlewares(authRequired,
            (_, { id }) => phieuXuatController.remove(id)
        ),
    },
    ChiTietPhieuXuatMutations: {
        create: chainMiddlewares(authRequired,
            (_, { idPhieuXuat, payload }) =>
                chiTietPhieuXuatController.create(idPhieuXuat, payload)
        ),
        update: chainMiddlewares(authRequired,
            (_, { idPhieuXuat, idChiTiet, payload }) =>
                chiTietPhieuXuatController.update(
                    idPhieuXuat,
                    idChiTiet,
                    payload,
                )
        ),
        delete: chainMiddlewares(authRequired,
            (_, { idPhieuXuat, idChiTiet }) =>
                chiTietPhieuXuatController.remove(idPhieuXuat, idChiTiet)
        ),
    }
};

module.exports = {
    typeDefs,
    resolvers
};