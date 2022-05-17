import { gql } from '@apollo/client';

const ALL = gql`
    query AllPhieuXuats($page: Int!, $limit: Int!, $from: Date, $to: Date, $sort: SortPhieuXuat) {
        phieuXuat {
            all(page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    nguoiXuat {
                        id
                        username
                        fullname
                    }
                    nguoiMua
                    ngayXuat
                    soMatHangXuat
                    tongTien
                    createdAt
                }
                pageInfo {
                    page
                    totalPages
                    limit
                }
            }
        }
    }
`;

const BY_ID = gql`
    query PhieuXuatByID($id: ID!) {
        phieuXuat {
            byID(id: $id) {
                id
                nguoiXuat {
                    id
                    username
                    fullname
                }
                nguoiMua
                ngayXuat
                soMatHangXuat
                tongTien
                createdAt
                updatedAt
                chiTiet {
                    id
                    maPhieuXuat
                    sanPham {
                        id
                        tenSanPham
                        soLuong
                    }
                    soLuongXuat
                    donGiaXuat
                    thanhTien
                    ghiChu
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreatePhieuXuat($nguoiMua: String!, $ngayXuat: Date!, $payload: [ChiTietPhieuXuatInput!]!) {
        phieuXuat {
            create(nguoiMua: $nguoiMua, ngayXuat: $ngayXuat, payload: $payload) {
                id
                chiTiet {
                    id
                    sanPham {
                        id
                        soLuong
                    }
                }
            }
        }
    }
`;

const DELETE = gql`
    mutation DeletePhieuXuat($id: ID!) {
        phieuXuat {
            delete(id: $id) {
                id
                chiTiet {
                    id
                    sanPham {
                        id
                        soLuong
                    }
                }
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdatePhieuXuat($id: ID!, $payload: UpdatePhieuXuatInput!) {
        phieuXuat {
            update(id: $id, payload: $payload) {
                id
                nguoiMua
                ngayXuat
                updatedAt
            }
        }
    }
`;

export const phieuXuatQuery = {
    ALL,
    BY_ID,
    CREATE,
    UPDATE,
    DELETE,
};