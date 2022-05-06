import { gql } from '@apollo/client';

const BY_SAN_PHAM_ID = gql`
    query ChiTietPhieuNhapBySanPhamID($id: ID!, $page: Int!, $limit: Int!) {
        chiTietPhieuNhap {
            bySanPhamID(id: $id, page: $page, limit: $limit) {
                docs {
                    id
                    maPhieuNhap
                    soLuongNhap
                    donGiaNhap
                    createdAt
                    updatedAt
                }
                pageInfo {
                    page
                    totalPages
                    limit
                    totalDocs
                }
            }
        }
    }
`;

const CREATE = gql`
    mutation CreateChiTietPhieuNhap($idPhieuNhap: ID!, $payload: PhieuNhapInput!) {
        chiTietPhieuNhap {
            create(idPhieuNhap: $idPhieuNhap, payload: $payload) {
                id
                soMatHangNhap
                tongTien
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

const UPDATE = gql`
    mutation UpdateChiTietPhieuNhap(
        $idPhieuNhap: ID!,
        $idChiTiet: ID!, 
        $payload: PhieuNhapInput!) 
    {
        chiTietPhieuNhap {
            update(idPhieuNhap: $idPhieuNhap, idChiTiet: $idChiTiet, payload: $payload) {
                phieuNhap {
                    id
                    soMatHangNhap
                    tongTien
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
                sanPhamBiThayDoi {
                    id
                    tenSanPham
                    soLuong
                }
            }
        }
    }
`;

const DELETE = gql`
    mutation DeleteChiTietPhieuNhap($idPhieuNhap: ID!, $idChiTiet: ID!) {
        chiTietPhieuNhap {
            delete(idPhieuNhap: $idPhieuNhap, idChiTiet: $idChiTiet) {
                phieuNhap {
                    id
                    soMatHangNhap
                    tongTien
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
                sanPhamBiThayDoi {
                    id
                    tenSanPham
                    soLuong          
                }
            }
        }
    }
`;

export const chiTietPhieuNhapQuery = {
    BY_SAN_PHAM_ID,
    CREATE,
    UPDATE,
    DELETE,
};