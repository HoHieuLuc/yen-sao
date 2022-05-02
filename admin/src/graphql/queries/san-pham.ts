import { gql } from '@apollo/client';

const ALL = gql`
    query AllSanPhams($page: Int!, $limit: Int!, $search: String) {
        sanPham {
            all(page: $page, limit: $limit, search: $search) {
                docs {
                    id
                    tenSanPham
                    soLuong
                    loaiSanPham {
                        id
                        tenLoaiSanPham
                    }
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
    query SanPhamByID($id: ID!) {
        sanPham {
            byID(id: $id) {
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

const CREATE = gql`
    mutation CreateSanPham($payload: SanPhamInput!) {
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

const UPDATE = gql`
    mutation UpdateSanPham($id: ID!, $payload: SanPhamInput!) {
        sanPham {
            update(id: $id, payload: $payload) {
                id
                tenSanPham
                soLuong
                donGia
                moTa
                anhSanPham
                loaiSanPham {
                    id
                }
            }
        }
    }
`;

export const sanPhamQuery = {
    ALL,
    BY_ID,
    CREATE,
    UPDATE,
};