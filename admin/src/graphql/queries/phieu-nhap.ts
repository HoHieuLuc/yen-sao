import { gql } from '@apollo/client';

const ALL = gql`
    query AllPhieuNhaps($page: Int!, $limit: Int!, $from: Date, $to: Date, $sort: SortPhieuNhap) {
        phieuNhap {
            all(page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    nguoiNhap {
                        id
                        username
                        fullname
                    }
                    ngayNhap
                    soMatHangNhap
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
    query PhieuNhapByID($id: ID!) {
        phieuNhap {
            byID(id: $id) {
                id
                nguoiNhap {
                    id
                    username
                    fullname
                }
                ngayNhap
                soMatHangNhap
                tongTien
                createdAt
                updatedAt
                chiTiet {
                    id
                    maPhieuNhap
                    sanPham {
                        id
                        tenSanPham
                        soLuong
                    }
                    soLuongNhap
                    donGiaNhap
                    thanhTien
                    ghiChu
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreatePhieuNhap($ngayNhap: Date!, $payload: [ChiTietPhieuNhapInput!]!) {
        phieuNhap {
            create(ngayNhap: $ngayNhap, payload: $payload) {
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
    mutation DeletePhieuNhap($id: ID!) {
        phieuNhap {
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
    mutation UpdatePhieuNhap($id: ID!, $payload: UpdatePhieuNhapInput!) {
        phieuNhap {
            update(id: $id, payload: $payload) {
                id
                ngayNhap
                updatedAt
            }
        }
    }
`;

export const phieuNhapQuery = {
    ALL,
    BY_ID,
    CREATE,
    UPDATE,
    DELETE,
};