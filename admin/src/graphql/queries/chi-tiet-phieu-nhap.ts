import { gql } from '@apollo/client';

const BY_SAN_PHAM_ID = gql`
    query ChiTietPhieuNhapBySanPhamID(
        $id: ID!, 
        $page: Int!, 
        $limit: Int!, 
        $from: Date, 
        $to: Date,
        $sort: SortChiTietPhieuNhap
    ) {
        chiTietPhieuNhap {
            bySanPhamID(id: $id, page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    maPhieuNhap
                    soLuongNhap
                    donGiaNhap
                    ngayNhap
                    thanhTien
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
    mutation CreateChiTietPhieuNhap($idPhieuNhap: ID!, $payload: ChiTietPhieuNhapInput!) {
        chiTietPhieuNhap {
            create(idPhieuNhap: $idPhieuNhap, payload: $payload) {
                id
                soMatHangNhap
                tongTien
                chiTiet {
                    id
                    sanPham {
                        id
                        soLuong
                    }
                    soLuongNhap
                    donGiaNhap
                    thanhTien
                    ngayNhap
                    ghiChu
                }
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdateChiTietPhieuNhap(
        $idPhieuNhap: ID!,
        $idChiTiet: ID!, 
        $payload: ChiTietPhieuNhapInput!) 
    {
        chiTietPhieuNhap {
            update(idPhieuNhap: $idPhieuNhap, idChiTiet: $idChiTiet, payload: $payload) {
                phieuNhap {
                    id
                    soMatHangNhap
                    tongTien
                    chiTiet {
                        id
                        sanPham {
                            id
                            soLuong
                        }
                        soLuongNhap
                        donGiaNhap
                        thanhTien
                        ngayNhap
                        ghiChu
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
                        sanPham {
                            id
                            soLuong
                        }
                        soLuongNhap
                        donGiaNhap
                        thanhTien
                        ngayNhap
                        ghiChu
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