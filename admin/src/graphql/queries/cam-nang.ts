import { showErrorNotification, showSuccessNotification } from '../../events';
import { gql, useApolloClient, useMutation, useQuery } from '@apollo/client';
import {
    AllCamNangs, AllCamNangsVars, CamNangByID,
    CreateCamNangVars, UpdateCamNangVars
} from '../../types';

const ALL = gql`
    query AllCamNangs($page: Int!, $limit: Int!, $search: String) {
        camNang {
            all(page: $page, limit: $limit, search: $search) {
                docs {
                    id
                    tieuDe
                    isPublic
                    createdAt
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
    query CamNangByID($id: ObjectID!) {
        camNang {
            byID(id: $id) {
                id
                tieuDe
                noiDung
                isPublic
                slug
                anhDaiDien
                createdAt
                updatedAt
            }
        }
    }
`;

const CREATE = gql`
    mutation CreateCamNang($payload: CreateCamNangInput!) {
        camNang {
            create(payload: $payload) {
                id
            }
        }
    }
`;

const UPDATE = gql`
    mutation UpdateCamNang($id: ObjectID!, $payload: UpdateCamNangInput!) {
        camNang {
            update(id: $id, payload: $payload) {
                id
                tieuDe
                noiDung
                anhDaiDien
                isPublic
            }
        }
    }
`;

const DELETE = gql`
    mutation DeleteCamNang($id: ObjectID!) {
        camNang {
            delete(id: $id) {
                id
            }
        }
    }
`;

const useAllCamNangs = (variables: AllCamNangsVars) => {
    return useQuery<
        AllCamNangs, AllCamNangsVars
    >(ALL, {
        variables
    });
};

const useCamNangByID = (id: string) => {
    return useQuery<
        CamNangByID, { id: string }
    >(BY_ID, {
        variables: {
            id
        }
    });
};

const useCreateCamNang = () => {
    const client = useApolloClient();
    return useMutation<
        never, CreateCamNangVars
    >(CREATE, {
        onCompleted: () => {
            showSuccessNotification('Tạo cẩm nang thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'camNang',
            });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

const useUpdateCamNang = () => {
    return useMutation<
        never, UpdateCamNangVars
    >(UPDATE, {
        onCompleted: () => showSuccessNotification('Cập nhật cẩm nang thành công'),
        onError: (error) => showErrorNotification(error.message)
    });
};

const useDeleteCamNang = () => {
    const client = useApolloClient();
    return useMutation<
        never, { id: string }
    >(DELETE, {
        onCompleted: () => {
            showSuccessNotification('Xóa cẩm nang thành công');
            client.cache.evict({
                id: 'ROOT_QUERY',
                fieldName: 'camNang',
            });
            client.cache.gc();
        },
        onError: (error) => showErrorNotification(error.message)
    });
};

export const camNangHooks = {
    useAllCamNangs,
    useCamNangByID,
    useCreateCamNang,
    useUpdateCamNang,
    useDeleteCamNang
};