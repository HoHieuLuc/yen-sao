import { gql } from '@apollo/client';

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
    CREATE,
    UPDATE,
    DELETE,
};