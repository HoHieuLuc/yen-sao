import { gql } from '@apollo/client';

export const ALL_LOAI_SAN_PHAMS = gql`
    query AllLoaiSanPhams($page: Int!, $limit: Int!, $search: String) {
        loaiSanPham {
            all(page: $page, limit: $limit, search: $search) {
                loaiSanPhams {
                    id
                    tenLoaiSanPham
                    moTa
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

export const CREATE_LOAI_SAN_PHAM = gql`
    mutation CreateLoaiSanPham($payload: LoaiSanPhamInput!) {
        loaiSanPham {
            create(payload: $payload) {
                id
                tenLoaiSanPham
                moTa
            }
        }
    }
`;

export const UPDATE_LOAI_SAN_PHAM = gql`
    mutation UpdateLoaiSanPham($id: ID!, $payload: LoaiSanPhamInput!) {
        loaiSanPham {
            update(id: $id, payload: $payload) {
                id
                tenLoaiSanPham
                moTa
            }
        }
    }
`;

export const DELETE_LOAI_SAN_PHAM = gql`
    mutation DeleteLoaiSanPham($id: ID!) {
        loaiSanPham {
            delete(id: $id) {
                id
                tenLoaiSanPham
                moTa
            }
        }
    }
`;