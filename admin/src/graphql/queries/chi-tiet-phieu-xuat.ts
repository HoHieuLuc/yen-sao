import { gql } from '@apollo/client';

const BY_SAN_PHAM_ID = gql`
    query ChiTietPhieuXuatBySanPhamID(
        $id: ID!, 
        $page: Int!, 
        $limit: Int!,
        $from: Date,
        $to: Date,
        $sort: SortChiTietPhieuXuat
    ) {
        chiTietPhieuXuat {
            bySanPhamID(id: $id, page: $page, limit: $limit, from: $from, to: $to, sort: $sort) {
                docs {
                    id
                    maPhieuXuat
                    soLuongXuat
                    donGiaXuat
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
    mutation CreateChiTietPhieuXuat($idPhieuXuat: ID!, $payload: PhieuXuatInput!) {
        chiTietPhieuXuat {
            create(idPhieuXuat: $idPhieuXuat, payload: $payload) {
                id
                soMatHangXuat
                tongTien
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

const UPDATE = gql`
    mutation UpdateChiTietPhieuXuat(
        $idPhieuXuat: ID!,
        $idChiTiet: ID!, 
        $payload: PhieuXuatInput!) 
    {
        chiTietPhieuXuat {
            update(idPhieuXuat: $idPhieuXuat, idChiTiet: $idChiTiet, payload: $payload) {
                phieuXuat {
                    id
                    soMatHangXuat
                    tongTien
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
    mutation DeleteChiTietPhieuXuat($idPhieuXuat: ID!, $idChiTiet: ID!) {
        chiTietPhieuXuat {
            delete(idPhieuXuat: $idPhieuXuat, idChiTiet: $idChiTiet) {
                phieuXuat {
                    id
                    soMatHangXuat
                    tongTien
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
                sanPhamBiThayDoi {
                    id
                    tenSanPham
                    soLuong          
                }
            }
        }
    }
`;

export const chiTietPhieuXuatQuery = {
    BY_SAN_PHAM_ID,
    CREATE,
    UPDATE,
    DELETE,
};