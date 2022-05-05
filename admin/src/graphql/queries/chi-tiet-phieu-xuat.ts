import { gql } from '@apollo/client';

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
    CREATE,
    UPDATE,
    DELETE,
};