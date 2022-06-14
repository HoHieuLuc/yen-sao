import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import { showErrorNotification, showSuccessNotification } from '../../events';
import {
    AllSanPhams, SanPhamByID, AllSanPhamVars,
    UpdateSanPhamVars, CreateSanPhamVars,
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
                    isPublic
                    isFeatured
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
    query SanPhamByID($id: ObjectID!) {
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
                isPublic
                isFeatured
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
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdateSanPham($id: ObjectID!, $payload: UpdateSanPhamInput!) {
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
                isPublic
                isFeatured
                updatedAt
            }
        }
    }
`;

const DELETE = gql`
    mutation DeleteSanPham($id: ObjectID!) {
        sanPham {
            delete(id: $id) {
                id
                tenSanPham
            }
        }
    }
`;

const useAllSanPhams = (variables: AllSanPhamVars) => {
    return useQuery<
        AllSanPhams, AllSanPhamVars
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
        never, CreateSanPhamVars
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
        onError: (error) => showErrorNotification(error.message)
    });
};

const useUpdateSanPham = () => {
    return useMutation<
        never, UpdateSanPhamVars
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
    useAllSanPhams,
};