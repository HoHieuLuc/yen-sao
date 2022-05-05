import { gql } from '@apollo/client';

const ALL = gql`
    query AllPhieuXuats($page: Int!, $limit: Int!, $from: Date, $to: Date) {
        phieuXuat {
            all(page: $page, limit: $limit, from: $from, to: $to) {
                docs {
                    id
                    nguoiXuat {
                        id
                        username
                    }
                    createdAt
                    soMatHangXuat
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
    query PhieuXuatByID($id: ID!) {
        phieuXuat {
            byID(id: $id) {
                id
                nguoiXuat {
                    id
                    username
                }
                createdAt
                updatedAt
                soMatHangXuat
                tongTien
                chiTiet {
                    id
                    maPhieuXuat
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
                    soLuongXuat
                    donGiaXuat
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreatePhieuXuat($payload: [PhieuXuatInput!]!) {
        phieuXuat {
            create(payload: $payload) {
                id
                nguoiXuat {
                    id
                    username
                }
                soMatHangXuat
                tongTien
                chiTiet {
                    id
                    maPhieuXuat
                    soLuongXuat
                    donGiaXuat
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
    mutation DeletePhieuXuat($id: ID!) {
        phieuXuat {
            delete(id: $id) {
                id
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
                }
            }
        }
    }
`;

export const phieuXuatQuery = {
    CREATE,
    ALL,
    DELETE,
    BY_ID
};