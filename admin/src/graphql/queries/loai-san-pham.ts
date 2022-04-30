import { gql } from '@apollo/client';

const ALL = gql`
    query AllLoaiSanPhams($page: Int!, $limit: Int!, $search: String) {
        loaiSanPham {
            all(page: $page, limit: $limit, search: $search) {
                docs {
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

const CREATE = gql`
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

const UPDATE = gql`
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

const DELETE = gql`
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

export const loaiSanPhamQuery = {
    ALL,
    CREATE,
    UPDATE,
    DELETE
};