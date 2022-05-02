import { gql } from '@apollo/client';

const ALL = gql`
    query AllPhieuNhap($page: Int!, $limit: Int!) {
        phieuNhap {
            all(page: $page, limit: $limit) {
                docs {
                    id
                    nguoiNhap {
                        id
                        username
                    }
                    createdAt
                    soMatHangNhap
                    tongTien
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
    query Query($id: ID!) {
        phieuNhap {
            byID(id: $id) {
                id
                nguoiNhap {
                    id
                    username
                }
                createdAt
                updatedAt
                soMatHangNhap
                tongTien
                chiTiet {
                    id
                    maPhieuNhap
                    sanPham {
                        id
                        tenSanPham
                        soLuong
                        anhSanPham
                        loaiSanPham {
                            id
                            tenLoaiSanPham
                        }
                    }
                    soLuongNhap
                    donGiaNhap
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreatePhieuNhap($payload: [PhieuNhapInput!]!) {
        phieuNhap {
            create(payload: $payload) {
                id
                nguoiNhap {
                    id
                    username
                }
                soMatHangNhap
                tongTien
                chiTiet {
                    id
                    maPhieuNhap
                    soLuongNhap
                    donGiaNhap
                    sanPham {
                        id
                        tenSanPham
                        soLuong
                        createdAt
                        updatedAt
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
                    maPhieuNhap
                    sanPham {
                        id
                        tenSanPham
                        soLuong
                    }
                    soLuongNhap
                    donGiaNhap
                }
            }
        }
    }
`;

export const phieuNhapQuery = {
    CREATE,
    ALL,
    DELETE,
    BY_ID
};