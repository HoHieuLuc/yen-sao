import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    AllSanPhams,
    SanPhamByID,
    SanPhamFormVars,
    SearchSanPhamVars,
    UpdateSanPhamInput
} from '../../types';

const ALL = gql`
    query AllSanPhams($page: Int!, $limit: Int!, $search: String, $sort: SortSanPham) {
        sanPham {
            all(page: $page, limit: $limit, search: $search, sort: $sort) {
                docs {
                    id
                    tenSanPham
                    soLuong
                    donGiaSi
                    donGiaLe
                    donGiaTuyChon
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
                donGiaSi
                donGiaLe
                donGiaTuyChon
                moTa
                xuatXu
                tags
                anhSanPham
                createdAt
                updatedAt
            }
        }
    }
`;

const CREATE = gql`
    mutation CreateSanPham($payload: CreateSanPhamInput!) {
        sanPham {
            create(payload: $payload) {
                id
                tenSanPham
                donGiaSi
                donGiaLe
                donGiaTuyChon
                moTa
                xuatXu
                tags
                anhSanPham
                createdAt
                updatedAt
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdateSanPham($id: ID!, $payload: UpdateSanPhamInput!) {
        sanPham {
            update(id: $id, payload: $payload) {
                id
                tenSanPham
                donGiaSi
                donGiaLe
                donGiaTuyChon
                moTa
                xuatXu
                tags
                anhSanPham
                updatedAt
            }
        }
    }
`;

const DELETE = gql`
    mutation DeleteSanPham($id: ID!) {
        sanPham {
            delete(id: $id) {
                id
                tenSanPham
            }
        }
    }
`;

const useAllSanPham = (variables: SearchSanPhamVars) => {
    return useQuery<
        AllSanPhams, SearchSanPhamVars
    >(ALL, {
        variables
    });
};

const useSanPhamByID = (id: string) => {
    return useQuery<
        SanPhamByID, { id: string }
    >(BY_ID, {
        variables: {
            id: id
        }
    });
};

const useCreateSanPham = () => {
    const client = useApolloClient();
    return useMutation<
        never, { payload: SanPhamFormVars }
    >(CREATE, {
        onCompleted: () => {
            showSuccessNotification('Thêm sản phẩm thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'sanPham',
            });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

const useDeleteSanPham = () => {
    const client = useApolloClient();
    return useMutation<
        never, { id: string }
    >(DELETE, {
        onCompleted: () => {
            showSuccessNotification('Xóa sản phẩm thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'sanPham',
            });
            client.cache.gc();
        },
        onError: (error) => {
            showErrorNotification(error.message);
        }
    });
};

const useUpdateSanPham = () => {
    return useMutation<
        never, UpdateSanPhamInput
    >(UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật sản phẩm thành công'),
        onError: (error) => showErrorNotification(error.message)
    });
};

export const sanPhamHooks = {
    useCreateSanPham,
    useDeleteSanPham,
    useUpdateSanPham,
    useSanPhamByID,
    useAllSanPham,
};