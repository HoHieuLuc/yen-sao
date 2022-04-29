import { gql } from '@apollo/client';

export const CREATE_SAN_PHAM = gql`
mutation Create($payload: SanPhamInput!) {
    sanPham {
        create(payload: $payload) {
            id
            tenSanPham
            soLuong
            donGia
            moTa
            anhSanPham
            createdAt
            updatedAt
            loaiSanPham {
                id
                tenLoaiSanPham
                moTa
            }
        }
    }
}
`;